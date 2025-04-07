import * as pdfjsLib from 'pdfjs-dist';
import { parse } from 'csv-parse/sync';
import OpenAI from 'openai';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// Initialize OpenAI client with API key from environment variables
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

export async function processCSV(file: File): Promise<Record<string, any>[]> {
  try {
    const text = await file.text();
    const records = parse(text, {
      columns: true,
      skip_empty_lines: true,
    });
    return records;
  } catch (error) {
    console.error('Error processing CSV:', error);
    throw new Error('Failed to process CSV file');
  }
}

export async function analyzeFileData(data: string): Promise<{
  energyUsage?: number;
  recommendations?: string[];
  estimatedSavings?: number;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in analyzing building energy data and providing retrofit recommendations.',
        },
        {
          role: 'user',
          content: `Analyze this building data and extract key information about energy usage, potential savings, and retrofit recommendations. Data: ${data}`,
        },
      ],
    });

    const analysis = response.choices[0].message.content;
    
    // Parse the analysis to extract structured data
    return {
      energyUsage: extractNumberFromText(analysis, 'kWh'),
      recommendations: extractRecommendations(analysis),
      estimatedSavings: extractNumberFromText(analysis, '$'),
    };
  } catch (error) {
    console.error('Error analyzing data:', error);
    throw new Error('Failed to analyze file data');
  }
}

function extractNumberFromText(text: string, unit: string): number | undefined {
  const regex = new RegExp(`\\d+(?:\\.\\d+)?\\s*${unit}`);
  const match = text.match(regex);
  if (match) {
    return parseFloat(match[0].replace(unit, '').trim());
  }
  return undefined;
}

function extractRecommendations(text: string): string[] {
  return text
    .split('\n')
    .filter(line => line.includes('recommend') || line.includes('suggest'))
    .map(line => line.trim());
}