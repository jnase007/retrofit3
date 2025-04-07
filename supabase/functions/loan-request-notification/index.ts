import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import nodemailer from 'npm:nodemailer@6.9.12';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: Deno.env.get('NOTIFICATION_EMAIL'),
    pass: Deno.env.get('NOTIFICATION_EMAIL_PASSWORD'),
  },
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { loanRequest } = await req.json();

    // Send email notification
    await transporter.sendMail({
      from: Deno.env.get('NOTIFICATION_EMAIL'),
      to: Deno.env.get('BROKER_EMAIL'),
      subject: `New Loan Request: $${loanRequest.amount.toLocaleString()}`,
      text: `
        New loan request details:
        
        Amount: $${loanRequest.amount.toLocaleString()}
        Property Size: ${loanRequest.property_size.toLocaleString()} sq ft
        Retrofit Cost: $${loanRequest.retrofit_cost.toLocaleString()}
        Timeline: ${loanRequest.timeline}
        
        Contact:
        Name: ${loanRequest.name}
        Email: ${loanRequest.email}
        Phone: ${loanRequest.phone || 'Not provided'}
        
        Additional Details:
        ${loanRequest.message || 'No additional details provided'}
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});