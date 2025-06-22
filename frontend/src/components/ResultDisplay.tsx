
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface ResultDisplayProps {
  prediction: {
    result: boolean;
    probability: number;
  } | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ prediction }) => {
  if (!prediction) return null;
  
  const { result } = prediction;
  
  return (
    <div className="glass-panel p-6 mt-8 text-center">
      <h2 className="text-2xl font-semibold mb-6">Prediction Result</h2>
      
      <Alert 
        variant={result ? "destructive" : "default"}
        className={`mt-4 ${result ? 'bg-red-500/20 border border-red-500/30' : 'bg-green-500/20 border border-green-500/30'}`}
      >
        <AlertTitle className={`text-xl font-bold ${result ? 'text-red-400' : 'text-green-400'}`}>
          {result ? 'Positive' : 'Negative'}
        </AlertTitle>
        <AlertDescription className="mt-2 text-db-100">
          {result 
            ? 'Based on the provided data, the prediction indicates a positive result for diabetes risk. Consider consulting with a healthcare professional.'
            : 'Based on the provided data, the prediction indicates a negative result for diabetes risk. However, maintaining a healthy lifestyle is always recommended.'
          }
          <p className="mt-4 text-xs text-db-300 italic">
            Note: This is a simulation for demonstration purposes only and should not be used for medical diagnosis.
          </p>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ResultDisplay;
