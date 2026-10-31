<<<<<<< HEAD
# ⚡ Campus Pulse (MERN Stack)

**Campus Pulse** is a modernized, enhanced replica of the **Acadamex Campus Visitor** dashboard (`acadamex.xyz`), built with the full **MERN stack** (MongoDB, Express, React, Node.js).

Designed for university students and college society leads, Campus Pulse brings real-time event discovery, society coordination, intelligent WhatsApp announcement parsing, and an integrated AI assistant.

---

## 🌟 Key Features

### 1. 🏛️ Campus Visitor Dashboard (Acadamex Replica)
- **University & College URL Syncing**: Supports direct filtered routes such as `?univ=ALL&college=aditi-mahavidyalaya-am` or `?univ=MIT+World+Peace+University&college=mit-campus`.
- **College Societies Spotlight**: Instant filtering for premier campus societies:
  - 💻 **MIT CSS** (*Computer Science Society*)
  - 🤖 **MIT TECH CLUB** (*Technical & Robotics Club*)
  - 🎙️ **MIT LITERACY SOCIETY** (*Literary & Debating Society*)
  - 🧠 **MIT AIMLSS** (*AI & Machine Learning Student Society*)
  - 🛡️ **MIT CYBER SECURITY** (*Cyber Forensics & Ethical Hacking Cell*)
  - 🌸 **Aditi Cultural Society** (*Aditi Mahavidyalaya - DU*)
- **Event Discovery Feed**: Categorized by Hackathons, Workshops, Cyber Security, AI, Debates, and Fests with live RSVP counts.

### 2. ⚡ Smart Input: WhatsApp / Poster Event Extractor
- Paste messy, unorganized WhatsApp forwards, group messages, or event posters.
- Intelligent extraction engine extracts:
  1. **College Society** (Identifies conducting society like MIT CSS, MIT TECH CLUB, MIT AIMLSS, etc.)
  2. **Event Title Name**
  3. **Date**
  4. **Time**
  5. **Venue / Location**
  6. **Category & Registration Link**
  7. **Perks & Tags** (Free Food, OD/Attendance, Certificates, Cash Prizes)
- **Interactive Two-Column Editor**: Review and adjust parsed fields on the left with a live event card preview on the right.
- **1-Click Publishing**: Posts directly to the backend database and updates the live campus feed in real time.

### 3. ✨ AI Summary (TL;DR)
- Every event card features an **AI Summary** button.
- Generates an instant executive summary, core highlights, prerequisites, and a 1-click **"Copy for WhatsApp"** button.

### 4. 🤖 AI Chatbot Widget (Integrated with your Vercel Chatbot)
- Floating **Campus AI** widget at the bottom right with a pulsing notification indicator.
- Directly opens or links to **https://ai-chat-bot-five-beta.vercel.app/**.
- Built-in campus assistant for instant answers on hackathon guidelines, society info, venue directions, and Smart Input tips.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React Icons
- **Backend**: Node.js, Express.js, REST API
- **Database**: MongoDB with Mongoose Schema (`models/Event.js`), plus an automated resilient file-storage fallback (`localDb.json`) so the project boots up immediately without requiring a local MongoDB daemon.

---

## 🚀 How to Run

### Step 1: Install Dependencies
From the root directory:
```bash
npm run install:all
```

### Step 2: Start Development Server
To run both backend API (Port 5000) and frontend with Vite hot-reloading (Port 3000):
```bash
npm run dev
```

Open your browser at:
- **Frontend App**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000/api/health`

### Step 3: Run Full Production Server
To run the unified server (serves both API & compiled React frontend on a single port):
```bash
npm run build
npm start
```
Then visit: `http://localhost:5000`

---

## 🔗 Environment Variables (Optional)

Create a `.env` file in `server/` if you want to connect to a cloud MongoDB Atlas instance:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/campuspulse?retryWrites=true&w=majority
```
*(If no MongoDB URI is set, the server automatically uses local resilient JSON storage with zero setup!)*

=======
# Campus-Pulse
>>>>>>> ea17025bae3f805123b9e2ddcb1a0456bbf32e6d
