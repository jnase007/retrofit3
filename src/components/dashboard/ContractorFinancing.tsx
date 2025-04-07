import React, { useState } from 'react';
import { Building2, Star, MapPin, DollarSign, Heart, Search, Filter, Clock, ArrowRight, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { contractors } from '../../data/contractors';
import { useNavigate } from 'react-router-dom';

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

export const ContractorFinancing = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('contractors');
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteContractors, setFavoriteContractors] = useState<string[]>([]);
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null);

  const filteredContractors = contractors.filter(contractor => 
    contractor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contractor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (contractorId: string) => {
    setFavoriteContractors(prev => 
      prev.includes(contractorId) 
        ? prev.filter(id => id !== contractorId)
        : [...prev, contractorId]
    );
  };

  const handleApplyClick = (loan: typeof loanOptions[0]) => {
    navigate('/financing', { 
      state: { 
        loanAmount: loan.amount.replace(/[^0-9]/g, ''),
        selectedPartner: loan.name
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('contractors')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'contractors'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Contractors
        </button>
        <button
          onClick={() => setActiveTab('financing')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'financing'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Financing
        </button>
      </div>

      {activeTab === 'contractors' ? (
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search contractors by name or specialty..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Contractors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredContractors.map((contractor) => (
              <motion.div
                key={contractor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{contractor.name}</h3>
                    <p className="text-emerald-600">{contractor.specialty}</p>
                  </div>
                  <button
                    onClick={() => toggleFavorite(contractor.id)}
                    className={`p-2 rounded-full ${
                      favoriteContractors.includes(contractor.id)
                        ? 'text-red-500 bg-red-50'
                        : 'text-gray-400 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-2 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 mr-2" />
                    <span>{contractor.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{contractor.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{contractor.completedProjects} projects completed</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Average bid: {contractor.bid}</span>
                  <span className="text-emerald-600">Typical savings: {contractor.savings}</span>
                </div>

                <button className="mt-4 w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                  Contact Contractor
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Financing Partners */}
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
                <button
                  onClick={() => handleApplyClick(loan)}
                  className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};