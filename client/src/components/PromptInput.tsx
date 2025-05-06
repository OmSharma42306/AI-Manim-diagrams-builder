import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { sendPrompt } from '../api/api';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isProcessing: boolean;
  placeholder?: string;
}



const PromptInput: React.FC<PromptInputProps> = ({
  onSubmit,
  isProcessing,
  placeholder = 'Enter your prompt...',
}) => {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  
  


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isProcessing) {
      try{
        const res = await sendPrompt(prompt.trim()); 
        console.log("RESP",res)
      setVideoUrl(res.url);
  
      }catch(error){
        console.error(error)
      }
    }
  };

  return (
    <div>
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden"
      >
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          disabled={isProcessing}
          className="flex-1 px-6 py-4 bg-transparent text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-0 text-base md:text-lg"
        />
        <button
          type="submit"
          disabled={!prompt.trim() || isProcessing}
          className={`px-5 py-4 rounded-r-lg flex items-center justify-center transition-colors ${
            isProcessing || !prompt.trim()
              ? 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isProcessing ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </button>
      </form>
      
    
    
    
    </div>

    {videoUrl && (
  <div className="mt-4">
    <video autoPlay controls className="w-full max-w-lg rounded-lg shadow">
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
)}
    </div>
    
  );
};

export default PromptInput;