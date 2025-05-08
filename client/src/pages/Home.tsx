import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchAndFilter from "@/components/SearchAndFilter";
import FeaturedClasses from "@/components/FeaturedClasses";
import HowItWorks from "@/components/HowItWorks";
import AboutUs from "@/components/AboutUs";
import TeamSection from "@/components/TeamSection";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>ClassConnect - Find Local Classes & Workshops</title>
        <meta name="description" content="Find and book local classes and workshops with real-time availability. Perfect for college students looking to expand their skills." />
        <meta property="og:title" content="ClassConnect - Find Local Classes & Workshops" />
        <meta property="og:description" content="Discover local classes and workshops with real-time availability. Find the perfect classes to complement your college education or explore new interests." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1523240795612-9a054b0db644" />
      </Helmet>
      
      <div className="font-body text-neutral-darkest bg-neutral-lightest">
        <Navbar />
        <Hero />
        <SearchAndFilter />
        <FeaturedClasses />
        <HowItWorks />
        <AboutUs />
        <TeamSection />
        <Testimonials />
        <ContactSection />
        <AppDownloadBanner />
        <Footer />
      </div>
    </>
  );
}
