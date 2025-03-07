"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  src: string;
  className?: string;
  showDelete?: boolean;
  onDelete?: () => void;
  isPending?: boolean;
}

export const AudioPlayer: FC<AudioPlayerProps> = ({
  src,
  className,
  showDelete = false,
  onDelete,
  isPending = false,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
    } else {
      audioRef.current.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newVolume = Number(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden rounded-lg border border-border-dark bg-background-muted px-4 py-3.5",
        className,
      )}
    >
      <audio ref={audioRef} src={src} />

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            className="flex size-10 items-center justify-center rounded-full bg-background-elevated text-text-primary shadow-sm ring-1 ring-border-dark/5 transition-all hover:scale-105 hover:bg-background-surface hover:text-primary hover:shadow-md active:scale-95"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 pl-0.5" />
            )}
          </button>
        </div>

        <div className="relative flex-1 -translate-y-0.5">
          <div className="relative">
            <input
              type="range"
              min={0}
              max={Math.floor(duration || 0)}
              value={currentTime}
              onChange={handleProgress}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-primary/20 to-background-elevated transition-all hover:from-primary/30 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary/60 [&::-webkit-slider-thumb]:bg-primary-light [&::-webkit-slider-thumb]:opacity-0 [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-all group-hover:[&::-webkit-slider-thumb]:border-primary group-hover:[&::-webkit-slider-thumb]:opacity-100"
              style={{
                background: `linear-gradient(to right, rgb(34, 197, 94, 0.5) 0%, rgb(34, 197, 94, 0.5) ${
                  (currentTime / (duration || 1)) * 100
                }%, rgb(63, 63, 70) ${
                  (currentTime / (duration || 1)) * 100
                }%, rgb(63, 63, 70) 100%)`,
              }}
              aria-label="Progress"
            />
          </div>
          <div className="absolute -bottom-3 left-0 right-0 flex justify-between">
            <span className="text-[10px] font-medium tabular-nums tracking-tight text-text-secondary/80">
              {formatTime(currentTime)}
            </span>
            <span className="text-[10px] font-medium tabular-nums tracking-tight text-text-secondary/80">
              {formatTime(duration || 0)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleMute}
            className="flex size-8 items-center justify-center rounded-full text-text-secondary transition-all hover:scale-105 hover:bg-background-surface hover:text-primary active:scale-95"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="h-[18px] w-[18px]" />
            ) : (
              <Volume2 className="h-[18px] w-[18px]" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={isMuted ? 0 : volume}
            onChange={handleVolume}
            className="h-1.5 w-20 cursor-pointer appearance-none rounded-full bg-gradient-to-r from-primary/20 to-background-elevated transition-all hover:from-primary/30 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary/60 [&::-webkit-slider-thumb]:bg-primary-light [&::-webkit-slider-thumb]:opacity-0 [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-all hover:[&::-webkit-slider-thumb]:border-primary group-hover:[&::-webkit-slider-thumb]:opacity-100"
            style={{
              background: `linear-gradient(to right, rgb(34, 197, 94, 0.5) 0%, rgb(34, 197, 94, 0.5) ${
                (isMuted ? 0 : volume) * 100
              }%, rgb(63, 63, 70) ${
                (isMuted ? 0 : volume) * 100
              }%, rgb(63, 63, 70) 100%)`,
            }}
            aria-label="Volume"
          />
        </div>
        {showDelete && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            disabled={isPending}
            className="rounded-md bg-background-elevated px-2.5 py-1.5 text-xs font-medium text-error transition-colors hover:bg-background-surface hover:text-error-light disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Removing..." : "Remove"}
          </button>
        )}
      </div>
    </div>
  );
};
