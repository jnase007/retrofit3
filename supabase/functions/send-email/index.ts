import { Resend } from 'npm:resend@3.2.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  userEmail: string;
  subject: string;
  message: string;
  template?: string;
  data?: Record<string, any>;
}

const templates = {
  welcome: (data: any) => ({
    subject: 'Welcome to RetrofitNow!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #10B981;">Welcome to RetrofitNow!</h1>
        <p>Hi ${data.name || 'there'},</p>
        <p>Thank you for joining RetrofitNow! We're excited to help you transform your real estate portfolio with sustainable solutions.</p>
        <p>Based on typical client results, properties your size could save:</p>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #10B981; margin-top: 0;">Potential Annual Savings</h3>
          <p style="font-size: 24px; font-weight: bold;">$750,000+</p>
          <p>Through energy efficiency improvements and compliance optimization</p>
        </div>
        <p>Ready to get started?</p>
        <a href="https://retrofitnow.ai/quick-check" 
           style="background-color: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Check Your Property Now
        </a>
      </div>
    `
  }),
  verification: (data: any) => ({
    subject: 'Verify your email',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #10B981;">Verify Your Email</h1>
        <p>Hi there,</p>
        <p>Please click the button below to verify your email address:</p>
        <a href="${data.link}" 
           style="background-color: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">
          Verify Email
        </a>
        <p style="color: #666; font-size: 14px;">If you didn't request this email, you can safely ignore it.</p>
      </div>
    `
  })
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    const { userEmail, subject, message, template, data } = await req.json() as EmailRequest;

    let emailContent;
    if (template && templates[template as keyof typeof templates]) {
      const templateFn = templates[template as keyof typeof templates];
      emailContent = templateFn(data);
    } else {
      emailContent = {
        subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            ${message}
          </div>
        `
      };
    }

    const { error } = await resend.emails.send({
      from: 'RetrofitNow <no-reply@retrofitnow.ai>',
      to: [userEmail],
      subject: emailContent.subject,
      html: emailContent.html,
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
        error: error instanceof Error ? error.message : 'Failed to send email'
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