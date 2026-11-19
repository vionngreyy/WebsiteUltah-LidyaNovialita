# Web Ucapan Ulang Tahun — Pink Edition

Website ucapan selamat ulang tahun yang **tinggal dipakai ulang** untuk penerima mana pun.

Fitur: teks berjalan di paling atas, halaman pembuka, musik, hitung mundur, kue yang bisa ditiup, kartu "alasan istimewa", galeri + lightbox, dan dinding ucapan pengunjung. **Tidak ada lokasi/maps. Tidak perlu GitHub. Tidak ada kunci Supabase yang ikut terkirim.**

Semua penjelasan ada di file ini — tidak ada panel petunjuk di dalam website, supaya tampilan tetap bersih untuk pengunjung.

**Data pribadi sudah dibersihkan.** Tidak ada kunci Supabase, riwayat Git,
nama/ucapan lama, foto lama, atau kode pemilik lama di folder ini. Semua nilai
sengaja dibuat **placeholder netral** dan wajib diisi oleh penerima.

---

## 1. Cara menjalankan web ini (baca ini dulu)

### A. Kalau `node_modules/` ikut dikirim

Buka terminal/CMD di dalam folder proyek, lalu:

```powershell
npm.cmd run dev
```

Buka alamat yang muncul, biasanya `http://localhost:5173`.

### B. Kalau `node_modules/` tidak ikut dikirim

```powershell
npm.cmd install
npm.cmd run dev
```

`npm.cmd install` hanya perlu dijalankan sekali di komputer baru.

### C. Mau melihat hasil jadi (versi produksi)

```powershell
npm.cmd run build
npm.cmd run preview
```

Hasil build ada di folder `dist/`. Isi folder itu bisa diunggah ke hosting statis mana pun.

> **Penting:** jangan klik dua kali `dist/index.html` dari Windows Explorer. Browser memblokir JavaScript modul lewat alamat `file://`. Pakai `npm.cmd run preview` atau hosting statis.

### D. Kalau folder ini dikirim ke orang lain

Cukup kirim folder proyeknya (boleh di-zip). Tidak ada urusan GitHub / Vercel.

| Yang dikirim | Cara di komputer penerima |
| --- | --- |
| Folder lengkap, termasuk `node_modules/` | `npm.cmd run dev` |
| Tanpa `node_modules/` | `npm.cmd install`, lalu `npm.cmd run dev` |
| Mau langsung lihat hasil jadi | `npm.cmd run build`, lalu `npm.cmd run preview` |

Yang **tidak perlu dikirim**: folder `.git/`, `.vscode/`, dan `node_modules/` kalau mau ukuran lebih kecil. Kalau `node_modules/` tidak ikut, penerima cukup menjalankan `npm.cmd install`.

---

## 2. Peta file — ini ada di mana

| File / folder | Isi / fungsi |
| --- | --- |
| `src/data/siteData.js` | **Paling penting.** Nama, umur, tanggal, semua teks, foto, musik, dan teks ticker |
| `src/components/Ticker.jsx` | Menampilkan teks berjalan di paling atas (isinya diatur dari `siteData.js`) |
| `src/components/Countdown.jsx` | Hitung mundur / status "Happy Birthday" |
| `src/components/Confetti.jsx` | Efek confetti saat gate dibuka & lilin ditiup |
| `src/App.jsx` | Susunan halaman: gate, hero, countdown, kue, galeri, ucapan, penutup |
| `src/components/sections/StorySection.jsx` | Kartu alasan + catatan kecil |
| `src/components/sections/GallerySection.jsx` | Galeri + lightbox |
| `src/components/sections/MessagesSection.jsx` | Form & dinding ucapan |
| `src/styles.css` | Warna, ukuran, animasi, dan tampilan responsif semua device |
| `index.html` | Judul tab, meta, dan tampilan sementara sebelum React dimuat |
| `public/images/ai/` | Semua foto & avatar |
| `public/music/background.mp3` | Lagu yang diputar saat tombol **Buka Ucapan** |
| `src/lib/guestbookApi.js` | Penyimpanan ucapan (lokal / Supabase) + kode pemilik lokal |
| `.env.example` | Contoh kosong untuk kunci Supabase (kalau nanti mau dipakai) |
| `vite.config.js` | Pengaturan build (sudah memakai path relatif, aman dipindah) |

