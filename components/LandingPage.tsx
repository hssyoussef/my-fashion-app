'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Shirt, Camera, Check, ShoppingBag } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onBrowseBoutiques: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onBrowseBoutiques }) => {
  // 5-second cyclic animation state (0 to 3)
  const [animStep, setAnimStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepDuration = 1250; // 5000ms total / 4 steps
    const interval = setInterval(() => {
      setAnimStep((prev) => (prev + 1) % 4);
    }, stepDuration);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  const stepsInfo = [
    {
      num: 1,
      title: 'Choose Any Item',
      desc: 'Browse items from Zara, Pull & Bear, or Zen in DNT',
      icon: ShoppingBag,
    },
    {
      num: 2,
      title: 'Add Full-Body Photo',
      desc: 'Full picture from bottom to top (head to toe)',
      icon: Camera,
    },
    {
      num: 3,
      title: 'Fitted On You',
      desc: 'The item drapes onto your exact silhouette',
      icon: Sparkles,
    },
    {
      num: 4,
      title: 'Buy With Confidence',
      desc: 'Know your exact look before ordering in Tunisia',
      icon: Check,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#121420] text-white flex items-center relative overflow-hidden py-8">
      {/* Dynamic Animated Background Grid & Glows */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#4338ca_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-6 space-y-7">
            {/* Concept Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>See It on Yourself Before You Buy</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Try Outfits on <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                  Your Own Photo
                </span>
              </h1>
              <p className="text-gray-300 text-sm sm:text-base max-w-xl leading-relaxed">
                Found pants or a blazer at <strong>ZARA</strong>, <strong>PULL &amp; BEAR</strong>, or <strong>ZEN</strong>?
                Upload your full-body photo (from head to toe) and see how it fits you before ordering in <strong>DNT</strong>.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onStart}
                className="px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm tracking-wide shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Try On Clothes Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onBrowseBoutiques}
                className="px-5 py-3.5 rounded-xl bg-[#1f2438] hover:bg-[#282e46] text-gray-200 border border-[#2f3550] font-medium text-xs sm:text-sm transition"
              >
                Browse ZARA &bull; P&amp;B &bull; ZEN
              </button>
            </div>

            {/* Boutique Tags in Tunisia */}
            <div className="pt-2 flex items-center space-x-2 text-xs text-gray-400">
              <span className="uppercase text-[10px] tracking-wider font-mono text-gray-500">Supported Boutiques:</span>
              <span className="px-2 py-0.5 rounded bg-[#1c2033] border border-gray-700 font-semibold text-gray-200">ZARA</span>
              <span className="px-2 py-0.5 rounded bg-[#1c2033] border border-gray-700 font-semibold text-gray-200">PULL &amp; BEAR</span>
              <span className="px-2 py-0.5 rounded bg-[#1c2033] border border-gray-700 font-semibold text-gray-200">ZEN</span>
              <span className="px-2 py-0.5 rounded bg-[#1c2033] border border-gray-700 font-semibold text-gray-200">MASSIMO DUTTI</span>
            </div>
          </div>

          {/* Right Column: 5-Second Animated Concept Simulation (Requirement #6) */}
          <div className="lg:col-span-6 relative">
            <div className="bg-[#181b2b] rounded-3xl border border-[#2c324b] p-6 shadow-2xl relative overflow-hidden space-y-5">
              {/* Top Banner explaining the 5s loop */}
              <div className="flex items-center justify-between border-b border-[#292f47] pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-gray-200">
                    How Aura-Fit Works in 5 Seconds
                  </span>
                </div>
                <span className="text-[11px] font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/30">
                  Step 0{animStep + 1} of 04
                </span>
              </div>

              {/* Dynamic 5s Concept Stage Container */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#0e101a] border border-[#23273c] flex items-center justify-center p-4">
                {/* Stage 1 (0-1.25s): Customer selects an item from Zara / Zen with price in DNT */}
                {animStep === 0 && (
                  <div className="animate-fadeIn flex flex-col items-center text-center space-y-3">
                    <div className="relative w-36 h-40 rounded-xl overflow-hidden bg-white/5 border border-white/10 p-2 shadow-lg">
                      <img
                        src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80"
                        alt="Zara Blazer"
                        className="w-full h-full object-contain"
                      />
                      <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold text-white">
                        ZARA
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">1. Select an Outfit or Pants</h4>
                      <p className="text-xs text-indigo-300 font-semibold mt-0.5">Tailored Structured Blazer &bull; 189 DNT</p>
                    </div>
                  </div>
                )}

                {/* Stage 2 (1.25s-2.5s): Customer uploads their full-body photo (bottom to top) */}
                {animStep === 1 && (
                  <div className="animate-fadeIn flex flex-col items-center text-center space-y-3">
                    <div className="relative w-28 h-44 rounded-xl overflow-hidden border-2 border-dashed border-indigo-400/80 bg-indigo-950/20 p-1">
                      <img
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
                        alt="Full body standing"
                        className="w-full h-full object-cover object-top rounded-lg"
                      />
                      <span className="absolute bottom-1 left-1 right-1 bg-indigo-600/90 text-[9px] font-mono text-white py-0.5 rounded text-center">
                        Head-to-Toe Photo
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">2. Upload Your Full-Body Photo</h4>
                      <p className="text-xs text-gray-300 mt-0.5">Captures your height and proportions bottom to top</p>
                    </div>
                  </div>
                )}

                {/* Stage 3 (2.5s-3.75s): Fitting animation placing the item directly on customer photo */}
                {animStep === 2 && (
                  <div className="animate-fadeIn flex flex-col items-center text-center space-y-3">
                    <div className="relative w-28 h-44 rounded-xl overflow-hidden border-2 border-emerald-400 shadow-xl bg-black">
                      <img
                        src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=400&q=80"
                        alt="Fitted Blazer on Customer"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-emerald-500 text-[9px] font-bold text-white">
                        Fitted on You ✨
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-emerald-300">3. Garment Drapes on Your Body</h4>
                      <p className="text-xs text-gray-300 mt-0.5">See shoulder drape, waist, and trousers length in real-time</p>
                    </div>
                  </div>
                )}

                {/* Stage 4 (3.75s-5.0s): Confident purchase in DNT */}
                {animStep === 3 && (
                  <div className="animate-fadeIn flex flex-col items-center text-center space-y-3">
                    <div className="p-4 rounded-2xl bg-indigo-900/40 border border-indigo-500/40 space-y-2 max-w-xs text-left">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white font-bold">ZARA Blazer (Fitted)</span>
                        <span className="text-indigo-300 font-mono font-bold">189 DNT</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-xs text-emerald-400">
                        <Check className="w-3.5 h-3.5" />
                        <span>Fits your silhouette perfectly</span>
                      </div>
                      <button
                        onClick={onStart}
                        className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold text-center block transition"
                      >
                        Order / Add to Bag
                      </button>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">4. Buy with 100% Certainty</h4>
                      <p className="text-xs text-gray-300 mt-0.5">No more returns or guessing wrong sizes in Tunisia</p>
                    </div>
                  </div>
                )}
              </div>

              {/* 5-Second Looping Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full h-1.5 rounded-full bg-[#23273c] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                  <span>0s</span>
                  <span>5-Second Interactive Loop</span>
                  <span>5s</span>
                </div>
              </div>

              {/* 4 Interactive Step Buttons */}
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {stepsInfo.map((s, idx) => {
                  const Icon = s.icon;
                  const isActive = animStep === idx;
                  return (
                    <button
                      key={s.num}
                      onClick={() => setAnimStep(idx)}
                      className={`p-2 rounded-xl border text-left transition ${
                        isActive
                          ? 'bg-indigo-600/25 border-indigo-400 text-white'
                          : 'bg-[#141724] border-[#252a3d] text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-1 mb-1">
                        <span className={`text-[9px] font-bold ${isActive ? 'text-indigo-300' : 'text-gray-500'}`}>
                          0{s.num}
                        </span>
                        <Icon className="w-3 h-3" />
                      </div>
                      <p className="text-[10px] font-semibold truncate leading-tight">
                        {s.title}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
