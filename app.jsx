import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import DropdownMenu from './components/DropdownMenu';
import MainContent from './components/MainContent';
import ChatInput from './components/ChatInput';
import { ChevronLeft, Star, Plus, X, Palette } from 'lucide-react';

// Main App component
const App = () => {
  const [isUserMode, setIsUserMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [showProfileScreen, setShowProfileScreen] = useState(false);
  const [showSettingsScreen, setShowSettingsScreen] = useState(false);
  const [hasUpgradedPlan, setHasUpgradedPlan] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');
  const [isIOSGlass, setIsIOSGlass] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [chatText, setChatText] = useState('');
  const [messages, setMessages] = useState([]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [walletBalance, setWalletBalance] = useState(1250.75);
  const [businessSections, setBusinessSections] = useState([
    { id: 'name', label: 'Business Name', value: '', type: 'text' },
    { id: 'description', label: 'Description', value: '', type: 'textarea' },
  ]);
  const spokenInputRef = useRef(null);

  // List of languages to populate the dropdown
  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'zh', label: 'Chinese (Mandarin)' },
    { value: 'hi', label: 'Hindi' },
    { value: 'ar', label: 'Arabic' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ru', label: 'Russian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'it', label: 'Italian' },
    { value: 'nl', label: 'Dutch' },
    { value: 'sv', label: 'Swedish' },
    { value: 'no', label: 'Norwegian' },
    { value: 'da', label: 'Danish' },
    { value: 'fi', label: 'Finnish' },
    { value: 'pl', label: 'Polish' },
    { value: 'tr', label: 'Turkish' },
    { value: 'th', label: 'Thai' },
    { value: 'vi', label: 'Vietnamese' },
    { value: 'id', label: 'Indonesian' },
    { value: 'ms', label: 'Malay' },
    { value: 'el', label: 'Greek' },
    { value: 'he', label: 'Hebrew' },
    { value: 'cs', label: 'Czech' },
    { value: 'hu', label: 'Hungarian' },
    { value: 'ro', label: 'Romanian' },
    { value: 'uk', label: 'Ukrainian' },
    { value: 'bn', label: 'Bengali' },
    { value: 'pa', label: 'Punjabi' },
    { value: 'ta', label: 'Tamil' },
    { value: 'te', label: 'Telugu' },
    { value: 'mr', label: 'Marathi' },
    { value: 'gu', label: 'Gujarati' },
    { value: 'kn', label: 'Kannada' },
    { value: 'ml', label: 'Malayalam' },
    { value: 'ur', label: 'Urdu' },
    { value: 'fa', label: 'Persian' },
    { value: 'sw', label: 'Swahili' },
    { value: 'am', label: 'Amharic' },
    { value: 'zu', label: 'Zulu' },
    { value: 'af', label: 'Afrikaans' },
  ];

  // Apply theme class to the body element
  useEffect(() => {
    if (isIOSGlass) {
      document.documentElement.classList.add('ios-glass');
      document.documentElement.classList.remove('dark');
    } else if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('ios-glass');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.remove('ios-glass');
    }
  }, [currentTheme, isIOSGlass]);

  // Toggle between User and Business modes
  const handleModeToggle = (mode) => {
    setIsUserMode(mode === 'personal');
  };

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Handle logo click to go home
  const handleLogoClick = () => {
    setShowProfileScreen(false);
    setShowSettingsScreen(false);
    setIsMenuOpen(false);
    setMessages([]);
    setIsChatExpanded(false);
    setIsListening(false);
    setHasInteracted(false);
  };

  // Adjust spoken text area height dynamically
  useEffect(() => {
    if (spokenInputRef.current && isListening) {
      spokenInputRef.current.style.height = 'auto';
      spokenInputRef.current.style.height = spokenInputRef.current.scrollHeight + 'px';
    }
  }, [spokenText, isListening]);

  // Handle chat text submission
  const handleChatSubmit = () => {
    if (chatText.trim()) {
      const newMessage = {
        id: Date.now(),
        text: chatText.trim(),
        sender: 'user'
      };
      setMessages(prev => [...prev, newMessage]);
      setChatText('');
      setIsChatExpanded(false);
      
      // Simulate AI response after a short delay
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          text: `I understand you're looking for help with: "${chatText.trim()}". How can I assist you further?`,
          sender: 'ai'
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  // Function to open the profile screen
  const openProfileScreen = () => {
    setIsMenuOpen(false);
    setShowProfileScreen(true);
  };

  // Function to close the profile screen
  const closeProfileScreen = () => {
    setShowProfileScreen(false);
  };

  // Function to open the settings screen
  const openSettingsScreen = () => {
    setIsMenuOpen(false);
    setShowSettingsScreen(true);
  };

  // Function to close the settings screen
  const closeSettingsScreen = () => {
    setShowSettingsScreen(false);
  };

  // Handle theme change
  const handleThemeChange = (e) => {
    const value = e.target.value;
    if (value === 'ios-glass') {
      setIsIOSGlass(true);
      setCurrentTheme('light');
    } else {
      setIsIOSGlass(false);
      setCurrentTheme(value);
    }
  };

  // Handle person icon click for listening
  const handlePersonClick = () => {
    setIsListening(!isListening);
    setHasInteracted(true);
    setIsChatExpanded(false);
    setSpokenText('');
  };

  // Handle change for business section input
  const handleBusinessSectionChange = (id, field, value) => {
    setBusinessSections(prevSections =>
      prevSections.map(section =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  // Add a new business section
  const addBusinessSection = () => {
    setBusinessSections(prevSections => [
      ...prevSections,
      { id: Date.now().toString(), label: 'New Field', value: '', type: 'text' }
    ]);
  };

  // Remove a business section
  const removeBusinessSection = (id) => {
    setBusinessSections(prevSections => prevSections.filter(section => section.id !== id));
  };

  // Simulate saving business details
  const saveBusinessDetails = () => {
    console.log('Saving Business Details:', businessSections);
    alert('Business details saved! (Check console for data)');
  };

  // Get theme classes based on current theme
  const getThemeClasses = () => {
    if (isIOSGlass) {
      return {
        background: 'bg-gradient-to-br from-gray-400/30 via-gray-300/25 to-gray-500/35',
        backgroundOverlay: 'bg-gradient-to-br from-white/15 via-gray-200/10 to-gray-300/20 backdrop-blur-3xl',
        container: 'bg-white/15 backdrop-blur-[60px] border border-white/25 shadow-[0_25px_80px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.4)] ring-1 ring-white/20',
        header: 'bg-white/10 backdrop-blur-[50px] border-b border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_1px_3px_rgba(0,0,0,0.05)]',
        content: 'bg-white/5 backdrop-blur-[40px]',
        text: 'text-gray-800 font-medium drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]',
        textSecondary: 'text-gray-700 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]',
        input: 'bg-white/20 backdrop-blur-[40px] border border-white/30 text-gray-800 placeholder-gray-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_0_rgba(255,255,255,0.4)] ring-1 ring-white/25 focus:ring-2 focus:ring-gray-400/30',
        button: 'bg-white/15 backdrop-blur-[40px] hover:bg-white/25 text-gray-800 border border-white/30 shadow-[0_8px_25px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.4)] ring-1 ring-white/25 hover:shadow-[0_12px_35px_rgba(0,0,0,0.12)] hover:ring-2 hover:ring-gray-400/25',
        buttonPrimary: 'bg-white/25 backdrop-blur-[40px] hover:bg-white/35 text-gray-800 font-semibold border border-white/40 shadow-[0_12px_35px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.5)] ring-1 ring-white/35 hover:shadow-[0_16px_45px_rgba(0,0,0,0.15)]',
        card: 'bg-white/12 backdrop-blur-[45px] border border-white/25 shadow-[0_15px_45px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.3)] ring-1 ring-white/20',
        menu: 'bg-white/18 backdrop-blur-[50px] border border-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.4)] ring-1 ring-white/25'
      };
    } else if (currentTheme === 'dark') {
      return {
        background: 'bg-gray-900',
        backgroundOverlay: 'bg-gray-900',
        container: 'bg-gray-800 border-gray-700 shadow-2xl',
        header: 'bg-gray-800 border-gray-700',
        content: 'bg-transparent',
        text: 'text-white',
        textSecondary: 'text-gray-400',
        input: 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500',
        button: 'bg-gray-700 hover:bg-gray-600 text-white border-gray-600',
        buttonPrimary: 'bg-green-600 hover:bg-green-700 text-white border-green-600',
        card: 'bg-gray-750 border-gray-700',
        menu: 'bg-gray-800 border-gray-700 shadow-2xl'
      };
    } else {
      return {
        background: 'bg-gradient-to-br from-blue-50/80 via-indigo-100/60 to-purple-100/80 backdrop-blur-2xl',
        backgroundOverlay: 'bg-gradient-to-br from-white/20 via-blue-50/15 to-indigo-100/25 backdrop-blur-2xl',
        container: 'bg-white border-gray-200',
        header: 'bg-white border-gray-100',
        content: 'bg-white',
        text: 'text-gray-800',
        textSecondary: 'text-gray-500',
        input: 'bg-gray-100 border-gray-300 text-gray-700 placeholder-gray-500',
        button: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
        buttonPrimary: 'bg-blue-500 hover:bg-blue-600 text-white',
        card: 'bg-gray-50',
        menu: 'bg-white border-gray-100'
      };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 font-sans relative overflow-hidden ${themeClasses.text}`}>
      {/* Enhanced Liquid Glass Background */}
      <div className={`fixed inset-0 ${themeClasses.background}`}></div>
      <div className={`fixed inset-0 ${themeClasses.backgroundOverlay}`}></div>
      
      {/* Floating Glass Orbs for Ambient Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full ${isIOSGlass ? 'bg-gradient-to-br from-white/8 to-gray-200/8' : currentTheme === 'dark' ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10' : 'bg-gradient-to-br from-blue-200/15 to-indigo-200/15'} backdrop-blur-3xl animate-pulse`}></div>
        <div className={`absolute top-3/4 right-1/4 w-80 h-80 rounded-full ${isIOSGlass ? 'bg-gradient-to-br from-gray-100/8 to-slate-200/8' : currentTheme === 'dark' ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10' : 'bg-gradient-to-br from-purple-200/15 to-pink-200/15'} backdrop-blur-3xl animate-pulse`} style={{animationDelay: '1s'}}></div>
        <div className={`absolute top-1/2 right-1/3 w-64 h-64 rounded-full ${isIOSGlass ? 'bg-gradient-to-br from-slate-100/8 to-gray-300/8' : currentTheme === 'dark' ? 'bg-gradient-to-br from-indigo-500/10 to-cyan-500/10' : 'bg-gradient-to-br from-indigo-200/15 to-blue-200/15'} backdrop-blur-3xl animate-pulse`} style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Main App Container */}
      <div className={`relative w-full max-w-sm rounded-3xl shadow-xl overflow-hidden flex flex-col min-h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] md:min-h-[600px] md:max-h-[800px] border ${themeClasses.container} z-10`}>

        {/* Conditional Rendering for Profile Screen, Settings Screen, or Main App */}
        {showProfileScreen ? (
          // Profile Screen
          <div className="flex flex-col flex-grow">
            <header className={`flex items-center p-4 border-b z-10 ${themeClasses.header}`}>
              <button
                onClick={closeProfileScreen}
                className={`p-2 mr-2 rounded-full shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeClasses.button}`}
                aria-label="Go back"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h2 className={`text-xl font-semibold flex-grow text-center pr-10 ${themeClasses.text}`}>Profile</h2>
            </header>
            <main className={`flex-grow p-6 overflow-y-auto ${themeClasses.content}`}>
              {/* User Info Section */}
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 text-2xl font-bold mr-4">
                  {isUserMode ? 'U' : 'B'}
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${themeClasses.text}`}>{isUserMode ? 'User Name' : 'Business Name'}</h3>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>{isUserMode ? 'user@example.com' : 'business@example.com'}</p>
                </div>
              </div>

              {/* Upgrade Plan Section (Conditional) */}
              {!hasUpgradedPlan && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8 flex items-center justify-between shadow-sm">
                  <div className="flex items-center">
                    <Star className="w-6 h-6 text-yellow-500 mr-3" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">Upgrade Your Plan</h4>
                      <p className="text-sm text-yellow-700">Unlock more features and benefits!</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setHasUpgradedPlan(true)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-full text-sm font-medium hover:bg-yellow-600 transition-colors duration-200 shadow-md"
                  >
                    Upgrade
                  </button>
                </div>
              )}

              {/* Conditional Personalization/Business Details */}
              {isUserMode ? (
                // Personalization Section for User Mode
                <div className={`rounded-2xl p-4 shadow-sm ${themeClasses.card}`}>
                  <h4 className={`font-semibold mb-4 ${themeClasses.text}`}>Personal Settings</h4>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="language" className={`block text-sm font-medium mb-1 ${themeClasses.textSecondary}`}>Language</label>
                      <select
                        id="language"
                        className={`w-full p-2 border rounded-xl focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                      >
                        {languages.map((lang) => (
                          <option key={lang.value} value={lang.value}>
                            {lang.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="tone" className={`block text-sm font-medium mb-1 ${themeClasses.textSecondary}`}>Default Tone</label>
                      <select
                        id="tone"
                        className={`w-full p-2 border rounded-xl focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                      >
                        <option>Friendly</option>
                        <option>Formal</option>
                        <option>Casual</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                // Business Details Section for Business Mode
                <div className={`rounded-2xl p-4 shadow-sm ${themeClasses.card}`}>
                  <h4 className={`font-semibold mb-4 ${themeClasses.text}`}>Business Details</h4>
                  <div className="space-y-4 mb-4">
                    {businessSections.map((section) => (
                      <div key={section.id} className={`flex flex-col space-y-2 border rounded-xl p-3 ${isIOSGlass ? 'border-white/15' : currentTheme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
                        <div className="flex justify-between items-center">
                          <input
                            type="text"
                            value={section.label}
                            onChange={(e) => handleBusinessSectionChange(section.id, 'label', e.target.value)}
                            className={`flex-grow p-2 mr-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                            placeholder="Field Label"
                          />
                          <button
                            onClick={() => removeBusinessSection(section.id)}
                            className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200"
                            aria-label="Remove section"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        {section.type === 'text' ? (
                          <input
                            type="text"
                            value={section.value}
                            onChange={(e) => handleBusinessSectionChange(section.id, 'value', e.target.value)}
                            className={`w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                            placeholder={`Enter ${section.label.toLowerCase()}`}
                          />
                        ) : (
                          <textarea
                            value={section.value}
                            onChange={(e) => handleBusinessSectionChange(section.id, 'value', e.target.value)}
                            className={`w-full p-2 border rounded-lg resize-y focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                            placeholder={`Enter ${section.label.toLowerCase()}`}
                            rows={3}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={addBusinessSection}
                    className={`w-full flex items-center justify-center px-4 py-2 rounded-2xl text-sm font-medium transition-colors duration-200 ${themeClasses.buttonPrimary}`}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add New Field
                  </button>
                  <button
                    onClick={saveBusinessDetails}
                    className={`w-full mt-4 flex items-center justify-center px-4 py-2 rounded-2xl text-sm font-medium transition-colors duration-200 ${isIOSGlass ? 'bg-green-500/60 backdrop-blur-xl hover:bg-green-600/70 text-white' : currentTheme === 'dark' ? 'bg-green-700 text-white hover:bg-green-600' : 'bg-green-500 text-white hover:bg-green-600'}`}
                  >
                    Save Business Details
                  </button>
                </div>
              )}
            </main>
          </div>
        ) : showSettingsScreen ? (
          // Settings Screen
          <div className="flex flex-col flex-grow">
            <header className={`flex items-center p-4 border-b z-10 ${themeClasses.header}`}>
              <button
                onClick={closeSettingsScreen}
                className={`p-2 mr-2 rounded-full shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeClasses.button}`}
                aria-label="Go back"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h2 className={`text-xl font-semibold flex-grow text-center pr-10 ${themeClasses.text}`}>Settings</h2>
            </header>
            <main className={`flex-grow p-6 overflow-y-auto ${themeClasses.content}`}>
              {/* Theme Setting */}
              <div className={`rounded-2xl p-4 shadow-sm mb-4 ${themeClasses.card}`}>
                <h4 className={`font-semibold mb-4 flex items-center ${themeClasses.text}`}>
                  <Palette className={`w-5 h-5 mr-2 ${themeClasses.textSecondary}`} /> Theme
                </h4>
                <div>
                  <label htmlFor="theme" className={`block text-sm font-medium mb-1 ${themeClasses.textSecondary}`}>App Theme</label>
                  <select
                    id="theme"
                    value={isIOSGlass ? 'ios-glass' : currentTheme}
                    onChange={handleThemeChange}
                    className={`w-full p-2 border rounded-xl focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="ios-glass">iOS Glass</option>
                    <option value="system">System Default</option>
                  </select>
                </div>
              </div>
              <div className={`rounded-2xl p-4 shadow-sm ${themeClasses.card}`}>
                <h4 className={`font-semibold mb-4 ${themeClasses.text}`}>
                  Account Settings
                </h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-blue-600 hover:underline">Change Password</a></li>
                  <li><a href="#" className="text-blue-600 hover:underline">Manage Notifications</a></li>
                  <li><a href="#" className="text-red-600 hover:underline">Delete Account</a></li>
                </ul>
              </div>
            </main>
          </div>
        ) : (
          // Main App Content
          <>
            <Navbar
              isUserMode={isUserMode}
              handleModeToggle={handleModeToggle}
              isMenuOpen={isMenuOpen}
              toggleMenu={toggleMenu}
              handleLogoClick={handleLogoClick}
              themeClasses={themeClasses}
            />

            <DropdownMenu
              isMenuOpen={isMenuOpen}
              closeMenu={closeMenu}
              openProfileScreen={openProfileScreen}
              openSettingsScreen={openSettingsScreen}
              walletBalance={walletBalance}
              themeClasses={themeClasses}
            />

            <MainContent
              messages={messages}
              isListening={isListening}
              hasInteracted={hasInteracted}
              isChatExpanded={isChatExpanded}
              handlePersonClick={handlePersonClick}
              spokenText={spokenText}
              setSpokenText={setSpokenText}
              spokenInputRef={spokenInputRef}
              themeClasses={themeClasses}
            />

            <ChatInput
              chatText={chatText}
              setChatText={setChatText}
              isChatExpanded={isChatExpanded}
              setIsChatExpanded={setIsChatExpanded}
              hasInteracted={hasInteracted}
              setHasInteracted={setHasInteracted}
              handleChatSubmit={handleChatSubmit}
              themeClasses={themeClasses}
            />
          </>
        )}
      </div>

      {/* Enhanced CSS Styles */}
      <style>{`
        /* Enhanced Liquid Glass Effects */
        .liquid-glass-button {
          position: relative;
          overflow: hidden;
        }
        
        .liquid-glass-button::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transform: rotate(45deg);
          transition: all 0.6s ease;
          opacity: 0;
        }
        
        .liquid-glass-button:hover::before {
          opacity: 1;
          transform: rotate(45deg) translate(50%, 50%);
        }
        
        @keyframes pulse-fast {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }
        .animate-pulse-fast {
          animation: pulse-fast 1s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }
        
        /* Custom scrollbar for glass effect */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
          backdrop-filter: blur(10px);
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        
        /* Enhanced glass morphism effects */
        .ios-glass {
          --tw-backdrop-blur: blur(40px);
          background-attachment: fixed;
        }
        
        /* Frosted glass effect */
        .ios-glass *[class*="backdrop-blur"] {
          backdrop-filter: blur(50px) saturate(120%) brightness(105%);
          -webkit-backdrop-filter: blur(50px) saturate(120%) brightness(105%);
        }
        
        /* Enhanced background glass effect */
        body {
          background-attachment: fixed;
        }
        
        /* Enhanced background blur for better glass effect */
        .backdrop-blur-3xl {
          backdrop-filter: blur(80px) saturate(130%) brightness(110%);
          -webkit-backdrop-filter: blur(80px) saturate(130%) brightness(110%);
        }
        
        /* Responsive design improvements */
        @media (max-width: 640px) {
          .fixed.top-20.right-4 {
            right: 1rem;
            left: 1rem;
            width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default App;