File `.env` **sengaja tidak disertakan kuncinya**. Kalau tidak diisi, web tetap jalan memakai mode lokal.

---

## 3. Ringkasan cepat — ganti apa, di mana, caranya

| Mau ganti | Buka | Caranya |
| --- | --- | --- |
| Nama, umur, tahun | `src/data/siteData.js` | Ubah `name`, `age`, `year` |
| Tanggal & hitung mundur | `src/data/siteData.js` | Ubah `birthdayDate` (format ISO) dan `dateText` |
| Tulisan bergerak di paling atas | `src/data/siteData.js` | Ubah `name`/`age`/`dateText` (otomatis ikut), atau edit `tickerItems` di baris paling bawah |
| Teks ucapan, kartu, template | `src/data/siteData.js` | Ubah `intro`, `heroText`, `wishText`, `quote`, `reasons`, `littleNotes`, `messageTemplates` |
| Judul bagian (heading) | `src/data/siteData.js` | Ubah `sectionHeadings` — lihat **bagian 6.1** di bawah |
| Foto utama, galeri, avatar | `public/images/ai/` + `src/data/siteData.js` | Taruh gambar baru di folder, lalu ubah `heroImage`, `galleryImages`, `avatars` |
| Lagu | `public/music/` + `src/data/siteData.js` | Timpa `background.mp3`, atau ubah baris `music` |
| Warna pink | `src/styles.css` | Ubah `--hot`, `--soft`, `--soft-2` di `:root` |
| Judul tab | `index.html` | Ubah `<title>` dan meta `og:title` |
| Kode pemilik (mode lokal) | `src/lib/guestbookApi.js` | Ubah `GANTI_KODE_PEMILIK` |
| Ucapan online (opsional) | `.env` + Supabase | Ikuti bagian **11** di bawah |

---

## 4. Ganti nama, umur, dan tanggal (paling sering)

Buka `src/data/siteData.js`, bagian paling atas:

```js
name: 'Lidya',
age: '24',
year: '2026',

birthdayDate: '2026-11-26T00:00:00+07:00',
dateText: '26 November 2026',
shortDate: '26.11.2026',
```

Contoh untuk penerima **Rina**, umur 25, tanggal 20 Januari 2027:

```js
name: 'Rina',
age: '25',
year: '2027',

birthdayDate: '2027-01-20T00:00:00+07:00',
dateText: '20 Januari 2027',
shortDate: '20.01.2027',
```

Penjelasan:

- `name` → muncul di ticker, halaman pembuka, hero, ucapan, balasan pemilik, dan penutup.
- `age` → angka badge "KE-", hero, dan ticker "TURNING 24".
- `year` → tahun di kicker, brand, dan copyright.
- `birthdayDate` → dipakai **hitung mundur**. Format ISO: `TAHUN-BULAN-HARIJam:Menit:Detik+07:00`. Saat waktu tercapai, countdown berubah jadi "Happy Birthday, {name}!".
- `dateText` → tulisan tanggal yang dibaca orang (hero dan ticker).
- `shortDate` → versi pendek (`26.11.2026`) untuk badge kecil.

Dua baris opsional di file yang sama:

```js
instagram: 'https://www.instagram.com/',
whatsapp: 'https://wa.me/',
```

Isi dengan tautan penerima, atau biarkan apa adanya kalau tidak dipakai.

Simpan file, lalu refresh browser.

---

## 5. Ganti teks berjalan di paling atas (TICKER)

Yang terlihat di bagian paling atas:

