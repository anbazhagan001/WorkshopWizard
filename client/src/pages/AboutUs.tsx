import { Helmet } from "react-helmet";
import { FaRegLightbulb, FaRegHandshake, FaRegCompass } from "react-icons/fa";
import AboutUs from "@/components/AboutUs";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-neutral-lightest">
      <Helmet>
        <title>About Us | ClassConnect</title>
        <meta name="description" content="Learn more about ClassConnect's mission to connect college students with local classes and workshops to enhance their skills and knowledge." />
        <meta property="og:title" content="About Us | ClassConnect" />
        <meta property="og:description" content="Learn more about ClassConnect's mission to connect college students with local classes and workshops to enhance their skills and knowledge." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-neutral-darkest">
            About <span className="text-primary">ClassConnect</span>
          </h1>
          <p className="text-secondary-dark max-w-2xl mx-auto text-lg mb-10">
            Connecting college students with local classes and workshops to enhance their educational experience and develop new skills.
          </p>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                alt="Students collaborating" 
                className="rounded-xl shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="font-heading font-bold text-3xl mb-6 text-neutral-darkest">Our Mission</h2>
              <p className="text-secondary-dark mb-6">
                At ClassConnect, we believe that education extends beyond the classroom. Our mission is to bridge the gap between traditional academic learning and practical, hands-on experience by connecting college students with local classes, workshops, and educational experiences.
              </p>
              <p className="text-secondary-dark mb-6">
                We're committed to making quality education more accessible, diverse, and engaging for students from all backgrounds. By partnering with local businesses, experts, and instructors, we create opportunities for students to expand their skills, explore new interests, and build meaningful connections within their communities.
              </p>
              <p className="text-secondary-dark">
                Whether you're looking to enhance your resume, pursue a passion project, or simply try something new, ClassConnect is your gateway to a world of educational possibilities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 bg-neutral-lightest">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl mb-4 text-center text-neutral-darkest">Our Values</h2>
          <p className="text-secondary-dark mb-12 text-center max-w-3xl mx-auto">
            These core principles guide everything we do at ClassConnect
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center rounded-full mb-6">
                <FaRegLightbulb className="text-primary text-2xl" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-4 text-neutral-darkest">Accessible Education</h3>
              <p className="text-secondary-dark">
                We believe that quality education should be accessible to all students, regardless of their background or resources. We work to eliminate barriers and create inclusive learning opportunities.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center rounded-full mb-6">
                <FaRegHandshake className="text-primary text-2xl" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-4 text-neutral-darkest">Community Connection</h3>
              <p className="text-secondary-dark">
                By fostering relationships between students and local experts, we strengthen community bonds and create networks that benefit everyone involved in the educational experience.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center rounded-full mb-6">
                <FaRegCompass className="text-primary text-2xl" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-4 text-neutral-darkest">Continuous Growth</h3>
              <p className="text-secondary-dark">
                Learning is a lifelong journey. We encourage students to continuously expand their horizons, develop new skills, and embrace growth opportunities both personally and professionally.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <AboutUs />
      
      {/* Team Section */}
      <TeamSection />
      
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}