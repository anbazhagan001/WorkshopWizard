import { Link } from "wouter";
import { FaGraduationCap, FaInstagram, FaTwitter, FaFacebookF, FaLinkedinIn, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-neutral-darkest text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <FaGraduationCap className="text-primary text-2xl" />
              <Link href="/" className="font-heading font-bold text-2xl text-white">
                ClassConnect
              </Link>
            </div>
            <p className="text-neutral-light mb-6">
              Connecting college students with local classes and workshops to enhance their educational experience and develop new skills.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-light hover:text-primary transition">
                <FaInstagram aria-label="Instagram" />
              </a>
              <a href="#" className="text-neutral-light hover:text-primary transition">
                <FaTwitter aria-label="Twitter" />
              </a>
              <a href="#" className="text-neutral-light hover:text-primary transition">
                <FaFacebookF aria-label="Facebook" />
              </a>
              <a href="#" className="text-neutral-light hover:text-primary transition">
                <FaLinkedinIn aria-label="LinkedIn" />
              </a>
              <a href="#" className="text-neutral-light hover:text-primary transition">
                <FaTiktok aria-label="TikTok" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-neutral-light hover:text-white transition">Home</Link></li>
              <li><Link href="#explore" className="text-neutral-light hover:text-white transition">Explore Classes</Link></li>
              <li><Link href="#about" className="text-neutral-light hover:text-white transition">About Us</Link></li>
              <li><Link href="#contact" className="text-neutral-light hover:text-white transition">Contact</Link></li>
              <li><Link href="#" className="text-neutral-light hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-neutral-light hover:text-white transition">Blog</Link></li>
              <li><Link href="#" className="text-neutral-light hover:text-white transition">Partner with Us</Link></li>
              <li><Link href="#" className="text-neutral-light hover:text-white transition">Become an Instructor</Link></li>
              <li><Link href="#" className="text-neutral-light hover:text-white transition">List Your Space</Link></li>
              <li><Link href="#" className="text-neutral-light hover:text-white transition">Student Discounts</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-neutral-light hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="#" className="text-neutral-light hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="#" className="text-neutral-light hover:text-white transition">Cookie Policy</Link></li>
              <li><Link href="#" className="text-neutral-light hover:text-white transition">Accessibility</Link></li>
              <li><Link href="#" className="text-neutral-light hover:text-white transition">GDPR Compliance</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-dark pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-light text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} ClassConnect. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="#" className="text-neutral-light hover:text-white transition text-sm">Privacy Policy</Link>
              <Link href="#" className="text-neutral-light hover:text-white transition text-sm">Terms of Service</Link>
              <Link href="#" className="text-neutral-light hover:text-white transition text-sm">Cookie Settings</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