```
♥ HAPPY BIRTHDAY LIDYA ♥ TURNING 24 ✦ ♥ 26 NOVEMBER 2026 ♥ MAKE A WISH ♥ BIRTHDAY SURPRISE ♥ ...
```

Teksnya ada di **paling bawah** `src/data/siteData.js`:

```js
siteData.tickerItems = [
  `HAPPY BIRTHDAY ${siteData.name.toUpperCase()}`,
  `TURNING ${siteData.age} ✦`,
  siteData.dateText.toUpperCase(),
  'MAKE A WISH',
  'BIRTHDAY SURPRISE',
];
```

- **Cuma ganti nama / umur / tanggal** → tidak perlu menyentuh ini. Tiga baris pertama otomatis mengikuti `name`, `age`, `dateText`.
- **Mau kalimat lain** → ubah isi array-nya:

```js
siteData.tickerItems = [
  'SELAMAT ULANG TAHUN RINA',
  'TURNING 25 ✦',
  '20 JANUARI 2027',
  'HAPPY HAPPY BIRTHDAY',
  'MAKE A WISH',
];
```

Catatan: tanda **♥** ditambahkan otomatis (jangan ditulis manual), teks otomatis kapital, dan urutannya diulang supaya laju tidak putus. Kalau array dikosongkan, web memakai teks bawaan.

---

## 6. Ganti semua teks yang tampil di halaman

Masih di `src/data/siteData.js`:

| Bagian di file | Muncul di mana |
| --- | --- |
| `intro` | Paragraf halaman pembuka sebelum tombol **Buka Ucapan** |
| `heroText` | Paragraf hero, di bawah "Selamat ulang tahun, {name}!" |
| `wishText` | Paragraf kartu kue, dekat tombol **Tiup Lilin** |
| `quote` | Paragraf penutup berwarna pink |
| `reasons` | 4 kartu "Beberapa alasan kamu istimewa" |
| `littleNotes` | 3 catatan kecil sebelum galeri |
| `messageTemplates` | Tombol cepat di form ucapan (Selamat / Doa / Harapan / Santai) |
| `accentColors` | Pilihan warna kartu ucapan |

Contoh:

```js
reasons: [
  { emoji: '🌷', title: 'Karena kamu tulus', text: 'Cara kamu peduli bikin semua orang nyaman.' },
  { emoji: '🎈', title: 'Karena kamu seru', text: 'Tawa kamu selalu bikin hari lebih ringan.' },
  { emoji: '💗', title: 'Karena kamu kuat', text: 'Kamu selalu bangkit di hari yang berat.' },
  { emoji: '✨', title: 'Karena kamu kamu', text: 'Jadi diri sendiri sudah cukup istimewa.' },
],
```

Ucapan yang diketik pengunjung tidak ada di sini — itu masuk ke dinding ucapan.

### 6.1 Cara mengganti judul bagian (heading)

Judul-judul besar ini juga ada di `src/data/siteData.js`, tepat di dalam blok
`sectionHeadings`:

| Yang terlihat di web | Diubah lewat |
| --- | --- |
| "Beberapa alasan / kamu istimewa." | `sectionHeadings.reasons.top` dan `.emphasis` |
| "Catatan kecil, / biar makin seru." | `sectionHeadings.notes.top` dan `.emphasis` |
| "Momen yang bikin / kami senyum." | `sectionHeadings.gallery.top` dan `.emphasis` |
| "Tinggalkan / ucapan manis." | `sectionHeadings.messages.top` dan `.emphasis` |
| "Satu kalimat dari kamu bisa jadi hadiah paling berharga buat Lidya." | `sectionHeadings.messages.sub` |

Potongan aslinya (sudah sesuai web sekarang):

```js
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
    emphasis: 'kami senyum.',
  },
  messages: {
    kicker: 'WALL OF WISHES',
    top: 'Tinggalkan',
    emphasis: 'ucapan manis.',
    sub: 'Satu kalimat dari kamu bisa jadi hadiah paling berharga buat {name}.',
  },
},
```

