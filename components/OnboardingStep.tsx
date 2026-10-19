'use client';

import React, { useRef } from 'react';
import { UploadCloud, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { UserProfile } from '@/types/fashion';
import { EVENT_PILLS, FULL_BODY_PRESETS } from '@/lib/fashion-data';

interface OnboardingStepProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onContinue: () => void;
}

export const OnboardingStep: React.FC<OnboardingStepProps> = ({
  user,
  onUpdateUser,
  onContinue,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdateUser({
            photoUrl: event.target.result as string,
            hasCustomUpload: true,
            isFullBodyVerified: true,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Step 1 &mdash; Onboarding (Upload Full-Body Photo + Select Event)
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Upload a full-body picture (from bottom to top) so outfits from Zara, Pull &amp; Bear, or Zen can be tested on your exact proportions.
        </p>
      </div>

      {/* Main Card with 3 Columns */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200/80 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Column 1: Full-Body Portrait Preview (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-center justify-center">
            <div className="w-full aspect-[3/4] max-w-[280px] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-inner relative group">
              <img
                src={user.photoUrl}
                alt="Full Body Portrait"
                className="w-full h-full object-cover object-top"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer"
              >
                <span className="text-xs font-semibold text-white bg-black/75 px-3 py-1.5 rounded-full">
                  Change Photo
                </span>
              </div>
              <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg text-center text-[10px] text-white font-mono">
                Full-Body (Bottom to Top)
              </div>
            </div>
          </div>

          {/* Column 2: Upload Box (4 cols) */}
          <div className="md:col-span-4 flex flex-col justify-between space-y-3">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 rounded-2xl border-2 border-dashed border-gray-300 hover:border-indigo-500 bg-gray-50/50 hover:bg-indigo-50/20 p-5 flex flex-col items-center justify-center text-center transition cursor-pointer"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div className="w-14 h-14 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                <UploadCloud className="w-7 h-7" />
              </div>

              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                Upload your photo
              </h4>
              <p className="text-xs text-gray-500 max-w-[210px] mb-3 leading-relaxed">
                Use a full visual photo of yourself from the bottom to the top (head to toe).
              </p>

              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-sm transition"
              >
                Choose Photo
              </button>

              <span className="text-[10px] text-gray-400 mt-2">
                JPG, PNG (max 10MB)
              </span>
            </div>

            {/* Quick Pick Model Presets */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-medium text-gray-600 block">
                Or pick a full-body sample model:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {FULL_BODY_PRESETS.map((preset) => {
                  const isSel = user.photoUrl === preset.photoUrl;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() =>
                        onUpdateUser({
                          photoUrl: preset.photoUrl,
                          name: preset.name,
                        })
                      }
                      className={`relative aspect-[3/4] rounded-xl overflow-hidden border transition ${
                        isSel
                          ? 'border-indigo-600 ring-2 ring-indigo-600/30'
                          : 'border-gray-200 hover:border-gray-300 opacity-80 hover:opacity-100'
                      }`}
                      title={preset.name}
                    >
                      <img
                        src={preset.photoUrl}
                        alt={preset.name}
                        className="w-full h-full object-cover object-top"
                      />
                      {isSel && (
                        <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[8px] font-bold">
                          ✓
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 3: Select Your Event (4 cols) */}
          <div className="md:col-span-4 flex flex-col justify-between space-y-4">
            <div>
              <h4 className="text-sm font-bold text-gray-900">
                Select your event
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                Choose the occasion for your outfit recommendations.
              </p>

              {/* Event Pills */}
              <div className="space-y-2.5 mt-4">
                {EVENT_PILLS.map((pill) => {
                  const isSelected = user.currentEvent === pill.id;
                  return (
                    <button
                      key={pill.id}
                      type="button"
                      onClick={() => onUpdateUser({ currentEvent: pill.id })}
                      className={`w-full flex items-center space-x-3 p-3 rounded-2xl border transition-all text-left ${pill.bgColor} ${
                        isSelected
                          ? 'border-indigo-600 shadow-sm ring-2 ring-indigo-600/20'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl ${pill.iconBg} flex items-center justify-center text-sm`}>
                        {pill.icon}
                      </div>

                      <div className="flex-1">
                        <span className={`text-xs font-semibold ${pill.textColor}`}>
                          {pill.label}
                        </span>
                      </div>

                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Note */}
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-[11px] text-gray-500 flex items-start space-x-2">
              <Info className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
              <span>Full-body photos give the most realistic fit for trousers, coats, and sneakers.</span>
            </div>
          </div>
        </div>

        {/* Bottom Continue Action */}
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            onClick={onContinue}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-sm flex items-center space-x-2 transition"
          >
            <span>Continue to Recommendations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
