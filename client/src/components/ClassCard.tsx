import { MapPin, Calendar, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Class } from "@shared/schema";
import { toast } from "@/hooks/use-toast";

interface ClassCardProps {
  classItem: Class;
}

export default function ClassCard({ classItem }: ClassCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  
  const getAvailabilityStatus = (seats: number) => {
    if (seats > 10) {
      return {
        text: `${seats} Seats Available`,
        color: "text-green-600",
        icon: "text-green-600"
      };
    } else if (seats > 0) {
      return {
        text: `${seats} Seats Left`,
        color: "text-yellow-600",
        icon: "text-yellow-600"
      };
    } else {
      return {
        text: "Fully Booked",
        color: "text-red-600",
        icon: "text-red-600"
      };
    }
  };
  
  const status = getAvailabilityStatus(classItem.seats);
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: classItem.title,
        text: `Check out this ${classItem.title} class on ClassConnect!`,
        url: window.location.href
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      toast({
        title: "Sharing",
        description: "Link copied to clipboard!",
      });
    }
  };
  
  const toggleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from favorites" : "Added to favorites",
      description: isSaved ? "Class removed from your saved items" : "Class added to your saved items",
    });
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <img 
          src={classItem.imageUrl} 
          alt={classItem.title} 
          className="w-full h-48 object-cover" 
        />
        <div className="absolute top-4 left-4">
          <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-medium">
            {classItem.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white bg-opacity-90 px-3 py-1 rounded-full text-xs font-medium flex items-center">
            <span className={`inline-block h-2 w-2 rounded-full ${status.icon} mr-1`}></span>
            {status.text}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading font-bold text-xl">{classItem.title}</h3>
          <span className="bg-primary-light bg-opacity-10 text-primary-dark px-2 py-1 rounded text-sm font-medium">
            ${classItem.price}
          </span>
        </div>
        <p className="text-secondary-dark mb-4">{classItem.description}</p>
        <div className="flex items-center text-secondary mb-4">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{classItem.location}</span>
        </div>
        <div className="flex items-center text-secondary mb-6">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{classItem.date} • {classItem.time}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex">
            <Button 
              onClick={handleShare}
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-neutral-lightest text-secondary-dark hover:bg-primary hover:text-white transition mr-2" 
              title="Share on social media"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button 
              onClick={toggleSave}
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-neutral-lightest text-secondary-dark hover:bg-red-500 hover:text-white transition" 
              title="Save to favorites"
            >
              {isSaved ? (
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              ) : (
                <Heart className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button className="px-4 py-2 bg-primary text-white hover:bg-primary-dark transition font-medium">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
