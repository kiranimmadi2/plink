import React from 'react';
import { Headphones, Mic } from 'lucide-react';

const MainContent = ({ 
  messages, 
  isListening, 
  hasInteracted, 
  isChatExpanded,
  handlePersonClick,
  spokenText,
  setSpokenText,
  spokenInputRef,
  themeClasses 
}) => {
  return (
    <main className={`flex-grow flex flex-col p-4 transition-all duration-300 ease-in-out ${
      (isChatExpanded || isListening) && hasInteracted ? 'justify-end pb-4' : 'justify-center'
    } ${themeClasses.content}`}>
      
      {messages.length > 0 ? (
        // Messages Display
        <div className="w-full space-y-3 flex-grow overflow-y-auto pb-4 max-h-full">
          {messages.map((message) => (
            <div
              key={message.id || Math.random()}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] px-3 py-2 rounded-2xl break-words ${
                  message.sender === 'user'
                    ? 'bg-white/25 backdrop-blur-[35px] text-gray-800 shadow-[0_8px_25px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.4)] ring-1 ring-white/30'
                    : 'bg-white/15 backdrop-blur-[35px] text-gray-800 shadow-[0_8px_25px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.3)] ring-1 ring-white/25'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      ) : isListening && hasInteracted ? (
        // Listening Mode
        <div className="flex flex-col items-center justify-center flex-grow">
          <div
            className={`p-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 ${themeClasses.button} ${
              isListening ? 'animate-pulse-fast' : ''
            }`}
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
            className={`mt-4 w-full max-w-xs p-3 rounded-lg resize-none focus:outline-none transition-all duration-300 ease-in-out ${themeClasses.input}`}
            rows={3}
          />
        </div>
      ) : (
        // Default Home State
        <div className="flex flex-col items-center justify-center flex-grow">
          <button
            onClick={handlePersonClick}
            className={`p-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 ${themeClasses.button}`}
          >
            <Headphones className="w-12 h-12" />
          </button>
          <h1 className={`mt-6 text-3xl font-semibold tracking-wide ${themeClasses.text}`}>
            Find Your Need.
          </h1>
        </div>
      )}
    </main>
  );
};

export default MainContent;