import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, User } from "lucide-react";
import { CompanionStudent, subscribeToMessages, sendDirectMessage, DirectMessage, getClientUid, sendTypingStatus, subscribeToTyping } from "../lib/socketPresence";

interface StudentMessengerProps {
  companion: CompanionStudent;
  onClose: () => void;
}

export default function StudentMessenger({ companion, onClose }: StudentMessengerProps) {
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isCompanionTyping, setIsCompanionTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load local history if desired, but for now we just show active session messages
    const unsubMessages = subscribeToMessages((msg) => {
      // If we receive a message from the currently active companion or sent by us
      if (msg.fromId === companion.id || msg.toId === companion.id) {
        setMessages(prev => [...prev, msg].sort((a, b) => a.timestamp - b.timestamp));
      }
    });

    const unsubTyping = subscribeToTyping((data) => {
      if (data.fromId === companion.id) {
        setIsCompanionTyping(data.isTyping);
      }
    });

    return () => {
      unsubMessages();
      unsubTyping();
    };
  }, [companion.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isCompanionTyping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    
    // Emit typing start
    sendTypingStatus(companion.id, true);

    // Debounce typing stop
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      sendTypingStatus(companion.id, false);
    }, 1500);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    sendTypingStatus(companion.id, false);

    const myId = getClientUid();
    
    // Optimistic local add
    const newMsg: DirectMessage = {
      id: Math.random().toString(36).substring(2, 9),
      fromId: myId,
      fromName: "You",
      message: inputValue.trim(),
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, newMsg]);
    sendDirectMessage(companion.id, inputValue.trim());
    setInputValue("");
  };

  return (
    <div className="fixed bottom-4 right-4 w-72 backdrop-blur-xl bg-white/60 dark:bg-[#1a1c23]/80 border border-white/40 dark:border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col font-sans overflow-hidden z-[100] h-[380px] origin-bottom-right animate-in fade-in zoom-in duration-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-black/5 dark:border-white/10 bg-white/40 dark:bg-black/20 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative">
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-indigo to-violet-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                {companion.avatarChar}
             </div>
             <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-[#1a1c23] rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xs text-black dark:text-white truncate max-w-[120px]">
              {companion.name}
            </span>
            <span className="text-[10px] text-zinc-500 font-medium">Active Now</span>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-zinc-500">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scroller-hidden bg-white/20 dark:bg-black/10">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-2">
            <MessageSquare className="w-8 h-8 text-brand-indigo" />
            <p className="text-xs font-medium text-black dark:text-white">Say hi to {companion.name}!</p>
          </div>
        ) : (
          messages.map((msg, i) => {
            const isMe = msg.fromId === getClientUid();
            return (
              <div key={msg.id || i} className={`flex flex-col max-w-[85%] ${isMe ? "ml-auto items-end" : "mr-auto items-start"}`}>
                <div 
                  className={`px-3 py-2 rounded-2xl text-xs shadow-sm backdrop-blur-md border ${
                    isMe 
                      ? "bg-brand-indigo/90 text-white border-brand-indigo/50 rounded-br-sm" 
                      : "bg-white/80 dark:bg-zinc-800/80 text-black dark:text-white border-white/50 dark:border-white/10 rounded-bl-sm"
                  }`}
                >
                  {msg.message}
                </div>
                <span className="text-[9px] text-zinc-500 mt-1 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })
        )}
        {isCompanionTyping && (
          <div className="flex flex-col max-w-[85%] mr-auto items-start">
            <div className="px-3 py-2 rounded-2xl text-xs shadow-sm backdrop-blur-md border bg-white/80 dark:bg-zinc-800/80 text-black dark:text-white border-white/50 dark:border-white/10 rounded-bl-sm flex items-center gap-1 h-8">
              <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white/40 dark:bg-black/40 border-t border-black/5 dark:border-white/10 shrink-0">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Write a message..."
            className="flex-1 bg-white/50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-full px-3 py-1.5 text-xs focus:outline-none focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo text-black dark:text-white placeholder:text-zinc-500 transition-all"
          />
          <button 
            type="submit" 
            disabled={!inputValue.trim()}
            className="w-7 h-7 rounded-full bg-brand-indigo text-white flex items-center justify-center disabled:opacity-50 transition-opacity flex-shrink-0"
          >
            <Send className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
