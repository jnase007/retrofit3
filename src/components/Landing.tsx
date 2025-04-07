import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Shield, LineChart, Users, Wallet, Plus, ArrowRight, DollarSign, TrendingUp, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignupModal } from './auth/SignupModal';

export const Landing = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [currentCaseStudyIndex, setCurrentCaseStudyIndex] = useState(0);
  
  const partners = [
    {
      name: 'Rudin Management',
      logo: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//rundin.png',
      description: 'Retrofitted Empire State Building, $4.4M saved annually',
    },
    {
      name: 'Petros PACE Finance',
      logo: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//PetrosPace-logo.jpg',
      description: '$500M+ funded in C-PACE financing',
    },
    {
      name: 'JLL',
      logo: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//JLL.png',
      description: 'Sustainability leader, $15M saved through retrofits',
    },
  ];

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
      icon: LineChart,
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

  const caseStudies = [
    {
      company: 'Walmart',
      logo: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//Walmart-Logo.png',
      description: 'Retrofitted 1,500+ stores with LEDs, saving $100M/year—cut energy by 20%.',
      image: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//walmart_shutterstock_2461612733.jpg',
      metrics: {
        savings: '$100M annually',
        reduction: '20% energy reduction',
        roi: '2.5 years payback',
      },
    },
    {
      company: 'McDonald\'s',
      logo: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//mcdonalds-1968-logo.png',
      description: '500+ green retrofits—$15M saved yearly with HVAC and solar—36% less energy.',
      image: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//MCdonalds_shutterstock_2605229607.jpg',
      metrics: {
        savings: '$15M annually',
        reduction: '36% energy reduction',
        roi: '3.2 years payback',
      },
    },
    {
      company: 'Empire State Realty Trust',
      logo: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//empiresb-logo-black.jpg',
      description: 'Empire State Building + 10M sq ft retrofitted—$11M/year saved—38% energy cut.',
      image: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//EmpireState_shutterstock_2593903863.jpg',
      metrics: {
        savings: '$11M annually',
        reduction: '38% energy reduction',
        roi: '3.5 years payback',
      },
    },
  ];

  // Auto-rotate case studies
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCaseStudyIndex((prevIndex) => 
        prevIndex === caseStudies.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextCaseStudy = () => {
    setCurrentCaseStudyIndex((prevIndex) => 
      prevIndex === caseStudies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevCaseStudy = () => {
    setCurrentCaseStudyIndex((prevIndex) => 
      prevIndex === 0 ? caseStudies.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-primary text-white relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000)',
            backgroundBlendMode: 'soft-light',
            filter: 'contrast(1.1) brightness(0.9)'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/70 to-primary-light/60" />
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <motion.div 
            className="text-center"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Portfolio:
              <br />
              <span className="text-emerald-400">Comply, Retrofit, Profit</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              One platform to turn sustainability into profit—comply with regulations, fund retrofits, and win tenants, effortlessly.
            </p>
            <Link
              to="/quick-check"
              className="btn-secondary text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all"
            >
              See Your ROI in 30 Seconds
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Quick Value Props */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-4xl font-bold text-primary mb-2">30 Seconds</p>
              <p className="text-gray-600">to check your compliance risk</p>
            </motion.div>
            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-4xl font-bold text-primary mb-2">$0</p>
              <p className="text-gray-600">cost to get started</p>
            </motion.div>
            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-4xl font-bold text-primary mb-2">AI-Powered</p>
              <p className="text-gray-600">retrofit recommendations</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Case Studies Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how leading companies are transforming their properties
            </p>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCaseStudyIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8">
                    <div className="h-12 mb-6">
                      <img 
                        src={caseStudies[currentCaseStudyIndex].logo} 
                        alt={`${caseStudies[currentCaseStudyIndex].company} Logo`}
                        className="h-full object-contain"
                      />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      {caseStudies[currentCaseStudyIndex].company}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {caseStudies[currentCaseStudyIndex].description}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-emerald-50 rounded-lg p-4 text-center">
                        <DollarSign className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Savings</p>
                        <p className="font-semibold text-emerald-700">
                          {caseStudies[currentCaseStudyIndex].metrics.savings}
                        </p>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-4 text-center">
                        <TrendingUp className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Reduction</p>
                        <p className="font-semibold text-emerald-700">
                          {caseStudies[currentCaseStudyIndex].metrics.reduction}
                        </p>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-4 text-center">
                        <Clock className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">ROI</p>
                        <p className="font-semibold text-emerald-700">
                          {caseStudies[currentCaseStudyIndex].metrics.roi}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div 
                    className="h-full min-h-[300px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${caseStudies[currentCaseStudyIndex].image})` }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevCaseStudy}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextCaseStudy}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {caseStudies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCaseStudyIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentCaseStudyIndex ? 'bg-emerald-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/case-studies"
              className="inline-flex items-center bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              View All Case Studies
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-600 mt-4">
              Join leading property owners and financial partners in creating a sustainable future
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="h-16 mb-4">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} Logo`}
                    className="h-full object-contain mx-auto"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                  {partner.name}
                </h3>
                <p className="text-gray-600 text-center">
                  {partner.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive tools for sustainable property management
            </p>
          </motion.div>

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
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                  <ul className="space-y-2 mt-4">
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
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white relative overflow-hidden py-24">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1577743401035-6d49a8a126e0?auto=format&fit=crop&q=80&w=2000)',
            backgroundBlendMode: 'soft-light',
            filter: 'contrast(1.1) brightness(0.9)'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-light/60" />
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Portfolio?
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Join leading property owners in creating a sustainable future
            </p>
            <Link
              to="/quick-check"
              className="btn-secondary text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all"
            >
              Get Started Free
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

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};