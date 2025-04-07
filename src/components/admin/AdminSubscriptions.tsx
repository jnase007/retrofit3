import React, { useState } from 'react';
import { DollarSign, AlertCircle } from 'lucide-react';

export const AdminSubscriptions = () => {
  // Sample subscription data
  const [subscriptions] = useState([
    {
      id: 1,
      email: 'john.smith@acme.com',
      full_name: 'John Smith',
      plan: 'pro',
      properties: [
        { square_footage: 2768591 },
        { square_footage: 1195000 },
      ],
      status: 'active',
    },
    {
      id: 2,
      email: 'sarah.jones@horizon.com',
      full_name: 'Sarah Jones',
      plan: 'enterprise',
      properties: [
        { square_footage: 4477800 },
        { square_footage: 4000000 },
      ],
      status: 'active',
    },
    {
      id: 3,
      email: 'mike.wilson@skyline.com',
      full_name: 'Mike Wilson',
      plan: 'starter',
      properties: [
        { square_footage: 500000 },
      ],
      status: 'past_due',
    },
  ]);

  // Calculate total MRR
  const mrr = subscriptions.reduce((acc, sub) => {
    const totalSqFt = sub.properties.reduce((sum, prop) => sum + prop.square_footage, 0);
    const rate = sub.plan === 'enterprise' ? 5 : sub.plan === 'pro' ? 3 : 1;
    return acc + (totalSqFt * rate / 12); // Convert annual to monthly
  }, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Subscriptions</h2>

      <div className="mb-8 bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <DollarSign className="h-8 w-8 text-emerald-600 mr-2" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Monthly Recurring Revenue</h3>
            <p className="text-3xl font-bold text-emerald-600">
              ${Math.round(mrr).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Sq Ft
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monthly Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscriptions.map((subscription) => {
              const totalSqFt = subscription.properties.reduce(
                (sum, prop) => sum + prop.square_footage,
                0
              );
              const rate = subscription.plan === 'enterprise' ? 5 : subscription.plan === 'pro' ? 3 : 1;
              const revenue = (totalSqFt * rate) / 12; // Convert annual to monthly

              return (
                <tr key={subscription.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {subscription.full_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {subscription.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      subscription.plan === 'enterprise'
                        ? 'bg-purple-100 text-purple-800'
                        : subscription.plan === 'pro'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {totalSqFt.toLocaleString()} sq ft
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${Math.round(revenue).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      subscription.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {subscription.status === 'active' ? 'Active' : 'Past Due'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};