import React, { useState, useEffect } from 'react';
import { AlertCircle, Check, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export const AdminUsers = () => {
  // Sample user data
  const [users] = useState([
    {
      id: '1',
      email: 'john.smith@acme.com',
      full_name: 'John Smith',
      company_name: 'Acme Properties',
      created_at: '2025-01-15',
      is_active: true,
      subscriptions: [{ status: 'active', price_id: 'pro' }],
      properties: [{ count: 3 }],
    },
    {
      id: '2',
      email: 'sarah.jones@horizon.com',
      full_name: 'Sarah Jones',
      company_name: 'Horizon REIT',
      created_at: '2025-02-01',
      is_active: true,
      subscriptions: [{ status: 'active', price_id: 'enterprise' }],
      properties: [{ count: 12 }],
    },
    {
      id: '3',
      email: 'mike.wilson@skyline.com',
      full_name: 'Mike Wilson',
      company_name: 'Skyline Investments',
      created_at: '2025-02-15',
      is_active: false,
      subscriptions: [{ status: 'canceled', price_id: 'starter' }],
      properties: [{ count: 1 }],
    },
    {
      id: '4',
      email: 'lisa.chen@peak.com',
      full_name: 'Lisa Chen',
      company_name: 'Peak Properties',
      created_at: '2025-03-01',
      is_active: true,
      subscriptions: [{ status: 'active', price_id: 'pro' }],
      properties: [{ count: 5 }],
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (userId: string, isActive: boolean) => {
    try {
      setError(null);
      // In a real app, this would update the user status in the database
      console.log('Updating user status:', userId, !isActive);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user status');
      console.error('Error updating user status:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Users</h2>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Properties
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                  <div className="text-xs text-gray-500">{user.company_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.subscriptions?.[0]?.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.subscriptions?.[0]?.status === 'active' 
                      ? user.subscriptions[0].price_id.charAt(0).toUpperCase() + user.subscriptions[0].price_id.slice(1)
                      : 'No Plan'
                    }
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.properties?.[0]?.count || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleStatusChange(user.id, user.is_active)}
                    className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                      user.is_active
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {user.is_active ? (
                      <X className="h-4 w-4 mr-1" />
                    ) : (
                      <Check className="h-4 w-4 mr-1" />
                    )}
                    {user.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};