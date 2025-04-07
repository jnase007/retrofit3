import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DollarSign, Clock, AlertCircle, Building2, ArrowRight, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface FormData {
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  squareFootage: string;
  retrofitCost: string;
  loanAmount: string;
  message: string;
  timeline: string;
}

const loanOptions = [
  {
    id: 'petros',
    name: 'Petros PACE Finance',
    type: 'C-PACE',
    amount: '$1.5M',
    rate: '4%',
    term: '10-30 years',
    description: 'Industry leader in Commercial PACE financing with over $500M funded',
    url: 'https://petros-pace.com',
    logo: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//PetrosPace-logo.jpg',
    benefits: [
      'No upfront costs',
      'Non-recourse financing',
      'Stays with property if sold',
      'Tax-deductible payments'
    ],
    requirements: [
      'Property in PACE-enabled district',
      'Current on property taxes',
      'Energy savings verification'
    ]
  },
  {
    id: 'nuveen',
    name: 'Nuveen Green Capital',
    type: 'Green Loan',
    amount: '$2M',
    rate: '4.5%',
    term: '10-25 years',
    description: 'Over $1B in sustainable building retrofits funded',
    url: 'https://www.nuveen.com/greencapital',
    logo: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//nuveen.png',
    benefits: [
      'Flexible terms',
      'Quick approval process',
      'No prepayment penalties',
      'ESG reporting support'
    ],
    requirements: [
      'Minimum credit score',
      'Debt service coverage ratio > 1.2',
      'Energy audit required'
    ]
  },
  {
    id: 'nygreen',
    name: 'NY Green Bank',
    type: 'Green Loan',
    amount: '$1.5M',
    rate: '3.5%',
    term: 'Flexible',
    description: 'Specialized in NYC LL97 compliance with $1B+ funded',
    url: 'https://greenbank.ny.gov',
    logo: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//greenbank.png',
    benefits: [
      'LL97 compliance expertise',
      'Flexible loan structures',
      'Local market knowledge',
      'Public-private partnership'
    ],
    requirements: [
      'NY State property',
      'Energy reduction plan',
      'Financial statements'
    ]
  }
];

export const FinancingMarketplace = () => {
  const location = useLocation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    propertyId: '',
    squareFootage: location.state?.squareFootage || '',
    retrofitCost: location.state?.retrofitCost || '',
    loanAmount: location.state?.loanAmount || '',
    message: '',
    timeline: 'flexible'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Please sign in to submit a funding request');
      }

      const { error: insertError } = await supabase
        .from('loan_requests')
        .insert([{
          user_id: session.user.id,
          amount: parseFloat(formData.loanAmount),
          property_size: parseFloat(formData.squareFootage),
          retrofit_cost: parseFloat(formData.retrofitCost),
          timeline: formData.timeline,
          status: 'pending',
          created_at: new Date().toISOString()
        }]);

      if (insertError) throw insertError;

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyId: '',
        squareFootage: '',
        retrofitCost: '',
        loanAmount: '',
        message: '',
        timeline: 'flexible'
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit funding request');
    } finally {
      setLoading(false);
    }
  };

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
              Our Trusted Financial Partners
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              We've partnered with leading financial institutions to provide you with exclusive financing options for your retrofit projects
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Partners Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Exclusive Partner Network</h2>
              <p className="text-gray-600 mt-2">Pre-negotiated terms and streamlined approval process through our trusted partners</p>
            </div>
            <div className="flex items-center text-emerald-600">
              <Handshake className="h-6 w-6 mr-2" />
              <span className="font-semibold">Verified Partners</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loanOptions.map((loan, index) => (
              <motion.div
                key={loan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="h-12 mb-4">
                  <img 
                    src={loan.logo} 
                    alt={`${loan.name} Logo`}
                    className="h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{loan.name}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-emerald-600 mr-2" />
                    <span>Up to {loan.amount}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-emerald-600 mr-2" />
                    <span>{loan.term}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{loan.description}</p>
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Partner Benefits</h4>
                    <ul className="space-y-1">
                      {loan.benefits.map((benefit, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center">
                          <ArrowRight className="h-4 w-4 text-emerald-600 mr-2" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
                    <ul className="space-y-1">
                      {loan.requirements.map((req, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center">
                          <ArrowRight className="h-4 w-4 text-emerald-600 mr-2" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <a
                  href={loan.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Learn More
                </a>
                <button
                  onClick={() => {
                    const element = document.getElementById('financing-form');
                    element?.scrollIntoView({ behavior: 'smooth' });
                    setFormData(prev => ({
                      ...prev,
                      loanAmount: loan.amount.replace(/[^0-9]/g, ''),
                    }));
                  }}
                  className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Request Form */}
        <div id="financing-form" className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Connect with Our Partners</h2>
          <p className="text-gray-600 mb-6">Submit your project details and we'll match you with the best financing partner for your needs</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Size (sq ft)
                </label>
                <input
                  type="number"
                  value={formData.squareFootage}
                  onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Retrofit Cost ($)
                </label>
                <input
                  type="number"
                  value={formData.retrofitCost}
                  onChange={(e) => setFormData({ ...formData, retrofitCost: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount Needed ($)
                </label>
                <input
                  type="number"
                  value={formData.loanAmount}
                  onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="flexible">Flexible</option>
                  <option value="urgent">Urgent (Next 30 days)</option>
                  <option value="planned">Planned (Next 2-3 months)</option>
                  <option value="future">Future (3+ months)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Details (optional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Tell us about your retrofit project..."
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <Building2 className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-sm text-green-700">
                    Your funding request has been submitted! Our broker will connect you with the best partner within 24-48 hours.
                  </span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-emerald-600 text-white px-4 py-3 rounded-lg font-semibold ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-700'
              } transition-colors`}
            >
              {loading ? 'Submitting...' : 'Connect with Partners'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};