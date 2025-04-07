import React from 'react';
import { Briefcase, Users, Heart, Trophy } from 'lucide-react';

export const Careers = () => {
  const positions = [
    {
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'New York, NY',
      type: 'Full-time',
    },
    {
      title: 'Sustainability Consultant',
      department: 'Advisory',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      type: 'Full-time',
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, wellness programs, and gym memberships',
    },
    {
      icon: Users,
      title: 'Work-Life Balance',
      description: 'Flexible working hours, remote work options, and unlimited PTO',
    },
    {
      icon: Trophy,
      title: 'Growth & Development',
      description: 'Professional development budget, mentorship programs, and career advancement',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h1>
        <p className="text-xl text-gray-600">Help us transform the future of real estate</p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Open Positions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {positions.map((position) => (
            <div key={position.title} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Briefcase className="h-6 w-6 text-emerald-600 mr-2" />
                <h3 className="text-xl font-semibold">{position.title}</h3>
              </div>
              <div className="space-y-2 mb-6">
                <p className="text-gray-600">Department: {position.department}</p>
                <p className="text-gray-600">Location: {position.location}</p>
                <p className="text-gray-600">Type: {position.type}</p>
              </div>
              <button className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Benefits & Perks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Icon className="h-8 w-8 text-emerald-600 mr-2" />
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                </div>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-emerald-50 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Don't See the Right Fit?</h2>
        <p className="text-xl text-gray-600 mb-8">
          We're always looking for talented individuals to join our team. Send us your resume!
        </p>
        <button className="bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-colors">
          Submit General Application
        </button>
      </div>
    </div>
  );
};