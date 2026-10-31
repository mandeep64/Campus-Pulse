// server/data/seedData.js

const seedEvents = [
  {
    id: 'evt-1',
    title: 'INFINITYHACKS BY HACKERRANK',
    society: 'MIT CSS',
    societyFullName: 'Computer Science Society (MIT CSS)',
    category: 'HACKATHON',
    mode: 'ONLINE',
    date: 'AUG 5, 2026',
    time: 'To Be Announced',
    venue: 'ONLINE',
    description: 'Register and win exciting prizessss !! HACKERRANK InfinityHacks global hackathon.',
    college: 'ALL UNI',
    university: 'ALL',
    postedAgo: '92D AGO',
    registrationLink: 'https://hackerrank.com/infinityhacks',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60',
    tags: ['ONLINE', 'HACKATHON', 'PRIZES'],
    rsvps: 142,
    aiSummary: {
      tldr: 'Official global hackathon by HackerRank in collaboration with MIT CSS featuring algorithmic problems and software design tracks.',
      highlights: [
        '🏆 Verified certificate and interview opportunities with partner firms.',
        '💻 Entirely online with 24-hr coding rounds.',
        '🎁 HackerRank swags and credits for participants.'
      ],
      actionItem: 'Form teams up to 4 members. Register online before August.'
    },
    rawText: 'INFINITYHACKS BY HACKERRANK. Global online hackathon. Date: AUG 5, 2026. Online venue. Register now.'
  },
  {
    id: 'evt-2',
    title: 'YOGA 21 DAYS CHALLENGE',
    society: 'Campus Health Council',
    societyFullName: 'Campus Wellness & Health Society',
    category: 'OTHERS',
    mode: 'ONLINE',
    date: '2026-06-17',
    time: '06:30 AM - 07:30 AM',
    venue: 'ONLINE',
    description: '*⚡ FREE EXCITING REWARDS AWAIT!* 🎁 Rewards Include: Exclusive T-Shirts, Premium Sipper Bottles & Certificate of Completion.',
    college: 'ALL UNI',
    university: 'ALL',
    postedAgo: '96D AGO',
    registrationLink: 'https://campuspulse.xyz/yoga',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop&q=60',
    tags: ['ONLINE', 'WELLNESS', 'REWARDS'],
    rsvps: 98,
    aiSummary: {
      tldr: '21-day guided online morning wellness and mindfulness journey for college students.',
      highlights: [
        '🧘 Daily 1-hour live guided yoga and posture sessions.',
        '👕 Free exclusive T-shirts and sippers for students completing 18+ days.',
        '📜 University authorized participation certificate.'
      ],
      actionItem: 'Join the morning Zoom/Meet link daily at 6:30 AM.'
    },
    rawText: 'YOGA 21 DAYS CHALLENGE. Date: 2026-06-17. Online morning sessions. Free rewards include T-shirts and sippers.'
  },
  {
    id: 'evt-3',
    title: '*BECOME A HACKERRANK INFINITY HACKS CAMPUS AMBASSADOR!* 💚',
    society: 'MIT CSS',
    societyFullName: 'Computer Science Society (MIT CSS)',
    category: 'OTHERS',
    mode: 'ONLINE',
    date: '2026-07-16',
    time: 'Flexible',
    venue: 'ONLINE',
    description: '★ Become a HackerRank Infinity Hacks Campus Ambassador! Ready to represent HackerRank at your campus and lead developer communities?',
    college: 'ALL UNI',
    university: 'ALL',
    postedAgo: '95D AGO',
    registrationLink: 'https://hackerrank.com/campus-ambassador',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=60',
    tags: ['LEADERSHIP', 'STIPEND', 'COMMUNITY'],
    rsvps: 210,
    aiSummary: {
      tldr: 'Campus ambassador drive by HackerRank and MIT CSS to represent coding leagues and community hackathons.',
      highlights: [
        '🌟 Lead technical bootcamps on your campus.',
        '👕 Exclusive HackerRank hoodies and developer goodies.',
        '🚀 Recommendation letters and leadership experience.'
      ],
      actionItem: 'Submit your resume and community outreach statement.'
    },
    rawText: 'Become a HackerRank Infinity Hacks Campus Ambassador! Date: 2026-07-16. Represent your college.'
  },
  {
    id: 'evt-4',
    title: 'AGENTX: THE AI QUIZ IS A NATIONAL-LEVEL ONLINE AI QUIZ',
    society: 'MIT AIMLSS',
    societyFullName: 'AI & Machine Learning Student Society (MIT AIMLSS)',
    category: 'COMPETITION',
    mode: 'ONLINE',
    date: 'To Be Announced',
    time: '04:00 PM',
    venue: 'ONLINE',
    description: 'National level online Artificial Intelligence, Machine Learning, and LLM quiz contest. Test your neural network fundamentals and win cash vouchers!',
    college: 'ALL UNI',
    university: 'ALL',
    postedAgo: '90D AGO',
    registrationLink: 'https://agentx.ai/quiz',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&auto=format&fit=crop&q=60',
    tags: ['AI & ML', 'QUIZ', 'CASH PRIZES'],
    rsvps: 180,
    aiSummary: {
      tldr: 'National online AI quiz testing fundamentals of Deep Learning, GenAI, and Python data science.',
      highlights: [
        '🧠 Rapid-fire MCQs on ML algorithms, PyTorch, and NLP.',
        '💰 Cash prize pool of ₹25,000 for top 3 rank holders.',
        '📜 E-certificates for all qualifying participants.'
      ],
      actionItem: 'Online assessment portal link will be shared 24h prior.'
    },
    rawText: 'AGENTX: THE AI QUIZ. National-level online AI quiz conducted by MIT AIMLSS. Online venue.'
  },
  {
    id: 'evt-5',
    title: 'ZERO-DAY SHIELD: ETHICAL HACKING & CTF BOOTCAMP',
    society: 'MIT CYBER SECURITY',
    societyFullName: 'MIT Cyber Security & Ethical Hacking Cell',
    category: 'CYBER SECURITY',
    mode: 'CAMPUS',
    date: '2026-11-18',
    time: '02:30 PM - 06:00 PM',
    venue: 'Seminar Hall B (Tech Block)',
    description: 'Hands-on network penetration testing, Wireshark packet capture, BurpSuite web exploitation, and 2-hour competitive CTF challenge. Bring your laptops!',
    college: 'MIT CAMPUS',
    university: 'MIT World Peace University',
    postedAgo: '1D AGO',
    registrationLink: 'https://mitcyber.sec/rsvp',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop&q=60',
    tags: ['HANDS-ON', 'CTF', 'KALI LINUX'],
    rsvps: 74,
    aiSummary: {
      tldr: 'Practical cybersecurity workshop and live CTF challenge organized by MIT CYBER SECURITY.',
      highlights: [
        '🛡️ Wireshark packet inspection and BurpSuite exploitation.',
        '💻 Live Capture The Flag battle with trophies for winners.',
        '📜 Attendance duty leave / OD provided.'
      ],
      actionItem: 'Bring a personal laptop with Kali Linux or VirtualBox.'
    },
    rawText: 'MIT CYBER SECURITY workshop will happen at Seminar Hall B on Friday, 18 Nov at 2:30 PM. Hands on ethical hacking, Wireshark, bug bounty basics.'
  },
  {
    id: 'evt-6',
    title: 'ROBOCRAZE 2026: AUTONOMOUS LINE-FOLLOWER BATTLE',
    society: 'MIT TECH CLUB',
    societyFullName: 'MIT Technical & Robotics Club',
    category: 'COMPETITION',
    mode: 'CAMPUS',
    date: '2026-11-26',
    time: '09:30 AM - 04:30 PM',
    venue: 'Central Tech Arena & Innovation Quad',
    description: 'High-speed autonomous line-follower and RC battle bot clash! Race through tight chicanes and obstacle courses to claim the grand robotics trophy.',
    college: 'MIT CAMPUS',
    university: 'MIT World Peace University',
    postedAgo: '3D AGO',
    registrationLink: 'https://mittechclub.in/robocraze',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=60',
    tags: ['ROBOTICS', 'HARDWARE', 'CASH PRIZE ₹30K'],
    rsvps: 88,
    aiSummary: {
      tldr: 'Autonomous robotics and line follower speed championship conducted by MIT TECH CLUB.',
      highlights: [
        '🤖 Line follower, obstacle avoider, and sumo-bot rings.',
        '💰 ₹30,000 cash prize pool and hardware developer shields.',
        '🍕 Free snacks and beverages for all participating crews.'
      ],
      actionItem: 'Teams of 1-4 members. Technical inspection at 9:00 AM.'
    },
    rawText: 'MIT TECH CLUB brings you RoboCraze 2026! Date: 26th Nov 2026, Venue: Central Tech Arena & Innovation Quad, Time: 09:30 AM.'
  },
  {
    id: 'evt-7',
    title: 'VICHAAR 2026: ASIAN PARLIAMENTARY DEBATE',
    society: 'MIT LITERACY SOCIETY',
    societyFullName: 'MIT Literary & Debating Society',
    category: 'LITERARY',
    mode: 'CAMPUS',
    date: '2026-11-29',
    time: '09:00 AM - 05:00 PM',
    venue: 'Auditorium Block - Humanities Hall 1',
    description: 'Flagship 3v3 Asian Parliamentary Debate tournament. Clash with top debating contingents across universities on geopolitical motions and campus ethics.',
    college: 'MIT CAMPUS',
    university: 'MIT World Peace University',
    postedAgo: '4D AGO',
    registrationLink: 'https://mitliterary.org/vichaar',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&auto=format&fit=crop&q=60',
    tags: ['DEBATE', 'BEST SPEAKER', 'CASH AWARDS'],
    rsvps: 64,
    aiSummary: {
      tldr: 'National 3v3 Asian Parliamentary Debate championship hosted by MIT LITERACY SOCIETY.',
      highlights: [
        '🎙️ 3 debaters + 1 institutional adjudicator format.',
        '🏆 Cash awards for Best Team, Best Speaker, and Best Novice.',
        '☕ High tea and lunch passes included for debaters.'
      ],
      actionItem: 'Institutional slots capped at 32 teams. Register online.'
    },
    rawText: 'Vichaar 2026 - Annual Parliamentary Debate hosted by MIT LITERACY SOCIETY. Venue: Auditorium Block Humanities Hall 1. Time: 09:00 AM. Date: 29 Nov.'
  },
  {
    id: 'evt-8',
    title: 'AARAMBH 2026: ANNUAL YOUTH & CULTURAL EXTRAVAGANZA',
    society: 'Aditi Cultural Society',
    societyFullName: 'Cultural Council of Aditi Mahavidyalaya (DU)',
    category: 'FEST',
    mode: 'CAMPUS',
    date: '2026-12-03',
    time: '10:00 AM - 05:00 PM',
    venue: 'Aditi Mahavidyalaya Main Campus Grounds, DU',
    description: '2-day mega cultural festival featuring Street Play (Nukkad Natak), Western Dance, Battle of the Bands, Fashion Show, and Live Celebrity DJ Night!',
    college: 'ADITI MAHAVIDYALAYA (AM)',
    university: 'Delhi University (DU)',
    postedAgo: '5D AGO',
    registrationLink: 'https://aditi.du.ac.in/aarambh2026',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60',
    tags: ['DU FEST', 'MUSIC', 'FREE ENTRY WITH ID'],
    rsvps: 420,
    aiSummary: {
      tldr: 'Premier cultural fest of Aditi Mahavidyalaya (DU) with stage performances, competitions, and artist concert.',
      highlights: [
        '🎭 Nukkad Natak, Western Group Dance, and Music battles.',
        '🎟️ Free entry for all students with valid College ID card.',
        '🌟 Star celebrity DJ night on Day 2.'
      ],
      actionItem: 'Carry physical college student identity card for campus entry.'
    },
    rawText: 'Aditi Cultural Society invites you to AARAMBH 2026 on Dec 03-04 at Aditi Mahavidyalaya Campus Grounds, DU. Free entry with ID.'
  }
];

