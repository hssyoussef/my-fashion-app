'use client';

import React, { useState, useRef } from 'react';
import { Sliders, RefreshCw, Eye, MoveVertical, Maximize2 } from 'lucide-react';
import { ClothingItem } from '@/types/fashion';

interface VirtualFittingCanvasProps {
  originalPhotoUrl: string;
  garment: ClothingItem;
}

export const VirtualFittingCanvas: React.FC<VirtualFittingCanvasProps> = ({
  originalPhotoUrl,
  garment,
}) => {
  // Slider position (0 to 100%)
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<'fitted' | 'slider'>('fitted');

  // Fitting fine-tuning adjustments
  const [scale, setScale] = useState(1);
  const [offsetY, setOffsetY] = useState(0);
  const [showAdjusters, setShowAdjusters] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Determine standard anatomical placement based on garment category
  const getGarmentPlacement = () => {
    switch (garment.category) {
      case 'outerwear':
        return {
          width: `${56 * scale}%`,
          top: `${(25 + offsetY)}%`,
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'tops':
        return {
          width: `${52 * scale}%`,
          top: `${(27 + offsetY)}%`,
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'bottoms':
        return {
          width: `${46 * scale}%`,
          top: `${(52 + offsetY)}%`,
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'dresses':
        return {
          width: `${52 * scale}%`,
          top: `${(26 + offsetY)}%`,
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'shoes':
        return {
          width: `${42 * scale}%`,
          top: `${(84 + offsetY)}%`,
          left: '50%',
          transform: 'translateX(-50%)',
        };
      default:
        return {
          width: `${50 * scale}%`,
          top: `${(30 + offsetY)}%`,
          left: '50%',
          transform: 'translateX(-50%)',
        };
    }
  };

  const handleSliderMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleSliderMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const garmentPlacement = getGarmentPlacement();

  return (
    <div className="w-full flex flex-col space-y-3">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1.5 bg-gray-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode('fitted')}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              viewMode === 'fitted'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Fitted on You
          </button>
          <button
            type="button"
            onClick={() => setViewMode('slider')}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              viewMode === 'slider'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Before / After Slider
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShowAdjusters(!showAdjusters)}
          className="text-xs text-indigo-600 font-semibold hover:text-indigo-800 flex items-center space-x-1 bg-indigo-50 px-2.5 py-1 rounded-lg"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{showAdjusters ? 'Hide Fit Adjuster' : 'Adjust Fit'}</span>
        </button>
      </div>

      {/* Adjusters Drawer */}
      {showAdjusters && (
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2 text-xs animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 flex items-center space-x-1">
              <MoveVertical className="w-3 h-3" />
              <span>Vertical Position:</span>
            </span>
            <input
              type="range"
              min="-15"
              max="15"
              value={offsetY}
              onChange={(e) => setOffsetY(Number(e.target.value))}
              className="w-32 accent-indigo-600 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 flex items-center space-x-1">
              <Maximize2 className="w-3 h-3" />
              <span>Garment Size Scale:</span>
            </span>
            <input
              type="range"
              min="0.8"
              max="1.3"
              step="0.05"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-32 accent-indigo-600 cursor-pointer"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => {
                setScale(1);
                setOffsetY(0);
              }}
              className="text-[11px] text-gray-400 hover:text-gray-700 flex items-center space-x-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset alignment</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Canvas Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gray-900 border border-gray-200 shadow-md select-none"
      >
        {/* Layer 1: The Customer's ACTUAL Uploaded Photo (Always THEMSELVES!) */}
        <img
          src={originalPhotoUrl}
          alt="Your silhouette"
          className="w-full h-full object-cover object-top"
        />

        {/* Layer 2: The Fitted Garment Drape directly on the Customer */}
        <div
          className="absolute pointer-events-none transition-all duration-75"
          style={{
            ...garmentPlacement,
            filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.45)) contrast(1.05)',
            mixBlendMode: 'normal',
          }}
        >
          <img
            src={garment.cutoutUrl || garment.imageUrl}
            alt={garment.title}
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>

        {/* Badge: Fitted on You */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-sm border border-white/20 text-white text-[10px] font-semibold flex items-center space-x-1 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Fitted on Your Silhouette</span>
        </div>

        {/* Mode 2: Interactive Split Slider (revealing original vs fitted) */}
        {viewMode === 'slider' && (
          <>
            {/* Left clipped mask showing untouched original photo */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={originalPhotoUrl}
                alt="Original untouched"
                className="absolute inset-0 w-full h-full object-cover object-top max-w-none"
                style={{ width: containerRef.current?.offsetWidth || '100%' }}
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 text-white text-[10px] font-semibold">
                Original Photo
              </div>
            </div>

            {/* Slider Divider Handle */}
            <div
              className="absolute top-0 bottom-0 z-20 w-1 bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] cursor-ew-resize"
              style={{ left: `${sliderPos}%` }}
              onMouseDown={() => setIsDragging(true)}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-800 shadow-xl cursor-grab">
                <Sliders className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/75 rounded-full text-[10px] text-gray-200 pointer-events-none">
              Drag to compare before &amp; after fit
            </div>
          </>
        )}
      </div>
    </div>
  );
};
