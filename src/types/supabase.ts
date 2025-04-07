export type User = {
  id: string;
  email: string;
  full_name: string | null;
  company_name: string | null;
  created_at: string;
  updated_at: string;
};

export type Property = {
  id: string;
  user_id: string;
  name: string;
  address: string;
  square_footage: number;
  building_type: string;
  year_built: number;
  created_at: string;
  updated_at: string;
};

export type EnergyData = {
  id: string;
  property_id: string;
  date: string;
  energy_usage: number;
  carbon_emissions: number;
  created_at: string;
};

export type RetrofitProject = {
  id: string;
  property_id: string;
  name: string;
  description: string | null;
  estimated_cost: number;
  estimated_savings: number;
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  start_date: string | null;
  completion_date: string | null;
  created_at: string;
  updated_at: string;
};