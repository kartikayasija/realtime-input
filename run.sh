#!/bin/bash

# Start the backend server
cd backend/
npm install   # Install server dependencies if not already done
npm start &    # Start the backend server

# Serve frontend
cd ../frontend/
npx http-server -p 8000
