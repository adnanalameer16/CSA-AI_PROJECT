# Optimal Relief Route Finder

A full-stack application that finds optimal routes for relief operations using A* and Dijkstra algorithms. Built with a React frontend and Node.js Express backend.

## Project Structure

```
project-root/
├── client/          # React frontend application
└── server/          # Node.js Express backend
```

## Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

## Installation & Setup

### Client (React Frontend)

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The client application will typically run on `http://localhost:5173`

### Server (Node.js Express Backend)

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

The server will typically run on `http://localhost:3000` 

## Development

To run the full application:

1. Open two terminal windows
2. In the first terminal, start the server (follow the Server setup steps above)
3. In the second terminal, start the client (follow the Client setup steps above)

Both the frontend and backend need to be running simultaneously for the application to work properly.

## Technologies Used

- **Frontend**: React, Vite
- **Backend**: Node.js, Express
