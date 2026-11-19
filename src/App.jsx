import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import {
  ArrowDownRight,
  CakeSlice,
  CalendarDays,
  Camera,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Gift,
  Heart,
  Instagram,
  Menu,
  MessageCircle,
  Music2,
  Pause,
  Play,
  Sparkles,
  X,
  ZoomIn,
} from 'lucide-react';
import { siteData as data } from './data/siteData';
import Countdown from './components/Countdown';
import Ticker from './components/Ticker';
import Confetti from './components/Confetti';

const StorySection = lazy(() => import('./components/sections/StorySection'));
const GallerySection = lazy(() => import('./components/sections/GallerySection'));
const MessagesSection = lazy(() => import('./components/sections/MessagesSection'));

const gallery = data.galleryImages;

const navItems = [
  ['home', 'Beranda'],
  ['countdown', 'Countdown'],
  ['surprise', 'Kejutan'],
  ['story', 'Cerita'],
  ['gallery', 'Galeri'],
  ['messages', 'Ucapan'],
];

const navIcons = {
  countdown: CakeSlice,
  surprise: Gift,
  story: Sparkles,
  gallery: Camera,
  messages: MessageCircle,
};

const renderWaveText = (text) => text.split('').map((char, index) => (
  <span className="wave-char" style={{ '--i': index }} key={`${char}-${index}`}>
    {char === ' ' ? '\u00A0' : char}
  </span>
));

function CakeArt({ blown = false, small = false }) {
  return (
    <div className={`cake-art${small ? ' cake-small' : ''}${blown ? ' is-blown' : ''}`} aria-hidden="true">
      <span className="cake-spark cake-spark-a">✦</span>
      <span className="cake-spark cake-spark-b">♥</span>
      <div className="cake-candles"><i /><i /><i /></div>
      <div className="cake-top" />
      <div className="cake-body" />
      <div className="cake-plate" />
      <span className="cake-smoke" />
    </div>
  );
}

