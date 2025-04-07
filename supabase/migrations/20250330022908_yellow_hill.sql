/*
  # Update Loan Requests Table

  1. Changes
    - Add new columns if they don't exist
    - Add missing indexes and constraints
    - Update RLS policies
*/

DO $$ BEGIN
  -- Add columns if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'loan_requests' AND column_name = 'property_id'
  ) THEN
    ALTER TABLE loan_requests ADD COLUMN property_id uuid REFERENCES properties(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'loan_requests' AND column_name = 'retrofit_cost'
  ) THEN
    ALTER TABLE loan_requests ADD COLUMN retrofit_cost numeric;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'loan_requests' AND column_name = 'timeline'
  ) THEN
    ALTER TABLE loan_requests ADD COLUMN timeline text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'loan_requests' AND column_name = 'funded_amount'
  ) THEN
    ALTER TABLE loan_requests ADD COLUMN funded_amount numeric;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'loan_requests' AND column_name = 'fee'
  ) THEN
    ALTER TABLE loan_requests ADD COLUMN fee numeric;
  END IF;

  -- Update or create RLS policies
  DROP POLICY IF EXISTS "Users can manage own loan requests" ON loan_requests;
  CREATE POLICY "Users can manage own loan requests"
    ON loan_requests
    FOR ALL
    TO authenticated
    USING (user_id = auth.uid());

  -- Add updated_at trigger if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_loan_requests_updated_at'
  ) THEN
    CREATE TRIGGER update_loan_requests_updated_at
      BEFORE UPDATE ON loan_requests
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

END $$;