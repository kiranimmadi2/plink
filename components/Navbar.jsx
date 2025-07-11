import React from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ 
  isUserMode, 
  handleModeToggle, 
  isMenuOpen, 
  toggleMenu, 
  handleLogoClick,
  themeClasses 
}) => {
  return (
    <header className={`relative flex items-center justify-between p-4 border-b z-50 ${themeClasses.header}`}>
      {/* PLINK Logo - Fixed Left */}
      <button
        onClick={handleLogoClick}
        className={`text-xl font-bold transition-all duration-300 transform hover:scale-110 focus:outline-none rounded-lg px-2 py-1 ${themeClasses.text}`}
      >
        PLINK
      </button>

      {/* Center Toggle - Absolute Center */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <div className={`flex rounded-full p-1 shadow-inner ${
          themeClasses.background.includes('ios-glass') || themeClasses.background.includes('white') 
            ? 'bg-white/8 backdrop-blur-xl' 
            : themeClasses.card
        }`}>
          <button
            onClick={() => handleModeToggle('personal')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
              isUserMode 
                ? themeClasses.background.includes('ios-glass') 
                  ? 'bg-white/30 backdrop-blur-[35px] text-gray-800 shadow-[0_8px_25px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.5)] ring-1 ring-white/35' 
                  : themeClasses.buttonPrimary
                : `${themeClasses.textSecondary} hover:bg-white/15 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:backdrop-blur-[30px]`
            }`}
          >
            Personal
          </button>
          <button
            onClick={() => handleModeToggle('business')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
              !isUserMode 
                ? themeClasses.background.includes('ios-glass') 
                  ? 'bg-white/30 backdrop-blur-[35px] text-gray-800 shadow-[0_8px_25px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.5)] ring-1 ring-white/35' 
                  : themeClasses.buttonPrimary
                : `${themeClasses.textSecondary} hover:bg-white/15 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:backdrop-blur-[30px]`
            }`}
          >
            Business
          </button>
        </div>
      </div>

      {/* Hamburger Menu - Fixed Right */}
      <button
        onClick={toggleMenu}
        className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none z-50 relative ${themeClasses.button}`}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <div className="relative w-6 h-6">
          <Menu 
            className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
              isMenuOpen ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'
            }`} 
          />
          <X 
            className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
              isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-75'
            }`} 
          />
        </div>
      </button>
    </header>
  );
};

export default Navbar;