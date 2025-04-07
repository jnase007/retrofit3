import React, { useState } from 'react';
import { Users, TrendingUp, MessageSquare, LineChart, Building2, DollarSign, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TenantSavingsCalculator } from './tenant-impact/TenantSavingsCalculator';
import { CarbonReductionTool } from './tenant-impact/CarbonReductionTool';

export const TenantImpact = () => {
  const [activeTab, setActiveTab] = useState('savings');

  const features = [
    {
      title: 'Tenant Satisfaction Tracking',
      description: 'Monitor and improve tenant satisfaction through regular surveys and feedback analysis.',
      icon: Users,
      metric: '85% Average',
    },
    {
      title: 'Energy Usage Analytics',
      description: 'Track and visualize tenant energy consumption patterns to identify optimization opportunities.',
      icon: LineChart,
      metric: '30% Reduction',
    },
    {
      title: 'Communication Portal',
      description: 'Streamline tenant communications about sustainability initiatives and building updates.',
      icon: MessageSquare,
      metric: '24hr Response',
    },
    {
      title: 'Performance Metrics',
      description: 'Measure and report on sustainability KPIs that matter to your tenants.',
      icon: TrendingUp,
      metric: '4.8/5 Rating',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">
              Tenant Impact Tools
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Transform your tenant experience with data-driven sustainability insights
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Value Proposition */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Drive Better Tenant Outcomes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our tools help you measure, improve, and showcase the impact of your sustainability initiatives
          </p>
        </div>

        {/* Calculator Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="text-emerald-600 font-semibold">{feature.metric}</div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-emerald-50 rounded-2xl p-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Tenant Experience?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join leading property owners saving $750,000+ annually through better tenant outcomes
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/quick-check"
                className="bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center"
              >
                Calculate Your Savings
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/user-dashboard"
                className="bg-blue-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-800 transition-colors inline-flex items-center"
              >
                View Dashboard Demo
                <Building2 className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};