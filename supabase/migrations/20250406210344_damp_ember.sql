DO $$ 
BEGIN
  -- Only create partners table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'partners') THEN
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

    -- Enable RLS
    ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

    -- Create policy
    CREATE POLICY "Only admins can manage partners"
      ON partners
      FOR ALL
      TO authenticated
      USING (auth.email() IN (SELECT email FROM admin_users));

    -- Add updated_at trigger
    CREATE TRIGGER update_partners_updated_at
      BEFORE UPDATE ON partners
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  -- Add referral tracking columns if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'partner_referral_code'
  ) THEN
    ALTER TABLE users 
    ADD COLUMN partner_referral_code text REFERENCES partners(referral_code);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'loan_requests' AND column_name = 'partner_referral_code'
  ) THEN
    ALTER TABLE loan_requests 
    ADD COLUMN partner_referral_code text REFERENCES partners(referral_code);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'contractor_requests' AND column_name = 'partner_referral_code'
  ) THEN
    ALTER TABLE contractor_requests 
    ADD COLUMN partner_referral_code text REFERENCES partners(referral_code);
  END IF;

  -- Insert initial partners if they don't exist
  IF NOT EXISTS (SELECT 1 FROM partners WHERE referral_code = 'RUDIN1') THEN
    INSERT INTO partners (name, logo_url, description, commission_rate, referral_code) VALUES
    (
      'Rudin Management',
      'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos/rudin-logo.png',
      'Retrofitted Empire State Building, $4.4M saved annually',
      0.01,
      'RUDIN1'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM partners WHERE referral_code = 'PETROS1') THEN
    INSERT INTO partners (name, logo_url, description, commission_rate, referral_code) VALUES
    (
      'Petros PACE Finance',
      'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos/petros-logo.png',
      '$500M+ funded in C-PACE financing',
      0.03,
      'PETROS1'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM partners WHERE referral_code = 'JLL1') THEN
    INSERT INTO partners (name, logo_url, description, commission_rate, referral_code) VALUES
    (
      'JLL',
      'https://nkihovzonhpuukupveta.supabase.co/storage/v1/object/public/logos/jll-logo.png',
      'Sustainability leader, $15M saved through retrofits',
      0.03,
      'JLL1'
    );
  END IF;
END $$;