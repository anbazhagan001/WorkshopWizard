import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1023px)');
  
  const visibleSlides = isMobile ? 1 : isTablet ? 2 : 3;
  const maxSlides = testimonials.length - visibleSlides + 1;
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="testimonials" className="py-16 bg-primary bg-opacity-5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm font-medium mb-3">
            TESTIMONIALS
          </span>
          <h2 className="font-heading font-bold text-3xl mb-4">What Students Are Saying</h2>
          <p className="text-secondary-dark max-w-2xl mx-auto">
            See how ClassConnect has helped college students discover new skills and interests.
          </p>
        </div>
        
        <div className="relative" id="testimonial-carousel">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ 
                transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)`,
                width: `${(testimonials.length / visibleSlides) * 100}%`
              }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="px-4"
                  style={{ width: `${100 / testimonials.length * visibleSlides}%` }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Controls */}
          <Button 
            onClick={prevSlide}
            variant="default" 
            size="icon" 
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-primary hover:text-primary-dark focus:outline-none hidden md:flex"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button 
            onClick={nextSlide}
            variant="default" 
            size="icon" 
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-primary hover:text-primary-dark focus:outline-none hidden md:flex"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          
          {/* Mobile Dots */}
          <div className="flex justify-center space-x-2 mt-6 md:hidden">
            {[...Array(maxSlides)].map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-3 h-3 rounded-full ${currentSlide === i ? 'bg-primary' : 'bg-neutral-light'}`}
                aria-label={`Go to slide ${i + 1}`}
              ></button>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-heading font-semibold hover:bg-primary hover:text-white"
          >
            Read More Testimonials
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
