// client/src/components/SmartInputModal.jsx
import React, { useState } from 'react';
import { X, Sparkles, Check, AlertCircle, RefreshCw, Send, ArrowRight } from 'lucide-react';
import { parseEventAnnouncement, createEvent } from '../services/api';

const SAMPLE_MESSAGES = [
  {
    label: '🚀 MIT CSS Hackathon',
    text: `*🔥 MIT CSS Presents: CODE-WARS 2026! 🔥*
Hey guys! Computer Science Society (MIT CSS) is back with our annual 24-hr National Hackathon!
📅 Date: Nov 14 - 15, 2026
⏰ Time: 10:00 AM onwards (24 Hours non-stop)
📍 Venue: MIT Main Auditorium & Computing Labs 3-5
Prizes worth ₹75,000, free food, goodies, and internship fast-tracks for all participants!
Register here: https://mitcss.org/codewars
Contact: Aarav Sharma (President, MIT CSS) +91 98765 43210`
  },
  {
    label: '🛡️ MIT Cyber Security',
    text: `Urgent announcement: All 2nd and 3rd year students, Cyber Security workshop will happen at Seminar Hall B on Friday, 18 Nov at 2:30 PM. Conducted by MIT CYBER SECURITY in collaboration with industry experts. Bring your laptops. Hands on ethical hacking, Wireshark, bug bounty basics. RSVP link: https://mitcyber.sec/rsvp`
  },
  {
    label: '🧠 MIT AIMLSS GenAI',
    text: `MIT AIMLSS is super excited to announce "AI Odyssey: Hands-on GenAI & Neural Networks Masterclass". Date: 21st November 2026. Timing: 11:00 AM - 3:30 PM. Venue: Lab 402, Tech Block. Free GPU credits and certificates will be provided! Register: https://mitaimlss.org/ai-odyssey`
  },
  {
    label: '🤖 MIT Tech Club Clash',
    text: `⚡ MIT TECH CLUB brings you RoboCraze 2026! 🤖 Line follower and RC car racing competition. Date: 26th Nov 2026, Venue: Central Tech Arena & Innovation Quad, Time: 09:30 AM - 04:30 PM. Cash prizes ₹30k! Free refreshments! Reg: https://mittechclub.in/robocraze`
  },
  {
    label: '🎙️ MIT Literacy Debate',
    text: `Join us for "Vichaar 2026 - Annual Parliamentary Debate" hosted by MIT LITERACY SOCIETY. Venue: Auditorium Block - Humanities Hall 1. Time: 09:00 AM to 05:00 PM. Date: 29th November 2026. Cash prizes for best speaker and best team! Link: https://mitliterary.org/vichaar`
  }
];

const SOCIETIES = [
  'MIT CSS',
  'MIT TECH CLUB',
  'MIT LITERACY SOCIETY',
  'MIT AIMLSS',
  'MIT CYBER SECURITY',
  'Aditi Cultural Society',
  'Enactus AM'
];

