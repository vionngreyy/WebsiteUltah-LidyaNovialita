// ============================================================
//  SEMUA TEKS & GAMBAR WEBSITE ADA DI FILE INI
//  Tinggal ganti nilai di bawah untuk menyesuaikan penerima.
//  Semua nilai di sini sudah NETRAL / placeholder.
// ============================================================

export const siteData = {
  // Nama penerima (WAJIB diganti sebelum web dikirim)
  name: 'Lidya Novialita',
  age: '24',
  year: '2026',

  // Tanggal ulang tahun. Countdown akan berhenti dan berubah jadi
  // "Happy Birthday" otomatis saat waktu ini tercapai.
  birthdayDate: '2026-11-26T00:00:00+07:00',
  dateText: '26 November 2026',
  shortDate: '26.11.2026',

  intro: 'Hari ini bukan sekadar tanggal di kalender. Ini hari ketika kamu boleh jadi pusat perhatian, boleh minta apa saja, dan boleh senyum sepuasnya. 🎂',
  heroText: 'Semoga harimu sehangat pelukan dan semesta baik yang kamu berikan ke orang-orang di sekitarmu.',
  wishText: 'Semoga kamu selalu sehat, dikelilingi orang yang tulus, dan setiap impian kecilmu pelan-pelan jadi nyata. Make a wish, ya! ✨',
  quote: 'Terima kasih sudah menjadi alasan banyak hari terasa lebih ringan. Semoga umur panjang, rezeki lapang, dan tawa tidak pernah kehabisan.',

  // Foto sementara (placeholder). Ganti file di public/images/ai/ lalu update path di sini.
  heroImage: 'images/ai/hero.svg',
  music: 'music/background.mp3',

  instagram: 'https://www.instagram.com/',
  whatsapp: 'https://wa.me/',

  reasons: [
    { emoji: '🌷', title: 'Karena kamu tulus', text: 'Cara kamu peduli tanpa berisik bikin siapa pun merasa lebih aman di dekatmu.' },
    { emoji: '🎈', title: 'Karena kamu seru', text: 'Tawa kamu punya cara sendiri untuk mengubah hari biasa jadi cerita yang seru diingat.' },
    { emoji: '💗', title: 'Karena kamu kuat', text: 'Di hari yang berat pun kamu masih memilih untuk berdiri dan melanjutkan langkah.' },
    { emoji: '✨', title: 'Karena kamu baik', text: 'Tidak perlu jadi siapa-siapa. Jadi diri sendiri saja sudah cukup istimewa.' },
  ],

  littleNotes: [
    'Kalau mau, tiup lilinnya dulu sebelum baca ucapan. Jangan lupa tutup mata dan buat harapan.',
    'Tulis pesan di bagian ucapan, satu kalimat sangat berarti dan penuh kebahagiaan.',
    'Semua kejutan ini dibuat khusus untuk kamu di hari yang spesial ini, semoga suka ya.',
  ],

  messageTemplates: [
    { label: 'Selamat', text: 'Selamat ulang tahun! Semoga harimu sehangat senyummu dan penuh kejutan manis.' },
    { label: 'Doa', text: 'Semoga kamu selalu sehat, panjang umur, lapang rexeki dan dilimpahi hal-hal baik di usia yang baru ini.' },
    { label: 'Harapan', text: 'Semoga semua yang kamu impikan pelan-pelan jadi nyata, dan selalu menemukan kebahagian!' },
    { label: 'Santai', text: 'Selamat ultah ya! jangan lupa tiup lilin 🎂' },
  ],

  galleryImages: [
    { id: 1, src: 'images/ai/gallery-1.svg', w: 1200, h: 800 },
    { id: 2, src: 'images/ai/gallery-2.svg', w: 1200, h: 800 },
    { id: 3, src: 'images/ai/gallery-3.svg', w: 1200, h: 800 },
    { id: 4, src: 'images/ai/gallery-4.svg', w: 1200, h: 800 },
  ],

  // ============================================================
  //  JUDUL SETIAP BAGIAN (HEADING)
  //  top      = baris pertama (huruf biasa)
  //  emphasis = baris kedua (miring + warna pink)
  //  kicker   = label kecil di atas judul
  //  sub      = kalimat penjelas di bawah judul (kalau ada)
  //  Tulis {name} di dalam sub untuk otomatis memakai nama penerima.
  // ============================================================
  sectionHeadings: {
    reasons: {
      kicker: 'A LITTLE ABOUT YOU',
      top: 'Beberapa alasan',
      emphasis: 'kamu istimewa.',
      sub: 'Tidak perlu panjang. Cukup yang paling sering bikin kami senyum.',
    },
    notes: {
      kicker: 'BEFORE YOU SCROLL',
      top: 'Catatan kecil,',
      emphasis: 'biar makin seru.',
    },
    gallery: {
      kicker: 'LITTLE FRAMES',
      top: 'Momen yang bikin',
      emphasis: 'selalu senyum.',
    },
    messages: {
      kicker: 'WALL OF WISHES',
      top: 'Tinggalkan',
      emphasis: 'ucapan manis.',
      sub: 'Satu kalimat dari kamu bisa jadi hadiah paling berharga buat {name}.',
    },
  },
};

// Avatar placeholder baru.
export const avatars = [
  { id: 'boy-1', gender: 'Cowok', src: 'images/ai/avatar-boy-1.svg', label: 'Cowok 1' },
  { id: 'boy-2', gender: 'Cowok', src: 'images/ai/avatar-boy-2.svg', label: 'Cowok 2' },
  { id: 'boy-3', gender: 'Cowok', src: 'images/ai/avatar-boy-3.svg', label: 'Cowok 3' },
  { id: 'boy-4', gender: 'Cowok', src: 'images/ai/avatar-boy-4.svg', label: 'Cowok 4' },
  { id: 'boy-5', gender: 'Cowok', src: 'images/ai/avatar-boy-5.svg', label: 'Cowok 5' },
  { id: 'girl-1', gender: 'Cewek', src: 'images/ai/avatar-girl-1.svg', label: 'Cewek 1' },
  { id: 'girl-2', gender: 'Cewek', src: 'images/ai/avatar-girl-2.svg', label: 'Cewek 2' },
  { id: 'girl-3', gender: 'Cewek', src: 'images/ai/avatar-girl-3.svg', label: 'Cewek 3' },
  { id: 'girl-4', gender: 'Cewek', src: 'images/ai/avatar-girl-4.svg', label: 'Cewek 4' },
  { id: 'girl-5', gender: 'Cewek', src: 'images/ai/avatar-girl-5.svg', label: 'Cewek 5' },
];

// Pilihan warna untuk kartu ucapan — semuanya masih dalam nuansa pink.
export const accentColors = ['#FF2E88', '#FF6FB5', '#FF9CCB', '#FFC2DC', '#C2185B', '#FFD86B'];

// ============================================================
//  TEKS BERJALAN DI PALING ATAS (TICKER)
//  Diisi otomatis dari name / age / dateText di atas.
//  Mau kalimat lain? Tinggal ganti isi array di bawah ini.
//  Tanda ♥ ditambahkan otomatis oleh komponen Ticker.
// ============================================================
siteData.tickerItems = [
  `HAPPY BIRTHDAY ${siteData.name.toUpperCase()}`,
  `TURNING ${siteData.age} ✦`,
  siteData.dateText.toUpperCase(),
  'MAKE A WISH',
  'BIRTHDAY SURPRISE',
];