Arti tiap baris:

- `top` → baris **pertama** judul (huruf biasa).
- `emphasis` → baris **kedua** judul (otomatis jadi miring dan pink).
- `kicker` → label kecil huruf kapital di atas judul, misalnya `A LITTLE ABOUT YOU`. Boleh diganti, atau dikosongkan jadi `''` kalau tidak mau muncul.
- `sub` → kalimat penjelas di bawah judul. Dipakai di `reasons` dan `messages` saja.

Judul otomatis terputus menjadi dua baris di web, jadi **jangan menulis `<br />` sendiri**. Cukup isi `top` dan `emphasis`.

Contoh: mau judulnya jadi "Kenapa kamu / spesial banget?" dan kalimat bawahnya diganti:

```js
reasons: {
  kicker: 'KENAPA KAMU',
  top: 'Kenapa kamu',
  emphasis: 'spesial banget?',
  sub: 'Ini daftar kecil saja, kok.',
},
```

Pada `messages.sub`, tulis **`{name}`** kalau ingin nama penerima ikut otomatis. Karena `name: 'Lidya'`, kalimatnya terbaca "...hadiah paling berharga buat Lidya." — jadi tidak perlu mengetik namanya manual di dalam kalimat. Kalau mau kalimat tanpa nama, hapus `{name}`-nya saja.

Aturan penting supaya web tidak error:

- Teks tetap di dalam tanda kutip satu `'...'`.
- Kalau teksnya mengandung tanda kutip (misalnya `'`), pakai tanda kutip dua `"..."` di luarnya.
- Tiap baris diakhiri koma `,`, dan kurung kurawal `{` `}` jangan dihapus.
- Simpan file, lalu refresh browser. Kalau memakai `npm.cmd run dev`, biasanya langsung berubah sendiri (hot reload).

---

## 7. Ganti foto dan avatar

Semua gambar ada di `public/images/ai/`:

| Nama file | Muncul di |
| --- | --- |
| `hero.svg` | Foto utama hero (juga gambar saat link dibagikan) |
| `gallery-1.svg` s.d. `gallery-4.svg` | 4 foto galeri + tampilan besar |
| `avatar-boy-1.svg` s.d. `avatar-boy-5.svg` | Avatar di form ucapan |
| `avatar-girl-1.svg` s.d. `avatar-girl-5.svg` | Avatar di form ucapan |

Sekarang semuanya masih **placeholder SVG sementara**. Ada dua cara ganti:

**Cara A — timpa nama file yang sama**
Taruh gambar dengan nama sama di `public/images/ai/`. Kalau ekstensinya berubah (misal `.jpg`), ubah juga path-nya di `siteData.js`.

**Cara B — pakai nama sendiri (direkomendasikan)**

```js
heroImage: 'images/ai/foto-rina.jpg',

galleryImages: [
  { id: 1, src: 'images/ai/foto-1.jpg', w: 1600, h: 1200 },
  { id: 2, src: 'images/ai/foto-2.jpg', w: 1600, h: 900 },
  { id: 3, src: 'images/ai/foto-3.jpg', w: 1600, h: 1200 },
  { id: 4, src: 'images/ai/foto-4.jpg', w: 1600, h: 1067 },
],
```

Angka `w` dan `h` boleh perkiraan (cuma mencegah gambar loncat saat dimuat).

Untuk avatar, ganti `src` pada array `avatars` di file yang sama. **ID-nya** (`boy-1`, `girl-1`, …) **jangan diganti**, karena dipakai ucapan lama.

---

## 8. Ganti musik

File lagu: `public/music/background.mp3`.

Cara paling mudah: timpa isi file itu dengan lagu lain yang tetap bernama `background.mp3`. Kalau nama beda, ubah di `siteData.js`:

```js
music: 'music/background.mp3',
```

Musik mulai diputar saat pengunjung menekan **Buka Ucapan**, dan bisa dimatikan/dinyalakan lewat tombol bundar di kanan bawah.

