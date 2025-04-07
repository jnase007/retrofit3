import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, TrendingUp, Shield, Users, Wallet, Plus, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SignupModal } from './auth/SignupModal';

export const Features = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  
  const features = [
    {
      title: 'AI-Powered Compliance',
      description: 'Stay ahead of regulations with real-time monitoring and predictive analytics.',
      icon: Shield,
      benefits: [
        'Automated compliance tracking',
        'Real-time violation alerts',
        'Regulatory deadline reminders',
        'Custom compliance reports'
      ]
    },
    {
      title: 'Smart Analytics Dashboard',
      description: 'Monitor energy consumption and building performance in real-time.',
      icon: TrendingUp,
      benefits: [
        'Real-time energy monitoring',
        'Cost analysis tools',
        'Performance benchmarking',
        'Trend analysis'
      ]
    },
    {
      title: 'Financing Solutions',
      description: 'Access competitive green financing options and government incentives.',
      icon: Wallet,
      benefits: [
        'PACE financing options',
        'Government incentives',
        'ROI calculator',
        'Payment tracking'
      ]
    },
    {
      title: 'Tenant Engagement',
      description: 'Tools to engage and educate tenants about sustainability initiatives.',
      icon: Users,
      benefits: [
        'Tenant portal access',
        'Energy usage insights',
        'Educational resources',
        'Communication tools'
      ]
    },
    {
      title: 'Portfolio Management',
      description: 'Centralized dashboard for managing multiple properties efficiently.',
      icon: Building2,
      benefits: [
        'Multi-property overview',
        'Asset performance tracking',
        'Document management',
        'Maintenance scheduling'
      ]
    },
    {
      title: 'Energy Optimization',
      description: 'AI-powered recommendations for maximizing energy efficiency.',
      icon: Plus,
      benefits: [
        'Smart device integration',
        'Automated controls',
        'Peak demand management',
        'Energy waste detection'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000)'
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transform Your Real Estate Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
              Comprehensive tools for sustainable property management and compliance
            </p>
            <Link
              to="/quick-check"
              className="inline-flex items-center bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-500 transition-all transform hover:-translate-y-1"
            >
              Start Your Transformation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600">
            Powerful tools designed for property owners and managers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <ArrowRight className="h-4 w-4 text-emerald-600 mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Portfolio?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join leading property owners in creating a sustainable future
            </p>
            <Link
              to="/quick-check"
              className="inline-flex items-center bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-500 transition-all transform hover:-translate-y-1"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Signup Modal */}
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSwitchToLogin={() => {
          setIsSignupModalOpen(false);
          // Add logic to open login modal if needed
        }}
      />
    </div>
  );
};