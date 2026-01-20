import React from 'react'
import DashboardAnalytics from "@/public/landing/dashboard_analytics.png"
import Image from 'next/image';


const AboutUs = () => {
  return (
    <section id='aboutus' className="py-16 md:py-24 bg-linear-to-b from-teal-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image/Mockup */}
          <div className="relative  max-w-[640px] lg:max-w-none order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-teal-200/40 border border-teal-100">
              <div className="relative w-full h-[420px] md:h-[520px] lg:h-[600px]">
              <Image
                src={DashboardAnalytics} // ← put your screenshot here
                alt="JobTrack Dashboard"
                className="object-contain"
                  priority
                  fill
              />
              </div>

              {/* Floating badge effect */}
              <div className="absolute bottom-5 right-4 bg-white px-6 py-3 rounded-2xl shadow-lg border border-teal-100 text-teal-700 font-medium">
                Real-time tracking • 2026
              </div>
            </div>

            {/* Decorative gradient blob */}
            <div className="absolute -z-10 -top-20 -left-20 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-16 -right-16 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl" />
          </div>

          {/* Right - Text content */}
          <div className="order-1 lg:order-2">
            <div className="inline-block px-5 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold tracking-wide mb-6">
              OUR MISSION
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
              Simplify the job hunt,
              <br />
              <span className="text-teal-600">empower your career.</span>
            </h1>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                JobTrack was born out of frustration. We saw talented candidates losing opportunities
                not because they weren't qualified, but because the process of tracking applications
                across dozens of platforms was fundamentally broken.
              </p>

              <p>
                Our mission is to simplify the complex journey from applicant to employee.
                We build tools that provide clarity, automate the mundane, and give job seekers
                the data they need to negotiate with confidence.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-8 max-w-md">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-teal-600">2k+</div>
                <p className="mt-2 text-gray-600 font-medium">JOBS TRACKED</p>
              </div>

              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-teal-600">50+</div>
                <p className="mt-2 text-gray-600 font-medium">OFFERS LANDED</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs