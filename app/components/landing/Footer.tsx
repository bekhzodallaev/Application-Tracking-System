import React from 'react'
import Link from 'next/link';

const Footer = () => {

    return (

        <section className="relative bg-linear-to-b from-gray-950 via-gray-950 to-gray-900 pt-24 pb-16 overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.12)_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* CTA Content */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-8">
            Ready to land your{" "}
            <span className="text-blue-400">dream job</span>?
          </h2>

          <p className="text-xl sm:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Join thousands of candidates who have organized their search with JobTrack.
            <br className="hidden sm:block" />
            It's <span className="font-semibold text-white">free</span> to get started.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-0.5 min-w-[220px]"
            >
              Get Started for Free
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-medium text-gray-200 border border-gray-700 hover:border-gray-500 hover:text-white rounded-full transition-all duration-200 min-w-[220px]"
            >
              Talk to Our Team
            </Link>
          </div>

          <p className="text-base text-gray-400">
            No credit card required. Cancel anytime.
          </p>
        </div>

        {/* Footer Links + Branding */}
        <div className="border-t border-gray-800 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {/* Brand Column */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-full bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                  J
                </div>
                <span className="text-2xl font-semibold text-white">JobTrack</span>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                The modern standard for personal career management.
                <br />
                Organize, analyze, and accelerate your job search.
              </p>

              <div className="flex items-center gap-5 text-gray-500">
                <a href="#" className="hover:text-gray-300 transition-colors">
                  🌐
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  @
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  💬
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Product</h3>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><Link href="/features" className="hover:text-gray-200 transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-gray-200 transition-colors">Pricing</Link></li>
                <li><Link href="/testimonials" className="hover:text-gray-200 transition-colors">Testimonials</Link></li>
                <li><Link href="/integrations" className="hover:text-gray-200 transition-colors">Integrations</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><Link href="/about" className="hover:text-gray-200 transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-gray-200 transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-gray-200 transition-colors">Contact</Link></li>
                <li><Link href="/blog" className="hover:text-gray-200 transition-colors">Blog</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Legal</h3>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><Link href="/privacy" className="hover:text-gray-200 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-gray-200 transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-gray-200 transition-colors">Cookie Policy</Link></li>
                <li><Link href="/security" className="hover:text-gray-200 transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-gray-500">
            <div>
              © {new Date().getFullYear()} JobTrack Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-3">
              <span>English (US)</span>
              <span className="text-gray-600">•</span>
              <span>© English (US)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;