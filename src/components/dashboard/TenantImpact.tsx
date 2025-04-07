import React, { useState } from 'react';
import { TenantSavingsCalculator } from '../tenant-impact/TenantSavingsCalculator';
import { CarbonReductionTool } from '../tenant-impact/CarbonReductionTool';
import { Users, TrendingUp, MessageSquare, LineChart } from 'lucide-react';

export const TenantImpact = () => {
  const [activeTab, setActiveTab] = useState('savings');

  const metrics = [
    {
      title: 'Average Tenant Satisfaction',
      value: '85%',
      change: '+5%',
      icon: Users,
    },
    {
      title: 'Tenant Retention Rate',
      value: '92%',
      change: '+8%',
      icon: TrendingUp,
    },
    {
      title: 'Response Time',
      value: '24hrs',
      change: '-10hrs',
      icon: MessageSquare,
    },
    {
      title: 'Energy Cost Savings',
      value: '$450K',
      change: '+15%',
      icon: LineChart,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.title} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon className="h-6 w-6 text-emerald-600" />
                <span className={`text-sm font-medium ${
                  metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{metric.title}</h3>
              <p className="text-2xl font-bold text-emerald-600 mt-2">{metric.value}</p>
            </div>
          );
        })}
      </div>

      {/* Calculator Tools */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('savings')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'savings'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tenant Savings Calculator
          </button>
          <button
            onClick={() => setActiveTab('carbon')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'carbon'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Carbon Reduction Tool
          </button>
        </div>

        {activeTab === 'savings' ? (
          <TenantSavingsCalculator />
        ) : (
          <CarbonReductionTool />
        )}
      </div>
    </div>
  );
};