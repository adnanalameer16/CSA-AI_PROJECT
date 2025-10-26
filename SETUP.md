# Hazard Map Generator - Setup Guide

This guide will help you set up and run the Hazard Map Generator application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd hazard-map-generator
```

### 2. Install Dependencies

Install all dependencies for both frontend and backend:

```bash
npm run install-all
```

### 3. Environment Setup (Optional)

Set up environment variables if you want to customize settings:

```bash
cd backend
cp env.example .env
```

Edit the `.env` file with your preferred settings:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
API_VERSION=v1
```

### 4. Start the Application

Start both frontend and backend servers:

```bash
npm run dev
```

This will start:
- **Backend API**: http://localhost:5000
- **Frontend App**: http://localhost:3000

## Manual Setup (Alternative)

If you prefer to set up each part manually:

### Backend Setup

```bash
cd backend
npm install
cp env.example .env
# Edit .env with your preferred settings (optional)
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```


## API Endpoints

Once the backend is running, you can access these endpoints:

- **Health Check**: `GET http://localhost:5000/health`
- **Get Hazards**: `GET http://localhost:5000/api/hazards`
- **Create Hazard**: `POST http://localhost:5000/api/hazards`
- **Get Heatmap Data**: `GET http://localhost:5000/api/hazards/heatmap`
- **Get Grid Data**: `GET http://localhost:5000/api/hazards/grid`

## Features

### 🗺️ Interactive Map
- View hazards on an interactive map
- Toggle between different visualization modes
- Click on hazards for detailed information

### 📊 Heatmap Visualization
- Color-coded severity levels
- Real-time risk assessment
- Grid-based analysis

### 📋 Hazard Management
- Add, edit, and delete hazards
- Filter by type, severity, and status
- Search functionality

### 🔄 Real-time Updates
- Live data synchronization
- Automatic map updates
- Responsive interface

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Change the port in your `.env` file
   - Kill existing processes using the port

2. **CORS Errors**
   - Ensure the frontend URL matches `CORS_ORIGIN` in backend `.env`
   - Check that both servers are running

3. **Missing Dependencies**
   - Run `npm run install-all` again
   - Clear `node_modules` and reinstall if needed

### Getting Help

If you encounter issues:

1. Check the console logs for error messages
2. Verify all prerequisites are installed
3. Ensure all environment variables are set correctly (if using .env)

## Development

### Project Structure

```
hazard-map-generator/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── hooks/         # Custom hooks
│   │   └── types/         # TypeScript types
│   └── public/
├── backend/           # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── services/      # Business logic
│   │   ├── routes/        # API routes
│   │   └── middleware/    # Custom middleware
│   └── prisma/        # Database schema
└── package.json       # Root package configuration
```

### Available Scripts

- `npm run dev` - Start both frontend and backend
- `npm run server` - Start only backend
- `npm run client` - Start only frontend
- `npm run build` - Build frontend for production
- `npm run install-all` - Install all dependencies

## License

MIT License - see LICENSE file for details.
