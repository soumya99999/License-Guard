// src/components/sections/hero/Hero.tsx
import HeroText from './HeroText';
import HeroImage from './HeroImage';

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 py-12 bg-blue-200 rounded-4xl">
      {/* Left Section */}
      <div className="md:w-3/5 w-full mb-8 md:mb-0">
        <HeroText />
      </div>

      {/* Right Section */}
      <div className="md:w-2/5 w-full flex justify-center">
        <HeroImage />
      </div>
    </section>
  );
};

export default Hero;
