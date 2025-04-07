import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, TrendingUp, DollarSign, Clock, Building2, Download, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';

interface ROIResults {
  paybackPeriod: number;
  roi: number;
  npv: number;
  irr: number;
  energySavings: number;
  carbonReduction: number;
  tenantBenefits: number;
  propertyValue: number;
}

export const ROICalculator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectCost: '',
    annualSavings: '',
    incentives: '',
    energyPrice: '',
    squareFootage: '',
    currentEUI: '',
    interestRate: '5',
    propertyValue: '',
    occupancyRate: '90',
  });

  const [results, setResults] = useState<ROIResults | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const calculateROI = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cost = parseFloat(formData.projectCost) - parseFloat(formData.incentives || '0');
    const savings = parseFloat(formData.annualSavings);
    const propertyValue = parseFloat(formData.propertyValue || '0');
    const squareFootage = parseFloat(formData.squareFootage || '0');
    const currentEUI = parseFloat(formData.currentEUI || '0');
    const interestRate = parseFloat(formData.interestRate) / 100;
    
    // Basic calculations
    const paybackPeriod = cost / savings;
    const roi = (savings / cost) * 100;
    
    // NPV calculation over 10 years
    const cashFlows = Array(10).fill(savings);
    const npv = cashFlows.reduce((acc, cf, i) => {
      return acc + cf / Math.pow(1 + interestRate, i + 1);
    }, -cost);

    // IRR approximation
    const irr = ((savings * 10) - cost) / (cost * 10) * 100;

    // Additional metrics
    const energySavings = currentEUI * squareFootage * 0.3; // Assume 30% reduction
    const carbonReduction = energySavings * 0.0004; // MT CO2 per kWh
    const tenantBenefits = savings * 0.2; // Assume 20% of savings benefit tenants
    const propertyValueIncrease = propertyValue * 0.05; // Assume 5% increase

    setResults({
      paybackPeriod,
      roi,
      npv,
      irr,
      energySavings,
      carbonReduction,
      tenantBenefits,
      propertyValue: propertyValueIncrease,
    });
  };

  const handleDownloadPDF = () => {
    if (!results) return;

    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(20);
    doc.text('ROI Analysis Report', 20, 20);
    
    // Add project details
    doc.setFontSize(12);
    doc.text(`Project Cost: $${parseFloat(formData.projectCost).toLocaleString()}`, 20, 40);
    doc.text(`Annual Savings: $${parseFloat(formData.annualSavings).toLocaleString()}`, 20, 50);
    doc.text(`Available Incentives: $${formData.incentives ? parseFloat(formData.incentives).toLocaleString() : '0'}`, 20, 60);
    
    // Add results
    doc.text('Financial Metrics:', 20, 80);
    doc.text(`Payback Period: ${results.paybackPeriod.toFixed(1)} years`, 30, 90);
    doc.text(`ROI: ${results.roi.toFixed(1)}%`, 30, 100);
    doc.text(`NPV: $${results.npv.toLocaleString()}`, 30, 110);
    doc.text(`IRR: ${results.irr.toFixed(1)}%`, 30, 120);

    doc.text('Environmental Impact:', 20, 140);
    doc.text(`Energy Savings: ${Math.round(results.energySavings).toLocaleString()} kWh/year`, 30, 150);
    doc.text(`Carbon Reduction: ${Math.round(results.carbonReduction)} MT CO2/year`, 30, 160);

    doc.text('Additional Benefits:', 20, 180);
    doc.text(`Tenant Cost Savings: $${Math.round(results.tenantBenefits).toLocaleString()}/year`, 30, 190);
    doc.text(`Property Value Increase: $${Math.round(results.propertyValue).toLocaleString()}`, 30, 200);

    doc.save('retrofit-roi-analysis.pdf');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ROI Calculator</h1>
          <p className="text-xl text-gray-600">Calculate the complete return on your retrofit investment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form - Left Side */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={calculateROI} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Cost ($)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.projectCost}
                  onChange={(e) => setFormData({ ...formData, projectCost: e.target.value })}
                  placeholder="e.g., 100000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Annual Savings ($)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.annualSavings}
                  onChange={(e) => setFormData({ ...formData, annualSavings: e.target.value })}
                  placeholder="e.g., 25000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Incentives ($)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.incentives}
                  onChange={(e) => setFormData({ ...formData, incentives: e.target.value })}
                  placeholder="e.g., 20000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Energy Price ($/kWh)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.energyPrice}
                  onChange={(e) => setFormData({ ...formData, energyPrice: e.target.value })}
                  placeholder="e.g., 0.12"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
              </button>

              {showAdvanced && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Building Square Footage
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={formData.squareFootage}
                      onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
                      placeholder="e.g., 50000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Energy Use Intensity (kWh/sq ft/year)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={formData.currentEUI}
                      onChange={(e) => setFormData({ ...formData, currentEUI: e.target.value })}
                      placeholder="e.g., 15"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={formData.interestRate}
                      onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Property Value ($)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={formData.propertyValue}
                      onChange={(e) => setFormData({ ...formData, propertyValue: e.target.value })}
                      placeholder="e.g., 5000000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Occupancy Rate (%)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={formData.occupancyRate}
                      onChange={(e) => setFormData({ ...formData, occupancyRate: e.target.value })}
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Calculate ROI
              </button>
            </form>
          </div>

          {/* Right Side - Results or Illustration */}
          {results ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Results</h2>
                <div className="flex space-x-4">
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center text-emerald-600 hover:text-emerald-700"
                  >
                    <Download className="h-5 w-5 mr-1" />
                    Download PDF
                  </button>
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      navigator.clipboard.writeText(url);
                    }}
                    className="flex items-center text-emerald-600 hover:text-emerald-700"
                  >
                    <Share2 className="h-5 w-5 mr-1" />
                    Share
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-emerald-600 mr-2" />
                    <h3 className="text-lg font-semibold">Payback Period</h3>
                  </div>
                  <p className="text-3xl font-bold text-emerald-600">
                    {results.paybackPeriod.toFixed(1)} years
                  </p>
                </div>

                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 text-emerald-600 mr-2" />
                    <h3 className="text-lg font-semibold">ROI</h3>
                  </div>
                  <p className="text-3xl font-bold text-emerald-600">
                    {results.roi.toFixed(1)}%
                  </p>
                </div>

                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <DollarSign className="h-5 w-5 text-emerald-600 mr-2" />
                    <h3 className="text-lg font-semibold">10-Year NPV</h3>
                  </div>
                  <p className="text-3xl font-bold text-emerald-600">
                    ${Math.round(results.npv).toLocaleString()}
                  </p>
                </div>

                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Calculator className="h-5 w-5 text-emerald-600 mr-2" />
                    <h3 className="text-lg font-semibold">IRR</h3>
                  </div>
                  <p className="text-3xl font-bold text-emerald-600">
                    {results.irr.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Additional Benefits</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Annual Energy Savings</span>
                    <span className="font-semibold">{Math.round(results.energySavings).toLocaleString()} kWh</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Carbon Reduction</span>
                    <span className="font-semibold">{Math.round(results.carbonReduction)} MT CO2/year</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tenant Cost Savings</span>
                    <span className="font-semibold">${Math.round(results.tenantBenefits).toLocaleString()}/year</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Property Value Increase</span>
                    <span className="font-semibold">${Math.round(results.propertyValue).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <button
                  onClick={() => navigate('/financing', { 
                    state: { 
                      projectCost: formData.projectCost,
                      annualSavings: formData.annualSavings,
                      paybackPeriod: results.paybackPeriod,
                    }
                  })}
                  className="w-full bg-blue-900 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                >
                  Explore Financing Options
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=1000)'
                }}
              />
              
              <div className="relative z-10">
                <div className="mb-8 text-center">
                  <Building2 className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Transform Your Building's Performance
                  </h2>
                  <p className="text-gray-600">
                    Calculate potential savings and ROI for your retrofit project
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center p-4 bg-emerald-50 rounded-lg">
                    <DollarSign className="h-8 w-8 text-emerald-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Maximize Returns</h3>
                      <p className="text-sm text-gray-600">Typical ROI ranges from 15-30%</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-emerald-50 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-emerald-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Increase Property Value</h3>
                      <p className="text-sm text-gray-600">Up to 10% value appreciation</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-emerald-50 rounded-lg">
                    <Clock className="h-8 w-8 text-emerald-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Quick Payback</h3>
                      <p className="text-sm text-gray-600">Average 3-5 year payback period</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-800">
                    <strong>Pro Tip:</strong> Include available incentives and rebates in your calculation to see your true ROI potential.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Additional Resources */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Our experts can help you identify the best retrofit opportunities for your building.
            </p>
            <button className="text-emerald-600 hover:text-emerald-700 font-medium">
              Schedule a Consultation
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Available Incentives</h3>
            <p className="text-gray-600 mb-4">
              Learn about federal, state, and local incentives available for your project.
            </p>
            <button className="text-emerald-600 hover:text-emerald-700 font-medium">
              View Incentives
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Case Studies</h3>
            <p className="text-gray-600 mb-4">
              See how other building owners have achieved significant returns through retrofits.
            </p>
            <button className="text-emerald-600 hover:text-emerald-700 font-medium">
              Read Case Studies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};