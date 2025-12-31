import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface ResultsData {
  totalSummary: {
    Activities: number;
    'Distance (mi)': number;
    'Moving Time (hr)': number;
    'Elevation Gain (ft)': number;
  };
  yearlySummary: Array<{
    Year: number;
    Activities: number;
    'Distance (mi)': number;
    'Moving Time (hr)': number;
    'Elevation Gain (ft)': number;
  }>;
  charts: {
    distanceHist: any;
    paceDistrib: any;
    monthDistrib: any;
    pie: any;
  };
}

interface ResultsContextType {
  results: ResultsData | null;
  setResults: (data: ResultsData) => void;
  clearResults: () => void;
}

const ResultsContext = createContext<ResultsContextType | null>(null);

export function ResultsProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<ResultsData | null>(null);

  const clearResults = () => setResults(null);

  return (
    <ResultsContext.Provider value={{ results, setResults, clearResults }}>
      {children}
    </ResultsContext.Provider>
  );
}

export const useResults = () => {
  const context = useContext(ResultsContext);
  if (!context) {
    throw new Error('useResults must be used within ResultsProvider');
  }
  return context;
};
