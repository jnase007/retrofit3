import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with the public key
const stripePromise = loadStripe('pk_test_51R7wce06nf7CzJjQOcTRExWUO8DRy2gumS9hkUoB9KMNa6Y062i6y3u4ljP7hTupNiMxJ1ElsoRaiJ2DUhjr5Vs300qPiq2RmY');

export interface CreateCheckoutSessionParams {
  priceId: string;
  squareFootage: number;
  customerId?: string;
}

export async function createCheckoutSession({ priceId, squareFootage, customerId }: CreateCheckoutSessionParams) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        priceId,
        squareFootage,
        customerId,
        successUrl: `${window.location.origin}/billing/success`,
        cancelUrl: `${window.location.origin}/pricing`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const { url } = await response.json();
    
    // Redirect to Stripe Checkout
    window.location.href = url;
  } catch (err) {
    console.error('Error creating checkout session:', err);
    throw err;
  }
}

export async function getSubscription(subscriptionId: string) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ subscriptionId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch subscription');
    }

    return await response.json();
  } catch (err) {
    console.error('Error fetching subscription:', err);
    throw err;
  }
}

export async function updateSubscriptionQuantity(subscriptionId: string, squareFootage: number) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/update-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        subscriptionId,
        quantity: squareFootage,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update subscription');
    }

    return await response.json();
  } catch (err) {
    console.error('Error updating subscription:', err);
    throw err;
  }
}