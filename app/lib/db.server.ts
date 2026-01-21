// app/lib/db.server.ts
import { MongoClient, Db, Collection } from 'mongodb';
import clientPromise from './mongodb'; // your original promise that resolves to MongoClient
import 'server-only';

// ── Type declaration for global (fixes TS18048 / implicit any) ──
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Cache the DB and collection (singleton pattern)
let cachedDb: Db | undefined;
let cachedUsers: Collection | undefined;

// Initialize the global promise if not set (HMR-safe in dev)
if (!global._mongoClientPromise) {
  global._mongoClientPromise = clientPromise; // clientPromise should be Promise<MongoClient>
}

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = await global._mongoClientPromise!; // ! = non-null assertion (safe here)

  // Optional: specify DB name if not default
  // cachedDb = client.db('your-database-name');
  cachedDb = client.db();

  return cachedDb;
}

export async function getUsersCollection(): Promise<Collection> {
  if (cachedUsers) return cachedUsers;

  const db = await getDb();
  cachedUsers = db.collection('users');

  return cachedUsers;
}