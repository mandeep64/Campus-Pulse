// client/src/components/SocietyShowcase.jsx
import React from 'react';
import { Terminal, Cpu, BookOpen, Sparkles, Shield, Music, Users, ArrowRight } from 'lucide-react';

const ICONS = {
  Terminal: Terminal,
  Cpu: Cpu,
  BookOpen: BookOpen,
  Sparkles: Sparkles,
  Shield: Shield,
  Music: Music
};

const COLOR_MAP = {
  blue: { border: 'border-blue-500/40', text: 'text-blue-400', glow: 'hover:shadow-blue-500/10' },
  emerald: { border: 'border-emerald-500/40', text: 'text-emerald-400', glow: 'hover:shadow-emerald-500/10' },
  purple: { border: 'border-purple-500/40', text: 'text-purple-400', glow: 'hover:shadow-purple-500/10' },
  pink: { border: 'border-pink-500/40', text: 'text-pink-400', glow: 'hover:shadow-pink-500/10' },
  amber: { border: 'border-amber-500/40', text: 'text-amber-400', glow: 'hover:shadow-amber-500/10' },
  rose: { border: 'border-rose-500/40', text: 'text-rose-400', glow: 'hover:shadow-rose-500/10' }
};

export default function SocietyShowcase({ societies = [], selectedSociety, onSelectSociety }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
            <span>🏛️ Campus Societies Spotlight</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              MIT Councils
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any society to filter active hackathons, workshops & sessions
          </p>
        </div>

        {selectedSociety !== 'ALL' && (
          <button
            onClick={() => onSelectSociety('ALL')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
          >
            Show All Societies
          </button>
        )}
      </div>

      {/* Grid of Society Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {societies.map((soc) => {
          const IconComp = ICONS[soc.icon] || Sparkles;
          const colors = COLOR_MAP[soc.badgeColor] || COLOR_MAP.blue;
          const isSelected = selectedSociety === soc.name;

          return (
            <div
              key={soc.id || soc.name}
              onClick={() => onSelectSociety(isSelected ? 'ALL' : soc.name)}
              className={`cursor-pointer rounded-xl p-4 transition-all duration-200 border ${
                isSelected
                  ? `bg-slate-800/90 ${colors.border} ring-2 ring-indigo-500/50 shadow-lg`
                  : `bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 ${colors.glow}`
              } flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center ${colors.text} border border-slate-800`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {soc.members}
                  </span>
                </div>

                <h3 className="font-extrabold text-sm text-white tracking-tight">
                  {soc.name}
                </h3>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5 mb-2">
                  {soc.category}
                </p>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {soc.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className={`font-semibold ${isSelected ? 'text-indigo-400' : 'text-slate-400'}`}>
                  {isSelected ? 'Active Filter ✓' : 'View Events'}
                </span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

