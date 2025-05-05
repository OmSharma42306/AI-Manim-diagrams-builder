import React from 'react';
import { 
  Zap, 
  Repeat, 
  Download, 
  Share2, 
  Palette, 
  Layout, 
  Link, 
  Clock 
} from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Instant Generation',
      description: 'Create beautiful diagrams in seconds with simple text prompts.',
    },
    {
      icon: <Repeat className="h-6 w-6" />,
      title: 'Unlimited Revisions',
      description: 'Refine your diagrams with follow-up prompts until perfect.',
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: 'Multiple Export Formats',
      description: 'Download your diagrams as PNG, SVG, PDF, or other formats.',
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: 'Easy Sharing',
      description: 'Share your diagrams with colleagues via link or embed them.',
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: 'Customizable Styles',
      description: 'Choose from various themes or create your own custom design.',
    },
    {
      icon: <Layout className="h-6 w-6" />,
      title: 'Smart Layouts',
      description: 'AI automatically arranges elements for optimal readability.',
    },
    {
      icon: <Link className="h-6 w-6" />,
      title: 'Interactive Elements',
      description: 'Create clickable, interactive diagrams with links and tooltips.',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Version History',
      description: 'Access previous versions of your diagrams at any time.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Everything you need to create professional diagrams without any design skills
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;