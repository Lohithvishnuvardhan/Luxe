import React, { useEffect } from 'react';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Categories from '@/components/home/Categories';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';

const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'LuxeCommerce - Premium Shopping Experience';
  }, []);

  return (
    <div>
      <Hero />
      <Features />
      <Categories />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;