export default function SmartInputModal({ isOpen, onClose, onEventCreated }) {
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState('');
  const [extracted, setExtracted] = useState(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleParse = async () => {
    if (!rawText.trim()) {
      setError('Please enter or paste an unordered WhatsApp group announcement.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await parseEventAnnouncement(rawText);
      if (res && res.data) {
        setExtracted(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to parse text.');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!extracted) return;
    setPublishing(true);
    setError('');
    try {
      const payload = {
        ...extracted,
        mode: extracted.venue.toLowerCase().includes('online') ? 'ONLINE' : 'CAMPUS',
        image: extracted.category === 'HACKATHON'
          ? 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60'
          : extracted.category === 'CYBER SECURITY'
          ? 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop&q=60'
          : extracted.category === 'AI & Data Science' || extracted.category === 'AI & ML'
          ? 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&auto=format&fit=crop&q=60'
          : 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=60'
      };
      const created = await createEvent(payload);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onEventCreated(created);
        onClose();
      }, 1000);
    } catch (err) {
      setError(err.message || 'Failed to publish event');
      setPublishing(false);
    }
  };

  const updateField = (field, val) => {
    setExtracted(prev => ({ ...prev, [field]: val }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white border-2 border-black brutal-shadow-lg flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-black bg-[#84cc16]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-black" />
            <span className="font-mono font-black text-sm text-black uppercase tracking-wider">
              SMART INPUT // WHATSAPP UNORDERED EXTRACTOR
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 font-mono">
          
          {/* Quick 1-Click Sample Pills */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-2">
              ⚡ TRY 1-CLICK SAMPLE WHATSAPP FORWARDS:
            </label>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_MESSAGES.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setRawText(sample.text);
                    setError('');
                  }}
                  className="px-2.5 py-1 text-xs border border-black bg-slate-50 hover:bg-[#fef08a] font-bold uppercase transition-colors"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-black uppercase">
                PASTE UNORDERED WHATSAPP MESSAGE / POSTER TEXT:
              </label>
              {rawText && (
                <button
                  onClick={() => setRawText('')}
                  className="text-[11px] text-red-600 hover:underline uppercase"
                >
                  [ CLEAR ]
                </button>
              )}
            </div>
            <textarea
              rows={5}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste raw unorganized WhatsApp forward here... e.g.&#10;🔥 MIT CSS Presents: CODE-WARS 2026! Date: 14th Nov 2026, Venue: MIT Main Audi..."
              className="w-full border-2 border-black p-3 text-xs text-black placeholder-slate-400 focus:outline-none"
            />
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <span className="text-[11px] text-slate-500 uppercase">
              Extracts: <strong className="text-black">Society, Title, Date, Time, Venue & Perks</strong>
            </span>
            <button
              onClick={handleParse}
              disabled={loading || !rawText.trim()}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#fef08a] hover:bg-[#fde047] disabled:opacity-50 text-black font-bold text-xs border-2 border-black brutal-btn uppercase"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-black" />
                  <span>PARSING MESSAGE...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>⚡ ORGANIZE & EXTRACT EVENT CARD</span>
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 border-2 border-red-600 bg-red-50 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Extracted Event Preview & Form */}
          {extracted && (
            <div className="pt-4 border-t-2 border-black space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-[#65a30d] flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#65a30d]" />
                  SUCCESSFULLY EXTRACTED EVENT DATA
                </span>
                <span className="text-[10px] text-slate-500 uppercase">
                  Verify or tweak fields before publishing
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Form Fields */}
                <div className="border-2 border-black p-4 bg-slate-50 space-y-2.5 text-xs">
                  <h4 className="font-bold border-b border-black pb-1 uppercase">
                    EXTRACTED EVENT FIELDS
                  </h4>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                      1. CONDUCTING SOCIETY
                    </label>
                    <select
                      value={extracted.society}
                      onChange={(e) => updateField('society', e.target.value)}
                      className="w-full border-2 border-black px-2 py-1 text-xs bg-white uppercase font-bold"
                    >
                      {SOCIETIES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                      2. EVENT TITLE
                    </label>
                    <input
                      type="text"
                      value={extracted.title}
                      onChange={(e) => updateField('title', e.target.value)}
                      className="w-full border-2 border-black px-2 py-1 text-xs bg-white uppercase font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                        3. DATE
                      </label>
                      <input
                        type="text"
                        value={extracted.date}
                        onChange={(e) => updateField('date', e.target.value)}
                        className="w-full border-2 border-black px-2 py-1 text-xs bg-white uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                        4. TIME
                      </label>
                      <input
                        type="text"
                        value={extracted.time}
                        onChange={(e) => updateField('time', e.target.value)}
                        className="w-full border-2 border-black px-2 py-1 text-xs bg-white uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                      5. VENUE
                    </label>
                    <input
                      type="text"
                      value={extracted.venue}
                      onChange={(e) => updateField('venue', e.target.value)}
                      className="w-full border-2 border-black px-2 py-1 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">
                      6. REGISTRATION LINK
                    </label>
                    <input
                      type="text"
                      value={extracted.registrationLink}
                      onChange={(e) => updateField('registrationLink', e.target.value)}
                      className="w-full border-2 border-black px-2 py-1 text-xs bg-white"
                    />
                  </div>
                </div>

                {/* Right: Live Card Preview matching Acadamex Screenshot 5 */}
                <div className="space-y-2">
                  <h4 className="font-bold text-xs uppercase">
                    ORGANIZED EVENT CARD PREVIEW
                  </h4>

                  <div className="border-2 border-black bg-white brutal-shadow-sm overflow-hidden flex flex-col justify-between">
                    <div className="relative border-b-2 border-black h-36 bg-slate-900 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60"
                        alt={extracted.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#84cc16] border border-black font-mono text-[9px] font-bold uppercase text-black">
                        {extracted.venue.toLowerCase().includes('online') ? 'ONLINE' : 'CAMPUS'}
                      </div>
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black text-white font-mono text-[9px] font-bold uppercase">
                        {extracted.college || 'MIT CAMPUS'}
                      </div>
                    </div>

                    <div className="p-3 space-y-1.5">
                      <div className="font-mono text-xs font-bold text-cyan-600 uppercase">
                        [{extracted.category || 'EVENT'}] [{extracted.society}]
                      </div>
                      <h4 className="font-mono font-black text-xs text-black uppercase leading-snug">
                        {extracted.title}
                      </h4>
                      <div className="font-mono text-[11px] text-slate-700 font-bold uppercase">
                        📅 {extracted.date} &bull; ⏰ {extracted.time}
                      </div>
                      <div className="font-mono text-[11px] text-slate-500 truncate">
                        📍 {extracted.venue}
                      </div>

                      {extracted.aiSummary && extracted.aiSummary.tldr && (
                        <div className="p-2 border border-black bg-[#fef08a] text-[10px] text-black">
                          <strong>AI TL;DR:</strong> {extracted.aiSummary.tldr}
                        </div>
                      )}
                    </div>

                    <div className="border-t-2 border-black p-2 bg-slate-50 text-[10px] text-slate-500 font-bold uppercase flex justify-between">
                      <span>READY TO PUBLISH</span>
                      <span className="text-black font-black">CAMPUS PULSE FEED</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t-2 border-black bg-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-mono text-xs font-bold border-2 border-black bg-white hover:bg-slate-200 uppercase"
          >
            CANCEL
          </button>

          {extracted && (
            <button
              onClick={handlePublish}
              disabled={publishing || success}
              className="px-6 py-2 font-mono text-xs font-black border-2 border-black bg-[#84cc16] hover:bg-[#65a30d] text-black brutal-btn uppercase flex items-center gap-2"
            >
              {success ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>PUBLISHED TO CAMPUS PULSE!</span>
                </>
              ) : publishing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>PUBLISHING...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-black" />
                  <span>[ PUBLISH TO LIVE FEED ]</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
