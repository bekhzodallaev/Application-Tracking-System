// components/landing/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-black">App</span>
          <span className="rounded bg-black px-1.5 py-0.5 text-white">Trackr</span>
        </Link>

        {/* Navigation links - only visible on larger screens */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm font-medium text-gray-600 hover:text-black transition"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-gray-600 hover:text-black transition"
          >
            Pricing
                  </Link>

         <Link
            href="#aboutus"
            className="text-sm font-medium text-gray-600 hover:text-black transition"
          >
            AboutUs
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-gray-600 hover:text-black transition"
          >
            FAQ
          </Link>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/auth/signin"
            className="text-sm font-medium text-gray-700 hover:text-black transition"
          >
            Sign in
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition"
          >
            Get started free
          </Link>
        </div>
      </nav>
    </header>
  );
}