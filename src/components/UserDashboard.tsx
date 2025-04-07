import React from 'react';
import { Building2, LineChart, User, CreditCard, Users, Wallet } from 'lucide-react';
import { Outlet, useLocation, Link } from 'react-router-dom';

export const UserDashboard = () => {
  const location = useLocation();

  const tabs = [
    { id: 'properties', label: 'Properties', icon: Building2, path: '/user-dashboard/properties' },
    { id: 'tenant-impact', label: 'Tenant Impact', icon: Users, path: '/user-dashboard/tenant-impact' },
    { id: 'contractor-financing', label: 'Contractors & Financing', icon: Wallet, path: '/user-dashboard/contractor-financing' },
    { id: 'billing', label: 'Billing', icon: CreditCard, path: '/user-dashboard/billing' },
    { id: 'profile', label: 'Profile', icon: User, path: '/user-dashboard/profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 h-16">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = location.pathname === tab.path;
              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  className={`flex items-center px-1 border-b-2 font-medium text-sm ${
                    isActive
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </div>
    </div>
  );
};