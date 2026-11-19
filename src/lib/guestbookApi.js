const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const STORAGE_KEY = 'birthday-messages-v1';
const REPLIES_KEY = 'birthday-replies-v1';
const LOCAL_OWNER_CODE = 'GANTI_KODE_PEMILIK';

const headers = {
  apikey: SUPABASE_ANON_KEY || '',
  Authorization: SUPABASE_ANON_KEY ? `Bearer ${SUPABASE_ANON_KEY}` : '',
  'Content-Type': 'application/json',
};

export const guestbookMode = SUPABASE_URL && SUPABASE_ANON_KEY ? 'supabase' : 'local';

export async function getMessages() {
  if (guestbookMode === 'local') {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/messages?select=*&order=created_at.desc&limit=100`, { headers });
  if (!res.ok) throw new Error('Gagal memuat pesan.');
  return res.json();
}

const uid = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export async function createMessage(payload) {
  if (guestbookMode === 'local') {
    const current = await getMessages();
    const item = { ...payload, id: uid(), created_at: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([item, ...current]));
    return item;
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
    method: 'POST',
    headers: { ...headers, Prefer: 'return=representation' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Pesan gagal dikirim.');
  const rows = await res.json();
  return rows[0];
}

async function callRpc(fn, body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const info = await res.json().catch(() => ({}));
    throw new Error(info.message || 'Terjadi kesalahan.');
  }
  return res.json().catch(() => null);
}

export async function getReplies() {
  if (guestbookMode === 'local') {
    try {
      return JSON.parse(localStorage.getItem(REPLIES_KEY) || '[]');
    } catch {
      return [];
    }
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/replies?select=message_id,reply,created_at`, { headers });
  if (!res.ok) throw new Error('Gagal memuat balasan.');
  return res.json();
}

export async function verifyOwner(code) {
  if (!code) return false;

  if (guestbookMode === 'local') return code === LOCAL_OWNER_CODE;

  const result = await callRpc('verify_owner', { code });
  return result === true;
}

export async function addReply(messageId, reply, code) {
  if (guestbookMode === 'local') {
    if (code !== LOCAL_OWNER_CODE) throw new Error('Kode pemilik salah.');
    const rows = await getReplies();
    const item = { message_id: messageId, reply, created_at: new Date().toISOString() };
    const next = [item, ...rows.filter((r) => r.message_id !== messageId)];
    localStorage.setItem(REPLIES_KEY, JSON.stringify(next));
    return item;
  }

  await callRpc('add_reply', { msg_id: messageId, reply_text: reply, code });
  return { message_id: messageId, reply, created_at: new Date().toISOString() };
}
