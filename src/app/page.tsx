"use client";

import FaqSection from "@/components/faq";
import FeaturesLandingPageSection from "@/components/features";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero";
import PricingLandingPageSection from "@/components/pricing";

export default function Home() {
  return (
    <div className='bg-background max-w-[1320px] mx-auto relative'>
      <HeroSection />
      <FeaturesLandingPageSection />
      <PricingLandingPageSection />
      <FaqSection />
      <Footer />
    </div>
  );
}
