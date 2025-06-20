import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming utils.ts for cn exists

interface CommentEntryProps {
  id: string | number;
  avatarUrl: string;
  username: string;
  commentText: string;
  timestamp: string; // e.g., "2 hours ago", "July 15, 2024"
  initialLikes?: number;
  initialDislikes?: number;
  onReply?: (commentId: string | number) => void;
  indentationLevel?: number; // 0 for top-level, 1 for first reply, etc.
  isInitiallyLiked?: boolean;
  isInitiallyDisliked?: boolean;
}

const CommentEntry: React.FC<CommentEntryProps> = ({
  id,
  avatarUrl,
  username,
  commentText,
  timestamp,
  initialLikes = 0,
  initialDislikes = 0,
  onReply,
  indentationLevel = 0,
  isInitiallyLiked = false,
  isInitiallyDisliked = false,
}) => {
  console.log(`CommentEntry loaded for comment ID: ${id}, user: ${username}`);

  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [isLiked, setIsLiked] = useState(isInitiallyLiked);
  const [isDisliked, setIsDisliked] = useState(isInitiallyDisliked);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
      if (isDisliked) {
        setDislikes(dislikes - 1);
        setIsDisliked(false);
      }
    }
    // In a real app, you'd also call an API to update the backend
  };

  const handleDislike = () => {
    if (isDisliked) {
      setDislikes(dislikes - 1);
      setIsDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      setIsDisliked(true);
      if (isLiked) {
        setLikes(likes - 1);
        setIsLiked(false);
      }
    }
    // In a real app, you'd also call an API to update the backend
  };

  const handleReply = () => {
    if (onReply) {
      onReply(id);
    }
    console.log(`Reply clicked for comment ID: ${id}`);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  // Max indentation level to prevent excessive nesting, e.g., 5 levels
  const effectiveIndentationLevel = Math.min(indentationLevel, 5);
  const indentationClass = `ml-${effectiveIndentationLevel * 6}`; // Tailwind ml-0, ml-6, ml-12, etc.

  return (
    <div className={cn("flex space-x-3 py-3", indentationClass)}>
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatarUrl} alt={`${username}'s avatar`} />
        <AvatarFallback>{getInitials(username)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{username}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{timestamp}</p>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {commentText}
        </p>
        <div className="flex items-center space-x-3 pt-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={cn("flex items-center space-x-1 text-xs p-1 h-auto", 
                         isLiked ? "text-blue-600 hover:text-blue-700" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            )}
          >
            <ThumbsUp className={cn("h-4 w-4", isLiked ? "fill-blue-600" : "fill-none")} />
            <span>{likes > 0 ? likes : ''}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDislike}
            className={cn("flex items-center space-x-1 text-xs p-1 h-auto",
                         isDisliked ? "text-red-600 hover:text-red-700" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            )}
          >
            <ThumbsDown className={cn("h-4 w-4", isDisliked ? "fill-red-600" : "fill-none")} />
             <span>{dislikes > 0 ? dislikes : ''}</span>
          </Button>
          {onReply && (
             <Button
                variant="ghost"
                size="sm"
                onClick={handleReply}
                className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 h-auto"
              >
              <MessageSquare className="h-4 w-4" />
              <span>Reply</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentEntry;