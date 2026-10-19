'use client';

import React, { useRef, useState } from 'react';
import { X, UploadCloud, Check, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { ClothingItem, UserProfile } from '@/types/fashion';
import { FULL_BODY_PRESETS } from '@/lib/fashion-data';

interface FullBodyPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetGarment: ClothingItem | null;
  currentUser: UserProfile;
  onConfirmPhoto: (newPhotoUrl: string) => void;
}

export const FullBodyPhotoModal: React.FC<FullBodyPhotoModalProps> = ({
  isOpen,
  onClose,
  targetGarment,
  currentUser,
  onConfirmPhoto,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string>(currentUser.photoUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !targetGarment) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    onConfirmPhoto(selectedPhoto);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-white border border-gray-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-14 rounded-xl overflow-hidden bg-gray-50 border border-gray-200 p-1 flex-shrink-0">
              <img
                src={targetGarment.imageUrl}
                alt={targetGarment.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                {targetGarment.boutique} &bull; {targetGarment.price}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-0.5">
                See this on yourself before buying
              </h3>
              <p className="text-xs text-gray-500">
                Fitting: <strong>{targetGarment.title}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Full-Body Requirement Notice (Requirement #4) */}
        <div className="p-3.5 rounded-2xl bg-[#f7f5f2] border border-[#e8ded2] flex items-start space-x-3 text-xs text-gray-700">
          <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
            !
          </div>
          <div>
            <strong className="block text-gray-900 font-semibold mb-0.5">
              Full-Body Photo (Head-to-Toe / Bottom to Top):
            </strong>
            Please provide a full-length photo showing your posture and feet so we can accurately place and scale the trousers, blazer, dress, or shoes on your body.
          </div>
        </div>

        {/* Upload Box + Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch">
          {/* Active Preview (5 cols) */}
          <div className="sm:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full aspect-[3/4] max-w-[220px] rounded-2xl overflow-hidden bg-gray-100 border-2 border-indigo-500/40 shadow-md relative">
              <img
                src={selectedPhoto}
                alt="Your Silhouette"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-black/75 rounded-lg text-center text-[10px] text-white font-medium">
                Full-Body Silhouette
              </div>
            </div>
          </div>

          {/* Upload Dropzone (7 cols) */}
          <div className="sm:col-span-7 flex flex-col justify-between space-y-3">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 rounded-2xl border-2 border-dashed border-gray-300 hover:border-indigo-500 bg-gray-50/50 p-5 flex flex-col items-center justify-center text-center cursor-pointer transition"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <UploadCloud className="w-8 h-8 text-indigo-600 mb-2" />
              <p className="text-xs font-semibold text-gray-900">
                Click to upload your full-body photo
              </p>
              <p className="text-[10px] text-gray-500 mt-1">
                Standing straight, clear lighting (head to toe)
              </p>
              <span className="mt-2.5 px-3 py-1 bg-white border border-gray-200 rounded-lg text-[11px] font-medium text-gray-700 shadow-2xs">
                Select from Device
              </span>
            </div>

            {/* Quick Pick Full-Body Reference Models */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-medium text-gray-600 block">
                Or pick a test full-body model:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {FULL_BODY_PRESETS.map((m) => {
                  const isSel = selectedPhoto === m.photoUrl;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedPhoto(m.photoUrl)}
                      className={`relative aspect-[3/4] rounded-xl overflow-hidden border transition ${
                        isSel
                          ? 'border-indigo-600 ring-2 ring-indigo-600/30'
                          : 'border-gray-200 hover:border-gray-300 opacity-75 hover:opacity-100'
                      }`}
                      title={m.name}
                    >
                      <img
                        src={m.photoUrl}
                        alt={m.name}
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
        </div>

        {/* CTA: Put on me */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
          <div className="text-xs text-gray-500 flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Photo remains private &amp; secure</span>
          </div>

          <button
            onClick={handleContinue}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 flex items-center space-x-2 transition"
          >
            <span>Put on My Photo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
