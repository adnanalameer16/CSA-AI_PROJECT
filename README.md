# CSA-AI_PROJECT

Create a branch in your group number and upload your codes into that branch.

Please make sure to follow react folder structure and coding conventions🙏🙏

DO NOT PUSH YOUR CODE TO MAIN BRANCH


### 🧠 Demand Forecasting Module
#### 📖 Description

This is a simple AI-based Demand Forecasting Web App built using React, Node.js, and Python (Flask).
It predicts future product demand based on past sales data provided through a CSV file.
The app uses a Linear Regression model to forecast the next month’s sales.

#### ⚙️ How to Run
1️⃣ Clone the project
git clone https://github.com/<your-username>/demand-forecasting.git
cd demand-forecasting

#### 2️⃣ Start the Python ML service
cd ml_model
pip install -r requirements.txt
python ml_service.py


Runs at http://localhost:5001

#### 3️⃣ Start the Node.js backend
cd ../server
npm install
npm run dev


Runs at http://localhost:4000

#### 4️⃣ Start the React frontend
cd ../client
npm install
npm start


Opens in browser at http://localhost:3000

#### 5️⃣ Upload a CSV file

Use a sample file like:

product,year_month,sales
Soap,2024-01,120
Soap,2024-02,135
Soap,2024-03,160


Enter product name (e.g., Soap) and forecast horizon (e.g., 1).
The app will display the predicted demand and a simple chart.