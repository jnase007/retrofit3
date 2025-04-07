import { supabase } from './supabase';

interface EmailParams {
  userEmail: string;
  subject?: string;
  message?: string;
  template?: 'welcome' | 'verification';
  data?: Record<string, any>;
}

export async function sendEmail({ userEmail, subject, message, template, data }: EmailParams) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ userEmail, subject, message, template, data }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send email: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Example usage:
export async function sendWelcomeEmail(user: { email: string; full_name?: string }) {
  return sendEmail({
    userEmail: user.email,
    template: 'welcome',
    data: {
      name: user.full_name,
    },
  });
}

export async function sendVerificationEmail(email: string, link: string) {
  return sendEmail({
    userEmail: email,
    template: 'verification',
    data: {
      link,
    },
  });
}