import React, { useState } from 'react';
import { User, Mail, Building2, Camera, AlertCircle, CheckCircle } from 'lucide-react';

interface ProfileProps {
  userId: string;
}

export const Profile: React.FC<ProfileProps> = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [profile, setProfile] = useState({
    full_name: 'Justin Nassie',
    email: 'justin@brandastic.com',
    company_name: 'Brandastic',
    company_position: 'Chief Technology Officer',
    avatar_url: 'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//1696031902907-1.jpg',
    notifications_enabled: true,
  });
  const [newPassword, setNewPassword] = useState('');

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      const file = e.target.files?.[0];
      if (!file) return;

      // Mock successful upload
      setProfile({ 
        ...profile, 
        avatar_url: URL.createObjectURL(file) 
      });
      setSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to upload avatar');
      console.error('Error uploading avatar:', error);
    }
  };

  const handlePasswordChange = async () => {
    if (!newPassword) return;

    try {
      setSaving(true);
      setError(null);

      // Mock password update
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNewPassword('');
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update password');
      console.error('Error updating password:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);

      // Mock profile update
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      console.error('Error updating profile:', err);
    } finally {
      setSaving(false);
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
      {/* Avatar Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={profile.avatar_url}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full cursor-pointer hover:bg-emerald-700 transition-colors">
              <Camera className="h-4 w-4" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarUpload}
              />
            </label>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{profile.full_name}</h2>
            <p className="text-gray-600">{profile.email}</p>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <form onSubmit={handleProfileUpdate} className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={profile.full_name}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={profile.company_name}
                onChange={(e) => setProfile({ ...profile, company_name: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={profile.company_position}
                onChange={(e) => setProfile({ ...profile, company_position: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            checked={profile.notifications_enabled}
            onChange={(e) => setProfile({ ...profile, notifications_enabled: e.target.checked })}
            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Receive email notifications about updates and recommendations
          </label>
        </div>

        <button
          type="submit"
          disabled={saving}
          className={`w-full bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium ${
            saving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-700'
          } transition-colors`}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      {/* Password Change */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter new password"
            />
          </div>
          <button
            onClick={handlePasswordChange}
            disabled={!newPassword || saving}
            className={`w-full bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium ${
              !newPassword || saving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-700'
            } transition-colors`}
          >
            {saving ? 'Updating...' : 'Update Password'}
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