import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found - ClassConnect</title>
        <meta name="description" content="The page you're looking for does not exist." />
      </Helmet>
      
      <div className="font-body text-neutral-darkest bg-neutral-lightest min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-grow flex items-center justify-center py-20">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="pt-6">
              <div className="flex mb-4 gap-2">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
              </div>

              <p className="mt-4 text-sm text-gray-600 mb-6">
                The page you're looking for doesn't exist or has been moved.
              </p>
              
              <Link href="/">
                <Button>
                  Return to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <Footer />
      </div>
    </>
  );
}
