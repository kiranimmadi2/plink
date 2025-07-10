import React, { useState, useEffect, useRef } from 'react';
import { Menu, User, Settings, Mic, ArrowUp, ChevronLeft, Star, Palette, Headphones, Plus, X, Wallet, Heart, UserPlus, HelpCircle } from 'lucide-react';

// Main App component
const App = () => {
  const [isUserMode, setIsUserMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [showProfileScreen, setShowProfileScreen] = useState(false);
  const [showSettingsScreen, setShowSettingsScreen] = useState(false);
  const [hasUpgradedPlan, setHasUpgradedPlan] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');
  const [isIOSGlass, setIsIOSGlass] = useState(false);
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
  const chatInputRef = useRef(null);
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
    // Add more languages as needed
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
    setIsUserMode(mode === 'user');
  };

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
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

  // Handle chat input focus to expand
  const handleChatFocus = () => {
    setIsChatExpanded(true);
    setHasInteracted(true);
    setIsListening(false); // Close listening mode if chat is focused
  };

  // Handle chat input blur to collapse, but only if not actively focused
  const handleChatBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget) && chatText === '' && hasInteracted) {
      setIsChatExpanded(false);
    }
  };

  // Adjust textarea height dynamically based on content
  useEffect(() => {
    if (chatInputRef.current) {
      chatInputRef.current.style.height = 'auto';
      chatInputRef.current.style.height = chatInputRef.current.scrollHeight + 'px';
    }
  }, [isChatExpanded]);

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

  // Handle Enter key press in chat input
  const handleChatKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChatSubmit();
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
    setIsChatExpanded(false); // Collapse chat if listening mode is activated
    setSpokenText(''); // Clear previous spoken text
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
    // In a real app, you would send this data to a backend
    alert('Business details saved! (Check console for data)');
  };

  // Get theme classes based on current theme
  const getThemeClasses = () => {
    if (isIOSGlass) {
      return {
        background: 'bg-gradient-to-br from-indigo-100/80 via-purple-50/60 to-pink-100/80 backdrop-blur-3xl',
        backgroundOverlay: 'bg-gradient-to-br from-white/30 via-blue-50/20 to-purple-100/30 backdrop-blur-3xl',
        container: 'bg-white/20 backdrop-blur-[40px] border border-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.4)] ring-1 ring-white/20',
        header: 'bg-white/15 backdrop-blur-[30px] border-b border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_1px_3px_rgba(0,0,0,0.1)]',
        content: 'bg-transparent',
        text: 'text-slate-900 font-medium drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]',
        textSecondary: 'text-slate-700 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]',
        input: 'bg-white/25 backdrop-blur-[25px] border border-white/40 text-slate-900 placeholder-slate-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.4)] ring-1 ring-white/30 focus:ring-2 focus:ring-blue-400/50',
        button: 'bg-white/20 backdrop-blur-[25px] hover:bg-white/30 text-slate-900 border border-white/40 shadow-[0_8px_25px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.4)] ring-1 ring-white/30 hover:shadow-[0_12px_35px_rgba(0,0,0,0.2)] hover:ring-2 hover:ring-blue-400/30',
        buttonPrimary: 'bg-gradient-to-r from-blue-500/80 to-purple-600/80 backdrop-blur-[25px] hover:from-blue-600/90 hover:to-purple-700/90 text-white font-semibold border border-white/40 shadow-[0_12px_35px_rgba(59,130,246,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] ring-1 ring-white/40 hover:shadow-[0_16px_45px_rgba(59,130,246,0.5)]',
        card: 'bg-white/18 backdrop-blur-[30px] border border-white/30 shadow-[0_15px_45px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.3)] ring-1 ring-white/25',
        menu: 'bg-white/22 backdrop-blur-[35px] border border-white/35 shadow-[0_20px_60px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.4)] ring-1 ring-white/30'
      };
    } else if (currentTheme === 'dark') {
      return {
        background: 'bg-gradient-to-br from-slate-950/90 via-indigo-950/80 to-purple-950/90 backdrop-blur-3xl',
        backgroundOverlay: 'bg-gradient-to-br from-black/40 via-indigo-950/30 to-purple-950/40 backdrop-blur-3xl',
        container: 'bg-black/40 backdrop-blur-[40px] border border-cyan-400/30 shadow-[0_20px_60px_rgba(6,182,212,0.3),inset_0_1px_0_rgba(6,182,212,0.2)] ring-1 ring-cyan-400/20',
        header: 'bg-black/30 backdrop-blur-[30px] border-b border-cyan-400/25 shadow-[inset_0_1px_0_rgba(6,182,212,0.2),0_1px_3px_rgba(6,182,212,0.1)]',
        content: 'bg-transparent',
        text: 'text-cyan-50 font-medium drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]',
        textSecondary: 'text-cyan-200 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]',
        input: 'bg-black/35 backdrop-blur-[25px] border border-cyan-400/40 text-cyan-50 placeholder-cyan-300/70 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_1px_0_rgba(6,182,212,0.2)] ring-1 ring-cyan-400/30 focus:ring-2 focus:ring-cyan-400/60',
        button: 'bg-black/30 backdrop-blur-[25px] hover:bg-black/40 text-cyan-50 border border-cyan-400/40 shadow-[0_8px_25px_rgba(6,182,212,0.3),inset_0_1px_0_rgba(6,182,212,0.2)] ring-1 ring-cyan-400/30 hover:shadow-[0_12px_35px_rgba(6,182,212,0.4)] hover:ring-2 hover:ring-cyan-400/50',
        buttonPrimary: 'bg-gradient-to-r from-cyan-500/70 to-blue-500/70 backdrop-blur-[25px] hover:from-cyan-400/80 hover:to-blue-400/80 text-white font-semibold border border-cyan-400/50 shadow-[0_12px_35px_rgba(6,182,212,0.5),inset_0_1px_0_rgba(6,182,212,0.3)] ring-1 ring-cyan-400/40 hover:shadow-[0_16px_45px_rgba(6,182,212,0.6)]',
        card: 'bg-black/25 backdrop-blur-[30px] border border-cyan-400/30 shadow-[0_15px_45px_rgba(6,182,212,0.2),inset_0_1px_0_rgba(6,182,212,0.15)] ring-1 ring-cyan-400/25',
        menu: 'bg-black/35 backdrop-blur-[35px] border border-cyan-400/35 shadow-[0_20px_60px_rgba(6,182,212,0.3),inset_0_1px_0_rgba(6,182,212,0.2)] ring-1 ring-cyan-400/30'
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
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full ${isIOSGlass ? 'bg-gradient-to-br from-blue-200/20 to-purple-200/20' : currentTheme === 'dark' ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10' : 'bg-gradient-to-br from-blue-200/15 to-indigo-200/15'} backdrop-blur-3xl animate-pulse`}></div>
        <div className={`absolute top-3/4 right-1/4 w-80 h-80 rounded-full ${isIOSGlass ? 'bg-gradient-to-br from-purple-200/20 to-pink-200/20' : currentTheme === 'dark' ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10' : 'bg-gradient-to-br from-purple-200/15 to-pink-200/15'} backdrop-blur-3xl animate-pulse`} style={{animationDelay: '1s'}}></div>
        <div className={`absolute top-1/2 right-1/3 w-64 h-64 rounded-full ${isIOSGlass ? 'bg-gradient-to-br from-indigo-200/20 to-blue-200/20' : currentTheme === 'dark' ? 'bg-gradient-to-br from-indigo-500/10 to-cyan-500/10' : 'bg-gradient-to-br from-indigo-200/15 to-blue-200/15'} backdrop-blur-3xl animate-pulse`} style={{animationDelay: '2s'}}></div>
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
                    onChange={handleThemeChange} // Handle theme change
                    className={`w-full p-2 border rounded-xl focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="ios-glass">iOS Glass</option>
                    <option value="system">System Default</option>
                  </select>
                </div>
              </div>
              {/* Add more settings options here */}
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
            <header className={`relative flex items-center justify-center p-4 border-b z-10 ${themeClasses.header}`}>
              {/* PLINK Logo */}
              <button
                onClick={handleLogoClick}
                className={`absolute left-4 text-xl font-bold transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 ${isIOSGlass ? 'focus:ring-blue-400/50 text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text' : currentTheme === 'dark' ? 'focus:ring-cyan-400/50 text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text' : 'focus:ring-blue-500 text-blue-600'}`}
              >
                PLINK
              </button>

              {/* User/Business Toggle */}
              <div className={`flex rounded-full p-1 shadow-inner ${isIOSGlass ? 'bg-white/8 backdrop-blur-xl' : currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <button
                  onClick={() => handleModeToggle('personal')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isUserMode ? `${isIOSGlass ? 'bg-gradient-to-r from-blue-500/80 to-purple-600/80 backdrop-blur-[20px] text-white shadow-[0_8px_25px_rgba(59,130,246,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] ring-1 ring-white/40' : currentTheme === 'dark' ? 'bg-gradient-to-r from-cyan-500/70 to-blue-500/70 text-white shadow-[0_8px_25px_rgba(6,182,212,0.5)]' : 'bg-blue-600 text-white shadow-md'}` : `${isIOSGlass ? 'text-slate-800 hover:bg-white/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:backdrop-blur-[15px]' : currentTheme === 'dark' ? 'text-cyan-200 hover:bg-black/20 hover:shadow-[0_2px_8px_rgba(6,182,212,0.2)]' : 'text-gray-700 hover:bg-gray-200'}`
                  }`}
                >
                  Personal
                </button>
                <button
                  onClick={() => handleModeToggle('business')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                    !isUserMode ? `${isIOSGlass ? 'bg-gradient-to-r from-blue-500/80 to-purple-600/80 backdrop-blur-[20px] text-white shadow-[0_8px_25px_rgba(59,130,246,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] ring-1 ring-white/40' : currentTheme === 'dark' ? 'bg-gradient-to-r from-cyan-500/70 to-blue-500/70 text-white shadow-[0_8px_25px_rgba(6,182,212,0.5)]' : 'bg-blue-600 text-white shadow-md'}` : `${isIOSGlass ? 'text-slate-800 hover:bg-white/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:backdrop-blur-[15px]' : currentTheme === 'dark' ? 'text-cyan-200 hover:bg-black/20 hover:shadow-[0_2px_8px_rgba(6,182,212,0.2)]' : 'text-gray-700 hover:bg-gray-200'}`
                  }`}
                >
                  Business
                </button>
              </div>

              {/* Menu Icon */}
              <button
                onClick={toggleMenu}
                className={`absolute right-4 p-2 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 ${isIOSGlass ? 'focus:ring-blue-400/50' : currentTheme === 'dark' ? 'focus:ring-cyan-400/50' : 'focus:ring-blue-500'} ${themeClasses.button}`}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <>
                  {/* Backdrop overlay */}
                  <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-15"
                    onClick={closeMenu}
                  ></div>
                  
                  <div className={`absolute top-16 right-4 rounded-2xl py-2 w-56 z-20 animate-fade-in transform transition-all duration-300 ${themeClasses.menu} liquid-glass-menu`}>
                    {/* Wallet Section */}
                    <div className={`flex items-center justify-between px-4 py-3 mb-2 mx-2 rounded-xl transition-all duration-200 ${isIOSGlass ? 'bg-white/15 backdrop-blur-[20px] border border-white/20' : currentTheme === 'dark' ? 'bg-black/20 backdrop-blur-[20px] border border-cyan-400/20' : 'bg-gray-50 border border-gray-200'}`}>
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full mr-3 ${isIOSGlass ? 'bg-gradient-to-r from-green-400/60 to-emerald-500/60 backdrop-blur-[15px]' : currentTheme === 'dark' ? 'bg-gradient-to-r from-green-500/70 to-emerald-500/70' : 'bg-green-500'}`}>
                          <Wallet className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className={`text-xs font-medium ${themeClasses.textSecondary}`}>Wallet</p>
                          <p className={`text-sm font-bold ${themeClasses.text}`}>${walletBalance.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={openProfileScreen}
                      className={`w-full flex items-center px-4 py-3 transition-all duration-200 transform hover:scale-[1.02] ${themeClasses.text} ${isIOSGlass ? 'hover:bg-white/25 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:backdrop-blur-[20px] rounded-xl mx-1' : currentTheme === 'dark' ? 'hover:bg-black/30 hover:shadow-[0_2px_8px_rgba(6,182,212,0.2)]' : 'hover:bg-gray-100'}`}
                    >
                      <User className="w-4 h-4 mr-2" /> Profile
                    </button>
                    <button
                      onClick={closeMenu}
                      className={`w-full flex items-center px-4 py-3 transition-all duration-200 transform hover:scale-[1.02] ${themeClasses.text} ${isIOSGlass ? 'hover:bg-white/25 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:backdrop-blur-[20px] rounded-xl mx-1' : currentTheme === 'dark' ? 'hover:bg-black/30 hover:shadow-[0_2px_8px_rgba(6,182,212,0.2)]' : 'hover:bg-gray-100'}`}
                    >
                      <Heart className="w-4 h-4 mr-2" /> Favorites
                    </button>
                    <button
                      onClick={closeMenu}
                      className={`w-full flex items-center px-4 py-3 transition-all duration-200 transform hover:scale-[1.02] ${themeClasses.text} ${isIOSGlass ? 'hover:bg-white/25 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:backdrop-blur-[20px] rounded-xl mx-1' : currentTheme === 'dark' ? 'hover:bg-black/30 hover:shadow-[0_2px_8px_rgba(6,182,212,0.2)]' : 'hover:bg-gray-100'}`}
                    >
                      <UserPlus className="w-4 h-4 mr-2" /> Invite
                    </button>
                    <button
                      onClick={openSettingsScreen}
                      className={`w-full flex items-center px-4 py-3 transition-all duration-200 transform hover:scale-[1.02] ${themeClasses.text} ${isIOSGlass ? 'hover:bg-white/25 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:backdrop-blur-[20px] rounded-xl mx-1' : currentTheme === 'dark' ? 'hover:bg-black/30 hover:shadow-[0_2px_8px_rgba(6,182,212,0.2)]' : 'hover:bg-gray-100'}`}
                    >
                      <Settings className="w-4 h-4 mr-2" /> Settings
                    </button>
                    <button
                      onClick={closeMenu}
                      className={`w-full flex items-center px-4 py-3 transition-all duration-200 transform hover:scale-[1.02] ${themeClasses.text} ${isIOSGlass ? 'hover:bg-white/25 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:backdrop-blur-[20px] rounded-xl mx-1' : currentTheme === 'dark' ? 'hover:bg-black/30 hover:shadow-[0_2px_8px_rgba(6,182,212,0.2)]' : 'hover:bg-gray-100'}`}
                    >
                      <HelpCircle className="w-4 h-4 mr-2" /> FAQ
                    </button>
                  </div>
                </>
              )}
            </header>

            {/* Main Content Area */}
            <main className={`flex-grow flex flex-col p-4 transition-all duration-300 ease-in-out ${(isChatExpanded || isListening) && hasInteracted ? 'justify-end pb-4' : 'justify-center'} ${themeClasses.content}`}>
              {messages.length > 0 ? (
                // Messages Display
                <div className="w-full space-y-3 flex-grow overflow-y-auto pb-4 max-h-full">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] px-3 py-2 rounded-2xl break-words ${
                          message.sender === 'user'
                            ? isIOSGlass
                              ? 'bg-gradient-to-r from-blue-500/80 to-purple-600/80 backdrop-blur-[20px] text-white shadow-[0_8px_25px_rgba(59,130,246,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] ring-1 ring-white/30'
                              : currentTheme === 'dark'
                              ? 'bg-gradient-to-r from-cyan-500/70 to-blue-500/70 text-white shadow-[0_8px_25px_rgba(6,182,212,0.4)]'
                              : 'bg-blue-500 text-white'
                            : isIOSGlass
                            ? 'bg-white/25 backdrop-blur-[20px] text-slate-900 shadow-[0_8px_25px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.4)] ring-1 ring-white/30'
                            : currentTheme === 'dark'
                            ? 'bg-black/30 backdrop-blur-[20px] text-cyan-50 shadow-[0_8px_25px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400/25'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : isListening && hasInteracted ? (
                <div className="flex flex-col items-center justify-center flex-grow">
                  <div
                    className={`p-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 liquid-glass-button ${isIOSGlass ? 'bg-gradient-to-r from-blue-500/80 to-purple-600/80 backdrop-blur-[25px] text-white shadow-[0_15px_45px_rgba(59,130,246,0.5),inset_0_2px_0_rgba(255,255,255,0.3)] ring-2 ring-white/40' : currentTheme === 'dark' ? 'bg-gradient-to-r from-cyan-500/70 to-blue-500/70 text-white shadow-[0_15px_45px_rgba(6,182,212,0.5)] ring-2 ring-cyan-400/40' : 'bg-blue-500 text-white'} ${isListening ? 'animate-pulse-fast liquid-glass-pulse' : ''}`}
                    onClick={handlePersonClick}
                  >
                    <Mic className="w-12 h-12" />
                  </div>
                  <p className={`mt-4 text-lg font-medium ${themeClasses.text}`}>
                    Listening...
                  </p>
                  <textarea
                    ref={spokenInputRef}
                    placeholder="Say something..."
                    value={spokenText}
                    onChange={(e) => setSpokenText(e.target.value)}
                    className={`mt-4 w-full max-w-xs p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out ${themeClasses.input}`}
                    rows={3}
                  />
                </div>
              ) : (
                // Default centered interface
                <div className="flex flex-col items-center justify-center flex-grow">
                  <button
                    onClick={handlePersonClick}
                    className={`p-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 liquid-glass-button ${isIOSGlass ? 'bg-gradient-to-r from-blue-500/80 to-purple-600/80 backdrop-blur-[25px] hover:from-blue-600/90 hover:to-purple-700/90 text-white shadow-[0_15px_45px_rgba(59,130,246,0.5),inset_0_2px_0_rgba(255,255,255,0.3)] ring-2 ring-white/40 hover:shadow-[0_20px_60px_rgba(59,130,246,0.6)]' : currentTheme === 'dark' ? 'bg-gradient-to-r from-cyan-500/70 to-blue-500/70 hover:from-cyan-400/80 hover:to-blue-400/80 text-white shadow-[0_15px_45px_rgba(6,182,212,0.5)] ring-2 ring-cyan-400/40' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                  >
                    <Headphones className="w-12 h-12" />
                  </button>
                  <h1 className={`mt-6 text-3xl font-semibold tracking-wide ${themeClasses.text}`}>
                    Find Your Need.
                  </h1>
                </div>
              )}
            </main>

            {/* Chat Input Section */}
            <footer className={`p-4 border-t transition-all duration-300 ${themeClasses.header} ${!hasInteracted ? 'opacity-60' : 'opacity-100'}`}>
              <div className="relative w-full">
                <textarea
                  id="chat-input"
                  ref={chatInputRef}
                  value={chatText}
                  onChange={(e) => setChatText(e.target.value)}
                  onKeyPress={handleChatKeyPress}
                  placeholder="chat"
                  className={`w-full pl-4 pr-16 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out shadow-sm resize-none overflow-hidden ${
                    isChatExpanded && hasInteracted ? 'min-h-[6rem]' : 'h-12'} ${themeClasses.input}`}
                  style={{
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onFocus={handleChatFocus}
                  onBlur={handleChatBlur}
                  rows={1}
                />
                {/* Icons inside input */}
                <div className="absolute right-3 top-3 flex items-center space-x-2">
                  <button
                    onClick={() => setHasInteracted(true)}
                    className={`p-1.5 rounded-full transition-all duration-200 transform hover:scale-110 focus:outline-none ${isIOSGlass ? 'hover:bg-white/20 hover:text-blue-600 hover:shadow-[0_2px_8px_rgba(59,130,246,0.3)]' : currentTheme === 'dark' ? 'hover:bg-black/20 hover:text-cyan-400 hover:shadow-[0_2px_8px_rgba(6,182,212,0.3)]' : 'hover:text-blue-600'} ${themeClasses.textSecondary}`}
                    aria-label="Voice input"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                  {chatText.trim() && (
                    <button
                      onClick={handleChatSubmit}
                      className={`p-1.5 rounded-full transition-all duration-200 transform hover:scale-110 focus:outline-none liquid-glass-send ${themeClasses.buttonPrimary}`}
                      aria-label="Send message"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </footer>
          </>
        )}
      </div>
      {/* Custom Tailwind CSS for pulse animation */}
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
        
        .liquid-glass-menu {
          position: relative;
        }
        
        .liquid-glass-menu::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          border-radius: inherit;
          pointer-events: none;
        }
        
        .liquid-glass-send {
          position: relative;
          overflow: hidden;
        }
        
        .liquid-glass-send::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.3s ease, height 0.3s ease;
        }
        
        .liquid-glass-send:active::after {
          width: 100px;
          height: 100px;
        }
        
        .liquid-glass-pulse {
          animation: liquidPulse 2s infinite ease-in-out;
        }
        
        @keyframes liquidPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 15px 45px rgba(59, 130, 246, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 20px 60px rgba(59, 130, 246, 0.7), inset 0 2px 0 rgba(255, 255, 255, 0.4);
          }
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
        
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        .animate-ripple {
          animation: ripple 0.6s linear;
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
          backdrop-filter: blur(40px) saturate(180%) brightness(110%);
          -webkit-backdrop-filter: blur(40px) saturate(180%) brightness(110%);
        }
        
        /* Enhanced background glass effect */
        body {
          background-attachment: fixed;
        }
        
        /* Floating orbs animation */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(10px) rotate(240deg);
          }
        }
        
        /* Enhanced scrollbar for liquid glass */
        .ios-glass ::-webkit-scrollbar {
          width: 8px;
        }
        
        .ios-glass ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          backdrop-filter: blur(10px);
        }
        
        .ios-glass ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }
        
        .ios-glass ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2));
        }
        
        /* Liquid glass shimmer effect */
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .liquid-glass-button:hover {
          background-image: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        
        /* Enhanced focus states */
        .ios-glass input:focus,
        .ios-glass textarea:focus {
          outline: none;
          box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.1),
            0 1px 0 rgba(255, 255, 255, 0.4),
            0 0 0 3px rgba(59, 130, 246, 0.3);
          border-color: rgba(59, 130, 246, 0.5);
        }
        
        /* Liquid glass card hover effects */
        .ios-glass [class*="card"]:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }
        
        /* Ambient lighting effect */
        .liquid-glass-button {
          position: relative;
        }
        
        .liquid-glass-button::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: -1;
        }
        
        .liquid-glass-button:hover::after {
          opacity: 1;
        }
        
        /* Enhanced background blur for better glass effect */
        .backdrop-blur-3xl {
          backdrop-filter: blur(64px) saturate(180%) brightness(110%);
          -webkit-backdrop-filter: blur(64px) saturate(180%) brightness(110%);
        }
        
        /* Improved glass container effects */
        .liquid-glass-container {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          backdrop-filter: blur(40px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
        }
        
        /* Wallet balance glow effect */
        .wallet-glow {
          text-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
        }
        
        /* PLINK logo gradient text effect */
        .logo-gradient {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Menu backdrop blur */
        .menu-backdrop {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
      `}</style>
    </div>
  );
};

export default App;
