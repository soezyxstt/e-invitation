/**
 * Seed demo lengkap — satu contoh per tier, siap pakai.
 *
 *   bun prisma/seed-example.ts
 *
 * Idempoten: aman dijalankan berulang kali.
 * Setiap run akan menghapus undangan lama (cascade) lalu membuat ulang yang baru.
 *
 * Akun admin:  username: admin  /  password: admin123
 *
 * URL Undangan:
 *   Tier 1 — /demo-simpel?to=Bapak+Diding
 *   Tier 2 — /demo-geulis?to=Ibu+Neneng
 *   Tier 3 — /demo-kasep?to=Kang+Ujang
 *   Tier 4 — /demo-sultan?to=Bapak+H.+Cecep
 */

import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import bcrypt from "bcrypt";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Public Unsplash photo URL — no auth needed, whitelisted in next.config.ts */
function u(photoId: string, width = 1200): string {
  return `https://images.unsplash.com/${photoId}?w=${width}&q=85&auto=format&fit=crop`;
}

// ── Ayat pembuka standar undangan nikah ──────────────────────────────────────

const QS_AR_RUM_21 =
  "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً — Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari dirimu sendiri, agar kamu merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. (Q.S. Ar-Rum: 21)";

const BISMILLAH_SUNDA =
  "Bismillahirrahmanirrahim. Kalayan nyebut asma Allah Nu Maha Welas Asih, kami ngahaturkeun uleman ka Bapa/Ibu/Saderek sadayana kanggo ngiringan mangsa bingah kami dina acara walimatul ursy putra/putri kami.";

// ── Galeri foto — pool 10 foto pernikahan publik dari Unsplash ──────────────
// Format: { id: Unsplash photo ID, alt: teks alternatif }

const GALLERY: { id: string; alt: string }[] = [
  { id: "photo-1519741497674-611481863552", alt: "Momen kebersamaan pengantin" },
  { id: "photo-1583939003579-730e3918a45a", alt: "Dekorasi pernikahan elegan" },
  { id: "photo-1465495976277-4387d4b0b4c6", alt: "Prosesi akad nikah" },
  { id: "photo-1469371670807-013ccf25f16a", alt: "Upacara pernikahan outdoor" },
  { id: "photo-1512678080530-7760d81faba6", alt: "Sesi foto romantis" },
  { id: "photo-1530023367847-a683933f4172", alt: "Momen resepsi pernikahan" },
  { id: "photo-1511285560929-80b456fea0bc", alt: "Cincin pernikahan" },
  { id: "photo-1537633552985-df8429e8048b", alt: "Bunga pengantin" },
  { id: "photo-1550761557-cbba0db11aa8", alt: "Rangkaian bunga pernikahan" },
  { id: "photo-1510279775229-4b08b20eb428", alt: "Potret kedua mempelai" },
];

/**
 * Musik latar instrumental bebas royalti (demo).
 *
 * Untuk produksi, upload lagu ke Uploadthing dan ganti URL di bawah.
 * Rekomendasi lagu pernikahan populer untuk demo:
 *   - "Beautiful in White" – Westlife
 *   - "Akad" – Payung Teduh
 *   - "Nikah" – Juicy Luicy
 *   - "A Thousand Years" – Christina Perri
 *   - "Marry Me" – Train
 *
 * Catatan: lagu di atas berhak cipta. Upload ke Uploadthing hanya
 * untuk penggunaan pribadi / demo internal, bukan distribusi publik.
 */
const DEMO_MUSIC_URL =
  "https://cdn.pixabay.com/audio/2024/11/28/audio_1e75a41093.mp3";

// ── Seed data undangan ───────────────────────────────────────────────────────

interface TimelineSeed {
  date: string;
  title: string;
  description?: string;
  sortOrder: number;
}

interface InvitationSeed {
  timeline?: TimelineSeed[];
  slug: string;
  tierId: number;
  title: string;
  status: "PUBLISHED" | "DRAFT";
  groomName: string;
  brideName: string;
  groomParentsLine: string;
  brideParentsLine: string;
  groomChildOrder: string;
  brideChildOrder: string;
  eventDate: Date;
  venueName: string;
  venueAddress: string;
  mapUrl: string;
  openingReligiousText: string;
  basaSundaLemesKey: string | null;
  heroPhotoId: string;
  galleryCount: number; // 0 = Tier 1 (no gallery)
  hasMusic: boolean;
  /** Unsplash photo ID for groom portrait (Tier 2+). Omit to skip. */
  groomPortraitPhotoId?: string;
  /** Unsplash photo ID for bride portrait (Tier 2+). Omit to skip. */
  bridePortraitPhotoId?: string;
  rsvps: {
    guestName: string;
    attendance: "ATTENDING" | "DECLINED" | "MAYBE";
    message?: string;
    partySize: number;
  }[];
}

