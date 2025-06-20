import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import PlatformHeader from '@/components/layout/PlatformHeader';
import PlatformSidebar from '@/components/layout/PlatformSidebar';
import InteractiveVideoPlayerControls from '@/components/InteractiveVideoPlayerControls';
import CommentEntry from '@/components/CommentEntry';
import VideoPreviewCard from '@/components/VideoPreviewCard';
import PlatformFooter from '@/components/layout/PlatformFooter';

// Shadcn/ui Components
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from "@/components/ui/use-toast";


// Lucide Icons
import { ThumbsUp, ThumbsDown, Share2, Bookmark as SaveIcon } from 'lucide-react';

const VideoWatchPage = () => {
  console.log('VideoWatchPage loaded');
  const { toast } = useToast();

  // State for InteractiveVideoPlayerControls
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(356); // Example: 5:56 in seconds
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentPlaybackRate, setCurrentPlaybackRate] = useState(1);
  const [currentQuality, setCurrentQuality] = useState("Auto");
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Simulate video progress
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentTime < duration) {
      timer = setInterval(() => {
        setCurrentTime((prevTime) => Math.min(prevTime + 1, duration));
      }, 1000);
    }
    if (currentTime >= duration && isPlaying) {
      setIsPlaying(false); // Stop playing at the end
      setCurrentTime(duration); // Ensure it shows full duration
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentTime, duration]);

  const playerControlsProps = {
    isPlaying,
    volume,
    isMuted,
    currentTime,
    duration,
    isFullscreen,
    onPlayPause: () => setIsPlaying(!isPlaying),
    onVolumeChange: (vol: number) => {
      setVolume(vol);
      if (vol > 0 && isMuted) setIsMuted(false);
    },
    onMuteToggle: () => setIsMuted(!isMuted),
    onSeek: (time: number) => setCurrentTime(time),
    onFullscreenToggle: () => setIsFullscreen(!isFullscreen), // This would typically interact with browser fullscreen API
    currentPlaybackRate,
    onPlaybackRateChange: (rate: number) => setCurrentPlaybackRate(rate),
    currentQuality,
    onQualityChange: (quality: string) => setCurrentQuality(quality),
  };

  const videoDescription = `Embark on an epic journey through the stunning landscapes of New Zealand, from the Fiordland National Park to the geothermal wonders of Rotorua. This 4K drone footage captures the raw beauty and diverse ecosystems of Aotearoa.

Key moments:
0:00 - Intro
0:30 - Milford Sound
1:15 - Hobbiton Movie Set
2:05 - Wai-O-Tapu Thermal Wonderland
3:00 - Queenstown Adventures
4:30 - Aoraki/Mount Cook

Shot on DJI Mavic 3 Pro. Edited in DaVinci Resolve.
Music by Epidemic Sound.

#NewZealand #Travel #Drone #4K #Adventure #Nature`;

  const sampleComments = [
    {
      id: 'comment1',
      avatarUrl: 'https://i.pravatar.cc/150?img=5',
      username: 'TravelExplorer',
      commentText: "Absolutely breathtaking! New Zealand has been on my bucket list for ages. This video just pushed it to the top!",
      timestamp: '3 hours ago',
      initialLikes: 28,
      initialDislikes: 0,
      onReply: (id: string | number) => { console.log(`Reply to comment ${id}`); toast({ title: "Reply", description: "Reply functionality not implemented in this demo."}) },
    },
    {
      id: 'comment2',
      avatarUrl: 'https://i.pravatar.cc/150?img=6',
      username: 'DronePilotPro',
      commentText: "Amazing drone work! The shots of Milford Sound are incredible. What were your ND filter settings for those bright scenes?",
      timestamp: '1 hour ago',
      initialLikes: 12,
      initialDislikes: 0,
      indentationLevel: 0,
      onReply: (id: string | number) => { console.log(`Reply to comment ${id}`); toast({ title: "Reply", description: "Reply functionality not implemented in this demo."}) },
    },
  ];

  const relatedVideos = [
    {
      videoId: 'related1',
      thumbnailUrl: 'https://picsum.photos/seed/nzlandscape/320/180',
      videoTitle: 'Exploring the Glaciers of Iceland - 4K Drone Film',
      channelName: 'ArcticAdventures',
      channelAvatarUrl: 'https://i.pravatar.cc/150?img=7',
      channelUrl: '/', // Consistent with App.tsx (Homepage)
      viewCount: 750000,
      uploadDate: '2 days ago',
      videoDuration: '18:45',
    },
    {
      videoId: 'related2',
      thumbnailUrl: 'https://picsum.photos/seed/alps/320/180',
      videoTitle: 'Hiking the Swiss Alps: Summer Trails',
      channelName: 'MountainPeaks',
      channelAvatarUrl: 'https://i.pravatar.cc/150?img=8',
      channelUrl: '/', // Consistent with App.tsx (Homepage)
      viewCount: 320000,
      uploadDate: '1 week ago',
      videoDuration: '22:10',
    },
    {
      videoId: 'related3',
      thumbnailUrl: 'https://picsum.photos/seed/patagonia/320/180',
      videoTitle: 'Patagonia\'s Untamed Wilderness - Cinematic Travel Video',
      channelName: 'WildernessFilms',
      channelAvatarUrl: 'https://i.pravatar.cc/150?img=9',
      channelUrl: '/', // Consistent with App.tsx (Homepage)
      viewCount: 1100000,
      uploadDate: '3 days ago',
      videoDuration: '12:30',
    },
     {
      videoId: 'related4',
      thumbnailUrl: 'https://picsum.photos/seed/norway/320/180',
      videoTitle: 'Norway Fjords by Kayak: A Solo Adventure',
      channelName: 'SoloVoyager',
      channelAvatarUrl: 'https://i.pravatar.cc/150?img=10',
      channelUrl: '/', // Consistent with App.tsx (Homepage)
      viewCount: 45000,
      uploadDate: '5 days ago',
      videoDuration: '17:05',
    },
  ];

  const handleSubscribe = () => {
    toast({
      title: "Subscribed!",
      description: "You've subscribed to EpicDroneJourneys.",
    });
  };
  
  const handleSaveVideo = () => {
    toast({
      title: "Video Saved",
      description: "This video has been added to your 'Watch Later' list.",
    });
  };


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <PlatformHeader />
      <div className="flex flex-1 pt-16"> {/* pt-16 for fixed header (h-16) */}
        <PlatformSidebar />
        <main className="flex-1 md:ml-64 p-4 lg:p-6 overflow-y-auto"> {/* md:ml-64 for sidebar (w-64) */}
          <div className="flex flex-col lg:flex-row gap-6 max-w-screen-2xl mx-auto">
            {/* Main Video Content Column */}
            <div className="flex-grow lg:w-[calc(100%-24rem)] xl:w-[calc(100%-26rem)]"> {/* Adjust width calculation based on sidebar width */}
              {/* Video Player Section */}
              <section className="mb-4">
                <AspectRatio ratio={16 / 9} className="bg-black rounded-lg overflow-hidden shadow-lg group/video relative">
                  <img 
                    src="https://picsum.photos/seed/mainvideo/1280/720" 
                    alt="Video player placeholder" 
                    className="w-full h-full object-cover"
                  />
                  <InteractiveVideoPlayerControls {...playerControlsProps} />
                </AspectRatio>
              </section>

              {/* Video Metadata & Actions Section */}
              <section className="mb-4">
                <h1 className="text-2xl lg:text-3xl font-bold mb-2 leading-tight">
                  Journey Through New Zealand: A 4K Drone Adventure
                </h1>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 text-sm text-muted-foreground">
                  <p>2,345,678 views &bull; Uploaded 1 week ago</p>
                  <div className="flex items-center space-x-1 sm:space-x-2 mt-2 sm:mt-0">
                    <Button variant="ghost" size="sm" className="flex items-center">
                      <ThumbsUp className="mr-1.5 h-4 w-4" /> 35K
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center">
                      <ThumbsDown className="mr-1.5 h-4 w-4" /> 500
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center">
                      <Share2 className="mr-1.5 h-4 w-4" /> Share
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center" onClick={handleSaveVideo}>
                      <SaveIcon className="mr-1.5 h-4 w-4" /> Save
                    </Button>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                      <AvatarImage src="https://i.pravatar.cc/150?img=42" alt="EpicDroneJourneys" />
                      <AvatarFallback>EDJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <Link to="/" className="font-semibold text-base text-foreground hover:text-primary">
                        EpicDroneJourneys
                      </Link>
                      <p className="text-xs text-muted-foreground">2.1M subscribers</p>
                    </div>
                  </div>
                  <Button onClick={handleSubscribe} className="sm:ml-auto mt-2 sm:mt-0">Subscribe</Button>
                </div>
              </section>

              {/* Video Description Section */}
              <section className="mb-6 p-3 sm:p-4 bg-muted/50 rounded-lg">
                <div className="text-sm text-foreground">
                  <p className={`whitespace-pre-line ${showFullDescription ? '' : 'line-clamp-3'}`}>
                    {videoDescription}
                  </p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-xs text-primary hover:text-primary/80"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                  >
                    {showFullDescription ? 'Show less' : 'Show more'}
                  </Button>
                </div>
              </section>

              <Separator className="my-6" />

              {/* Comments Section */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Comments ({sampleComments.length})</h2>
                <div className="flex items-start space-x-3 mb-6">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://i.pravatar.cc/150?u=currentUser" alt="Current User" />
                    <AvatarFallback>YOU</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea placeholder="Add a public comment..." className="mb-2 bg-background border-border focus:border-primary" rows={2} />
                    <div className="flex justify-end">
                      <Button onClick={() => toast({title: "Comment Posted (Demo)", description: "Your comment would appear here."})}>Comment</Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {sampleComments.map((comment) => (
                    <CommentEntry key={comment.id} {...comment} />
                  ))}
                </div>
              </section>
            </div>

            {/* Related Videos Sidebar */}
            <aside className="lg:w-96 xl:w-104 shrink-0"> {/* Fixed width for related videos sidebar */}
              <h2 className="text-xl font-semibold mb-4">Up Next</h2>
              <ScrollArea className="h-[calc(100vh-10rem)] lg:h-auto lg:max-h-[calc(100vh-8rem)] relative"> {/* Adjust height */}
                <div className="space-y-3">
                  {relatedVideos.map((video) => (
                    <VideoPreviewCard key={video.videoId} {...video} />
                  ))}
                </div>
              </ScrollArea>
            </aside>
          </div>
        </main>
      </div>
      <PlatformFooter />
    </div>
  );
};

export default VideoWatchPage;