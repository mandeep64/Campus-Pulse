// server/utils/smartParser.js
// Intelligent parser to extract structured Event data from messy WhatsApp group messages, announcements, or posters

const KNOWN_SOCIETIES = [
  {
    name: 'MIT CSS',
    fullName: 'Computer Science Society (MIT CSS)',
    category: 'Coding & Tech',
    color: '#3B82F6', // Blue
    keywords: ['mit css', 'css', 'computer science society', 'cs society', 'mit-css', 'coding club']
  },
  {
    name: 'MIT TECH CLUB',
    fullName: 'MIT Technical Club',
    category: 'Robotics & Hardware',
    color: '#10B981', // Emerald
    keywords: ['mit tech club', 'tech club', 'mit technical club', 'robotics club', 'technical society']
  },
  {
    name: 'MIT LITERACY SOCIETY',
    fullName: 'MIT Literary & Debating Society',
    category: 'Literary & Debating',
    color: '#8B5CF6', // Purple
    keywords: ['mit literacy society', 'mit literary society', 'literacy society', 'literary society', 'debate club', 'mun', 'debsoc']
  },
  {
    name: 'MIT AIMLSS',
    fullName: 'AI & Machine Learning Student Society',
    category: 'AI & Data Science',
    color: '#EC4899', // Pink
    keywords: ['mit aimlss', 'aimlss', 'ai ml society', 'aiml society', 'artificial intelligence society', 'mit ai']
  },
  {
    name: 'MIT CYBER SECURITY',
    fullName: 'MIT Cyber Security & Ethical Hacking Cell',
    category: 'Cyber Security & InfoSec',
    color: '#F59E0B', // Amber
    keywords: ['mit cyber security', 'cyber security', 'infosec', 'cyber cell', 'ethical hacking', 'mit cyber']
  }
];

/**
 * Clean markdown / whatsapp formatting
 */
