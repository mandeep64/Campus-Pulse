// server/server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { seedEvents, seedMarketplace } = require('./data/seedData');
const { parseWhatsAppMessage, generateAISummary, KNOWN_SOCIETIES } = require('./utils/smartParser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Local JSON store path
const DB_FILE = path.join(__dirname, 'data', 'localDb.json');

// Initialize local DB if not present
function initLocalDb(force = false) {
  try {
    if (force || !fs.existsSync(DB_FILE)) {
      const initialData = {
        events: seedEvents,
        marketplace: seedMarketplace
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      console.log('📦 Local storage initialized with Campus Pulse seed data.');
    }
  } catch (err) {
    console.error('Error initializing local DB:', err);
  }
}

initLocalDb(true); // force update to fresh Acadamex replica seed data

function readLocalDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      initLocalDb();
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read local DB, returning fallback:', err);
    return { events: seedEvents, marketplace: seedMarketplace };
  }
}

function writeLocalDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write local DB:', err);
  }
}

// Optional Mongoose connection if MONGODB_URI is provided
let mongoConnected = false;
if (process.env.MONGODB_URI) {
  const mongoose = require('mongoose');
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      mongoConnected = true;
      console.log('✅ Connected to MongoDB successfully.');
    })
    .catch(err => {
      console.warn('⚠️ MongoDB connection failed. Running with resilient local file storage.', err.message);
    });
}

// -------------------------------------------------------------
// ROUTES
// -------------------------------------------------------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Campus Pulse',
    version: '1.0.0',
    mongoConnected,
    storage: mongoConnected ? 'MongoDB' : 'Resilient File Storage (localDb.json)'
  });
});

// GET /api/marketplace - Circular Assets Exchange
app.get('/api/marketplace', (req, res) => {
  const db = readLocalDb();
  let items = [...(db.marketplace || seedMarketplace)];

  const { search, category, college } = req.query;
  if (category && category !== 'ALL' && category !== 'ALL CATEGORIES') {
    items = items.filter(i => (i.category || '').toLowerCase() === category.toLowerCase());
  }
  if (college && college !== 'ALL' && college !== 'ALL COLLEGES') {
    items = items.filter(i => (i.college || '').toLowerCase().includes(college.toLowerCase()));
  }
  if (search && search.trim()) {
    const q = search.toLowerCase();
    items = items.filter(i => (i.title || '').toLowerCase().includes(q) || (i.category || '').toLowerCase().includes(q));
  }

  res.json(items);
});

// GET /api/societies - All campus societies
app.get('/api/societies', (req, res) => {
  const db = readLocalDb();
  res.json(db.societies || seedSocieties);
});

// GET /api/events - List events with college/univ/society filters
app.get('/api/events', (req, res) => {
  const db = readLocalDb();
  let events = [...db.events];

  const { univ, college, society, category, search } = req.query;

  // University filter (handle "ALL" or specific e.g. "Delhi University (DU)")
  if (univ && univ !== 'ALL') {
    events = events.filter(e => {
      const u = (e.university || '').toLowerCase();
      const queryU = univ.toLowerCase();
      return u.includes(queryU) || queryU.includes(u) || u === 'all';
    });
  }

  // College filter (handle slug or name e.g. "aditi-mahavidyalaya-am")
  if (college && college !== 'ALL' && college !== '') {
    const normCollege = college.toLowerCase().replace(/[-_]/g, ' ');
    events = events.filter(e => {
      const c = (e.college || '').toLowerCase();
      return c.includes(normCollege) || normCollege.includes('aditi') && c.includes('aditi') || normCollege.includes('mit') && c.includes('mit');
    });
  }

  // Society filter
  if (society && society !== 'ALL') {
    events = events.filter(e => {
      return (e.society || '').toLowerCase() === society.toLowerCase();
    });
  }

  // Category filter
  if (category && category !== 'ALL') {
    events = events.filter(e => {
      return (e.category || '').toLowerCase() === category.toLowerCase();
    });
  }

  // Search keyword filter
  if (search && search.trim() !== '') {
    const q = search.toLowerCase().trim();
    events = events.filter(e => {
      return (
        (e.title && e.title.toLowerCase().includes(q)) ||
        (e.society && e.society.toLowerCase().includes(q)) ||
        (e.venue && e.venue.toLowerCase().includes(q)) ||
        (e.description && e.description.toLowerCase().includes(q)) ||
        (e.tags && e.tags.some(t => t.toLowerCase().includes(q)))
      );
    });
  }

  res.json(events);
});

