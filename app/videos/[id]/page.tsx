"use client";

import React, { useEffect, useState, useRef } from "react";
import { IVideo } from "@/models/Video";
import { apiClient } from "@/lib/api-client";
import { useParams } from "next/navigation";
import { IKVideo } from "imagekitio-next";
import { Play, Pause } from "lucide-react";

export default function Home() {
  const [video, setVideo] = useState<IVideo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLDivElement>(null);

  const params = useParams();
  const id = params?.id as string | undefined;

  useEffect(() => {
    if (!id) {
      setError("Invalid video ID");
      return;
    }

    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideo(id);
        if (!data) {
          setError("Video not found");
          return;
        }
        setVideo(data);
      } catch {
        setError("Invalid video ID. Please give a valid video ID.");
      }
    };

    fetchVideos();
  }, [id]); 

  const updateProgress = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const videoElement = e.currentTarget;
    if (videoElement.duration && !isNaN(videoElement.duration)) {
      setProgress((videoElement.currentTime / videoElement.duration) * 100);
  
      if (videoElement.buffered.length > 0) {
        const bufferedEnd = videoElement.buffered.end(videoElement.buffered.length - 1);
        setBuffered((bufferedEnd / videoElement.duration) * 100);
      }
    }
  };
  
  const handleVideoClick = () => {
    if (!videoRef.current) return;
    const videoElement = videoRef.current.querySelector("video");
    if (!videoElement) return;

    if (videoElement.paused) {
      videoElement.play();
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const videoElement = videoRef.current.querySelector("video");
    if (!videoElement) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * videoElement.duration;
    videoElement.currentTime = newTime;
  };

  return (
    <main className="container mx-auto px-4 py-8 max-h-[700px]">
      {error && (
        <div className="col-span-full text-center py-12 text-red-500">
          <p>{error}</p>
        </div>
      )}

      {!video && !error && (
        <div className="col-span-full text-center py-12">
          <p className="text-base-content/70">Loading...</p>
        </div>
      )}

      {video && (
        <div className="flex items-center">
          <div className="card bg-base-100 lg:w-3/4 mx-auto shadow hover:shadow-lg transition-all duration-300">
            <figure className="relative px-4 pt-4">
              <div
                ref={videoRef}
                className="rounded-xl overflow-hidden relative w-full md:max-w-[265px] md:max-h-[470px]"
                style={{ aspectRatio: "9/16" }}
              >
                <IKVideo
                  path={video.videoUrl}
                  transformation={[{ height: "1920", width: "1080" }]}
                  controls={false}
                  autoPlay
                  loop
                  className="w-full h-full object-cover"
                  onClick={handleVideoClick}
                  onTimeUpdate={updateProgress}
                />
                <button
                  className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full"
                  onClick={handleVideoClick}
                >
                  {!isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <div
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[92%] h-1 bg-gray-500 cursor-pointer rounded-md"
                  onClick={handleProgressClick}
                >
                <div
                  className="top-0 left-0 h-full bg-gray-300 rounded-md"
                  style={{ width: `${buffered}%` }}
                ></div>

                <div
                  className="relative top-0 left-0 -mt-1 h-full bg-blue-500 rounded-md"
                  style={{ width: `${progress}%` }}
                >
                </div>
                  <div
                    className="absolute -top-[6px] w-4 h-4 bg-blue-500 rounded-full "
                    style={{ left: `calc(${progress}% - 8px)` }}
                  >
                  </div>
                </div>
              </div>
            </figure>

            <div className="card-body p-4">
              <h2 className="card-title text-lg">{video.title}</h2>
              <p className="text-sm text-base-content/70">{video.description}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
