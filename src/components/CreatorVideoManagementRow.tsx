import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  ThumbsUp,
  MessageSquare,
  Pencil,
  Trash2,
  BarChartBig, // Changed from LineChart for a more "analytics" feel
  MoreVertical,
} from 'lucide-react';

export type VideoVisibility = 'public' | 'private' | 'unlisted';

interface CreatorVideoManagementRowProps {
  videoId: string;
  thumbnailUrl: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  visibility: VideoVisibility;
  onEdit: (videoId: string) => void;
  onDelete: (videoId: string) => void;
  onAnalytics: (videoId: string) => void;
  // Example of how to include date, could be formatted string or Date object
  // uploadDate: string; 
}

const CreatorVideoManagementRow: React.FC<CreatorVideoManagementRowProps> = ({
  videoId,
  thumbnailUrl,
  title,
  views,
  likes,
  comments,
  visibility,
  onEdit,
  onDelete,
  onAnalytics,
}) => {
  console.log('CreatorVideoManagementRow loaded for video:', title);

  const getVisibilityBadgeVariant = () => {
    switch (visibility) {
      case 'public':
        return 'default'; // Or a custom "success" if defined
      case 'private':
        return 'destructive';
      case 'unlisted':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
      {/* Thumbnail */}
      <div className="flex-shrink-0">
        <img
          src={thumbnailUrl || 'https://via.placeholder.com/96x54?text=No+Image'} // Fallback image
          alt={`Thumbnail for ${title}`}
          className="w-20 h-12 sm:w-24 sm:h-14 md:w-32 md:h-18 object-cover rounded-md shadow-sm"
        />
      </div>

      {/* Video Info */}
      <div className="flex-grow min-w-0"> {/* min-w-0 helps with flex truncation */}
        <h3 className="text-sm sm:text-md font-semibold text-gray-800 dark:text-gray-100 line-clamp-2" title={title}>
          {title}
        </h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          <span className="flex items-center">
            <Eye className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4" /> {views.toLocaleString()}
          </span>
          <span className="flex items-center">
            <ThumbsUp className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4" /> {likes.toLocaleString()}
          </span>
          <span className="flex items-center">
            <MessageSquare className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4" /> {comments.toLocaleString()}
          </span>
          {/* Example: Upload Date */}
          {/* <span className="flex items-center">
            <CalendarDays className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4" /> {uploadDate}
          </span> */}
        </div>
      </div>

      {/* Visibility & Actions */}
      <div className="flex flex-shrink-0 items-center space-x-2 sm:space-x-4 ml-2">
        <Badge variant={getVisibilityBadgeVariant()} className="hidden sm:inline-flex capitalize text-xs px-2 py-0.5">
          {visibility}
        </Badge>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
              <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">Video Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => onEdit(videoId)} className="cursor-pointer">
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAnalytics(videoId)} className="cursor-pointer">
              <BarChartBig className="mr-2 h-4 w-4" />
              <span>Analytics</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(videoId)}
              className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:text-red-500 dark:focus:text-red-500 dark:focus:bg-red-900/50"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default CreatorVideoManagementRow;