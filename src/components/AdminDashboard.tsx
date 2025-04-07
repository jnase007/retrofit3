import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Users, Building2, CreditCard, BarChart2, Settings } from 'lucide-react';
import { AdminUsers } from './admin/AdminUsers';
import { AdminProperties } from './admin/AdminProperties';
import { AdminSubscriptions } from './admin/AdminSubscriptions';
import { AdminAnalytics } from './admin/AdminAnalytics';
import { AdminSettings } from './admin/AdminSettings';

export const AdminDashboard = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: '/admin', icon: Users, label: 'Users' },
    { path: '/admin/properties', icon: Building2, label: 'Properties' },
    { path: '/admin/subscriptions', icon: CreditCard, label: 'Subscriptions' },
    { path: '/admin/analytics', icon: BarChart2, label: 'Analytics' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-blue-900 text-white w-64 flex-shrink-0 ${isMenuOpen ? '' : 'hidden'}`}>
        <div className="p-4">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
        </div>
        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 text-sm font-medium ${
                  isActive(item.path)
                    ? 'bg-blue-800 text-white'
                    : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Routes>
            <Route index element={<AdminUsers />} />
            <Route path="properties" element={<AdminProperties />} />
            <Route path="subscriptions" element={<AdminSubscriptions />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};