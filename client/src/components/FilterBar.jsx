// client/src/components/FilterBar.jsx
import React from 'react';
import { Search, X, SlidersHorizontal, Layers } from 'lucide-react';

const CATEGORIES = [
  'ALL',
  'Hackathon',
  'Workshop',
  'Cyber Security',
  'AI & Data Science',
  'Literary & Cultural',
  'Competition',
  'Fest'
];

export default function FilterBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  society,
  onSocietyChange,
  totalResults
}) {
  return (
    <div className="space-y-4 mb-6">
      {/* Search & Results Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search events, societies, topics, venues..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results count & reset filters */}
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span>
            Showing <strong className="text-white">{totalResults}</strong> events
          </span>
          {(category !== 'ALL' || society !== 'ALL' || search) && (
            <button
              onClick={() => {
                onSearchChange('');
                onCategoryChange('ALL');
                onSocietyChange('ALL');
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 text-indigo-300 hover:bg-slate-700 font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mr-1 hidden sm:inline">
          Filter:
        </span>
        {CATEGORIES.map((cat) => {
          const isSelected = category === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {cat === 'ALL' ? 'All Categories' : cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}

