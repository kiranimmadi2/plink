import React, { useEffect, useRef } from 'react';
import { User, Settings, Heart, UserPlus, HelpCircle, Wallet } from 'lucide-react';

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

  if (!isMenuOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-md z-40 transition-all duration-300"
        onClick={closeMenu}
      />
      
      {/* Floating Menu */}
      <div 
        ref={menuRef}
        className={`fixed top-20 right-4 rounded-2xl py-2 w-64 z-50 transform transition-all duration-300 ease-out shadow-2xl ${
          isMenuOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2'
        } bg-white/25 backdrop-blur-[60px] border border-white/40 shadow-[0_25px_80px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.5)] ring-1 ring-white/30`}
      >
        {/* Wallet Section */}
        <div className="flex items-center justify-between px-4 py-3 mb-2 mx-2 rounded-xl transition-all duration-200 bg-white/10 backdrop-blur-[30px] border border-white/15">
          <div className="flex items-center">
            <div className="p-2 rounded-full mr-3 bg-white/20 backdrop-blur-[25px] border border-white/25">
              <Wallet className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-700 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
                Wallet
              </p>
              <p className="text-sm font-bold text-gray-800 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                ${walletBalance.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        
        {/* Menu Items */}
        <div className="space-y-1 px-1">
          <MenuButton
            icon={User}
            label="Profile"
            onClick={openProfileScreen}
          />
          <MenuButton
            icon={Heart}
            label="Favorites"
            onClick={closeMenu}
          />
          <MenuButton
            icon={UserPlus}
            label="Invite"
            onClick={closeMenu}
          />
          <MenuButton
            icon={Settings}
            label="Settings"
            onClick={openSettingsScreen}
          />
          <MenuButton
            icon={HelpCircle}
            label="FAQ"
            onClick={closeMenu}
          />
        </div>
      </div>
    </>
  );
};

const MenuButton = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center px-4 py-3 transition-all duration-200 transform hover:scale-[1.02] text-gray-800 font-medium drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] hover:bg-white/15 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:backdrop-blur-[35px] rounded-xl mx-1"
  >
    <Icon className="w-4 h-4 mr-3" />
    {label}
  </button>
);

export default DropdownMenu;