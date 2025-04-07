import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { AlertCircle, Save } from 'lucide-react';

export const AdminSettings = () => {
  // Default settings structure
  const defaultSettings = {
    pricing: {
      starter: 1,
      pro: 3,
      enterprise: 5,
    },
    openai: {
      api_key: '',
      model: 'gpt-3.5-turbo',
    },
    storage: {
      max_file_size: 10485760,
      allowed_types: ['pdf', 'csv'],
    },
  };

  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*');

      if (error) throw error;

      // Initialize settings object with default values
      const settingsObj = { ...defaultSettings };

      // Override default values with fetched data
      data?.forEach((setting) => {
        try {
          if (setting.key === 'pricing') {
            settingsObj.pricing = typeof setting.value === 'string' 
              ? JSON.parse(setting.value) 
              : setting.value;
          } else if (setting.key === 'openai') {
            settingsObj.openai = typeof setting.value === 'string'
              ? JSON.parse(setting.value)
              : setting.value;
          } else if (setting.key === 'storage') {
            settingsObj.storage = typeof setting.value === 'string'
              ? JSON.parse(setting.value)
              : setting.value;
          }
        } catch (e) {
          console.error(`Failed to parse ${setting.key} settings:`, e);
        }
      });

      setSettings(settingsObj);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Update each setting
      for (const [key, value] of Object.entries(settings)) {
        const { error } = await supabase
          .from('settings')
          .update({ value: JSON.stringify(value) })
          .eq('key', key);

        if (error) throw error;
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <Save className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-sm text-green-700">Settings saved successfully</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Pricing Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Starter ($/sq ft)
              </label>
              <input
                type="number"
                step="0.01"
                value={settings.pricing.starter}
                onChange={(e) => setSettings({
                  ...settings,
                  pricing: { ...settings.pricing, starter: parseFloat(e.target.value) },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pro ($/sq ft)
              </label>
              <input
                type="number"
                step="0.01"
                value={settings.pricing.pro}
                onChange={(e) => setSettings({
                  ...settings,
                  pricing: { ...settings.pricing, pro: parseFloat(e.target.value) },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enterprise ($/sq ft)
              </label>
              <input
                type="number"
                step="0.01"
                value={settings.pricing.enterprise}
                onChange={(e) => setSettings({
                  ...settings,
                  pricing: { ...settings.pricing, enterprise: parseFloat(e.target.value) },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* OpenAI Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">OpenAI Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API Key
              </label>
              <input
                type="password"
                value={settings.openai.api_key}
                onChange={(e) => setSettings({
                  ...settings,
                  openai: { ...settings.openai, api_key: e.target.value },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model
              </label>
              <select
                value={settings.openai.model}
                onChange={(e) => setSettings({
                  ...settings,
                  openai: { ...settings.openai, model: e.target.value },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="gpt-4">GPT-4</option>
              </select>
            </div>
          </div>
        </div>

        {/* Storage Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Storage Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max File Size (bytes)
              </label>
              <input
                type="number"
                value={settings.storage.max_file_size}
                onChange={(e) => setSettings({
                  ...settings,
                  storage: { ...settings.storage, max_file_size: parseInt(e.target.value) },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Allowed File Types
              </label>
              <input
                type="text"
                value={settings.storage.allowed_types.join(', ')}
                onChange={(e) => setSettings({
                  ...settings,
                  storage: {
                    ...settings.storage,
                    allowed_types: e.target.value.split(',').map(t => t.trim()),
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <p className="mt-1 text-sm text-gray-500">Comma-separated list of file extensions</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
              saving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};