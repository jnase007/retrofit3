import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, TrendingUp, DollarSign, ArrowRight, Calendar, CheckCircle, Lightbulb, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { SignupModal } from './auth/SignupModal';

export const CaseStudies = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [expandedStory, setExpandedStory] = useState<string | null>(null);
  
  const caseStudies = [
    {
      company: 'Walmart',
      logo: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//Walmart-Logo.png',
      description: 'Retrofitted 1,500+ stores with LEDs, saving $100M/year—cut energy by 20%.',
      fullStory: {
        pilot: {
          year: 2005,
          location: 'McKinney, TX',
          details: 'Pilot store retrofitted with skylights, HVAC upgrades, and radiant floor heating, saving $500K annually.',
        },
        expansion: {
          year: 2015,
          details: 'Completed LED lighting retrofit across 1,300+ U.S. stores, replacing fluorescent fixtures.',
        },
        current: {
          achievement: 'Over 1.5 million LED fixtures installed across stores and warehouses by 2020.',
          impact: 'Energy use cut by 15-20% per store, with individual locations saving $1M+ annually.',
        },
      },
      withRetrofit: {
        playbook: 'Optimize $1.5M solar + HVAC plans for 500K sq ft warehouses with AI-driven $400K/year savings estimates',
        financing: 'Access $1M–$2M PACE loans for solar upgrades',
        contractor: 'Connect with SolarTech NYC for 50+ store retrofits',
      },
      metrics: {
        savings: '$100M annually',
        reduction: '20% energy reduction',
        roi: '2.5 years payback',
      },
      image: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//walmart_shutterstock_2461612733.jpg',
      source: 'RMI\'s "Deep Building Retrofits" (2011), Walmart Sustainability Reports (2015–2020)',
    },
    {
      company: 'McDonald\'s',
      logo: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//mcdonalds-1968-logo.png',
      description: '500+ green retrofits—$15M saved yearly with HVAC and solar—36% less energy.',
      fullStory: {
        pilot: {
          year: 2018,
          location: 'Chicago, IL',
          details: 'Flagship location retrofitted with LED lighting, energy-efficient HVAC, solar panels, and water-saving fixtures, saving $50K annually.',
        },
        expansion: {
          year: 2021,
          details: 'Orlando pilot location (10,000 sq ft) achieved 25% energy reduction, saving $30K/year.',
        },
        current: {
          achievement: 'Expanded to 500+ U.S. locations with HVAC upgrades and smart controls',
          impact: 'Total portfolio savings of $15M/year plus $10M in reduced maintenance costs.',
        },
      },
      withRetrofit: {
        playbook: 'Plan HVAC + solar upgrades for 14,000 U.S. stores with $500K retrofit, $150K savings per location',
        financing: 'Access $1M Green Loans for 100-store rollout',
        contractor: 'Connect with GreenInsulate for 50-location Midwest expansion',
      },
      metrics: {
        savings: '$15M annually',
        reduction: '36% energy reduction',
        roi: '3.2 years payback',
      },
      image: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//MCdonalds_shutterstock_2605229607.jpg',
      source: 'McDonald\'s Sustainability Reports (2019–2023), JLL\'s "Sustainable Retrofitting" (2023)',
    },
    {
      company: 'Empire State Realty Trust',
      logo: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//empiresb-logo-black.jpg',
      description: 'Empire State Building + 10M sq ft retrofitted—$11M/year saved—38% energy cut.',
      fullStory: {
        pilot: {
          year: 2009,
          location: 'Empire State Building, NYC',
          details: '2.8M sq ft landmark retrofit including 6,514 window refurbishments, LED lighting, chiller plant optimization, and tenant energy management systems.',
        },
        expansion: {
          year: 2020,
          details: 'Extended retrofits to 10M sq ft NYC portfolio, including 250 West 57th St.',
        },
        current: {
          achievement: 'Empire State Building achieved 38% energy reduction',
          impact: 'Portfolio-wide savings of $11M/year across 10M sq ft ($1.10/sq ft annually).',
        },
      },
      withRetrofit: {
        playbook: 'Assess $10M upgrades across portfolio with AI-driven recommendations',
        financing: 'Secure C-PACE financing for major renovations',
        contractor: 'Partner with Smart Building Systems for integrated solutions',
      },
      metrics: {
        savings: '$11M annually',
        reduction: '38% energy reduction',
        roi: '3.5 years payback',
      },
      image: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//EmpireState_shutterstock_2593903863.jpg',
      source: 'RMI\'s "Deep Building Retrofits" (2011), ESRT Sustainability Reports (2011–2023)',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h1>
        <p className="text-xl text-gray-600">Real results from industry leaders</p>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-16">
        {caseStudies.map((study, index) => (
          <motion.div
            key={study.company}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8">
                <div className="h-12 mb-6">
                  <img 
                    src={study.logo} 
                    alt={`${study.company} Logo`} 
                    className="h-full object-contain"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{study.company}</h3>
                <p className="text-gray-600 mb-4">{study.description}</p>
                
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-emerald-50 rounded-lg p-4 text-center">
                    <DollarSign className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Savings</p>
                    <p className="font-semibold text-emerald-700">{study.metrics.savings}</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-4 text-center">
                    <TrendingUp className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Reduction</p>
                    <p className="font-semibold text-emerald-700">{study.metrics.reduction}</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-4 text-center">
                    <Building2 className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">ROI</p>
                    <p className="font-semibold text-emerald-700">{study.metrics.roi}</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-emerald-600 mr-2" />
                    <h4 className="font-semibold text-gray-900">Project Timeline</h4>
                  </div>
                  <div className="space-y-3 pl-7">
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">{study.fullStory.pilot.year}:</span> {study.fullStory.pilot.details}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">{study.fullStory.expansion.year}:</span> {study.fullStory.expansion.details}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-emerald-700 font-medium">
                        Current Impact: {study.fullStory.current.impact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* RetrofitNow Integration */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-2">
                    <Lightbulb className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="font-semibold text-gray-900">RetrofitNow Solution</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-1 mr-2" />
                      <p className="text-sm">{study.withRetrofit.playbook}</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-1 mr-2" />
                      <p className="text-sm">{study.withRetrofit.financing}</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-1 mr-2" />
                      <p className="text-sm">{study.withRetrofit.contractor}</p>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  Source: {study.source}
                </div>
              </div>
              <div 
                className="h-full min-h-[300px] bg-cover bg-center"
                style={{ backgroundImage: `url(${study.image})` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-emerald-50 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Write Your Success Story?</h2>
        <p className="text-xl text-gray-600 mb-8">Join these industry leaders in transforming their real estate portfolios</p>
        <button 
          onClick={() => setIsSignupModalOpen(true)}
          className="bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center"
        >
          Start Your Transformation
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
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