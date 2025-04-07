export interface ComplianceLaw {
  id: string;
  title: string;
  state: string;
  description: string;
  deadline: string;
  requirements: string[];
  fines: string;
  recommendation: string;
  buildingTypes: string[];
  squareFootageThreshold?: number;
}

export const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
  'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

export const complianceLaws: ComplianceLaw[] = [
  // New York
  {
    id: 'll97',
    title: 'Local Law 97 (NYC)',
    state: 'New York',
    description: 'Building emissions limits and reporting requirements for NYC buildings over 25,000 sq ft.',
    deadline: '2024-2029',
    requirements: [
      'Annual emissions reporting by May 1st',
      'Meet carbon caps based on building type',
      'Install energy management systems',
      'Submit periodic compliance reports'
    ],
    fines: 'Up to $268 per metric ton of CO2 over limit',
    recommendation: 'Implement solar + high-efficiency HVAC upgrade to reduce emissions by 40% and save approximately $400,000 annually',
    buildingTypes: ['Commercial', 'Residential', 'Mixed-Use'],
    squareFootageThreshold: 25000
  },
  // California
  {
    id: 'title24',
    title: 'Title 24 Building Energy Efficiency Standards',
    state: 'California',
    description: 'Comprehensive energy efficiency standards for new construction and major renovations.',
    deadline: '2023-2025',
    requirements: [
      'Meet minimum energy efficiency requirements',
      'Install smart thermostats and lighting controls',
      'Implement demand response capabilities',
      'Use high-efficiency HVAC systems'
    ],
    fines: 'Varies by jurisdiction, up to $500 per day of violation',
    recommendation: 'Upgrade to smart building systems and high-efficiency equipment to achieve 35% energy reduction and $300,000 annual savings',
    buildingTypes: ['Commercial', 'Industrial'],
    squareFootageThreshold: 10000
  },
  // Massachusetts
  {
    id: 'berdo',
    title: 'Building Emissions Reduction and Disclosure Ordinance (BERDO)',
    state: 'Massachusetts',
    description: 'Boston\'s emissions reduction requirements for large buildings.',
    deadline: '2025-2050',
    requirements: [
      'Annual energy and water use reporting',
      'Meet emissions reduction targets',
      'Develop emissions reduction plan',
      'Regular building assessments'
    ],
    fines: 'Up to $1,000 per day of violation',
    recommendation: 'Implement comprehensive energy management system with real-time monitoring to reduce emissions by 30% and save $250,000 annually',
    buildingTypes: ['Commercial', 'Residential', 'Industrial'],
    squareFootageThreshold: 20000
  },
  // Washington
  {
    id: 'clean-buildings',
    title: 'Clean Buildings Performance Standard',
    state: 'Washington',
    description: 'State-wide energy performance requirements for commercial buildings.',
    deadline: '2026-2028',
    requirements: [
      'Energy management plan development',
      'Meet performance targets',
      'Conduct investment grade audit',
      'Implement efficiency measures'
    ],
    fines: 'Up to $5,000 plus $1 per sq ft annually',
    recommendation: 'Implement building automation system and retro-commissioning to reduce energy use by 25% and save $180,000 annually',
    buildingTypes: ['Commercial', 'Industrial'],
    squareFootageThreshold: 50000
  },
  // Illinois
  {
    id: 'chicago-energy',
    title: 'Chicago Energy Rating System',
    state: 'Illinois',
    description: 'Energy benchmarking and transparency requirements for large buildings.',
    deadline: '2024-2026',
    requirements: [
      'Annual energy benchmarking',
      'Public disclosure of energy performance',
      'Display energy rating placard',
      'Implement improvement measures'
    ],
    fines: 'Up to $1,000 per violation',
    recommendation: 'Upgrade building systems and implement energy monitoring to improve rating and achieve $200,000 annual savings',
    buildingTypes: ['Commercial', 'Residential'],
    squareFootageThreshold: 50000
  }
];