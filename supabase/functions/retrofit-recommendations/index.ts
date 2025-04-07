import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import OpenAI from 'npm:openai@4.28.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RetrofitParams {
  size: number;
  location: string;
  buildingAge?: number;
  energyUse?: number;
  propertyType: string;
}

interface RetrofitRecommendation {
  title: string;
  description: string;
  estimatedCost: number;
  estimatedSavings: number;
  paybackPeriod: number;
  co2Reduction: number;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const params = await req.json() as RetrofitParams;

    // Initialize OpenAI client with API key
    const openai = new OpenAI({ 
      apiKey: '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'
    });

    // Calculate base metrics
    const baseMetrics = calculateBaseMetrics(params);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in building retrofits and energy efficiency. Provide detailed, actionable recommendations.',
        },
        {
          role: 'user',
          content: `Analyze a ${params.size.toLocaleString()} sq ft ${params.propertyType} property in ${params.location}${
            params.buildingAge ? `, built in ${params.buildingAge}` : ''
          }${params.energyUse ? `, using ${params.energyUse.toLocaleString()} kWh/year` : ''}.

          Base metrics to consider:
          - Annual energy cost: $${baseMetrics.energyCost.toLocaleString()}
          - Current emissions: ${baseMetrics.emissions.toLocaleString()} tons CO2/year
          - Typical retrofit budget: $${baseMetrics.budget.toLocaleString()}

          Provide 3 retrofit recommendations in JSON format:
          [
            {
              "title": "string",
              "description": "string",
              "estimatedCost": number,
              "estimatedSavings": number,
              "paybackPeriod": number,
              "co2Reduction": number
            }
          ]

          Focus on high-impact, cost-effective measures with clear ROI.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    // Parse and validate the response
    let recommendations: RetrofitRecommendation[];
    try {
      const parsedResponse = JSON.parse(response.choices[0].message.content);
      recommendations = Array.isArray(parsedResponse) ? parsedResponse : parsedResponse.recommendations;
      
      // Validate the response format
      if (!Array.isArray(recommendations) || recommendations.length === 0) {
        throw new Error('Invalid recommendations format');
      }

      // Validate each recommendation
      recommendations.forEach(rec => {
        if (!rec.title || !rec.description || 
            typeof rec.estimatedCost !== 'number' || 
            typeof rec.estimatedSavings !== 'number' ||
            typeof rec.paybackPeriod !== 'number' ||
            typeof rec.co2Reduction !== 'number') {
          throw new Error('Invalid recommendation format');
        }
      });
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      throw new Error('Failed to generate recommendations');
    }

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
    console.error('Error in retrofit recommendations:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An error occurred while generating recommendations'
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

function calculateBaseMetrics(params: RetrofitParams) {
  // Default values
  let energyCostPerSqFt = 2.50; // $2.50 per sq ft annually
  let emissionsPerKwh = 0.000435; // Metric tons CO2 per kWh
  let budgetPerSqFt = 5.00; // $5 per sq ft retrofit budget

  // Adjust based on location
  const locationLower = params.location.toLowerCase();
  if (locationLower.includes('new york') || locationLower.includes('nyc')) {
    energyCostPerSqFt = 3.00;
    budgetPerSqFt = 6.00;
  } else if (locationLower.includes('california')) {
    energyCostPerSqFt = 2.75;
    emissionsPerKwh = 0.000385; // Lower due to cleaner grid
  }

  // Adjust for building age if provided
  if (params.buildingAge) {
    const age = new Date().getFullYear() - params.buildingAge;
    if (age > 50) {
      energyCostPerSqFt *= 1.3;
      budgetPerSqFt *= 1.2;
    } else if (age > 25) {
      energyCostPerSqFt *= 1.15;
      budgetPerSqFt *= 1.1;
    }
  }

  // Calculate metrics
  const annualEnergyCost = params.energyUse 
    ? (params.energyUse * 0.12) // $0.12 per kWh if actual usage provided
    : (params.size * energyCostPerSqFt);

  const annualEmissions = params.energyUse
    ? (params.energyUse * emissionsPerKwh)
    : (annualEnergyCost * 0.004); // Rough estimate based on energy cost

  const retrofitBudget = params.size * budgetPerSqFt;

  return {
    energyCost: Math.round(annualEnergyCost),
    emissions: Math.round(annualEmissions),
    budget: Math.round(retrofitBudget),
  };
}