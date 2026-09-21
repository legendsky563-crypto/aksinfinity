import Hero from '@/components/home/Hero';
import TrustStats from '@/components/home/TrustStats';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import PropertyDiscovery from '@/components/home/PropertyDiscovery';
import Localities from '@/components/home/Localities';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Services from '@/components/home/Services';
import RecentlyTransacted from '@/components/home/RecentlyTransacted';
import Testimonials from '@/components/home/Testimonials';
import GallerySection from '@/components/home/GallerySection';
import RealMapSection from '@/components/home/RealMapSection';
import About from '@/components/home/About';
import FinalCTA from '@/components/home/FinalCTA';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AKS Infinity",
    "description": "Premium Real Estate Consultancy in Delhi NCR",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110076",
      "addressCountry": "IN"
    }
  };

  return (
    <main>
      <Hero />
      <AnimateOnScroll>
        <TrustStats />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <FeaturedProperties />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <PropertyDiscovery />
      </AnimateOnScroll>
      <AnimateOnScroll id="locations">
        <Localities />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <WhyChooseUs />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Services />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <RecentlyTransacted />
      </AnimateOnScroll>
      <AnimateOnScroll id="gallery">
        <GallerySection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Testimonials />
      </AnimateOnScroll>
      <AnimateOnScroll id="about">
        <About />
      </AnimateOnScroll>
      <AnimateOnScroll id="map">
        <RealMapSection />
      </AnimateOnScroll>
      <FinalCTA />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
