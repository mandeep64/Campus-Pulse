// client/src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeView from './views/HomeView';
import EventsView from './views/EventsView';
import MarketplaceView from './views/MarketplaceView';
import SmartInputModal from './components/SmartInputModal';
import AISummaryModal from './components/AISummaryModal';
import AIBotWidget from './components/AIBotWidget';
import { fetchEvents, fetchMarketplace } from './services/api';
import { RefreshCw, AlertCircle, Plus, Sparkles } from 'lucide-react';

export default function App() {
  const getInitialParam = (param, fallback) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(param) || fallback;
  };

  const [activeTab, setActiveTab] = useState('HOME');
  const [univ, setUniv] = useState(() => getInitialParam('univ', 'ALL'));
  const [college, setCollege] = useState(() => getInitialParam('college', 'ALL'));

  // Events & Marketplace data
  const [events, setEvents] = useState([]);
  const [marketplaceItems, setMarketplaceItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters for Events view
  const [eventCategory, setEventCategory] = useState('ALL CATEGORIES');
  const [searchQuery, setSearchQuery] = useState('');
  const [eventCollege, setEventCollege] = useState('ALL');

  // Modals
  const [isSmartInputOpen, setIsSmartInputOpen] = useState(false);
  const [isAIBotOpen, setIsAIBotOpen] = useState(false);
  const [selectedEventForSummary, setSelectedEventForSummary] = useState(null);
  const [publishedAlert, setPublishedAlert] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [eventsData, marketData] = await Promise.all([
        fetchEvents({ univ, college }),
        fetchMarketplace()
      ]);
      setEvents(eventsData);
      setMarketplaceItems(marketData);
    } catch (err) {
      console.error('Failed to load data:', err);
      setError('Could not connect to Campus Pulse server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [univ, college]);

  const handleEventCreated = (newEvent) => {
    setEvents(prev => [newEvent, ...prev]);
    setPublishedAlert(`⚡ Published: "${newEvent.title}" is now live on Campus Pulse!`);
    setTimeout(() => setPublishedAlert(null), 6000);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#84cc16] selection:text-black">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onOpenSmartInput={() => setIsSmartInputOpen(true)}
        onOpenAIBot={() => setIsAIBotOpen(prev => !prev)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* Published Success Banner */}
        {publishedAlert && (
          <div className="mb-6 border-2 border-black bg-[#84cc16] p-3 brutal-shadow-sm font-mono text-xs font-bold text-black flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-black" />
              <span>{publishedAlert}</span>
            </div>
            <button
              onClick={() => setPublishedAlert(null)}
              className="text-black underline uppercase"
            >
              [ DISMISS ]
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center font-mono space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin text-black" />
            <div className="font-bold text-xs uppercase tracking-wider">
              LOADING CAMPUS PULSE INTEL...
            </div>
          </div>
        ) : error ? (
          <div className="py-20 text-center font-mono space-y-4">
            <div className="inline-block border-2 border-red-600 bg-red-50 p-4 text-red-600 text-xs font-bold">
              {error}
            </div>
            <div>
              <button
                onClick={loadData}
                className="px-4 py-2 border-2 border-black bg-[#84cc16] font-bold text-xs uppercase brutal-btn"
              >
                RETRY CONNECTION
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* View 1: HOME (Dashboard) */}
            {activeTab === 'HOME' && (
              <HomeView
                events={events}
                marketplaceItems={marketplaceItems}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onOpenSummary={(evt) => setSelectedEventForSummary(evt)}
                onOpenAIBot={() => setIsAIBotOpen(true)}
                currentCollege={college}
              />
            )}

            {/* View 2: EVENTS */}
            {activeTab === 'EVENTS' && (
              <EventsView
                events={events}
                onOpenSmartInput={() => setIsSmartInputOpen(true)}
                onOpenSummary={(evt) => setSelectedEventForSummary(evt)}
                selectedCategory={eventCategory}
                onCategoryChange={setEventCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCollege={eventCollege}
                onCollegeChange={setEventCollege}
              />
            )}

            {/* View 3: MARKETPLACE */}
            {activeTab === 'MARKETPLACE' && (
              <MarketplaceView
                marketplaceItems={marketplaceItems}
              />
            )}

            {/* View 4: STUDY-HELP / ASSIGNMENT GIGS */}
            {activeTab === 'STUDY-HELP' && (
              <div className="space-y-6 font-mono">
                <div className="border-b-2 border-black pb-4 flex items-end justify-between">
                  <div>
                    <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter italic font-sans text-black">
                      STUDY-HELP.
                    </h1>
                    <p className="text-xs uppercase text-black mt-1">
                      ASSIGNMENT GIGS, ACADEMIC COMMISSIONS, AND PEER TUTORING.
                    </p>
                  </div>
                  <button
                    onClick={() => alert('Post Gig modal in demo.')}
                    className="px-4 py-2 bg-[#84cc16] border-2 border-black font-bold text-xs uppercase brutal-btn"
                  >
                    + POST A GIG
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-black bg-white p-4 brutal-shadow-sm space-y-2">
                    <div className="text-[10px] text-cyan-600 font-bold uppercase">COMPUTER NETWORKS LAB</div>
                    <h3 className="font-black text-sm uppercase">Cisco Packet Tracer Topology Assignment</h3>
                    <p className="text-xs text-slate-600">Need help configuring OSPF multi-area router topology by Tuesday.</p>
                    <div className="font-bold text-xs pt-2 flex justify-between items-center border-t border-black">
                      <span>BOUNTY: ₹600</span>
                      <span className="border border-black px-2 py-0.5 bg-slate-100">[ APPLY ]</span>
                    </div>
                  </div>

                  <div className="border-2 border-black bg-white p-4 brutal-shadow-sm space-y-2">
                    <div className="text-[10px] text-cyan-600 font-bold uppercase">MATHEMATICS III</div>
                    <h3 className="font-black text-sm uppercase">Fourier Series & PDE Handwritten Notes</h3>
                    <p className="text-xs text-slate-600">Looking for complete clean solved previous year question papers.</p>
                    <div className="font-bold text-xs pt-2 flex justify-between items-center border-t border-black">
                      <span>BOUNTY: ₹350</span>
                      <span className="border border-black px-2 py-0.5 bg-slate-100">[ APPLY ]</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* View 5: LOST & FOUND */}
            {activeTab === 'LOST & FOUND' && (
              <div className="space-y-6 font-mono">
                <div className="border-b-2 border-black pb-4 flex items-end justify-between">
                  <div>
                    <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter italic font-sans text-black">
                      LOST & FOUND.
                    </h1>
                    <p className="text-xs uppercase text-black mt-1">
                      REPORT AND RECOVER LOST BELONGINGS ACROSS CAMPUSES.
                    </p>
                  </div>
                  <button
                    onClick={() => alert('Report Lost Item modal in demo.')}
                    className="px-4 py-2 bg-[#f43f5e] text-white border-2 border-black font-bold text-xs uppercase brutal-btn"
                  >
                    + REPORT ITEM
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-black bg-white p-4 brutal-shadow-sm space-y-2">
                    <div className="text-[10px] text-rose-600 font-bold uppercase">LOST ITEM &bull; TECH BLOCK</div>
                    <h3 className="font-black text-sm uppercase">Boat Airdopes 141 (Black Case)</h3>
                    <p className="text-xs text-slate-600">Left near CS Computing Lab 3 on 28th Oct around 3 PM.</p>
                    <div className="font-bold text-xs pt-2 flex justify-between items-center border-t border-black">
                      <span>STATUS: UNCLAIMED</span>
                      <span className="border border-black px-2 py-0.5 bg-slate-100">[ CONTACT FINDER ]</span>
                    </div>
                  </div>

                  <div className="border-2 border-black bg-white p-4 brutal-shadow-sm space-y-2">
                    <div className="text-[10px] text-emerald-600 font-bold uppercase">FOUND ITEM &bull; AUDITORIUM</div>
                    <h3 className="font-black text-sm uppercase">Scientific Calculator Casio fx-82MS</h3>
                    <p className="text-xs text-slate-600">Found on row 4 seat 12 during orientation session.</p>
                    <div className="font-bold text-xs pt-2 flex justify-between items-center border-t border-black">
                      <span>STATUS: AT ADMIN DESK</span>
                      <span className="border border-black px-2 py-0.5 bg-slate-100">[ CLAIM ITEM ]</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

      </main>

      {/* Smart Input (Added Feature 1: WhatsApp extractor) */}
      <SmartInputModal
        isOpen={isSmartInputOpen}
        onClose={() => setIsSmartInputOpen(false)}
        onEventCreated={handleEventCreated}
      />

      {/* AI Summary Modal */}
      <AISummaryModal
        event={selectedEventForSummary}
        onClose={() => setSelectedEventForSummary(null)}
      />

      {/* Floating AI Bot Widget (Added Feature 2: Link to ai-chat-bot-five-beta.vercel.app) */}
      <AIBotWidget
        isOpen={isAIBotOpen}
        onToggle={() => setIsAIBotOpen(prev => !prev)}
      />

    </div>
  );
}
