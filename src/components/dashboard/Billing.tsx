import React, { useState } from 'react';
import { DollarSign, Clock, AlertCircle, CheckCircle, Download, Bell, CreditCard, History, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { createCheckoutSession } from '../../lib/stripe';
import { Line } from 'react-chartjs-2';

interface BillingProps {
  userId: string | null;
}

// Mock subscription data
const mockSubscription = {
  status: 'active',
  plan: 'pro',
  currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  squareFootage: 150000,
  rate: 3,
};

// Mock invoice data
const mockInvoices = [
  {
    id: 1,
    date: new Date().toISOString(),
    amount: 37500,
    status: 'paid',
  },
  {
    id: 2,
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    amount: 37500,
    status: 'paid',
  },
];

// Usage data for chart
const usageData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Monthly Usage',
      data: [120000, 130000, 125000, 140000, 150000, 145000],
      borderColor: 'rgb(16, 185, 129)',
      tension: 0.1,
      fill: false,
    }
  ]
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Square Footage'
      }
    }
  }
};

export const Billing: React.FC<BillingProps> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [showUsageDetails, setShowUsageDetails] = useState(false);

  const handleUpgrade = async (priceId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            priceId,
            squareFootage: mockSubscription.squareFootage,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process upgrade');
      console.error('Error upgrading plan:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      setCancelling(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cancel-subscription`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel subscription');
    } finally {
      setCancelling(false);
    }
  };

  const handleDownloadInvoice = (invoiceId: number) => {
    // In production, this would generate and download a PDF invoice
    console.log('Downloading invoice:', invoiceId);
  };

  const annualCost = mockSubscription.squareFootage * mockSubscription.rate;

  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Current Plan</h2>
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
            <span className="text-emerald-600 font-medium">Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Rate</p>
            <p className="text-2xl font-bold text-gray-900">${mockSubscription.rate}/sq ft</p>
            <p className="text-sm text-gray-500">per year</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Area</p>
            <p className="text-2xl font-bold text-gray-900">{mockSubscription.squareFootage.toLocaleString()}</p>
            <p className="text-sm text-gray-500">square feet</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Annual Cost</p>
            <p className="text-2xl font-bold text-gray-900">${annualCost.toLocaleString()}</p>
            <p className="text-sm text-gray-500">billed yearly</p>
          </div>
        </div>

        {/* Usage Chart */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Usage History</h3>
            <button
              onClick={() => setShowUsageDetails(!showUsageDetails)}
              className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
            >
              {showUsageDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
          <div className="h-64">
            <Line data={usageData} options={chartOptions} />
          </div>
          {showUsageDetails && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Usage Insights</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Peak usage: 150,000 sq ft in May</li>
                <li>• Average usage: 135,000 sq ft</li>
                <li>• Trending: +5% month over month</li>
              </ul>
            </div>
          )}
        </div>

        {/* Payment Settings */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Payment Settings</h3>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="font-medium">•••• 4242</p>
                <p className="text-sm text-gray-500">Expires 12/25</p>
              </div>
            </div>
            <button className="text-emerald-600 hover:text-emerald-700 font-medium">
              Update
            </button>
          </div>

          {/* Billing Alerts */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="font-medium">Usage Alerts</p>
                <p className="text-sm text-gray-500">Notify at 80% of included square footage</p>
              </div>
            </div>
            <button className="text-emerald-600 hover:text-emerald-700 font-medium">
              Configure
            </button>
          </div>
        </div>

        {/* Available Plans */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Available Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Starter</h4>
              <p className="text-2xl font-bold text-gray-900 mb-2">$1<span className="text-sm text-gray-500">/sq ft</span></p>
              <button
                onClick={() => handleUpgrade('price_starter')}
                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={mockSubscription.rate === 1 || loading}
              >
                {loading ? 'Processing...' : mockSubscription.rate === 1 ? 'Current Plan' : 'Downgrade'}
              </button>
            </div>
            <div className="border-2 border-emerald-500 rounded-lg p-4 relative">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white px-2 py-1 text-xs rounded-bl-lg rounded-tr-lg">
                Popular
              </div>
              <h4 className="font-semibold mb-2">Pro</h4>
              <p className="text-2xl font-bold text-gray-900 mb-2">$3<span className="text-sm text-gray-500">/sq ft</span></p>
              <button
                onClick={() => handleUpgrade('price_pro')}
                className={`w-full ${
                  mockSubscription.rate === 3
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                } px-4 py-2 rounded-lg transition-colors`}
                disabled={mockSubscription.rate === 3 || loading}
              >
                {loading ? 'Processing...' : mockSubscription.rate === 3 ? 'Current Plan' : mockSubscription.rate > 3 ? 'Downgrade' : 'Upgrade'}
              </button>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Enterprise</h4>
              <p className="text-2xl font-bold text-gray-900 mb-2">$5<span className="text-sm text-gray-500">/sq ft</span></p>
              <button
                onClick={() => handleUpgrade('price_enterprise')}
                className={`w-full ${
                  mockSubscription.rate === 5
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                } px-4 py-2 rounded-lg transition-colors`}
                disabled={mockSubscription.rate === 5 || loading}
              >
                {loading ? 'Processing...' : mockSubscription.rate === 5 ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Billing History</h3>
          <div className="space-y-4">
            {mockInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium">Invoice #{invoice.id}</p>
                    <p className="text-sm text-gray-500">{new Date(invoice.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-medium">${invoice.amount.toLocaleString()}</span>
                  <button
                    onClick={() => handleDownloadInvoice(invoice.id)}
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cancel Subscription */}
        <div className="mt-8 pt-6 border-t">
          <button
            onClick={handleCancel}
            disabled={cancelling}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            {cancelling ? 'Cancelling...' : 'Cancel Subscription'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-sm text-green-700">Changes saved successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};