export interface LoanOption {
  id: string;
  type: string;
  amount: number;
  term: number;
  rate: number;
  details: string;
  lender: string;
  benefits: string[];
  requirements: string[];
  eligibility: string[];
}

export const loanOptions: LoanOption[] = [
  {
    id: 'pace1',
    type: 'PACE',
    amount: 1500000,
    term: 10,
    rate: 4.0,
    details: 'Property Assessed Clean Energy financing with no upfront costs',
    lender: 'Ygrene',
    benefits: [
      'No upfront costs',
      'Tax-based repayment',
      'Non-recourse financing',
      'Stays with property if sold'
    ],
    requirements: [
      'Property value assessment',
      'Current on property taxes',
      'Energy savings verification'
    ],
    eligibility: [
      'Commercial properties',
      'Must be in PACE-enabled district',
      'Minimum property value requirements'
    ]
  },
  {
    id: 'green1',
    type: 'Green Loan',
    amount: 1000000,
    term: 7,
    rate: 3.5,
    details: 'Specialized financing for energy-efficient improvements',
    lender: 'GreenBank',
    benefits: [
      'Lower interest rates',
      'Flexible terms',
      'Quick approval process',
      'No prepayment penalties'
    ],
    requirements: [
      'Energy audit',
      'Project scope documentation',
      'Financial statements'
    ],
    eligibility: [
      'All commercial properties',
      'Minimum credit score requirements',
      'Debt service coverage ratio > 1.2'
    ]
  },
  {
    id: 'cpace1',
    type: 'C-PACE',
    amount: 2000000,
    term: 15,
    rate: 4.5,
    details: 'Commercial PACE financing with longer terms',
    lender: 'CleanFund',
    benefits: [
      'Long-term financing',
      'Off-balance sheet treatment',
      'Cash flow positive structure',
      'Competitive rates'
    ],
    requirements: [
      'Energy savings analysis',
      'Property valuation',
      'Lender consent'
    ],
    eligibility: [
      'Commercial and industrial properties',
      'Located in C-PACE district',
      'Property value > $1M'
    ]
  },
  {
    id: 'sba1',
    type: 'SBA 504 Green',
    amount: 500000,
    term: 20,
    rate: 5.0,
    details: 'SBA financing for energy-efficient projects',
    lender: 'CDC Small Business',
    benefits: [
      'Low down payment',
      'Fixed interest rates',
      'Long amortization',
      'Include soft costs'
    ],
    requirements: [
      'Business financial statements',
      'Energy reduction plan',
      'Job creation/retention'
    ],
    eligibility: [
      'Small businesses',
      'Owner-occupied properties',
      'Meet SBA size standards'
    ]
  },
  {
    id: 'bank1',
    type: 'Bank Term Loan',
    amount: 3000000,
    term: 12,
    rate: 4.2,
    details: 'Traditional bank financing for green improvements',
    lender: 'Sustainable Capital',
    benefits: [
      'Established process',
      'Relationship banking',
      'Flexible use of funds',
      'Local support'
    ],
    requirements: [
      'Business plan',
      'Financial statements',
      'Collateral'
    ],
    eligibility: [
      'All property types',
      'Strong credit history',
      'Proven cash flow'
    ]
  }
];