import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import AboutUs from "../components/AboutUs";
import Testimonials from "../components/Testimonials";
import Faq from "../components/Faq";

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col">
        <Hero />
        <Features />
        <Pricing />
        <AboutUs />
        <Testimonials />
        <Faq />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
