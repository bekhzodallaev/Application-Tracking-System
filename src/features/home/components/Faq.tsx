import { ChevronDown } from "lucide-react";

export const metadata = {
  title: "JobTrack Help Center - Common Questions",
  description: "Find answers to the most common questions about JobTrack",
};

const faqs = [
  {
    question: "Is my data secure?",
    answer: (
      <>
        <p>Yes — we take data security very seriously.</p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>
            All data is encrypted in transit (TLS 1.3) and at rest (AES-256)
          </li>
          <li>
            We use secure cloud providers with SOC 2 Type II, ISO 27001
            certifications
          </li>
          <li>
            Access to your data is protected with role-based access control
            (RBAC)
          </li>
          <li>
            We never sell your personal data or job application information
          </li>
          <li>Regular independent security audits and penetration testing</li>
        </ul>
        <p className="mt-4">
          You can read our full{" "}
          <a href="/security" className="text-blue-600 hover:underline">
            Security & Privacy Policy
          </a>{" "}
          for more details.
        </p>
      </>
    ),
  },
  {
    question: "How does email sync work?",
    answer: (
      <>
        <p>
          JobTrack can connect to your Gmail / Outlook / other IMAP email
          accounts to automatically:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>Find emails from companies/recruiters where you applied</li>
          <li>Detect interview invitations and rejections</li>
          <li>Track follow-up reminders and thank-you notes</li>
          <li>Create timeline entries automatically</li>
        </ul>

        <div className="mt-6 bg-gray-50 p-5 rounded-xl border border-gray-200">
          <h4 className="font-medium mb-3">How to connect your email:</h4>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>Go to Settings → Email Sync</li>
            <li>Click &quot;Connect new email account&quot;</li>
            <li>Choose your provider (Gmail, Outlook, etc.)</li>
            <li>Grant the necessary read-only permissions</li>
            <li>That&apos;s it! Sync starts automatically</li>
          </ol>
        </div>

        <p className="mt-5 text-sm text-gray-600">
          Important: We only read emails — we never send anything from your
          account.
        </p>
      </>
    ),
  },
  {
    question: "Can I export my data?",
    answer: (
      <>
        <p className="mb-4">Yes — you can export all your data anytime.</p>

        <div className="space-y-4 mt-6">
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <h4 className="font-medium text-lg mb-2">
              Available export formats
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
              <li className="bg-gray-50 px-4 py-2.5 rounded-lg text-center">
                JSON
              </li>
              <li className="bg-gray-50 px-4 py-2.5 rounded-lg text-center">
                CSV
              </li>
              <li className="bg-gray-50 px-4 py-2.5 rounded-lg text-center">
                PDF (timeline)
              </li>
              <li className="bg-gray-50 px-4 py-2.5 rounded-lg text-center">
                Markdown
              </li>
            </ul>
          </div>

          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <h4 className="font-medium text-lg mb-2">How to export</h4>
            <ol className="list-decimal pl-5 space-y-2 mt-3 text-gray-700">
              <li>Settings → Privacy & Data</li>
              <li>Scroll to &quot;Export your data&quot;</li>
              <li>Select data you want to include</li>
              <li>Choose format</li>
              <li>Click Export → file will be prepared and downloaded</li>
            </ol>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-500 italic">
          Processing usually takes 10–90 seconds depending on how much data you
          have.
        </p>
      </>
    ),
  },
];

export default function Faq() {
  return (
    <div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      id="faq"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            HELP CENTER
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5">
            Common Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about JobTrack.
            <br className="hidden sm:block" />
            Can&apos;t find the answer you&apos;re looking for? Reach out to our support
            team.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <summary className="flex justify-between items-center cursor-pointer p-6 text-lg font-medium text-gray-900 hover:text-blue-700 transition-colors">
                {faq.question}
                <ChevronDown className="w-6 h-6 text-gray-400 group-open:rotate-180 transition-transform duration-300" />
              </summary>

              <div className="px-6 pb-6 pt-1 text-gray-700 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* Still need help? */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6 text-lg">Still have questions?</p>
          <a
            href="mailto:support@jobtrack.app"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors text-lg shadow-lg shadow-blue-200/50"
          >
            Contact Support →
          </a>
        </div>
      </div>
    </div>
  );
}
