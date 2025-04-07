import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Building2, Star, Phone, Mail, MapPin, CheckCircle, AlertCircle, Search, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { contractors, specialties, Contractor } from '../data/contractors';

export const ContractorMarketplace = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    timeline: 'flexible',
    retrofitPlan: location.state?.retrofitPlan || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const filteredContractors = contractors.filter(contractor => {
    const matchesSearch = searchQuery === '' || 
      contractor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contractor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contractor.certifications.some(cert => cert.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSpecialty = selectedSpecialty === '' || contractor.specialty === selectedSpecialty;

    return matchesSearch && matchesSpecialty;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContractor) return;

    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Please sign in to submit a request');
      }

      const { error: requestError } = await supabase
        .from('contractor_requests')
        .insert([{
          user_id: session.user.id,
          contractor_id: selectedContractor.id,
          message: formData.message,
          timeline: formData.timeline,
          retrofit_plan: formData.retrofitPlan,
          status: 'pending',
        }]);

      if (requestError) throw requestError;

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        timeline: 'flexible',
        retrofitPlan: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  const handleFinancingClick = () => {
    navigate('/financing', { 
      state: { 
        retrofitPlan: formData.retrofitPlan,
        contractor: selectedContractor?.name,
        estimatedCost: selectedContractor?.bid
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              Find Your Retrofit Partner
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Connect with certified contractors specializing in sustainable building upgrades
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Contractors
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, specialty, or certification..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Specialty
              </label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">All Specialties</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contractor List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {filteredContractors.length} Contractors Available
            </h2>
            
            {filteredContractors.map((contractor, index) => (
              <motion.div
                key={contractor.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-shadow hover:shadow-xl ${
                  selectedContractor?.id === contractor.id ? 'ring-2 ring-emerald-500' : ''
                }`}
                onClick={() => setSelectedContractor(contractor)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{contractor.name}</h3>
                    <p className="text-emerald-600 font-medium">{contractor.specialty}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="font-semibold">{contractor.rating}</span>
                  </div>
                </div>

                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                    <span>{contractor.completedProjects} projects completed</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <span>Typical timeline: {contractor.timeline}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{contractor.location}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-emerald-600 mr-2" />
                    <span>Average bid: {contractor.bid}</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-emerald-600 mr-2" />
                    <span>Typical savings: {contractor.savings}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {contractor.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="px-2 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredContractors.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No contractors found matching your criteria</p>
              </div>
            )}
          </div>

          {/* Request Form */}
          <div className="lg:sticky lg:top-24" style={{ height: 'fit-content', maxHeight: 'calc(100vh - 8rem)' }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 overflow-y-auto"
              style={{ maxHeight: 'calc(100vh - 8rem)' }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Request a Quote</h2>

              {!selectedContractor ? (
                <div className="text-center py-8 text-gray-500">
                  <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>Select a contractor to request a quote</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Selected Contractor
                    </label>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-medium text-gray-900">{selectedContractor.name}</div>
                      <div className="text-gray-600">{selectedContractor.specialty}</div>
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          <span>{selectedContractor.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-gray-400 mr-2" />
                          <span>{selectedContractor.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Describe your project and requirements..."
                      required
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

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-emerald-600 text-white px-4 py-3 rounded-lg font-semibold ${
                      loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-700'
                    } transition-colors`}
                  >
                    {loading ? 'Sending Request...' : 'Request Quote'}
                  </button>

                  <button
                    type="button"
                    onClick={handleFinancingClick}
                    className="w-full bg-blue-900 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                  >
                    Fund Your Retrofit
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {submitted && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-xl shadow-xl max-w-md mx-4"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Request Submitted</h3>
            <p className="text-gray-600 mb-6">
              We'll connect you with {selectedContractor?.name} within 24 hours to discuss your project.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setSelectedContractor(null);
                }}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};