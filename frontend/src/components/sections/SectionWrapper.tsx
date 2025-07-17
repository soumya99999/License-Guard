// src/components/sections/SectionWrapper.tsx

import React from 'react';
import Hero from './hero/Hero';
import StatsSection from './stats/StatsSection';
import Reports from './reports/Reports';
import Footer from '../layout/Footer/Footer';

const SectionWrapper: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-6 space-y-12 dark:bg-gray-900 bg-cyan-50">
      <Hero />
      <StatsSection />
      <Reports />
      <Footer />
      {/* Add more sections here later */}
    </div>
  );
};

export default SectionWrapper;
