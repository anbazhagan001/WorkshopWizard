import { useState } from "react";
import { Link } from "wouter";
import { FaGraduationCap } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <FaGraduationCap className="text-primary text-2xl" />
            <Link href="/" className="font-heading font-bold text-xl sm:text-2xl text-primary">
              ClassConnect
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-medium text-secondary-dark hover:text-primary transition">
              Home
            </Link>
            <Link href="/explore" className="font-medium text-secondary-dark hover:text-primary transition">
              Explore Classes
            </Link>
            <Link href="/about" className="font-medium text-secondary-dark hover:text-primary transition">
              About Us
            </Link>
            <Link href="/#team" className="font-medium text-secondary-dark hover:text-primary transition">
              Our Team
            </Link>
            <Link href="/#testimonials" className="font-medium text-secondary-dark hover:text-primary transition">
              Testimonials
            </Link>
            <Link href="/#contact" className="font-medium text-secondary-dark hover:text-primary transition">
              Contact
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              Login
            </Button>
            <Button className="bg-primary text-white hover:bg-primary-dark">
              Sign Up
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-neutral-dark" 
              onClick={toggleMobileMenu}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="font-medium text-secondary-dark hover:text-primary transition py-2">
                Home
              </Link>
              <Link href="/explore" className="font-medium text-secondary-dark hover:text-primary transition py-2">
                Explore Classes
              </Link>
              <Link href="/about" className="font-medium text-secondary-dark hover:text-primary transition py-2">
                About Us
              </Link>
              <Link href="/#team" className="font-medium text-secondary-dark hover:text-primary transition py-2">
                Our Team
              </Link>
              <Link href="/#testimonials" className="font-medium text-secondary-dark hover:text-primary transition py-2">
                Testimonials
              </Link>
              <Link href="/#contact" className="font-medium text-secondary-dark hover:text-primary transition py-2">
                Contact
              </Link>
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-white">
                  Login
                </Button>
                <Button className="flex-1 bg-primary text-white hover:bg-primary-dark">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
