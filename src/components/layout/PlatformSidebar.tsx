import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PlaySquare, Home, Flame, Users, Library, History, Clock, VideoIcon as MyVideosIcon, Settings } from 'lucide-react';

// Define NavLinks once for clarity and structure
const DesktopNavLinks: React.FC = () => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `w-full justify-start flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
    isActive ? 'text-primary bg-muted' : 'text-muted-foreground'
  }`;

  const accordionTriggerClasses = "flex w-full justify-start items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline [&[data-state=open]>svg:last-child]:rotate-0"; // Custom styling for accordion trigger to match NavLink appearance

  return (
    <nav className="grid items-start gap-1 text-sm font-medium">
      <NavLink to="/" className={navLinkClasses}>
        <Home className="h-4 w-4" />
        Home
      </NavLink>
      <NavLink to="/" className={navLinkClasses}> {/* TODO: Update route for /trending */}
        <Flame className="h-4 w-4" />
        Trending
      </NavLink>
      <NavLink to="/" className={navLinkClasses}> {/* TODO: Update route for /subscriptions */}
        <Users className="h-4 w-4" />
        Subscriptions
      </NavLink>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="library-desktop" className="border-none">
          <AccordionTrigger className={accordionTriggerClasses}>
            {/* Custom trigger content to align icon and text */}
            <div className="flex items-center gap-3">
              <Library className="h-4 w-4" />
              <span>Library</span>
            </div>
            {/* Default chevron will be on the right, if needed add custom chevron handling */}
          </AccordionTrigger>
          <AccordionContent className="pl-7 pt-1"> {/* Indent content, add small top padding */}
             <NavLink to="/user-dashboard" className={navLinkClasses}> {/* TODO: Point to specific history page or tab */}
              <History className="h-4 w-4" />
              History
            </NavLink>
            <NavLink to="/user-dashboard" className={navLinkClasses}> {/* TODO: Point to specific watch later page or tab */}
              <Clock className="h-4 w-4" />
              Watch Later
            </NavLink>
            <NavLink to="/user-dashboard" className={navLinkClasses}> {/* TODO: Point to specific user videos page or tab */}
              <MyVideosIcon className="h-4 w-4" />
              My Videos
            </NavLink>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </nav>
  );
};

const PlatformSidebar: React.FC = () => {
  console.log('PlatformSidebar loaded');

  // This sidebar is for medium screens and up.
  // Mobile navigation is handled by a Sheet in PlatformHeader.
  return (
    <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:z-40 md:flex md:w-64 md:flex-col border-r bg-background">
      {/* Sidebar Header / Logo */}
      <div className="flex h-16 items-center border-b px-6 shrink-0">
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
          <PlaySquare className="h-6 w-6 text-primary" />
          <span>Streamify</span>
        </Link>
      </div>
      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-4">
        <DesktopNavLinks />
      </div>
      {/* Optional Footer in Sidebar */}
      <div className="mt-auto p-4 border-t">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </aside>
  );
};

export default PlatformSidebar;