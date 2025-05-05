import React, { useState } from 'react';
import { Eye } from 'lucide-react';

interface DiagramExample {
  id: number;
  title: string;
  description: string;
  prompt: string;
  imageUrl: string;
  category: string;
}

const DiagramGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const diagramExamples: DiagramExample[] = [
    {
      id: 1,
      title: 'System Architecture',
      description: 'Cloud-based microservices architecture diagram',
      prompt: 'Create a system architecture diagram for a cloud-based e-commerce platform with microservices',
      imageUrl: 'https://images.pexels.com/photos/7366/startup-photos.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'architecture',
    },
    {
      id: 2,
      title: 'User Flow',
      description: 'User authentication and onboarding flow',
      prompt: 'Create a user flow diagram for a mobile app signup and onboarding process',
      imageUrl: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'flow',
    },
    {
      id: 3,
      title: 'Organizational Chart',
      description: 'Modern tech company org structure',
      prompt: 'Create an organizational chart for a modern tech company with engineering, product, and design teams',
      imageUrl: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'org',
    },
    {
      id: 4,
      title: 'Network Diagram',
      description: 'Enterprise network infrastructure',
      prompt: 'Create a network diagram for a medium-sized enterprise with multiple offices',
      imageUrl: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'network',
    },
    {
      id: 5,
      title: 'Data Flow',
      description: 'Customer data processing pipeline',
      prompt: 'Create a data flow diagram for a customer analytics platform',
      imageUrl: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'flow',
    },
    {
      id: 6,
      title: 'Mind Map',
      description: 'Product development brainstorming',
      prompt: 'Create a mind map for a new mobile app development project',
      imageUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'mind-map',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Types' },
    { id: 'architecture', name: 'Architecture' },
    { id: 'flow', name: 'Flow Charts' },
    { id: 'org', name: 'Org Charts' },
    { id: 'network', name: 'Network' },
    { id: 'mind-map', name: 'Mind Maps' },
  ];

  const filteredExamples = activeCategory === 'all'
    ? diagramExamples
    : diagramExamples.filter(example => example.category === activeCategory);

  return (
    <section id="gallery" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Example Diagrams
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            See what's possible with our AI diagram generator
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExamples.map((example) => (
            <div
              key={example.id}
              className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={example.imageUrl}
                  alt={example.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                  <span className="text-white text-sm font-medium">{example.prompt}</span>
                  <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-colors">
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1">{example.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">{example.description}</p>
                <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                  Try this prompt →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiagramGallery;