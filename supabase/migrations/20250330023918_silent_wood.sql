/*
  # Add Social Login Support

  1. Changes
    - Add OAuth-related columns to users table
      - `oauth_provider` (text) - The OAuth provider (e.g., 'linkedin', 'google')
      - `oauth_id` (text) - The unique ID from the OAuth provider
      - `avatar_url` (text) - Profile picture URL from OAuth provider
      - `company_position` (text) - Job title/position from LinkedIn
    
  2. Security
    - Update RLS policies to handle OAuth-authenticated users
*/

-- Add OAuth columns to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS oauth_provider text,
ADD COLUMN IF NOT EXISTS oauth_id text,
ADD COLUMN IF NOT EXISTS avatar_url text,
ADD COLUMN IF NOT EXISTS company_position text;

-- Add unique constraint for OAuth provider + ID combination
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'users_oauth_provider_id_key'
  ) THEN
    ALTER TABLE users 
    ADD CONSTRAINT users_oauth_provider_id_key 
    UNIQUE (oauth_provider, oauth_id);
  END IF;
END $$;

-- Update RLS policies to handle OAuth users
DROP POLICY IF EXISTS "Users can view own profile" ON users;
CREATE POLICY "Users can view own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create index for OAuth lookups
CREATE INDEX IF NOT EXISTS users_oauth_lookup_idx 
ON users(oauth_provider, oauth_id);

-- Add trigger to sync OAuth data on user update
CREATE OR REPLACE FUNCTION sync_oauth_user_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Only update OAuth fields if they exist in NEW
  IF NEW.oauth_provider IS NOT NULL THEN
    NEW.updated_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS sync_oauth_user_data_trigger ON users;
CREATE TRIGGER sync_oauth_user_data_trigger
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION sync_oauth_user_data();