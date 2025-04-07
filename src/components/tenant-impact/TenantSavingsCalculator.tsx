import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export const TenantSavingsCalculator = () => {
  const [form, setForm] = useState({
    size: '',
    retrofit: '',
    cost: '2.50'
  });
  const [savings, setSavings] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock calculation for demo
    const annualCost = parseFloat(form.size) * parseFloat(form.cost);
    const savingsRate = form.retrofit === 'Solar' ? 0.3 : 
                       form.retrofit === 'HVAC' ? 0.25 :
                       form.retrofit === 'Insulation' ? 0.2 :
                       form.retrofit === 'EMS' ? 0.15 :
                       0.1; // Windows
    
    const calculatedSavings = Math.round(annualCost * savingsRate);
    setSavings(calculatedSavings);
  };

  const chartData = savings ? {
    labels: ['Pre-Retrofit Cost', 'Savings'],
    datasets: [{
      data: [
        parseFloat(form.size) * parseFloat(form.cost) - savings,
        savings
      ],
      backgroundColor: ['#e5e7eb', '#10b981'],
      borderColor: ['#d1d5db', '#059669'],
      borderWidth: 1,
    }]
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Tenant Savings Calculator</h2>
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
              <option value="Insulation">Insulation Upgrade</option>
              <option value="EMS">Energy Management System</option>
              <option value="Windows">Window Replacement</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Energy Cost ($/sq ft/year)
            </label>
            <input
              type="number"
              step="0.01"
              value={form.cost}
              onChange={(e) => setForm({ ...form, cost: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Calculate Savings
          </button>
        </form>
      </div>

      {savings && (
        <div className="bg-white rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Results</h3>
            <p className="text-3xl font-bold text-emerald-600">
              ${savings.toLocaleString()}/year
            </p>
            <p className="text-gray-600">Potential tenant savings</p>
          </div>

          <div className="h-64">
            {chartData && <Pie data={chartData} options={chartOptions} />}
          </div>

          <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
            <p className="text-sm text-emerald-800">
              These savings could increase tenant satisfaction and retention while improving your property's value.
            </p>
          </div>

          <button
            onClick={() => window.location.href = '/signup'}
            className="mt-6 w-full bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Get Your Full Savings Analysis
          </button>
        </div>
      )}
    </div>
  );
};