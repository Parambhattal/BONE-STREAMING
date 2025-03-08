export const config = {
  api: 'https://netfree.cc/pv', // Base API endpoint
  streaming: 'https://netfree.cc/stream', // Base streaming endpoint
  cache: {
    staleTime: 300000, // 5 minutes in ms
    cacheTime: 600000, // 10 minutes in ms
  },
  app: {
    title: 'StreamFlix',
    description: 'Your Ultimate Streaming Platform',
    version: '1.0.0',
    baseUrl: 'https://bone-stream.vercel.app/', // Base URL for the frontend
  },
    image: {
      config: {
        url: 'https://imgcdn.media/pv/341', // Base URL for movie images
        sizes: {
          poster: 'w780', // Use a larger size for better quality
          backdrop: '', // Use a larger size for better quality
        },
      },
    },
  slider: {
    breakpoints: {
      0: {
        slidesPerView: 1.8,
        slidesPerGroup: 1,
      },
      640: {
        slidesPerView: 2.5,
        slidesPerGroup: 2,
      },
      768: {
        slidesPerView: 3.05,
        slidesPerGroup: 2,
      },
      1024: {
        slidesPerView: 3.93,
        slidesPerGroup: 3,
      },
      1201: {
        slidesPerView: 4.93,
        slidesPerGroup: 4,
      },
      1441: {
        slidesPerView: 5.95,
        slidesPerGroup: 5,
      },
    },
    autoplay: {
      delay: 5000, // Autoplay delay in ms
      disableOnInteraction: false, // Continue autoplay after user interaction
    },
  },
  video: {
    formats: ['mp4', 'webm', 'ogg', 'm3u8'], // Supported video formats
    defaultQuality: '1080p', // Default video quality
    qualities: ['360p', '480p', '720p', '1080p'], // Available video qualities
    controls: {
      playPause: true,
      volume: true,
      fullscreen: true,
      progress: true,
      qualitySelector: true, // Allow users to select video quality
    },
  },
  analytics: {
    enabled: true, // Enable or disable analytics
    trackingId: 'UA-XXXXX-Y', // Google Analytics tracking ID
  },
  social: {
    facebook: 'https://facebook.com/streamflix',
    twitter: 'https://twitter.com/streamflix',
    instagram: 'https://instagram.com/streamflix',
  },
  seo: {
    defaultTitle: 'StreamFlix - Your Ultimate Streaming Platform',
    defaultDescription: 'Watch the latest movies and TV shows on StreamFlix.',
    keywords: ['streaming', 'movies', 'TV shows', 'StreamFlix'],
  },
};
