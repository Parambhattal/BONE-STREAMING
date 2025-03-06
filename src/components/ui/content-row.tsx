import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { config } from '../../lib/config';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';

interface ContentRowProps {
  title: string;
  items: Array<{
    id: string;
    title: string;
  }>;
}

export const ContentRow: React.FC<ContentRowProps> = ({ title, items }) => {
  const navigate = useNavigate();

  const handleItemClick = (id: string) => {
    navigate(`/details/${id}`); // Navigate to the details page with the movie ID
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        breakpoints={config.slider.breakpoints}
        className="content-row"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} onClick={() => handleItemClick(item.id)}>
            <div className="relative overflow-hidden rounded-lg transition-transform hover:scale-105 cursor-pointer">
              <img
                src={`${config.image.config.url}/${item.id}.jpg`} // Dynamically construct the image URL
                alt={item.title}
                className="landscape-image w-full object-cover" // Apply landscape styling
                onError={(e) => {
                  // Fallback image if the API image fails to load
                  e.currentTarget.src = 'https://via.placeholder.com/1280x720?text=No+Image';
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};