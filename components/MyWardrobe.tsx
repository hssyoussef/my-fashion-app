'use client';

import React, { useState } from 'react';
import { Plus, Heart, MoreHorizontal, Sparkles, ArrowRight, Shirt } from 'lucide-react';
import { SavedOutfit, SuggestedLook } from '@/types/fashion';
import { WARDROBE_SUGGESTIONS } from '@/lib/fashion-data';

interface MyWardrobeProps {
  outfits: SavedOutfit[];
  onAddNew: () => void;
  onSelectOutfit: (outfit: SavedOutfit) => void;
  onToggleFavorite: (outfitId: string) => void;
  onTrySuggestedLook: (suggestion: SuggestedLook) => void;
  onExploreCatalog: () => void;
}

export const MyWardrobe: React.FC<MyWardrobeProps> = ({
  outfits,
  onAddNew,
  onSelectOutfit,
  onToggleFavorite,
  onTrySuggestedLook,
  onExploreCatalog,
}) => {
  const [filter, setFilter] = useState<'all' | 'outfits' | 'single' | 'favorites'>('all');

  const filtered = outfits.filter((o) => {
    if (filter === 'all') return true;
    if (filter === 'outfits') return o.type === 'outfits';
    if (filter === 'single') return o.type === 'single';
    if (filter === 'favorites') return o.isFavorite;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            My Wardrobe
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Your saved outfits and favorite looks.
          </p>
        </div>

        <button
          onClick={onAddNew}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-sm flex items-center space-x-1.5 transition self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Custom Item</span>
        </button>
      </div>

      {/* When Empty by Default (Requirement #5) */}
      {outfits.length === 0 ? (
        <div className="space-y-10">
          {/* Empty State Banner */}
          <div className="p-8 sm:p-12 text-center rounded-3xl bg-white border border-gray-200/80 shadow-sm space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Shirt className="w-8 h-8" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-lg font-bold text-gray-900">
                Your Wardrobe is Empty
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                You haven&apos;t saved any outfits yet. Try on clothes from <strong>ZARA</strong>, <strong>PULL &amp; BEAR</strong>, or <strong>ZEN</strong>, and save your favorites here before buying!
              </p>
            </div>

            <button
              onClick={onExploreCatalog}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-sm inline-flex items-center space-x-2 transition"
            >
              <span>Explore Boutique Outfits</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Suggestions Section (Requirement #5: "you can give him some suggetion") */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h3 className="text-base font-bold text-gray-900">
                  Suggested Looks to Try On
                </h3>
              </div>
              <span className="text-xs text-gray-400">
                Trending in Tunisian Boutiques
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {WARDROBE_SUGGESTIONS.map((sug) => (
                <div
                  key={sug.id}
                  className="bg-white rounded-2xl border border-gray-200/80 p-3 flex flex-col justify-between shadow-sm hover:shadow-md transition group"
                >
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 mb-3">
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-white z-10">
                      {sug.boutique}
                    </span>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-indigo-600 text-[10px] font-bold font-mono text-white z-10 shadow-sm">
                      {sug.price}
                    </span>
                    <img
                      src={sug.imageUrl}
                      alt={sug.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  <div className="space-y-1 mb-3">
                    <h4 className="text-xs font-bold text-gray-900 truncate">
                      {sug.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 line-clamp-2">
                      {sug.description}
                    </p>
                  </div>

                  <button
                    onClick={() => onTrySuggestedLook(sug)}
                    className="w-full py-2 rounded-xl bg-[#121420] hover:bg-indigo-600 text-white font-medium text-xs transition flex items-center justify-center space-x-1"
                  >
                    <span>Try On This Look</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Saved Outfits List */
        <div className="space-y-6">
          {/* Filter Tabs */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
                filter === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('outfits')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
                filter === 'outfits'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Outfits
            </button>
            <button
              onClick={() => setFilter('single')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
                filter === 'single'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Single Items
            </button>
            <button
              onClick={() => setFilter('favorites')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
                filter === 'favorites'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Favorites
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {filtered.map((outfit) => (
              <div
                key={outfit.id}
                onClick={() => onSelectOutfit(outfit)}
                className="bg-white rounded-2xl border border-gray-200/80 p-2.5 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 mb-2.5">
                  <img
                    src={outfit.resultImageUrl}
                    alt={outfit.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300"
                  />

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(outfit.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-red-500 shadow-sm transition"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        outfit.isFavorite ? 'fill-red-500 text-red-500' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between px-1">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 truncate">
                      {outfit.title}
                    </h4>
                    <p className="text-[10px] text-gray-400">
                      {outfit.date}
                    </p>
                  </div>

                  <div className="text-gray-400 hover:text-gray-600 p-1">
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
