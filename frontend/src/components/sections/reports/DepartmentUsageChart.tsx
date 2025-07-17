// src/components/sections/reports/DepartmentUsageChart.tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { department: 'Dev', Adobe: 30, MSOffice: 20 },
  { department: 'QA', Adobe: 10, MSOffice: 25 },
  { department: 'HR', Adobe: 5, MSOffice: 15 },
];

const DepartmentUsageChart = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Department-wise License Usage</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Adobe" stackId="a" fill="#8884d8" />
          <Bar dataKey="MSOffice" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentUsageChart;
