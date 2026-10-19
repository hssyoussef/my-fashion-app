'use client';

import React, { useState, useMemo } from 'react';
import { ArrowLeft, Plus, Heart, Scissors, Upload, Sparkles, Database, CheckCircle2, Filter } from 'lucide-react';
import { BoutiqueBrand, ClothingItem, EventType } from '@/types/fashion';
import { BOUTIQUES, EVENT_PILLS } from '@/lib/fashion-data';

interface RecommendationsStepProps {
  currentEvent: EventType;
  items: ClothingItem[];
  onBack: () => void;
  onSelectTryOn: (item: ClothingItem) => void;
  onOpenAddModal: () => void;
  onToggleLike: (itemId: string) => void;
}

export const RecommendationsStep: React.FC<RecommendationsStepProps> = ({
  currentEvent,
  items,
  onBack,
  onSelectTryOn,
  onOpenAddModal,
  onToggleLike,
}) => {
  const [selectedBoutique, setSelectedBoutique] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const currentEventPill =
    EVENT_PILLS.find((p) => p.id === currentEvent) || EVENT_PILLS[1];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchBoutique = selectedBoutique === 'ALL' || item.boutique === selectedBoutique;
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchBoutique && matchCategory;
    });
  }, [items, selectedBoutique, selectedCategory]);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'outerwear', label: 'Blazers & Jackets' },
    { id: 'tops', label: 'Shirts & Hoodies' },
    { id: 'bottoms', label: 'Pants & Cargo' },
    { id: 'dresses', label: 'Dresses' },
    { id: 'shoes', label: 'Shoes & Sneakers' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          className="text-xs font-medium text-gray-500 hover:text-gray-900 flex items-center space-x-1.5 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>

      {/* Header & Add Custom Clothes Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Outfit Recommendations
          </h2>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xs text-gray-500">Based on your event:</span>
            <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${currentEventPill.bgColor} ${currentEventPill.textColor}`}>
              <span>{currentEventPill.icon}</span>
              <span>{currentEventPill.label}</span>
            </span>
          </div>
        </div>

        <button
          onClick={onOpenAddModal}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-sm flex items-center space-x-1.5 transition self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Custom Clothes</span>
        </button>
      </div>

      {/* Boutique Stores Filter Pills (ZARA, PULL & BEAR, ZEN, etc.) */}
      <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
        <span className="text-xs font-semibold text-gray-700 mr-1 flex items-center space-x-1">
          <Filter className="w-3.5 h-3.5" />
          <span>Boutique:</span>
        </span>

        <button
          onClick={() => setSelectedBoutique('ALL')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
            selectedBoutique === 'ALL'
              ? 'bg-gray-900 text-white shadow-sm'
              : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          All Boutiques
        </button>

        {BOUTIQUES.map((b) => (
          <button
            key={b}
            onClick={() => setSelectedBoutique(b)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
              selectedBoutique === b
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              selectedCategory === c.id
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold'
                : 'bg-white text-gray-500 border border-gray-200 hover:text-gray-800'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Main Grid + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Outfits Grid (9 cols) */}
        <div className="lg:col-span-9">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200/80 p-3 flex flex-col justify-between hover:shadow-md transition group"
              >
                {/* Top Image + Heart */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 mb-2.5 flex items-center justify-center p-2">
                  {/* Boutique Label */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm text-[9px] font-bold tracking-wider text-white z-10">
                    {item.boutique}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLike(item.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-red-500 shadow-sm transition z-10"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        item.liked ? 'fill-red-500 text-red-500' : ''
                      }`}
                    />
                  </button>

                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-gray-900 truncate">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600 font-mono">
                      {item.price}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {item.color}
                    </span>
                  </div>
                </div>

                {/* Try On Me CTA */}
                <div className="pt-2.5 mt-1 border-t border-gray-100">
                  <button
                    onClick={() => onSelectTryOn(item)}
                    className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition shadow-sm flex items-center justify-center space-x-1"
                  >
                    <span>Try On Me</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Add Custom Clothes Pipeline (3 cols) */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 space-y-5 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900">
              Add Custom Clothes
            </h3>

            {/* 4 Steps */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5 text-gray-700">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Scissors className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-medium block leading-tight">
                      1. Background Removal
                    </span>
                    <span className="text-[10px] text-gray-400">(rembg)</span>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5 text-gray-700">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Upload className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-medium block leading-tight">
                      2. Upload to Cloudinary
                    </span>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5 text-gray-700">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-medium block leading-tight">
                      3. Create Embedding
                    </span>
                    <span className="text-[10px] text-gray-400">(FashionSigLIP)</span>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5 text-gray-700">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Database className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-medium block leading-tight">
                      4. Store in ChromaDB
                    </span>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              </div>
            </div>

            {/* Action */}
            <button
              onClick={onOpenAddModal}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition shadow-sm"
            >
              Add New Clothes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