// GET /api/events/:id - Get single event
app.get('/api/events/:id', (req, res) => {
  const db = readLocalDb();
  const event = db.events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  res.json(event);
});

// POST /api/events - Create new event
app.post('/api/events', (req, res) => {
  try {
    const db = readLocalDb();
    const newEvent = {
      id: 'evt-' + Date.now(),
      title: req.body.title || 'Untitled Campus Event',
      society: req.body.society || 'MIT TECH CLUB',
      societyFullName: req.body.societyFullName || req.body.society || 'Campus Society',
      societyCategory: req.body.societyCategory || 'Technical',
      societyColor: req.body.societyColor || '#3B82F6',
      date: req.body.date || 'TBA',
      time: req.body.time || '10:00 AM onwards',
      venue: req.body.venue || 'College Auditorium / Lab',
      description: req.body.description || req.body.rawText || 'Exciting college event organized for students.',
      category: req.body.category || 'Workshop',
      registrationLink: req.body.registrationLink || 'https://campuspulse.edu/register',
      contact: req.body.contact || 'Society Core Team',
      tags: req.body.tags && req.body.tags.length > 0 ? req.body.tags : ['Open for All', 'Certificates'],
      college: req.body.college || 'MIT Pune / MIT Campus',
      university: req.body.university || 'MIT World Peace University',
      status: req.body.status || 'Upcoming',
      capacity: req.body.capacity || 100,
      rsvps: req.body.rsvps || 1,
      featured: req.body.featured || false,
      rawText: req.body.rawText || '',
      aiSummary: req.body.aiSummary || generateAISummary(req.body, req.body.rawText),
      createdAt: new Date().toISOString()
    };

    db.events.unshift(newEvent); // put at top
    writeLocalDb(db);

    res.status(201).json(newEvent);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ error: 'Failed to create event', details: err.message });
  }
});

// POST /api/events/:id/rsvp - RSVP to event
app.post('/api/events/:id/rsvp', (req, res) => {
  const db = readLocalDb();
  const event = db.events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  event.rsvps = (event.rsvps || 0) + 1;
  writeLocalDb(db);
  res.json({ success: true, rsvps: event.rsvps, message: 'RSVP confirmed!' });
});

// DELETE /api/events/:id - Delete an event
app.delete('/api/events/:id', (req, res) => {
  const db = readLocalDb();
  const index = db.events.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }
  db.events.splice(index, 1);
  writeLocalDb(db);
  res.json({ success: true, message: 'Event deleted successfully' });
});

// POST /api/parse-event - THE SMART INPUT EXTRACTOR
// Parses unordered WhatsApp message or poster text into organized event card fields!
app.post('/api/parse-event', (req, res) => {
  try {
    const { rawText } = req.body;
    if (!rawText || !rawText.trim()) {
      return res.status(400).json({ error: 'Please provide WhatsApp message or announcement text.' });
    }

    const parsedEvent = parseWhatsAppMessage(rawText);
    res.json({
      success: true,
      data: parsedEvent
    });
  } catch (err) {
    console.error('Smart parsing failed:', err);
    res.status(400).json({ error: err.message || 'Failed to parse announcement' });
  }
});

