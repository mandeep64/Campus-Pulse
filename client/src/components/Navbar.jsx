// client/src/components/Navbar.jsx
import React from 'react';
import { Sparkles, Bot, LogIn } from 'lucide-react';

export default function Navbar({ activeTab, onTabChange, onOpenSmartInput, onOpenAIBot }) {
  const tabs = [
    { id: 'HOME', label: 'HOME' },
    { id: 'MARKETPLACE', label: 'MARKETPLACE' },
    { id: 'EVENTS', label: 'EVENTS' },
    { id: 'STUDY-HELP', label: 'STUDY-HELP' },
    { id: 'LOST & FOUND', label: 'LOST & FOUND' }
  ];

  return (
    <header className="w-full bg-white border-b-2 border-black sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('HOME')}>
          <div className="w-8 h-8 bg-[#84cc16] border-2 border-black flex items-center justify-center font-mono font-bold text-base text-black brutal-shadow-sm">
            C
          </div>
          <span className="font-mono font-black text-lg tracking-wider text-black uppercase">
            CAMPUS PULSE
          </span>
        </div>

        {/* Navigation Tabs (Replica of Acadamex navigation bar) */}
        <nav className="hidden md:flex items-center gap-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`font-mono text-xs font-bold uppercase transition-colors tracking-wide ${
                  isActive
                    ? 'bg-[#84cc16] text-black px-4 py-1.5 border-2 border-black brutal-shadow-sm'
                    : 'text-black hover:text-[#84cc16]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions: SMART INPUT, AI BOT, LOGIN */}
        <div className="flex items-center gap-2.5">
          {/* Smart Input (Added Feature 1: WhatsApp parser) */}
          <button
            onClick={onOpenSmartInput}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fef08a] hover:bg-[#fde047] text-black font-mono font-bold text-xs border-2 border-black brutal-btn"
            title="Paste unorganized WhatsApp message to extract event card"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>+ SMART INPUT</span>
          </button>

          {/* AI Bot (Added Feature 2: Link to ai-chat-bot-five-beta.vercel.app) */}
          <button
            onClick={onOpenAIBot}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#67e8f9] hover:bg-[#22d3ee] text-black font-mono font-bold text-xs border-2 border-black brutal-btn"
            title="Open Campus Pulse AI Bot"
          >
            <Bot className="w-3.5 h-3.5 text-black" />
            <span>AI BOT</span>
          </button>

          {/* Login button matching Acadamex */}
          <button
            onClick={() => alert('Campus Pulse Operative Session: Logged in as Campus Visitor (guest@campuspulse.local)')}
            className="px-4 py-1.5 bg-[#84cc16] hover:bg-[#65a30d] text-black font-mono font-bold text-xs border-2 border-black brutal-btn tracking-wider"
          >
            LOGIN
          </button>
        </div>

      </div>
    </header>
  );
}
