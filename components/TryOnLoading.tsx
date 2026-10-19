'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export const TryOnLoading: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#121420] text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md space-y-6">
        {/* Sparkle Icon */}
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto shadow-lg shadow-indigo-500/20">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>

        {/* Headings */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Generating your try-on...
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            This may take 5&ndash;8 seconds. <br />
            Our AI is creating your new look!
          </p>
        </div>

        {/* Circular Progress Spinner matching Screen 4 */}
        <div className="pt-4 flex justify-center">
          <div className="w-12 h-12 rounded-full border-3 border-indigo-900 border-t-indigo-500 animate-spin" />
        </div>
      </div>
    </div>
  );
};
