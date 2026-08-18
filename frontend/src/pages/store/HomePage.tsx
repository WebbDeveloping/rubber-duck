import { HeroSlider } from '../../components/store/HeroSlider';
import { HomeAboutSection } from '../../components/store/HomeAboutSection';
import { HomeBanner } from '../../components/store/HomeBanner';
import { HomeBestSelling } from '../../components/store/HomeBestSelling';
import { HomeFeatured } from '../../components/store/HomeFeatured';
import { HomeFeatureSlider } from '../../components/store/HomeFeatureSlider';
import { HomeProducts } from '../../components/store/HomeProducts';
import { SocialFollowSection } from '../../components/store/SocialFollowSection';
import { TestimonialsSection } from '../../components/store/TestimonialsSection';

export function HomePage() {
  return (
    <main>
      <HeroSlider />
      <HomeAboutSection />
      <HomeFeatureSlider />
      <HomeBestSelling />
      <HomeProducts />
      <HomeFeatured />
      <HomeBanner />
      <TestimonialsSection />
      <SocialFollowSection />
    </main>
  );
}
