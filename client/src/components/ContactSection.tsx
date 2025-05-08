import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Phone } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import { FaInstagram, FaTwitter, FaFacebookF, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and privacy policy" }),
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      agreeToTerms: false,
    },
  });
  
  const contactMutation = useMutation({
    mutationFn: async (formData: ContactFormValues) => {
      const { agreeToTerms, ...data } = formData;
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  function onSubmit(data: ContactFormValues) {
    contactMutation.mutate(data);
  }
  
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <span className="inline-block px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm font-medium mb-3">
              CONTACT US
            </span>
            <h2 className="font-heading font-bold text-3xl mb-6">Get in Touch</h2>
            <p className="text-secondary-dark mb-8">
              Have questions or feedback? We'd love to hear from you. Reach out to our team using the contact form or through our support channels.
            </p>
            
            <div className="mb-8">
              <div className="flex items-start mb-6">
                <div className="mr-4 p-3 bg-primary bg-opacity-10 text-primary rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-1">Our Location</h3>
                  <p className="text-secondary-dark">123 University Ave, Suite 400<br />College Town, CA 94321</p>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <div className="mr-4 p-3 bg-primary bg-opacity-10 text-primary rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-1">Email Us</h3>
                  <p className="text-secondary-dark">support@classconnect.io<br />partnerships@classconnect.io</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-primary bg-opacity-10 text-primary rounded-lg">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-1">Call Us</h3>
                  <p className="text-secondary-dark">(555) 123-4567<br />Monday-Friday, 9am-5pm PST</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-heading font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="p-3 bg-neutral-lightest text-secondary-dark hover:bg-primary hover:text-white rounded-lg transition"
                >
                  <FaInstagram className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="p-3 bg-neutral-lightest text-secondary-dark hover:bg-primary hover:text-white rounded-lg transition"
                >
                  <FaTwitter className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="p-3 bg-neutral-lightest text-secondary-dark hover:bg-primary hover:text-white rounded-lg transition"
                >
                  <FaFacebookF className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="p-3 bg-neutral-lightest text-secondary-dark hover:bg-primary hover:text-white rounded-lg transition"
                >
                  <FaLinkedinIn className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="p-3 bg-neutral-lightest text-secondary-dark hover:bg-primary hover:text-white rounded-lg transition"
                >
                  <FaTiktok className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="bg-neutral-lightest rounded-xl shadow-md p-8">
              <h3 className="font-heading font-bold text-2xl mb-6">Send Us a Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-secondary-dark font-medium">Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              {...field} 
                              className="p-3 border border-neutral-light rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-secondary-dark font-medium">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="your.email@example.com" 
                              type="email" 
                              {...field} 
                              className="p-3 border border-neutral-light rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-secondary-dark font-medium">Subject</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="How can we help you?" 
                            {...field} 
                            className="p-3 border border-neutral-light rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-secondary-dark font-medium">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us more about your inquiry..." 
                            rows={5} 
                            {...field} 
                            className="p-3 border border-neutral-light rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange} 
                            className="h-5 w-5 text-primary rounded" 
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-secondary-dark text-sm font-normal">
                            I agree to the <a href="#" className="text-primary hover:underline">Privacy Policy</a> and <a href="#" className="text-primary hover:underline">Terms of Service</a>.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full py-3 bg-primary text-white hover:bg-primary-dark font-heading font-semibold"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
