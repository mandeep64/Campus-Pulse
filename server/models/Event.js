// server/models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  society: {
    type: String,
    required: true,
    enum: [
      'MIT CSS',
      'MIT TECH CLUB',
      'MIT LITERACY SOCIETY',
      'MIT AIMLSS',
      'MIT CYBER SECURITY',
      'Aditi Cultural Society',
      'DU Debating Society',
      'Enactus AM',
      'Rotaract Campus Club',
      'General'
    ],
    default: 'MIT TECH CLUB'
  },
  societyFullName: {
    type: String,
    default: ''
  },
  societyCategory: {
    type: String,
    default: 'Technical'
  },
  societyColor: {
    type: String,
    default: '#3B82F6'
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    default: '10:00 AM onwards'
  },
  venue: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['Hackathon', 'Workshop', 'Technical', 'Literary & Cultural', 'Cyber Security', 'AI & Data Science', 'Recruitment', 'Competition', 'Fest'],
    default: 'Technical'
  },
  registrationLink: {
    type: String,
    default: 'https://campuspulse.edu/register'
  },
  contact: {
    type: String,
    default: 'Society Core Team'
  },
  tags: {
    type: [String],
    default: ['Open for All', 'Certificates']
  },
  college: {
    type: String,
    default: 'MIT Pune / MIT Campus'
  },
  university: {
    type: String,
    default: 'ALL'
  },
  status: {
    type: String,
    enum: ['Live Now', 'Upcoming', 'Registrations Open', 'Completed'],
    default: 'Upcoming'
  },
  capacity: {
    type: Number,
    default: 100
  },
  rsvps: {
    type: Number,
    default: 15
  },
  aiSummary: {
    tldr: { type: String, default: '' },
    highlights: { type: [String], default: [] },
    actionItem: { type: String, default: '' }
  },
  rawText: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', EventSchema);

