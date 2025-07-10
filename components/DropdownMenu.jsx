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
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          themeClasses.background === 'bg-gray-900' 
            ? 'bg-black/50' 
            : 'bg-black/20 backdrop-blur-md'
        }`}
        onClick={closeMenu}
      />
      
      {/* Floating Menu */}
      <div 
        ref={menuRef}
        className={`fixed top-20 right-4 w-64 max-w-[calc(100vw-2rem)] rounded-2xl py-2 z-50 transform transition-all duration-300 ease-out ${
          isMenuOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2'
        } ${themeClasses.menu}`}
        style={{
          left: 'auto',
          right: '1rem',
          maxWidth: 'calc(100vw - 2rem)'
        }}
      >
        {/* Wallet Section */}
        <div className={`flex items-center justify-between px-4 py-3 mb-2 mx-2 rounded-xl transition-all duration-200 ${themeClasses.card}`}>
          <div className="flex items-center">
            <div className={`p-2 rounded-full mr-3 ${themeClasses.button}`}>
              <Wallet className="w-4 h-4 text-green-600" />
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
        <div className="space-y-1 px-1">
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
    </>
  );
};

const MenuButton = ({ icon: Icon, label, onClick, themeClasses }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-4 py-3 transition-all duration-200 rounded-xl mx-1 ${themeClasses.text} hover:${themeClasses.button.replace('bg-', 'hover:bg-')}`}
  >
    <Icon className="w-4 h-4 mr-3" />
    {label}
  </button>
);

export default DropdownMenu;