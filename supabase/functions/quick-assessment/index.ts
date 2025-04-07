import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import OpenAI from 'npm:openai@4.28.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QuickCheckParams {
  size: number;
  location: string;
}

interface Assessment {
  savings: number;
  risk: string;
  deadline: string;
  recommendations: string[];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { size, location } = await req.json() as QuickCheckParams;

    // Initialize OpenAI client with API key
    const openai = new OpenAI({ 
      apiKey: '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'
    });

    // Calculate base values based on location and size
    const baseValues = calculateBaseValues(location, size);

    // Get AI-powered assessment
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in building energy efficiency and compliance regulations. Provide concise, actionable insights.',
        },
        {
          role: 'user',
          content: `Analyze a ${size.toLocaleString()} sq ft commercial property in ${location}.
          Base values to consider:
          - Annual energy cost: $${baseValues.energyCost.toLocaleString()}
          - Compliance deadline: ${baseValues.deadline}
          - Potential fines: $${baseValues.fines.toLocaleString()}
          
          Provide a detailed assessment including:
          1. Estimated annual savings potential (20-40% of energy costs)
          2. Compliance risk evaluation
          3. Key recommendations (3-5 points)
          
          Format response as JSON with fields:
          {
            "savings": number (annual savings in USD),
            "risk": string (clear risk statement),
            "deadline": string (compliance deadline),
            "recommendations": string[] (list of recommendations)
          }`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: "json_object" }
    });

    // Parse and validate the response
    let assessment: Assessment;
    try {
      assessment = JSON.parse(response.choices[0].message.content) as Assessment;
      
      // Validate required fields
      if (!assessment.savings || !assessment.risk || !assessment.deadline || !assessment.recommendations) {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      throw new Error('Failed to generate assessment');
    }

    return new Response(
      JSON.stringify(assessment),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error in quick assessment:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An error occurred during assessment'
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

function calculateBaseValues(location: string, squareFootage: number) {
  // Default values
  let energyCostPerSqFt = 2.50; // $2.50 per sq ft annually
  let deadline = '2026';
  let fineRate = 268; // $268 per metric ton of CO2

  // Adjust based on location
  const locationLower = location.toLowerCase();
  if (locationLower.includes('new york') || locationLower.includes('nyc')) {
    energyCostPerSqFt = 3.00;
    deadline = '2024';
    fineRate = 268;
  } else if (locationLower.includes('boston')) {
    energyCostPerSqFt = 2.75;
    deadline = '2025';
    fineRate = 234;
  } else if (locationLower.includes('chicago')) {
    energyCostPerSqFt = 2.25;
    deadline = '2025';
    fineRate = 200;
  }

  const annualEnergyCost = squareFootage * energyCostPerSqFt;
  const estimatedEmissions = (annualEnergyCost / 1000) * 4.75; // Rough estimate of MT CO2
  const potentialFines = estimatedEmissions * fineRate;

  return {
    energyCost: Math.round(annualEnergyCost),
    deadline,
    fines: Math.round(potentialFines),
  };
}