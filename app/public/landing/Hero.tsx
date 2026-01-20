// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import Dashboard from "@/public/landing/dashboard.png"

export default function Hero() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-950 text-white" id='hero'>
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 px-5 sm:px-8 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15),transparent_40%)]" />

        <div className="max-w-7xl mx-auto relative">
          {/* New feature badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 backdrop-blur-sm border border-indigo-500/30 rounded-full text-indigo-300 text-sm font-medium">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
              NEW: AI Interview Prep
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Track Your{' '}
              <span className="bg-linear-to-br from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Career
              </span>{' '}
              Journey
              <br />
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                with <span className="text-white">Ease</span>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mt-6 mb-10 max-w-3xl mx-auto leading-relaxed">
              Stop losing track of your applications. Organize your job search, sync your emails, and land your dream role
              with our intuitive tracking system.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-10">
              <Link
                href="/signup"
                className="px-10 py-5 bg-linear-to-br from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-semibold rounded-xl text-lg shadow-lg shadow-indigo-900/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-indigo-900/40"
              >
                Get Started for Free
              </Link>

              <Link
                href="/demo"
                className="px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 text-white font-semibold rounded-xl text-lg transition-all duration-300 flex items-center gap-2 hover:scale-[1.03]"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Demo
              </Link>
            </div>
          </div>

          {/* Mockup + Notification */}
          <div className="mt-16 md:mt-24 relative max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-slate-700/50 bg-slate-900">
              <Image
                src={Dashboard} // ← replace with your real screenshot
                alt="Nammlion Dashboard"
                width={1920}
                height={1080}
                priority
                className="w-full h-auto"
              />

              {/* Floating notification */}
              <div className="absolute bottom-8 right-8 animate-float">
                <div className="bg-emerald-500/90 backdrop-blur-md text-white px-6 py-4 rounded-xl shadow-xl shadow-emerald-900/30 border border-emerald-400/30 flex items-center gap-3">
                  <div className="bg-white rounded-full p-2">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold">New Offer Received</div>
                    <div className="text-emerald-100 text-sm">Product Designer @ Stripe</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* You can add more sections below */}
    </main>
  );
}