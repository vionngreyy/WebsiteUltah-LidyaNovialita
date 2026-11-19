import { useEffect, useMemo, useState } from 'react';
import { Check, CornerDownRight, Lock, MessageCircle, Send, Sparkles, Unlock } from 'lucide-react';
import { accentColors, avatars, siteData as data } from '../../data/siteData';
import { addReply, createMessage, getMessages, getReplies, guestbookMode, verifyOwner } from '../../lib/guestbookApi';

export default function MessagesSection({ onNotify }) {
  const h = data.sectionHeadings.messages;
  const [avatarId, setAvatarId] = useState('girl-1');
  const [accent, setAccent] = useState(accentColors[0]);
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [tag, setTag] = useState('Tulis sendiri');
  const [messages, setMessages] = useState([]);
  const [replies, setReplies] = useState([]);
  const [sending, setSending] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [ownerMode, setOwnerMode] = useState(false);
  const [ownerCode, setOwnerCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [checkingCode, setCheckingCode] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [savingReply, setSavingReply] = useState(false);

  const selectedAvatar = useMemo(
    () => avatars.find((a) => a.id === avatarId) || avatars[0],
    [avatarId]
  );

  const replyMap = useMemo(() => {
    const map = {};
    replies.forEach((r) => { map[r.message_id] = r; });
    return map;
  }, [replies]);

  useEffect(() => {
    Promise.all([getMessages().catch(() => []), getReplies().catch(() => [])])
      .then(([msgs, reps]) => { setMessages(msgs); setReplies(reps); })
      .finally(() => setLoadingMessages(false));
  }, []);

  const applyTemplate = (template) => {
    setTag(template.label);
    setMessage(template.text);
  };

  const polishMessage = () => {
    const clean = message.trim();
    if (!clean) {
      setMessage(`Selamat ulang tahun, ${data.name}! Semoga harimu penuh tawa dan tahun ini membawa banyak hal baik.`);
      setTag('Inspirasi');
      return;
    }
    const final = clean.charAt(0).toUpperCase() + clean.slice(1).replace(/\s+/g, ' ');
    setMessage(/[.!?]$/.test(final) ? final : `${final}.`);
    onNotify('Ucapan dirapikan ✨');
  };

  const submitMessage = async (e) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) {
      onNotify('Nama dan ucapan perlu diisi dulu.');
      return;
    }
    if (senderName.trim().length > 40 || message.trim().length > 400) {
      onNotify('Nama maksimal 40 karakter dan ucapan maksimal 400 karakter.');
      return;
    }

    setSending(true);
    try {
      const payload = {
        name: senderName.trim(),
        message: message.trim(),
        avatar: avatarId,
        accent,
        template_tag: tag,
      };
      const created = await createMessage(payload);
      setMessages((prev) => [created, ...prev]);
      setSenderName('');
      setMessage('');
      setTag('Tulis sendiri');
      onNotify('Ucapan berhasil dikirim 💌');
    } catch {
      onNotify('Ucapan belum berhasil dikirim.');
    } finally {
      setSending(false);
    }
  };

  const submitOwnerCode = async (e) => {
    e.preventDefault();
    const code = codeInput.trim();
    if (!code) return;
    setCheckingCode(true);
    try {
      const ok = await verifyOwner(code);
      if (ok) {
        setOwnerMode(true);
        setOwnerCode(code);
        setShowCodeInput(false);
        setCodeInput('');
        onNotify('Mode pemilik aktif 🔓');
      } else {
        onNotify('Kode pemilik salah.');
      }
    } catch {
      onNotify('Gagal memeriksa kode.');
    } finally {
      setCheckingCode(false);
    }
  };

  const exitOwnerMode = () => {
    setOwnerMode(false);
    setOwnerCode('');
    setReplyTo(null);
    setReplyText('');
    onNotify('Mode pemilik nonaktif');
  };

  const openReply = (item) => {
    setReplyTo(item.id);
    setReplyText(replyMap[item.id]?.reply || '');
  };

  const submitReply = async (messageId) => {
    const clean = replyText.trim();
    if (!clean) {
      onNotify('Balasan masih kosong.');
      return;
    }
    if (clean.length > 400) {
      onNotify('Balasan maksimal 400 karakter.');
      return;
    }
    setSavingReply(true);
    try {
      const item = await addReply(messageId, clean, ownerCode);
      setReplies((prev) => [item, ...prev.filter((r) => r.message_id !== messageId)]);
      setReplyTo(null);
      setReplyText('');
      onNotify('Balasan terkirim 💬');
    } catch (err) {
      onNotify(err.message || 'Balasan gagal dikirim.');
    } finally {
      setSavingReply(false);
    }
  };

  return (
    <section id="messages" className="messages section-pad">
      <div className="messages-head reveal reveal-left">
        <div>
          <span className="kicker">{h.kicker}</span>
          <h2>{h.top}<br /><em>{h.emphasis}</em></h2>
          <p>{h.sub.replace('{name}', data.name)}</p>
        </div>
        <div className="messages-head-actions">
          {ownerMode ? (
            <button type="button" className="owner-toggle active" onClick={exitOwnerMode} title="Matikan mode pemilik">
              <Unlock size={15} /> Pemilik aktif
            </button>
          ) : showCodeInput ? (
            <form className="owner-box" onSubmit={submitOwnerCode}>
              <input
                autoFocus
                type="password"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="Kode pemilik"
                maxLength={60}
              />
              <button type="submit" disabled={checkingCode} title="Masuk">
                {checkingCode ? '…' : <Check size={16} />}
              </button>
            </form>
          ) : (
            <button type="button" className="owner-toggle" onClick={() => setShowCodeInput(true)} title="Masuk sebagai pemilik">
              <Lock size={15} /> Mode pemilik
            </button>
          )}
          <div className="message-count"><strong>{messages.length}</strong><span>Ucapan</span></div>
        </div>
      </div>

      <div className="guestbook-layout">
        <form className="wish-form reveal reveal-left" onSubmit={submitMessage}>
          <div className="form-section">
            <div className="form-title"><span>01</span><strong>Pilih avatar</strong></div>
            <div className="avatar-grid">
              {avatars.map((avatar) => (
                <button type="button" className={avatarId === avatar.id ? 'selected' : ''} key={avatar.id} onClick={() => setAvatarId(avatar.id)}>
                  <img src={avatar.src} alt={avatar.label} />
                  {avatarId === avatar.id && <span><Check size={14} /></span>}
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <div className="form-title"><span>02</span><strong>Pilih warna kartu</strong></div>
            <div className="color-row">
              {accentColors.map((color) => (
                <button type="button" aria-label={`Pilih warna ${color}`} key={color} className={accent === color ? 'selected' : ''} style={{ '--swatch': color }} onClick={() => setAccent(color)} />
              ))}
            </div>
          </div>

          <div className="form-section">
            <div className="form-title"><span>03</span><strong>Nama & ucapan</strong></div>
            <label htmlFor="wish-name">Nama</label>
            <input id="wish-name" maxLength={40} value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="Nama kamu" />
            <label>Inspirasi ucapan</label>
            <div className="template-row">
              {data.messageTemplates.map((template) => (
                <button type="button" className={tag === template.label ? 'active' : ''} key={template.label} onClick={() => applyTemplate(template)}>{template.label}</button>
              ))}
              <button type="button" className={tag === 'Tulis sendiri' ? 'active' : ''} onClick={() => { setTag('Tulis sendiri'); setMessage(''); }}>Tulis sendiri</button>
            </div>
            <div className="textarea-wrap">
              <textarea
                aria-label="Isi ucapan"
                maxLength={400}
                rows={6}
                value={message}
                onChange={(e) => { setMessage(e.target.value); setTag('Tulis sendiri'); }}
                placeholder="Tulis ucapan atau doa di sini..."
              />
              <div className="textarea-tools">
                <span>{message.length}/400</span>
                <button type="button" onClick={polishMessage}><Sparkles size={15} /> Rapikan</button>
              </div>
            </div>
          </div>

          <div className="preview-card" style={{ '--accent': accent }}>
            <img src={selectedAvatar.src} alt="Preview avatar" />
            <div>
              <span>PREVIEW</span>
              <strong>{senderName || 'Nama kamu'}</strong>
              <p>{message || 'Ucapan kamu akan terlihat seperti ini.'}</p>
            </div>
          </div>

          <button className="btn btn-primary submit-wish" disabled={sending}>
            {sending ? 'Mengirim...' : <>Kirim Ucapan <Send size={18} /></>}
          </button>
          <span className={`storage-note ${guestbookMode === 'supabase' ? 'online' : ''}`}>
            {guestbookMode === 'supabase'
              ? 'Ucapan tersimpan online dan terlihat di semua perangkat.'
              : 'Mode lokal: ucapan tersimpan di browser perangkat ini.'}
          </span>
        </form>

        <div className="wish-wall reveal reveal-right">
          {loadingMessages ? (
            <div className="empty-wall">Memuat ucapan...</div>
          ) : messages.length === 0 ? (
            <div className="empty-wall"><MessageCircle size={42} /><strong>Belum ada ucapan.</strong><span>Jadi yang pertama ✦</span></div>
          ) : (
            messages.map((item) => {
              const avatar = avatars.find((a) => a.id === item.avatar) || avatars[0];
              return (
                <article className="wish-card" key={item.id} style={{ '--accent': item.accent || accentColors[0] }}>
                  <img src={avatar.src} alt="Avatar pengirim" />
                  <div>
                    <div className="wish-card-head"><strong>{item.name}</strong><span>{item.template_tag || 'Ucapan'}</span></div>
                    <p>{item.message}</p>
                    <small>{item.created_at ? new Date(item.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : ''}</small>

                    {replyMap[item.id] && (
                      <div className="wish-reply">
                        <span className="wish-reply-label"><CornerDownRight size={13} /> Balasan dari {data.name}</span>
                        <p>{replyMap[item.id].reply}</p>
                      </div>
                    )}

                    {ownerMode && (
                      replyTo === item.id ? (
                        <div className="reply-form">
                          <textarea
                            maxLength={400}
                            rows={3}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={`Tulis balasan sebagai ${data.name}...`}
                          />
                          <div className="reply-form-actions">
                            <span>{replyText.length}/400</span>
                            <button type="button" className="btn-mini ghost" onClick={() => { setReplyTo(null); setReplyText(''); }}>Batal</button>
                            <button type="button" className="btn-mini" disabled={savingReply} onClick={() => submitReply(item.id)}>
                              {savingReply ? 'Menyimpan...' : <>Kirim <Send size={14} /></>}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button type="button" className="reply-open" onClick={() => openReply(item)}>
                          <CornerDownRight size={14} /> {replyMap[item.id] ? 'Ubah balasan' : 'Balas'}
                        </button>
                      )
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
