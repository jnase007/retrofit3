import { createClient } from '@supabase/supabase-js';
import { sendWelcomeEmail } from './email';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    redirectTo: `${window.location.origin}/auth/callback`,
  },
});

// Listen for auth state changes
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN' && session?.user) {
    const { user } = session;
    const { user_metadata } = user;

    try {
      // Update user profile with OAuth data
      const { error } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          email: user.email,
          full_name: user_metadata.full_name || user_metadata.name,
          company_name: user_metadata.company_name || user_metadata.company,
          oauth_provider: user.app_metadata.provider,
          oauth_id: user.app_metadata.provider_id,
          avatar_url: user_metadata.avatar_url,
        });

      if (error) {
        console.error('Error updating user profile:', error);
      }

      // Send welcome email for new users
      if (event === 'SIGNED_UP') {
        await sendWelcomeEmail({
          email: user.email!,
          full_name: user_metadata.full_name || user_metadata.name,
        });
      }

      // Redirect to dashboard after successful sign in
      window.location.href = '/user-dashboard';
    } catch (err) {
      console.error('Error in auth state change:', err);
    }
  }
});

export { supabase };