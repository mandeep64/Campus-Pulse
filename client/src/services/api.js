// client/src/services/api.js
const API_BASE = '/api';

export async function fetchEvents(filters = {}) {
  const params = new URLSearchParams();
  if (filters.univ && filters.univ !== 'ALL') params.append('univ', filters.univ);
  if (filters.college && filters.college !== 'ALL') params.append('college', filters.college);
  if (filters.society && filters.society !== 'ALL') params.append('society', filters.society);
  if (filters.category && filters.category !== 'ALL') params.append('category', filters.category);
  if (filters.search) params.append('search', filters.search);

  const query = params.toString() ? `?${params.toString()}` : '';
  const res = await fetch(`${API_BASE}/events${query}`);
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}

export async function fetchMarketplace(filters = {}) {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.category && filters.category !== 'ALL' && filters.category !== 'ALL CATEGORIES') params.append('category', filters.category);
  if (filters.college && filters.college !== 'ALL' && filters.college !== 'ALL COLLEGES') params.append('college', filters.college);

  const query = params.toString() ? `?${params.toString()}` : '';
  const res = await fetch(`${API_BASE}/marketplace${query}`);
  if (!res.ok) throw new Error('Failed to fetch marketplace');
  return res.json();
}

export async function fetchSocieties() {
  const res = await fetch(`${API_BASE}/societies`);
  if (!res.ok) throw new Error('Failed to fetch societies');
  return res.json();
}

export async function parseEventAnnouncement(rawText) {
  const res = await fetch(`${API_BASE}/parse-event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rawText })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to parse announcement');
  }
  return res.json();
}

export async function createEvent(eventData) {
  const res = await fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to publish event');
  }
  return res.json();
}

export async function rsvpEvent(eventId) {
  const res = await fetch(`${API_BASE}/events/${eventId}/rsvp`, {
    method: 'POST'
  });
  if (!res.ok) throw new Error('Failed to RSVP');
  return res.json();
}

export async function fetchAISummary(event) {
  const res = await fetch(`${API_BASE}/ai-summary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event })
  });
  if (!res.ok) throw new Error('Failed to generate summary');
  return res.json();
}

export async function sendChatMessage(message) {
  const res = await fetch(`${API_BASE}/ai-chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  if (!res.ok) throw new Error('Failed to get bot reply');
  return res.json();
}

