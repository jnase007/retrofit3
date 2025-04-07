import React, { useState } from 'react';
import { Check, Building2, TrendingUp, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { SignupModal } from './auth/SignupModal';

export const Pricing = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const tiers = [
    {
      name: 'Starter',
      price: '1',
      unit: 'per sq ft/year',
      monthlyEquiv: '($0.08/sq ft/month)',
      maxSize: '50,000 sq ft',
      description: 'Perfect for small property owners looking to start their compliance journey',
      features: [
        'Basic compliance monitoring',
        'Simple retrofit suggestions',
        'Energy usage tracking',
        'Basic reporting',
        'Email support',
        'Up to 3 properties',
      ],
      cta: 'Start Free Trial',
      ctaAction: () => setIsSignupModalOpen(true),
      icon: Shield,
      example: 'Example: 20,000 sq ft = $20K/year',
    },
    {
      name: 'Pro',
      price: '3',
      unit: 'per sq ft/year',
      monthlyEquiv: '($0.25/sq ft/month)',
      maxSize: '500,000 sq ft',
      description: 'For growing portfolios needing comprehensive solutions',
      features: [
        'Advanced compliance automation',
        'Full retrofit playbook',
        'Funding marketplace access',
        'Tenant impact analytics',
        'ROI calculator',
        'Priority support',
        'Up to 10 properties',
      ],
      cta: 'Start Free Trial',
      ctaAction: () => setIsSignupModalOpen(true),
      icon: TrendingUp,
      featured: true,
      example: 'Example: 100,000 sq ft = $300K/year',
    },
    {
      name: 'Enterprise',
      price: '5+',
      unit: 'per sq ft/year',
      customizable: true,
      description: 'Custom solutions for large portfolios and REITs',
      features: [
        'Unlimited properties',
        'Custom integrations',
        'AI-powered forecasting',
        'Portfolio-wide analytics',
        'Dedicated account manager',
        'Custom reporting',
        'API access',
      ],
      cta: 'Contact Sales',
      ctaAction: () => window.location.href = '/contact',
      icon: Building2,
      example: 'Example: 1M+ sq ft = Custom pricing',
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Avoid Costly Fines',
      description: 'Stay ahead of regulations and avoid penalties of up to $268 per sq ft',
    },
    {
      icon: TrendingUp,
      title: 'Increase Property Value',
      description: 'Sustainable buildings command 10% higher rental rates',
    },
    {
      icon: Users,
      title: 'Retain Tenants',
      description: '20% higher retention rate for green-certified buildings',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pricing That Pays For Itself
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our per-square-foot pricing scales with your portfolio. Avoid compliance fines while increasing property value and tenant satisfaction.
          </p>
        </motion.div>
      </div>

      {/* Value Props */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={benefit.title}
              className="bg-white rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <Icon className="h-8 w-8 text-emerald-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
              </div>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Free Trial Banner */}
      <motion.div
        className="bg-blue-900 rounded-2xl p-8 text-white text-center mb-16"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-4">Try RetrofitNow Risk-Free</h2>
        <p className="text-lg mb-6">Test any plan with one property for 14 days. No credit card required.</p>
        <button 
          onClick={() => setIsSignupModalOpen(true)}
          className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Start Your Free Trial
        </button>
      </motion.div>

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, index) => {
          const Icon = tier.icon;
          return (
            <motion.div
              key={tier.name}
              className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                tier.featured ? 'ring-2 ring-emerald-500' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {tier.featured && (
                <span className="absolute top-0 -translate-y-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              )}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                <Icon className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">${tier.price}</span>
                  <span className="ml-2 text-gray-600">{tier.unit}</span>
                </div>
                {tier.monthlyEquiv && (
                  <p className="text-sm text-gray-500 mt-1">{tier.monthlyEquiv}</p>
                )}
                {tier.maxSize && (
                  <p className="text-sm text-gray-500">Up to {tier.maxSize}</p>
                )}
                <p className="text-gray-600 mt-2">{tier.description}</p>
                {tier.example && (
                  <p className="text-sm text-emerald-600 font-semibold mt-2">{tier.example}</p>
                )}
              </div>
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={tier.ctaAction}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  tier.featured
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-blue-900 text-white hover:bg-blue-800'
                }`}
              >
                {tier.cta}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Why per square foot pricing?</h3>
            <p className="text-gray-600">
              Our pricing aligns with how you measure property value and operating costs. Larger properties get more value from our platform, so the pricing scales accordingly.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">What's included in the free trial?</h3>
            <p className="text-gray-600">
              You get full access to all features in your chosen plan for one property for 14 days. No credit card required to start.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I change plans later?</h3>
            <p className="text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. We'll prorate the difference.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Do you offer custom solutions?</h3>
            <p className="text-gray-600">
              Yes, our Enterprise plan can be customized to your specific portfolio needs. Contact our sales team to discuss.
            </p>
          </div>
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