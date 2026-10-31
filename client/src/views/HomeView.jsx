// client/src/views/HomeView.jsx
import React from 'react';
import { Calendar, Package, Sparkles, MessageSquare, ArrowUpRight, Network } from 'lucide-react';

export default function HomeView({
  events,
  marketplaceItems,
  onNavigateTab,
  onOpenSummary,
  onOpenAIBot,
  currentCollege
}) {
  return (
    <div className="space-y-8">
      {/* 1. Hero Block (Screenshot 2) */}
      <div className="border-2 border-black bg-white p-6 sm:p-10 brutal-shadow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Hero Left: Big Typography */}
          <div className="lg:col-span-8 space-y-3">
            <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter italic leading-none font-sans text-black">
              CAMPUS PULSE<br />INTEL.
            </h1>
            <p className="font-mono text-xs text-black uppercase tracking-wider pt-2 leading-relaxed">
              CAMPUS RATING DIRECTORY, PEER TRADE MARKETPLACE, EVENTS COORDINATION, STUDY GIGS, AND SECURE MESSAGING.
            </p>
          </div>

          {/* Hero Right: Blue No. of Colleges & Orange Secure Chat */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {/* Blue Colleges Box */}
            <div className="border-2 border-black bg-[#3b82f6] text-white p-4 brutal-shadow-sm flex flex-col justify-between h-28">
              <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider">
                <span>NO. OF COLLEGES</span>
                <Network className="w-4 h-4" />
              </div>
              <div className="text-4xl font-mono font-black">
                232
              </div>
            </div>

            {/* Orange Open Secure Chat Box */}
            <div
              onClick={onOpenAIBot}
              className="border-2 border-black bg-[#fb923c] hover:bg-[#f97316] text-black font-mono font-bold text-xs uppercase p-4 brutal-shadow-sm flex items-center gap-2.5 cursor-pointer transition-colors"
            >
              <div className="w-3.5 h-3.5 border-2 border-black bg-transparent"></div>
              <span>OPEN SECURE CHAT // AI BOT</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Campus Directory Block (Screenshot 2) */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black">
          <span>✦</span>
          <span>CAMPUS DIRECTORY</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Left: Operative Telemetry Profile (60%) */}
          <div className="lg:col-span-8 border-2 border-black bg-[#fffdf5] p-5 brutal-shadow-sm space-y-4">
            <div className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">
              OPERATIVE TELEMETRY // INTEL PROFILE
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border-2 border-black bg-white flex items-center justify-center font-mono font-black text-sm text-black">
                CV
              </div>
              <div>
                <div className="font-mono font-black text-sm text-black tracking-wider uppercase">
                  CAMPUS VISITOR
                </div>
                <div className="font-mono text-xs text-slate-500">
                  guest@campuspulse.local
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#fef08a] border border-black uppercase text-black">
                    L2 OPERATIVE
                  </span>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#fed7aa] border border-black uppercase text-black">
                    {currentCollege || 'ALL'}
                  </span>
                </div>
              </div>
            </div>

            {/* XP Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between font-mono text-[10px] font-bold text-slate-700">
                <span>RANK XP PROGRESS (LEVEL 1)</span>
                <span>0 / 100 XP</span>
              </div>
              <div className="w-full border-2 border-black bg-white h-2.5 relative">
                <div className="h-full bg-[#84cc16] w-[15%]"></div>
              </div>
              <div className="flex items-center justify-between font-mono text-[9px] text-slate-500">
                <span>LEVEL 1</span>
                <span>100 XP TO LEVEL 2</span>
              </div>
            </div>
          </div>

          {/* Right: Green Peer Marketplace Card (40%) */}
          <div
            onClick={() => onNavigateTab('MARKETPLACE')}
            className="lg:col-span-4 border-2 border-black bg-[#84cc16] p-5 brutal-shadow-sm flex flex-col justify-between cursor-pointer hover:bg-[#65a30d] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between font-mono font-black text-sm uppercase text-black mb-1">
                <span>PEER MARKETPLACE</span>
                <Package className="w-4 h-4 text-black" />
              </div>
              <p className="font-mono text-xs text-black leading-relaxed">
                Buy and sell textbooks, gear, and study resources.
              </p>
            </div>

            <div className="font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1 text-black mt-4">
              <span>TRADE ASSETS</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

        </div>

        {/* 3 Action Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div
            onClick={() => onNavigateTab('EVENTS')}
            className="border-2 border-black bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-mono font-black text-xs uppercase p-4 brutal-shadow-sm flex items-center justify-between cursor-pointer transition-colors"
          >
            <span>CAMPUS EVENTS</span>
            <Calendar className="w-4 h-4 text-black" />
          </div>

          <div
            onClick={() => onNavigateTab('LOST & FOUND')}
            className="border-2 border-black bg-[#f43f5e] hover:bg-[#e11d48] text-white font-mono font-black text-xs uppercase p-4 brutal-shadow-sm flex items-center justify-between cursor-pointer transition-colors"
          >
            <span>LOST & FOUND</span>
            <span className="text-base font-bold">🔍</span>
          </div>

          <div
            onClick={() => onNavigateTab('STUDY-HELP')}
            className="border-2 border-black bg-[#fb923c] hover:bg-[#f97316] text-black font-mono font-black text-xs uppercase p-4 brutal-shadow-sm flex items-center justify-between cursor-pointer transition-colors"
          >
            <span>ASSIGNMENT GIGS</span>
            <span className="text-base font-bold">💼</span>
          </div>
        </div>
      </div>

      {/* 3. Live Campus Events (Screenshot 1 & 3) */}
      <div className="border-2 border-black bg-white p-5 sm:p-6 brutal-shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b-2 border-black pb-3">
          <div className="flex items-center gap-2 font-mono font-black text-base text-black uppercase">
            <Calendar className="w-5 h-5 text-cyan-600" />
            <span>Live Campus Events</span>
          </div>
          <div className="font-mono text-xs text-slate-500 uppercase tracking-widest">
            // BOARDS ACTIVATION
          </div>
        </div>

        {/* Horizontal rows list */}
        <div className="divide-y-2 divide-black">
          {events.slice(0, 5).map((evt) => (
            <div
              key={evt.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 p-2 transition-colors"
            >
              <div className="flex items-start sm:items-center gap-4">
                <img
                  src={evt.image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&auto=format&fit=crop&q=60'}
                  alt={evt.title}
                  className="w-14 h-14 border-2 border-black object-cover shrink-0"
                />
                <div>
                  <div className="font-mono text-[10px] font-bold text-cyan-600 uppercase tracking-wider mb-0.5">
                    {evt.category}
                  </div>
                  <h4 className="font-mono font-bold text-xs sm:text-sm text-black uppercase tracking-tight">
                    {evt.title}
                  </h4>
                  <div className="font-mono text-[11px] text-slate-500 uppercase">
                    {evt.mode} &bull; {evt.date}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onOpenSummary(evt)}
                  className="px-3 py-1 font-mono text-[11px] font-bold border-2 border-black bg-[#fef08a] hover:bg-[#fde047] text-black brutal-btn"
                >
                  ✨ AI SUMMARY
                </button>
                <button
                  onClick={() => onNavigateTab('EVENTS')}
                  className="px-3 py-1 font-mono text-[11px] font-bold border-2 border-black bg-white hover:bg-black hover:text-white text-black brutal-btn uppercase"
                >
                  [ DETAILS ]
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Circular Assets Exchange (Screenshot 1 & 3) */}
      <div className="border-2 border-black bg-white p-5 sm:p-6 brutal-shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b-2 border-black pb-3">
          <div className="flex items-center gap-2 font-mono font-black text-base text-black uppercase">
            <Package className="w-5 h-5 text-cyan-600" />
            <span>Circular Assets Exchange</span>
          </div>
          <div className="font-mono text-xs text-slate-500 uppercase tracking-widest">
            // MARKET LEDGER
          </div>
        </div>

        {/* Horizontal rows list */}
        <div className="divide-y-2 divide-black">
          {marketplaceItems.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 p-2 transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 border-2 border-black object-cover shrink-0"
                />
                <div>
                  <div className="font-mono text-[10px] font-bold text-cyan-600 uppercase tracking-wider mb-0.5">
                    {item.category}
                  </div>
                  <h4 className="font-mono font-bold text-xs sm:text-sm text-black uppercase tracking-tight">
                    {item.title}
                  </h4>
                  <div className="font-mono text-xs font-bold text-black">
                    {item.currency}{item.price} &bull; <span className="font-normal text-slate-500">{item.college}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab('MARKETPLACE')}
                className="px-3 py-1 font-mono text-[11px] font-bold border-2 border-black bg-white hover:bg-black hover:text-white text-black brutal-btn uppercase shrink-0"
              >
                [ VIEW ASSET ]
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Monospace Footer matching Screenshot 3 */}
      <footer className="text-center font-mono text-xs text-slate-500 py-6 border-t-2 border-black">
        &copy; 2026 Campus Pulse. All rights reserved. &bull; Terms & Conditions
      </footer>
    </div>
  );
}

