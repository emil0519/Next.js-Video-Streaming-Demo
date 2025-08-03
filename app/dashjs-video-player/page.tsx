"use client";

import { useEffect, useRef, useState } from "react";

export default function DashjsVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const [bitrates, setBitrates] = useState<
    { id: number; height: number; bitrate: number }[]
  >([]);
  const [selectedQuality, setSelectedQuality] = useState<number | "auto">(
    "auto"
  );

  useEffect(() => {
    if (typeof window === "undefined" || !videoRef.current) return;

    import("dashjs").then((dashjs) => {
      const player = dashjs.MediaPlayer().create();
      player.initialize(
        videoRef.current as HTMLVideoElement,
        "http://localhost:8000/dash/manifest.mpd",
        true
      );
      playerRef.current = player;

      player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
        const videoBitrates = player.getRepresentationsByType("video");
        setBitrates(
          videoBitrates.map((b: any) => ({
            id: b.id ?? b.index,
            bitrate: b.bandwidth,
            height: b.height,
            width: b.width,
          }))
        );
        setSelectedQuality(
          playerRef.current.getCurrentRepresentationForType("video")
            .absoluteIndex
        );
      });

      player.on(dashjs.MediaPlayer.events.ERROR, (e: any) => {
        console.error("Dash.js Error:", e);
      });
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.reset();
        playerRef.current = null;
      }
    };
  }, []);

  const onQualityChange = (qualityId: number | "auto") => {
    setSelectedQuality(qualityId);
    if (!playerRef.current) return;
    playerRef.current.updateSettings({
      streaming: {
        abr: {
          autoSwitchBitrate: false,
        },
      },
    });
    playerRef.current.setRepresentationForTypeById("video", qualityId, true);
  };

  return (
    <div className="flex flex-col items-center py-16 space-y-4 text-white">
      <h1 className="text-2xl font-bold">DASH Video Player</h1>
      <video
        ref={videoRef}
        controls
        width={800}
        className="rounded shadow-md bg-black"
      />
      <div>
        <label className="mr-2">畫質選擇：</label>
        <select
          value={selectedQuality}
          onChange={(e) => onQualityChange(e.target.value)}
        >
          {bitrates.map(({ id, height }) => (
            <option key={id} value={id}>
              {height}p
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