const seedMarketplace = [
  {
    id: 'mkt-1',
    title: 'DRAFTER AND SHEET HOLDER',
    category: 'STATIONERY & INSTRUMENTS',
    price: 430,
    currency: '₹',
    college: 'VIPS',
    imagesCount: 2,
    timedOut: false,
    image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=400&auto=format&fit=crop&q=60',
    description: 'Engineering drafter in top condition with padded waterproof sheet holder.',
    seller: 'Kavita M. (VIPS B.Tech 2nd Year)'
  },
  {
    id: 'mkt-2',
    title: 'BLUE APRON',
    category: 'LAB COATS & APRONS',
    price: 150,
    currency: '₹',
    college: 'VIPS',
    imagesCount: 2,
    timedOut: false,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60',
    description: 'Cotton chemistry lab apron, clean and stainless, size M.',
    seller: 'Rahul T. (Chemistry 1st Year)'
  },
  {
    id: 'mkt-3',
    title: 'SHEET HOLDER AND MINI DRAFTER',
    category: 'STATIONERY & INSTRUMENTS',
    price: 400,
    currency: '₹',
    college: 'VIPS',
    imagesCount: 2,
    timedOut: false,
    image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=400&auto=format&fit=crop&q=60',
    description: 'Complete ED kit with mini drafter and cylinder tube container.',
    seller: 'Siddharth (VIPS)'
  },
  {
    id: 'mkt-4',
    title: 'DRAFTER AND SHEET HOLDER',
    category: 'STATIONERY & INSTRUMENTS',
    price: 450,
    currency: '₹',
    college: 'VIPS',
    imagesCount: 2,
    timedOut: true,
    image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=400&auto=format&fit=crop&q=60',
    description: 'Used for one semester only, includes protractor and scale.',
    seller: 'Aman G.'
  },
  {
    id: 'mkt-5',
    title: 'WHITE LAB COAT (SIZE L)',
    category: 'LAB COATS & APRONS',
    price: 180,
    currency: '₹',
    college: 'ADITI MAHAVIDYALAYA (AM)',
    imagesCount: 2,
    timedOut: false,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60',
    description: 'Standard white chemistry/biology lab coat for practical exams.',
    seller: 'Pooja (AM DU)'
  },
  {
    id: 'mkt-6',
    title: 'CALCULATOR CASIO FX-991EX CLASSWIZ',
    category: 'STATIONERY & INSTRUMENTS',
    price: 850,
    currency: '₹',
    college: 'MIT CAMPUS',
    imagesCount: 3,
    timedOut: false,
    image: 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e485?w=400&auto=format&fit=crop&q=60',
    description: 'Original scientific calculator with solar panel, approved for university exams.',
    seller: 'Rohan P. (MIT CS)'
  }
];

module.exports = {
  seedEvents,
  seedMarketplace
};
