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
    const apiKey = Deno.env.get('RESEND_API_KEY');
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }

    console.log('Initializing Resend with API key...');
    const resend = new Resend(apiKey);

    console.log('Sending test email to justin@brandastic.com...');
    const { data, error } = await resend.emails.send({
      from: 'RetrofitNow <no-reply@retrofitnow.ai>',
      to: ['justin@brandastic.com'],
      subject: 'Test Email from RetrofitNow.ai',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #10B981; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0;">RetrofitNow.ai</h1>
          </div>
          
          <h2 style="color: #333;">Test Email</h2>
          
          <p>Hi Justin,</p>
          
          <p>This is a test email from RetrofitNow.ai to verify our email system is working correctly.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #10B981; margin-top: 0;">Sample Recommendation</h3>
            <p><strong>Project:</strong> HVAC Optimization</p>
            <p><strong>Potential Savings:</strong> $75,000/year</p>
            <p><strong>ROI:</strong> 2.5 years</p>
          </div>

          <p style="margin-top: 20px; color: #666;">
            Best regards,<br>
            The RetrofitNow.ai Team
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      throw error;
    }

    console.log('Email sent successfully:', data);
    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to send test email',
        details: error
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