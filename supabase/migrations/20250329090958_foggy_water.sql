/*
  # Initial Schema Setup for Retrofit Now

  1. New Tables
    - `users` - Extended user profile data
      - `id` (uuid, primary key, matches auth.users)
      - `email` (text)
      - `full_name` (text)
      - `company_name` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `properties` - Building/property information
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `name` (text)
      - `address` (text)
      - `square_footage` (numeric)
      - `building_type` (text)
      - `year_built` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `energy_data` - Property energy consumption data
      - `id` (uuid, primary key)
      - `property_id` (uuid, references properties)
      - `date` (date)
      - `energy_usage` (numeric)
      - `carbon_emissions` (numeric)
      - `created_at` (timestamp)

    - `retrofit_projects` - Retrofit project tracking
      - `id` (uuid, primary key)
      - `property_id` (uuid, references properties)
      - `name` (text)
      - `description` (text)
      - `estimated_cost` (numeric)
      - `estimated_savings` (numeric)
      - `status` (text)
      - `start_date` (date)
      - `completion_date` (date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users,
  email text UNIQUE NOT NULL,
  full_name text,
  company_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Properties table
CREATE TABLE properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  address text NOT NULL,
  square_footage numeric NOT NULL,
  building_type text NOT NULL,
  year_built integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own properties"
  ON properties
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Energy data table
CREATE TABLE energy_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  energy_usage numeric NOT NULL,
  carbon_emissions numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE energy_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own property energy data"
  ON energy_data
  FOR ALL
  TO authenticated
  USING (
    property_id IN (
      SELECT id FROM properties WHERE user_id = auth.uid()
    )
  );

-- Retrofit projects table
CREATE TABLE retrofit_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  estimated_cost numeric NOT NULL,
  estimated_savings numeric NOT NULL,
  status text NOT NULL DEFAULT 'planned',
  start_date date,
  completion_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE retrofit_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own retrofit projects"
  ON retrofit_projects
  FOR ALL
  TO authenticated
  USING (
    property_id IN (
      SELECT id FROM properties WHERE user_id = auth.uid()
    )
  );

-- Add updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_retrofit_projects_updated_at
  BEFORE UPDATE ON retrofit_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();