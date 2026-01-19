import Image from "next/image";
import Navbar from "./components/landing/Navbar";
import Hero from "./public/landing/Hero";
import Features from "./public/landing/Features";
import Pricing from "./public/landing/Pricing";
import AboutUs from "./public/landing/AboutUs";
import Testimonials from "./public/landing/Testimonials";
import Faq from "./public/landing/Faq";
import Footer from "./components/landing/Footer";

export default function Home() {
  
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <AboutUs />
      <Testimonials />
      <Faq />
      <Footer />
    </div>
  )
  
}
