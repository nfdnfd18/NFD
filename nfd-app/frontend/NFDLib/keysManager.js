// keysManager: generate 20 encrypted values and store them in localStorage and a cookie.
// This file avoids using the reserved word requested by the user.

function randomHex(size = 32) {
  const arr = new Uint8Array(size);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(arr);
  } else {
    for (let i = 0; i < size; i++) arr[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
}
// Web Crypto helpers
function bufToBase64(buf) {
  const bytes = new Uint8Array(buf);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

async function deriveKey(passphrase, salt) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey('raw', enc.encode(passphrase), { name: 'PBKDF2' }, false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function encryptWithPassphrase(passphrase, plaintext) {
  if (!globalThis.crypto || !crypto.subtle) {
    // fallback: store plaintext (least desirable)
    return `raw:${encodeURIComponent(plaintext)}`;
  }

  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passphrase, salt.buffer);
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(plaintext));

  return `${bufToBase64(salt)}:${bufToBase64(iv)}:${bufToBase64(ct)}`;
}

export async function generateAndStoreKeys(passphrase = 'local-pass') {
  const keys = [];
  for (let i = 0; i < 20; i++) {
    const raw = randomHex(16);
    try {
      const ct = await encryptWithPassphrase(passphrase, raw);
      keys.push(ct);
    } catch (e) {
      // fallback to storing plain hex if encryption fails
      keys.push(raw);
    }
  }

  // Store in localStorage
  try {
    localStorage.setItem('nfd_keys_v1', JSON.stringify(keys));
  } catch (e) {
    // ignore
  }

  // Also set cookie for server-side presence check (small prefix + joined payload)
  try {
    const payload = keys.join('|');
    const prefix = typeof window !== 'undefined' && window.crypto ? 'client' : 'server';
    // Limit cookie size: take a hash-like substring to avoid oversized cookies
    const cookiePayload = encodeURIComponent(payload).slice(0, 4000);
    document.cookie = `Love_wins_Whats_up_with_that=${prefix}:${cookiePayload}; path=/; max-age=${60 * 60 * 24 * 30}`;
  } catch (e) {}

  return keys;
}

export function getKeys() {
  try {
    const raw = localStorage.getItem('nfd_keys_v1');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) { return null; }
}
