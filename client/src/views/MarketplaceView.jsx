// client/src/views/MarketplaceView.jsx
import React, { useState } from 'react';
import { Plus, Package, Layers } from 'lucide-react';

export default function MarketplaceView({ marketplaceItems }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL CATEGORIES');
  const [college, setCollege] = useState('ALL COLLEGES');
  const [sort, setSort] = useState('DEFAULT ORDER');

  let filtered = marketplaceItems.filter((item) => {
    if (category !== 'ALL CATEGORIES' && item.category !== category) return false;
    if (college !== 'ALL COLLEGES' && !item.college.toLowerCase().includes(college.toLowerCase())) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!item.title.toLowerCase().includes(q) && !item.category.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header (Screenshot 4) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-black pb-4">
        <div>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter italic font-sans text-black">
            MARKET.
          </h1>
          <p className="font-mono text-xs text-black uppercase tracking-wider mt-1">
            ACQUIRE ESSENTIAL TEXTBOOKS, LAB NOTES, AND STUDY ASSETS DIRECTLY FROM YOUR PEERS.
          </p>
        </div>

        <button
          onClick={() => alert('List Asset modal will open. In demo mode.')}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#84cc16] hover:bg-[#65a30d] text-black font-mono font-bold text-xs uppercase border-2 border-black brutal-btn"
        >
          <Plus className="w-3.5 h-3.5 text-black" />
          <span>+ LIST ASSET</span>
        </button>
      </div>

      {/* Filter Box with 2px black border (Screenshot 4) */}
      <div className="border-2 border-black bg-white p-4 brutal-shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div>
            <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">
              SEARCH MARKETPLACE
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Q SEARCH ASSETS BY NAME..."
              className="w-full border-2 border-black px-3 py-1.5 font-mono text-xs text-black placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">
              ASSET CATEGORY
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border-2 border-black px-3 py-1.5 font-mono text-xs text-black focus:outline-none bg-white uppercase"
            >
              <option value="ALL CATEGORIES">ALL CATEGORIES</option>
              <option value="STATIONERY & INSTRUMENTS">STATIONERY & INSTRUMENTS</option>
              <option value="LAB COATS & APRONS">LAB COATS & APRONS</option>
              <option value="TEXTBOOKS & NOTES">TEXTBOOKS & NOTES</option>
              <option value="ELECTRONICS">ELECTRONICS</option>
            </select>
          </div>

          <div>
            <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">
              COLLEGE SECTOR
            </label>
            <select
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full border-2 border-black px-3 py-1.5 font-mono text-xs text-black focus:outline-none bg-white uppercase"
            >
              <option value="ALL COLLEGES">ALL COLLEGES</option>
              <option value="VIPS">VIPS</option>
              <option value="ADITI MAHAVIDYALAYA (AM)">ADITI MAHAVIDYALAYA (AM)</option>
              <option value="MIT CAMPUS">MIT CAMPUS</option>
            </select>
          </div>

          <div>
            <label className="block font-mono text-[10px] font-bold uppercase text-slate-500 mb-1">
              SORT ASSETS
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full border-2 border-black px-3 py-1.5 font-mono text-xs text-black focus:outline-none bg-white uppercase"
            >
              <option value="DEFAULT ORDER">DEFAULT ORDER</option>
              <option value="PRICE: LOW TO HIGH">PRICE: LOW TO HIGH</option>
              <option value="PRICE: HIGH TO LOW">PRICE: HIGH TO LOW</option>
            </select>
          </div>

        </div>
      </div>

      {/* Sub-bar: Register Count & Toggles (Screenshot 4) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-bold uppercase">REGISTER COUNT:</span>
          <span className="border border-black px-2 py-0.5 bg-slate-100 font-bold text-black uppercase">
            {filtered.length} LISTINGS
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono">
          <span className="border border-black px-2 py-0.5 bg-white text-slate-700 hover:bg-slate-100 cursor-pointer">
            [ SHOW ONLY VERIFIED SELLERS ]
          </span>
          <span className="border border-black px-2 py-0.5 bg-white text-slate-700 hover:bg-slate-100 cursor-pointer">
            [ FOCUS MY ADVERTISEMENTS ]
          </span>
        </div>
      </div>

      {/* Products Grid (Screenshot 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="border-2 border-black bg-white brutal-shadow-sm relative overflow-hidden flex flex-col justify-between"
          >
            {/* Timed out diagonal ribbon if applicable */}
            {item.timedOut && (
              <div className="timed-out-ribbon uppercase">
                TIMED OUT
              </div>
            )}

            <div>
              {/* Product Image */}
              <div className="relative border-b-2 border-black h-40 bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 right-2 border border-black bg-white/90 px-1.5 py-0.5 font-mono text-[10px] font-bold flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  {item.imagesCount || 2}
                </span>
              </div>

              {/* Body */}
              <div className="p-3 space-y-1">
                <div className="font-mono text-[10px] font-bold text-cyan-600 uppercase truncate">
                  {item.category}
                </div>
                <h4 className="font-mono font-black text-xs text-black uppercase leading-tight line-clamp-2">
                  {item.title}
                </h4>
                <div className="font-mono text-xs font-black text-black pt-1">
                  {item.currency}{item.price} &bull; <span className="font-normal text-slate-500 uppercase">{item.college}</span>
                </div>
              </div>
            </div>

            {/* Footer action */}
            <div className="p-3 pt-0">
              <button
                onClick={() => alert(`Contacting seller: ${item.seller}`)}
                className="w-full py-1.5 border-2 border-black font-mono font-bold text-[11px] bg-slate-50 hover:bg-black hover:text-white uppercase transition-colors"
              >
                [ VIEW ASSET ]
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Monospace Footer */}
      <footer className="text-center font-mono text-xs text-slate-500 py-6 border-t-2 border-black">
        &copy; 2026 Campus Pulse. All rights reserved. &bull; Terms & Conditions
      </footer>

    </div>
  );
}

