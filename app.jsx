import React, { useState, useEffect, useRef } from 'react';
import { Menu, User, Settings, Mic, MessageSquareText, ChevronLeft, Star, Palette, Headphones, Plus, X } from 'lucide-react';

// Main App component
const App = () => {
  const [isUserMode, setIsUserMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [showProfileScreen, setShowProfileScreen] = useState(false);
  const [showSettingsScreen, setShowSettingsScreen] = useState(false);
  const [hasUpgradedPlan, setHasUpgradedPlan] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
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
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentTheme]);

  // Toggle between User and Business modes
  const handleModeToggle = (mode) => {
    setIsUserMode(mode === 'user');
  };

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle chat input focus to expand
  const handleChatFocus = () => {
    setIsChatExpanded(true);
    setIsListening(false); // Close listening mode if chat is focused
  };

  // Handle chat input blur to collapse, but only if not actively focused
  const handleChatBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget) && chatInputRef.current.value === '') {
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
    setCurrentTheme(e.target.value);
  };

  // Handle person icon click for listening
  const handlePersonClick = () => {
    setIsListening(!isListening);
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

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 font-sans ${currentTheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      {/* Main App Container */}
      <div className={`relative w-full max-w-sm rounded-3xl shadow-xl overflow-hidden flex flex-col min-h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] md:min-h-[600px] md:max-h-[800px] border ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>

        {/* Conditional Rendering for Profile Screen, Settings Screen, or Main App */}
        {showProfileScreen ? (
          // Profile Screen
          <div className="flex flex-col flex-grow">
            <header className={`flex items-center p-4 border-b z-10 ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <button
                onClick={closeProfileScreen}
                className={`p-2 mr-2 rounded-full shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentTheme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                aria-label="Go back"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h2 className={`text-xl font-semibold flex-grow text-center pr-10 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Profile</h2>
            </header>
            <main className={`flex-grow p-6 overflow-y-auto ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              {/* User Info Section */}
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 text-2xl font-bold mr-4">
                  {isUserMode ? 'U' : 'B'}
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{isUserMode ? 'User Name' : 'Business Name'}</h3>
                  <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{isUserMode ? 'user@example.com' : 'business@example.com'}</p>
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
                <div className={`rounded-2xl p-4 shadow-sm ${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h4 className={`font-semibold mb-4 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Personalization</h4>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="language" className={`block text-sm font-medium mb-1 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Language</label>
                      <select
                        id="language"
                        className={`w-full p-2 border rounded-xl focus:ring-blue-500 focus:border-blue-500 ${currentTheme === 'dark' ? 'bg-gray-600 text-white border-gray-500' : 'bg-white text-gray-700 border-gray-300'}`}
                      >
                        {languages.map((lang) => (
                          <option key={lang.value} value={lang.value}>
                            {lang.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="tone" className={`block text-sm font-medium mb-1 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Default Tone</label>
                      <select
                        id="tone"
                        className={`w-full p-2 border rounded-xl focus:ring-blue-500 focus:border-blue-500 ${currentTheme === 'dark' ? 'bg-gray-600 text-white border-gray-500' : 'bg-white text-gray-700 border-gray-300'}`}
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
                <div className={`rounded-2xl p-4 shadow-sm ${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h4 className={`font-semibold mb-4 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Business Details</h4>
                  <div className="space-y-4 mb-4">
                    {businessSections.map((section) => (
                      <div key={section.id} className={`flex flex-col space-y-2 border rounded-xl p-3 ${currentTheme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
                        <div className="flex justify-between items-center">
                          <input
                            type="text"
                            value={section.label}
                            onChange={(e) => handleBusinessSectionChange(section.id, 'label', e.target.value)}
                            className={`flex-grow p-2 mr-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${currentTheme === 'dark' ? 'bg-gray-600 text-white border-gray-500' : 'bg-white text-gray-700 border-gray-300'}`}
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
                            className={`w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${currentTheme === 'dark' ? 'bg-gray-600 text-white border-gray-500' : 'bg-white text-gray-700 border-gray-300'}`}
                            placeholder={`Enter ${section.label.toLowerCase()}`}
                          />
                        ) : (
                          <textarea
                            value={section.value}
                            onChange={(e) => handleBusinessSectionChange(section.id, 'value', e.target.value)}
                            className={`w-full p-2 border rounded-lg resize-y focus:ring-blue-500 focus:border-blue-500 ${currentTheme === 'dark' ? 'bg-gray-600 text-white border-gray-500' : 'bg-white text-gray-700 border-gray-300'}`}
                            placeholder={`Enter ${section.label.toLowerCase()}`}
                            rows={3}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={addBusinessSection}
                    className={`w-full flex items-center justify-center px-4 py-2 rounded-2xl text-sm font-medium transition-colors duration-200 ${currentTheme === 'dark' ? 'bg-blue-700 text-white hover:bg-blue-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add New Field
                  </button>
                  <button
                    onClick={saveBusinessDetails}
                    className={`w-full mt-4 flex items-center justify-center px-4 py-2 rounded-2xl text-sm font-medium transition-colors duration-200 ${currentTheme === 'dark' ? 'bg-green-700 text-white hover:bg-green-600' : 'bg-green-500 text-white hover:bg-green-600'}`}
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
            <header className={`flex items-center p-4 border-b z-10 ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <button
                onClick={closeSettingsScreen}
                className={`p-2 mr-2 rounded-full shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentTheme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                aria-label="Go back"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h2 className={`text-xl font-semibold flex-grow text-center pr-10 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Settings</h2>
            </header>
            <main className={`flex-grow p-6 overflow-y-auto ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              {/* Theme Setting */}
              <div className={`rounded-2xl p-4 shadow-sm mb-4 ${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h4 className={`font-semibold mb-4 flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  <Palette className={`w-5 h-5 mr-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} /> Theme
                </h4>
                <div>
                  <label htmlFor="theme" className={`block text-sm font-medium mb-1 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>App Theme</label>
                  <select
                    id="theme"
                    value={currentTheme} // Controlled component
                    onChange={handleThemeChange} // Handle theme change
                    className={`w-full p-2 border rounded-xl focus:ring-blue-500 focus:border-blue-500 ${currentTheme === 'dark' ? 'bg-gray-600 text-white border-gray-500' : 'bg-white text-gray-700 border-gray-300'}`}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System Default</option>
                  </select>
                </div>
              </div>
              {/* Add more settings options here */}
              <div className={`rounded-2xl p-4 shadow-sm ${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h4 className={`font-semibold mb-4 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
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
            <header className={`relative flex items-center justify-center p-4 border-b z-10 ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              {/* User/Business Toggle */}
              <div className={`flex rounded-full p-1 shadow-inner ${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <button
                  onClick={() => handleModeToggle('user')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isUserMode ? 'bg-blue-600 text-white shadow-md' : `${currentTheme === 'dark' ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-200'}`
                  }`}
                >
                  User
                </button>
                <button
                  onClick={() => handleModeToggle('business')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    !isUserMode ? 'bg-blue-600 text-white shadow-md' : `${currentTheme === 'dark' ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-200'}`
                  }`}
                >
                  Business
                </button>
              </div>

              {/* Menu Icon */}
              <button
                onClick={toggleMenu}
                className={`absolute right-4 p-2 rounded-full shadow-md hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentTheme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className={`absolute top-16 right-4 rounded-xl shadow-lg py-2 w-48 z-20 border animate-fade-in ${currentTheme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'}`}>
                  <a
                    href="#"
                    className={`flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-150 ${currentTheme === 'dark' ? 'text-white hover:bg-gray-600' : 'text-gray-800'}`}
                    onClick={openProfileScreen}
                  >
                    <User className="w-4 h-4 mr-2" /> Profile
                  </a>
                  <a
                    href="#"
                    className={`flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-150 ${currentTheme === 'dark' ? 'text-white hover:bg-gray-600' : 'text-gray-800'}`}
                    onClick={openSettingsScreen}
                  >
                    <Settings className="w-4 h-4 mr-2" /> Settings
                  </a>
                </div>
              )}
            </header>

            {/* Main Content Area */}
            <main className={`flex-grow flex items-center justify-center p-6 text-center transition-all duration-300 ease-in-out ${isChatExpanded || isListening ? 'pb-20' : ''} ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              {isListening ? (
                <div className="flex flex-col items-center">
                  <div
                    className={`p-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
                      currentTheme === 'dark' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'
                    } ${isListening ? 'animate-pulse-fast' : ''}`}
                    onClick={handlePersonClick}
                  >
                    <Mic className="w-12 h-12" />
                  </div>
                  <p className={`mt-4 text-lg font-medium ${currentTheme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                    Listening...
                  </p>
                  <textarea
                    ref={spokenInputRef}
                    placeholder="Say something..."
                    value={spokenText}
                    onChange={(e) => setSpokenText(e.target.value)}
                    className={`mt-4 w-full max-w-xs p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out ${
                      currentTheme === 'dark' ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400' : 'bg-gray-100 text-gray-800 border-gray-300 placeholder-gray-500'}`}
                    rows={3}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <button
                    onClick={handlePersonClick}
                    className={`p-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
                      currentTheme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
                    } shadow-lg`}
                  >
                    <Headphones className="w-12 h-12" />
                  </button>
                  <h1 className={`mt-6 text-3xl font-semibold tracking-wide ${currentTheme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    Find Your Need.
                  </h1>
                </div>
              )}
            </main>

            {/* Chat Input Section */}
            <footer className={`p-4 border-t flex items-end justify-between ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <div className={`relative flex-grow mr-3 transition-all duration-300 ease-in-out ${isChatExpanded ? 'w-full' : 'w-auto'}`}>
                <textarea
                  id="chat-input"
                  ref={chatInputRef}
                  placeholder="chat"
                  className={`w-full pl-4 pr-12 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out shadow-sm resize-none overflow-hidden ${
                    isChatExpanded ? 'min-h-[7rem]' : 'h-12'
                  } ${currentTheme === 'dark' ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' : 'bg-gray-100 text-gray-700 placeholder-gray-500'}`}
                  onFocus={handleChatFocus}
                  onBlur={handleChatBlur}
                  rows={1}
                />
                {/* Microphone Icon inside input */}
                <button
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:text-blue-600 transition-colors duration-200 focus:outline-none ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                  aria-label="Voice input"
                >
                  <Mic className="w-5 h-5" />
                </button>
              </div>
            </footer>
          </>
        )}
      </div>
      {/* Custom Tailwind CSS for pulse animation */}
      <style>{`
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
      `}</style>
    </div>
  );
};

export default App;
