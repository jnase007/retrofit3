/*
  # Add Loan and Contractor Request Tables

  1. New Tables
    - `loan_requests` - Store funding requests
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `amount` (numeric)
      - `property_size` (numeric)
      - `location` (text)
      - `retrofit_plan` (jsonb)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `contractor_requests` - Store contractor connection requests
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `property_size` (numeric)
      - `location` (text)
      - `retrofit_plan` (jsonb)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for users to manage their own requests
*/

-- Loan requests table
CREATE TABLE loan_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  amount numeric NOT NULL,
  property_size numeric NOT NULL,
  location text NOT NULL,
  retrofit_plan jsonb NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE loan_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own loan requests"
  ON loan_requests
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Contractor requests table
CREATE TABLE contractor_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  property_size numeric NOT NULL,
  location text NOT NULL,
  retrofit_plan jsonb NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contractor_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own contractor requests"
  ON contractor_requests
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Add updated_at triggers
CREATE TRIGGER update_loan_requests_updated_at
  BEFORE UPDATE ON loan_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contractor_requests_updated_at
  BEFORE UPDATE ON contractor_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();