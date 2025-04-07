import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { AlertCircle, TrendingUp, Users, Building2 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const AdminAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState({
    userGrowth: {
      labels: [] as string[],
      datasets: [{
        label: 'New Users',
        data: [] as number[],
        borderColor: '#10B981',
        tension: 0.4,
      }],
    },
    propertyTypes: {
      labels: [] as string[],
      datasets: [{
        label: 'Number of Properties',
        data: [] as number[],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',  // Emerald
          'rgba(59, 130, 246, 0.7)',  // Blue
          'rgba(245, 158, 11, 0.7)',  // Amber
          'rgba(239, 68, 68, 0.7)',   // Red
        ],
      }],
    },
    metrics: {
      totalUsers: 0,
      totalProperties: 0,
      avgComplianceScore: 0,
      totalSquareFootage: 0,
    },
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch users data with created_at dates
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('created_at, id')
        .order('created_at');

      if (usersError) throw usersError;

      // Fetch properties data
      const { data: properties, error: propertiesError } = await supabase
        .from('properties')
        .select('building_type, square_footage');

      if (propertiesError) throw propertiesError;

      // Process user growth data by month
      const usersByMonth = users.reduce((acc: { [key: string]: number }, user) => {
        const month = new Date(user.created_at).toLocaleString('default', { month: 'short', year: 'numeric' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});

      // Process property types data
      const propertyTypes = properties.reduce((acc: { [key: string]: number }, property) => {
        const type = property.building_type || 'Unknown';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

      // Calculate metrics
      const totalSquareFootage = properties.reduce((sum, property) => sum + (property.square_footage || 0), 0);

      setAnalytics({
        userGrowth: {
          labels: Object.keys(usersByMonth),
          datasets: [{
            label: 'New Users',
            data: Object.values(usersByMonth),
            borderColor: '#10B981',
            tension: 0.4,
          }],
        },
        propertyTypes: {
          labels: Object.keys(propertyTypes),
          datasets: [{
            label: 'Number of Properties',
            data: Object.values(propertyTypes),
            backgroundColor: [
              'rgba(16, 185, 129, 0.7)',
              'rgba(59, 130, 246, 0.7)',
              'rgba(245, 158, 11, 0.7)',
              'rgba(239, 68, 68, 0.7)',
            ],
          }],
        },
        metrics: {
          totalUsers: users.length,
          totalProperties: properties.length,
          avgComplianceScore: 85,
          totalSquareFootage,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching analytics');
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
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
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold">{analytics.metrics.totalUsers}</span>
          </div>
          <h3 className="text-gray-600">Total Users</h3>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <Building2 className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold">{analytics.metrics.totalProperties}</span>
          </div>
          <h3 className="text-gray-600">Properties</h3>
          <p className="text-sm text-gray-500">
            {analytics.metrics.totalSquareFootage.toLocaleString()} sq ft total
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold">{analytics.metrics.avgComplianceScore}%</span>
          </div>
          <h3 className="text-gray-600">Avg. Compliance</h3>
          <div className="mt-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-emerald-600 rounded-full"
              style={{ width: `${analytics.metrics.avgComplianceScore}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="h-8 w-8 text-amber-500" />
            <span className="text-2xl font-bold">15%</span>
          </div>
          <h3 className="text-gray-600">At Risk</h3>
          <p className="text-sm text-amber-500">Need attention</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Growth Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <div className="h-[300px]">
            <Line data={analytics.userGrowth} options={chartOptions} />
          </div>
        </div>

        {/* Property Types Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Property Types</h3>
          <div className="h-[300px]">
            <Bar data={analytics.propertyTypes} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};