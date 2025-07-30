import { RefObject, useEffect, useState } from "react";

export default function useVideoPreload(
  videoRef: RefObject<HTMLVideoElement | null>
) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      // Double check that duration is available and valid
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        setVideoLoaded(true);
        video.currentTime = 0; // Reset to start
      }
    };

    const handleCanPlay = () => {
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        setVideoLoaded(true);
      }
    };

    // Also handle loadedmetadata event
    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        setVideoLoaded(true);
      }
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    // Force load
    video.load();

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [videoRef]);

  return videoLoaded;
}
