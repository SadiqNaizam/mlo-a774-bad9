import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import PlatformHeader from '@/components/layout/PlatformHeader';
import PlatformSidebar from '@/components/layout/PlatformSidebar';
import PlatformFooter from '@/components/layout/PlatformFooter';

// Custom Content Components
import CreatorVideoManagementRow, { VideoVisibility } from '@/components/CreatorVideoManagementRow';
import VideoPreviewCard from '@/components/VideoPreviewCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Lucide Icons
import { Upload, Film, Library as LibraryIcon, Users, History, Clock, ThumbsUp, ListVideo, PlayCircle } from 'lucide-react';

// Sample Data for Creator's Videos
const myVideosData: Array<React.ComponentProps<typeof CreatorVideoManagementRow>> = [
  {
    videoId: 'userVid001',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60',
    title: 'My First Coding Tutorial: JavaScript Basics',
    views: 12503,
    likes: 850,
    comments: 72,
    visibility: 'public' as VideoVisibility,
    onEdit: (id) => console.log('Edit video:', id),
    onDelete: (id) => console.log('Delete video:', id),
    onAnalytics: (id) => console.log('Analytics for video:', id),
  },
  {
    videoId: 'userVid002',
    thumbnailUrl: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsb2dnaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=300&q=60',
    title: 'Vlog: A Day in the Life of a Developer',
    views: 8340,
    likes: 620,
    comments: 45,
    visibility: 'unlisted' as VideoVisibility,
    onEdit: (id) => console.log('Edit video:', id),
    onDelete: (id) => console.log('Delete video:', id),
    onAnalytics: (id) => console.log('Analytics for video:', id),
  },
  {
    videoId: 'userVid003',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGF0YSUyMGFuYWx5c2lzfGVufDB8fDB8fHww&auto=format&fit=crop&w=300&q=60',
    title: 'Understanding Web Analytics (Private Draft)',
    views: 150, // Low views for private
    likes: 10,
    comments: 2,
    visibility: 'private' as VideoVisibility,
    onEdit: (id) => console.log('Edit video:', id),
    onDelete: (id) => console.log('Delete video:', id),
    onAnalytics: (id) => console.log('Analytics for video:', id),
  },
];

// Sample Data for Video Previews (Library sections)
const libraryVideoData: Array<React.ComponentProps<typeof VideoPreviewCard>> = [
  {
    videoId: 'libVid001',
    thumbnailUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvdXJzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60',
    videoTitle: 'Advanced React Patterns',
    channelName: 'DevMasters Academy',
    channelAvatarUrl: 'https://randomuser.me/api/portraits/med/men/75.jpg',
    channelUrl: '/channel/devmasters', // Placeholder
    viewCount: 256000,
    uploadDate: '1 month ago',
    videoDuration: '45:12',
  },
  {
    videoId: 'libVid002',
    thumbnailUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29ya3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60',
    videoTitle: 'Productivity Hacks for Remote Workers',
    channelName: 'LifeOptimizer',
    channelAvatarUrl: 'https://randomuser.me/api/portraits/med/women/75.jpg',
    channelUrl: '/channel/lifeoptimizer', // Placeholder
    viewCount: 120500,
    uploadDate: '2 weeks ago',
    videoDuration: '12:30',
  },
   {
    videoId: 'libVid003',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162616805-68809364e549?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8eW91dHViZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60',
    videoTitle: 'The Future of Streaming Technology',
    channelName: 'TechForward',
    channelAvatarUrl: 'https://randomuser.me/api/portraits/med/men/15.jpg',
    channelUrl: '/channel/techforward', 
    viewCount: 98000,
    uploadDate: '3 days ago',
    videoDuration: '22:15',
  },
];