function App() {
  const audioRef = useRef(null);
  const lastScrollRef = useRef(0);
  const scrollTickRef = useRef(false);
  const desktopNavRef = useRef(null);
  const navButtonRefs = useRef({});
  const toastTimerRef = useRef(null);
  const lbTouchStart = useRef(null);

  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [navScrolled, setNavScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [navIndicator, setNavIndicator] = useState({ left: 0, width: 0, visible: false });
  const [toast, setToast] = useState('');
  const [lightbox, setLightbox] = useState(null);
  const [confettiKey, setConfettiKey] = useState(0);
  const [candleBlown, setCandleBlown] = useState(false);
  const [wishRevealed, setWishRevealed] = useState(false);

  const notify = (text) => {
    setToast(text);
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(''), 2400);
  };

  const go = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const copyText = async (text, success) => {
    try {
      await navigator.clipboard.writeText(text);
      notify(success);
    } catch {
      notify('Gagal menyalin. Coba lagi.');
    }
  };

  const lbPrev = () => setLightbox((index) => (index <= 0 ? gallery.length - 1 : index - 1));
  const lbNext = () => setLightbox((index) => (index >= gallery.length - 1 ? 0 : index + 1));

  const openInvitation = () => {
    if (opening) return;
    setOpening(true);

    if (audioRef.current) {
      audioRef.current.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
    }

    window.setTimeout(() => {
      setOpened(true);
      setOpening(false);
      setConfettiKey((key) => key + 1);
      document.body.classList.remove('gate-open');
      window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'auto' }), 60);
    }, 720);
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (musicOn) {
      audioRef.current.pause();
      setMusicOn(false);
      return;
    }
    try {
      await audioRef.current.play();
      setMusicOn(true);
    } catch {
      notify('Musik belum bisa diputar di browser ini.');
    }
  };

  const blowCandles = () => {
    if (candleBlown) {
      setCandleBlown(false);
      setWishRevealed(false);
      return;
    }
    setCandleBlown(true);
    setWishRevealed(true);
    setConfettiKey((key) => key + 1);
    notify('Harapanmu terkirim ke semesta ✨');
  };

  useEffect(() => {
    const cover = document.getElementById('boot-cover');
    if (!cover) return undefined;
    cover.classList.add('is-done');
    const timer = window.setTimeout(() => cover.remove(), 600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('gate-open', !opened);
  }, [opened]);

  useEffect(() => {
    const onVisibility = () => document.body.classList.toggle('anim-paused', document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    onVisibility();
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    if (!lightbox && !mobileOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    if (lightbox) document.body.style.overflow = 'hidden';
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setLightbox(null);
        setMobileOpen(false);
      } else if (lightbox !== null) {
        if (event.key === 'ArrowLeft') lbPrev();
        if (event.key === 'ArrowRight') lbNext();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightbox, mobileOpen]);

  useEffect(() => {
    if (!opened) return undefined;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0.05, 0.2, 0.5] }
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains('is-visible')) {
            entry.target.classList.add('is-visible');
            window.setTimeout(() => entry.target.classList.add('reveal-done'), 1000);
          }
        });
      },
      { threshold: 0.1 }
    );

    const observedSections = new Set();
    const observedReveals = new Set();

    const scan = () => {
      navItems.forEach(([id]) => {
        if (observedSections.has(id)) return;
        const el = document.getElementById(id);
        if (!el) return;
        observedSections.add(id);
        sectionObserver.observe(el);
      });
      document.querySelectorAll('.reveal').forEach((el) => {
        if (observedReveals.has(el)) return;
        observedReveals.add(el);
        revealObserver.observe(el);
      });
    };

    scan();
    const mutationObserver = new MutationObserver(scan);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      sectionObserver.disconnect();
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [opened]);

  useEffect(() => {
    if (!opened) return undefined;
    const heroCopy = document.querySelector('.hero-copy');
    const heroVisual = document.querySelector('.hero-visual');

    const update = () => {
      const y = window.scrollY || 0;
      const viewport = Math.max(window.innerHeight, 1);
      if (heroCopy?.classList.contains('reveal-done') && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        const progress = Math.max(0, Math.min(1, y / (viewport * 0.8)));
        heroCopy.style.transform = `translate3d(0, ${(progress * -32).toFixed(1)}px, 0)`;
        heroCopy.style.opacity = `${(1 - progress * 0.5).toFixed(3)}`;
        if (heroVisual?.classList.contains('reveal-done')) {
          heroVisual.style.transform = `translate3d(0, ${(progress * 26).toFixed(1)}px, 0) scale(${(1 - progress * 0.03).toFixed(3)})`;
        }
      }

      setNavScrolled(y > 56);
      const previous = lastScrollRef.current;
      if (y > 200 && y > previous + 6) setNavHidden(true);
      if (y < previous - 4 || y < 200) setNavHidden(false);
      lastScrollRef.current = y;
      scrollTickRef.current = false;
    };

    const onScroll = () => {
      if (scrollTickRef.current) return;
      scrollTickRef.current = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      scrollTickRef.current = false;
    };
  }, [opened]);

  useEffect(() => {
    if (!opened) return undefined;
    const updateIndicator = () => {
      const nav = desktopNavRef.current;
      const button = navButtonRefs.current[active];
      if (!nav || !button) {
        setNavIndicator((prev) => ({ ...prev, visible: false }));
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      setNavIndicator({
        left: buttonRect.left - navRect.left,
        width: buttonRect.width,
        visible: true,
      });
    };
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [active, opened]);

  const onLbTouchStart = (event) => {
    lbTouchStart.current = event.touches[0].clientX;
  };
  const onLbTouchEnd = (event) => {
    if (lbTouchStart.current === null) return;
    const dx = event.changedTouches[0].clientX - lbTouchStart.current;
    if (Math.abs(dx) > 48) {
      if (dx < 0) lbNext();
      else lbPrev();
    }
    lbTouchStart.current = null;
  };

  return (
    <>
      <audio ref={audioRef} src={data.music} loop preload="metadata" />
      <Confetti burstKey={confettiKey} />

      {!opened && (
        <div className={`gate ${opening ? 'is-opening' : ''}`}>
          <Ticker />
          <div className="gate-glow gate-glow-a" aria-hidden="true" />
          <div className="gate-glow gate-glow-b" aria-hidden="true" />
          <div className="gate-age" aria-hidden="true">{data.age}</div>
          <span className="gate-heart heart-a" aria-hidden="true">♥</span>
          <span className="gate-heart heart-b" aria-hidden="true">♥</span>
          <span className="gate-heart heart-c" aria-hidden="true">♥</span>
          <span className="gate-heart heart-d" aria-hidden="true">♥</span>
          <span className="gate-star star-a" aria-hidden="true">✦</span>
          <span className="gate-star star-b" aria-hidden="true">✦</span>

          <div className="gate-inner">
            <div className="gate-copy">
              <span className="kicker gate-kicker">BIRTHDAY SURPRISE · {data.year}</span>
              <div className="gate-title-wrap">
                <h1 className="gate-name" aria-label={data.name}>
                  {renderWaveText(data.name.toUpperCase())}
                </h1>
                <div className="gate-subline" aria-hidden="true">
                  <span>SELAMAT ULANG TAHUN</span><i /><span>KE-{data.age}</span>
                </div>
              </div>
              <p>{data.intro}</p>
              <div className="gate-actions">
                <button className="btn btn-primary gate-button" onClick={openInvitation}>
                  {opening ? 'Membuka...' : <>Buka Ucapan <Gift size={19} /></>}
                </button>
                <span className="gate-hint">♪ nyalakan musik &amp; semesta</span>
              </div>
            </div>

            <div className="gate-art" aria-hidden="true">
              <div className="gate-art-card">
                <span className="gate-art-label">HAPPY BIRTHDAY</span>
                <CakeArt small />
                <span className="gate-art-footer">make a wish ✦</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {opened && (
        <>
          <div className="page-ambient" aria-hidden="true">
            <span className="ambient-blob ambient-blob-a" />
            <span className="ambient-blob ambient-blob-b" />
            <span className="ambient-ring" />
          </div>

          <Ticker />

          <header className={`site-header ${navScrolled ? 'is-scrolled' : ''} ${navHidden ? 'is-hidden' : ''}`}>
            <button className="brand" onClick={() => go('home')} aria-label="Kembali ke beranda">
              <span>{data.name.toUpperCase()}</span>
              <small>BIRTHDAY {data.year}</small>
            </button>

            <nav className="desktop-nav" ref={desktopNavRef}>
              <span
                className={`nav-glider ${navIndicator.visible ? 'visible' : ''}`}
                style={{ transform: `translateX(${navIndicator.left}px)`, width: `${navIndicator.width}px` }}
                aria-hidden="true"
              />
              {navItems.slice(1).map(([id, label]) => {
                const Icon = navIcons[id];
                return (
                  <button
                    key={id}
                    ref={(el) => { navButtonRefs.current[id] = el; }}
                    className={active === id ? 'active' : ''}
                    onClick={() => go(id)}
                  >
                    {Icon && <Icon size={15} strokeWidth={2} />}
                    <span>{label}</span>
                  </button>
                );
              })}
            </nav>

            <button className="menu-button" onClick={() => setMobileOpen((value) => !value)} aria-label="Buka menu">
              {mobileOpen ? <X /> : <Menu />}
            </button>

            <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
              {navItems.map(([id, label], index) => (
                <button key={id} onClick={() => go(id)}>
                  <span>0{index + 1}</span>{label}
                </button>
              ))}
            </div>
          </header>

          <nav className="mobile-float-nav" aria-label="Navigasi cepat">
            {[
              ['countdown', CakeSlice, 'Waktu'],
              ['surprise', Gift, 'Kejutan'],
              ['story', Sparkles, 'Cerita'],
              ['gallery', Camera, 'Foto'],
              ['messages', MessageCircle, 'Ucapan'],
            ].map(([id, Icon, label]) => (
              <button key={id} className={active === id ? 'active' : ''} onClick={() => go(id)}>
                <Icon size={18} /><span>{label}</span>
              </button>
            ))}
          </nav>

          <main>
            <section id="home" className="hero section-pad">
              <div className="hero-copy reveal reveal-left">
                <div className="hero-meta">
                  <span>HAPPY BIRTHDAY</span>
                  <span>{data.dateText}</span>
                  <span>KE-{data.age}</span>
                </div>
                <h1>
                  <span>Selamat</span>
                  <span>ulang tahun,</span>
                  <span className="hero-name">{data.name}<i>!</i></span>
                </h1>
                <div className="hero-bottom">
                  <p>{data.heroText}</p>
                  <button className="text-link" onClick={() => go('countdown')}>
                    Lihat kejutan <ArrowDownRight size={18} />
                  </button>
                </div>
              </div>

              <div className="hero-visual reveal reveal-scale">
                <div className="hero-blob" />
                <div className="hero-photo">
                  <img src={data.heroImage} alt={`Foto ${data.name}`} loading="eager" decoding="async" fetchpriority="high" width="1110" height="1417" />
                </div>
                <div className="hero-sticker">MAKE A WISH <span>✦</span></div>
                <div className="hero-age">{data.age}<small>TAHUN</small></div>
                <div className="hero-caption"><strong>{data.name}</strong><span>{data.dateText}</span></div>
              </div>
            </section>

            <section id="countdown" className="countdown-section section-pad">
              <div className="countdown-copy reveal reveal-left">
                <span className="kicker">SAVE THE DATE</span>
                <h2>Hitung menuju<br /><em>hari spesialmu.</em></h2>
                <p>{data.dateText} · Tandai kalender, siapkan kue, dan jangan lupa satu harapan kecil.</p>
                <div className="date-pill"><CalendarDays size={17} /> {data.dateText}</div>
              </div>
              <div className="countdown-panel reveal reveal-right">
                <Countdown target={data.birthdayDate} />
              </div>
            </section>

            <section id="surprise" className="surprise section-pad">
              <div className="surprise-card reveal reveal-scale">
                <div className="surprise-copy">
                  <span className="kicker">A LITTLE SURPRISE</span>
                  <h2>Tiup lilinnya,<br /><em>lalu berharap.</em></h2>
                  <p>{data.wishText}</p>
                  <button className="btn btn-primary" onClick={blowCandles}>
                    {candleBlown ? <>Tiup lagi <Sparkles size={18} /></> : <>Tiup Lilin <CakeSlice size={18} /></>}
                  </button>
                  <div className={`wish-reveal ${wishRevealed ? 'show' : ''}`}>
                    ✨ Harapanmu sudah sampai. Semoga jadi nyata!
                  </div>
                </div>
                <div className="surprise-art">
                  <CakeArt blown={candleBlown} />
                </div>
              </div>
            </section>

            <Suspense fallback={null}>
              <StorySection />
              <GallerySection gallery={gallery} gridLimit={4} onOpen={setLightbox} />
              <MessagesSection onNotify={notify} />
            </Suspense>

            <section className="closing section-pad">
              <div className="closing-card reveal reveal-scale">
                <span className="pill">✦ TERIMA KASIH SUDAH MAMPIR</span>
                <div className="closing-name">
                  <h2>{data.name}</h2>
                  <em>birthday {data.year}</em>
                </div>
                <p>{data.quote}</p>
                <div className="closing-actions">
                 
            
                </div>
                <small>© {data.year} {data.name} · Dibuat dengan ♥ untukmu</small>
              </div>
            </section>
          </main>

          <button className={`music-control ${musicOn ? 'playing' : ''}`} onClick={toggleMusic} aria-label="Kontrol musik">
            {musicOn ? <Pause size={18} /> : <Play size={18} />}<Music2 size={18} />
          </button>
        </>
      )}

      {lightbox !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Foto galeri ${gallery[lightbox].id} dari ${gallery.length}`}
          onTouchStart={onLbTouchStart}
          onTouchEnd={onLbTouchEnd}
        >
          <button className="lb-close" onClick={() => setLightbox(null)} aria-label="Tutup"><X /></button>
          <button className="lb-nav lb-prev" onClick={lbPrev} aria-label="Foto sebelumnya"><ChevronLeft /></button>
          <figure className="lb-figure">
            <img src={gallery[lightbox].src} alt={`Galeri ${gallery[lightbox].id}`} decoding="async" />
            <figcaption className="lb-caption">
              <i /> FOTO {String(gallery[lightbox].id).padStart(2, '0')} <b>/</b> {gallery.length} <i />
            </figcaption>
          </figure>
          <button className="lb-nav lb-next" onClick={lbNext} aria-label="Foto berikutnya"><ChevronRight /></button>
          <span className="lb-hint"><ZoomIn size={14} /> Geser untuk ganti foto</span>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

export default App;
