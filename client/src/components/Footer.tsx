import React from 'react';
import { Activity, Github, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold">DiagramAI</span>
            </div>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Transform text into beautiful diagrams instantly with our AI-powered tool.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Product</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} DiagramAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;