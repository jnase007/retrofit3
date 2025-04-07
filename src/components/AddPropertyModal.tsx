import React, { useState, useCallback } from 'react';
import { X, Building2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { analyzePropertyData } from '../lib/propertyAnalysis';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPropertyAdded: () => void;
}

const libraries: ("places")[] = ["places"];

export const AddPropertyModal = ({ isOpen, onClose, onPropertyAdded }: AddPropertyModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    squareFootage: '',
    location: '',
    buildingAge: '',
    energyUse: '',
    propertyType: '',
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
        setFormData(prev => ({ 
          ...prev, 
          address: place.formatted_address,
          location: place.formatted_address 
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Get the current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw sessionError;
      if (!session) {
        throw new Error('Please sign in to add a property');
      }

      // Generate AI analysis based on basic inputs
      const analysis = await analyzePropertyData({
        squareFootage: Number(formData.squareFootage),
        location: formData.location,
        buildingAge: formData.buildingAge ? Number(formData.buildingAge) : undefined,
        energyUse: formData.energyUse ? Number(formData.energyUse) : undefined,
        propertyType: formData.propertyType,
      });

      // Create property record with analysis results
      const { data: property, error: propertyError } = await supabase
        .from('properties')
        .insert([
          {
            name: formData.name,
            address: formData.address,
            square_footage: Number(formData.squareFootage),
            location: formData.location,
            year_built: formData.buildingAge ? Number(formData.buildingAge) : null,
            energy_usage: formData.energyUse ? Number(formData.energyUse) : null,
            building_type: formData.propertyType,
            user_id: session.user.id,
            compliance_score: analysis.complianceScore,
            estimated_savings: analysis.estimatedSavings,
            retrofit_plan: analysis.retrofitPlan,
            tenant_impact: analysis.tenantImpact,
          },
        ])
        .select()
        .single();

      if (propertyError) throw propertyError;

      onPropertyAdded();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while adding the property');
      console.error('Error adding property:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle square footage input with formatting
  const handleSquareFootageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any non-numeric characters
    const value = e.target.value.replace(/[^\d]/g, '');
    setFormData({ ...formData, squareFootage: value });
  };

  // Format the display value for square footage
  const formattedSquareFootage = formData.squareFootage ? Number(formData.squareFootage).toLocaleString() : '';

  if (!isOpen) return null;

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <Building2 className="h-6 w-6 text-emerald-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Add New Property</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Name
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
                Location
              </label>
              {isLoaded && (
                <Autocomplete
                  onLoad={onLoad}
                  onPlaceChanged={onPlaceChanged}
                >
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </Autocomplete>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Square Footage
              </label>
              <input
                type="text"
                value={formattedSquareFootage}
                onChange={handleSquareFootageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., 50,000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
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
                <option value="residential">Residential</option>
                <option value="mixed-use">Mixed Use</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Building Age (Year Built)
              </label>
              <input
                type="number"
                value={formData.buildingAge}
                onChange={(e) => setFormData({ ...formData, buildingAge: e.target.value })}
                placeholder="Optional"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Energy Usage (kWh/year)
              </label>
              <input
                type="number"
                value={formData.energyUse}
                onChange={(e) => setFormData({ ...formData, energyUse: e.target.value })}
                placeholder="Optional"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white ${
                loading
                  ? 'bg-emerald-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {loading ? 'Adding Property...' : 'Add Property'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};