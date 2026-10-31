// client/src/components/AISummaryModal.jsx
import React, { useState } from 'react';
import { X, Sparkles, Check, Copy } from 'lucide-react';

export default function AISummaryModal({ event, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!event) return null;

  const summary = event.aiSummary || {
    tldr: `Official ${event.category} session organized by ${event.society}: "${event.title}" on ${event.date}.`,
    highlights: [
      `🎯 Event focus: Organized by ${event.society} student council.`,
      `📍 Location: ${event.venue} on ${event.date}.`,
      `🎁 Perks: Verified certificate and networking.`
    ],
    actionItem: 'Register before seats fill up.'
  };

  const handleCopy = () => {
    const textToCopy = `✨ *AI Summary: ${event.title}*\n🏛️ *Society:* ${event.society}\n📅 *Date:* ${event.date}\n📍 *Venue:* ${event.venue}\n\n📝 *TL;DR:*\n${summary.tldr}\n\n*Highlights:*\n${(summary.highlights || []).join('\n')}\n\n🔗 *Register:* ${event.registrationLink}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white border-2 border-black brutal-shadow-lg flex flex-col font-mono">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b-2 border-black bg-[#fef08a]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-black" />
            <span className="font-mono font-black text-xs text-black uppercase tracking-wider">
              AI EVENT SUMMARY // INTEL BRIEF
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 border border-black bg-white hover:bg-black hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          {/* Target Event */}
          <div className="border-2 border-black p-3 bg-slate-50">
            <div className="text-[10px] text-cyan-600 font-bold uppercase mb-0.5">
              {event.society} &bull; {event.category}
            </div>
            <h4 className="font-black text-sm uppercase text-black">
              {event.title}
            </h4>
            <div className="text-[11px] text-slate-600 mt-1 uppercase">
              📅 {event.date} &bull; 📍 {event.venue}
            </div>
          </div>

          {/* TLDR */}
          <div className="border-2 border-black p-3 bg-[#fffdf5]">
            <div className="font-bold uppercase text-[10px] text-slate-500 mb-1">
              EXECUTIVE TL;DR:
            </div>
            <p className="text-black leading-relaxed font-bold">
              {summary.tldr}
            </p>
          </div>

          {/* Highlights */}
          {summary.highlights && summary.highlights.length > 0 && (
            <div className="space-y-1.5">
              <div className="font-bold uppercase text-[10px] text-slate-500">
                KEY HIGHLIGHTS & PERKS:
              </div>
              <div className="space-y-1">
                {summary.highlights.map((h, i) => (
                  <div key={i} className="border border-black p-2 bg-white text-black">
                    {h}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Item */}
          {summary.actionItem && (
            <div className="border border-black p-2.5 bg-[#84cc16]/20 font-bold text-black">
              ⚡ ACTION ITEM: {summary.actionItem}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t-2 border-black bg-slate-100 flex items-center justify-between">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 border-2 border-black font-bold text-xs bg-white hover:bg-slate-200 uppercase flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-black" />
                <span>COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-black" />
                <span>COPY FOR WHATSAPP</span>
              </>
            )}
          </button>

          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 border-2 border-black font-bold text-xs bg-[#84cc16] hover:bg-[#65a30d] text-black uppercase brutal-btn"
          >
            REGISTER &rarr;
          </a>
        </div>

      </div>
    </div>
  );
}
