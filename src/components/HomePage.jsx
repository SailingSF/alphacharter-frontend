import React from "react";
import HeroSection from "./Herosection";
import FeatureCards from "./FeatureCards";
import ChartMakerDemo from "./ChartMakerDemo";
import ChatAppDemo from "./ChatAppDemo";
import CallToAction from "./CallToAction";
import TestimonialsSection from "./TestimonialSection";

function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeatureCards />
      <ChartMakerDemo />
      <ChatAppDemo />
      <CallToAction text="Make an account" href="/login" />
      <TestimonialsSection />
    </div>
  );
}

export default HomePage;
