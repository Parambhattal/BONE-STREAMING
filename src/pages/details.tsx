import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDetails } from '../lib/api';
import { VideoPlayer } from '../components/ui/VideoPlayer';
import { config } from '@/lib/config';
import axios from 'axios';

export const Details = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [details, setDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDetails = async () => {
      const timestamp = Math.floor(Date.now() / 1000).toString(); // Generate timestamp
      try {
        const data = await fetchDetails(id!, timestamp); // Pass timestamp here
        setDetails(data);
      } catch (err) {
        console.error('Failed to fetch details:', err);
        setError('Failed to load details');
      } finally {
        setIsLoading(false);
      }
    };

    loadDetails();
  }, [id]);

  const handleBack = () => navigate(-1);

  const handlePlay = async () => {
    try {
      // Fetch the master playlist URL
      const masterPlaylistUrl = `${config.api}/hls/${id}.m3u8?in=unknown::ni`;
      console.log('Master Playlist URL:', masterPlaylistUrl); // Debugging

      // Set the master playlist URL as the video source
      setVideoUrl(masterPlaylistUrl);
    } catch (err) {
      console.error('Failed to fetch video URL:', err);
      setError('Failed to load video');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">{error || 'No details found.'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: `url(${config.image.config.url}/${config.image.config.sizes.backdrop}/${id}.jpg)`,
        }}
      ></div>

      <div className="relative z-10 p-8">
        <button
          onClick={handleBack}
          className="mb-8 text-white hover:text-gray-400 transition duration-200"
        >
          &larr; Back
        </button>

        {/* Movie Details */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4">{details.title}</h1>
          <div className="flex flex-wrap gap-4 text-gray-300">
            <span>IMDb {details.match}</span>
            <span>{details.runtime}</span>
            <span>{details.year}</span>
            <span>{details.hdsd}</span>
            <span>{details.ua}</span>
          </div>
        </div>

        {/* Image & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative">
            <img
              src={`${config.image.config.url}/${id}.jpg`}
              alt={details.title}
              className="w-full rounded-lg"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/342x513?text=No+Image';
              }}
            />
            <button
              onClick={handlePlay}
              className="absolute bottom-4 left-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Play
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-300 mb-6">{details.desc}</p>

            {/* Genres */}
            <h2 className="text-2xl font-bold mb-4">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {details.genre.split(', ').map((genre: string, index: number) => (
                <span key={index} className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Video Player */}
        {videoUrl && (
          <div className="mt-8" style={{ zIndex: 1000, position: 'relative' }}>
            <VideoPlayer url={videoUrl} />
          </div>
        )}

        {/* Suggested Movies */}
        {details.suggest && details.suggest.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Suggested Movies</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {details.suggest.map((suggestion: any) => (
                <div
                  key={suggestion.id}
                  className="bg-gray-900 rounded-lg p-4 shadow-lg hover:scale-105 transition duration-200 cursor-pointer"
                >
                  <img
                    src={`${config.image.config.url}/${suggestion.id}.jpg`}
                    alt={suggestion.title}
                    className="w-full rounded-lg mb-2"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/342x513?text=No+Image';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};