import React from 'react';
import { MessageSquare, Cpu, LineChart, CheckCircle } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: 'Describe Your Diagram',
      description: 'Enter a detailed description of the diagram you want to create using natural language.',
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: 'AI Processing',
      description: 'Our advanced AI analyzes your description and translates it into a structured diagram layout.',
    },
    {
      icon: <LineChart className="h-8 w-8" />,
      title: 'Generate & Visualize',
      description: 'The system generates a beautiful, professional diagram based on your specifications.',
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: 'Refine & Export',
      description: 'Refine your diagram with additional prompts, then export or share it in your preferred format.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            From text prompt to professional diagram in seconds
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute hidden md:block left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-500 transform -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`md:flex items-center ${
                  index % 2 === 0 ? 'md:text-right' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{step.description}</p>
                </div>

                <div className="relative flex items-center justify-center my-4 md:my-0 md:w-2/12">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white z-10">
                    {step.icon}
                  </div>
                </div>

                <div className="md:w-5/12" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Get Started For Free
          </button>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            No credit card required • Free tier available
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;