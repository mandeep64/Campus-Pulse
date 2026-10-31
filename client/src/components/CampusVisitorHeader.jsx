// client/src/components/CampusVisitorHeader.jsx
import React from 'react';
import { Building2, School, Filter, Compass, Calendar, Users, Award, ShieldCheck } from 'lucide-react';

const UNIVERSITIES = [
  { id: 'ALL', name: 'All Universities' },
  { id: 'Delhi University (DU)', name: 'Delhi University (DU)' },
  { id: 'MIT World Peace University', name: 'MIT World Peace University' },
  { id: 'GGSIPU', name: 'GGSIPU (Guru Gobind Singh IPU)' }
];

const COLLEGES = [
  { id: 'ALL', name: 'All Colleges', univ: 'ALL' },
  { id: 'aditi-mahavidyalaya-am', name: 'Aditi Mahavidyalaya (AM - DU)', univ: 'Delhi University (DU)' },
  { id: 'mit-campus', name: 'MIT Pune / MIT Campus', univ: 'MIT World Peace University' },
  { id: 'msit-ipu', name: 'MSIT (Janakpuri)', univ: 'GGSIPU' },
  { id: 'mait-ipu', name: 'MAIT (Rohini)', univ: 'GGSIPU' }
];

export default function CampusVisitorHeader({
  currentUniv,
  currentCollege,
  onUnivChange,
  onCollegeChange,
  eventsCount,
  societiesCount
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-slate-950 border border-indigo-500/20 p-5 sm:p-7 mb-8 shadow-2xl">
      {/* Glow highlight */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Titles & Campus Visitor Badge */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>Campus Visitor Mode &bull; acadamex.xyz replica</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] leading-tight">
            Discover What's Happening in Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-400">
              Campus & Societies
            </span>
          </h1>

          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Real-time hub for hackathons, workshops, technical bootcamps, and fests from{' '}
            <span className="text-indigo-400 font-semibold">MIT CSS</span>,{' '}
            <span className="text-emerald-400 font-semibold">MIT TECH CLUB</span>,{' '}
            <span className="text-purple-400 font-semibold">MIT LITERACY SOCIETY</span>,{' '}
            <span className="text-pink-400 font-semibold">MIT AIMLSS</span>,{' '}
            <span className="text-amber-400 font-semibold">MIT CYBER SECURITY</span>, and partner colleges.
          </p>
        </div>

        {/* Right: Univ & College Switchers (Matching Acadamex campus-visitor) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800 shadow-inner">
          {/* University Selector */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-indigo-400" />
              University Filter
            </label>
            <select
              value={currentUniv}
              onChange={(e) => onUnivChange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-indigo-500 transition-colors"
            >
              {UNIVERSITIES.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* College Selector */}
          <div className="flex-1 min-w-[220px]">
            <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              College Filter
            </label>
            <select
              value={currentCollege}
              onChange={(e) => onCollegeChange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-cyan-500 transition-colors"
            >
              {COLLEGES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mini stats footer */}
      <div className="relative z-10 mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-400" />
          <span>Active Events: <strong className="text-white">{eventsCount}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-400" />
          <span>Campus Societies: <strong className="text-white">{societiesCount}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-pink-400" />
          <span>Smart Input: <strong className="text-white">Active ⚡</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Verified Councils: <strong className="text-white">100%</strong></span>
        </div>
      </div>
    </div>
  );
}

