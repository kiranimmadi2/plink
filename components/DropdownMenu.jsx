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
          themeClasses.background === 'bg-gray-900' 
            ? 'bg-black/30' 
            : 'bg-black/10 backdrop-blur-sm'
        }`}
        onClick={closeMenu}
      />
      
      {/* Side Menu - slides in from right */}
      <div 
        ref={menuRef}
        className={`absolute top-16 right-4 w-56 transform transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'translate-x-0 opacity-100' 
            : 'translate-x-full opacity-0'
        } ${themeClasses.menu} rounded-2xl shadow-2xl z-50`}
      >
        {/* Menu Content */}
        <div className="flex flex-col py-2">
          {/* Wallet Section */}
          <div className={`flex items-center justify-between px-4 py-3 mx-3 my-2 rounded-xl transition-all duration-200 ${themeClasses.card}`}>
            <div className="flex items-center">
              <div className={`p-2 rounded-full mr-3 ${themeClasses.button}`}>
                <Wallet className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className={`text-xs font-medium ${themeClasses.textSecondary}`}>
                  Wallet
                </p>
                <p className={`text-sm font-bold ${themeClasses.text}`}>
                  ${walletBalance.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="px-1">
            <div className="space-y-1">
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
    className={`w-full flex items-center px-4 py-2.5 transition-all duration-200 rounded-lg mx-2 group ${themeClasses.text} hover:${themeClasses.card}`}
  >
    <Icon className="w-4 h-4 mr-3 transition-transform duration-200 group-hover:scale-110" />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

export default DropdownMenu;