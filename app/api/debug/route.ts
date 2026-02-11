import { NextResponse } from 'next/server';
import { extractJobEvent } from '@/app/lib/extract-job';

export async function GET() {
  const sampleEmail = `
Thank you for applying to the Software Engineer position at Google.
We received your application on January 12, 2026.
We have received your application and our team will review it.
If selected, we will contact you for an interview.

Best regards,
Google Recruiting
  `;

  const result = await extractJobEvent(sampleEmail);

  console.log('🧠 LLM extracted job event:', result);

  return NextResponse.json({
    ok: true,
    result,
  });
}
