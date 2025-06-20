import React from 'react';
import { Link } from 'react-router-dom';
import { PlaySquare } from 'lucide-react';

const PlatformFooter: React.FC = () => {
  console.log('PlatformFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto py-8 px-4 md:px-6 text-sm text-muted-foreground">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <PlaySquare className="h-5 w-5 text-primary" />
            <span className="font-semibold">Streamify</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {/* TODO: Create /about route and page */}
            <Link to="/about" className="hover:text-primary transition-colors">
              About Us
            </Link>
            {/* TODO: Create /terms route and page */}
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            {/* TODO: Create /privacy route and page */}
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            {/* TODO: Create /contact route and page */}
            <Link to="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <div className="text-center md:text-right">
            <p>&copy; {currentYear} Streamify. All rights reserved.</p>
            <p className="text-xs">Powered by AI Magic</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PlatformFooter;