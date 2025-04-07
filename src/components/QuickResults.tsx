import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AlertTriangle, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Assessment {
  savings: number;
  risk: string;
  deadline: string;
  recommendations: string[];
}

interface QuickResultsProps {
  onOpenSignup: () => void;
}

export const QuickResults = ({ onOpenSignup }: QuickResultsProps) => {
  const { state } = useLocation() as { state: { assessment: Assessment } };
  const { assessment } = state;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Property Assessment</h1>
          <p className="text-xl text-gray-600">
            Here's what we found based on your property details
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Risk Alert */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-red-50 border border-red-200 rounded-xl p-6"
          >
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-red-700">Compliance Risk Alert</h2>
            </div>
            <p className="text-lg text-red-600 mb-4">
              {assessment.risk}
            </p>
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-600">
                Local regulations require compliance by {assessment.deadline}. Act now to avoid penalties.
              </p>
            </div>
          </motion.div>

          {/* Savings Potential */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-emerald-50 border border-emerald-200 rounded-xl p-6"
          >
            <div className="flex items-center mb-4">
              <TrendingUp className="h-8 w-8 text-emerald-500 mr-3" />
              <h2 className="text-2xl font-bold text-emerald-700">Savings Opportunity</h2>
            </div>
            <p className="text-lg text-emerald-600 mb-4">
              Potential savings of ${assessment.savings.toLocaleString()} per year
            </p>
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-600">
                Smart retrofits could significantly reduce your operating costs while ensuring compliance.
              </p>
            </div>
          </motion.div>

          {/* Recommendations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Recommendations</h2>
            <ul className="space-y-3 mb-6">
              {assessment.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={onOpenSignup}
              className="w-full bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center"
            >
              Get Your Full Plan
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </motion.div>

          {/* Additional Resources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/compliance-guide"
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2">Compliance Guide</h3>
              <p className="text-gray-600">Learn more about regulations affecting your property</p>
            </Link>
            <Link
              to="/financing"
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2">Financing Options</h3>
              <p className="text-gray-600">Explore funding solutions for your retrofit project</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};