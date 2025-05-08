import { Search, CalendarCheck, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaApple, FaGooglePlay } from "react-icons/fa";

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm font-medium mb-3">
            HOW IT WORKS
          </span>
          <h2 className="font-heading font-bold text-3xl mb-4">Find and Book Classes in 3 Easy Steps</h2>
          <p className="text-secondary-dark max-w-2xl mx-auto">
            ClassConnect makes it simple to discover and reserve spots in local classes and workshops.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 flex items-center justify-center bg-primary bg-opacity-10 text-primary rounded-full mb-6">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-4">Search & Discover</h3>
            <p className="text-secondary-dark">
              Browse classes by category, date, or location to find options that match your interests and schedule.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 flex items-center justify-center bg-primary bg-opacity-10 text-primary rounded-full mb-6">
              <CalendarCheck className="h-8 w-8" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-4">Book Instantly</h3>
            <p className="text-secondary-dark">
              See real-time availability and secure your spot in seconds with our seamless booking system.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 flex items-center justify-center bg-primary bg-opacity-10 text-primary rounded-full mb-6">
              <Share2 className="h-8 w-8" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-4">Share with Friends</h3>
            <p className="text-secondary-dark">
              Easily share classes on social media and invite friends to join you for a better experience.
            </p>
          </div>
        </div>
        
        <div className="mt-12 p-8 bg-neutral-lightest rounded-xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
              <h3 className="font-heading font-bold text-2xl mb-4">Ready to discover amazing classes?</h3>
              <p className="text-secondary-dark mb-6">
                Download our app to get notifications about new classes and exclusive discounts for college students.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button variant="default" className="flex items-center justify-center px-5 py-6 bg-neutral-darkest text-white rounded-lg hover:bg-black transition">
                  <FaApple className="text-2xl mr-3" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-base font-semibold">App Store</div>
                  </div>
                </Button>
                <Button variant="default" className="flex items-center justify-center px-5 py-6 bg-neutral-darkest text-white rounded-lg hover:bg-black transition">
                  <FaGooglePlay className="text-2xl mr-3" />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-base font-semibold">Google Play</div>
                  </div>
                </Button>
              </div>
            </div>
            <div className="md:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200" 
                alt="ClassConnect mobile app" 
                className="rounded-xl shadow-md mx-auto w-56" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