---

## 9. Ganti warna pink

Di `src/styles.css`, bagian `:root`:

```css
--hot: #ff2e88;       /* pink cerah: tombol, kue, aksen */
--hot-deep: #d9166b;  /* pink tua: teks supaya terbaca */
--soft: #ffc2dc;      /* pink soft: badge & kartu */
--soft-2: #ffe0ec;    /* pink sangat soft: latar kartu */
--blush: #fff5f9;     /* latar halaman */
--ink: #40142d;       /* warna teks gelap */
```

Ganti `--hot`, `--soft`, `--soft-2` kalau mau nuansa lain. Warna kartu yang bisa dipilih pengunjung ada di `accentColors` (`siteData.js`).

Tampilan sudah responsif untuk HP kecil sampai layar besar: navigasi bawah muat di lebar 320px, nama panjang tidak meluber, lightbox tidak melebihi layar, dan halaman pembuka bisa digulir kalau layar pendek.

---

## 10. Ganti judul tab dan tampilan awal

Buka `index.html`:

```html
<title>Happy Birthday! 🎂</title>
<meta name="description" content="Ucapan selamat ulang tahun — ..." />
<meta property="og:title" content="Happy Birthday! 🎂" />
<meta property="og:image" content="./images/ai/hero.svg" />
```

Teks sementara sebelum React dimuat sengaja dibuat umum (`SURPRISE`, `MEMUAT UCAPAN ✦ BIRTHDAY SURPRISE`) supaya tidak menampilkan nama lama. Tidak perlu diganti kecuali mau kalimat lain.

---

## 11. Dinding ucapan: lokal (default) atau online (opsional)

### 11.1 Mode lokal — langsung jalan, tanpa apa pun

Karena kunci Supabase **tidak ikut dikirim**, web otomatis memakai mode lokal:

- Ucapan tersimpan di browser masing-masing (localStorage).
- Cocok untuk dibuka satu perangkat / dicoba dulu.
- Tulisan di form: **"Mode lokal: ucapan tersimpan di browser perangkat ini."**
- Kode pemilik lokal default: `GANTI_KODE_PEMILIK` di `src/lib/guestbookApi.js`. Ganti kalau mau.

### 11.2 Mode online — nanti yang pasang sendiri (opsional)

Kalau mau ucapan terkumpul di semua perangkat, siapa pun yang menerima folder bisa memasangnya sendiri dengan langkah ini.

**Langkah 1 — buat project di Supabase**, lalu buka **SQL Editor** dan jalankan seluruh SQL ini:

```sql
-- 1. Tabel ucapan
create table if not exists public.messages (
  id bigint generated by default as identity primary key,
  name text not null,
  message text not null,
  avatar text not null,
  accent text not null,
  template_tag text,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

create policy "public can read messages"
on public.messages for select using (true);

create policy "public can send messages"
on public.messages for insert with check (
  char_length(name) between 1 and 40
  and char_length(message) between 1 and 400
);

grant select, insert on public.messages to anon, authenticated;

-- 2. Tabel balasan pemilik
create table if not exists public.replies (
  message_id bigint primary key references public.messages(id) on delete cascade,
  reply text not null,
  created_at timestamptz not null default now()
);

alter table public.replies enable row level security;

create policy "public can read replies"
on public.replies for select using (true);

grant select on public.replies to anon, authenticated;

-- 3. Kode pemilik (GANTI string di bawah dengan kode rahasia sendiri)
create table if not exists public.owner_config (
  id boolean primary key default true check (id),
  code text not null
);

insert into public.owner_config (id, code)
values (true, 'GANTI_DENGAN_KODE_KAMU')
on conflict (id) do update set code = excluded.code;

alter table public.owner_config enable row level security;
revoke all on public.owner_config from anon, authenticated;

-- 4. Cek kode pemilik
create or replace function public.verify_owner(code text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  return exists (
    select 1 from public.owner_config oc
    where oc.id = true and oc.code = code
  );
end;
$$;

-- 5. Simpan / ubah balasan
create or replace function public.add_reply(msg_id bigint, reply_text text, code text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.verify_owner(code) then
    raise exception 'Kode pemilik salah';
  end if;
  if char_length(reply_text) < 1 or char_length(reply_text) > 400 then
    raise exception 'Balasan maksimal 400 karakter';
  end if;
  insert into public.replies (message_id, reply)
  values (msg_id, reply_text)
  on conflict (message_id) do update
    set reply = excluded.reply, created_at = now();
end;
$$;

grant execute on function public.verify_owner(text) to anon, authenticated;
grant execute on function public.add_reply(bigint, text, text) to anon, authenticated;
```

