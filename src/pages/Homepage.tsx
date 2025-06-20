import React from 'react';
import { Link } from 'react-router-dom';

import PlatformHeader from '@/components/layout/PlatformHeader';
import PlatformSidebar from '@/components/layout/PlatformSidebar';
import VideoPreviewCard from '@/components/VideoPreviewCard';
import PlatformFooter from '@/components/layout/PlatformFooter';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SampleVideo {
  videoId: string;
  thumbnailUrl: string;
  videoTitle: string;
  channelName: string;
  channelAvatarUrl?: string;
  channelUrl: string;
  viewCount: number;
  uploadDate: string;
  videoDuration?: string;
}

const sampleVideos: SampleVideo[] = [
  {
    videoId: 'vid001',
    thumbnailUrl: 'https://placehold.co/600x400/E2E8F0/AAAAAA?text=Tech+Review',
    videoTitle: 'The Future of AI: A Deep Dive into Next-Gen Neural Networks and Beyond',
    channelName: 'TechExplained',
    channelAvatarUrl: 'https://placehold.co/40x40/D1FAE5/10B981?text=TE',
    channelUrl: '/channel/techexplained',
    viewCount: 1500000,
    uploadDate: '2 weeks ago',
    videoDuration: '12:34',
  },
  {
    videoId: 'vid002',
    thumbnailUrl: 'https://placehold.co/600x400/FEF2F2/F87171?text=Cooking+Show',
    videoTitle: 'Mastering Sourdough: Bake the Perfect Loaf Every Time with This Simple Recipe',
    channelName: 'KitchenCraft',
    channelAvatarUrl: 'https://placehold.co/40x40/FEE2E2/F43F5E?text=KC',
    channelUrl: '/channel/kitchencraft',
    viewCount: 85000,
    uploadDate: '1 month ago',
    videoDuration: '08:15',
  },
  {
    videoId: 'vid003',
    thumbnailUrl: 'https://placehold.co/600x400/EFF6FF/93C5FD?text=Travel+Vlog',
    videoTitle: 'Exploring the Hidden Gems of Kyoto: A Breathtaking Journey Through Ancient Japan',
    channelName: 'WanderlustAdventures',
    channelAvatarUrl: 'https://placehold.co/40x40/DBEAFE/3B82F6?text=WA',
    channelUrl: '/channel/wanderlustadventures',
    viewCount: 2300000,
    uploadDate: '3 days ago',
    videoDuration: '22:05',
  },
  {
    videoId: 'vid004',
    thumbnailUrl: 'https://placehold.co/600x400/F0F9FF/BAE6FD?text=Gaming+Highlights',
    videoTitle: 'Epic Wins & Funny Fails: Best Gaming Moments of the Week Compilation',
    channelName: 'GameVault',
    channelAvatarUrl: 'https://placehold.co/40x40/E0F2FE/0EA5E9?text=GV',
    channelUrl: '/channel/gamevault',
    viewCount: 500000,
    uploadDate: '5 hours ago',
    videoDuration: '15:50',
  },
  {
    videoId: 'vid005',
    thumbnailUrl: 'https://placehold.co/600x400/ECFDF5/A7F3D0?text=DIY+Home+Decor',
    videoTitle: 'Transform Your Living Room: Budget-Friendly DIY Decor Ideas That Look Expensive',
    channelName: 'HomeCrafted',
    channelAvatarUrl: 'https://placehold.co/40x40/D1FAE5/10B981?text=HC',
    channelUrl: '/channel/homecrafted',
    viewCount: 120000,
    uploadDate: '1 week ago',
    videoDuration: '10:28',
  },
  {
    videoId: 'vid006',
    thumbnailUrl: 'https://placehold.co/600x400/FFFBEB/FDE68A?text=Music+Cover',
    videoTitle: 'Acoustic Cover of a Popular Hit Song - Live Performance Session',
    channelName: 'MelodyMakers',
    channelAvatarUrl: 'https://placehold.co/40x40/FEF9C3/F59E0B?text=MM',
    channelUrl: '/channel/melodymakers',
    viewCount: 750000,
    uploadDate: '4 days ago',
    videoDuration: '04:30',
  },
  {
    videoId: 'vid007',
    thumbnailUrl: 'https://placehold.co/600x400/F3E8FF/DDD6FE?text=Science+Explained',
    videoTitle: 'The Science of Sleep: Why We Need It and How to Get Better Rest',
    channelName: 'CuriosityStream',
    channelAvatarUrl: 'https://placehold.co/40x40/EDE9FE/8B5CF6?text=CS',
    channelUrl: '/channel/curiositystream',
    viewCount: 980000,
    uploadDate: '6 days ago',
    videoDuration: '18:42',
  },
  {
    videoId: 'vid008',
    thumbnailUrl: 'https://placehold.co/600x400/FEFCE8/FEF08A?text=Fitness+Workout',
    videoTitle: 'Full Body HIIT Workout - No Equipment Needed | Burn Calories & Build Muscle',
    channelName: 'FitLife',
    channelAvatarUrl: 'https://placehold.co/40x40/FEF9C3/F59E0B?text=FL',
    channelUrl: '/channel/fitlife',
    viewCount: 320000,
    uploadDate: '10 days ago',
    videoDuration: '25:00',
  },
];

const Homepage: React.FC = () => {
  console.log('Homepage loaded');

  // Shuffle videos for different sections to simulate variety
  const recommendedVideos = [...sampleVideos].sort(() => 0.5 - Math.random()).slice(0, 5);
  const trendingVideos = [...sampleVideos].sort(() => 0.5 - Math.random()).slice(0, 5);
  const newFromSubscriptions = [...sampleVideos].sort(() => 0.5 - Math.random()).slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <PlatformHeader />
      <div className="flex flex-1">
        <PlatformSidebar />
        <main className="flex-1 pt-16 md:pl-64 bg-muted/20 dark:bg-muted/10"> {/* Added bg for contrast */}
          <ScrollArea className="h-full"> {/* Ensures ScrollArea takes full height of its parent 'main' */}
            <div className="p-4 sm:p-6 space-y-8">
              
              <section id="recommended-videos">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">Recommended for You</h2>
                  <Link to="/search-results?category=recommended" className="text-sm text-primary hover:underline">
                    See All
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-6">
                  {recommendedVideos.map(video => (
                    <VideoPreviewCard key={`rec-${video.videoId}`} {...video} />
                  ))}
                </div>
              </section>

              <section id="trending-videos">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">Trending Now</h2>
                  <Link to="/search-results?category=trending" className="text-sm text-primary hover:underline">
                    See All
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-6">
                  {trendingVideos.map(video => (
                    <VideoPreviewCard key={`trend-${video.videoId}`} {...video} />
                  ))}
                </div>
              </section>
              
              <section id="new-from-subscriptions">
                 <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">New from Your Subscriptions</h2>
                  <Link to="/user-dashboard?tab=subscriptions" className="text-sm text-primary hover:underline"> {/* Example link to a specific tab */}
                    See All
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-6">
                  {newFromSubscriptions.map(video => (
                    <VideoPreviewCard key={`sub-${video.videoId}`} {...video} />
                  ))}
                </div>
              </section>

            </div>
          </ScrollArea>
        </main>
      </div>
      <PlatformFooter />
    </div>
  );
};

export default Homepage;