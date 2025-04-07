import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const CarbonReductionTool = () => {
  const [form, setForm] = useState({ 
    size: '', 
    retrofit: '', 
    co2: '0.01' 
  });
  const [reduction, setReduction] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock calculation for demo
    const baseEmissions = parseFloat(form.size) * parseFloat(form.co2);
    const reductionRate = form.retrofit === 'Solar' ? 0.4 : 0.25; // 40% for Solar, 25% for HVAC
    const calculatedReduction = Math.round(baseEmissions * reductionRate);
    
    setReduction(calculatedReduction);
  };

  const chartData = reduction ? {
    labels: ['Before', 'After'],
    datasets: [{
      label: 'CO2 Emissions (tons/year)',
      data: [
        parseFloat(form.size) * parseFloat(form.co2),
        parseFloat(form.size) * parseFloat(form.co2) - reduction
      ],
      backgroundColor: ['#ef4444', '#10b981'],
    }]
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Carbon Emissions Impact'
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Carbon Footprint Reduction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Size (sq ft)
            </label>
            <input
              type="number"
              value={form.size}
              onChange={(e) => setForm({ ...form, size: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., 50000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Retrofit Type
            </label>
            <select
              value={form.retrofit}
              onChange={(e) => setForm({ ...form, retrofit: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select retrofit type...</option>
              <option value="Solar">Solar Installation</option>
              <option value="HVAC">HVAC Optimization</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current CO2 Emissions (tons/sq ft/year)
            </label>
            <input
              type="number"
              step="0.001"
              value={form.co2}
              onChange={(e) => setForm({ ...form, co2: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Calculate Reduction
          </button>
        </form>
      </div>

      {reduction && (
        <div className="bg-white rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Results</h3>
            <p className="text-3xl font-bold text-emerald-600">
              {reduction.toLocaleString()} tons/year
            </p>
            <p className="text-gray-600">Potential CO2 reduction</p>
          </div>

          <div className="h-64">
            {chartData && <Bar data={chartData} options={chartOptions} />}
          </div>

          <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
            <p className="text-sm text-emerald-800">
              This reduction could help avoid approximately ${(reduction * 268).toLocaleString()} in potential carbon penalties (at $268/ton).
            </p>
          </div>

          <button
            onClick={() => window.location.href = '/signup'}
            className="mt-6 w-full bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Get Your Full Carbon Analysis
          </button>
        </div>
      )}
    </div>
  );
};