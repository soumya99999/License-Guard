// src/components/sections/hero/HeroText.tsx

import HeroButtons from './HeroButtons';

const HeroText = () => {
  return (
    <div>
      <h1 className="text-9xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
        LicenseGuard Dashboard
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Comprehensive software license management for your organization
      </p>
      <HeroButtons />
    </div>
  );
};

export default HeroText;
