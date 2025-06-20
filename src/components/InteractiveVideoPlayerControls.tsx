import React, { useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings2,
  Maximize,
  Minimize,
  Check,
} from 'lucide-react';

// Helper to format time from seconds to MM:SS
const formatTime = (timeInSeconds: number): string => {
  const validTime = Math.max(0, timeInSeconds || 0);
  const minutes = Math.floor(validTime / 60);
  const seconds = Math.floor(validTime % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const DEFAULT_PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];
const DEFAULT_QUALITIES = ["Auto", "1080p", "720p", "480p", "360p"];

interface InteractiveVideoPlayerControlsProps {
  isPlaying: boolean;
  volume: number; // 0 to 1
  isMuted: boolean;
  currentTime: number; // seconds
  duration: number; // seconds
  isFullscreen: boolean;
  
  onPlayPause: () => void;
  onVolumeChange: (volume: number) => void; // volume 0 to 1
  onMuteToggle: () => void;
  onSeek: (time: number) => void; // time in seconds
  onFullscreenToggle: () => void;
  
  availablePlaybackRates?: number[];
  currentPlaybackRate: number;
  onPlaybackRateChange: (rate: number) => void;
  
  availableQualities?: string[];
  currentQuality: string;
  onQualityChange: (quality: string) => void;

  forceVisible?: boolean; 
}

const InteractiveVideoPlayerControls: React.FC<InteractiveVideoPlayerControlsProps> = ({
  isPlaying,
  volume,
  isMuted,
  currentTime,
  duration,
  isFullscreen,
  onPlayPause,
  onVolumeChange,
  onMuteToggle,
  onSeek,
  onFullscreenToggle,
  availablePlaybackRates = DEFAULT_PLAYBACK_RATES,
  currentPlaybackRate,
  onPlaybackRateChange,
  availableQualities = DEFAULT_QUALITIES,
  currentQuality,
  onQualityChange,
  forceVisible = false,
}) => {
  console.log('InteractiveVideoPlayerControls loaded');

  const displayedCurrentTime = useMemo(() => formatTime(currentTime), [currentTime]);
  const displayedDuration = useMemo(() => formatTime(duration), [duration]);

  const handleSeekChange = (value: number[]) => {
    onSeek(value[0]);
  };

  const handleVolumeSliderChange = (value: number[]) => {
    const newVolumeLevel = value[0] / 100;
    if (isMuted && newVolumeLevel > 0) {
      onMuteToggle(); // Request unmute if user increases volume while muted
    }
    onVolumeChange(newVolumeLevel);
  };
  
  const sliderVolumeValue = isMuted ? 0 : volume * 100;

  return (
    <div 
      className={`absolute inset-0 z-20 flex flex-col justify-end p-2 sm:p-3 md:p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-opacity duration-300 ${forceVisible ? 'opacity-100' : 'opacity-0 group-hover/video:opacity-100 hover:opacity-100 focus-within:opacity-100'}`}
      data-testid="video-controls-container"
      // Note: group-hover/video requires parent to have `group/video` class.
      // `focus-within:opacity-100` helps keep controls visible if a child element (like slider/popover) is active.
    >
      {/* Progress Bar Area */}
      <div className="mb-1 sm:mb-2 px-1">
        <Slider
          value={[currentTime]}
          max={duration > 0 ? duration : 100} 
          step={0.1} 
          onValueChange={handleSeekChange}
          className="w-full h-2 video-progress-slider group"
          aria-label="Video progress"
        />
        <div className="flex justify-between text-xs text-white font-medium mt-1 sm:mt-1.5 px-0.5">
          <span>{displayedCurrentTime}</span>
          <span>{displayedDuration}</span>
        </div>
      </div>

      {/* Main Controls Row */}
      <div className="flex justify-between items-center">
        {/* Left Controls */}
        <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={onPlayPause} variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white">
                {isPlaying ? <Pause className="w-5 h-5 md:w-6 md:h-6" /> : <Play className="w-5 h-5 md:w-6 md:h-6" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-black/80 text-white border-none text-xs"><p>{isPlaying ? 'Pause (k)' : 'Play (k)'}</p></TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={onMuteToggle} variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white">
                {sliderVolumeValue === 0 ? <VolumeX className="w-5 h-5 md:w-6 md:h-6" /> : <Volume2 className="w-5 h-5 md:w-6 md:h-6" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-black/80 text-white border-none text-xs"><p>{sliderVolumeValue === 0 ? 'Unmute (m)' : 'Mute (m)'}</p></TooltipContent>
          </Tooltip>
          
          <div className="w-16 sm:w-20 md:w-24">
            <Slider
              value={[sliderVolumeValue]}
              max={100}
              step={1}
              onValueChange={handleVolumeSliderChange}
              className="h-2 video-volume-slider group"
              aria-label="Volume"
            />
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
          <Popover>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white">
                    <Settings2 className="w-5 h-5 md:w-6 md:h-6" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-black/80 text-white border-none text-xs"><p>Settings</p></TooltipContent>
            </Tooltip>
            <PopoverContent 
              side="top" 
              align="end" 
              className="w-48 sm:w-56 bg-black/85 backdrop-blur-md border-neutral-700/50 text-white shadow-xl mr-1 mb-1"
            >
              <div className="space-y-2 p-1">
                <div>
                  <p className="text-xs font-semibold mb-1 px-2 text-neutral-400">Speed</p>
                  {availablePlaybackRates.map((rate) => (
                    <Button
                      key={`rate-${rate}`}
                      variant="ghost"
                      className={`w-full justify-between text-xs sm:text-sm h-7 sm:h-8 px-2 rounded-sm ${currentPlaybackRate === rate ? 'bg-neutral-600 hover:bg-neutral-500 text-white' : 'hover:bg-neutral-700/80 text-neutral-200 hover:text-white'}`}
                      onClick={() => onPlaybackRateChange(rate)}
                    >
                      <span>{rate === 1 ? 'Normal' : `${rate}x`}</span>
                      {currentPlaybackRate === rate && <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                    </Button>
                  ))}
                </div>
                <Separator className="bg-neutral-700 my-1.5" />
                <div>
                  <p className="text-xs font-semibold mb-1 px-2 text-neutral-400">Quality</p>
                  {availableQualities.map((quality) => (
                    <Button
                      key={`quality-${quality}`}
                      variant="ghost"
                      className={`w-full justify-between text-xs sm:text-sm h-7 sm:h-8 px-2 rounded-sm ${currentQuality === quality ? 'bg-neutral-600 hover:bg-neutral-500 text-white' : 'hover:bg-neutral-700/80 text-neutral-200 hover:text-white'}`}
                      onClick={() => onQualityChange(quality)}
                    >
                      <span>{quality}</span>
                      {currentQuality === quality && <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                    </Button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={onFullscreenToggle} variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white">
                {isFullscreen ? <Minimize className="w-5 h-5 md:w-6 md:h-6" /> : <Maximize className="w-5 h-5 md:w-6 md:h-6" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-black/80 text-white border-none text-xs"><p>{isFullscreen ? 'Exit Fullscreen (f)' : 'Fullscreen (f)'}</p></TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default InteractiveVideoPlayerControls;