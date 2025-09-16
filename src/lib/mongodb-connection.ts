// Database connection utility with fallback support
import { MongoClient, Db } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

async function connectToMongoDB(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.DATABASE_URL || process.env.MONGODB_URI;
  
  if (!uri) {
    throw new Error('MongoDB URI not found in environment variables');
  }

  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 20000, // 10 seconds timeout
      connectTimeoutMS: 20000,
      maxPoolSize: 10,
      retryWrites: true,
    });

    await client.connect();
    
    const db = client.db();
    
    // Test the connection
    await db.admin().ping();
    
    cachedClient = client;
    cachedDb = db;
    
    console.log('✅ MongoDB Atlas connected successfully');
    return { client, db };
    
  } catch (error) {
    console.error('❌ MongoDB Atlas connection failed:', error instanceof Error ? error.message : String(error));
    
    if (error instanceof Error && (
        error.message.includes('InternalError') || 
        error.message.includes('Server selection timeout') ||
        error.message.includes('SSL routines'))) {
      
      console.log('🔧 MongoDB Atlas cluster appears to have issues.');
      console.log('💡 Common solutions:');
      console.log('   1. Check if cluster is paused in MongoDB Atlas dashboard');
      console.log('   2. Verify network access whitelist (0.0.0.0/0 for development)');
      console.log('   3. Confirm cluster is running and not experiencing downtime');
      console.log('   4. Try creating a new cluster if issues persist');
    }
    
    throw error;
  }
}

export { connectToMongoDB };