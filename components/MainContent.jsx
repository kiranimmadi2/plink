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
              key={message.id}
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
            className={`p-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 ${
              isListening ? 'animate-pulse-fast' : ''
            } bg-white/25 backdrop-blur-[40px] text-gray-700 shadow-[0_15px_45px_rgba(0,0,0,0.12),inset_0_2px_0_rgba(255,255,255,0.5)] ring-2 ring-white/35`}
            onClick={handlePersonClick}
          >
            <Mic className="w-12 h-12" />
          </div>
          <p className="mt-4 text-lg font-medium text-gray-800 font-medium drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
            Listening...
          </p>
          <textarea
            ref={spokenInputRef}
            placeholder="Say something..."
            value={spokenText}
            onChange={(e) => setSpokenText(e.target.value)}
            className="mt-4 w-full max-w-xs p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out bg-white/20 backdrop-blur-[40px] border border-white/30 text-gray-800 placeholder-gray-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_0_rgba(255,255,255,0.4)] ring-1 ring-white/25 focus:ring-2 focus:ring-gray-400/30"
            rows={3}
          />
        </div>
      ) : (
        // Default Home State
        <div className="flex flex-col items-center justify-center flex-grow">
          <button
            onClick={handlePersonClick}
            className="p-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 bg-white/25 backdrop-blur-[40px] hover:bg-white/35 text-gray-700 shadow-[0_15px_45px_rgba(0,0,0,0.12),inset_0_2px_0_rgba(255,255,255,0.5)] ring-2 ring-white/35 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
          >
            <Headphones className="w-12 h-12" />
          </button>
          <h1 className="mt-6 text-3xl font-semibold tracking-wide text-gray-800 font-medium drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
            Find Your Need.
          </h1>
        </div>
      )}
    </main>
  );
};

export default MainContent;