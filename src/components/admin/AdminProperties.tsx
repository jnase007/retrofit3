import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

export const AdminProperties = () => {
  // Sample property data
  const [properties] = useState([
    {
      id: 1,
      name: 'Empire State Building',
      users: { email: 'john.smith@acme.com' },
      address: '350 5th Ave, New York, NY 10118',
      location: 'New York City',
      square_footage: 2768591,
      building_type: 'Office',
      year_built: 1931,
      compliance_score: 85,
      energy_usage: -12.5,
    },
    {
      id: 2,
      name: 'Chrysler Building',
      users: { email: 'john.smith@acme.com' },
      address: '405 Lexington Ave, New York, NY 10174',
      location: 'New York City',
      square_footage: 1195000,
      building_type: 'Office',
      year_built: 1930,
      compliance_score: 72,
      energy_usage: -8.3,
    },
    {
      id: 3,
      name: 'Willis Tower',
      users: { email: 'sarah.jones@horizon.com' },
      address: '233 S Wacker Dr, Chicago, IL 60606',
      location: 'Chicago',
      square_footage: 4477800,
      building_type: 'Office',
      year_built: 1974,
      compliance_score: 91,
      energy_usage: -15.7,
    },
    {
      id: 4,
      name: 'Merchandise Mart',
      users: { email: 'sarah.jones@horizon.com' },
      address: '222 W Merchandise Mart Plaza, Chicago, IL 60654',
      location: 'Chicago',
      square_footage: 4000000,
      building_type: 'Mixed Use',
      year_built: 1930,
      compliance_score: 88,
      energy_usage: -10.2,
    },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Properties</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Compliance
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map((property) => (
              <tr key={property.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{property.name}</div>
                  <div className="text-xs text-gray-500">{property.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{property.users.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{property.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {property.square_footage.toLocaleString()} sq ft
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{property.building_type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    property.compliance_score >= 90
                      ? 'bg-green-100 text-green-800'
                      : property.compliance_score >= 70
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {property.compliance_score}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};