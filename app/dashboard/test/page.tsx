// app/dashboard/test/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';

export default function TestDashboard() {
  const searchParams = useSearchParams();
  const gmailStatus = searchParams.get('gmail');

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Job Applications Dashboard (Test)</h1>

      {gmailStatus === 'connected' && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
          <p className="font-medium text-green-800">
            Gmail successfully connected! 🎉
          </p>
          <p className="text-green-700 mt-1">
            Your inbox will now be scanned for job application updates.
          </p>
        </div>
      )}

      {gmailStatus === 'error' && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <p className="font-medium text-red-800">Connection failed</p>
          <p className="text-red-700 mt-1">Please try again or check the console for errors.</p>
        </div>
      )}

      <p className="text-gray-600">
        Your tracked applications will appear here soon...
      </p>
    </div>
  );
}