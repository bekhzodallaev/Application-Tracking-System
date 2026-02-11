import { ExtractedJobEvent } from '@/app/types/job';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function extractJobEvent(
  emailText: string
): Promise<ExtractedJobEvent | null> {
  const response = await openai.responses.create({
  model: 'gpt-3.5-turbo',
  temperature: 0,
  input: [
    {
      role: 'system',
      content: `
     You extract job application events from emails.

IMPORTANT:
- First decide if the email is related to a REAL job application.
- A job application means one of:
  - application confirmation
  - interview invitation
  - rejection
  - offer
- Emails that are NOT job applications include:
  - newsletters
  - events, conferences, summits
  - courses, promotions
  - marketing emails

Rules:
- Always return valid JSON.
- No markdown.
- No explanations.
- If NOT job-related:
  - isJobRelated = false
  - all other fields = null except confidence
- If job-related:
  - isJobRelated = true
  - status must be one of: applied, interview, rejected, offer, withdrawn, unknown
  - company: extract the company name mentioned in the email (after "at" or in the signature)
  - position: extract the job title (may appear after "position", "role", or "for the role of")
  - date: extract the date of application or event if mentioned, else null
  - event: describe the type of event (confirmation, interview, rejection, offer)
- confidence: between 0 and 1 (reflecting how sure you are this email is a job application)
- Always try to extract all available fields, but if information is missing, use null.
- Treat emails in any language, but extract company, position, and event accurately.

Example output if job-related:
{
  "isJobRelated": true,
  "status": "applied",
  "company": "Webellian",
  "position": "Full Stack Software Engineer (Node.js & React)",
  "date": "2026-01-28",
  "event": "application confirmation",
  "confidence": 0.95
}

Example output if NOT job-related:
{
  "isJobRelated": false,
  "status": null,
  "company": null,
  "position": null,
  "date": null,
  "event": null,
  "confidence": 0.95
}
`

    },
    {
      role: 'user',
      content: emailText,
    },
  ],
});


  const text = response.output_text;
  if (!text) return null;

  try {
    return JSON.parse(text) as ExtractedJobEvent;
  } catch {
    return null;
  }
}