const INVITATIONS: InvitationSeed[] = [
  // ─── Tier 1 — Simpel ─────────────────────────────────────────────────────
  {
    slug: "demo-simpel",
    tierId: 1,
    title: "Pernikahan Asep & Siti",
    status: "PUBLISHED",
    groomName: "H. Asep Saepudin, S.T.",
    brideName: "dr. Siti Nurhalimah",
    groomParentsLine: "Putra Bpk. H. Dede Sopyan & Ibu Hj. Neng Ruheni",
    brideParentsLine: "Putri Bpk. H. Ujang Sutisna & Ibu Hj. Tati Rohaeti",
    groomChildOrder: "Putra pertama",
    brideChildOrder: "Putri kedua",
    eventDate: new Date("2026-08-15T08:00:00+07:00"),
    venueName: "Gedung Serbaguna Tirta Kencana",
    venueAddress: "Jl. Ahmad Yani No. 45, Garut Kota, Jawa Barat 44151",
    mapUrl: "https://maps.google.com/?q=-7.2167,107.9069",
    openingReligiousText: QS_AR_RUM_21,
    basaSundaLemesKey: "sunda_lemes",
    heroPhotoId: "photo-1519741497674-611481863552",
    galleryCount: 0,
    hasMusic: false,
    rsvps: [
      { guestName: "Bpk. H. Diding Supriyatna", attendance: "ATTENDING", message: "Alhamdulillah, insya Allah hadir. Semoga pernikahan sakinah mawaddah warahmah.", partySize: 2 },
      { guestName: "Ibu Nani Kusnaeni", attendance: "ATTENDING", message: "Selamat menempuh hidup baru, semoga bahagia selalu.", partySize: 3 },
      { guestName: "Kang Andi Firmansyah", attendance: "DECLINED", message: "Mohon maaf tidak bisa hadir, ada urusan mendadak. Semoga lancar acaranya.", partySize: 1 },
    ],
  },

  // ─── Tier 2 — Geulis ─────────────────────────────────────────────────────
  {
    slug: "demo-geulis",
    tierId: 2,
    title: "Pernikahan Farhan & Maya",
    status: "PUBLISHED",
    groomName: "Farhan Maulana Yusuf, S.Kom.",
    brideName: "Maya Rahmawati, S.Pd.",
    groomParentsLine: "Putra Bpk. Yusuf Hidayatulloh & Ibu Hj. Imas Siti Fatimah",
    brideParentsLine: "Putri Bpk. H. Rahmat Hidayat & Ibu Hj. Euis Kurniasih",
    groomChildOrder: "Putra kedua",
    brideChildOrder: "Putri pertama",
    eventDate: new Date("2026-10-17T09:00:00+07:00"),
    venueName: "Villa Cimanggu Indah",
    venueAddress: "Jl. Cimanggu No. 88, Cisarua, Bogor, Jawa Barat 16750",
    mapUrl: "https://maps.google.com/?q=-6.7063,106.9456",
    openingReligiousText: QS_AR_RUM_21,
    basaSundaLemesKey: "sunda_lemes",
    heroPhotoId: "photo-1583939003579-730e3918a45a",
    galleryCount: 6,
    hasMusic: true,
    groomPortraitPhotoId: "photo-1506794778202-cad84cf45f1d",
    bridePortraitPhotoId: "photo-1531746020798-e6953c6e8e04",
    rsvps: [
      { guestName: "Ibu Neneng Sulastri", attendance: "ATTENDING", message: "Tos ditunggu-tunggu pisan. Mugia janten kulawarga sakinah mawaddah warahmah.", partySize: 2 },
      { guestName: "Bpk. Asrul Gunawan", attendance: "ATTENDING", message: "Selamat dan bahagia, semoga menjadi keluarga yang penuh berkah.", partySize: 4 },
      { guestName: "Neng Fitria Handayani", attendance: "ATTENDING", partySize: 1 },
      { guestName: "Kang Hendra Permana", attendance: "MAYBE", message: "Insya Allah akan hadir jika tidak ada halangan.", partySize: 2 },
      { guestName: "Bpk. Cecep Mulyawan", attendance: "DECLINED", message: "Mohon maaf, ada acara keluarga yang tidak bisa ditinggalkan.", partySize: 1 },
    ],
  },

  // ─── Tier 3 — Kasep ──────────────────────────────────────────────────────
  {
    slug: "demo-kasep",
    tierId: 3,
    title: "Pernikahan Rendi & Lilis",
    status: "PUBLISHED",
    groomName: "dr. Rendi Purnama Aji, Sp.JP.",
    brideName: "Hj. Lilis Suryani, S.E., M.M.",
    groomParentsLine: "Putra Bpk. H. Eko Purnomo & Ibu Hj. Sri Wahyuni",
    brideParentsLine: "Putri Bpk. H. Dudi Supriadi & Ibu Hj. Cucum Suminar",
    groomChildOrder: "Putra pertama",
    brideChildOrder: "Putri pertama",
    eventDate: new Date("2026-12-19T10:00:00+07:00"),
    venueName: "Ballroom Hotel Santika Bandung",
    venueAddress: "Jl. Sumatera No. 52-54, Bandung, Jawa Barat 40115",
    mapUrl: "https://maps.google.com/?q=-6.9102,107.6095",
    openingReligiousText: QS_AR_RUM_21,
    basaSundaLemesKey: "sunda_lemes",
    heroPhotoId: "photo-1465495976277-4387d4b0b4c6",
    galleryCount: 8,
    hasMusic: true,
    groomPortraitPhotoId: "photo-1564564321837-a57b7070ac4f",
    bridePortraitPhotoId: "photo-1594824476967-48c8b964273f",
    timeline: [
      { sortOrder: 0, date: "Maret 2021", title: "Pertama Bertemu", description: "Kami pertama kali bertemu di seminar nasional kedokteran di Bandung. Sebuah perkenalan singkat yang ternyata menjadi awal dari segalanya." },
      { sortOrder: 1, date: "Agustus 2021", title: "Mulai Berteman", description: "Dari pertukaran nomor kontak, kami mulai sering berdiskusi tentang dunia medis dan hukum. Persahabatan tulus pun terjalin dengan sendirinya." },
      { sortOrder: 2, date: "Februari 2022", title: "Jadian", description: "Di sebuah taman di tepi Sungai Cikapundung, dengan segenap keberanian ia mengungkapkan perasaannya. Jawaban itu sudah ada di dalam hati sejak lama." },
      { sortOrder: 3, date: "April 2023", title: "Bertemu Keluarga", description: "Untuk pertama kalinya, keluarga kedua belah pihak bertemu dalam sebuah silaturahmi hangat. Restu pun mulai terasa di setiap doa dan senyuman." },
      { sortOrder: 4, date: "Juni 2024", title: "Lamaran", description: "Di antara semerbak bunga mawar dan lantunan shalawat, cincin itu berpindah jari. Janji untuk selamanya pun resmi terucap." },
      { sortOrder: 5, date: "Desember 2026", title: "Hari Pernikahan", description: "Setelah perjalanan panjang penuh makna, hari yang paling dinantikan akhirnya tiba. Semoga pernikahan ini menjadi awal dari kebahagiaan abadi." },
    ],
    rsvps: [
      { guestName: "Prof. Dr. H. Bambang Sulistyo", attendance: "ATTENDING", message: "Semoga menjadi pasangan yang saling melengkapi dan penuh kasih sayang.", partySize: 2 },
      { guestName: "Kol. (Purn.) H. Darmawan Santoso", attendance: "ATTENDING", partySize: 3 },
      { guestName: "Ibu Dr. Hj. Rini Wahyuningsih", attendance: "ATTENDING", message: "Barokallahu lakuma wa baraka alaikuma.", partySize: 2 },
      { guestName: "Bpk. Agus Priyatno, S.H.", attendance: "ATTENDING", partySize: 4 },
      { guestName: "Neng Sari Dewi Lestari", attendance: "ATTENDING", message: "Selamat untuk Teh Lilis, semoga langgeng!", partySize: 1 },
      { guestName: "Kang Iwan Kusnawan", attendance: "MAYBE", message: "Kemungkinan besar hadir, akan konfirmasi lagi sepekan sebelumnya.", partySize: 2 },
      { guestName: "Ibu Hj. Tuti Alawiyah", attendance: "MAYBE", partySize: 1 },
      { guestName: "Bpk. Oman Suherman", attendance: "DECLINED", message: "Mohon maaf, sedang ada tugas luar kota. Selamat untuk keduanya.", partySize: 1 },
    ],
  },

  // ─── Tier 1 — Simpel #2 ──────────────────────────────────────────────────
  {
    slug: "demo-simpel-2",
    tierId: 1,
    title: "Pernikahan Bambang & Wulandari",
    status: "PUBLISHED",
    groomName: "Bambang Sudrajat, S.T.",
    brideName: "Wulandari Kusuma, A.Md.",
    groomParentsLine: "Putra Bpk. H. Surya Sudrajat & Ibu Hj. Eem Suryani",
    brideParentsLine: "Putri Bpk. Karna Wijaya & Ibu Nenih Suryatna",
    groomChildOrder: "Putra ketiga",
    brideChildOrder: "Putri pertama",
    eventDate: new Date("2026-09-05T09:00:00+07:00"),
    venueName: "Aula Masjid Agung Garut",
    venueAddress: "Jl. Ciledug No. 284, Garut Kota, Jawa Barat 44111",
    mapUrl: "https://maps.google.com/?q=-7.2128,107.9090",
    openingReligiousText: QS_AR_RUM_21,
    basaSundaLemesKey: "sunda_lemes",
    heroPhotoId: "photo-1469371670807-013ccf25f16a",
    galleryCount: 0,
    hasMusic: false,
    rsvps: [
      { guestName: "Bpk. H. Entis Sutisna", attendance: "ATTENDING", message: "Mugia janten rumah tangga nu sakinah mawaddah warahmah.", partySize: 2 },
      { guestName: "Ibu Ai Rohaeni", attendance: "ATTENDING", message: "Selamat menikah, semoga bahagia dunia akhirat.", partySize: 3 },
      { guestName: "Kang Dudi Gunawan", attendance: "MAYBE", partySize: 2 },
    ],
  },

  // ─── Tier 1 — Simpel #3 ──────────────────────────────────────────────────
  {
    slug: "demo-simpel-3",
    tierId: 1,
    title: "Pernikahan Yudi & Pipih",
    status: "PUBLISHED",
    groomName: "Yudi Firmansyah",
    brideName: "Pipih Sopiah",
    groomParentsLine: "Putra Bpk. Tatang Firmansyah & Ibu Imas Komalasari",
    brideParentsLine: "Putri Bpk. Adang Supriadi & Ibu Dedeh Rohaeti",
    groomChildOrder: "Putra kedua",
    brideChildOrder: "Putri kedua",
    eventDate: new Date("2026-07-20T08:00:00+07:00"),
    venueName: "Gedung Serbaguna Bumi Asri",
    venueAddress: "Jl. Papandayan No. 12, Tarogong Kidul, Garut, Jawa Barat 44151",
    mapUrl: "https://maps.google.com/?q=-7.2267,107.9008",
    openingReligiousText: QS_AR_RUM_21,
    basaSundaLemesKey: null,
    heroPhotoId: "photo-1530023367847-a683933f4172",
    galleryCount: 0,
    hasMusic: false,
    rsvps: [
      { guestName: "Pak Ujang Hermawan", attendance: "ATTENDING", message: "Selamat dan bahagia semoga langgeng.", partySize: 4 },
      { guestName: "Bu Cicih Nurhayati", attendance: "ATTENDING", partySize: 2 },
      { guestName: "Aa Roni Saputra", attendance: "DECLINED", message: "Maaf teu tiasa hadir, aya acara keluarga.", partySize: 1 },
    ],
  },

  // ─── Tier 2 — Geulis #2 ──────────────────────────────────────────────────
  {
    slug: "demo-geulis-2",
    tierId: 2,
    title: "Pernikahan Ridwan & Dewi",
    status: "PUBLISHED",
    groomName: "Ridwan Kamil Saputra, S.E.",
    brideName: "Dewi Mustika Sari, S.Pd.",
    groomParentsLine: "Putra Bpk. H. Endang Permana & Ibu Hj. Tati Herawati",
    brideParentsLine: "Putri Bpk. H. Usman Fauzi & Ibu Hj. Eti Rochaeti",
    groomChildOrder: "Putra pertama",
    brideChildOrder: "Putri kedua",
    eventDate: new Date("2026-11-08T09:00:00+07:00"),
    venueName: "Puri Cipanas Indah",
    venueAddress: "Jl. Raya Cipanas No. 27, Cipanas, Cianjur, Jawa Barat 43253",
    mapUrl: "https://maps.google.com/?q=-6.7742,107.0527",
    openingReligiousText: QS_AR_RUM_21,
    basaSundaLemesKey: "sunda_lemes",
    heroPhotoId: "photo-1511285560929-80b456fea0bc",
    galleryCount: 7,
    hasMusic: true,
    groomPortraitPhotoId: "photo-1500648767791-00dcc994a43e",
    bridePortraitPhotoId: "photo-1529626455594-4ff0802cfb7e",
    rsvps: [
      { guestName: "Ibu Hj. Cucu Sumarni", attendance: "ATTENDING", message: "Alhamdulillah, insya Allah hadir. Semoga jadi keluarga barokah.", partySize: 2 },
      { guestName: "Bpk. Asep Mulyana, M.Pd.", attendance: "ATTENDING", partySize: 3 },
      { guestName: "Teh Siti Julaeha", attendance: "ATTENDING", message: "Selamat untuk Teh Dewi, semoga sakinah!", partySize: 1 },
      { guestName: "Kang Wahyu Santoso", attendance: "MAYBE", message: "Lagi di luar kota, insya Allah usahakan hadir.", partySize: 2 },
    ],
  },

  // ─── Tier 2 — Geulis #3 ──────────────────────────────────────────────────
  {
    slug: "demo-geulis-3",
    tierId: 2,
    title: "Pernikahan Anton & Sari",
    status: "PUBLISHED",
    groomName: "Anton Hidayat, S.Kom.",
    brideName: "Sari Indah Pertiwi, S.Farm.",
    groomParentsLine: "Putra Bpk. H. Hidayat Nurul Haq & Ibu Hj. Nining Rahayu",
    brideParentsLine: "Putri Bpk. H. Dadan Suhendar & Ibu Hj. Yuyun Yuningsih",
    groomChildOrder: "Putra ketiga",
    brideChildOrder: "Putri pertama",
    eventDate: new Date("2026-12-06T10:00:00+07:00"),
    venueName: "Graha Permai Cikajang",
    venueAddress: "Jl. Cikajang Raya No. 55, Cikajang, Garut, Jawa Barat 44171",
    mapUrl: "https://maps.google.com/?q=-7.3518,107.8004",
    openingReligiousText: BISMILLAH_SUNDA,
    basaSundaLemesKey: "sunda_lemes",
    heroPhotoId: "photo-1537633552985-df8429e8048b",
    galleryCount: 8,
    hasMusic: true,
    groomPortraitPhotoId: "photo-1507003211169-0a1dd7228f2d",
    bridePortraitPhotoId: "photo-1438761681033-6461ffad8d80",
    rsvps: [
      { guestName: "Bpk. Drs. H. Yayan Sofyan", attendance: "ATTENDING", message: "Selamat menempuh hidup baru, semoga diberkahi.", partySize: 2 },
      { guestName: "Ibu Neneng Hasanah", attendance: "ATTENDING", partySize: 4 },
      { guestName: "Teh Rina Marliana", attendance: "ATTENDING", message: "Selamat ya teh, tos katingali bahagia pisan!", partySize: 1 },
      { guestName: "Kang Mulyadi", attendance: "DECLINED", message: "Hapunten teu tiasa hadir, aya tugas luar kota.", partySize: 1 },
    ],
  },

  // ─── Tier 3 — Kasep #2 ───────────────────────────────────────────────────
  {
    slug: "demo-kasep-2",
    tierId: 3,
    title: "Pernikahan Dani & Rini",
    status: "PUBLISHED",
    groomName: "Dani Maulana Akbar, S.T., M.T.",
    brideName: "Rini Astuti Wulandari, S.Psi.",
    groomParentsLine: "Putra Bpk. H. Akbar Jamaludin & Ibu Hj. Nenden Rahmawati",
    brideParentsLine: "Putri Bpk. H. Wawan Setiawan & Ibu Hj. Lia Yuliawati",
    groomChildOrder: "Putra pertama",
    brideChildOrder: "Putri kedua",
    eventDate: new Date("2027-01-25T09:00:00+07:00"),
    venueName: "Ballroom The Jayakarta Bandung",
    venueAddress: "Jl. Ir. H. Juanda No. 381, Dago, Bandung, Jawa Barat 40135",
    mapUrl: "https://maps.google.com/?q=-6.8809,107.6100",
    openingReligiousText: QS_AR_RUM_21,
    basaSundaLemesKey: "sunda_lemes",
    heroPhotoId: "photo-1550761557-cbba0db11aa8",
    galleryCount: 9,
    hasMusic: true,
    groomPortraitPhotoId: "photo-1472099645785-5658abf4ff4e",
    bridePortraitPhotoId: "photo-1494790108377-be9c29b29330",
    timeline: [
      { sortOrder: 0, date: "Januari 2020", title: "Pertama Bertemu", description: "Pertemuan tak terduga di konferensi ilmiah di Bandung membuka lembaran baru. Nama yang sebelumnya hanya dikenal dari karya ilmiah kini hadir sebagai wajah yang menyenangkan." },
      { sortOrder: 1, date: "April 2021", title: "Mulai Dekat", description: "Dari rekan diskusi akademis, hubungan kami tumbuh menjadi persahabatan yang hangat. Tiap percakapan selalu meninggalkan kesan yang tak mudah terlupakan." },
      { sortOrder: 2, date: "September 2021", title: "Resmi Berpacaran", description: "Di sebuah kafe tenang di kawasan Dago, ia menyatakan perasaannya dengan tulus. Hari itu menjadi awal dari babak yang paling indah dalam hidup." },
      { sortOrder: 3, date: "Maret 2023", title: "Bertemu Keluarga", description: "Dua keluarga yang sebelumnya asing kini duduk bersama dalam suasana penuh kehangatan. Restu dan doa mengalir dari setiap sudut ruangan." },
      { sortOrder: 4, date: "Agustus 2024", title: "Lamaran Resmi", description: "Dengan seserahan yang sederhana namun bermakna, ia resmi melamar di hadapan keluarga besar. Air mata kebahagiaan tak bisa dibendung malam itu." },
      { sortOrder: 5, date: "Januari 2027", title: "Hari Pernikahan", description: "Setelah perjalanan penuh cinta dan kesabaran, tibalah hari yang paling dinantikan. Semoga ikatan ini menjadi berkah bagi dua keluarga selamanya." },
    ],
    rsvps: [
      { guestName: "Prof. Dr. H. Iwan Koswara", attendance: "ATTENDING", message: "Selamat dan semoga menjadi pasangan yang saling mendukung.", partySize: 2 },
      { guestName: "Bpk. Ir. Hendra Gunawan", attendance: "ATTENDING", partySize: 3 },
      { guestName: "Dr. Nia Kurniasih, M.Psi.", attendance: "ATTENDING", message: "Barokallah, semoga rumah tangga kalian penuh kebahagiaan.", partySize: 1 },
      { guestName: "Bpk. Asrul Ramdhani", attendance: "MAYBE", message: "Insya Allah akan hadir.", partySize: 2 },
      { guestName: "Ibu Titi Sumiati", attendance: "DECLINED", message: "Mohon maaf, ada keperluan keluarga mendadak.", partySize: 1 },
    ],
  },

  // ─── Tier 3 — Kasep #3 ───────────────────────────────────────────────────
  {
    slug: "demo-kasep-3",
    tierId: 3,
    title: "Pernikahan Heri & Tina",
    status: "PUBLISHED",
    groomName: "Heri Setiawan, S.H., M.H.",
    brideName: "Tina Ratnasari, S.Kep., Ners",
    groomParentsLine: "Putra Bpk. H. Aceng Setiawan & Ibu Hj. Mumun Munawaroh",
    brideParentsLine: "Putri Bpk. H. Opik Burhanudin & Ibu Hj. Siti Mulyati",
    groomChildOrder: "Putra kedua",
    brideChildOrder: "Putri pertama",
    eventDate: new Date("2026-11-29T10:00:00+07:00"),
    venueName: "Villa Syariah Saung Geulis Leles",
    venueAddress: "Jl. Raya Leles No. 88, Leles, Garut, Jawa Barat 44152",
    mapUrl: "https://maps.google.com/?q=-7.0963,107.8677",
    openingReligiousText: QS_AR_RUM_21,
    basaSundaLemesKey: "sunda_lemes",
    heroPhotoId: "photo-1510279775229-4b08b20eb428",
    galleryCount: 8,
    hasMusic: true,
    groomPortraitPhotoId: "photo-1504257432389-52343af06ae3",
    bridePortraitPhotoId: "photo-1544005313-94ddf0286df2",
    timeline: [
      { sortOrder: 0, date: "Oktober 2019", title: "Takdir Mempertemukan", description: "Di sebuah forum pemuda daerah Garut, dua jiwa yang berbeda latar belakang dipertemukan oleh semangat yang sama untuk membangun daerah." },
      { sortOrder: 1, date: "Februari 2020", title: "Sahabat Menjadi Lebih", description: "Dari teman diskusi dan kegiatan sosial, perlahan ia menyadari ada rasa yang berbeda tumbuh di hatinya. Persahabatan itu semakin erat dan bermakna." },
      { sortOrder: 2, date: "Juni 2020", title: "Jadian di Tengah Pandemi", description: "Meski dunia sedang penuh ketidakpastian, cinta justru menemukan jalannya. Sebuah video call sederhana menjadi momen pengakuan perasaan yang tak terlupakan." },
      { sortOrder: 3, date: "Desember 2022", title: "Dikenalkan ke Keluarga", description: "Langkah kecil yang penuh makna — ia hadir ke rumah untuk pertama kalinya dan disambut dengan hangat oleh seluruh keluarga besar." },
      { sortOrder: 4, date: "Juni 2024", title: "Lamaran", description: "Dengan prosesi lamaran yang khidmat dan penuh adat Sunda, dua keluarga resmi menyatukan niat untuk bersatu." },
      { sortOrder: 5, date: "November 2026", title: "Ijab Kabul", description: "Hari yang paling sakral dan paling ditunggu akhirnya tiba. Dua insan resmi bersatu dalam ikatan yang diridhoi Allah SWT." },
    ],
    rsvps: [
      { guestName: "Bpk. H. Cecep Supriatna", attendance: "ATTENDING", message: "Mugia janten kulawarga sakinah mawaddah warahmah.", partySize: 2 },
      { guestName: "Bpk. Drs. Yusuf Hamdani", attendance: "ATTENDING", partySize: 4 },
      { guestName: "Ibu Ade Juliani, S.Kep.", attendance: "ATTENDING", message: "Selamat ya Tin, akhirnya! Semoga langgeng.", partySize: 1 },
      { guestName: "Bpk. Oman Kusmana", attendance: "MAYBE", partySize: 2 },
      { guestName: "Kang Dadan Hamdani", attendance: "DECLINED", message: "Hapunten, aya acara di kampung.", partySize: 1 },
    ],
  },

  // ─── Tier 4 — Sultan #2 ──────────────────────────────────────────────────
  {
    slug: "demo-sultan-2",
    tierId: 4,
    title: "Pernikahan Gunawan & Anggraeni",
    status: "PUBLISHED",
    groomName: "H. Gunawan Fauzi Nugraha, S.H., M.Kn.",
    brideName: "Hj. Anggraeni Putri Soekarno, M.B.A.",
    groomParentsLine: "Putra YM. H. Fauzi Nugraha & Ibu Hj. Dewi Arimbi",
    brideParentsLine: "Putri YM. H. Soekarno Wijaya & Ibu Hj. Sri Mulyati",
    groomChildOrder: "Putra kedua",
    brideChildOrder: "Putri pertama",
    eventDate: new Date("2027-03-08T11:00:00+07:00"),
    venueName: "Raffles Hotel Jakarta",
    venueAddress: "Jl. Cimanuk No. 1, Menteng, Jakarta Pusat 10310",
    mapUrl: "https://maps.google.com/?q=-6.1934,106.8283",
    openingReligiousText: QS_AR_RUM_21,
    basaSundaLemesKey: "sunda_lemes",
    heroPhotoId: "photo-1606800052052-a08af7148866",
    galleryCount: 10,
    hasMusic: true,
    groomPortraitPhotoId: "photo-1519085360753-af0119f7cbe7",
    bridePortraitPhotoId: "photo-1508214751196-bcfd4ca60f91",
    timeline: [
      { sortOrder: 0, date: "Maret 2018", title: "Pertemuan Pertama", description: "Dua keluarga besar yang sudah lama saling kenal akhirnya memperkenalkan dua anak muda mereka. Sebuah pertemuan yang terasa sudah direncanakan oleh takdir." },
      { sortOrder: 1, date: "Oktober 2018", title: "Persahabatan Bermakna", description: "Dari acara keluarga ke acara keluarga, pertemuan terus terjadi. Persahabatan yang tulus pun terbentuk secara alami." },
      { sortOrder: 2, date: "April 2019", title: "Hubungan Lebih Serius", description: "Ia memberanikan diri meminta izin orang tua untuk lebih serius. Restu yang dinantikan pun datang dengan penuh kehangatan." },
      { sortOrder: 3, date: "Desember 2020", title: "Lamaran Adat", description: "Prosesi lamaran adat Sunda yang megah dihadiri ratusan tamu dari kedua keluarga besar. Momen yang penuh keharuan dan kebahagiaan." },
      { sortOrder: 4, date: "Agustus 2022", title: "Pra-Wedding di Eropa", description: "Sesi foto pra-wedding di Paris dan Venesia mengabadikan keindahan cinta mereka. Kenangan yang akan selalu diingat seumur hidup." },
      { sortOrder: 5, date: "Maret 2025", title: "Pertunangan Resmi", description: "Dengan upacara pertunangan yang meriah di hadapan ratusan tamu undangan, keduanya resmi bertunangan." },
      { sortOrder: 6, date: "Maret 2027", title: "Hari Pernikahan", description: "Di Hari Perempuan Internasional, dua insan bersatu dalam ikatan suci pernikahan yang dirayakan dengan penuh kemegahan dan kebahagiaan." },
    ],
    rsvps: [
      { guestName: "YM. H. Cecep Hendra Wahyudin", attendance: "ATTENDING", message: "Selamat dan semoga menjadi keluarga yang mulia.", partySize: 2 },
      { guestName: "Mayjen (Purn.) H. Soemarno", attendance: "ATTENDING", partySize: 4 },
      { guestName: "Prof. Dr. Hj. Retno Listyarti", attendance: "ATTENDING", message: "Congratulations! May your union be blessed.", partySize: 2 },
      { guestName: "Duta Besar H.E. Rahmat Budiman", attendance: "ATTENDING", partySize: 2 },
      { guestName: "H. Ridwan Kamil", attendance: "ATTENDING", message: "Barokallahu lakuma.", partySize: 1 },
      { guestName: "Dr. Ir. H. Ruki Handana", attendance: "MAYBE", message: "Insya Allah hadir jika tidak ada sidang kabinet.", partySize: 2 },
      { guestName: "Bpk. H. Sutanto Wahab", attendance: "DECLINED", message: "Mohon maaf, sedang tugas luar negeri.", partySize: 1 },
    ],
  },

  // ─── Tier 4 — Sultan #3 ──────────────────────────────────────────────────
  {
    slug: "demo-sultan-3",
    tierId: 4,
    title: "Pernikahan Rizky & Nadira",
    status: "PUBLISHED",
    groomName: "H. Rizky Pratama Wijaya, M.B.A.",
    brideName: "Hj. Nadira Fitri Rahayu, S.H., LL.M.",
    groomParentsLine: "Putra YM. H. Bambang Wijaya & Ibu Hj. Sri Astuti",
    brideParentsLine: "Putri YM. H. Rahayu Fitriansyah & Ibu Hj. Citra Dewi",
    groomChildOrder: "Putra pertama",
    brideChildOrder: "Putri kedua",
    eventDate: new Date("2027-04-24T10:00:00+07:00"),
    venueName: "The Ritz-Carlton Jakarta, Pacific Place",
    venueAddress: "Jl. Jend. Sudirman Kav. 52-53, SCBD, Jakarta Selatan 12190",
    mapUrl: "https://maps.google.com/?q=-6.2218,106.8085",
    openingReligiousText: QS_AR_RUM_21,
    basaSundaLemesKey: null,
    heroPhotoId: "photo-1478146896981-b80fe463b330",
    galleryCount: 10,
    hasMusic: true,
    groomPortraitPhotoId: "photo-1488161628813-04466f872be2",
    bridePortraitPhotoId: "photo-1502685104226-ee32379fefbe",
    timeline: [
      { sortOrder: 0, date: "Juni 2017", title: "Pertama Bertemu di London", description: "Dua pelajar Indonesia bertemu di perpustakaan London School of Economics. Diskusi panjang tentang hukum bisnis internasional menjadi awal dari segalanya." },
      { sortOrder: 1, date: "Desember 2017", title: "Liburan Bersama di Edinburgh", description: "Di antara salju Edinburgh yang putih dan lampu Natal yang bersinar, perasaan itu semakin jelas. Momen yang tidak akan pernah terlupakan." },
      { sortOrder: 2, date: "Mei 2018", title: "Resmi Berpacaran", description: "Di sebuah restoran tepi Thames, ia dengan penuh kepastian menyatakan niatnya. Jawaban yang telah lama tersimpan dalam hati akhirnya terucap." },
      { sortOrder: 3, date: "Juli 2020", title: "Kembali ke Indonesia", description: "Setelah menyelesaikan studi, keduanya kembali ke tanah air dengan rencana masa depan yang sudah tersusun. Cinta yang teruji jarak kini siap menghadapi babak baru." },
      { sortOrder: 4, date: "November 2022", title: "Perkenalan Keluarga", description: "Dua keluarga besar dari latar belakang yang berbeda bertemu untuk pertama kalinya. Kehangatan dan keakraban langsung terasa sejak hari pertama." },
      { sortOrder: 5, date: "Februari 2024", title: "Lamaran Mewah", description: "Sebuah lamaran yang dihadiri lebih dari 300 tamu di hotel bintang lima menjadi momen yang akan dikenang seumur hidup oleh seluruh keluarga." },
      { sortOrder: 6, date: "April 2027", title: "Hari Pernikahan", description: "Di gedung paling prestisius di Jakarta, pernikahan impian akhirnya terwujud. Sebuah awal yang sempurna untuk kehidupan baru yang penuh cita-cita." },
    ],
    rsvps: [
      { guestName: "YM. H. Sofyan Djalil", attendance: "ATTENDING", message: "Semoga menjadi pasangan yang sukses di dunia dan akhirat.", partySize: 2 },
      { guestName: "Irjen. (Purn.) H. Bambang Santoso", attendance: "ATTENDING", partySize: 3 },
      { guestName: "Prof. Dr. Hj. Nila Moeloek", attendance: "ATTENDING", message: "Wishing you a lifetime of love and happiness.", partySize: 2 },
      { guestName: "H.E. Fadjroel Rahman", attendance: "ATTENDING", partySize: 2 },
      { guestName: "Dr. Hj. Rini Soemarno", attendance: "ATTENDING", message: "Congratulations! Semoga menjadi pasangan yang saling mendukung.", partySize: 1 },
      { guestName: "H. Wishnutama Kusubandio", attendance: "MAYBE", message: "Insya Allah hadir, akan konfirmasi seminggu sebelumnya.", partySize: 2 },
      { guestName: "Bpk. H. Sandiaga Uno", attendance: "DECLINED", message: "Mohon maaf tidak bisa hadir karena tugas kenegaraan.", partySize: 1 },
    ],
  },

  // ─── Tier 4 — Sultan ─────────────────────────────────────────────────────
  {
    slug: "demo-sultan",
    tierId: 4,
    title: "Pernikahan Dimas & Putri",
    status: "PUBLISHED",
    groomName: "H. Dimas Pratama Nugraha, M.B.A.",
    brideName: "Hj. Putri Anggraeni Rahayu, S.H., M.Kn.",
    groomParentsLine: "Putra YM. H. Gunawan Nugraha & Ibu Hj. Dewi Purwanti",
    brideParentsLine: "Putri YM. H. Suharto Rahayu & Ibu Hj. Rina Marliani",
    groomChildOrder: "Putra pertama",
    brideChildOrder: "Putri pertama",
    eventDate: new Date("2027-02-14T11:00:00+07:00"),
    venueName: "Grand Ballroom Hotel Bidakara Jakarta",
    venueAddress: "Jl. Gatot Subroto Kav. 71-73, Pancoran, Jakarta Selatan 12870",
    mapUrl: "https://maps.google.com/?q=-6.2383,106.8387",
    openingReligiousText: QS_AR_RUM_21,
    basaSundaLemesKey: "sunda_lemes",
    heroPhotoId: "photo-1512678080530-7760d81faba6",
    galleryCount: 10,
    hasMusic: true,
    groomPortraitPhotoId: "photo-1463453091185-61582044d556",
    bridePortraitPhotoId: "photo-1487412720507-e7ab37603c6f",
    timeline: [
      { sortOrder: 0, date: "Juli 2019", title: "Pertama Bertemu", description: "Sebuah pertemuan di forum bisnis internasional di Jakarta. Di antara ratusan peserta, ada satu wajah yang tidak bisa terlupakan." },
      { sortOrder: 1, date: "November 2019", title: "Persahabatan yang Tumbuh", description: "Kolaborasi dalam sebuah proyek nirlaba menjadi jembatan yang mempererat hubungan kami. Rasa saling menghormati berbuah persahabatan yang tulus." },
      { sortOrder: 2, date: "Maret 2020", title: "Melewati Masa Sulit Bersama", description: "Pandemi mengajarkan banyak hal, termasuk arti sesungguhnya dari kesetiaan. Meski berjauhan, kami saling menguatkan setiap harinya." },
      { sortOrder: 3, date: "September 2020", title: "Jadian", description: "Dalam sebuah makan malam yang sederhana namun penuh makna, ia melamar hubungan yang lebih serius. Hati ini sudah memutuskan sejak lama." },
      { sortOrder: 4, date: "Agustus 2022", title: "Liburan Keluarga Bersama", description: "Kedua keluarga besar bertemu untuk pertama kalinya dalam sebuah perjalanan ke Bali. Tawa dan kehangatan menyatu dalam kenangan yang tak terlupakan." },
      { sortOrder: 5, date: "Desember 2023", title: "Pinangan Resmi", description: "Dengan prosesi adat yang khidmat dan penuh keharuan, pihak keluarga resmi meminang. Doa dari seluruh keluarga mengalir deras malam itu." },
      { sortOrder: 6, date: "Februari 2027", title: "Hari Bahagia", description: "Valentine's Day menjadi tanggal yang dipilih dengan penuh makna. Di hari kasih sayang sedunia, dua insan resmi bersatu dalam ikatan suci pernikahan." },
    ],
    rsvps: [
      { guestName: "YM. Bpk. H. Cecep Maulana", attendance: "ATTENDING", message: "Moga-moga jadi kulawarga nu sakinah, dibarungkeun ku berkah Allah SWT.", partySize: 2 },
      { guestName: "Komjen (Purn.) H. Suprapto", attendance: "ATTENDING", partySize: 4 },
      { guestName: "Dr. Hj. Ratna Dewi Sartika, M.Sc.", attendance: "ATTENDING", message: "Congratulations! Wishing you both a lifetime of happiness.", partySize: 2 },
      { guestName: "Ir. H. Wahyu Koesoemah", attendance: "ATTENDING", partySize: 3 },
      { guestName: "Bpk. Tedy Rustandi, S.H.", attendance: "ATTENDING", partySize: 2 },
      { guestName: "Ibu Hj. Siti Mariam Hasyim", attendance: "ATTENDING", message: "Semoga dipermudah urusan rumah tangganya dan dikaruniai keturunan yang soleh.", partySize: 1 },
      { guestName: "Ambassador H.E. Ahmad Fauzi", attendance: "ATTENDING", partySize: 2 },
      { guestName: "Dr. Rina Hakim, M.Psi.", attendance: "ATTENDING", partySize: 1 },
      { guestName: "Bpk. Hendra Gunawan, M.T.", attendance: "MAYBE", message: "Insya Allah hadir. Sedang konfirmasi jadwal perjalanan dari luar negeri.", partySize: 2 },
      { guestName: "Ibu Prof. Hj. Siti Rahayu", attendance: "MAYBE", partySize: 1 },
      { guestName: "Kang Dedi Mulyadi", attendance: "DECLINED", message: "Mohon maaf tidak bisa hadir, ada sidang paripurna yang tidak bisa diwakilkan.", partySize: 1 },
      { guestName: "Bpk. Fauzi Bowo", attendance: "DECLINED", partySize: 1 },
    ],
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("╔══════════════════════════════════════╗");
  console.log("║   Sentuh Undang — Demo Seed          ║");
  console.log("╚══════════════════════════════════════╝\n");

  // ── 1. Tiers ────────────────────────────────────────────────────────────
  const tiers = [
    { id: 1, code: "simpel", name: "Simpel", sortOrder: 1 },
    { id: 2, code: "elegan", name: "Elegan", sortOrder: 2 },
    { id: 3, code: "istimewa", name: "Istimewa", sortOrder: 3 },
    { id: 4, code: "sultan", name: "Sultan", sortOrder: 4 },
  ];

  for (const t of tiers) {
    await prisma.tier.upsert({
      where: { id: t.id },
      create: t,
      update: { code: t.code, name: t.name, sortOrder: t.sortOrder },
    });
  }
  console.log("✓  4 Tier di-seed (Simpel / Elegan / Istimewa / Sultan)");

  // ── 2. Admin user ────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    create: { username: "admin", passwordHash, displayName: "Administrator" },
    update: { passwordHash, displayName: "Administrator" },
  });
  console.log("✓  Admin user  (username: admin / password: admin123)");

  // ── 3. Undangan per tier ─────────────────────────────────────────────────
  for (const data of INVITATIONS) {
    const tier = tiers.find((t) => t.id === data.tierId)!;

    // Idempoten: hapus undangan lama beserta asset & RSVP (cascade)
    const existing = await prisma.invitation.findUnique({
      where: { slug: data.slug },
    });
    if (existing) {
      await prisma.invitation.delete({ where: { id: existing.id } });
    }

    // Buat undangan
    const inv = await prisma.invitation.create({
      data: {
        slug: data.slug,
        title: data.title,
        tierId: data.tierId,
        ownerId: admin.id,
        status: data.status,

        groomName: data.groomName,
        brideName: data.brideName,
        groomParentsLine: data.groomParentsLine,
        brideParentsLine: data.brideParentsLine,
        groomChildOrder: data.groomChildOrder,
        brideChildOrder: data.brideChildOrder,

        eventDate: data.eventDate,
        venueName: data.venueName,
        venueAddress: data.venueAddress,
        mapUrl: data.mapUrl,

        openingReligiousText: data.openingReligiousText,
        basaSundaLemesKey: data.basaSundaLemesKey,
      },
    });

    // ── Hero image ──────────────────────────────────────────────────────
    await prisma.invitationAsset.create({
      data: {
        invitationId: inv.id,
        kind: "HERO_IMAGE",
        url: u(data.heroPhotoId),
        altText: `${data.groomName} & ${data.brideName}`,
        sortOrder: 0,
      },
    });

    // ── Gallery images (Tier 2+) ────────────────────────────────────────
    if (data.galleryCount > 0) {
      const gallerySlice = GALLERY.slice(0, data.galleryCount);
      for (let i = 0; i < gallerySlice.length; i++) {
        const photo = gallerySlice[i];
        await prisma.invitationAsset.create({
          data: {
            invitationId: inv.id,
            kind: "GALLERY_IMAGE",
            url: u(photo.id, 800),
            altText: photo.alt,
            sortOrder: i + 1,
          },
        });
      }
    }

    // ── Portrait photos (Tier 2+) ───────────────────────────────────────
    if (data.groomPortraitPhotoId) {
      await prisma.invitationAsset.create({
        data: {
          invitationId: inv.id,
          kind: "GROOM_PORTRAIT",
          url: u(data.groomPortraitPhotoId, 400),
          altText: data.groomName,
          sortOrder: 0,
        },
      });
    }
    if (data.bridePortraitPhotoId) {
      await prisma.invitationAsset.create({
        data: {
          invitationId: inv.id,
          kind: "BRIDE_PORTRAIT",
          url: u(data.bridePortraitPhotoId, 400),
          altText: data.brideName,
          sortOrder: 0,
        },
      });
    }

    // ── Background music (Tier 2+) ──────────────────────────────────────
    if (data.hasMusic) {
      await prisma.invitationAsset.create({
        data: {
          invitationId: inv.id,
          kind: "BACKGROUND_MUSIC",
          url: DEMO_MUSIC_URL,
          altText: "Musik latar romantis",
          sortOrder: 0,
        },
      });
    }

    // ── Timeline events (Tier 3+) ────────────────────────────────────────
    if (data.timeline && data.timeline.length > 0) {
      for (const event of data.timeline) {
        await prisma.timelineEvent.create({
          data: {
            invitationId: inv.id,
            date: event.date,
            title: event.title,
            description: event.description ?? null,
            sortOrder: event.sortOrder,
          },
        });
      }
    }

    // ── RSVP samples ────────────────────────────────────────────────────
    for (const rsvp of data.rsvps) {
      await prisma.rsvp.create({
        data: {
          invitationId: inv.id,
          guestName: rsvp.guestName,
          attendance: rsvp.attendance,
          message: rsvp.message ?? null,
          partySize: rsvp.partySize,
        },
      });
    }

    const assetSummary = [
      "1 hero",
      data.galleryCount > 0 ? `${data.galleryCount} galeri` : null,
      data.hasMusic ? "musik" : null,
    ]
      .filter(Boolean)
      .join(", ");

    console.log(
      `✓  Tier ${data.tierId} (${tier.name}) → /${data.slug}` +
        `  [${assetSummary}]  [${data.rsvps.length} RSVP]`,
    );
  }

  console.log("\n╔══════════════════════════════════════════════╗");
  console.log("║   Selesai! Preview undangan:               ║");
  console.log("║                                            ║");
  console.log("║  Tier 1 (Simpel)                          ║");
  console.log("║    /demo-simpel?to=Bapak+Diding           ║");
  console.log("║    /demo-simpel-2?to=Bapak+Entis          ║");
  console.log("║    /demo-simpel-3?to=Pak+Ujang            ║");
  console.log("║                                            ║");
  console.log("║  Tier 2 (Elegan)                          ║");
  console.log("║    /demo-geulis?to=Ibu+Neneng             ║");
  console.log("║    /demo-geulis-2?to=Ibu+Cucu            ║");
  console.log("║    /demo-geulis-3?to=Bapak+Yayan          ║");
  console.log("║                                            ║");
  console.log("║  Tier 3 (Istimewa)                        ║");
  console.log("║    /demo-kasep?to=Kang+Ujang              ║");
  console.log("║    /demo-kasep-2?to=Prof+Iwan             ║");
  console.log("║    /demo-kasep-3?to=Bapak+Cecep           ║");
  console.log("║                                            ║");
  console.log("║  Tier 4 (Sultan)                          ║");
  console.log("║    /demo-sultan?to=Bapak+H.+Cecep         ║");
  console.log("║    /demo-sultan-2?to=YM+Cecep+Hendra      ║");
  console.log("║    /demo-sultan-3?to=YM+Sofyan+Djalil     ║");
  console.log("╚══════════════════════════════════════════════╝");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