function cleanText(str) {
  if (!str) return '';
  return str.replace(/[*_~`]/g, '').trim();
}

/**
 * Detect Society from text
 */
function extractSociety(rawText) {
  const lower = rawText.toLowerCase();

  // 1. Exact or keyword match against known societies
  for (const soc of KNOWN_SOCIETIES) {
    for (const kw of soc.keywords) {
      const regex = new RegExp(`\\b${kw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
      if (regex.test(lower)) {
        return {
          name: soc.name,
          fullName: soc.fullName,
          category: soc.category,
          color: soc.color,
          isKnown: true
        };
      }
    }
  }

  // 2. Pattern based detection: "Organized by [Society Name]", "[Name] presents", "[Name] society"
  const patterns = [
    /(?:organized|conducted|brought to you|hosted)\s+by\s*[:\-]?\s*([A-Za-z0-9&.\s]{3,35}?)(?:\n|\.|,|\s+in\s+association|\s+presents)/i,
    /([A-Z0-9&.\s]{3,30}\s+(?:SOCIETY|CLUB|CELL|CHAPTER|COMMITTEE))\s+(?:presents|announces|invites)/i,
    /\*([A-Z0-9&.\s]{3,30}\s+(?:SOCIETY|CLUB|CELL))\*/i
  ];

  for (const pat of patterns) {
    const match = rawText.match(pat);
    if (match && match[1]) {
      const detected = cleanText(match[1]).trim();
      if (detected.length >= 3 && !/^(the|all|our|an|a)$/i.test(detected)) {
        return {
          name: detected.toUpperCase(),
          fullName: detected,
          category: 'General Campus Society',
          color: '#6366F1',
          isKnown: false
        };
      }
    }
  }

  // Fallback default
  return {
    name: 'MIT TECH CLUB',
    fullName: 'MIT Technical Club',
    category: 'General Campus Society',
    color: '#10B981',
    isKnown: false,
    guessed: true
  };
}

/**
 * Extract Event Title
 */
function extractTitle(rawText, detectedSociety) {
  // If text has quotes like "Zero-Day Shield" or "AI Odyssey"
  const quoteMatch = rawText.match(/["']([^"'\n]{4,55})["']/);
  if (quoteMatch && quoteMatch[1]) {
    const qTitle = cleanText(quoteMatch[1]);
    if (!qTitle.toLowerCase().includes(detectedSociety.name.toLowerCase())) {
      return qTitle;
    }
  }

  // Pattern 1: Text after "presents", "announces", "bringing you", "hosts"
  const presentsMatch = rawText.match(/(?:presents|announces|bringing you|hosts)[:\s*]*["'*]?([A-Za-z0-9\s:!'-]{4,60}?)["'*]?(?:\n|!|\.|\b(?:date|venue|time|on\b))/i);
  if (presentsMatch && presentsMatch[1]) {
    const cleaned = cleanText(presentsMatch[1]);
    if (cleaned.length > 3 && !/^(date|time|venue|an|a|the)/i.test(cleaned)) {
      return cleaned;
    }
  }

  // Pattern 2: Bold header line e.g. *CODE-WARS 2026* or *AI ODYSSEY*
  const lines = rawText
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l.length > 0);

  for (const line of lines.slice(0, 5)) {
    const boldMatch = line.match(/^\*([^*]{4,50})\*$/);
    if (boldMatch) {
      const title = cleanText(boldMatch[1]);
      if (!title.toLowerCase().includes(detectedSociety.name.toLowerCase())) {
        return title;
      }
    }
  }

  // Pattern 3: Inline title like "Cyber Security workshop", "Ethical Hacking Bootcamp", "24-hr Hackathon"
  const inlineMatch = rawText.match(/([A-Z0-9][A-Za-z0-9\s\-]{2,30}?\s+(?:Workshop|Bootcamp|Hackathon|Debate|Masterclass|Summit|Competition|Orientation|Fest))\b/i);
  if (inlineMatch && inlineMatch[1]) {
    const candidate = cleanText(inlineMatch[1]);
    if (!/^(urgent|attention|announcement|notice|all\s+students)/i.test(candidate)) {
      return candidate;
    }
  }

  // Pattern 4: Look for non-announcement lines with event keywords
  for (const line of lines) {
    const cleaned = cleanText(line);
    if (!/^(urgent|attention|announcement|notice|hello|hey|dear)/i.test(cleaned)) {
      if (/(hackathon|workshop|bootcamp|debate|symposium|summit|conference|session|quiz|webinar|challenge|hunt|fest)/i.test(cleaned)) {
        if (cleaned.length <= 60 && !/(venue|date|time|register|link)/i.test(cleaned)) {
          return cleaned;
        }
      }
    }
  }

  // Fallback: First meaningful line that isn't a generic alert
  for (const line of lines) {
    const cleaned = cleanText(line);
    if (!/^(urgent|attention|announcement|notice|hello|hey|dear)/i.test(cleaned) && cleaned.length >= 5) {
      return cleaned.length <= 50 ? cleaned : cleaned.substring(0, 47) + '...';
    }
  }

  return `${detectedSociety.name} Campus Event`;
}

/**
 * Extract Event Date
 */
function extractDate(rawText) {
  // Matches e.g.:
  // 12th Nov 2026, 12 November 2026, 12/11/2026, 12-11-2026, Friday, 18 Nov, Nov 15th
  const datePatterns = [
    /(?:date|when|on\s+date|day\s*&?\s*date)\s*[:\-]?\s*([A-Za-z0-9,\s\/\-]{4,35})/i,
    /(\b\d{1,2}(?:st|nd|rd|th)?\s+(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)(?:\s*,?\s*\d{2,4})?)/i,
    /((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}(?:st|nd|rd|th)?(?:\s*,?\s*\d{2,4})?)/i,
    /(\b\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}\b)/,
    /((?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)[,\s]+\d{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+)/i
  ];

  for (const pat of datePatterns) {
    const match = rawText.match(pat);
    if (match && match[1]) {
      const candidate = cleanText(match[1]).split('\n')[0].replace(/[,.\s]+$/, '').trim();
      if (candidate.length >= 4 && candidate.length <= 35) {
        return candidate;
      }
    }
  }

  // Fallback: Default upcoming date in current semester
  return 'Upcoming (Date TBA)';
}

/**
 * Extract Event Time
 */
function extractTime(rawText) {
  // Matches e.g.:
  // 10:00 AM onwards, 10:00 AM - 4:00 PM, 2:30 PM, 11:00 AM to 3:00 PM, 10 AM, 9:00 AM - 5:00 PM
  const timePatterns = [
    /(?:time|timing|timings|when)\s*[:\-]?\s*([0-9:AMPamp\s\-toONWARDSonwards]+)/i,
    /(\b\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)\s*(?:-|–|to)\s*\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)\b)/i,
    /(\b\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)\s*(?:onwards|sharp)?\b)/i,
    /(\b\d{1,2}\s*(?:AM|PM|am|pm)\b)/i
  ];

  for (const pat of timePatterns) {
    const match = rawText.match(pat);
    if (match && match[1]) {
      const candidate = cleanText(match[1]).split('\n')[0].replace(/[,.\s]+$/, '').trim();
      if (candidate.length >= 3 && candidate.length <= 30 && !/^(date|venue)/i.test(candidate)) {
        return candidate;
      }
    }
  }

  return '10:00 AM onwards';
}

