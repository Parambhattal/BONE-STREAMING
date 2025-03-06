import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  url: string;
}

export const VideoPlayer = ({ url }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log('Manifest parsed, starting playback'); // Debugging
          video.play();
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error('HLS Error:', data); // Debugging
        });

        return () => {
          hls.destroy();
        };
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (e.g., Safari)
        video.src = url;
        video.addEventListener('loadedmetadata', () => {
          console.log('Video metadata loaded, starting playback'); // Debugging
          video.play();
        });
      } else {
        console.error('HLS is not supported in this browser.');
      }
    }
  }, [url]);

  return (
    <video
      ref={videoRef}
      controls
      className="w-full rounded-lg"
      autoPlay
    />
  );
};