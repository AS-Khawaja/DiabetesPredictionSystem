
import React, { useState } from 'react';
import Header from '@/components/Header';
import PredictionForm from '@/components/PredictionForm';
import ResultDisplay from '@/components/ResultDisplay';

const Index = () => {
  const [prediction, setPrediction] = useState<{
    result: boolean;
    probability: number;
  } | null>(null);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        
        <div className="mb-8">
          <PredictionForm onPredict={setPrediction} />
        </div>
        
        <ResultDisplay prediction={prediction} />
        
        <footer className="mt-12 text-center text-sm text-db-400">
          <p>© {new Date().getFullYear()} Diabetes Risk Prediction Tool</p>
          <p className="mt-1">This tool is for educational purposes only and does not provide medical advice.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
