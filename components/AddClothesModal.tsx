'use client';

import React, { useState, useRef } from 'react';
import { X, Upload, CheckCircle2, Scissors, Sparkles, Database } from 'lucide-react';
import { ClothingItem, EventType } from '@/types/fashion';

interface AddClothesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemAdded: (item: ClothingItem) => void;
}

export const AddClothesModal: React.FC<AddClothesModalProps> = ({
  isOpen,
  onClose,
  onItemAdded,
}) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('$49.99');
  const [category, setCategory] = useState<ClothingItem['category']>('tops');
  const [selectedTag, setSelectedTag] = useState<EventType>('casual');
  const [rawImageUrl, setRawImageUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [stage, setStage] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setRawImageUrl(ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const samplePresets = [
    {
      title: 'Beige Cashmere Knit',
      price: '$59.99',
      category: 'tops' as const,
      url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Charcoal Wool Coat',
      price: '$120.00',
      category: 'outerwear' as const,
      url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const handleApplyPreset = (p: typeof samplePresets[0]) => {
    setTitle(p.title);
    setPrice(p.price);
    setCategory(p.category);
    setRawImageUrl(p.url);
  };

  const handleStartIngestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawImageUrl) return;

    setIsProcessing(true);
    setStage(1); // rembg
    await new Promise((r) => setTimeout(r, 600));

    setStage(2); // cloudinary
    await new Promise((r) => setTimeout(r, 500));

    setStage(3); // siglip embedding
    await new Promise((r) => setTimeout(r, 500));

    setStage(4); // chromadb
    await new Promise((r) => setTimeout(r, 400));

    const newItem: ClothingItem = {
      id: `item-${Date.now()}`,
      title: title || 'Custom Garment',
      price: price || '79 DNT',
      boutique: 'ZEN',
      imageUrl: rawImageUrl,
      category,
      eventTags: [selectedTag],
      liked: false,
      tryOnResultUrl: rawImageUrl,
    };

    onItemAdded(newItem);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-white border border-gray-200 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl my-8 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Add Custom Clothes
            </h3>
            <p className="text-xs text-gray-500">
              Add your clothing item to your Aura-Fit wardrobe
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleStartIngestion} className="space-y-4">
          {/* Presets */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase tracking-wider text-gray-500">
              Quick samples:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {samplePresets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className="flex items-center space-x-2 p-2 rounded-xl bg-gray-50 border border-gray-200 hover:border-indigo-400 text-left transition"
                >
                  <img
                    src={p.url}
                    alt={p.title}
                    className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">{p.title}</p>
                    <p className="text-[10px] text-gray-500">{p.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Photo Dropzone */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">Garment Photo</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer rounded-2xl border-2 border-dashed border-gray-300 hover:border-indigo-500 bg-gray-50/50 p-5 flex flex-col items-center justify-center text-center transition"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {rawImageUrl ? (
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-16 rounded-xl overflow-hidden border border-gray-200 bg-white p-1">
                    <img
                      src={rawImageUrl}
                      alt="Uploaded"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-left space-y-0.5">
                    <p className="text-xs font-semibold text-gray-900">
                      Photo selected
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Click to choose another
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <Upload className="w-6 h-6 text-indigo-500 mx-auto" />
                  <p className="text-xs font-medium text-gray-800">
                    Click to select garment photo
                  </p>
                  <p className="text-[10px] text-gray-400">
                    JPG, PNG, or WEBP
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Title & Price */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700">Title</label>
              <input
                type="text"
                placeholder="e.g. Linen Blazer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700">Price</label>
              <input
                type="text"
                placeholder="$49.99"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Pipeline Progress Indicator */}
          {isProcessing && (
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
              <div className="flex items-center justify-between font-medium text-indigo-600">
                <span>Ingesting Garment:</span>
                <span>{stage}/4</span>
              </div>
              <div className="space-y-1 text-gray-600 font-mono text-[11px]">
                <div className={stage >= 1 ? 'text-emerald-600 font-semibold' : 'text-gray-400'}>
                  ✓ 1. Background Removal (rembg)
                </div>
                <div className={stage >= 2 ? 'text-emerald-600 font-semibold' : 'text-gray-400'}>
                  ✓ 2. Upload to Cloudinary
                </div>
                <div className={stage >= 3 ? 'text-emerald-600 font-semibold' : 'text-gray-400'}>
                  ✓ 3. Create Embedding (FashionSigLIP)
                </div>
                <div className={stage >= 4 ? 'text-emerald-600 font-semibold' : 'text-gray-400'}>
                  ✓ 4. Store in ChromaDB
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!rawImageUrl || isProcessing}
              className={`w-full py-3 rounded-xl font-semibold text-xs tracking-wide transition shadow-sm ${
                rawImageUrl && !isProcessing
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isProcessing ? 'Processing...' : 'Add to Collection'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
