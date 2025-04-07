import React from 'react';
import { LineChart, Shield, Wallet, Users } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const tenantData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Tenant Satisfaction',
      data: [65, 70, 75, 80, 85, 90],
      borderColor: 'rgb(16, 185, 129)',
      tension: 0.1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

export const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Transformation Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Compliance Score */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Shield className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-emerald-600">85%</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Compliance Score</h3>
          <p className="text-gray-600">Act by 2026 to maintain compliance</p>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-emerald-600 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>

        {/* Retrofit Roadmap */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <LineChart className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-emerald-600">$2M</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Retrofit Roadmap</h3>
          <p className="text-gray-600">Solar + HVAC Upgrade</p>
          <button className="mt-4 w-full bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition-colors">
            Plan Now
          </button>
        </div>

        {/* Funding Options */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Wallet className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-emerald-600">4%</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Available Funding</h3>
          <p className="text-gray-600">PACE Loan: $1.5M</p>
          <button className="mt-4 w-full bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition-colors">
            Apply Now
          </button>
        </div>

        {/* Tenant Impact */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-emerald-600">+20%</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Tenant Retention</h3>
          <div className="h-32">
            <Line options={options} data={tenantData} />
          </div>
        </div>
      </div>
    </div>
  );
};