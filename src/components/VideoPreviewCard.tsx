import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, MoreVertical, Clock, SlashCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils"; // Assuming cn is available for class merging

interface VideoPreviewCardProps {
  videoId: string;
  thumbnailUrl: string;
  videoTitle: string;
  channelName: string;
  channelAvatarUrl?: string;
  channelUrl: string;
  viewCount: number;
  uploadDate: string; // e.g., "2 weeks ago"
  videoDuration?: string; // e.g., "12:34"
}

const VideoPreviewCard: React.FC<VideoPreviewCardProps> = ({
  videoId,
  thumbnailUrl,
  videoTitle,
  channelName,
  channelAvatarUrl,
  channelUrl,
  viewCount,
  uploadDate,
  videoDuration,
}) => {
  const { toast } = useToast();
  console.log('VideoPreviewCard loaded for:', videoTitle);

  const formatViewCount = (count: number): string => {
    if (count >= 1_000_000_000) return `${(count / 1_000_000_000).toFixed(1)}B`;
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1_000) return `${(count / 1_000).toFixed(0)}K`; // Common to not show .0 for K
    return count.toString();
  };

  const handleAddToWatchLater = () => {
    toast({
      title: "Added to Watch Later",
      description: `"${videoTitle}" has been added to your Watch Later list.`,
    });
    // console.log(`Video ${videoId}: Add to Watch Later`);
  };

  const handleNotInterested = () => {
    toast({
      title: "Feedback Received",
      description: `We'll show less content like "${videoTitle}".`,
    });
    // console.log(`Video ${videoId}: Not interested`);
  };

  const videoWatchUrl = `/video-watch?v=${videoId}`;

  return (
    <Card className="group w-full overflow-hidden rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border dark:border-gray-700">
      <div className="relative">
        <Link to={videoWatchUrl} aria-label={`Watch ${videoTitle}`}>
          <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden rounded-t-lg">
            <img
              src={thumbnailUrl || 'https://via.placeholder.com/320x180?text=No+Thumbnail'}
              alt={videoTitle}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
            <PlayCircle className="h-12 w-12 text-white" strokeWidth={1.5} />
          </div>
          {videoDuration && (
            <Badge
              variant="secondary"
              className="absolute bottom-2 right-2 bg-black/75 text-white px-1.5 py-0.5 text-xs font-medium"
            >
              {videoDuration}
            </Badge>
          )}
        </Link>
      </div>

      <CardContent className="p-3">
        <div className="flex items-start gap-3">
          <Link to={channelUrl} className="flex-shrink-0 mt-0.5" aria-label={`Go to ${channelName}'s channel`}>
            <Avatar className="h-9 w-9">
              <AvatarImage src={channelAvatarUrl} alt={channelName} />
              <AvatarFallback>{channelName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex-1 min-w-0"> {/* min-w-0 for text truncation if title is too long */}
            <Link to={videoWatchUrl} aria-label={`Watch ${videoTitle}`}>
              <h3
                className="font-semibold text-sm md:text-base text-foreground line-clamp-2 hover:text-primary transition-colors"
                title={videoTitle}
              >
                {videoTitle}
              </h3>
            </Link>
            <Link
              to={channelUrl}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              title={channelName}
            >
              {channelName}
            </Link>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatViewCount(viewCount)} views &bull; {uploadDate}
            </p>
          </div>

          <div className="flex-shrink-0 -mr-1"> {/* Negative margin to align icon button visually */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options for {videoTitle}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleAddToWatchLater} className="cursor-pointer">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Add to Watch Later</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleNotInterested} className="cursor-pointer">
                  <SlashCircle className="mr-2 h-4 w-4" />
                  <span>Not interested</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPreviewCard;