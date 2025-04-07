import { createClient } from 'npm:@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RetrofitPredictionRequest {
  buildingData: {
    squareFootage: number;
    buildingAge: number;
    location: string;
    currentEnergyUsage: number;
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { buildingData } = await req.json() as RetrofitPredictionRequest;

    // Get OpenAI API key from environment variables
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not found in environment variables');
    }

    const prompt = `Given a building with the following characteristics:
      - Square footage: ${buildingData.squareFootage}
      - Building age: ${buildingData.buildingAge}
      - Location: ${buildingData.location}
      - Current annual energy usage: ${buildingData.currentEnergyUsage} kWh

      Provide detailed retrofit recommendations in the following JSON format:
      {
        "recommendations": [
          {
            "title": "string",
            "description": "string",
            "estimatedCost": number,
            "estimatedSavings": number,
            "paybackPeriod": number,
            "co2Reduction": number
          }
        ]
      }

      Consider:
      1. Local building regulations and compliance requirements
      2. Energy efficiency best practices
      3. Cost-effective solutions with good ROI
      4. Modern sustainable technologies
      5. Building-specific constraints`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in building energy efficiency, retrofitting, and sustainability. Provide detailed, practical recommendations based on industry best practices and real-world cost considerations.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const recommendations = JSON.parse(data.choices[0].message.content);

    return new Response(
      JSON.stringify(recommendations),
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