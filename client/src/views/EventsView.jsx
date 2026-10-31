// client/src/views/EventsView.jsx
import React, { useState } from 'react';
import { Search, Sparkles, Plus, Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';

export default function EventsView({
  events,
  onOpenSmartInput,
  onOpenSummary,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  selectedCollege,
  onCollegeChange
}) {
  const [eventMode, setEventMode] = useState('ALL MODES');
  const [sortOrder, setSortOrder] = useState('DEFAULT ORDER');

  // Filter events locally
  let filteredEvents = events.filter((evt) => {
    if (selectedCategory && selectedCategory !== 'ALL' && selectedCategory !== 'ALL CATEGORIES') {
      if ((evt.category || '').toUpperCase() !== selectedCategory.toUpperCase()) return false;
    }
    if (eventMode && eventMode !== 'ALL MODES') {
      if ((evt.mode || '').toUpperCase() !== eventMode.toUpperCase()) return false;
    }
    if (selectedCollege && selectedCollege !== 'ALL') {
      if (!(evt.college || '').toLowerCase().includes(selectedCollege.toLowerCase())) return false;
    }
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        (evt.title || '').toLowerCase().includes(q) ||
        (evt.society || '').toLowerCase().includes(q) ||
        (evt.description || '').toLowerCase().includes(q) ||
        (evt.venue || '').toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header (Screenshot 5) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-black pb-4">
        <div>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter italic font-sans text-black">
            CAMPUS EVENTS.
          </h1>
          <p className="font-mono text-xs text-black uppercase tracking-wider mt-1">
            ADVERTISE AND FIND CAMPUS EVENTS, HACKATHONS, INTERNSHIPS, AND TRIPS.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Smart Input (Added Feature 1: WhatsApp extractor) */}
          <button
            onClick={onOpenSmartInput}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#fef08a] hover:bg-[#fde047] text-black font-mono font-bold text-xs uppercase border-2 border-black brutal-btn"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>+ SMART INPUT (WHATSAPP)</span>
          </button>

          <button
            onClick={onOpenSmartInput}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#84cc16] hover:bg-[#65a30d] text-black font-mono font-bold text-xs uppercase border-2 border-black brutal-btn"
          >
            <Plus className="w-3.5 h-3.5 text-black" />
            <span>+ ADVERTISE EVENT</span>
          </button>
        </div>
      </div>

      {/* Filter Box with 2px black borders (Screenshot 5) */}
      <div className="border-2 border-black bg-white p-4 brutal-shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* 1. Search */}
          <div>
            <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">
              SEARCH EVENTS
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Q SEARCH EVENTS, SOCIETIES, VENUES..."
                className="w-full border-2 border-black px-3 py-1.5 font-mono text-xs text-black placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* 2. Event Category */}
          <div>
            <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">
              EVENT CATEGORY
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full border-2 border-black px-3 py-1.5 font-mono text-xs text-black focus:outline-none bg-white uppercase"
            >
              <option value="ALL CATEGORIES">ALL CATEGORIES</option>
              <option value="HACKATHON">HACKATHON</option>
              <option value="WORKSHOP">WORKSHOP</option>
              <option value="CYBER SECURITY">CYBER SECURITY</option>
              <option value="AI & ML">AI & ML</option>
              <option value="COMPETITION">COMPETITION</option>
              <option value="LITERARY">LITERARY</option>
              <option value="FEST">FEST</option>
              <option value="OTHERS">OTHERS</option>
            </select>
          </div>

          {/* 3. Event Mode */}
          <div>
            <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">
              EVENT MODE
            </label>
            <select
              value={eventMode}
              onChange={(e) => setEventMode(e.target.value)}
              className="w-full border-2 border-black px-3 py-1.5 font-mono text-xs text-black focus:outline-none bg-white uppercase"
            >
              <option value="ALL MODES">ALL MODES</option>
              <option value="ONLINE">ONLINE</option>
              <option value="CAMPUS">CAMPUS</option>
            </select>
          </div>

          {/* 4. College Sector */}
          <div>
            <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">
              COLLEGE SECTOR
            </label>
            <select
              value={selectedCollege}
              onChange={(e) => onCollegeChange(e.target.value)}
              className="w-full border-2 border-black px-3 py-1.5 font-mono text-xs text-black focus:outline-none bg-white uppercase"
            >
              <option value="ALL">ALL COLLEGES</option>
              <option value="MIT CAMPUS">MIT CAMPUS (PUNE)</option>
              <option value="ADITI MAHAVIDYALAYA (AM)">ADITI MAHAVIDYALAYA (DU)</option>
              <option value="VIPS">VIPS (IPU)</option>
              <option value="MSIT">MSIT</option>
            </select>
          </div>

          {/* 5. Sort Events */}
          <div>
            <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">
              SORT EVENTS
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full border-2 border-black px-3 py-1.5 font-mono text-xs text-black focus:outline-none bg-white uppercase"
            >
              <option value="DEFAULT ORDER">DEFAULT ORDER</option>
              <option value="NEWEST FIRST">NEWEST FIRST</option>
              <option value="MOST POPULAR">MOST POPULAR</option>
            </select>
          </div>

        </div>
      </div>

      {/* Events Grid (Screenshot 5) */}
      {filteredEvents.length === 0 ? (
        <div className="border-2 border-black bg-white p-12 text-center brutal-shadow-sm font-mono space-y-3">
          <div className="text-3xl">🗓️</div>
          <h3 className="font-black text-sm uppercase">NO EVENTS FOUND MATCHING FILTER</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your filters or use Smart Input to parse a WhatsApp event!
          </p>
          <button
            onClick={onOpenSmartInput}
            className="px-4 py-2 bg-[#84cc16] border-2 border-black font-mono font-bold text-xs uppercase brutal-btn"
          >
            + PARSE WHATSAPP EVENT
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="border-2 border-black bg-white brutal-shadow-sm flex flex-col justify-between overflow-hidden hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
            >
              {/* Banner Image with Badges */}
              <div>
                <div className="relative border-b-2 border-black h-48 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={evt.image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60'}
                    alt={evt.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Top Left Online / Campus Badge */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#84cc16] border border-black font-mono text-[10px] font-bold text-black uppercase">
                    {evt.mode || 'ONLINE'}
                  </div>
                  {/* Bottom Left College Badge */}
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                    {evt.college || 'ALL UNI'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  {/* Category Tag in Cyan */}
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-600 uppercase">
                    <span>[{evt.category || 'EVENT'}]</span>
                    <span>[{evt.mode || 'ONLINE'}]</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-mono font-black text-sm text-black uppercase leading-tight line-clamp-2">
                    {evt.title}
                  </h3>

                  {/* Date pills */}
                  <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px] text-slate-700">
                    <span className="flex items-center gap-1 border border-black px-2 py-0.5 bg-slate-50 font-bold uppercase">
                      📅 {evt.date}
                    </span>
                    {evt.time && evt.time !== 'To Be Announced' && (
                      <span className="flex items-center gap-1 border border-black px-2 py-0.5 bg-slate-50 uppercase">
                        ⏰ {evt.time}
                      </span>
                    )}
                  </div>

                  {/* Description snippet */}
                  <p className="font-mono text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                    {evt.description}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t-2 border-black p-3 bg-slate-50 flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-500 uppercase font-bold">
                  POSTED: {evt.postedAgo || 'RECENT'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenSummary(evt)}
                    className="px-2.5 py-1 font-mono text-[10px] font-bold border-2 border-black bg-[#fef08a] hover:bg-[#fde047] text-black brutal-btn uppercase"
                  >
                    ✨ AI SUMMARY
                  </button>
                  <a
                    href={evt.registrationLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 font-mono text-[10px] font-bold border-2 border-black bg-white hover:bg-black hover:text-white text-black brutal-btn uppercase"
                  >
                    [ DETAILS ]
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Monospace Footer */}
      <footer className="text-center font-mono text-xs text-slate-500 py-6 border-t-2 border-black">
        &copy; 2026 Campus Pulse. All rights reserved. &bull; Terms & Conditions
      </footer>

    </div>
  );
}

