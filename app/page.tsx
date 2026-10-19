'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { LandingPage } from '@/components/LandingPage';
import { OnboardingStep } from '@/components/OnboardingStep';
import { RecommendationsStep } from '@/components/RecommendationsStep';
import { TryOnLoading } from '@/components/TryOnLoading';
import { TryOnResult } from '@/components/TryOnResult';
import { MyWardrobe } from '@/components/MyWardrobe';
import { AddClothesModal } from '@/components/AddClothesModal';
import { FullBodyPhotoModal } from '@/components/FullBodyPhotoModal';
import {
  ClothingItem,
  NavTab,
  SavedOutfit,
  SuggestedLook,
  UserProfile,
} from '@/types/fashion';
import {
  DEFAULT_USER,
  INITIAL_CLOTHING_ITEMS,
} from '@/lib/fashion-data';

export default function AuraFitApp() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [tryOnStep, setTryOnStep] = useState<1 | 2 | 3>(1);

  // User State with Full-Body Photo
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);

  // Wardrobe Catalog (ZARA, PULL & BEAR, ZEN, etc. in DNT)
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>(INITIAL_CLOTHING_ITEMS);
  const [selectedGarment, setSelectedGarment] = useState<ClothingItem>(INITIAL_CLOTHING_ITEMS[0]);

  // Saved Outfits State — EMPTY BY DEFAULT (Requirement #5)
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);

  // Modals & Try-on State
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [pendingGarmentForPhoto, setPendingGarmentForPhoto] = useState<ClothingItem | null>(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  const handleToggleLike = (itemId: string) => {
    setClothingItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, liked: !item.liked } : item
      )
    );
  };

  // Requirement #1: When customer clicks "Try On Me" on an item, task them to confirm their full-body photo if not yet custom uploaded
  const handleSelectTryOn = (item: ClothingItem) => {
    setSelectedGarment(item);

    // If the customer hasn't uploaded their own personal photo yet, open the Full-Body Photo prompt
    if (!user.hasCustomUpload) {
      setPendingGarmentForPhoto(item);
      setIsPhotoModalOpen(true);
    } else {
      triggerTryOnGeneration();
    }
  };

  const handleConfirmPhoto = (newPhotoUrl: string) => {
    setUser((prev) => ({
      ...prev,
      photoUrl: newPhotoUrl,
      hasCustomUpload: true,
      isFullBodyVerified: true,
    }));
    setIsPhotoModalOpen(false);
    triggerTryOnGeneration();
  };

  const triggerTryOnGeneration = () => {
    setActiveTab('try-on');
    setIsGenerating(true);

    // Realistic fitting room generation
    setTimeout(() => {
      setIsGenerating(false);
      setTryOnStep(3); // Result screen (Screen 5)
    }, 4500);
  };

  const handleSaveToWardrobe = () => {
    const exists = savedOutfits.some(
      (o) => o.title.toLowerCase() === selectedGarment.title.toLowerCase()
    );

    if (!exists) {
      const newOutfit: SavedOutfit = {
        id: `outfit-${Date.now()}`,
        title: `${selectedGarment.boutique} ${selectedGarment.title}`,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        resultImageUrl:
          selectedGarment.tryOnResultUrl ||
          'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
        type: 'outfits',
        isFavorite: true,
        boutique: selectedGarment.boutique,
        totalPrice: selectedGarment.price,
        items: [
          { title: selectedGarment.title, price: selectedGarment.price, boutique: selectedGarment.boutique },
          { title: 'Classic Oxford Shirt', price: '59 DNT', boutique: 'ZEN' },
          { title: 'Tailored Pants', price: '119 DNT', boutique: 'ZARA' },
          { title: 'White Sneakers', price: '119 DNT', boutique: 'BERSHKA' },
        ],
      };
      setSavedOutfits((prev) => [newOutfit, ...prev]);
      showToast('Saved to My Wardrobe!');
    } else {
      showToast('Outfit is already in your Wardrobe.');
    }
  };

  const handleItemAdded = (newItem: ClothingItem) => {
    setClothingItems((prev) => [newItem, ...prev]);
    showToast(`"${newItem.title}" added to catalog!`);
  };

  const handleToggleFavorite = (outfitId: string) => {
    setSavedOutfits((prev) =>
      prev.map((o) =>
        o.id === outfitId ? { ...o, isFavorite: !o.isFavorite } : o
      )
    );
  };

  // Requirement #5: Try on a suggested look from the empty wardrobe
  const handleTrySuggestedLook = (sug: SuggestedLook) => {
    const matched = clothingItems.find((c) => c.id === sug.targetGarmentId) || clothingItems[0];
    setSelectedGarment(matched);
    setActiveTab('try-on');
    triggerTryOnGeneration();
  };

  const isCurrentSaved = savedOutfits.some(
    (o) => o.title.toLowerCase().includes(selectedGarment.title.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-gray-900 flex flex-col justify-between">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'try-on' && tryOnStep === 3) {
            setTryOnStep(2);
          }
        }}
        userPhotoUrl={user.photoUrl}
      />

      {/* Main Viewport */}
      <main className="flex-1">
        {/* Screen 1: Landing / Home Page with 5-Second Concept Animation */}
        {activeTab === 'home' && (
          <LandingPage
            onStart={() => {
              setActiveTab('try-on');
              setTryOnStep(2); // Jump directly to outfit catalog so customer sees clothes to try on!
            }}
            onBrowseBoutiques={() => {
              setActiveTab('try-on');
              setTryOnStep(2);
            }}
          />
        )}

        {/* Screen 2, 3, 4, 5: Try On Flow */}
        {activeTab === 'try-on' && (
          <>
            {isGenerating ? (
              /* Screen 4: Loading */
              <TryOnLoading />
            ) : tryOnStep === 1 ? (
              /* Screen 2: Step 1 – Onboarding (Full-Body Photo + Event) */
              <OnboardingStep
                user={user}
                onUpdateUser={handleUpdateUser}
                onContinue={() => setTryOnStep(2)}
              />
            ) : tryOnStep === 2 ? (
              /* Screen 3: Step 2 – Recommendations (ZARA, PULL & BEAR, ZEN in DNT) */
              <RecommendationsStep
                currentEvent={user.currentEvent}
                items={clothingItems}
                onBack={() => setTryOnStep(1)}
                onSelectTryOn={handleSelectTryOn}
                onOpenAddModal={() => setIsAddModalOpen(true)}
                onToggleLike={handleToggleLike}
              />
            ) : (
              /* Screen 5: Step 3 – Try-On Result on Customer Photo */
              <TryOnResult
                originalPhotoUrl={user.photoUrl}
                garment={selectedGarment}
                onBack={() => setTryOnStep(2)}
                onTryAnother={() => setTryOnStep(2)}
                onSaveToWardrobe={handleSaveToWardrobe}
                isSaved={isCurrentSaved}
              />
            )}
          </>
        )}

        {/* Screen 6: My Wardrobe (Empty initially with suggestions) */}
        {activeTab === 'wardrobe' && (
          <MyWardrobe
            outfits={savedOutfits}
            onAddNew={() => setIsAddModalOpen(true)}
            onSelectOutfit={(outfit) => {
              const matchingItem = clothingItems.find((c) =>
                outfit.items.some((i) => i.title === c.title)
              ) || clothingItems[0];
              setSelectedGarment({
                ...matchingItem,
                tryOnResultUrl: outfit.resultImageUrl,
              });
              setActiveTab('try-on');
              setTryOnStep(3);
            }}
            onToggleFavorite={handleToggleFavorite}
            onTrySuggestedLook={handleTrySuggestedLook}
            onExploreCatalog={() => {
              setActiveTab('try-on');
              setTryOnStep(2);
            }}
          />
        )}
      </main>

      {/* Full-Body Photo Confirmation Modal (Requirement #1 & #4) */}
      <FullBodyPhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        targetGarment={pendingGarmentForPhoto}
        currentUser={user}
        onConfirmPhoto={handleConfirmPhoto}
      />

      {/* Add Custom Clothes Modal */}
      <AddClothesModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onItemAdded={handleItemAdded}
      />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-gray-900 text-white text-xs font-semibold shadow-xl border border-gray-700 animate-fadeIn flex items-center space-x-2">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
