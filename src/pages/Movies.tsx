import { useQuery } from 'react-query';
import { HeroSlider } from '../components/ui/hero-slider';
import { ContentRow } from '../components/ui/content-row';
import { fetchHomeContent } from '../lib/api';
import { config } from '@/lib/config';

export const Movies = () => {
  const { data, isLoading } = useQuery('homeContent', fetchHomeContent);

  if (isLoading) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-black">
      <HeroSlider slides={data?.slider || []} />
      
      <div className="container mx-auto px-4 pb-20">
        {data?.post.map((category: { cate: string, ids: string }) => (
          <ContentRow
            key={category.cate}
            title={category.cate}
            items={category.ids.split(',').map((id: string) => ({
              id,
              title: id,
              poster: `${config.image.config.url}/${config.image.config.sizes.poster}/${id}.jpg`
            }))}
          />
        ))}
      </div>
    </div>
  );
};