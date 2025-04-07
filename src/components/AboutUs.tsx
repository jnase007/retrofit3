import React from 'react';
import { Building2, Users, Award, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const AboutUs = () => {
  const stats = [
    { label: 'Properties Transformed', value: '500+' },
    { label: 'Carbon Reduction', value: '40%' },
    { label: 'Client Satisfaction', value: '98%' },
    { label: 'Years Experience', value: '15+' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Retrofit Now</h1>
        <p className="text-xl text-gray-600">Transforming real estate for a sustainable future</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-6">
            At Retrofit Now, we're on a mission to accelerate the transformation of real estate portfolios 
            through innovative technology and sustainable solutions. We believe that every building can be 
            a catalyst for positive environmental change.
          </p>
          <div className="flex items-center space-x-4">
            <Target className="h-8 w-8 text-emerald-600" />
            <span className="text-lg font-semibold">Driving sustainable transformation</span>
          </div>
        </motion.div>
        <motion.div 
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label} 
              className="bg-white rounded-xl shadow-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <p className="text-3xl font-bold text-emerald-600 mb-2">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div 
        className="bg-emerald-50 rounded-2xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
        <p className="text-xl text-gray-600 mb-8">
          Partner with us to transform your real estate portfolio and make a lasting impact
        </p>
        <Link
          to="/quick-check"
          className="bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-colors inline-block"
        >
          Get Started Today
        </Link>
      </motion.div>
    </div>
  );
};