import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  PlaySquare,
  Search,
  Upload,
  Bell,
  UserCircle,
  Menu,
  Home,
  Flame,
  Users,
  Library,
  History,
  Clock,
  VideoIcon as MyVideosIcon, // Renamed to avoid conflict if Video is used elsewhere
  Settings as SettingsIcon,
  LogOut,
} from 'lucide-react';

const PlatformHeader: React.FC = () => {
  console.log('PlatformHeader loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
      isActive ? 'text-primary bg-muted' : 'text-muted-foreground'
    }`;
  
  const MobileNavLinks: React.FC = () => (
    <nav className="grid gap-2 text-lg font-medium mt-4">
      <NavLink to="/" className={navLinkClasses}>
        <Home className="h-5 w-5" />
        Home
      </NavLink>
      <NavLink to="/" className={navLinkClasses}> {/* TODO: Update route for /trending */}
        <Flame className="h-5 w-5" />
        Trending
      </NavLink>
      <NavLink to="/" className={navLinkClasses}> {/* TODO: Update route for /subscriptions */}
        <Users className="h-5 w-5" />
        Subscriptions
      </NavLink>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="library-mobile" className="border-none">
          <AccordionTrigger className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline [&[data-state=open]>svg:last-child]:rotate-90">
            <Library className="h-5 w-5" />
            Library
          </AccordionTrigger>
          <AccordionContent className="pl-8"> {/* Indent content */}
            <NavLink to="/user-dashboard" className={navLinkClasses}> {/* TODO: Point to specific history page or tab */}
              <History className="h-5 w-5" />
              History
            </NavLink>
            <NavLink to="/user-dashboard" className={navLinkClasses}> {/* TODO: Point to specific watch later page or tab */}
              <Clock className="h-5 w-5" />
              Watch Later
            </NavLink>
            <NavLink to="/user-dashboard" className={navLinkClasses}> {/* TODO: Point to specific user videos page or tab */}
              <MyVideosIcon className="h-5 w-5" />
              My Videos
            </NavLink>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </nav>
  );


  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 supports-[backdrop-filter]:bg-background/60 backdrop-blur">
      {/* Mobile Menu & Logo */}
      <div className="flex items-center md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <SheetHeader className="mb-4">
              <SheetTitle>
                <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
                  <PlaySquare className="h-6 w-6 text-primary" />
                  <span>Streamify</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <MobileNavLinks />
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Desktop Logo - Hidden on mobile, shown here for spacing, sidebar has its own logo */}
       <Link to="/" className="hidden md:flex items-center gap-2 font-semibold text-lg mr-4">
        <PlaySquare className="h-6 w-6 text-primary" />
        <span>Streamify</span>
      </Link>

      {/* Search Bar - Central */}
      <div className="flex-1 flex justify-center px-4">
        <form className="w-full max-w-xl ml-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search videos, channels..."
              className="w-full rounded-lg bg-muted pl-10 pr-4 py-2 md:w-[300px] lg:w-[400px] focus-visible:ring-primary"
            />
            {/* Autocomplete suggestions would appear below this input */}
          </div>
        </form>
      </div>

      {/* User Icons - Right */}
      <div className="flex items-center gap-3 ml-auto">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Upload className="h-5 w-5" />
          <span className="sr-only">Upload Video</span>
        </Button>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 px-1 text-xs justify-center" variant="destructive">3</Badge>
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <UserCircle className="h-6 w-6" />
              <span className="sr-only">User Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/user-dashboard">
                <MyVideosIcon className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default PlatformHeader;