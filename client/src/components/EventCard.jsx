// client/src/components/EventCard.jsx
import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ExternalLink,
  Users,
  Share2,
  CheckCircle,
  Building2,
  Heart
} from 'lucide-react';
import { rsvpEvent } from '../services/api';

const SOCIETY_COLORS = {
  'MIT CSS': { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', tag: '#3B82F6' },
  'MIT TECH CLUB': { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', tag: '#10B981' },
  'MIT LITERACY SOCIETY': { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', tag: '#8B5CF6' },
  'MIT AIMLSS': { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400', tag: '#EC4899' },
  'MIT CYBER SECURITY': { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', tag: '#F59E0B' },
  'Aditi Cultural Society': { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', tag: '#F43F5E' },
  'Enactus AM': { bg: 'bg-teal-500/10', border: 'border-teal-500/30', text: 'text-teal-400', tag: '#14B8A6' }
};

export default function EventCard({ event, onOpenSummary, onSelectSociety }) {
  const [rsvps, setRsvps] = useState(event.rsvps || 0);
  const [hasRsvpd, setHasRsvpd] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const socColor = SOCIETY_COLORS[event.society] || {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/30',
    text: 'text-indigo-400'
  };

  const handleRsvp = async (e) => {
    e.stopPropagation();
    if (hasRsvpd) return;
    try {
      setHasRsvpd(true);
      setRsvps(prev => prev + 1);
      await rsvpEvent(event.id);
    } catch (err) {
      console.error('RSVP failed', err);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const shareText = `🎓 *${event.title}*\n🏛️ Conducted by: *${event.society}*\n📅 ${event.date} | ⏰ ${event.time}\n📍 Venue: ${event.venue}\n🔗 Register: ${event.registrationLink}\n\nDiscovered via Campus Pulse!`;
    navigator.clipboard.writeText(shareText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="group relative rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 p-5 sm:p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between backdrop-blur-sm">
      
      {/* Top row: Society badge & Category pill */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <button
            onClick={() => onSelectSociety && onSelectSociety(event.society)}
            className={`px-3 py-1 rounded-full text-xs font-bold ${socColor.bg} ${socColor.border} ${socColor.text} border hover:opacity-80 transition-all flex items-center gap-1.5`}
            title={`Filter by ${event.society}`}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: event.societyColor || '#6366f1' }}></span>
            <span>{event.society}</span>
          </button>

          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {event.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-extrabold text-white group-hover:text-indigo-300 transition-colors leading-snug line-clamp-2">
          {event.title}
        </h3>

        {/* College & University */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 mb-3">
          <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="truncate">{event.college}</span>
        </div>

        {/* Event Key Metrics: Date, Time, Venue */}
        <div className="space-y-1.5 my-3 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="font-semibold text-slate-200">{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>

        {/* Description snippet */}
        {event.description && (
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
            {event.description}
          </p>
        )}

        {/* Perks / Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {event.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="pt-3 border-t border-slate-800/80 space-y-3">
        {/* Row 1: AI Summary & RSVP Buttons */}
        <div className="flex items-center justify-between gap-2">
          {/* AI Summary Trigger */}
          <button
            onClick={() => onOpenSummary(event)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/50 transition-all shadow-sm group/btn"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 group-hover/btn:rotate-12 transition-transform" />
            <span>AI Summary</span>
          </button>

          {/* RSVP Button */}
          <button
            onClick={handleRsvp}
            className={`flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
              hasRsvpd
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${hasRsvpd ? 'fill-current text-emerald-400' : 'text-slate-400'}`} />
            <span>{rsvps} RSVP</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            title="Copy shareable message"
          >
            {copiedShare ? (
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Row 2: Register External Link */}
        <a
          href={event.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-md shadow-indigo-600/20 transition-all active:scale-[0.98]"
        >
          <span>Register / Details</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
}

