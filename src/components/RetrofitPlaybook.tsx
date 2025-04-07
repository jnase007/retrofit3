import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, AlertTriangle, LineChart, TrendingUp, DollarSign, CheckCircle, Search, Shield, Award, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { getRetrofitRecommendations } from '../lib/openai';

interface RetrofitRecommendation {
  title: string;
  description: string;
  estimatedCost: number;
  estimatedSavings: number;
  paybackPeriod: number;
  co2Reduction: number;
  priority?: 'high' | 'medium' | 'low'; // Make priority optional
}

interface RetrofitParams {
  size: number;
  location: string;
  buildingAge?: number;
  energyUse?: number;
  propertyType: string;
  budget: number;
  occupancyRate?: number;
  operatingHours?: string;
}

const libraries: ("places")[] = ["places"];

export const RetrofitPlaybook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RetrofitParams>({
    size: 0,
    location: '',
    buildingAge: undefined,
    energyUse: undefined,
    propertyType: '',
    budget: 1000000,
    occupancyRate: undefined,
    operatingHours: undefined,
  });

  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  }, []);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        setFormData(prev => ({ ...prev, location: place.formatted_address }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await getRetrofitRecommendations(formData);
      setRecommendations(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching recommendations');
      console.error('Error fetching recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSquareFootageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setFormData({ ...formData, size: parseInt(value) || 0 });
  };

  const formattedSquareFootage = formData.size ? formData.size.toLocaleString() : '';

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

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
              AI-Powered Retrofit Playbook
            </h1>
            <p className="text-xl text-gray-200">
              Get customized recommendations to optimize your building's performance
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Size (sq ft)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formattedSquareFootage}
                    onChange={handleSquareFootageChange}
                    placeholder="e.g., 50,000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Building Type
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select type...</option>
                    <option value="office">Office</option>
                    <option value="retail">Retail</option>
                    <option value="industrial">Industrial</option>
                    <option value="multifamily">Multifamily</option>
                    <option value="mixed-use">Mixed Use</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  {isLoaded && (
                    <Autocomplete
                      onLoad={onLoad}
                      onPlaceChanged={onPlaceChanged}
                    >
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Enter property address"
                        required
                      />
                    </Autocomplete>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Building Age (Year Built)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.buildingAge}
                    onChange={(e) => setFormData({ ...formData, buildingAge: parseInt(e.target.value) })}
                    placeholder="e.g., 1990"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range: ${formData.budget.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="100000"
                  max="5000000"
                  step="100000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
              </button>

              {showAdvanced && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Energy Usage (kWh/year)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={formData.energyUse}
                      onChange={(e) => setFormData({ ...formData, energyUse: parseInt(e.target.value) })}
                      placeholder="Optional"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Occupancy Rate (%)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={formData.occupancyRate}
                      onChange={(e) => setFormData({ ...formData, occupancyRate: parseInt(e.target.value) })}
                      placeholder="e.g., 90"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Operating Hours
                    </label>
                    <select
                      value={formData.operatingHours}
                      onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select hours...</option>
                      <option value="24/7">24/7</option>
                      <option value="standard">Standard (9am-5pm)</option>
                      <option value="extended">Extended (7am-10pm)</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
                    <span className="text-sm text-red-700">{error}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-emerald-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center`}
              >
                {loading ? (
                  <span>Analyzing...</span>
                ) : (
                  <>
                    Generate AI Recommendations
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results or Benefits */}
          {recommendations.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {recommendations.map((recommendation, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{recommendation.title}</h3>
                    {recommendation.priority && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        recommendation.priority === 'high' 
                          ? 'bg-red-100 text-red-800'
                          : recommendation.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} Priority
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4">{recommendation.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Estimated Cost</p>
                      <p className="text-lg font-semibold text-gray-900">${recommendation.estimatedCost.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Annual Savings</p>
                      <p className="text-lg font-semibold text-emerald-600">
                        ${recommendation.estimatedSavings.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payback Period</p>
                      <p className="text-lg font-semibold text-gray-900">{recommendation.paybackPeriod} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">CO2 Reduction</p>
                      <p className="text-lg font-semibold text-gray-900">{recommendation.co2Reduction} tons/year</p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => navigate('/contractors', { state: { recommendation } })}
                      className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                    >
                      Find Contractors
                    </button>
                    <button
                      onClick={() => navigate('/financing', { state: { recommendation } })}
                      className="flex-1 bg-blue-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                    >
                      Explore Financing
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="text-center mb-8">
                <Building2 className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Optimize Your Building's Performance
                </h2>
                <p className="text-gray-600">
                  Get AI-powered recommendations for energy efficiency and sustainability
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center p-4 bg-emerald-50 rounded-lg">
                  <Shield className="h-8 w-8 text-emerald-600 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Smart Recommendations</h3>
                    <p className="text-sm text-gray-600">Tailored to your building's characteristics</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-emerald-50 rounded-lg">
                  <LineChart className="h-8 w-8 text-emerald-600 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900">ROI Analysis</h3>
                    <p className="text-sm text-gray-600">Clear cost and savings projections</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-emerald-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-emerald-600 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Performance Tracking</h3>
                    <p className="text-sm text-gray-600">Monitor improvements and savings</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-800">
                  <strong>Pro Tip:</strong> Add your current energy usage data for more accurate recommendations and savings projections.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};