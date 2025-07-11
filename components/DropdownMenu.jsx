import React, { useEffect, useRef } from 'react';
import { User, Settings, Heart, UserPlus, HelpCircle, Wallet, X } from 'lucide-react';

const DropdownMenu = ({ 
  isMenuOpen, 
  closeMenu, 
  openProfileScreen, 
  openSettingsScreen, 
  walletBalance,
  themeClasses 
}) => {
  const menuRef = useRef(null);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <>
      {/* Backdrop overlay - only shows when menu is open */}
      <div 
        className={`absolute inset-0 transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        } ${
          themeClasses.background.includes('ios-glass')
            ? 'bg-black/20 backdrop-blur-md'
            : themeClasses.background === 'bg-gray-900' 
              ? 'bg-black/30' 
              : 'bg-black/10 backdrop-blur-sm'
        }`}
        onClick={closeMenu}
      />
      
      {/* Side Menu - slides in from right */}
      <div 
        ref={menuRef}
        className={`fixed top-0 right-0 w-80 h-full transform transition-all duration-500 ease-out ${
          isMenuOpen 
            ? 'translate-x-0 opacity-100' 
            : 'translate-x-full opacity-0'
        } ${
          themeClasses.background.includes('ios-glass')
            ? 'bg-white/20 backdrop-blur-[80px] border-l border-white/25 shadow-[-25px_0_80px_rgba(0,0,0,0.15)]'
            : themeClasses.menu
        } shadow-2xl z-50`}
      >
        {/* Menu Header with Close Button */}
        <div className={`flex items-center justify-between p-6 border-b ${
          themeClasses.background.includes('ios-glass')
            ? 'border-white/20'
            : 'border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold ${themeClasses.text}`}>Menu</h3>
          <button
            onClick={closeMenu}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
              themeClasses.background.includes('ios-glass')
                ? 'bg-white/15 backdrop-blur-[40px] border border-white/30 hover:bg-white/25'
                : themeClasses.button
            }`}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex flex-col py-4">
          {/* Wallet Section */}
          <div className={`flex items-center justify-between px-6 py-4 mx-4 my-3 rounded-xl transition-all duration-200 ${
            themeClasses.background.includes('ios-glass')
              ? 'bg-white/15 backdrop-blur-[60px] border border-white/20 shadow-[0_12px_35px_rgba(0,0,0,0.08)] ring-1 ring-white/15'
              : themeClasses.card
          }`}>
            <div className="flex items-center">
              <div className={`p-3 rounded-full mr-4 ${
                themeClasses.background.includes('ios-glass')
                  ? 'bg-white/20 backdrop-blur-[40px] border border-white/25'
                  : themeClasses.button
              }`}>
                <Wallet className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>
                  Wallet
                </p>
                <p className={`text-lg font-bold ${themeClasses.text}`}>
                  ${walletBalance.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="px-2">
            <div className="space-y-2">
              <MenuButton
                icon={User}
                label="Profile"
                onClick={openProfileScreen}
                themeClasses={themeClasses}
              />
              <MenuButton
                icon={Heart}
                label="Favorites"
                onClick={closeMenu}
                themeClasses={themeClasses}
              />
              <MenuButton
                icon={UserPlus}
                label="Invite"
                onClick={closeMenu}
                themeClasses={themeClasses}
              />
              <MenuButton
                icon={Settings}
                label="Settings"
                onClick={openSettingsScreen}
                themeClasses={themeClasses}
              />
              <MenuButton
                icon={HelpCircle}
                label="FAQ"
                onClick={closeMenu}
                themeClasses={themeClasses}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MenuButton = ({ icon: Icon, label, onClick, themeClasses }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-6 py-4 transition-all duration-200 rounded-xl mx-4 group ${themeClasses.text} ${
      themeClasses.background.includes('ios-glass')
        ? 'hover:bg-white/12 hover:backdrop-blur-[50px] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:ring-1 hover:ring-white/20'
        : `hover:${themeClasses.card}`
    }`}
  >
    <Icon className="w-5 h-5 mr-4 transition-transform duration-200 group-hover:scale-110" />
    <span className="font-medium text-base">{label}</span>
  </button>
);

export default DropdownMenu;