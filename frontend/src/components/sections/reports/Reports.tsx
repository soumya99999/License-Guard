// src/components/sections/reports/Reports.tsx
import LicenseUtilizationChart from './LicenseUtilizationChart';
import CostVsUtilizationChart from './CostVsUtilizationChart';
import DepartmentUsageChart from './DepartmentUsageChart';
import UnusedLicensesChart from './UnusedLicensesChart';

const Reports = () => {
  return (
    <section className="px-4 space-y-10">
      <h2 className="text-4xl flex justify-center font-bold text-gray-900 dark:text-white mb-2">Usage Reports</h2>

      {/* Grid Layout: 2 charts per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        <LicenseUtilizationChart />
        <CostVsUtilizationChart />
        <DepartmentUsageChart />
        <UnusedLicensesChart />
      </div>
    </section>
  );
};

export default Reports;
