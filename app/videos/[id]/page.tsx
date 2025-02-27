"use client";

import React, { useEffect, useState } from "react";
import { IVideo } from "@/models/Video";
import { apiClient } from "@/lib/api-client";
import { useParams } from "next/navigation";
import VideoComponent from "@/app/components/VideoComponent";

export default function Home() {
  const [video, setVideo] = useState<IVideo | null>(null);
  const [error, setError] = useState<string | null>(null);
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
        setError("Invalid video ID. Please give valid video ID.");
      }
    };

    fetchVideos();
  }, [id]);

  return (
    <main className="container mx-auto px-4 py-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <VideoComponent key={video._id?.toString()} video={video} />
        </div>
      )}
    </main>
  );
}
