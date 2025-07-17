// src/components/sections/hero/HeroImage.tsx
import React from 'react';
import heroImg from '../../../assets/hero-img.png'; // Adjust path if needed

const HeroImage = () => {
  return (
    <img
      src={heroImg}
      alt="Hero"
      className="max-w-full h-auto object-contain"
    />
  );
};

export default HeroImage;
