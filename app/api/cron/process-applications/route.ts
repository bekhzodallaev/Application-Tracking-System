// import { NextResponse } from 'next/server';
// import clientPromise from '@/app/lib/mongodb';
// import { extractJobEvent } from '@/app/lib/extract-job';


// export const dynamic = 'force-dynamic'; 

// export async function GET() {
//   // Optional: Secure it (Vercel cron calls without auth, but good practice)
//   // if (request.headers.get('x-vercel-cron') !== 'true') { // or use a secret env var
//   //   return new Response('Not authorized', { status: 403 });
//     // }
    


//   try {

// // ... rest of loop with per-item logs
//     const client = await clientPromise;
//     const db = client.db('ats'); 
//       const collection = db.collection('jobApplications');
      
//       console.log('Cron started at', new Date().toISOString());
// console.log('MongoDB URI exists?', !!process.env.MONGODB_URI);
// console.log('Mongo connected successfully');
// const pending = await collection.find({ status: 'pending' }).limit(10).toArray();
// console.log('Found pending count:', pending.length);

//     // Fetch a small batch of pending docs (adjust limit to fit execution time)
//     const pendingDocs = await collection
//       .find({ status: 'pending' })
//       .limit(8) // Start conservative — each OpenAI call ~1-4s; 8 × 4s = ~32s max, but aim <10s total
//       .toArray();

//     if (pendingDocs.length === 0) {
//       return NextResponse.json({ message: 'No pending job applications to process' });
//     }

//     let processed = 0;
//     let failed = 0;

//     for (const doc of pendingDocs) {
//       try {
//         // Build the text to feed to OpenAI
//         // Adapt based on how you store the email
//         const emailText =
//           doc.rawEmail?.body ||
//           doc.rawEmail?.text ||
//           doc.rawEmail?.plainText ||
//           ''; // fallback

//         // If you store attachments/base64 PDFs/resumes → add parsing here first
//         // e.g.:
//         // if (doc.rawEmail?.attachments?.[0]?.content) {
//         //   const pdfText = await parsePdf(doc.rawEmail.attachments[0].content);
//         //   emailText += '\n\n' + pdfText;
//         // }

//         const extracted = await extractJobEvent(emailText);

//         if (!extracted) {
//           throw new Error('No valid extraction returned');
//         }

//         await collection.updateOne(
//           { _id: doc._id },
//           {
//             $set: {
//               extracted, // your ExtractedJobEvent type
//               status: extracted.isJobRelated ? 'processed' : 'processed_non_job',
//               processedAt: new Date(),
//               // Optional: confidence: extracted.confidence,
//             },
//           }
//         );

//         processed++;
//       } catch (err) {
//         console.error(`Failed to extract for doc ${doc._id.toString()}:`, err);

//         await collection.updateOne(
//           { _id: doc._id },
//           {
//             $set: {
//               status: 'failed',
//               errorMessage: (err as Error).message?.slice(0, 500) || 'Extraction error',
//               processedAt: new Date(),
//             },
//           }
//         );

//         failed++;
//       }
//     }

//     return NextResponse.json({
//       success: true,
//       processed,
//       failed,
//       handled: pendingDocs.length,
//     });
//   } catch (err) {
//     console.error('Cron job failed:', err);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

export async function GET() {
  console.log("🔥 CRON HIT");

  return new Response("OK");
}