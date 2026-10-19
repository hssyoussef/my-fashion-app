'use client';

import React from 'react';
import { ArrowLeft, Bookmark, Check, ShoppingBag, Sparkles } from 'lucide-react';
import { ClothingItem } from '@/types/fashion';
import { VirtualFittingCanvas } from '@/components/VirtualFittingCanvas';

interface TryOnResultProps {
  originalPhotoUrl: string;
  garment: ClothingItem;
  onBack: () => void;
  onTryAnother: () => void;
  onSaveToWardrobe: () => void;
  isSaved: boolean;
}

export const TryOnResult: React.FC<TryOnResultProps> = ({
  originalPhotoUrl,
  garment,
  onBack,
  onTryAnother,
  onSaveToWardrobe,
  isSaved,
}) => {
  const outfitComponents = [
    { title: garment.title, boutique: garment.boutique || 'ZARA', price: garment.price },
    { title: 'Classic Oxford Shirt', boutique: 'ZEN', price: '59 DNT' },
    { title: 'Pleated Wide-Leg Trousers', boutique: 'ZARA', price: '119 DNT' },
    { title: 'Platform Minimalist Sneakers', boutique: 'BERSHKA', price: '119 DNT' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          className="text-xs font-medium text-gray-500 hover:text-gray-900 flex items-center space-x-1.5 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </button>
      </div>

      {/* Header & Save Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded bg-black text-white text-[10px] font-bold tracking-wider">
              {garment.boutique || 'ZARA'}
            </span>
            <span className="text-xs text-indigo-600 font-bold font-mono">
              {garment.price}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
            Fitted Directly on Your Photo
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Here is how <strong>{garment.title}</strong> fits your exact silhouette before purchasing!
          </p>
        </div>

        <button
          onClick={onSaveToWardrobe}
          className={`px-4 py-2 rounded-xl text-xs font-medium border flex items-center space-x-1.5 transition self-start sm:self-auto ${
            isSaved
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {isSaved ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Saved in Wardrobe</span>
            </>
          ) : (
            <>
              <Bookmark className="w-3.5 h-3.5" />
              <span>Save to My Wardrobe</span>
            </>
          )}
        </button>
      </div>

      {/* 3 Columns Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Column 1: Original Customer Photo (Full-Body head to toe) */}
        <div className="md:col-span-4 bg-white rounded-2xl border border-gray-200/80 p-4 shadow-sm flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-2">
            <span className="px-2.5 py-1 rounded bg-[#2b3046] text-white text-[10px] font-semibold">
              Your Original Photo
            </span>
            <span className="text-[10px] text-gray-400 font-mono">Before Fit</span>
          </div>
          <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
            <img
              src={originalPhotoUrl}
              alt="Your Original Photo"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Column 2: Virtual Try-On Rendered Directly on the Customer's Photo */}
        <div className="md:col-span-4 bg-white rounded-2xl border border-gray-200/80 p-4 shadow-sm flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-2">
            <span className="px-2.5 py-1 rounded bg-indigo-600 text-white text-[10px] font-semibold flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>Fitted on You</span>
            </span>
            <span className="text-[10px] text-emerald-600 font-bold">Your Face &amp; Body ✨</span>
          </div>

          {/* Virtual Fitting Canvas on Customer's Actual Photo */}
          <VirtualFittingCanvas
            originalPhotoUrl={originalPhotoUrl}
            garment={garment}
          />
        </div>

        {/* Column 3: Outfit Details Breakdown & Order CTA in DNT */}
        <div className="md:col-span-4 bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm space-y-5">
          <h3 className="text-sm font-bold text-gray-900">
            Selected Outfit Details
          </h3>

          <div className="space-y-3">
            {outfitComponents.map((comp, idx) => (
              <div key={idx} className="flex items-center space-x-3 text-xs">
                <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 flex-shrink-0">
                  <span className="text-[10px] font-mono">#{idx + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-gray-900 block truncate">
                    {comp.title}
                  </span>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="text-[9px] font-bold text-gray-500 uppercase bg-gray-100 px-1.5 py-0.2 rounded">
                      {comp.boutique}
                    </span>
                    <span className="text-indigo-600 font-bold font-mono text-[11px]">
                      {comp.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-4 border-t border-gray-100">
            <button
              onClick={() => alert(`Redirecting to ${garment.boutique || 'ZARA'} Tunisia store to order for ${garment.price}!`)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-sm flex items-center justify-center space-x-1.5 transition"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Buy {garment.title} ({garment.price})</span>
            </button>

            <button
              onClick={onTryAnother}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-sm transition"
            >
              Try Another Item
            </button>

            <button
              onClick={onBack}
              className="w-full py-2 rounded-xl text-gray-500 hover:text-gray-900 font-medium text-xs transition"
            >
              Back to Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
