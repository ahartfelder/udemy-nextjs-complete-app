import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URL;

if (!url) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(url);

  await client.connect();
  console.log("Connected to MongoDB");
  const db = client.db();

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function insertDocuments(collectionName, documents) {
  const { db } = await connectToDatabase();

  try {
    return db.collection(collectionName).insertMany(documents);
  } catch (error) {
    console.error("Error inserting documents:", error);
  }
}

export async function findDocuments(collectionName, query = {}, sort) {
  const { db } = await connectToDatabase();

  try {
    const docs = await db
      .collection(collectionName)
      .find(query)
      .sort(sort)
      .toArray();
    return docs.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
    }));
  } catch (error) {
    console.error("Error finding documents:", error);
  }
}
