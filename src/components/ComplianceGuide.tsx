import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Shield, AlertTriangle, Building2, DollarSign, ChevronRight, Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { complianceLaws, states } from '../data/complianceData';

export const ComplianceGuide = () => {
  const [selectedState, setSelectedState] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredLaws = complianceLaws.filter(law => {
    const matchesState = !selectedState || law.state === selectedState;
    const matchesSearch = !searchQuery || 
      law.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      law.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      law.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
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
              Nationwide Compliance Guide
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Navigate commercial real estate regulations across all 50 states—stay compliant, avoid fines, maximize returns
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-emerald-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Why Compliance Matters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-emerald-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Avoid Costly Fines</h3>
              <p className="text-gray-600">Non-compliance can result in penalties of up to $268 per metric ton of CO2</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Increase Property Value</h3>
              <p className="text-gray-600">Compliant buildings command 10% higher rental rates</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Future-Proof Assets</h3>
              <p className="text-gray-600">Stay ahead of evolving regulations and market demands</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">All States</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Regulations
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by keyword..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-gray-600">
          Showing {filteredLaws.length} regulation{filteredLaws.length !== 1 ? 's' : ''}
          {selectedState && ` in ${selectedState}`}
        </div>

        {/* Regulations Grid */}
        <div className="space-y-6">
          {filteredLaws.map((law) => (
            <motion.div
              key={law.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Shield className="h-6 w-6 text-emerald-600 mr-3" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{law.title}</h3>
                      <p className="text-gray-500">{law.state}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-amber-600 font-medium">Deadline: {law.deadline}</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{law.description}</p>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                    <span className="font-semibold text-amber-700">Potential Fines</span>
                  </div>
                  <p className="text-amber-700">{law.fines}</p>
                </div>

                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Building2 className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="font-semibold text-gray-900">Applies to:</span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    {law.buildingTypes.join(', ')} buildings
                    {law.squareFootageThreshold && ` over ${law.squareFootageThreshold.toLocaleString()} sq ft`}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                  <ul className="space-y-2">
                    {law.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-2">
                    <DollarSign className="h-5 w-5 text-emerald-600 mr-2" />
                    <span className="font-semibold text-emerald-700">RetrofitNow.ai Recommendation</span>
                  </div>
                  <p className="text-emerald-700">{law.recommendation}</p>
                </div>

                <Link
                  to="/quick-check"
                  className="inline-flex items-center justify-center w-full bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Check Your Building's Status
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-blue-900 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Ensure Compliance?</h2>
          <p className="text-xl mb-8">Get your personalized compliance roadmap and start saving today</p>
          <Link
            to="/quick-check"
            className="inline-flex items-center bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Check Your Building's Status
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};