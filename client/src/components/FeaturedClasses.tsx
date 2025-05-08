import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import ClassCard from "./ClassCard";
import { ArrowRight } from "lucide-react";
import { Class } from "@shared/schema";

export default function FeaturedClasses() {
  const { data: classes, isLoading, isError } = useQuery<Class[]>({
    queryKey: ['/api/classes/featured'],
  });
  
  return (
    <section id="explore" className="py-16 bg-neutral-lightest">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm font-medium mb-3">
            FEATURED CLASSES
          </span>
          <h2 className="font-heading font-bold text-3xl mb-4">Trending Classes Near You</h2>
          <p className="text-secondary-dark max-w-2xl mx-auto">
            Discover the most popular classes among college students. These fill up quickly, so book your spot now!
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-96 bg-white rounded-xl shadow-md animate-pulse"></div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load classes. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes?.map((classItem) => (
              <ClassCard key={classItem.id} classItem={classItem} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Button variant="outline" className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-heading font-semibold hover:bg-primary hover:text-white">
            View All Classes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
