import { FaApple, FaGooglePlay } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function AppDownloadBanner() {
  return (
    <section className="py-12 bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-4">
              Download the ClassConnect App
            </h2>
            <p className="text-white text-opacity-90 mb-6 max-w-xl">
              Get notified about new classes, manage your bookings, and connect with other students on the go.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
              <Button 
                variant="secondary" 
                className="flex items-center justify-center px-5 py-3 bg-white text-primary rounded-lg hover:bg-neutral-lightest transition"
              >
                <FaApple className="text-2xl mr-3" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-base font-semibold">App Store</div>
                </div>
              </Button>
              <Button 
                variant="secondary" 
                className="flex items-center justify-center px-5 py-3 bg-white text-primary rounded-lg hover:bg-neutral-lightest transition"
              >
                <FaGooglePlay className="text-2xl mr-3" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-base font-semibold">Google Play</div>
                </div>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600" 
              alt="ClassConnect mobile app" 
              className="rounded-xl shadow-lg w-56 z-10 relative" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
