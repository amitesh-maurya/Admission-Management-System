# Full MongoDB Setup Guide for Admission Management System

## Option 1: Local MongoDB with Docker (Recommended)

### Step 1: Start Docker Desktop
1. Make sure Docker Desktop is running
2. You can start it from Start Menu or run: `Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"`

### Step 2: Run MongoDB Container
```powershell
# Pull and run MongoDB container
docker run -d -p 27017:27017 --name mongodb-local -e MONGO_INITDB_DATABASE=admission_management mongo:latest

# Verify container is running
docker ps
```

### Step 3: Update Environment Variables
Update your `.env.local` file:
```bash
# Local MongoDB (no authentication required for development)
DATABASE_URL="mongodb://localhost:27017/admission_management"
MONGODB_URI="mongodb://localhost:27017/admission_management"

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production
```

### Step 4: Generate Prisma Client and Database
```powershell
# Generate Prisma client for MongoDB
npx prisma generate

# Create database collections
npx prisma db push
```

### Step 5: Test Connection
```powershell
npm run dev
```

## Option 2: MongoDB Community Edition (Direct Installation)

### Step 1: Download and Install
1. Go to: https://www.mongodb.com/try/download/community
2. Download MongoDB Community Server for Windows
3. Install with default settings
4. MongoDB will run as a Windows service

### Step 2: Same Environment Setup
Use the same DATABASE_URL as Option 1:
```
DATABASE_URL="mongodb://localhost:27017/admission_management"
```

## Option 3: Fix MongoDB Atlas Cluster

### Check Your Atlas Cluster
1. Login to: https://cloud.mongodb.com/
2. Check if cluster `cluster0.utn17g6.mongodb.net` is paused
3. Resume if paused
4. Check Network Access → Add IP `0.0.0.0/0` for development

### If Atlas Still Fails, Create New Cluster
1. Create new M0 (Free) cluster in a different region
2. Create database user
3. Update connection string in `.env.local`

## Troubleshooting

### If Docker fails to start:
- Restart Docker Desktop
- Check Windows Hyper-V is enabled
- Try running PowerShell as Administrator

### If connection fails:
```powershell
# Test MongoDB connection
docker exec -it mongodb-local mongosh --eval "db.adminCommand('ping')"
```

### Common Issues:
1. **Port 27017 busy**: Stop other MongoDB services
2. **Docker not starting**: Restart Docker Desktop
3. **Connection timeout**: Check firewall settings

## Next Steps After Setup:
1. Test user registration at: http://localhost:3000/register
2. Test user login
3. Test application submission
4. Check MongoDB collections with MongoDB Compass (optional GUI)

---

**Current Status**: Ready to set up MongoDB locally for full functionality!