import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { getQuickAssessment } from '../lib/openai';

interface PropertyData {
  squareFootage: number;
  location: string;
}

const libraries: ("places")[] = ["places"];

export const QuickCheck = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PropertyData>({
    squareFootage: 0,
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

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
      const assessment = await getQuickAssessment({
        size: formData.squareFootage,
        location: formData.location,
      });

      // Navigate to results with the assessment data
      navigate('/quick-results', { state: { assessment } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while analyzing your property');
      console.error('Error getting assessment:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle square footage input with formatting
  const handleSquareFootageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any non-numeric characters
    const value = e.target.value.replace(/[^\d]/g, '');
    setFormData({ ...formData, squareFootage: Number(value) });
  };

  // Format the display value for square footage
  const formattedSquareFootage = formData.squareFootage ? formData.squareFootage.toLocaleString() : '';

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Quick Property Check</h1>
          <p className="text-xl text-gray-600">
            Get an instant assessment of your property's compliance risk and savings potential
          </p>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Size (sq ft)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={formattedSquareFootage}
                onChange={handleSquareFootageChange}
                placeholder="e.g., 50,000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Location
              </label>
              {isLoaded && (
                <Autocomplete
                  onLoad={onLoad}
                  onPlaceChanged={onPlaceChanged}
                >
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter property address"
                    required
                  />
                </Autocomplete>
              )}
            </div>

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
              className="w-full bg-emerald-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span>Analyzing...</span>
              ) : (
                <>
                  Check Your Property
                  <Building2 className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        <motion.div 
          className="mt-8 flex items-start p-4 bg-amber-50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-sm text-amber-700">
            This is a preliminary assessment based on typical rates and requirements. For the most accurate results, sign up to input detailed property information and get a comprehensive analysis.
          </p>
        </motion.div>
      </div>
    </div>
  );
};