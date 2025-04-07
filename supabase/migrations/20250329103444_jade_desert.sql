/*
  # Add Subscriptions Table

  1. New Tables
    - `subscriptions` - Store Stripe subscription data
      - `id` (text, primary key) - Stripe subscription ID
      - `customer_id` (text) - Stripe customer ID
      - `user_id` (uuid) - Reference to users table
      - `status` (text) - Subscription status
      - `price_id` (text) - Stripe price ID
      - `quantity` (integer) - Square footage
      - `current_period_end` (timestamptz) - Current billing period end
      - `cancel_at_period_end` (boolean) - Whether subscription will cancel at period end
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for users to view their own subscriptions
*/

CREATE TABLE subscriptions (
  id text PRIMARY KEY,
  customer_id text NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL,
  price_id text NOT NULL,
  quantity integer NOT NULL,
  current_period_end timestamptz NOT NULL,
  cancel_at_period_end boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscriptions"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Add updated_at trigger
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();