const UserDashboardPage: React.FC = () => {
  console.log('UserDashboardPage loaded');

  const handleUploadVideo = () => {
    // In a real app, this would navigate to an upload page or open an upload modal
    alert('Upload Video button clicked! This would lead to the video upload flow.');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PlatformHeader />
      <div className="flex flex-1 pt-16"> {/* Adjust pt-16 based on PlatformHeader's height */}
        <PlatformSidebar /> {/* Sidebar width is md:w-64 */}
        
        <main className="flex-1 md:ml-64 flex flex-col overflow-hidden"> {/* md:ml-64 to offset fixed sidebar */}
          {/* Main Content Header */}
          <div className="p-4 sm:p-6 lg:p-8 border-b bg-card">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">User Dashboard</h1>
              <Button onClick={handleUploadVideo} size="lg">
                <Upload className="mr-2 h-5 w-5" /> Upload Video
              </Button>
            </div>
          </div>

          {/* Scrollable Tab Content Area */}
          <ScrollArea className="flex-1 bg-muted/40">
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
              <Tabs defaultValue="my-videos" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                  <TabsTrigger value="my-videos" className="py-2.5 text-sm font-medium">
                    <Film className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> My Videos
                  </TabsTrigger>
                  <TabsTrigger value="library" className="py-2.5 text-sm font-medium">
                    <LibraryIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Library
                  </TabsTrigger>
                  <TabsTrigger value="subscriptions" className="py-2.5 text-sm font-medium">
                    <Users className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Subscriptions
                  </TabsTrigger>
                </TabsList>

                {/* My Videos Tab */}
                <TabsContent value="my-videos">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center">
                        <Film className="mr-2 h-5 w-5" /> Your Uploaded Videos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-0 p-0"> {/* Remove CardContent default padding if rows have their own */}
                      {myVideosData.length > 0 ? (
                        myVideosData.map((video) => (
                          <CreatorVideoManagementRow key={video.videoId} {...video} />
                        ))
                      ) : (
                        <div className="p-6 text-center text-muted-foreground">
                          <PlayCircle className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                          <p className="text-lg font-semibold">No videos uploaded yet.</p>
                          <p className="text-sm">Start sharing your content with the world!</p>
                          <Button onClick={handleUploadVideo} className="mt-4">
                            <Upload className="mr-2 h-4 w-4" /> Upload Your First Video
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Library Tab */}
                <TabsContent value="library" className="space-y-6">
                  {/* Watch History Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center">
                        <History className="mr-2 h-5 w-5" /> Watch History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {libraryVideoData.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {libraryVideoData.slice(0,3).map(video => <VideoPreviewCard key={`hist-${video.videoId}`} {...video} />)}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No videos in your watch history yet.</p>
                      )}
                       {libraryVideoData.length > 3 && <Button variant="link" className="mt-4">View All History</Button>}
                    </CardContent>
                  </Card>

                  {/* Watch Later Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center">
                        <Clock className="mr-2 h-5 w-5" /> Watch Later
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                       {libraryVideoData.slice(1,3).length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {libraryVideoData.slice(1,3).map(video => <VideoPreviewCard key={`later-${video.videoId}`} {...video} />)}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Your Watch Later list is empty.</p>
                      )}
                       {libraryVideoData.slice(1,3).length > 3 && <Button variant="link" className="mt-4">View All Watch Later</Button>}
                    </CardContent>
                  </Card>
                  
                  {/* Liked Videos Section */}
                   <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center">
                        <ThumbsUp className="mr-2 h-5 w-5" /> Liked Videos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                       {libraryVideoData.slice(0,2).length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {libraryVideoData.slice(0,2).map(video => <VideoPreviewCard key={`liked-${video.videoId}`} {...video} />)}
                        </div>
                       ) : (
                        <p className="text-muted-foreground">You haven't liked any videos yet.</p>
                       )}
                       {libraryVideoData.slice(0,2).length > 3 && <Button variant="link" className="mt-4">View All Liked Videos</Button>}
                    </CardContent>
                  </Card>

                  {/* Playlists Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center">
                        <ListVideo className="mr-2 h-5 w-5" /> Your Playlists
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">You haven't created any playlists yet.</p>
                      {/* Placeholder for playlist creation/listing */}
                       <Button variant="outline" className="mt-4">Create New Playlist</Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Subscriptions Tab */}
                <TabsContent value="subscriptions">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center">
                        <Users className="mr-2 h-5 w-5" /> Your Subscriptions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        You are not subscribed to any channels yet. Explore channels and subscribe to see their latest videos here.
                      </p>
                       <Button asChild variant="link" className="mt-2">
                          <Link to="/">Discover Channels</Link>
                        </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </main>
      </div>
      <PlatformFooter />
    </div>
  );
};

export default UserDashboardPage;