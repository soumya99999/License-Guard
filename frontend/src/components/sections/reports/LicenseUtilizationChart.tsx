// src/components/sections/reports/LicenseUtilizationChart.tsx
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', utilization: 65 },
  { month: 'Feb', utilization: 72 },
  { month: 'Mar', utilization: 68 },
  { month: 'Apr', utilization: 80 },
  { month: 'May', utilization: 75 },
];

const LicenseUtilizationChart = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">License Utilization Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis unit="%" />
          <Tooltip />
          <Line type="monotone" dataKey="utilization" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LicenseUtilizationChart;
