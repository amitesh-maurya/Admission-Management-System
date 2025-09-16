import { MongoClient } from "mongodb";

// Use the same DATABASE_URL that Prisma uses for consistency
const uri = process.env.DATABASE_URL || process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Set the default database name to 'admission_management'
export const dbName = "admission_management";

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local as DATABASE_URL or MONGODB_URI");
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable so the value is preserved across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client for every connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;