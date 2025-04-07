import React, { useState } from 'react';
import { AlertCircle, FileText, Upload } from 'lucide-react';
import { extractTextFromPDF, processCSV, analyzeFileData } from '../lib/fileProcessing';
import { supabase } from '../lib/supabase';

interface FileProcessorProps {
  propertyId: string;
  onProcessingComplete: (results: any) => void;
}

export const FileProcessor: React.FC<FileProcessorProps> = ({ propertyId, onProcessingComplete }) => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setProcessing(true);
    setError(null);
    setProgress('Uploading file...');

    try {
      // 1. Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${propertyId}/${Math.random().toString(36).slice(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('property-files')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Extract data from file
      setProgress('Extracting data...');
      let extractedData: string | Record<string, any>[] = '';

      if (file.type === 'application/pdf') {
        extractedData = await extractTextFromPDF(file);
      } else if (file.type === 'text/csv') {
        const csvData = await processCSV(file);
        extractedData = JSON.stringify(csvData);
      } else {
        throw new Error('Unsupported file type');
      }

      // 3. Analyze the extracted data
      setProgress('Analyzing data...');
      const analysis = await analyzeFileData(extractedData.toString());

      // 4. Update property data in Supabase
      if (analysis.energyUsage || analysis.estimatedSavings) {
        const { error: updateError } = await supabase
          .from('properties')
          .update({
            energy_usage: analysis.energyUsage,
            estimated_savings: analysis.estimatedSavings,
            last_analysis: new Date().toISOString(),
          })
          .eq('id', propertyId);

        if (updateError) throw updateError;
      }

      // 5. Call the completion handler with the results
      onProcessingComplete(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing the file');
      console.error('Error processing file:', err);
    } finally {
      setProcessing(false);
      setProgress(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          onChange={handleFileUpload}
          accept=".pdf,.csv"
          className="hidden"
          id="file-upload"
          disabled={processing}
        />
        <label
          htmlFor="file-upload"
          className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
            processing
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 cursor-pointer'
          }`}
        >
          <Upload className="h-5 w-5 mr-2" />
          {processing ? 'Processing...' : 'Upload File'}
        </label>
        <p className="mt-2 text-sm text-gray-500">
          Upload utility bills (PDF/CSV), property plans (PDF), or lease data (PDF)
        </p>
      </div>

      {progress && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex">
            <FileText className="h-5 w-5 text-blue-400 mr-2" />
            <span className="text-sm text-blue-700">{progress}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};