import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      icon: Eye,
      content: `We collect information that you provide directly to us, including:
        • Name and contact information
        • Company details
        • Building and property data
        • Usage data and analytics
        • Communication preferences`,
    },
    {
      title: 'How We Use Your Information',
      icon: FileText,
      content: `We use the collected information to:
        • Provide and improve our services
        • Analyze building performance
        • Generate retrofit recommendations
        • Send important updates and notifications
        • Comply with legal obligations`,
    },
    {
      title: 'Data Security',
      icon: Lock,
      content: `We implement appropriate technical and organizational measures to protect your data:
        • Encryption in transit and at rest
        • Regular security assessments
        • Access controls and authentication
        • Secure data centers
        • Regular backups`,
    },
    {
      title: 'Your Rights',
      icon: Shield,
      content: `You have the right to:
        • Access your personal data
        • Request data correction
        • Delete your account
        • Export your data
        • Opt-out of communications`,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-xl text-gray-600">Last updated: March 2025</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <p className="text-gray-600 mb-4">
          At Retrofit Now, we take your privacy seriously. This Privacy Policy describes how we collect,
          use, and protect your personal information when you use our services.
        </p>
      </div>

      <div className="space-y-8">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Icon className="h-8 w-8 text-emerald-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-line">{section.content}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-emerald-50 rounded-xl p-8 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-6">
          If you have any questions about our Privacy Policy or how we handle your data,
          please contact our Data Protection Officer:
        </p>
        <div className="space-y-2">
          <p className="text-gray-600">Email: privacy@retrofitnow.com</p>
          <p className="text-gray-600">Address: 3525 Hyland Ave Suite 235, Costa Mesa, CA 92626</p>
        </div>
      </div>
    </div>
  );
};