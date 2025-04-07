import { Building2, Sun, Wind, Gauge, AppWindowIcon as WindowIcon } from 'lucide-react';

export interface Contractor {
  id: string;
  name: string;
  specialty: string;
  description: string;
  rating: string;
  completedProjects: number;
  location: string;
  timeline: string;
  certifications: string[];
  bid: string;
  savings: string;
  phone: string;
  email: string;
}

export const contractors: Contractor[] = [
  {
    id: 'solartech',
    name: 'SolarTech NYC',
    specialty: 'Solar Installation',
    description: 'Leading solar installation and integration for commercial buildings',
    rating: '4.8/5 (20 reviews)',
    completedProjects: 150,
    location: 'New York, NY',
    timeline: '6 months',
    certifications: ['NABCEP Certified', 'LEED AP', 'Energy Star Partner'],
    bid: '$1.4M',
    savings: '20%',
    phone: '(212) 555-0123',
    email: 'projects@solartechnyc.com'
  },
  {
    id: 'hvacpro',
    name: 'HVAC Pro Solutions',
    specialty: 'HVAC Upgrades',
    description: 'Comprehensive HVAC modernization and optimization',
    rating: '4.9/5 (35 reviews)',
    completedProjects: 200,
    location: 'Boston, MA',
    timeline: '4 months',
    certifications: ['NATE Certified', 'LEED AP', 'Energy Star Partner'],
    bid: '$850K',
    savings: '25%',
    phone: '(617) 555-0456',
    email: 'info@hvacprosolutions.com'
  },
  {
    id: 'greeninsulation',
    name: 'GreenInsulate',
    specialty: 'Insulation & Weatherization',
    description: 'Advanced building envelope solutions',
    rating: '4.7/5 (15 reviews)',
    completedProjects: 120,
    location: 'Chicago, IL',
    timeline: '3 months',
    certifications: ['BPI Certified', 'RESNET HERS Rater'],
    bid: '$600K',
    savings: '15%',
    phone: '(312) 555-0789',
    email: 'projects@greeninsulate.com'
  },
  {
    id: 'smartsystems',
    name: 'Smart Building Systems',
    specialty: 'Energy Management Systems',
    description: 'Intelligent building automation and control',
    rating: '4.9/5 (28 reviews)',
    completedProjects: 175,
    location: 'San Francisco, CA',
    timeline: '5 months',
    certifications: ['Master Systems Integrator', 'Energy Star Partner'],
    bid: '$950K',
    savings: '30%',
    phone: '(415) 555-0321',
    email: 'info@smartbuildingsystems.com'
  },
  {
    id: 'windowpro',
    name: 'WindowPro Retrofits',
    specialty: 'Window Retrofits',
    description: 'High-performance window solutions for commercial buildings',
    rating: '4.6/5 (12 reviews)',
    completedProjects: 90,
    location: 'Los Angeles, CA',
    timeline: '4 months',
    certifications: ['AAMA Certified', 'LEED AP'],
    bid: '$750K',
    savings: '18%',
    phone: '(213) 555-0654',
    email: 'projects@windowproretrofits.com'
  }
];

export const specialties = [
  'Solar Installation',
  'HVAC Upgrades',
  'Insulation & Weatherization',
  'Energy Management Systems',
  'Window Retrofits'
];