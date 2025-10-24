# ml_model/ml_service.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
import joblib
import io

app = Flask(__name__)
CORS(app)

# A very simple in-memory model store: {product_name: model}
models = {}

def prepare_features(df):
    # df must have columns: 'year_month' (YYYY-MM) and 'sales'
    # convert year_month to integer sequence index
    df = df.copy()
    df['ym'] = pd.to_datetime(df['year_month'], format='%Y-%m')
    df = df.sort_values('ym')
    df['t'] = np.arange(len(df))  # time index 0..n-1
    X = df[['t']].values
    y = df['sales'].values
    return X, y, df

@app.route('/train', methods=['POST'])
def train():
    """
    Expects multipart/form-data or JSON with 'csv' file or 'data' JSON list:
    - If file: form-data 'file' with a CSV having columns: product,year_month,sales
    - If JSON: { "product": "Soap", "data": [{ "year_month":"2024-01","sales":120 }, ...] }
    """
    if 'file' in request.files:
        f = request.files['file']
        df = pd.read_csv(f)
    else:
        payload = request.get_json(force=True)
        product = payload.get('product')
        data = payload.get('data')
        df = pd.DataFrame(data)
        if product:
            df['product'] = product

    results = {}
    for product, g in df.groupby('product'):
        X, y, _ = prepare_features(g)
        if len(y) < 2:
            results[product] = {'status': 'need_at_least_2_points'}
            continue
        model = LinearRegression()
        model.fit(X, y)
        models[product] = model
        # save model to disk
        joblib.dump(model, f'model_{product}.joblib')
        results[product] = {'status': 'trained', 'n_points': len(y)}

    return jsonify(results)

@app.route('/predict', methods=['POST'])
def predict():
    """
    Expects JSON: { "product": "Soap", "history": [{ "year_month":"2024-01","sales":120 }, ...], "horizon":1 }
    Returns: predicted values for next `horizon` months.
    """
    payload = request.get_json(force=True)
    product = payload.get('product')
    history = payload.get('history')
    horizon = int(payload.get('horizon', 1))

    df = pd.DataFrame(history)
    if df.empty or 'year_month' not in df.columns or 'sales' not in df.columns:
        return jsonify({'error': 'history must have year_month and sales'}), 400

    X, y, df_sorted = prepare_features(df)
    # train on provided history (so model uses latest data)
    if len(y) < 2:
        return jsonify({'error': 'need at least 2 history points to predict'}), 400

    model = LinearRegression()
    model.fit(X, y)

    last_t = X[-1][0]
    future_ts = np.arange(last_t + 1, last_t + 1 + horizon).reshape(-1, 1)
    preds = model.predict(future_ts).tolist()

    # convert future t indexes back to year_month
    last_ym = df_sorted['ym'].iloc[-1]
    future_yg = [(last_ym + pd.offsets.MonthBegin(i)).strftime('%Y-%m') for i in range(1, horizon+1)]

    response = {
        'product': product,
        'predictions': [{'year_month': ym, 'predicted_sales': float(round(p,2))} for ym,p in zip(future_yg, preds)]
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=5001, debug=True)
