import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AboutUs() {
  return (
    <section id="about" className="py-16 bg-neutral-lightest">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="ClassConnect team at work" 
              className="rounded-xl shadow-lg w-full h-auto" 
            />
          </div>
          <div className="lg:w-1/2">
            <span className="inline-block px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm font-medium mb-3">
              ABOUT US
            </span>
            <h2 className="font-heading font-bold text-3xl mb-6">Created by Students, for Students</h2>
            <p className="text-secondary-dark mb-6">
              ClassConnect was founded by a group of college students who were frustrated with the difficulty of finding and booking local classes and workshops. We believe that education extends beyond the classroom, and that everyone should have easy access to skill-building opportunities in their community.
            </p>
            <p className="text-secondary-dark mb-8">
              Our platform connects students with local instructors and venues, making it simple to discover, book, and share classes that complement your academic journey or simply bring joy to your college experience.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-primary font-heading font-bold text-3xl mb-2">500+</div>
                <p className="text-secondary-dark text-sm">Active Classes</p>
              </div>
              <div className="text-center">
                <div className="text-primary font-heading font-bold text-3xl mb-2">15K+</div>
                <p className="text-secondary-dark text-sm">Students</p>
              </div>
              <div className="text-center">
                <div className="text-primary font-heading font-bold text-3xl mb-2">200+</div>
                <p className="text-secondary-dark text-sm">Instructors</p>
              </div>
              <div className="text-center">
                <div className="text-primary font-heading font-bold text-3xl mb-2">30+</div>
                <p className="text-secondary-dark text-sm">Categories</p>
              </div>
            </div>
            
            <Button className="inline-flex items-center px-6 py-3 bg-primary text-white font-heading font-semibold hover:bg-primary-dark">
              Learn More About Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
