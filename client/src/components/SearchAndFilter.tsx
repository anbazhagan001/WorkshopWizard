import { Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useState } from "react";

export default function SearchAndFilter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality here
    console.log({
      searchQuery,
      selectedCategory,
      selectedDate
    });
  };
  
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-neutral-lightest rounded-xl shadow-lg p-6">
          <h2 className="font-heading font-bold text-2xl mb-6 text-center">Find Your Perfect Class</h2>
          
          <form className="mb-6" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <Label htmlFor="search" className="block text-secondary-dark mb-2 font-medium">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary h-5 w-5" />
                  <Input 
                    id="search" 
                    placeholder="Keywords, class name, etc." 
                    className="w-full pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="md:w-1/4">
                <Label htmlFor="category" className="block text-secondary-dark mb-2 font-medium">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="art">Art & Design</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="cooking">Cooking</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="language">Languages</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:w-1/4">
                <Label htmlFor="date" className="block text-secondary-dark mb-2 font-medium">Date</Label>
                <div className="relative">
                  <Input 
                    id="date" 
                    type="date" 
                    className="w-full" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="md:w-1/6">
                <Label className="block text-secondary-dark mb-2 font-medium">&nbsp;</Label>
                <Button type="submit" className="w-full p-3 bg-primary text-white hover:bg-primary-dark font-medium">
                  <Search className="h-4 w-4 mr-2" /> Search
                </Button>
              </div>
            </div>
          </form>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-secondary-dark">Popular:</span>
            <Button variant="outline" size="sm" className="rounded-full bg-neutral-light text-secondary-dark hover:bg-primary hover:text-white">
              Coding
            </Button>
            <Button variant="outline" size="sm" className="rounded-full bg-neutral-light text-secondary-dark hover:bg-primary hover:text-white">
              Yoga
            </Button>
            <Button variant="outline" size="sm" className="rounded-full bg-neutral-light text-secondary-dark hover:bg-primary hover:text-white">
              Photography
            </Button>
            <Button variant="outline" size="sm" className="rounded-full bg-neutral-light text-secondary-dark hover:bg-primary hover:text-white">
              Painting
            </Button>
            <Button variant="outline" size="sm" className="rounded-full bg-neutral-light text-secondary-dark hover:bg-primary hover:text-white">
              Marketing
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
