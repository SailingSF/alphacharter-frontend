import React from 'react';
import HeroSection from './Herosection';
import FeatureCards from './FeatureCards';
import AppDemo from './AppDemo';
import CallToAction from './CallToAction';
import TestimonialsSection from './TestimonialSection';

function HomePage() {

  return (
    <div>
      <HeroSection />
      <FeatureCards />
      <AppDemo />
      <CallToAction text='Make an account!' href='/login' />
      <TestimonialsSection />

    </div>
  );
}

export default HomePage;