import React from 'react';
import { Building2, DollarSign, TrendingUp, ArrowRight, Handshake, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Partnerships = () => {
  const partners = [
    {
      name: 'Rudin Management',
      logo: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//rundin.png',
      description: 'Retrofitted Empire State Building, $4.4M saved annually',
      commission: '1%',
      benefits: [
        'Early access to new features',
        'Co-marketing opportunities',
        'Dedicated account manager',
        'Priority support'
      ]
    },
    {
      name: 'Petros PACE Finance',
      logo: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//PetrosPace-logo.jpg',
      description: '$500M+ funded in C-PACE financing',
      commission: '3%',
      benefits: [
        'Streamlined loan processing',
        'Joint marketing campaigns',
        'Custom reporting dashboard',
        'Strategic planning sessions'
      ]
    },
    {
      name: 'JLL',
      logo: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//JLL.png',
      description: 'Sustainability leader, $15M saved through retrofits',
      commission: '3%',
      benefits: [
        'Exclusive market insights',
        'Joint webinars and events',
        'Custom integration options',
        'Quarterly strategy reviews'
      ]
    }
  ];

  const tiers = [
    {
      name: 'Feedback Partner',
      commission: '1%',
      description: 'Perfect for property owners and managers looking to shape the future of building sustainability',
      benefits: [
        'Early access to new features',
        'Influence product roadmap',
        'Recognition on website',
        'Partner newsletter'
      ]
    },
    {
      name: 'Strategic Partner',
      commission: '3%',
      description: 'Ideal for financial institutions, consultants, and industry leaders driving sustainable transformation',
      benefits: [
        'Co-marketing opportunities',
        'API access',
        'Custom integrations',
        'Joint case studies',
        'Dedicated account team',
        'Quarterly business reviews'
      ]
    }
  ];

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
              Partner with RetrofitNow
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Join leading organizations in accelerating the sustainable transformation of real estate
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Current Partners */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Partners</h2>
            <p className="text-xl text-gray-600 mt-4">
              Trusted by industry leaders in real estate and sustainable finance
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
                <p className="text-gray-600 text-center mb-4">
                  {partner.description}
                </p>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign className="h-5 w-5 text-emerald-600 mr-1" />
                    <span className="font-semibold text-emerald-600">{partner.commission} Commission</span>
                  </div>
                  <ul className="space-y-2">
                    {partner.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-600">
                        <ArrowRight className="h-4 w-4 text-emerald-600 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partnership Tiers */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Partnership Opportunities</h2>
            <p className="text-xl text-gray-600 mt-4">
              Choose the partnership tier that best fits your organization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                  <span className="text-2xl font-bold text-emerald-600">{tier.commission}</span>
                </div>
                <p className="text-gray-600 mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="block w-full text-center bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Apply Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-emerald-50 rounded-2xl p-8 text-center">
          <div className="max-w-3xl mx-auto">
            <Handshake className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Real Estate Together?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join our partner network and help accelerate the sustainable transformation of real estate
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};