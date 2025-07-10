import React, { useRef, useEffect } from 'react';
import { Mic, ArrowUp } from 'lucide-react';

const ChatInput = ({ 
  chatText, 
  setChatText, 
  isChatExpanded, 
  setIsChatExpanded,
  hasInteracted,
  setHasInteracted,
  handleChatSubmit,
  themeClasses 
}) => {
  const chatInputRef = useRef(null);

  // Handle chat input focus to expand
  const handleChatFocus = () => {
    setIsChatExpanded(true);
    setHasInteracted(true);
  };

  // Handle chat input blur to collapse
  const handleChatBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget) && chatText === '' && hasInteracted) {
      setIsChatExpanded(false);
    }
  };

  // Handle Enter key press
  const handleChatKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChatSubmit();
    }
  };

  // Adjust textarea height dynamically
  useEffect(() => {
    if (chatInputRef.current) {
      chatInputRef.current.style.height = 'auto';
      chatInputRef.current.style.height = chatInputRef.current.scrollHeight + 'px';
    }
  }, [isChatExpanded, chatText]);

  return (
    <footer className={`p-4 border-t transition-all duration-300 ${themeClasses.header} ${!hasInteracted ? 'opacity-60' : 'opacity-100'}`}>
      <div className="relative w-full">
        <textarea
          ref={chatInputRef}
          value={chatText}
          onChange={(e) => setChatText(e.target.value)}
          onKeyPress={handleChatKeyPress}
          onFocus={handleChatFocus}
          onBlur={handleChatBlur}
          placeholder="chat"
          className={`w-full pl-4 pr-16 py-3 rounded-2xl focus:outline-none transition-all duration-300 ease-in-out shadow-sm resize-none overflow-hidden ${
            isChatExpanded && hasInteracted ? 'min-h-[6rem]' : 'h-12'
          } ${themeClasses.input}`}
        />

        {/* Input Icons */}
        <div className="absolute right-3 top-3 flex items-center space-x-2">
          {chatText.trim() && (
            <button
              onClick={handleChatSubmit}
              className={`p-1.5 rounded-full transition-all duration-200 transform hover:scale-110 focus:outline-none ${themeClasses.buttonPrimary}`}
              aria-label="Send message"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default ChatInput;
