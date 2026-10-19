'use client';

import React from 'react';
import { NavTab } from '@/types/fashion';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  userPhotoUrl: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  userPhotoUrl,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#121420] border-b border-[#1f2335] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          onClick={() => onSelectTab('home')}
          className="flex items-center space-x-2.5 cursor-pointer select-none"
        >
          {/* Clothes Hanger Logo matching screenshot */}
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <svg
              className="w-5 h-5 text-indigo-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a3 3 0 0 0-3 3c0 .8.3 1.5.8 2.1L2.4 14.5A2 2 0 0 0 4 17.5h16a2 2 0 0 0 1.6-3L14.2 7.1c.5-.6.8-1.3.8-2.1a3 3 0 0 0-3-3z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Aura-Fit
          </span>
        </div>

        {/* Center Navigation Links */}
        <nav className="flex items-center space-x-8 text-sm font-medium">
          <button
            onClick={() => onSelectTab('home')}
            className={`transition relative py-1 ${
              activeTab === 'home'
                ? 'text-white font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Home
            {activeTab === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => onSelectTab('try-on')}
            className={`transition relative py-1 ${
              activeTab === 'try-on'
                ? 'text-white font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Try On
            {activeTab === 'try-on' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => onSelectTab('wardrobe')}
            className={`transition relative py-1 ${
              activeTab === 'wardrobe'
                ? 'text-white font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            My Wardrobe
            {activeTab === 'wardrobe' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
            )}
          </button>
        </nav>

        {/* User Avatar */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-indigo-500/50">
            <img
              src={userPhotoUrl}
              alt="User"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
