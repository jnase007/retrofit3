/*
  # Add Partners and Referral Tracking

  1. New Tables
    - `partners` - Store partner information and commission rates
      - `id` (uuid, primary key)
      - `name` (text)
      - `logo_url` (text)
      - `description` (text)
      - `commission_rate` (numeric)
      - `referral_code` (text, unique)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Changes to Existing Tables
    - Add `partner_referral_code` to users table
    - Add `partner_referral_code` to loan_requests table
    - Add `partner_referral_code` to contractor_requests table

  3. Security
    - Enable RLS
    - Add policies for admin access
*/

-- Partners table
CREATE TABLE partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  description text NOT NULL,
  commission_rate numeric NOT NULL,
  referral_code text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can manage partners"
  ON partners
  FOR ALL
  TO authenticated
  USING (auth.email() IN (SELECT email FROM admin_users));

-- Add referral tracking to existing tables
ALTER TABLE users 
ADD COLUMN partner_referral_code text REFERENCES partners(referral_code);

ALTER TABLE loan_requests 
ADD COLUMN partner_referral_code text REFERENCES partners(referral_code);

ALTER TABLE contractor_requests 
ADD COLUMN partner_referral_code text REFERENCES partners(referral_code);

-- Add updated_at trigger
CREATE TRIGGER update_partners_updated_at
  BEFORE UPDATE ON partners
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial partners
INSERT INTO partners (name, logo_url, description, commission_rate, referral_code) VALUES
  (
    'Rudin Management',
    'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos/rudin-logo.png',
    'Retrofitted Empire State Building, $4.4M saved annually',
    0.01,
    'RUDIN1'
  ),
  (
    'Petros PACE Finance',
    'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos/petros-logo.png',
    '$500M+ funded in C-PACE financing',
    0.03,
    'PETROS1'
  ),
  (
    'JLL',
    'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos/jll-logo.png',
    'Sustainability leader, $15M saved through retrofits',
    0.03,
    'JLL1'
  );