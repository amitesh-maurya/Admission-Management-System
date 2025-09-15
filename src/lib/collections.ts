import clientPromise, { dbName } from "./mongodb";
import { Collection } from "mongodb";

// List of collections related to your Admission Management System
export const COLLECTIONS = {
  USERS: "users",
  APPLICATIONS: "applications",
  ADMISSIONS: "admissions",
  STUDENTS: "students",
  ADMINS: "admins",
  // Add more as needed
};

// Utility to get or create a collection if it doesn't exist
export async function getOrCreateCollection<T extends import("mongodb").Document = import("mongodb").Document>(collectionName: string): Promise<Collection<T>> {
  const client = await clientPromise;
  const db = client.db(dbName);
  const collections = await db.listCollections({}, { nameOnly: true }).toArray();
  const exists = collections.some((col) => col.name === collectionName);
  if (!exists) {
    await db.createCollection(collectionName);
  }
  return db.collection<T>(collectionName);
}
