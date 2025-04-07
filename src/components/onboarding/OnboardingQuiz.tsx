import React, { useState } from 'react';
import { Building2, DollarSign, AlertTriangle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';

interface FormData {
  size: string;
  location: string;
  highCosts: string;
  fines: string;
  retrofitType: string;
}

export const OnboardingQuiz = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    size: '',
    location: '',
    highCosts: '',
    fines: '',
    retrofitType: '',
  });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const locations = [
    { value: 'NYC', label: 'New York City' },
    { value: 'LA', label: 'Los Angeles' },
    { value: 'CHI', label: 'Chicago' },
    { value: 'BOS', label: 'Boston' },
    { value: 'SF', label: 'San Francisco' },
  ];

  const retrofitTypes = [
    { value: 'solar', label: 'Solar Installation' },
    { value: 'hvac', label: 'HVAC Optimization' },
    { value: 'windows', label: 'Window Retrofits' },
    { value: 'insulation', label: 'Building Insulation' },
    { value: 'lighting', label: 'LED Lighting' },
  ];

  const calculateScore = () => {
    let score = 0;
    
    // Size scoring
    const size = parseInt(formData.size);
    if (size > 50000) score += 30;
    else if (size > 25000) score += 20;
    else if (size > 10000) score += 10;

    // Location scoring (areas with strict regulations)
    if (['NYC', 'BOS', 'SF'].includes(formData.location)) score += 20;
    
    // Cost and compliance scoring
    if (formData.highCosts === 'yes') score += 20;
    if (formData.fines === 'yes') score += 30;

    return score;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const score = calculateScore();
      const savings = Math.round((parseInt(formData.size) * 15) / 1000) * 1000; // Rough estimate
      const message = score > 50 
        ? `Your ${formData.size.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} sq ft property is a perfect fit! Estimated annual savings: $${savings.toLocaleString()}`
        : 'While your property may benefit from some improvements, schedule a consultation to explore the best options.';

      // Save lead to Supabase
      const { error: dbError } = await supabase
        .from('leads')
        .insert([{
          quiz_data: formData,
          score,
          estimated_savings: savings,
          source: 'onboarding_quiz'
        }]);

      if (dbError) throw dbError;

      setResult(message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error submitting quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-900">Property Size</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What's your property size in square feet?
              </label>
              <input
                type="number"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g., 50000"
                required
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-900">Location</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Where is your property located?
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              >
                <option value="">Select location...</option>
                {locations.map(loc => (
                  <option key={loc.value} value={loc.value}>{loc.label}</option>
                ))}
              </select>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-900">Energy Costs</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Are your energy costs higher than industry average?
              </label>
              <div className="space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="yes"
                    checked={formData.highCosts === 'yes'}
                    onChange={(e) => setFormData({ ...formData, highCosts: e.target.value })}
                    className="form-radio text-emerald-600"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="no"
                    checked={formData.highCosts === 'no'}
                    onChange={(e) => setFormData({ ...formData, highCosts: e.target.value })}
                    className="form-radio text-emerald-600"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-900">Compliance</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Are you facing or expecting compliance fines?
              </label>
              <div className="space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="yes"
                    checked={formData.fines === 'yes'}
                    onChange={(e) => setFormData({ ...formData, fines: e.target.value })}
                    className="form-radio text-emerald-600"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="no"
                    checked={formData.fines === 'no'}
                    onChange={(e) => setFormData({ ...formData, fines: e.target.value })}
                    className="form-radio text-emerald-600"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-900">Retrofit Interest</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Which retrofit type interests you most?
              </label>
              <select
                value={formData.retrofitType}
                onChange={(e) => setFormData({ ...formData, retrofitType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              >
                <option value="">Select type...</option>
                {retrofitTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8 text-center">
          <Building2 className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Does Your Building Need a Retrofit?
          </h1>
          <p className="text-gray-600">
            Answer 5 quick questions to see if your property is a good fit for energy improvements
          </p>
        </div>

        {!result ? (
          <>
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-full mx-1 rounded ${
                      i + 1 <= step ? 'bg-emerald-600' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-center text-gray-600">
                Step {step} of 5
              </p>
            </div>

            {renderStep()}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => {
                  if (step === 5) {
                    handleSubmit();
                  } else {
                    setStep(step + 1);
                  }
                }}
                disabled={loading}
                className="ml-auto px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === 5 ? (loading ? 'Analyzing...' : 'Get Results') : 'Next'}
              </button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <DollarSign className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analysis Complete!</h2>
            <p className="text-lg text-gray-700 mb-6">{result}</p>
            <div className="space-y-4">
              <a
                href="/signup"
                className="block w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Start Saving Now
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </a>
              <button
                onClick={() => {
                  setStep(1);
                  setResult(null);
                  setFormData({
                    size: '',
                    location: '',
                    highCosts: '',
                    fines: '',
                    retrofitType: '',
                  });
                }}
                className="block w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Start Over
              </button>
            </div>
          </motion.div>
        )}

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};