> Ganti `GANTI_DENGAN_KODE_KAMU` dengan kode pemilik yang diinginkan. Kode ini dipakai di tombol **Mode pemilik** untuk membalas ucapan.

**Langkah 2 — ambil kunci dari Supabase**

Di dashboard: **Project Settings → API**, ambil **Project URL** dan **anon/public key**.

**Langkah 3 — buat file `.env` di root proyek**

Salin `.env.example` menjadi `.env`, lalu isi:

```env
VITE_SUPABASE_URL=https://PROJECT-ID.supabase.co
VITE_SUPABASE_ANON_KEY=ANON_KEY_DARI_SUPABASE
```

**Langkah 4 — restart server**

```powershell
Ctrl + C
npm.cmd run dev
```

Tulisan di form berubah jadi **"Ucapan tersimpan online dan terlihat di semua perangkat."**

**Langkah 5 — kalau diunggah ke hosting**

Dua baris dari `.env` harus dimasukkan lagi lewat menu *Environment Variables* hosting tersebut. Tanpa itu, web kembali ke mode lokal. Setelah mengubah `.env`, jalankan ulang `npm.cmd run build`.

**Menghapus ucapan:** buka **Supabase → Table Editor → messages**, pilih row yang tidak diinginkan, hapus. Tidak perlu halaman admin.

---

## 12. Checklist sebelum web dikirim

- [ ] `name`, `age`, `year`, `birthdayDate`, `dateText`, `shortDate` sudah diganti
- [ ] Teks berjalan di atas dicek (lihat `tickerItems`)
- [ ] `intro`, `heroText`, `wishText`, `quote` sudah diganti
- [ ] `reasons`, `littleNotes`, `messageTemplates` sesuai penerima
- [ ] Judul bagian di `sectionHeadings` dicek (lihat **6.1**) — termasuk kalimat "...hadiah paling berharga buat {name}"
- [ ] Foto hero + 4 galeri + avatar sudah diganti
- [ ] Musik sudah diganti
- [ ] Judul tab di `index.html` dicek
- [ ] Kode pemilik lokal diganti (atau kode Supabase disiapkan kalau pakai online)
- [ ] Tidak ada kunci Supabase di folder (mode lokal=jalan, online=isi `.env` sendiri)
- [ ] `npm.cmd run build` sukses, lalu buka hasilnya di HP

---

## 13. Ringkasnya

Kalau hanya ingin menyiapkan web untuk orang lain:

1. Buka `src/data/siteData.js`
2. Ganti `name`, `age`, `year`, `birthdayDate`, `dateText`
3. Cek `tickerItems` di baris paling bawah
4. Ganti semua teks (`intro`, `heroText`, `wishText`, `quote`, `reasons`, dll.) dan judul bagian di `sectionHeadings` (lihat **6.1**)
5. Ganti foto di `public/images/ai/` dan lagu di `public/music/`
6. `npm.cmd run dev` untuk cek, lalu `npm.cmd run build` kalau mau hasil jadi
7. Kirim foldernya. Penerima tinggal `npm.cmd install` (kalau perlu) lalu `npm.cmd run dev`

Semua perubahan teks ada di `siteData.js`. Tidak perlu menyentuh komponen React kecuali mau mengubah fungsi/struktur halaman.
