import React, { useState } from 'react';
import { Building2, Plus, MapPin, AlertTriangle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Property {
  id: string;
  name: string;
  address: string;
  square_footage: number;
  building_type: string;
  compliance_score: number;
  estimated_savings: number;
  status: string;
  image_url?: string;
}

const DEFAULT_PROPERTY_IMAGE = 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//shutterstock_2605311213.jpg';

// Mock data for development
const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Empire State Building',
    address: '350 5th Ave, New York, NY 10118',
    square_footage: 2768591,
    building_type: 'office',
    compliance_score: 85,
    estimated_savings: 1500000,
    status: 'active',
    image_url: DEFAULT_PROPERTY_IMAGE,
  },
  {
    id: '2',
    name: 'Chrysler Building',
    address: '405 Lexington Ave, New York, NY 10174',
    square_footage: 1195000,
    building_type: 'office',
    compliance_score: 72,
    estimated_savings: 850000,
    status: 'active',
    image_url: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//shutterstock_2605313359.jpg',
  },
  {
    id: '3',
    name: 'One World Trade Center',
    address: '285 Fulton St, New York, NY 10007',
    square_footage: 3501274,
    building_type: 'office',
    compliance_score: 95,
    estimated_savings: 2100000,
    status: 'active',
    image_url: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//shutterstock_2605313405.jpg',
  },
];

export const Properties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    square_footage: '',
    building_type: '',
  });

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const newProperty: Property = {
        id: (properties.length + 1).toString(),
        name: formData.name,
        address: formData.address,
        square_footage: parseInt(formData.square_footage),
        building_type: formData.building_type,
        compliance_score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
        estimated_savings: Math.floor(Math.random() * 500000) + 500000, // Random savings between 500k-1M
        status: 'active',
        image_url: DEFAULT_PROPERTY_IMAGE,
      };

      setProperties([...properties, newProperty]);
      setShowAddModal(false);
      setFormData({ name: '', address: '', square_footage: '', building_type: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add property');
      console.error('Error adding property:', err);
    }
  };

  const handleSquareFootageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setFormData({ ...formData, square_footage: value });
  };

  const formattedSquareFootage = formData.square_footage ? formData.square_footage.toLocaleString() : '';

  const handleViewRetrofitOptions = () => {
    navigate('/retrofit', {
      state: {
        properties: properties.filter(p => p.compliance_score < 85),
        totalSquareFootage: properties.reduce((sum, p) => sum + p.square_footage, 0),
        averageCompliance: properties.reduce((sum, p) => sum + p.compliance_score, 0) / properties.length,
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const totalSquareFootage = properties.reduce((sum, p) => sum + p.square_footage, 0);
  const averageCompliance = properties.length 
    ? properties.reduce((sum, p) => sum + p.compliance_score, 0) / properties.length 
    : 0;
  const totalSavings = properties.reduce((sum, p) => sum + p.estimated_savings, 0);
  const propertiesBelowTarget = properties.filter(p => p.compliance_score < 85).length;

  return (
    <div className="space-y-8">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Building2 className="h-6 w-6 text-emerald-600" />
            <span className="text-2xl font-bold">{totalSquareFootage.toLocaleString()}</span>
          </div>
          <p className="text-gray-600">Total Square Footage</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Building2 className="h-6 w-6 text-emerald-600" />
            <span className="text-2xl font-bold">{Math.round(averageCompliance)}%</span>
          </div>
          <p className="text-gray-600">Average Compliance</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Building2 className="h-6 w-6 text-emerald-600" />
            <span className="text-2xl font-bold">${totalSavings.toLocaleString()}</span>
          </div>
          <p className="text-gray-600">Total Annual Savings</p>
        </div>
      </div>

      {/* Compliance Alert */}
      {propertiesBelowTarget > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
            <h3 className="text-lg font-semibold text-red-700">
              Compliance Alert: {propertiesBelowTarget} {propertiesBelowTarget === 1 ? 'Property' : 'Properties'} Below Target
            </h3>
          </div>
          <p className="text-red-600 mb-4">
            Some properties are at risk of non-compliance. Review and plan upgrades to meet requirements.
          </p>
          <button 
            onClick={handleViewRetrofitOptions}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            View Retrofit Options
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      )}

      {/* Properties List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Properties</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Property
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${property.image_url || DEFAULT_PROPERTY_IMAGE})` }}
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.address}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    property.compliance_score >= 90
                      ? 'bg-green-100 text-green-800'
                      : property.compliance_score >= 70
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {property.compliance_score}% Compliant
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    {property.square_footage.toLocaleString()} sq ft
                  </p>
                  <p className="text-sm text-emerald-600">
                    ${property.estimated_savings.toLocaleString()} annual savings
                  </p>
                  <p className="text-sm text-gray-600">
                    Status: {property.status}
                  </p>
                </div>

                <button 
                  onClick={() => navigate('/retrofit', { 
                    state: { 
                      property,
                      totalSquareFootage: property.square_footage,
                      averageCompliance: property.compliance_score,
                    }
                  })}
                  className="mt-4 w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Property Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Add New Property</h3>
            <form onSubmit={handleAddProperty} className="space-y-4">
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
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
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
                  Building Type
                </label>
                <select
                  value={formData.building_type}
                  onChange={(e) => setFormData({ ...formData, building_type: e.target.value })}
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

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                >
                  Add Property
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};