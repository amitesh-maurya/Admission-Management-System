# MongoDB Atlas Cluster Issue - Action Required

## 🚨 Current Status
Your MongoDB Atlas cluster `cluster0.utn17g6.mongodb.net` is experiencing **TLS/SSL internal errors**. This is a cluster-level issue that requires action on your MongoDB Atlas account.

## 🔧 Immediate Solutions

### Option 1: Fix MongoDB Atlas Cluster
1. **Login to MongoDB Atlas**: https://cloud.mongodb.com/
2. **Check Your Cluster Status**:
   - Navigate to "Database Deployments"
   - Look for `cluster0.utn17g6.mongodb.net`
   - Check if it shows "Paused" or any error indicators
3. **Actions to Take**:
   - If paused: Click "Resume"
   - If showing errors: Try restarting the cluster
   - Check "Network Access" → Ensure `0.0.0.0/0` is whitelisted

### Option 2: Create New MongoDB Atlas Cluster
1. In MongoDB Atlas dashboard, click "Create New Cluster"
2. Choose **M0 Sandbox (Free)**
3. Select region closest to you
4. Create new database user
5. Update your `.env.local` with new connection string

### Option 3: Use MongoDB Locally (Recommended for Development)
```bash
# Install MongoDB Community Edition
# Windows: Download from https://www.mongodb.com/try/download/community
# Or use Docker:
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Update .env.local
DATABASE_URL="mongodb://localhost:27017/admission_management"
```

## 📋 Updated Environment Variables

### For New Atlas Cluster (.env.local)
```bash
DATABASE_URL="mongodb+srv://username:password@newcluster.mongodb.net/admission_management?retryWrites=true&w=majority"
MONGODB_URI="mongodb+srv://username:password@newcluster.mongodb.net/admission_management?retryWrites=true&w=majority"

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

### For Local MongoDB (.env.local)
```bash
DATABASE_URL="mongodb://localhost:27017/admission_management"
MONGODB_URI="mongodb://localhost:27017/admission_management"

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

## 🔄 After Fixing Connection

1. **Test the connection**:
   ```bash
   node test-mongodb-connection.mjs
   ```

2. **Start the application**:
   ```bash
   npm run dev
   ```

3. **Verify everything works**:
   - User registration
   - User login
   - Application submissions

## 📝 Current Configuration

✅ **Prisma Schema**: Updated for MongoDB with ObjectId types  
✅ **Collections**: Mapped to `users` and `applications`  
✅ **MongoDB Client**: Configured and ready  
✅ **Application Code**: All routes updated for MongoDB

**Only the cluster connection needs to be resolved!**

---

**Next Steps**: Choose one of the 3 options above to resolve the MongoDB connection issue.