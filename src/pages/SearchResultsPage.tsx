import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// Custom Layout Components
import PlatformHeader from '@/components/layout/PlatformHeader';
import PlatformSidebar from '@/components/layout/PlatformSidebar';
import PlatformFooter from '@/components/layout/PlatformFooter';

// Custom Content Components
import VideoPreviewCard from '@/components/VideoPreviewCard';

// Shadcn/ui Components
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from '@/components/ui/button'; // For potential filter buttons

// Lucide Icons
import { Search as SearchIcon, Filter as FilterIcon } from 'lucide-react';

// Placeholder data for VideoPreviewCard
const sampleVideos = [
  {
    videoId: 'search_vid_001',
    thumbnailUrl: 'https://source.unsplash.com/random/320x180?nature,water&sig=1',
    videoTitle: 'Exploring the Amazon Rainforest: A Journey to the Wild',
    channelName: 'WildLifeAdventures',
    channelAvatarUrl: 'https://source.unsplash.com/random/40x40?profile,animal&sig=1',
    channelUrl: '/channel/wildlifeadventures', // Example, not in App.tsx but internal to card
    viewCount: 1250000,
    uploadDate: '3 days ago',
    videoDuration: '22:15',
  },
  {
    videoId: 'search_vid_002',
    thumbnailUrl: 'https://source.unsplash.com/random/320x180?tech,code&sig=2',
    videoTitle: 'Mastering React Hooks in 2024 - Advanced Techniques',
    channelName: 'CodeMasterPro',
    channelAvatarUrl: 'https://source.unsplash.com/random/40x40?profile,code&sig=2',
    channelUrl: '/channel/codemasterpro',
    viewCount: 78000,
    uploadDate: '1 week ago',
    videoDuration: '45:30',
  },
  {
    videoId: 'search_vid_003',
    thumbnailUrl: 'https://source.unsplash.com/random/320x180?travel,mountains&sig=3',
    videoTitle: 'Epic Mountain Vistas: A Hiker\'s Dream',
    channelName: 'MountainViews',
    channelAvatarUrl: 'https://source.unsplash.com/random/40x40?profile,mountain&sig=3',
    channelUrl: '/channel/mountainviews',
    viewCount: 230000,
    uploadDate: '5 days ago',
    videoDuration: '15:50',
  },
  {
    videoId: 'search_vid_004',
    thumbnailUrl: 'https://source.unsplash.com/random/320x180?food,cooking&sig=4',
    videoTitle: 'Simple Gourmet: 30-Minute Pasta Recipe',
    channelName: 'KitchenDelights',
    channelAvatarUrl: 'https://source.unsplash.com/random/40x40?profile,food&sig=4',
    channelUrl: '/channel/kitchendelights',
    viewCount: 550000,
    uploadDate: '2 days ago',
    videoDuration: '08:20',
  }
];

const SearchResultsPage = () => {
  console.log('SearchResultsPage loaded');
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  // For demonstration, we'll use sampleVideos. In a real app, you'd fetch based on 'query'.
  const resultsToShow = query ? sampleVideos.filter(v => v.videoTitle.toLowerCase().includes(query.toLowerCase())) : sampleVideos;
  const hasResults = resultsToShow.length > 0;


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <PlatformHeader />
      <div className="flex flex-1 pt-16"> {/* pt-16 for fixed header (h-16) */}
        <PlatformSidebar /> {/* Sidebar is fixed and handles its own positioning */}
        
        <main className="flex-1 md:pl-64"> {/* md:pl-64 for fixed sidebar (w-64) */}
          <ScrollArea className="h-full"> {/* ScrollArea takes full height of this main container */}
            <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
                Search Results
              </h1>
              {query && (
                <p className="text-md text-muted-foreground mb-6">
                  Showing results for: <span className="font-semibold text-primary">{query}</span>
                </p>
              )}
              
              {/* Search input and filters placeholder */}
              <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative w-full sm:max-w-md">
                    <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        defaultValue={query || ""}
                        placeholder="Search videos..."
                        className="w-full pl-10"
                        // In a real app, this would trigger a new search, e.g., via a form submit
                        // For now, it's just a visual element.
                    />
                </div>
                <Button variant="outline" className="w-full sm:w-auto">
                    <FilterIcon className="mr-2 h-4 w-4" />
                    Filters
                </Button>
              </div>

              {hasResults ? (
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
                  {resultsToShow.map((video) => (
                    <VideoPreviewCard key={video.videoId} {...video} />
                  ))}
                </section>
              ) : (
                <div className="text-center py-12">
                  <SearchIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No results found {query ? `for "${query}"` : ""}</h2>
                  <p className="text-muted-foreground">
                    Try searching for something else, or check your spelling.
                  </p>
                </div>
              )}

              {hasResults && (
                <div className="mt-8 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>
                          2
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
            <PlatformFooter />
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default SearchResultsPage;