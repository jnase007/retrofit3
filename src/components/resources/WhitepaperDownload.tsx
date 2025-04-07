import React, { useState } from 'react';
import { FileText, Download, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';

export const WhitepaperDownload = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Save lead to Supabase
      const { error: dbError } = await supabase
        .from('leads')
        .insert([{
          email,
          source: 'whitepaper',
          created_at: new Date().toISOString(),
        }]);

      if (dbError) throw dbError;

      // Trigger email send via Edge Function
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-whitepaper`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send whitepaper');
      }

      setSuccess(true);
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process request');
      console.error('Error sending whitepaper:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <FileText className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Top 5 Costly Retrofit Mistakes
          </h2>
          <p className="text-gray-600">
            Learn how to avoid common pitfalls that cost building owners $50,000+ in unnecessary expenses and missed savings opportunities.
          </p>
        </div>

        <div className="bg-emerald-50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">What You'll Learn:</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5" />
              <span>Why ignoring LL97 could cost you $268/ton in fines</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5" />
              <span>The hidden costs of postponing HVAC upgrades</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5" />
              <span>How to maximize tax incentives and rebates</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5" />
              <span>Smart sequencing for multi-year retrofits</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5" />
              <span>Tenant engagement strategies that boost ROI</span>
            </li>
          </ul>
        </div>

        {!success ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter your work email"
                  required
                />
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

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-5 w-5 mr-2" />
              {loading ? 'Sending...' : 'Download Whitepaper'}
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <CheckCircle className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Check Your Email!
            </h3>
            <p className="text-gray-600">
              We've sent the whitepaper to your inbox. If you don't see it, please check your spam folder.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};