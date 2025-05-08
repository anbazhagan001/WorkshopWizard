import { useState } from "react";
import { Link, useLocation } from "wouter";
import { FaGraduationCap } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Menu, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logoutMutation } = useAuth();
  const [, navigate] = useLocation();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate("/");
      }
    });
  };
  
  const handleAuthNavigation = () => {
    navigate("/auth");
    setIsMobileMenuOpen(false);
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
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-white">
                        {user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/dashboard">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={handleAuthNavigation}
                >
                  Login
                </Button>
                <Button 
                  className="bg-primary text-white hover:bg-primary-dark"
                  onClick={handleAuthNavigation}
                >
                  Sign Up
                </Button>
              </>
            )}
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
              {user ? (
                <div className="flex flex-col space-y-2 pt-2">
                  <div className="flex items-center space-x-2 py-2">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-white">
                        {user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">Hello, {user.username}</span>
                  </div>
                  <Link href="/dashboard" className="w-full">
                    <Button 
                      variant="default" 
                      className="flex items-center justify-center space-x-2 w-full"
                    >
                      <User className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center space-x-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2 pt-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={handleAuthNavigation}
                  >
                    Login
                  </Button>
                  <Button 
                    className="flex-1 bg-primary text-white hover:bg-primary-dark"
                    onClick={handleAuthNavigation}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
