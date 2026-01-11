"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Play, Pause, Volume2, VolumeX, RotateCcw, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

export function Hero() {
    const [showreelMode, setShowreelMode] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(1);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const isDraggingRef = useRef(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Sync state with video element
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            if (!isDraggingRef.current && video.duration) {
                setProgress(video.currentTime);
                // Safari fix: If duration was 0, update it now that we're playing
                if (duration === 0 && video.duration > 0) {
                    setDuration(video.duration);
                }
            }
        };

        const handleDurationChange = () => {
            if (video.duration && !isNaN(video.duration)) {
                setDuration(video.duration);
            }
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("durationchange", handleDurationChange);
        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("durationchange", handleDurationChange);
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
        };
    }, [isDragging]);

    // Listen for manual exit from Navbar
    useEffect(() => {
        const handleExit = () => setShowreelMode(false);
        window.addEventListener("exitShowreel", handleExit);
        return () => window.removeEventListener("exitShowreel", handleExit);
    }, []);

    // Dispatch event for Navbar
    useEffect(() => {
        window.dispatchEvent(new CustomEvent("showreelModeChanged", { detail: showreelMode }));
    }, [showreelMode]);

    // Auto-exit showreel mode on scroll or video end
    useEffect(() => {
        if (!showreelMode) return;

        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowreelMode(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [showreelMode]);

    // Handle mode changes
    useEffect(() => {
        if (showreelMode && videoRef.current) {
            videoRef.current.muted = false;
            setIsMuted(false);
            videoRef.current.currentTime = 0;
            // Ensure we capture duration when starting the showreel
            if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
                setDuration(videoRef.current.duration);
            }
            videoRef.current.play();
        } else if (!showreelMode && videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
        }
    }, [showreelMode]);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        const newMuted = !videoRef.current.muted;
        videoRef.current.muted = newMuted;
        setIsMuted(newMuted);
        if (!newMuted && volume === 0) {
            setVolume(0.5);
            videoRef.current.volume = 0.5;
        }
    };

    const handleVolumeChange = (value: number | readonly number[]) => {
        if (!videoRef.current) return;
        const newVolume = Array.isArray(value) ? value[0] : value;
        setVolume(newVolume);
        videoRef.current.volume = newVolume;
        if (newVolume > 0 && isMuted) {
            videoRef.current.muted = false;
            setIsMuted(false);
        } else if (newVolume === 0 && !isMuted) {
            videoRef.current.muted = true;
            setIsMuted(true);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current && videoRef.current.duration && !isNaN(videoRef.current.duration)) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleSliderChange = (value: number | readonly number[]) => {
        if (!videoRef.current) return;
        isDraggingRef.current = true;
        setIsDragging(true);
        const newValue = Array.isArray(value) ? value[0] : value;
        if (!isNaN(newValue) && duration > 0) {
            videoRef.current.currentTime = newValue;
            setProgress(newValue);
        }
    };

    const handleSliderCommitted = (value: number | readonly number[]) => {
        isDraggingRef.current = false;
        setIsDragging(false);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <section className="relative h-dvh min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-black">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedMetadata={handleLoadedMetadata}
                    className={cn(
                        "h-full w-full object-cover transition-opacity duration-1000 ease-in-out",
                        showreelMode ? "opacity-100" : "opacity-60"
                    )}
                >
                    <source
                        src="https://cdn.jsdelivr.net/gh/Ethereumistic/db-prod-assets/hero/showreel.mp4"
                        type="video/mp4"
                    />
                </video>
                {/* Bottom Gradient Fade */}
                <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black to-transparent" />
            </div>

            {/* Hero Content */}
            <div
                className={cn(
                    "container relative z-10 mx-auto px-4 transition-all duration-1000 ease-in-out",
                    showreelMode ? "opacity-0 scale-95 pointer-events-none translate-y-10" : "opacity-100 scale-100"
                )}
            >
                <div className="max-w-4xl mx-auto text-center space-y-8">


                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
                        ТВОРИМ <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/80 to-white/40">ВИЗУАЛНИ</span> ИЗЖИВЯВАНИЯ
                    </h1>

                    <p className="hidden md:block text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
                        db PRODUCTIONS е бутиково творческо студио, специализирано във видеографията, киното и дигиталното разказване на истории.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button size="lg" className="bg-white text-black hover:bg-white/90 px-8 py-7 text-lg font-bold transition-all hover:scale-105 active:scale-95 group">
                            Започни своя проект
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => setShowreelMode(true)}
                            className="border-white/10 hover:bg-white/5 px-8 py-7 text-lg font-medium transition-all hover:scale-105 active:scale-95"
                        >
                            <Play className="mr-2 h-4 w-4 fill-white" />
                            Виж шоурийл
                        </Button>
                    </div>
                </div>
            </div>

            <div
                className={cn(
                    "absolute bottom-[calc(3.5rem+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    showreelMode ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-50 translate-y-20 pointer-events-none"
                )}
            >
                <div className="flex items-center gap-2">
                    {/* Play/Pause Button */}
                    <div className="shrink-0">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={togglePlay}
                            className="size-8 rounded-none border-white/10 backdrop-blur-xs bg-black/40 text-white hover:bg-white/10 transition-colors"
                        >
                            {isPlaying ? <Pause className="size-3 fill-white" /> : <Play className="size-3 fill-white" />}
                        </Button>
                    </div>

                    {/* Progress Slider */}
                    <div className="grow h-8 flex flex-col justify-center px-6 rounded-none border border-white/10 backdrop-blur-xs bg-white/5">
                        <Slider
                            value={[progress]}
                            max={duration > 0 ? duration : 100}
                            step={0.1}
                            onValueChange={handleSliderChange}
                            onValueCommitted={handleSliderCommitted}
                            className="cursor-pointer"
                        />
                        {/* <div className="flex justify-between text-[10px] text-white/40 font-mono uppercase tracking-widest mt-1">
                            <span>{formatTime(progress)}</span>
                            <span>{formatTime(duration)}</span>
                        </div> */}
                    </div>

                    {/* Mute Button & Volume Slider */}
                    <div
                        className="shrink-0 relative"
                        onMouseEnter={() => setShowVolumeSlider(true)}
                        onMouseLeave={() => setShowVolumeSlider(false)}
                    >
                        {/* Volume Slider Popover */}
                        <div className={cn(
                            "absolute bottom-0 left-1/2 -translate-x-1/2 pb-10 z-50 transition-all duration-300",
                            showVolumeSlider ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                        )}>
                            <div className="h-32 w-8 flex flex-col items-center py-4 rounded-none border border-white/10 backdrop-blur-xs bg-white/3">
                                <Slider
                                    orientation="vertical"
                                    value={[isMuted ? 0 : volume]}
                                    max={1}
                                    step={0.01}
                                    onValueChange={handleVolumeChange}
                                    className="h-full cursor-pointer"
                                />
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={toggleMute}
                            className="size-8 rounded-none border-white/10 backdrop-blur-xl bg-black/40 text-white hover:bg-white/10 transition-colors"
                        >
                            {isMuted ? <VolumeX className="size-3" /> : <Volume2 className="size-3" />}
                        </Button>
                    </div>

                    {/* Close Button */}
                    <div className="shrink-0">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setShowreelMode(false)}
                            className="size-8 rounded-none border-white/10 backdrop-blur-xl bg-black/40 text-white hover:bg-white/10 transition-colors group"
                        >
                            <Minimize2 className="size-3 group-hover:scale-110 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Vignette for depth */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-1" />
        </section>
    );
}