import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import PromptInput from './PromptInput';

const Hero: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateDiagram = (prompt: string) => {
    // This would connect to your actual generation logic
    console.log('Generating diagram for:', prompt);
    setIsGenerating(true);
    // Simulate processing
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            <span>AI-Powered Diagram Generator</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            <span className="block">Transform Text Into</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Beautiful Diagrams
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10">
            Generate professional diagrams, flowcharts, and visualizations instantly with AI.
            Just describe what you need in plain English.
          </p>

          <div className="max-w-3xl mx-auto mb-10">
            <PromptInput
              onSubmit={handleGenerateDiagram}
              isProcessing={isGenerating}
              placeholder="Describe the diagram you want to create..."
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Try Examples
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="inline-flex items-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-base font-medium rounded-md shadow-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;