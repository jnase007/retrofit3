/*
  # Admin Schema Setup

  1. New Tables
    - `admin_users` - Store admin user information
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `settings` - Global application settings
      - `key` (text, primary key)
      - `value` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
*/

-- Admin users table
CREATE TABLE admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can access admin_users"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (email IN (SELECT email FROM admin_users));

-- Settings table
CREATE TABLE settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can manage settings"
  ON settings
  FOR ALL
  TO authenticated
  USING (auth.email() IN (SELECT email FROM admin_users));

-- Add updated_at triggers
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial admin user (replace with your email)
INSERT INTO admin_users (email) VALUES ('admin@retrofitnow.ai');

-- Insert initial settings
INSERT INTO settings (key, value) VALUES
  ('pricing', '{"starter": 1, "pro": 3, "enterprise": 5}'),
  ('openai', '{"api_key": "", "model": "gpt-3.5-turbo"}'),
  ('storage', '{"max_file_size": 10485760, "allowed_types": ["pdf", "csv"]}');