import { Resend } from 'npm:resend@3.2.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

    const { data, error } = await resend.emails.send({
      from: 'RetrofitNow <no-reply@retrofitnow.ai>',
      to: [email],
      subject: 'Your RetrofitNow Whitepaper: Top 5 Retrofit Mistakes',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #10B981;">Your Retrofit Mistakes Whitepaper</h1>
          
          <p>Thank you for your interest in optimizing your building's performance!</p>
          
          <p>Download your whitepaper here:</p>
          
          <a href="https://retrofitnow.ai/whitepapers/top-5-mistakes.pdf" 
             style="display: inline-block; background-color: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
            Download Whitepaper
          </a>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #10B981; margin-top: 0;">What's Inside:</h3>
            <ul style="padding-left: 20px;">
              <li>Why ignoring LL97 could cost you $268/ton in fines</li>
              <li>The hidden costs of postponing HVAC upgrades</li>
              <li>How to maximize tax incentives and rebates</li>
              <li>Smart sequencing for multi-year retrofits</li>
              <li>Tenant engagement strategies that boost ROI</li>
            </ul>
          </div>
          
          <p>Ready to start saving? <a href="https://retrofitnow.ai/quick-check" style="color: #10B981;">Check your building's potential</a></p>
        </div>
      `,
    });

    if (error) throw error;

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
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to send whitepaper'
      }),
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