/*
  # Add Sample Data for Development

  1. Changes
    - Add test user to auth.users first
    - Add user profile data
    - Add sample properties with proper UUIDs
    - Add sample retrofit projects with proper UUIDs

  2. Security
    - Maintain referential integrity with auth.users table
    - Use proper UUID format for all IDs
*/

-- First create the user in auth.users
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data
)
VALUES (
  '123e4567-e89b-12d3-a456-426614174000',
  'justin@brandastic.com',
  crypt('password123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Justin Nassie","company_name":"Brandastic","company_position":"Chief Technology Officer"}'
);

-- Now we can safely add the user profile
INSERT INTO public.users (
  id,
  email,
  full_name,
  company_name,
  company_position,
  avatar_url
)
VALUES (
  '123e4567-e89b-12d3-a456-426614174000',
  'justin@brandastic.com',
  'Justin Nassie',
  'Brandastic',
  'Chief Technology Officer',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
);

-- Add sample properties
INSERT INTO properties (
  id,
  user_id,
  name,
  address,
  square_footage,
  building_type,
  year_built
)
VALUES
  (
    'a1b2c3d4-e5f6-47a8-b9c0-123456789abc',
    '123e4567-e89b-12d3-a456-426614174000',
    'Empire State Building',
    '350 5th Ave, New York, NY 10118',
    2768591,
    'Office',
    1931
  ),
  (
    'b2c3d4e5-f6a7-48b9-c0d1-234567890bcd',
    '123e4567-e89b-12d3-a456-426614174000',
    'Chrysler Building',
    '405 Lexington Ave, New York, NY 10174',
    1195000,
    'Office',
    1930
  ),
  (
    'c3d4e5f6-a7b8-49c0-d1e2-345678901cde',
    '123e4567-e89b-12d3-a456-426614174000',
    'One World Trade Center',
    '285 Fulton St, New York, NY 10007',
    3501274,
    'Mixed Use',
    2014
  );

-- Add sample retrofit projects
INSERT INTO retrofit_projects (
  id,
  property_id,
  name,
  description,
  estimated_cost,
  estimated_savings,
  status,
  start_date,
  completion_date
)
VALUES
  (
    'd4e5f6a7-b8c9-40d1-e2f3-456789012def',
    'a1b2c3d4-e5f6-47a8-b9c0-123456789abc',
    'HVAC Modernization',
    'Complete upgrade of HVAC systems with smart controls and energy recovery',
    2500000,
    450000,
    'in_progress',
    '2025-01-15',
    '2025-07-15'
  ),
  (
    'e5f6a7b8-c9d0-41e2-f3a4-567890123efg',
    'b2c3d4e5-f6a7-48b9-c0d1-234567890bcd',
    'LED Lighting Retrofit',
    'Full conversion to LED lighting with occupancy sensors',
    750000,
    125000,
    'completed',
    '2024-11-01',
    '2025-02-01'
  ),
  (
    'f6a7b8c9-d0e1-42f3-a4b5-678901234fgh',
    'c3d4e5f6-a7b8-49c0-d1e2-345678901cde',
    'Solar Installation',
    'Rooftop solar array with battery storage',
    3500000,
    600000,
    'planned',
    '2025-06-01',
    '2025-12-31'
  );