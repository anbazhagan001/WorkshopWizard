import { Testimonial } from "@/lib/data";
import { Star, StarHalf } from "lucide-react";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-yellow-400 text-yellow-400" />);
    }
    
    return stars;
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-8 h-full">
      <div className="flex items-center mb-6">
        <img 
          src={testimonial.imageUrl} 
          alt={testimonial.name} 
          className="w-14 h-14 rounded-full object-cover mr-4" 
        />
        <div>
          <h4 className="font-heading font-bold text-lg">{testimonial.name}</h4>
          <p className="text-secondary">{testimonial.title}</p>
        </div>
      </div>
      <div className="mb-4 text-yellow-400 flex">
        {renderStars(testimonial.rating)}
      </div>
      <p className="text-secondary-dark mb-4">{testimonial.comment}</p>
      <div className="text-primary text-sm font-medium">
        Took: {testimonial.classTaken}
      </div>
    </div>
  );
}