/**
 * Extract Event Venue
 */
function extractVenue(rawText) {
  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  // 1. Look for explicit Venue / Location / 📍 line
  for (const line of lines) {
    const venuePrefixMatch = line.match(/^(?:📍\s*)?(?:venue|location|where|held\s+at)\s*[:\-]?\s*(.+)$/i);
    if (venuePrefixMatch && venuePrefixMatch[1]) {
      const v = cleanText(venuePrefixMatch[1]);
      if (v.length >= 3) return v;
    }
  }

  // 2. Look for lines containing "Auditorium", "Lab", "Seminar Hall", "Room", etc.
  for (const line of lines) {
    if (/(?:auditorium|seminar hall|audi\b|computing lab|tech block|humanities hall|open grounds|room\s*\d+|lab\s*\d+)/i.test(line)) {
      // Don't pick lines that are titles or dates
      if (!/^(date|time|presents|register|http)/i.test(line)) {
        const cleaned = cleanText(line).replace(/^(?:at|venue|location)\s*[:\-]?\s*/i, '');
        if (cleaned.length >= 3 && cleaned.length <= 60 && !cleaned.toLowerCase().includes('urgent')) return cleaned;
      }
    }
  }

  // 2b. Inline match for "at/in [Venue]" e.g. "at Seminar Hall B", "in Lab 304", "at MIT Main Audi"
  const inlineVenueMatch = rawText.match(/\b(?:at|in)\s+([A-Za-z0-9\s\-]{3,30}?(?:Auditorium|Seminar Hall|Audi|Lab\s*\d*|Hall\s*[A-Z0-9]*|Room\s*\d*|Grounds|Campus Block))/i);
  if (inlineVenueMatch && inlineVenueMatch[1]) {
    const candidate = cleanText(inlineVenueMatch[1]).trim();
    if (candidate.length >= 3) return candidate;
  }

  // 3. Regex match with word boundary
  const venueRegex = /\b(?:venue|location|place|held\s+at)\s*[:\-]?\s*([A-Za-z0-9,\s\-&#'\/\.]{3,50})/i;
  const match = rawText.match(venueRegex);
  if (match && match[1]) {
    const candidate = cleanText(match[1]).split('\n')[0].replace(/[,.\s]+$/, '').trim();
    if (candidate.length >= 3 && !/^(date|time|when|free|register)/i.test(candidate)) {
      return candidate;
    }
  }

  // 4. Online venues
  if (/google\s*meet|zoom|teams|online|discord/i.test(rawText)) {
    if (/google\s*meet/i.test(rawText)) return 'Google Meet (Virtual)';
    if (/zoom/i.test(rawText)) return 'Zoom Meeting (Virtual)';
    if (/discord/i.test(rawText)) return 'Discord Stage';
    return 'Online / Virtual Platform';
  }

  return 'MIT Campus (Main Auditorium / Lab)';
}

/**
 * Extract Links and Contact
 */
function extractMetadata(rawText) {
  // URLs
  const urlMatch = rawText.match(/https?:\/\/[^\s"'<>]+/i) || rawText.match(/bit\.ly\/[^\s"'<>]+/i);
  const regLink = urlMatch ? (urlMatch[0].startsWith('http') ? urlMatch[0] : `https://${urlMatch[0]}`) : 'https://campuspulse.edu/register';

  // Contact
  const phoneMatch = rawText.match(/(?:\+91[\-\s]?)?[6-9]\d{9}/);
  const contact = phoneMatch ? `Core Team (${phoneMatch[0]})` : 'Society Core Team';

  // Tags detection
  const tags = [];
  const lower = rawText.toLowerCase();

  if (/\b(?:free|no registration fee|zero fee)\b/i.test(lower)) tags.push('Free Entry');
  if (/certificate/i.test(lower)) tags.push('Certificates');
  if (/(?:refreshment|refreshments|food|snacks|pizza|lunch)\b/i.test(lower)) tags.push('Free Refreshments');
  if (/(?:prize|prizes|cash|swag|swags|goodies|t-shirt)\b/i.test(lower)) tags.push('Exciting Prizes');
  if (/\b(?:od|attendance|duty leave)\b/i.test(lower)) tags.push('Duty Leave / OD');
  if (/(?:laptop|hands-on|hands on|coding)\b/i.test(lower)) tags.push('Hands-on Session');
  if (/(?:internship|interview|hiring)\b/i.test(lower)) tags.push('Internship Fast-Track');

  if (tags.length === 0) tags.push('Open for All', 'Certificates');

  // Category determination
  let category = 'Technical';
  if (/hackathon|hack\b|code-wars/i.test(lower)) category = 'Hackathon';
  else if (/bootcamp|workshop|masterclass|hands-on session/i.test(lower)) category = 'Workshop';
  else if (/debate|literary|poetry|mun\b|quiz|slam/i.test(lower)) category = 'Literary & Cultural';
  else if (/cyber|security|hacking|ctf|wireshark|infosec/i.test(lower)) category = 'Cyber Security';
  else if (/ai\b|ml\b|machine learning|deep learning|genai|llm/i.test(lower)) category = 'AI & Data Science';
  else if (/robot|arduino|iot|hardware|drone/i.test(lower)) category = 'Robotics & Hardware';
  else if (/recruitment|audition|join us|orientation/i.test(lower)) category = 'Recruitment';
  else if (/fest|cultural|aarambh/i.test(lower)) category = 'Fest';

  return { regLink, contact, tags, category };
}

/**
 * Generate AI Summary for the event
 */
function generateAISummary(eventData, rawText = '') {
  const { society, title, date, time, venue, category, tags = [] } = eventData;
  const perks = tags.length > 0 ? tags.join(', ') : 'Certificate of participation';

  return {
    tldr: `Official ${category} event organized by ${society}: "${title}" on ${date} at ${time}.`,
    highlights: [
      `🎯 **Event Focus**: Practical, high-impact ${category.toLowerCase()} session conducted by the ${society} student council.`,
      `📍 **Location & Timing**: In-person at ${venue}, scheduled for ${date} (${time}).`,
      `🎁 **Perks & Goodies**: ${perks} provided to all eligible registered participants.`,
      `⚡ **Who Should Attend**: All college students interested in ${category} looking to network and build verified portfolio credentials.`
    ],
    actionItem: 'Limited seats available. Confirm your RSVP via the registration link before slots close!'
  };
}

/**
 * Main parse function
 */
function parseWhatsAppMessage(rawText) {
  if (!rawText || typeof rawText !== 'string' || rawText.trim().length === 0) {
    throw new Error('Please provide an announcement text or WhatsApp message.');
  }

  const societyObj = extractSociety(rawText);
  const title = extractTitle(rawText, societyObj);
  const date = extractDate(rawText);
  const time = extractTime(rawText);
  const venue = extractVenue(rawText);
  const meta = extractMetadata(rawText);

  const eventData = {
    society: societyObj.name,
    societyFullName: societyObj.fullName,
    societyCategory: societyObj.category,
    societyColor: societyObj.color,
    title,
    date,
    time,
    venue,
    category: meta.category,
    registrationLink: meta.regLink,
    contact: meta.contact,
    tags: meta.tags,
    rawText: rawText.trim(),
    college: 'MIT Pune / MIT Campus',
    university: 'MIT World Peace University',
    status: 'Upcoming',
    capacity: 120,
    rsvps: 28
  };

  const aiSummary = generateAISummary(eventData, rawText);
  eventData.aiSummary = aiSummary;

  return eventData;
}

module.exports = {
  KNOWN_SOCIETIES,
  parseWhatsAppMessage,
  generateAISummary
};
