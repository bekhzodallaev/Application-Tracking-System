// app/lib/analytics.server.ts
import clientPromise from './mongodb';

export async function getApplicationAnalytics(userId: string) {
  const client = await clientPromise;
  const db = client.db('ats');
  const collection = db.collection('jobApplications');

  const total = await collection.countDocuments({ userId });

  const [funnel, roles, avgTime] = await Promise.all([
    getFunnelData(collection, userId, total),
    getRoleDistribution(collection, userId, total),
    getAvgTimeInStage(collection, userId),
  ]);

  return {
    funnelData: funnel,
    jobRoleData: roles,
    avgTimeData: avgTime,
  };
}

/* ---------- Funnel ---------- */
async function getFunnelData(collection: any, userId: string, total: number) {
  return collection
    .aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$status',
          value: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          stage: '$_id',
          value: 1,
          percent: {
            $round: [
              { $multiply: [{ $divide: ['$value', total] }, 100] },
              1
            ]
          }
        }
      }
    ])
    .toArray();
}

/* ---------- Roles ---------- */
async function getRoleDistribution(collection: any, userId: string, total: number) {
  return collection
    .aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$position',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          role: '$_id',
          percent: {
            $round: [
              { $multiply: [{ $divide: ['$count', total] }, 100] },
              1
            ]
          }
        }
      }
    ])
    .toArray();
}

/* ---------- Avg Time ---------- */
async function getAvgTimeInStage(collection: any, userId: string) {
  return collection
    .aggregate([
      {
        $match: {
          userId,
          enteredAt: { $exists: true },
          exitedAt: { $exists: true }
        }
      },
      {
        $project: {
          stage: '$status',
          days: {
            $divide: [
              { $subtract: ['$exitedAt', '$enteredAt'] },
              1000 * 60 * 60 * 24
            ]
          }
        }
      },
      {
        $group: {
          _id: '$stage',
          days: { $avg: '$days' }
        }
      },
      {
        $project: {
          _id: 0,
          stage: '$_id',
          days: { $round: ['$days', 1] }
        }
      }
    ])
    .toArray();
}
