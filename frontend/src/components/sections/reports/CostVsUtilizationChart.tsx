// src/components/sections/reports/CostVsUtilizationChart.tsx
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { license: 'Adobe', cost: 5000, utilization: 78 },
  { license: 'MS Office', cost: 3000, utilization: 90 },
  { license: 'AutoCAD', cost: 4000, utilization: 60 },
  { license: 'Figma', cost: 2000, utilization: 85 },
];

const CostVsUtilizationChart = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Cost vs Utilization</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="license" />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" unit="%" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="cost" fill="#82ca9d" />
          <Line yAxisId="right" type="monotone" dataKey="utilization" stroke="#8884d8" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CostVsUtilizationChart;
