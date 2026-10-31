// client/src/components/AIBotWidget.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, ExternalLink, Send, Sparkles, RefreshCw } from 'lucide-react';
import { sendChatMessage } from '../services/api';

const VERCEL_BOT_URL = 'https://ai-chat-bot-five-beta.vercel.app/';

export default function AIBotWidget({ isOpen, onToggle }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `👋 Hey! I am the **Campus Pulse AI Assistant** (powered by your Vercel bot).\n\nAsk me about upcoming hackathons, MIT CSS, MIT CYBER SECURITY, or click below to launch the full chatbot app!`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    if (isOpen && endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (customText) => {
    const q = customText || input;
    if (!q.trim() || loading) return;

    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setInput('');
    setLoading(true);

    try {
      const res = await sendChatMessage(q);
      setMessages(prev => [...prev, { role: 'assistant', text: res.reply }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: `⚠️ Could not reach local chat engine. Open the full bot here: ${VERCEL_BOT_URL}`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const openVercelBot = () => {
    window.open(VERCEL_BOT_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Floating Action Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={onToggle}
          className="border-2 border-black bg-[#84cc16] hover:bg-[#65a30d] text-black font-mono font-bold text-xs p-3.5 brutal-shadow flex items-center gap-2 cursor-pointer transition-all hover:translate-x-[-1px] hover:translate-y-[-1px]"
          title="Open Campus Pulse AI Bot"
        >
          <Bot className="w-5 h-5 text-black" />
          <span className="font-mono font-black uppercase">AI BOT</span>
          <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
        </button>
      </div>

      {/* Neo-Brutalist Drawer / Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[540px] max-h-[85vh] bg-white border-2 border-black brutal-shadow-lg flex flex-col overflow-hidden font-mono">
          
          {/* Header */}
          <div className="px-4 py-3 bg-[#67e8f9] border-b-2 border-black flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-black" />
              <span className="font-mono font-black text-xs text-black uppercase tracking-wider">
                CAMPUS PULSE AI // BOT TERMINAL
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={openVercelBot}
                className="p-1 border border-black bg-white hover:bg-black hover:text-white"
                title="Open ai-chat-bot-five-beta.vercel.app"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onToggle}
                className="p-1 border border-black bg-white hover:bg-black hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Vercel link callout banner */}
          <div className="p-2.5 bg-[#fef08a] border-b-2 border-black flex items-center justify-between text-[11px]">
            <span className="font-bold text-black uppercase truncate">
              HOST: ai-chat-bot-five-beta.vercel.app
            </span>
            <button
              onClick={openVercelBot}
              className="font-bold underline text-black hover:text-blue-700 uppercase shrink-0"
            >
              [ OPEN FULL BOT ↗ ]
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-slate-100 border-b-2 border-black flex items-center gap-1.5 overflow-x-auto text-[10px]">
            <button
              onClick={() => handleSend('MIT CSS Hackathon')}
              className="px-2 py-0.5 border border-black bg-white hover:bg-black hover:text-white shrink-0 uppercase"
            >
              🚀 MIT CSS
            </button>
            <button
              onClick={() => handleSend('MIT Cyber Security workshop')}
              className="px-2 py-0.5 border border-black bg-white hover:bg-black hover:text-white shrink-0 uppercase"
            >
              🛡️ CYBER CTF
            </button>
            <button
              onClick={() => handleSend('How does Smart Input work?')}
              className="px-2 py-0.5 border border-black bg-white hover:bg-black hover:text-white shrink-0 uppercase"
            >
              ⚡ SMART INPUT
            </button>
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs bg-[#fffdf5]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] border-2 border-black p-2.5 ${
                    m.role === 'user'
                      ? 'bg-[#84cc16] text-black brutal-shadow-sm'
                      : 'bg-white text-black brutal-shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">
                    {m.text}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="border border-black bg-white p-2 text-[11px] text-slate-500 flex items-center gap-1.5">
                  <RefreshCw className="w-3 h-3 animate-spin text-black" />
                  <span>ASSISTANT IS THINKING...</span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2 border-t-2 border-black bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ASK ABOUT EVENTS, SOCIETIES..."
              className="flex-1 border-2 border-black px-2.5 py-1.5 text-xs text-black focus:outline-none uppercase font-mono"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-3 py-1.5 border-2 border-black bg-[#84cc16] hover:bg-[#65a30d] text-black font-bold text-xs uppercase brutal-btn"
            >
              SEND
            </button>
          </form>

        </div>
      )}
    </>
  );
}