// POST /api/ai-summary - AI Summary generator
app.post('/api/ai-summary', (req, res) => {
  try {
    const { event, rawText } = req.body;
    if (!event) {
      return res.status(400).json({ error: 'Event object required' });
    }
    const summary = generateAISummary(event, rawText || event.rawText || '');
    res.json({ success: true, summary });
  } catch (err) {
    console.error('AI summary failed:', err);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

// POST /api/ai-chat - Campus Pulse AI Chatbot responses
app.post('/api/ai-chat', (req, res) => {
  const { message } = req.body;
  const q = (message || '').toLowerCase();
  const db = readLocalDb();

  let response = '';

  if (q.includes('mit css') || q.includes('css') || q.includes('codestorm') || q.includes('coding')) {
    response = `🚀 **MIT CSS (Computer Science Society)** is hosting **CodeStorm 2026** on Nov 14-15! It is a 24-hr national hackathon with ₹75,000 in cash prizes, free food, and internship fast-tracks at MIT Main Auditorium.`;
  } else if (q.includes('cyber') || q.includes('ctf') || q.includes('security') || q.includes('mit cyber')) {
    response = `🛡️ **MIT CYBER SECURITY** has organized the **Zero-Day Shield: Live CTF & Ethical Hacking Bootcamp** on Nov 18, 2026 (2:00 PM - 6:00 PM) at Cyber Forensics Lab (Room 402). Bring your laptops for hands-on Wireshark & BurpSuite training!`;
  } else if (q.includes('ai') || q.includes('aimlss') || q.includes('machine learning') || q.includes('genai')) {
    response = `🧠 **MIT AIMLSS (AI & Machine Learning Student Society)** is hosting **Neural Nexus: Hands-on Generative AI & LLM Fine-Tuning** on Nov 21, 2026 at Seminar Hall B with free GPU compute credits and certificates!`;
  } else if (q.includes('tech club') || q.includes('robotics') || q.includes('robocraze')) {
    response = `🤖 **MIT TECH CLUB** is bringing **RoboCraze 2026** on Nov 26! Autonomous line-follower and combat bot races with ₹30,000 cash prize at Central Tech Arena.`;
  } else if (q.includes('debate') || q.includes('literacy') || q.includes('vichaar') || q.includes('mun')) {
    response = `🎙️ **MIT LITERACY SOCIETY** is holding **Vichaar 2026: All India Parliamentary Debate** on Nov 29, 2026. Asian Parliamentary 3v3 format with cash awards for Best Speaker and Best Team.`;
  } else if (q.includes('aditi') || q.includes('aarambh') || q.includes('du')) {
    response = `🌸 **Aditi Mahavidyalaya (DU)** is hosting **Aarambh 2026 Cultural Fest** on Dec 3-4, 2026, featuring street plays, fashion shows, and celebrity night. Free entry with college ID!`;
  } else if (q.includes('smart input') || q.includes('whatsapp') || q.includes('poster')) {
    response = `⚡ **Campus Pulse Smart Input** allows anyone to paste a messy WhatsApp forward or poster text. Our parser automatically extracts the **Conducting Society, Event Title, Date, Time, and Venue** and creates a beautiful event card in 1-click! Click the **⚡ Smart Input** button in the top bar to try it.`;
  } else {
    response = `👋 Hello! I am the **Campus Pulse AI Assistant** (powered by your AI chatbot integration). You can ask me about upcoming hackathons, college societies (like MIT CSS, MIT TECH CLUB, MIT AIMLSS, MIT CYBER SECURITY, MIT LITERACY SOCIETY), registration links, venues, or use the **Smart Input** feature to paste raw WhatsApp event announcements!`;
  }

  res.json({ reply: response });
});

// Serve client static files if production build exists
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    // Only forward non-api requests to index.html
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
  console.log('⚡ Serving compiled client build from:', clientDistPath);
}

// Start server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Campus Pulse Backend Server running on http://localhost:${PORT}`);
  console.log(`⚡ Smart WhatsApp Parser ready for MIT & Campus Societies`);
  console.log(`🌐 Replica of Acadamex Campus Visitor with AI enhancements`);
  console.log(`======================================================\n`);
});
