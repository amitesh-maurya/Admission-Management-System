# Quick MongoDB Local Setup

## Option 1: Docker (Easiest)
```bash
# Install Docker Desktop if not installed
# Then run MongoDB container:
docker run -d -p 27017:27017 --name mongodb-local mongo:latest

# Update .env.local:
DATABASE_URL="mongodb://localhost:27017/admission_management"
```

## Option 2: Direct Installation
1. Download MongoDB Community Edition from: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Update .env.local with local connection

## Option 3: MongoDB Compass (GUI)
1. Download MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Connect to local MongoDB at: mongodb://localhost:27017
3. Create database: admission_management

## Test the connection:
```bash
node test-db-connection.js
```