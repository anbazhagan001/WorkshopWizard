import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
              Discover Local Classes & Workshops with Real-Time Availability
            </h1>
            <p className="text-lg md:text-xl mb-8 text-neutral-lightest">
              Find the perfect classes to complement your college education or explore new interests. 
              Share experiences with friends and classmates instantly.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="#explore">
                <Button size="lg" className="px-6 py-6 bg-accent text-neutral-darkest font-heading font-semibold hover:bg-accent-dark">
                  Explore Classes
                </Button>
              </Link>
              <Button size="lg" variant="secondary" className="px-6 py-6 bg-white text-primary font-heading font-semibold hover:bg-neutral-lightest">
                How It Works
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-10">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="College students discovering classes" 
              className="rounded-lg shadow-2xl w-full h-auto object-cover" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
