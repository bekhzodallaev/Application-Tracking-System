
# AppTrackr

**A web-based job application tracker with automated Gmail integration and OpenAI-powered email parsing**

AppTrackr helps job seekers manage the chaos of job applications by automatically detecting, parsing, and organizing recruiter emails from Gmail. It turns scattered inbox messages into a clean dashboard with timelines, statuses, and analytics — no manual entry required.

Built as a thesis/diploma project to demonstrate full-stack development, secure API integrations, and AI-driven automation.

## ✨ Features

- **Automated Gmail Integration** — Secure OAuth 2.0 connection to scan and fetch job-related emails (Gmail API).
- **Intelligent Email Parsing** — Uses OpenAI API (structured outputs) to extract key details from unstructured emails: company, position, status (e.g., Submitted, Interview Scheduled, Rejected), date, notes.
- **Centralized Dashboard** — Overview of all applications with current statuses and recent activity.
- **Application Timelines** — Visual chronological progress for each job.
- **Analytics** — Charts for submission trends, response rates, outcome statistics.
- **User Settings** — Profile management, Gmail connection, preferences.
- **Privacy-Focused** — Read-only Gmail access; only parsed JSON stored (no full emails).

**Planned / Future Enhancements**:
- AI-powered interview preparation (personalized questions & tips)
- Telegram bot for real-time notifications & reminders
- Outlook integration & calendar sync
- Advanced ML insights & mobile PWA

## 🛠 Tech Stack

- **Frontend & Full-Stack**: Next.js (App Router, Server Components, API Routes)
- **UI Library**: React + Tailwind CSS
- **Database**: MongoDB (flexible schemas for parsed data)
- **Integrations**:
  - Gmail API (OAuth 2.0, email fetching)
  - OpenAI API (gpt-4o-mini or similar for structured JSON parsing)
- **Runtime**: Node.js
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- MongoDB (Atlas)
- Google Cloud Console project (for Gmail API credentials)
- OpenAI API key

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/apptrackr.git
   cd apptrackr
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` and fill in your secrets:
   ```
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   MONGODB_URI=mongodb+srv://...
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   OPENAI_API_KEY=sk-...
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

### Setup Google OAuth & Gmail API

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create OAuth 2.0 Client ID (Web application)
3. Add authorized redirect URI: `http://localhost:3000/api/auth/gmail/callback`
4. Enable Gmail API
5. Use the Client ID & Secret in `.env.local`

### OpenAI Setup

Add your API key to `.env.local`. The app uses structured outputs for reliable JSON parsing.

## 📊 Screenshots

![Dashboard Overview](https://github.com/user-attachments/assets/21e3cd26-29d7-4f29-8d09-e481aa60765d)

![Application Timeline](https://github.com/user-attachments/assets/21380316-d6fd-4f33-a862-da10732caba8)

![Analytics](https://github.com/user-attachments/assets/e40a06e3-d02f-4814-a31f-cc122ca3af2d)


## 🔒 Security & Privacy Notes

- Uses read-only Gmail scopes (`gmail.readonly`)
- Tokens stored encrypted in DB
- No full email bodies stored — only extracted JSON
- User can revoke access anytime via Google account settings


## 🧪 Testing & Development Notes

- Parsing accuracy tested ~85-95% on real/simulated job emails
- Error handling & fallbacks included (manual entry if parsing fails)
- Rate limiting & cost optimization via pre-filtering

## 🤝 Contributing

Contributions welcome! Especially for:
- Better email parsing prompts
- Additional providers (Outlook)
- UI/UX polish.
