// src/utils/sendDailyVisit.js
const STORAGE_KEY = 'visitSentAt';

// Belgrade local day (use 'UTC' if your backend buckets by UTC)
function todayStr(timeZone = 'UTC') {
  const d = new Date();
  const y = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric' }).format(d);
  const m = new Intl.DateTimeFormat('en-CA', { timeZone, month: '2-digit' }).format(d);
  const day = new Intl.DateTimeFormat('en-CA', { timeZone, day: '2-digit' }).format(d);
  return `${y}-${m}-${day}`;
}

// Fire-and-forget POST with NO credentials and NO JSON header (=> no preflight)
function postNoPreflight(url) {
  // Prefer Beacon (non-blocking). Use text/plain to keep it "simple".
  const beaconBody = new Blob(['1'], { type: 'text/plain' });
  if (navigator.sendBeacon && navigator.sendBeacon(url, beaconBody)) return;

  // Fallback: fetch without credentials and without custom headers
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',  // IMPORTANT: no cookies/Authorization
    body: '1'             // plain text, no Content-Type header -> no preflight
  }).catch(() => {});
}

export function sendDailyVisitIfNeeded(
  endpoint = 'https://zm-westcstrike.com/api/tracker/visitors',
  tz = 'UTC'
) {
  try {
    const today = todayStr(tz);
    const last = localStorage.getItem(STORAGE_KEY);
    if (last === today) return;   // already sent today
    postNoPreflight(endpoint);    // don't await
    localStorage.setItem(STORAGE_KEY, today);
  } catch {
    // If localStorage is blocked, still try once per load
    postNoPreflight(endpoint);
  }
}
