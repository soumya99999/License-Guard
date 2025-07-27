import React from 'react';
import Hero from './hero/Hero';
import Footer from '../layout/Footer/Footer';
import ReportOptions from '../features/DownloadReport';
import StatsSection from './stats/StatsSection';

interface SectionWrapperProps {
  showHero?: boolean;
  showStats?: boolean;
  showReports?: boolean;
  showFooter?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  showHero = true,
  showStats = true,
  showReports = true,
  showFooter = true,
}) => {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-6 space-y-12 dark:bg-gray-900 bg-cyan-50">
      {showHero && <Hero />}
      {showStats && <StatsSection />}
      {showReports &&
       <ReportOptions />}
      {showFooter && <Footer />}
    </div>
  );
};

export default SectionWrapper;
