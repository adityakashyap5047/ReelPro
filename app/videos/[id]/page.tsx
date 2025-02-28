"use client";

import React, { useEffect, useState } from "react";
import { IVideo } from "@/models/Video";
import { apiClient } from "@/lib/api-client";
import { useParams } from "next/navigation";
import { IKVideo } from "imagekitio-next";

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
                className="rounded-xl overflow-hidden relative w-full md:max-w-[265px] md:max-h-[470px]"
                style={{ aspectRatio: "9/16"}}
              >
                <IKVideo
                  path={video.videoUrl}
                  transformation={[
                    {
                      height: "1920",
                      width: "1080",
                    },
                  ]}
                  controls={false}
                  autoPlay={true}
                  className="w-full h-full object-cover"
                />
              </div>
          </figure>

          <div className="card-body p-4">
            <h2 className="card-title text-lg">{video.title}</h2>

            <p className="text-sm text-base-content/70 ">
              {video.description}
            </p>
          </div>
        </div>
        </div>
      )}
    </main>
  );
}
