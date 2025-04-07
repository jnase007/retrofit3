import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Building2, Shield, LineChart, Users, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './components/ThemeToggle';
import { Landing } from './components/Landing';
import { Dashboard } from './components/Dashboard';
import { RetrofitPlaybook } from './components/RetrofitPlaybook';
import { FinancingMarketplace } from './components/FinancingMarketplace';
import { ContractorMarketplace } from './components/ContractorMarketplace';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { TenantImpact } from './components/TenantImpact';
import { CaseStudies } from './components/CaseStudies';
import { ROICalculator } from './components/ROICalculator';
import { ComplianceGuide } from './components/ComplianceGuide';
import { AboutUs } from './components/AboutUs';
import { Contact } from './components/Contact';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { QuickCheck } from './components/QuickCheck';
import { QuickResults } from './components/QuickResults';
import { ScrollToTop } from './components/ScrollToTop';
import { UserDashboard } from './components/UserDashboard';
import { Properties } from './components/dashboard/Properties';
import { TenantImpact as DashboardTenantImpact } from './components/dashboard/TenantImpact';
import { ContractorFinancing } from './components/dashboard/ContractorFinancing';
import { Billing } from './components/dashboard/Billing';
import { Profile } from './components/dashboard/Profile';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginModal } from './components/auth/LoginModal';
import { SignupModal } from './components/auth/SignupModal';
import { Partnerships } from './components/Partnerships';
import { supabase } from './lib/supabase';

const menuItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/features', label: 'Features' },
  { path: '/retrofit', label: 'Retrofit Playbook' },
  { path: '/pricing', label: 'Pricing' },
];

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const location = useLocation();

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'tween',
        duration: 0.3,
        when: 'afterChildren',
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: {
      x: 50,
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* Menu */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-50 shadow-2xl"
          >
            <div className="p-4 flex justify-between items-center border-b">
              <div className="flex items-center">
                <img 
                  src="https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//logo.png"
                  alt="Retrofit Now Logo"
                  className="h-8 w-auto"
                />
              </div>
              <button onClick={onClose} className="p-2">
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="py-4">
              {menuItems.map((item) => (
                <motion.div
                  key={item.path}
                  variants={itemVariants}
                  className="relative"
                >
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center justify-between px-6 py-3 text-lg ${
                      location.pathname === item.path
                        ? 'text-emerald-600 bg-emerald-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/user-dashboard"
                  onClick={onClose}
                  className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-emerald-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin"
                  onClick={onClose}
                  className="bg-blue-900 text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-blue-800"
                >
                  Admin
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Navigation() {
  const location = useLocation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
    setIsSignupModalOpen(false);
  };

  const handleGetStartedClick = () => {
    setIsSignupModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const handleSwitchToSignup = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//logo.png"
                alt="Retrofit Now Logo"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-gray-600 hover:text-gray-900 relative group ${
                  isActive(item.path) ? 'text-emerald-600' : ''
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/user-dashboard"
              className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200 transition-colors"
            >
              Dashboard Demo
            </Link>
            <Link
              to="/admin"
              className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Admin
            </Link>
            <button
              onClick={handleLoginClick}
              className="text-gray-600 hover:text-gray-900 px-3 py-2"
            >
              Login
            </button>
            <button
              onClick={handleGetStartedClick}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Auth Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToSignup={handleSwitchToSignup}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </nav>
  );
}

export default function App() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id || null);
    };
    checkUser();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Navigation />
        
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quick-check" element={<QuickCheck />} />
          <Route path="/quick-results" element={<QuickResults onOpenSignup={() => setIsSignupModalOpen(true)} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/features" element={<Features />} />
          <Route path="/retrofit" element={<RetrofitPlaybook />} />
          <Route path="/financing" element={<FinancingMarketplace />} />
          <Route path="/contractors" element={<ContractorMarketplace />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/tenant-impact" element={<TenantImpact />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/roi-calculator" element={<ROICalculator />} />
          <Route path="/compliance-guide" element={<ComplianceGuide />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/partnerships" element={<Partnerships />} />
          <Route path="/user-dashboard/*" element={<UserDashboard />}>
            <Route index element={<Properties />} />
            <Route path="properties" element={<Properties />} />
            <Route path="tenant-impact" element={<DashboardTenantImpact />} />
            <Route path="contractor-financing" element={<ContractorFinancing />} />
            <Route path="billing" element={<Billing userId={userId} />} />
            <Route path="profile" element={<Profile userId={userId} />} />
          </Route>
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>

        {/* Trust Signals */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-semibold mb-12 text-gray-900">
              Trusted by Industry Leaders
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              <div className="flex items-center justify-center">
                <Shield className="h-12 w-12 text-gray-400" />
                <span className="ml-2 text-gray-600">NYC LL97</span>
              </div>
              <div className="flex items-center justify-center">
                <Users className="h-12 w-12 text-gray-400" />
                <span className="ml-2 text-gray-600">LEED Certified</span>
              </div>
              <div className="flex items-center justify-center">
                <Building2 className="h-12 w-12 text-gray-400" />
                <span className="ml-2 text-gray-600">Horizon REIT</span>
              </div>
              <div className="flex items-center justify-center">
                <LineChart className="h-12 w-12 text-gray-400" />
                <span className="ml-2 text-gray-600">Energy Star</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <img 
                    src="https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos//logo.png"
                    alt="Retrofit Now Logo"
                    className="h-8 w-auto"
                  />
                </div>
                <p className="text-sm">Transform your real estate portfolio with sustainable solutions.</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Solutions</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/retrofit" className="hover:text-emerald-500">Retrofit Playbook</Link></li>
                  <li><Link to="/financing" className="hover:text-emerald-500">Financing Marketplace</Link></li>
                  <li><Link to="/contractors" className="hover:text-emerald-500">Find Contractors</Link></li>
                  <li><Link to="/tenant-impact" className="hover:text-emerald-500">Tenant Impact Tools</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/case-studies" className="hover:text-emerald-500">Case Studies</Link></li>
                  <li><Link to="/roi-calculator" className="hover:text-emerald-500">ROI Calculator</Link></li>
                  <li><Link to="/compliance-guide" className="hover:text-emerald-500">Compliance Guide</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/about" className="hover:text-emerald-500">About Us</Link></li>
                  <li><Link to="/contact" className="hover:text-emerald-500">Contact</Link></li>
                  <li><Link to="/privacy" className="hover:text-emerald-500">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 flex items-center justify-between">
              <p className="text-sm">&copy; 2025 Retrofit Now. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
              </div>
            </div>
            <div className="text-center mt-4 text-sm text-gray-500">
              Designed by <a href="https://brandastic.com" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-400">Brandastic</a>
            </div>
          </div>
        </footer>

        {/* Global Signup Modal */}
        <SignupModal
          isOpen={isSignupModalOpen}
          onClose={() => setIsSignupModalOpen(false)}
          onSwitchToLogin={() => {
            setIsSignupModalOpen(false);
            // Add logic to open login modal if needed
          }}
        />
      </div>
    </Router>
  );
}