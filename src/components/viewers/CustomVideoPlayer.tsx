/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Gauge
} from 'lucide-react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

interface CustomVideoPlayerProps {
  videoUrl: string;
  projectName: string;
}

// Global promise to manage loading of YouTube API
let apiReadyPromise: Promise<void> | null = null;

const loadYoutubeAPI = (): Promise<void> => {
  if (apiReadyPromise) return apiReadyPromise;

  apiReadyPromise = new Promise<void>((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }

    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (previousCallback) previousCallback();
      resolve();
    };

    const scriptSelector = 'script[src="https://www.youtube.com/iframe_api"]';
    if (!document.querySelector(scriptSelector)) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    } else {
      // If the script was already injected, poll until the API is fully parsed
      const checkAPI = setInterval(() => {
        if (window.YT && window.YT.Player) {
          resolve();
          clearInterval(checkAPI);
        }
      }, 50);
    }
  });

  return apiReadyPromise;
};

// Helper to extract YouTube Video ID
const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const PLAYER_PLACEHOLDER_HTML = {
  __html: '<div id="yt-player-placeholder" style="width:100%; height:100%;"></div>'
};

export const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ videoUrl, projectName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isHoveringVolume, setIsHoveringVolume] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const isInitializingRef = useRef<boolean>(false);
  const activeRef = useRef<boolean>(true);
  const hasStartedRef = useRef<boolean>(false);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync state changes with ref to avoid stale closure issues
  useEffect(() => {
    hasStartedRef.current = hasStarted;
  }, [hasStarted]);

  // Prefetch YouTube API on mount
  useEffect(() => {
    console.log("Component Mounted");
    loadYoutubeAPI();
    activeRef.current = true;
    return () => {
      console.log("Component Unmounted");
      activeRef.current = false;
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        console.log("Destroying YT Player (on component unmount)");
        playerRef.current.destroy();
      }
      playerRef.current = null;
    };
  }, []);

  // Format time (e.g. 02:45)
  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');
    return `${paddedMinutes}:${paddedSeconds}`;
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    if (!playerRef.current || typeof playerRef.current.playVideo !== 'function') return;
    
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
      setHasStarted(true);
    }
  };

  // Start play from thumbnail click (synchronous play to satisfy Chrome's autoplay policies)
  const handleStartPlay = () => {
    setHasStarted(true);
    hasStartedRef.current = true;
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  // Sync seekbar changes
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      playerRef.current.seekTo(newTime, true);
      setCurrentTime(newTime);
    }
  };

  // Volume handling
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
      playerRef.current.setVolume(newVolume * 100);
      if (typeof playerRef.current.mute === 'function') {
        playerRef.current.mute(newVolume === 0);
      }
    }
  };

  const toggleMute = () => {
    if (!playerRef.current || typeof playerRef.current.mute !== 'function') return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (nextMuted) {
      playerRef.current.mute();
    } else {
      playerRef.current.unMute();
      if (volume === 0) {
        setVolume(0.5);
        if (typeof playerRef.current.setVolume === 'function') {
          playerRef.current.setVolume(50);
        }
      } else {
        if (typeof playerRef.current.setVolume === 'function') {
          playerRef.current.setVolume(volume * 100);
        }
      }
    }
  };

  // Speed selection
  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    setShowSpeedMenu(false);
    if (playerRef.current && typeof playerRef.current.setPlaybackRate === 'function') {
      playerRef.current.setPlaybackRate(rate);
    }
  };

  // Fullscreen handling
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch((err) => {
        console.error("Error attempting to exit fullscreen:", err);
      });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Controls Auto-Hide Logic
  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
        setShowSpeedMenu(false);
      }, 2500);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      resetControlsTimeout();
    } else {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    }
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  // Keyboard controls
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
      return;
    }

    switch (e.key.toLowerCase()) {
      case ' ':
        e.preventDefault();
        togglePlay();
        resetControlsTimeout();
        break;
      case 'm':
        e.preventDefault();
        toggleMute();
        resetControlsTimeout();
        break;
      case 'f':
        e.preventDefault();
        toggleFullscreen();
        resetControlsTimeout();
        break;
      case 'arrowleft':
        e.preventDefault();
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          const current = playerRef.current.getCurrentTime();
          playerRef.current.seekTo(Math.max(0, current - 5), true);
          setCurrentTime(Math.max(0, current - 5));
          resetControlsTimeout();
        }
        break;
      case 'arrowright':
        e.preventDefault();
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          const current = playerRef.current.getCurrentTime();
          playerRef.current.seekTo(Math.min(duration, current + 5), true);
          setCurrentTime(Math.min(duration, current + 5));
          resetControlsTimeout();
        }
        break;
      case 'arrowup': {
        e.preventDefault();
        const vUp = Math.min(1, volume + 0.05);
        setVolume(vUp);
        setIsMuted(false);
        if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
          playerRef.current.setVolume(vUp * 100);
          playerRef.current.unMute();
        }
        resetControlsTimeout();
        break;
      }
      case 'arrowdown': {
        e.preventDefault();
        const vDown = Math.max(0, volume - 0.05);
        setVolume(vDown);
        if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
          playerRef.current.setVolume(vDown * 100);
          if (vDown === 0) {
            playerRef.current.mute();
            setIsMuted(true);
          }
        }
        resetControlsTimeout();
        break;
      }
      default:
        break;
    }
  };

  const isFirstRenderRef = useRef(true);

  // Reset state when videoUrl changes
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    console.log("videoUrl changed. Current player exists:", !!playerRef.current);
    setIsPlaying(false);
    setHasStarted(false);
    setCurrentTime(0);
    setDuration(0);
    setPlaybackRate(1);
    setShowSpeedMenu(false);
    isInitializingRef.current = false;
    elementRef.current = null;
    hasStartedRef.current = false;
    if (playerRef.current && typeof playerRef.current.destroy === 'function') {
      console.log("Destroying YT Player (on videoUrl change)");
      playerRef.current.destroy();
    }
    playerRef.current = null;
  }, [videoUrl]);

  // Callback Ref to initialize YouTube player once the parent DOM element mounts
  const initPlayerOnParentMount = (parent: HTMLDivElement | null) => {
    console.log("Callback Ref executes: parent = ", parent ? "element" : "null");
    if (!parent) {
      // React calls the ref callback with null to clear the old function.
      // We do NOT destroy the player here because the DOM element is still active in the DOM.
      // The player is cleanly destroyed via useEffect when videoUrl changes or the component unmounts.
      return;
    }

    const element = parent.querySelector('div#yt-player-placeholder') as HTMLDivElement | null;
    if (!element) return;

    // Track active element
    elementRef.current = element;

    // Prevent duplicate initialization on the active element
    if (playerRef.current || isInitializingRef.current) {
      return;
    }

    const videoId = getYoutubeId(videoUrl);
    if (!videoId) return;

    isInitializingRef.current = true;

    loadYoutubeAPI().then(() => {
      // Confirm the component is still active and this element is still the mounted target
      if (!activeRef.current || elementRef.current !== element) {
        isInitializingRef.current = false;
        return;
      }

      try {
        // Destroy existing player if any
        if (playerRef.current && typeof playerRef.current.destroy === 'function') {
          console.log("Destroying YT Player (before new instantiation)");
          playerRef.current.destroy();
        }

        console.log("Creating YT Player");
        playerRef.current = new window.YT.Player(element, {
          width: '100%',
          height: '100%',
          videoId: videoId,
          host: 'https://www.youtube.com',
          playerVars: {
            autoplay: 0,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            fs: 0,
            disablekb: 1,
            origin: window.location.origin
          },
          events: {
            onReady: (event: any) => {
              console.log("YT player onReady event fired");
              isInitializingRef.current = false;
              if (!activeRef.current || elementRef.current !== element) return;
              playerRef.current = event.target;
              setDuration(event.target.getDuration());
              event.target.setVolume(volume * 100);
              event.target.setPlaybackRate(playbackRate);
              if (isMuted) {
                event.target.mute();
              } else {
                event.target.unMute();
              }
              
              // If the user already clicked the play button while loading, start playing!
              if (hasStartedRef.current) {
                console.log("Starting playback from onReady since hasStartedRef.current is true");
                event.target.playVideo();
                setIsPlaying(true);
              }
            },
            onStateChange: (event: any) => {
              console.log("YT State:", event.data);
              if (!activeRef.current || elementRef.current !== element) return;
              const state = event.data;
              if (state === 1) {
                setIsPlaying(true);
              } else if (state === 2) {
                setIsPlaying(false);
              } else if (state === 0) {
                setIsPlaying(false);
                setCurrentTime(0);
              }
            }
          }
        });
      } catch (err) {
        isInitializingRef.current = false;
        console.error("[YT Player] Error during YT.Player creation:", err);
      }
    });
  };

  // Polling current time while playing
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && playerRef.current) {
      interval = setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          setCurrentTime(playerRef.current.getCurrentTime());
        }
      }, 250);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  return (
    <div 
      ref={containerRef}
      onKeyDown={handleKeyDown}
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      tabIndex={0}
      className="relative overflow-hidden rounded-xl border border-border-dark bg-black shadow-2xl aspect-video w-full max-w-5xl mx-auto focus:outline-none focus:ring-1 focus:ring-accent-blue/30 group/player select-none"
    >
      {/* 1. Cover Thumbnail Layer */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            key="thumbnail"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleStartPlay}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer overflow-hidden bg-gradient-to-br from-card-dark via-bg-dark to-card-dark select-none animate-spotlight-blue"
          >
            {/* Spotlight and Dots */}
            <div className="absolute top-0 left-0 right-0 bottom-0 grid-dots opacity-40" />
            <div className="absolute w-[300px] h-[300px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />
            
            {/* Visual Thumbnail Content */}
            <motion.div 
              className="z-10 text-center px-6 flex flex-col items-center justify-center animate-spotlight-purple"
              whileHover="hover"
            >
              {/* Play Button */}
              <motion.div
                variants={{
                  hover: { 
                    scale: 1.1, 
                    boxShadow: '0 0 35px rgba(59, 130, 246, 0.45)',
                    borderColor: 'rgba(59, 130, 246, 0.5)'
                  }
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white backdrop-blur-md transition-colors duration-300"
              >
                <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current translate-x-0.5 text-accent-blue" />
              </motion.div>
              
              <h4 className="mt-6 text-base sm:text-lg font-bold tracking-tight text-text-primary">
                {projectName} Demo
              </h4>
              <p className="mt-1 text-xs text-text-secondary max-w-xs leading-relaxed font-mono">
                Click anywhere to watch the project demonstration
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. YouTube Video Player Layer (pre-loads on mount) */}
      <div 
        key={videoUrl}
        className={`w-full h-full absolute inset-0 bg-black transition-opacity duration-300 ${
          hasStarted ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
        }`}
      >
        <div 
          ref={initPlayerOnParentMount}
          className="w-full h-full"
          dangerouslySetInnerHTML={PLAYER_PLACEHOLDER_HTML}
        />
      </div>

      {/* Click overlay to capture play/pause clicks over the video area */}
      {hasStarted && (
        <div 
          onClick={togglePlay}
          className="absolute inset-0 cursor-pointer z-10"
        />
      )}

      {/* 3. Custom Controls Overlays */}
      <AnimatePresence>
        {hasStarted && (!isPlaying || showControls) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 right-0 z-20 p-4 pt-10 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex flex-col gap-3"
          >
            {/* Timeline Seekbar Slider */}
            <div className="flex items-center gap-3 group/timeline">
              <span className="text-[10px] text-text-secondary font-mono">
                {formatTime(currentTime)}
              </span>
              <div className="relative flex-1 flex items-center">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-zinc-800 hover:h-1.5 rounded-lg appearance-none cursor-pointer accent-accent-blue transition-all"
                  style={{
                    background: `linear-gradient(to right, var(--color-accent-blue) 0%, var(--color-accent-blue) ${
                      (currentTime / (duration || 100)) * 100
                    }%, var(--color-border-dark) ${(currentTime / (duration || 100)) * 100}%, var(--color-border-dark) 100%)`,
                  }}
                />
              </div>
              <span className="text-[10px] text-text-secondary font-mono">
                {formatTime(duration)}
              </span>
            </div>

            {/* Button bar */}
            <div className="flex items-center justify-between">
              {/* Left Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                </button>

                {/* Volume Area */}
                <div 
                  className="flex items-center gap-1.5"
                  onMouseEnter={() => setIsHoveringVolume(true)}
                  onMouseLeave={() => setIsHoveringVolume(false)}
                >
                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5 text-zinc-400" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <AnimatePresence>
                    {(isHoveringVolume || volume > 0) && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 64, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="overflow-hidden flex items-center h-5"
                      >
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.05}
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-16 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-accent-blue"
                          style={{
                            background: `linear-gradient(to right, var(--color-accent-blue) 0%, var(--color-accent-blue) ${
                              (isMuted ? 0 : volume) * 100
                            }%, var(--color-border-dark) ${(isMuted ? 0 : volume) * 100}%, var(--color-border-dark) 100%)`,
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2 relative">
                {/* Playback Rate Speed Toggle */}
                <div className="relative">
                  <button
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-white text-xs font-mono transition-colors cursor-pointer"
                    title="Playback Speed"
                  >
                    <Gauge className="w-3.5 h-3.5 text-text-secondary" />
                    <span>{playbackRate}x</span>
                  </button>
                  <AnimatePresence>
                    {showSpeedMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full right-0 mb-2 w-28 rounded-lg bg-card-dark border border-border-dark p-1 shadow-xl z-30"
                      >
                        {[0.5, 1, 1.25, 1.5, 2].map((rate) => (
                          <button
                            key={rate}
                            onClick={() => handleSpeedChange(rate)}
                            className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-mono cursor-pointer transition-colors ${
                              playbackRate === rate 
                                ? 'bg-accent-blue/15 text-accent-blue font-semibold' 
                                : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                            }`}
                          >
                            {rate === 1 ? '1.0x (Normal)' : `${rate}x`}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
