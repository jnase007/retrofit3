import { createClient } from '@supabase/supabase-js';

interface QuickCheckParams {
  size: number;
  location: string;
}

interface RetrofitParams {
  size: number;
  location: string;
  buildingAge?: number;
  energyUse?: number;
  propertyType: string;
}

export async function getQuickAssessment({ size, location }: QuickCheckParams) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/quick-assessment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ size, location }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get assessment: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting quick assessment:', error);
    throw error;
  }
}

export async function getRetrofitRecommendations(params: RetrofitParams) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/retrofit-recommendations`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(params),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get recommendations: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting retrofit recommendations:', error);
    throw error;
  }
}

export async function analyzeBuildingData(data: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-building-data`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ data }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to analyze data: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error analyzing building data:', error);
    throw error;
  }
}