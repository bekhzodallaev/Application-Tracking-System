// app/lib/db.server.ts
import { MongoClient, Db, Collection } from 'mongodb';
import clientPromise from './mongodb'; // your original promise that resolves to MongoClient
import 'server-only';

// ── Type declaration for global (fixes TS18048 / implicit any) ──
declare global {
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


export async function getUserJobApplications(userId: string) {
  const client = await clientPromise;
  const db = client.db('ats'); // same DB as insert

  const collection = db.collection('jobApplications');

  const applications = await collection
    .find({ userId }) 
    .sort({ date: -1 })
    .toArray();

  return applications;
}

export async function getJobApplicationStats(userId: string) {
    
   const client = await clientPromise;
  const db = client.db('ats'); // ← use the same DB as inserts

  const collection = db.collection('jobApplications');

  const count = await collection.countDocuments({ userId });
  console.log('JOB APPLICATION COUNT:', count);
  console.log('USER ID USED:', userId);

  const result = await collection
    .aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },

          applied: {
            $sum: {
              $cond: [{ $eq: ["$status", "applied"] }, 1, 0]
            }
          },

          interviews: {
            $sum: {
              $cond: [{ $eq: ["$status", "interview"] }, 1, 0]
            }
          },

          offers: {
            $sum: {
              $cond: [{ $eq: ["$status", "offer"] }, 1, 0]
            }
          },

          rejections: {
            $sum: {
              $cond: [{ $eq: ["$status", "rejected"] }, 1, 0]
            }
          },

          withdrawn: {
            $sum: {
              $cond: [{ $eq: ["$status", "withdrawn"] }, 1, 0]
            }
          },

          unknown: {
            $sum: {
              $cond: [{ $eq: ["$status", "unknown"] }, 1, 0]
            }
          }
        }
      }
    ])
    .toArray();
  
  console.log("AGG Result: ", result);

  return result[0] ?? {
    total: 0,
    applied: 0,
    interviews: 0,
    offers: 0,
    rejections: 0,
    withdrawn: 0,
    unknown: 0
  };
}
