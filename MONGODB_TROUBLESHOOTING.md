# MongoDB Atlas Connection Issues - Troubleshooting Guide

## Current Status
Your MongoDB Atlas cluster is experiencing **TLS/SSL internal errors**, preventing successful connections. The application has been temporarily switched to SQLite for development.

## Error Details
```
Error: 0C180000:error:0A000438:SSL routines:ssl3_read_bytes:tlsv1 alert internal error
```

This indicates a problem with the MongoDB Atlas cluster infrastructure, not your application code.

## Immediate Solutions

### Option 1: Check MongoDB Atlas Dashboard
1. **Login to MongoDB Atlas**: https://cloud.mongodb.com/
2. **Check Cluster Status**: 
   - Go to Database Deployments
   - Look for your cluster: `cluster0.utn17g6.mongodb.net`
   - Check if it shows "Paused" or any warning indicators
3. **Resume if Paused**: Click "Resume" if the cluster is paused
4. **Check Network Access**:
   - Go to Security → Network Access
   - Ensure `0.0.0.0/0` is whitelisted for development
   - For production, whitelist your server's IP

### Option 2: Create New MongoDB Atlas Cluster
If your current cluster continues having issues:

1. **Create New Cluster**:
   ```
   - Login to MongoDB Atlas
   - Click "Create New Cluster"
   - Choose M0 (Free tier)
   - Select a region close to your location
   ```

2. **Update Connection String**:
   ```bash
   # Replace in .env.local and .env
   DATABASE_URL="mongodb+srv://username:password@newcluster.mongodb.net/admission_management?retryWrites=true&w=majority"
   ```

### Option 3: Use MongoDB Locally
For development, you can run MongoDB locally:

```bash
# Install MongoDB Community Edition
# Then start local MongoDB
mongod --dbpath ./data/db

# Update .env.local
DATABASE_URL="mongodb://localhost:27017/admission_management"
```

## Database Configuration

### Current Setup (SQLite - Working)
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

### MongoDB Setup (When Atlas is Fixed)
```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

## Environment Variables

### Development (.env.local)
```bash
# MongoDB (when working)
DATABASE_URL="mongodb+srv://username:password@cluster0.utn17g6.mongodb.net/admission_management?retryWrites=true&w=majority"

# SQLite (current fallback)
# DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

### Production (.env)
```bash
# MongoDB Atlas for production
DATABASE_URL="mongodb+srv://username:password@cluster0.utn17g6.mongodb.net/admission_management?retryWrites=true&w=majority"
NEXTAUTH_URL=https://uams.amiteshmaurya.com
NEXTAUTH_SECRET=production-secret-key
```

## Testing Database Connection

Use this script to test your database connection:

```javascript
// test-db.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    const users = await prisma.user.count();
    console.log(`✅ Database connected. Users: ${users}`);
  } catch (error) {
    console.error('❌ Database error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
```

## Migration Between Databases

### SQLite to MongoDB
1. Export data from SQLite
2. Update Prisma schema for MongoDB
3. Run `npx prisma generate`
4. Import data to MongoDB

### MongoDB to SQLite
1. Update Prisma schema for SQLite
2. Run `npx prisma db push`
3. Migrate data if needed

## Recommended Actions

1. **Immediate**: Continue using SQLite for development
2. **Short-term**: Check MongoDB Atlas dashboard and resolve cluster issues
3. **Long-term**: Consider MongoDB local instance or alternative cloud providers

## Support Resources

- **MongoDB Atlas Support**: https://support.mongodb.com/
- **Community Forums**: https://community.mongodb.com/
- **Prisma Discord**: https://pris.ly/discord

---

**Current Status**: ✅ SQLite working, 🔧 MongoDB Atlas needs attention