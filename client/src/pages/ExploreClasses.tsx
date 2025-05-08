import { Helmet } from "react-helmet";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import ClassCard from "@/components/ClassCard";
import { Class } from "@shared/schema";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function ExploreClasses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [inPersonOnly, setInPersonOnly] = useState(false);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState("recommended");
  
  // Get all classes
  const { data: classes, isLoading, error } = useQuery<Class[]>({
    queryKey: ['/api/classes'],
    staleTime: 60 * 1000, // 1 minute
  });
  
  // Function to filter classes based on filters
  const filteredClasses = () => {
    if (!classes || !Array.isArray(classes)) return [];
    
    return classes.filter((classItem: Class) => {
      // Search filter
      if (searchQuery && !classItem.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Category filter
      if (selectedCategory !== "all" && classItem.category !== selectedCategory) {
        return false;
      }
      
      // Price range filter
      if (priceRange === "free" && classItem.price !== 0) {
        return false;
      } else if (priceRange === "paid" && classItem.price === 0) {
        return false;
      } else if (priceRange === "under50" && classItem.price > 50) {
        return false;
      } else if (priceRange === "50to100" && (classItem.price < 50 || classItem.price > 100)) {
        return false;
      } else if (priceRange === "over100" && classItem.price <= 100) {
        return false;
      }
      
      // Class format filter
      if (inPersonOnly && classItem.format !== "in-person") {
        return false;
      }
      
      if (onlineOnly && classItem.format !== "online") {
        return false;
      }
      
      return true;
    });
  };
  
  // Function to sort the filtered classes
  const sortedClasses = () => {
    const filtered = filteredClasses();
    
    if (sortOrder === "priceLowToHigh") {
      return [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "priceHighToLow") {
      return [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortOrder === "newest") {
      return [...filtered].sort((a, b) => {
        // Handle potential null or undefined startDate values
        const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
        const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
        return dateB - dateA;
      });
    } else if (sortOrder === "highestRated") {
      return [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    
    // Default: recommended
    return filtered;
  };

  return (
    <div className="min-h-screen bg-neutral-lightest">
      <Helmet>
        <title>Explore Classes | ClassConnect</title>
        <meta name="description" content="Browse and search for local classes and workshops to enhance your skills across technology, art, business, fitness, and more subjects." />
        <meta property="og:title" content="Explore Classes | ClassConnect" />
        <meta property="og:description" content="Browse and search for local classes and workshops to enhance your skills across technology, art, business, fitness, and more subjects." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4 text-neutral-darkest">
            Explore <span className="text-primary">Classes</span>
          </h1>
          <p className="text-secondary-dark max-w-2xl mx-auto mb-8">
            Discover classes and workshops across various subjects to boost your skills
          </p>
          
          {/* Search Box */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary h-5 w-5" />
              <Input 
                type="text" 
                placeholder="Search for classes, subjects, or skills..."
                className="pl-12 pr-4 py-6 w-full rounded-full shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-6 bg-primary hover:bg-primary-dark"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4 bg-white p-6 rounded-xl shadow-sm h-fit">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-bold text-xl">Filters</h2>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary-dark">
                  Reset All
                </Button>
              </div>
              
              {/* Category Filter */}
              <div className="mb-6">
                <Label htmlFor="category" className="block text-neutral-darkest mb-2 font-medium">Category</Label>
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
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <Label htmlFor="price" className="block text-neutral-darkest mb-2 font-medium">Price Range</Label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger id="price">
                    <SelectValue placeholder="All Prices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="under50">Under $50</SelectItem>
                    <SelectItem value="50to100">$50 - $100</SelectItem>
                    <SelectItem value="over100">Over $100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Class Format Filter */}
              <div className="mb-6">
                <Label className="block text-neutral-darkest mb-2 font-medium">Class Format</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="in-person" 
                      checked={inPersonOnly}
                      onCheckedChange={(checked) => setInPersonOnly(checked as boolean)}
                    />
                    <label 
                      htmlFor="in-person" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      In-Person Only
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="online" 
                      checked={onlineOnly}
                      onCheckedChange={(checked) => setOnlineOnly(checked as boolean)}
                    />
                    <label 
                      htmlFor="online" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Online Only
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Classes Grid */}
            <div className="lg:w-3/4">
              {/* Sort Controls */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-secondary-dark">
                  {isLoading ? 'Loading...' : `Showing ${filteredClasses().length} results`}
                </p>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="sort" className="text-sm">Sort by:</Label>
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger id="sort" className="w-[180px]">
                      <SelectValue placeholder="Recommended" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                      <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="highestRated">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Classes */}
              {isLoading ? (
                <div className="text-center py-12">
                  <p>Loading classes...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12 text-red-500">
                  <p>Error loading classes. Please try again later.</p>
                </div>
              ) : filteredClasses().length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <p className="text-secondary-dark mb-4">No classes found matching your criteria.</p>
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setPriceRange("all");
                      setInPersonOnly(false);
                      setOnlineOnly(false);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedClasses().map((classItem: Class) => (
                    <ClassCard key={classItem.id} classItem={classItem} />
                  ))}
                </div>
              )}
              
              {/* Pagination */}
              {!isLoading && filteredClasses().length > 0 && (
                <div className="mt-10">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}