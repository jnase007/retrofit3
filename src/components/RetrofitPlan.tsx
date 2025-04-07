import React, { useState } from 'react';
import { Download, DollarSign, Users, Sliders } from 'lucide-react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import { supabase } from '../lib/supabase';
import { getRetrofitRecommendations } from '../lib/openai';

interface RetrofitPlanProps {
  propertyData: {
    size: number;
    location: string;
    buildingAge?: number;
    energyUse?: number;
  };
  recommendations: {
    title: string;
    description: string;
    estimatedCost: number;
    estimatedSavings: number;
    paybackPeriod: number;
    co2Reduction: number;
  }[];
  onOpenSignup: () => void;
}

export const RetrofitPlan = ({ propertyData, recommendations, onOpenSignup }: RetrofitPlanProps) => {
  const [budget, setBudget] = useState(1000000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRefinePlan = async () => {
    setLoading(true);
    setError(null);

    try {
      const newRecommendations = await getRetrofitRecommendations({
        ...propertyData,
        budget,
        propertyType: 'commercial',
      });

      // Update recommendations state in parent component
      // This would need to be passed down as a prop
      console.log('New recommendations:', newRecommendations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refine plan');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(20);
    doc.text('Retrofit Plan', 20, 20);
    
    // Add property details
    doc.setFontSize(12);
    doc.text(`Property Size: ${propertyData.size.toLocaleString()} sq ft`, 20, 40);
    doc.text(`Location: ${propertyData.location}`, 20, 50);
    if (propertyData.buildingAge) {
      doc.text(`Building Age: ${propertyData.buildingAge}`, 20, 60);
    }
    
    // Add recommendations
    doc.text('Recommended Retrofits:', 20, 80);
    let y = 90;
    recommendations.forEach((rec, index) => {
      doc.setFontSize(14);
      doc.text(`${index + 1}. ${rec.title}`, 20, y);
      y += 10;
      doc.setFontSize(12);
      doc.text(rec.description, 30, y);
      y += 10;
      doc.text(`Cost: $${rec.estimatedCost.toLocaleString()}`, 30, y);
      y += 10;
      doc.text(`Annual Savings: $${rec.estimatedSavings.toLocaleString()}`, 30, y);
      y += 10;
      doc.text(`Payback Period: ${rec.paybackPeriod} years`, 30, y);
      y += 10;
      doc.text(`CO2 Reduction: ${rec.co2Reduction} tons/year`, 30, y);
      y += 20;
    });

    doc.save('retrofit-plan.pdf');
  };

  const handleRequestFunding = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        onOpenSignup();
        return;
      }

      const totalCost = recommendations.reduce((sum, rec) => sum + rec.estimatedCost, 0);
      
      const { error } = await supabase
        .from('loan_requests')
        .insert([{
          user_id: session.user.id,
          amount: totalCost,
          property_size: propertyData.size,
          location: propertyData.location,
          retrofit_plan: recommendations,
          status: 'pending',
        }]);

      if (error) throw error;

      // Redirect to financing marketplace
      window.location.href = '/financing-marketplace';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit funding request');
    }
  };

  const handleContactContractor = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        onOpenSignup();
        return;
      }

      const { error } = await supabase
        .from('contractor_requests')
        .insert([{
          user_id: session.user.id,
          property_size: propertyData.size,
          location: propertyData.location,
          retrofit_plan: recommendations,
          status: 'pending',
        }]);

      if (error) throw error;

      // Redirect to contractor marketplace
      window.location.href = '/contractors';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit contractor request');
    }
  };

  return (
    <div className="space-y-8">
      {/* Refine Plan Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center mb-4">
          <Sliders className="h-6 w-6 text-emerald-600 mr-2" />
          <h3 className="text-xl font-semibold">Refine Your Plan</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget Range: ${budget.toLocaleString()}
            </label>
            <input
              type="range"
              min="100000"
              max="5000000"
              step="100000"
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <button
            onClick={handleRefinePlan}
            disabled={loading}
            className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            {loading ? 'Refining Plan...' : 'Update Recommendations'}
          </button>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={handleDownloadPDF}
          className="flex items-center justify-center bg-white text-emerald-600 px-4 py-3 rounded-lg border-2 border-emerald-600 hover:bg-emerald-50 transition-colors"
        >
          <Download className="h-5 w-5 mr-2" />
          Download Plan
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={handleRequestFunding}
          className="flex items-center justify-center bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <DollarSign className="h-5 w-5 mr-2" />
          Request Funding
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleContactContractor}
          className="flex items-center justify-center bg-white text-emerald-600 px-4 py-3 rounded-lg border-2 border-emerald-600 hover:bg-emerald-50 transition-colors"
        >
          <Users className="h-5 w-5 mr-2" />
          Find Contractors
        </motion.button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};