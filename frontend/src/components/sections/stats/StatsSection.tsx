// src/components/sections/stats/StatsSection.tsx
import React from 'react';
import StatCard from './StatsCard';
import { statsData } from './statsData';

const StatsSection = () => {
  return (
    <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, idx) => (
        <StatCard
          key={idx}
          label={stat.label}
          value={stat.value}
          trend={stat.trend}
          icon={stat.icon}
          iconColor={stat.iconColor}
          bgColor={stat.bgColor}
        />
      ))}
    </section>
  );
};

export default StatsSection;
