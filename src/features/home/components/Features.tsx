import React from 'react'

const Features = () => {
  return (
    
    <section className="py-20 md:py-28 lg:py-32 bg-slate-950 text-white" id='features'>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Everything you need to{" "}
            <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              succeed
            </span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Powerful features designed to take the stress out of job hunting and help you
            focus on what matters—your career.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Feature 1 - Automated Sync */}
          <div className="group relative bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-indigo-600/50 hover:shadow-xl hover:shadow-indigo-900/20">
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-cyan-400">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>

            <h3 className="text-2xl font-bold mb-4">Automated Sync</h3>
            <p className="text-slate-300 leading-relaxed">
              Instantly import job details from any job board or company career page with our
              browser extension. <span className="font-medium text-white">No manual data entry required.</span>
            </p>
          </div>

          {/* Feature 2 - Visual Kanban */}
          <div className="group relative bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-purple-600/50 hover:shadow-xl hover:shadow-purple-900/20">
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-r from-purple-500/20 to-indigo-600/20 border border-purple-500/30 text-purple-400">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                />
              </svg>
            </div>

            <h3 className="text-2xl font-bold mb-4">Visual Kanban</h3>
            <p className="text-slate-300 leading-relaxed">
              Manage your entire pipeline with a customizable drag-and-drop board. Clear visual
              status for <span className="font-medium text-white">every single application</span> you&apos;re tracking.
            </p>
          </div>

          {/* Feature 3 - Detailed Analytics */}
          <div className="group relative bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-pink-600/50 hover:shadow-xl hover:shadow-pink-900/20">
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-r from-pink-500/20 to-rose-600/20 border border-pink-500/30 text-pink-400">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>

            <h3 className="text-2xl font-bold mb-4">Detailed Analytics</h3>
            <p className="text-slate-300 leading-relaxed">
              Identify patterns in your search with deep insights into conversion rates, response
              times, and <span className="font-medium text-white">interview performance metrics</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features