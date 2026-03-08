export interface WorkflowStep {
  number: string;
  title: string;
  actor: string;
  description: string;
  input?: string;
  output?: string;
  isDecision?: boolean;
  isApproval?: boolean;
  nodeType?: 'action' | 'doc' | 'decision' | 'approve' | 'alert' | 'end';
}

export interface SOPModule {
  id: string;
  name: string;
  shortName: string;
  year: string;
  description: string;
  color: string;
  icon: string;
  processCount: number;
  keyActors: string[];
  objective: string;
  documents: string[];
  categories: string[];
  workflows: {
    title: string;
    description: string;
    steps: WorkflowStep[];
  }[];
}

export interface Actor {
  name: string;
  sops: string[];
  mainRole: string;
  documents: string[];
  decisionPoints: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const sopModules: SOPModule[] = [
  {
    id: "keuangan",
    name: "SOP Keuangan CRI",
    shortName: "Keuangan",
    year: "2022",
    description: "Tata kelola keuangan lembaga berbasis akrual menggunakan SANGO & standar ISAK 35",
    color: "amber",
    icon: "💰",
    processCount: 7,
    keyActors: ["Manajer Keuangan", "Staf Akuntansi", "Staf Keuangan", "Direktur"],
    objective: "Mengatur siklus keuangan dari penganggaran, penerimaan, pengeluaran, hingga pelaporan dengan basis akrual dan pengendalian internal yang ketat.",
    documents: ["PAR (Payment Authorization Request)", "VKM (Voucher Kas Masuk)", "VKK (Voucher Kas Keluar)", "RAB", "Reimbursement Form", "PJUM (Pertanggungjawaban Uang Muka)", "Formulir Kas Kecil"],
    categories: ["Penganggaran", "Penerimaan", "Pengeluaran", "Verifikasi", "Pelaporan", "Arsip"],
    workflows: [
      {
        title: "Siklus Keuangan Utama",
        description: "Alur utama pengelolaan keuangan dari perencanaan hingga pelaporan",
        steps: [
          { number: "01", title: "Perencanaan RAB", actor: "Manajer Keuangan", description: "Penyusunan Rencana Anggaran Biaya bersama unit terkait untuk proposal kegiatan & RAB tahunan", input: "Rencana strategis, kebutuhan program", output: "Draft RAB", nodeType: "doc" },
          { number: "02", title: "Review & Verifikasi RAB", actor: "Manajer Keuangan", description: "Memverifikasi kesesuaian anggaran dengan rencana strategis dan kebijakan lembaga", input: "Draft RAB", output: "RAB terverifikasi", nodeType: "action" },
          { number: "03", title: "Persetujuan Direktur", actor: "Direktur", description: "Direktur menyetujui RAB yang sudah diverifikasi Manajer Keuangan", input: "RAB terverifikasi", output: "RAB disetujui", nodeType: "approve", isApproval: true },
          { number: "04", title: "Pengajuan PAR", actor: "Staf / Unit", description: "Unit mengajukan pembayaran dengan mengisi PAR dan melampirkan dokumen pendukung", input: "Formulir PAR + bukti pendukung", output: "PAR siap diverifikasi", nodeType: "doc" },
          { number: "05", title: "Verifikasi & Persetujuan", actor: "Manajer Keuangan / Direktur", description: "Manajer Keuangan menyetujui PAR < Rp15 juta. Di atas Rp15 juta wajib persetujuan Direktur", input: "PAR", output: "PAR disetujui/ditolak", nodeType: "decision", isDecision: true },
          { number: "06", title: "Pembayaran", actor: "Staf Keuangan", description: "Melakukan pembayaran tunai atau transfer bank berdasarkan voucher terotorisasi", input: "PAR disetujui", output: "Pembayaran dilakukan", nodeType: "action" },
          { number: "07", title: "Input & Posting SANGO", actor: "Staf Keuangan → Staf Akuntansi", description: "Staf Keuangan input transaksi (VKM/VKK). Staf Akuntansi review & posting.", input: "Bukti transaksi", output: "Transaksi tercatat & terposting", nodeType: "action" },
          { number: "08", title: "Rekonsiliasi & Pelaporan", actor: "Staf Akuntansi", description: "Rekonsiliasi bank, penyusunan laporan keuangan bulanan & tahunan sesuai ISAK 35", input: "Data transaksi terposting", output: "Laporan keuangan", nodeType: "end" },
        ],
      },
      {
        title: "Alur Pengeluaran & Reimbursement",
        description: "Prosedur pengajuan dan pertanggungjawaban pengeluaran",
        steps: [
          { number: "01", title: "Pengajuan Pengeluaran", actor: "Staf / Unit", description: "Mengisi formulir PAR atau Reimbursement dengan lampiran bukti pendukung", nodeType: "doc" },
          { number: "02", title: "Persetujuan Supervisor", actor: "Supervisor", description: "Supervisor unit menandatangani persetujuan pengajuan", nodeType: "approve", isApproval: true },
          { number: "03", title: "Verifikasi Manajer Keuangan", actor: "Manajer Keuangan", description: "Cek kelengkapan dokumen, kesesuaian anggaran, dan otorisasi. Transaksi ≥ Rp15 juta diteruskan ke Direktur", nodeType: "decision", isDecision: true },
          { number: "04", title: "Eksekusi Pembayaran", actor: "Staf Keuangan", description: "Pembayaran via kas kecil (< Rp250rb), transfer bank, atau cek (dual signature)", nodeType: "action" },
          { number: "05", title: "Pertanggungjawaban (PJUM)", actor: "Staf", description: "Dalam 7 hari kerja setelah kegiatan, staf wajib menyerahkan PJUM beserta bukti-bukti", nodeType: "doc" },
          { number: "06", title: "Posting & Arsip", actor: "Staf Akuntansi", description: "Verifikasi akhir, posting di SANGO, pengarsipan dokumen", nodeType: "end" },
        ],
      },
    ],
  },
  {
    id: "sdm",
    name: "SOP SDM CRI",
    shortName: "SDM",
    year: "2022",
    description: "Manajemen sumber daya manusia dari rekrutmen hingga offboarding, berbasis PKWT/PKWTT & evaluasi KPI",
    color: "teal",
    icon: "👥",
    processCount: 9,
    keyActors: ["Direktur", "Pelaksana Fungsi SDM", "Supervisor/Manajer", "Koord. Administrasi & Logistik"],
    objective: "Mengatur siklus hidup pekerja CRI secara inklusif, bebas KKN, dan memberikan kesempatan sama bagi semua orang.",
    documents: ["SPK (Surat Perjanjian Kerja)", "Pakta Integritas", "KPI", "Surat Tugas", "Formulir Cuti", "SK Pengangkatan", "Surat Penawaran Upah"],
    categories: ["Rekrutmen", "Kontrak Kerja", "Induksi", "Evaluasi Kinerja", "Cuti & Izin", "Kompensasi", "Sanksi", "Offboarding"],
    workflows: [
      {
        title: "Siklus Hidup Pekerja CRI",
        description: "Dari rekrutmen hingga offboarding/pensiun",
        steps: [
          { number: "01", title: "Pengajuan Kebutuhan Pekerja", actor: "Manajer / Direktur", description: "Mengajukan permohonan penambahan pekerja via surel dengan diketahui Manajer Keuangan", nodeType: "doc" },
          { number: "02", title: "Rapat Penentuan Proses Rekrutmen", actor: "Direktur + Manajer", description: "Menentukan mekanisme seleksi: terbuka (website, media sosial) atau tertutup (milis internal)", nodeType: "decision", isDecision: true },
          { number: "03", title: "Publikasi Lowongan", actor: "Koord. Administrasi & Logistik", description: "Mengunggah iklan lowongan di website, media sosial, job portal atau milis internal", nodeType: "action" },
          { number: "04", title: "Seleksi Administrasi", actor: "Tim Seleksi", description: "Lamaran masuk ke office@combine.or.id. Tim seleksi memilih minimal 3 lamaran terbaik", nodeType: "action" },
          { number: "05", title: "Wawancara & Ujian Tertulis", actor: "Tim Seleksi + Pelaksana SDM", description: "Staf diwawancarai oleh Manajer Unit + SDM. Koordinator/Manajer oleh Direktur + SDM. Dipilih 1 calon", nodeType: "approve", isApproval: true },
          { number: "06", title: "Verifikasi Referensi", actor: "Pelaksana Fungsi SDM", description: "Konfirmasi kepada 2 kontak referensi dari tempat kerja/bergiat sebelumnya", nodeType: "action" },
          { number: "07", title: "Negosiasi & Penawaran Upah", actor: "Manajer Keuangan + Direktur", description: "Diskusi penawaran gaji. Pelaksana SDM kirim surat penawaran upah via surel", nodeType: "doc" },
          { number: "08", title: "Penandatanganan SPK & Pakta Integritas", actor: "Direktur + Calon Pekerja", description: "SPK, Pakta Integritas, dan KPI ditandatangani kedua belah pihak. Format: XX/SPK-SDM/CRI/BULAN/TAHUN", nodeType: "approve", isApproval: true },
          { number: "09", title: "Induksi (5 hari kerja)", actor: "Pelaksana Fungsi SDM", description: "Pengenalan lembaga, visi-misi, SOP, tools, rekan kerja, budaya organisasi", nodeType: "action" },
        ],
      },
      {
        title: "Evaluasi Kinerja & Perpanjangan Kontrak",
        description: "Siklus tahunan evaluasi dan penyesuaian",
        steps: [
          { number: "01", title: "Pelaksanaan Kerja", actor: "Pekerja", description: "Menjalankan tugas sesuai SPK dan KPI yang disepakati", nodeType: "action" },
          { number: "02", title: "Evaluasi KPI", actor: "Supervisor / Manajer", description: "Penilaian kinerja berdasarkan indikator KPI. Dilakukan setiap akhir periode kontrak", nodeType: "approve", isApproval: true },
          { number: "03", title: "Penyesuaian Upah", actor: "Direktur + Manajer Keuangan", description: "Berdasarkan hasil evaluasi, upah dapat disesuaikan. Mempertimbangkan inflasi dan kemampuan lembaga", nodeType: "decision", isDecision: true },
          { number: "04", title: "Keputusan Perpanjangan", actor: "Direktur", description: "PKWT diperpanjang (maks 5 tahun) atau ditawarkan PKWTT. Pemberitahuan 30 hari sebelum kontrak berakhir", nodeType: "approve", isApproval: true },
        ],
      },
      {
        title: "Offboarding & PHK",
        description: "Prosedur pengunduran diri, PHK, dan pensiun",
        steps: [
          { number: "01", title: "Pemberitahuan (One Month Notice)", actor: "Pekerja / Lembaga", description: "Pengunduran diri atau PHK wajib disampaikan minimal 30 hari sebelum efektif", nodeType: "alert" },
          { number: "02", title: "Serah Terima Tugas", actor: "Pekerja + Supervisor", description: "Transfer knowledge, serah terima dokumen, akses, dan aset lembaga", nodeType: "action" },
          { number: "03", title: "Penyelesaian Hak", actor: "Manajer Keuangan + Pelaksana SDM", description: "Perhitungan hak: sisa cuti, uang penghargaan masa kerja, kompensasi sesuai ketentuan", nodeType: "doc" },
          { number: "04", title: "Exit & Administrasi Akhir", actor: "Pelaksana Fungsi SDM", description: "Pencabutan akses, pengembalian aset, update data pekerja, arsip dokumen", nodeType: "end" },
        ],
      },
    ],
  },
  {
    id: "ppks",
    name: "SOP PPKS CRI",
    shortName: "PPKS",
    year: "2024",
    description: "Pencegahan & penanganan kekerasan seksual di lingkungan kerja, berbasis UU 12/2022 TPKS",
    color: "coral",
    icon: "🛡️",
    processCount: 8,
    keyActors: ["Focal Point", "Dewan Pengurus", "Satgas PPKS", "Korban/Pelapor", "Direktur"],
    objective: "Menciptakan ruang kerja aman dan bebas kekerasan seksual dengan prinsip nol toleransi, keberpihakan pada korban, dan penanganan yang rahasia serta akuntabel.",
    documents: ["Formulir Pengaduan", "Pakta Integritas Anti-KS", "Berita Acara Investigasi", "Rekomendasi Satgas", "Keputusan Dewan Pengurus", "Dokumen Rujukan Pemulihan"],
    categories: ["Pencegahan", "Pengaduan", "Penanganan", "Investigasi", "Pemulihan", "Sanksi"],
    workflows: [
      {
        title: "Siklus Penanganan Kasus PPKS",
        description: "Dari kejadian hingga pemulihan dan sanksi",
        steps: [
          { number: "01", title: "Kejadian / Indikasi Kekerasan Seksual", actor: "Korban / Saksi", description: "Terjadi kekerasan seksual (fisik, verbal, psikis, atau KBGO) di lingkungan kerja", nodeType: "alert" },
          { number: "02", title: "Laporan ke Focal Point", actor: "Pelapor", description: "Aduan disampaikan lisan atau tertulis via kanal offline/online. Identitas dijamin kerahasiaannya", nodeType: "doc" },
          { number: "03", title: "Konfirmasi & Intervensi Krisis Awal", actor: "Focal Point", description: "Konfirmasi penerimaan dalam maks. 3×24 jam. Tawarkan intervensi krisis awal: rumah aman, terapi", input: "Laporan pengaduan", output: "Dokumentasi aduan terverifikasi", nodeType: "action" },
          { number: "04", title: "Teruskan ke Dewan Pengurus", actor: "Focal Point", description: "Aduan diteruskan ke Dewan Pengurus dalam maks. 5×24 jam", nodeType: "action" },
          { number: "05", title: "Pembentukan Satgas", actor: "Dewan Pengurus", description: "Dewan Pengurus membentuk Satuan Tugas PPKS. Satgas bersifat insidental per kasus", nodeType: "approve", isApproval: true },
          { number: "06", title: "Investigasi Satgas", actor: "Satgas PPKS", description: "Pemeriksaan keterangan korban, terlapor, saksi. Pengumpulan bukti. Maks. 14 hari kerja", input: "Dokumen aduan", output: "Laporan investigasi + rekomendasi", nodeType: "action" },
          { number: "07", title: "Keputusan Dewan Pengurus", actor: "Dewan Pengurus", description: "Berdasarkan rekomendasi Satgas, Dewan memutuskan sanksi dan tindakan. Sanksi berdasar dampak pada korban", nodeType: "decision", isDecision: true },
          { number: "08", title: "Pemulihan Korban & Eksekusi Sanksi", actor: "Lembaga", description: "Sanksi pelaku (SP1–PHK). Pemulihan korban: konseling, medis, hukum, pemulangan. Kasus dapat dibuka kembali", nodeType: "end" },
        ],
      },
      {
        title: "Prosedur Pencegahan",
        description: "Langkah-langkah pencegahan proaktif dan berkelanjutan",
        steps: [
          { number: "P1", title: "Regulasi & Komitmen Formal", actor: "Lembaga", description: "SOP PPKS sebagai regulasi. Seluruh pihak wajib tandatangan komitmen nol toleransi via Pakta Integritas", nodeType: "doc" },
          { number: "P2", title: "Peningkatan Kesadaran & Pendidikan", actor: "Focal Point + HR", description: "Sosialisasi SOP berkala. Pelatihan metode 5D (Dialihkan, Dilaporkan, Ditenangkan, Didokumentasikan, Ditegur)", nodeType: "action" },
          { number: "P3", title: "Skrining Rekrutmen & Kerja Sama", actor: "Pelaksana SDM", description: "Background check riwayat kekerasan seksual pada calon pekerja, konsultan, relawan, mitra", nodeType: "action" },
          { number: "P4", title: "Lingkungan Kerja Responsif Gender", actor: "Lembaga", description: "Infrastruktur aman: CCTV, penerangan, ruang laktasi, daycare, akses disabilitas, hygiene kit", nodeType: "action" },
          { number: "P5", title: "Penyiapan Focal Point & Satgas", actor: "Dewan Pengurus", description: "Focal Point bertugas reguler. Mekanisme Satgas disiapkan agar siap dibentuk sewaktu-waktu", nodeType: "end" },
        ],
      },
    ],
  },
  {
    id: "penggalangan-2024",
    name: "SOP Penggalangan Dana CRI",
    shortName: "Penggalangan Dana 2024",
    year: "2024",
    description: "Penggalangan dana & sumber pendapatan lembaga mencakup 7 jenis: hibah, donasi, konsultansi, kontribusi, investasi, unit usaha, dan lainnya",
    color: "emerald",
    icon: "📋",
    processCount: 10,
    keyActors: ["Direktur", "Pengurus Yayasan", "Manajer PD & Bisnis", "Manajer Keuangan", "Manajer Program"],
    objective: "Menghimpun dana, memperkuat diversifikasi donor, menjaga kesehatan keuangan, dan mendorong transparansi untuk keberlanjutan keuangan lembaga.",
    documents: ["Proposal Hibah", "Instrumen Verifikasi Donor", "Surat Pernyataan Donatur", "MoU Konsultansi", "Laporan Keuangan Tahunan", "SPK Konsultan"],
    categories: ["Hibah/Grant", "Donasi", "Jasa Konsultansi", "Kontribusi", "Investasi", "Unit Usaha", "Pelaporan"],
    workflows: [
      {
        title: "Siklus Tahunan Penggalangan Dana",
        description: "Alur besar dari evaluasi hingga pelaporan",
        steps: [
          { number: "01", title: "Evaluasi Pendanaan Saat Ini", actor: "Pengurus + Direktur", description: "Evaluasi kondisi pendanaan & identifikasi gap kebutuhan", nodeType: "action" },
          { number: "02", title: "Identifikasi Isu & Tantangan", actor: "Manajer PD & Bisnis", description: "Merumuskan isu strategis, tujuan penggalangan, tantangan yang dihadapi", nodeType: "action" },
          { number: "03", title: "Rencana Detail Kegiatan", actor: "Tim Manajemen", description: "Menyusun rencana detail penggalangan dana, terintegrasi rencana strategis", nodeType: "doc" },
          { number: "04", title: "Penyusunan Anggaran", actor: "Manajer Keuangan", description: "Menyusun anggaran operasional kegiatan penggalangan dana", nodeType: "doc" },
          { number: "05", title: "Kolaborasi Mitra", actor: "Manajer PD & Bisnis", description: "Membangun & memperluas kerja sama dengan mitra strategis", nodeType: "action" },
          { number: "06", title: "Implementasi 7 Jalur Pendapatan", actor: "Seluruh Unit", description: "Hibah, Donasi, Jasa Konsultansi, Kontribusi, Investasi, Unit Usaha, Lainnya", nodeType: "action" },
          { number: "07", title: "Penerimaan & Pencatatan", actor: "Manajer Keuangan", description: "Dana masuk dicatat di sistem keuangan, laporan serapan", nodeType: "doc" },
          { number: "08", title: "Evaluasi Periodik", actor: "Pengawas Yayasan", description: "Monitoring dan evaluasi pengelolaan sumber-sumber pendapatan", nodeType: "decision", isDecision: true },
        ],
      },
      {
        title: "Alur Pengajuan Hibah (Grant)",
        description: "Prosedur mendapatkan hibah dari donor",
        steps: [
          { number: "01", title: "Identifikasi Peluang", actor: "Manajer PD & Bisnis", description: "Scan donor, call for proposal, undangan, atau inisiatif sendiri", nodeType: "action" },
          { number: "02", title: "Penyusunan Proposal", actor: "Manajer PD & Bisnis + Manajer Program", description: "3 jenis: Inisiatif, Undangan, Kompetisi. Tema: Implementasi, Riset, atau Event", nodeType: "doc" },
          { number: "03", title: "Review Internal & Persetujuan", actor: "Direktur", description: "Direktur mereview substansi & anggaran proposal sebelum diajukan", nodeType: "approve", isApproval: true },
          { number: "04", title: "Pengajuan ke Donor", actor: "Manajer PD & Bisnis", description: "Submit proposal beserta dokumen kelembagaan (track record, CV, akta, laporan audit)", nodeType: "action" },
          { number: "05", title: "Negosiasi & Penandatanganan MoU", actor: "Direktur + Donor", description: "Negosiasi syarat, budget, timeline. Penandatanganan kontrak hibah", nodeType: "approve", isApproval: true },
          { number: "06", title: "Implementasi & Pelaporan", actor: "Tim Program + Keuangan", description: "Pelaksanaan program sesuai MoU. Laporan naratif & keuangan periodik", nodeType: "end" },
        ],
      },
    ],
  },
  {
    id: "penggalangan-2025",
    name: "SOP Penggalangan Dana Pembaruan 2025",
    shortName: "Penggalangan Dana 2025",
    year: "2025",
    description: "Pembaruan SOP 2024 dengan penguatan proyeksi 3 tahunan, mekanisme pleno donasi swasta, instrumen verifikasi hibah, dan klarifikasi struktur organ yayasan",
    color: "update-orange",
    icon: "🔄",
    processCount: 10,
    keyActors: ["Direktur", "Pengurus Yayasan", "Pengawas Yayasan", "Manajer PD & Bisnis", "Manajer Keuangan"],
    objective: "Memperbarui dan memperkuat tata kelola penggalangan dana dengan proyeksi 3 tahun, mekanisme persetujuan pleno untuk donasi swasta, dan instrumen verifikasi donor.",
    documents: ["Proposal Hibah", "Instrumen Verifikasi Donor", "Surat Pernyataan Donatur", "Proyeksi Pendapatan 3 Tahun", "Berita Acara Pleno", "MoU Konsultansi"],
    categories: ["Hibah/Grant", "Donasi", "Jasa Konsultansi", "Kontribusi", "Investasi", "Unit Usaha", "Pelaporan"],
    workflows: [
      {
        title: "Siklus Tahunan (Pembaruan 2025)",
        description: "Sama dengan 2024 dengan penguatan di beberapa langkah",
        steps: [
          { number: "01", title: "Evaluasi Pendanaan Saat Ini", actor: "Pengurus + Direktur", description: "Evaluasi kondisi pendanaan & identifikasi gap kebutuhan", nodeType: "action" },
          { number: "02", title: "Identifikasi Isu & Tantangan", actor: "Manajer PD & Bisnis", description: "Merumuskan isu strategis, tujuan penggalangan, tantangan yang dihadapi", nodeType: "action" },
          { number: "03", title: "Rencana Detail Minimal 3 Tahun", actor: "Tim Manajemen + Manajer Keuangan", description: "[BARU 2025] Rencana detail kegiatan disusun minimal untuk 3 tahun ke depan, bukan hanya multi-years umum", nodeType: "doc" },
          { number: "04", title: "Proyeksi Anggaran 3 Tahun", actor: "Manajer Keuangan", description: "[BARU 2025] Merumuskan proyeksi pendapatan & pengeluaran minimal 3 tahun sebagai rujukan target", nodeType: "doc" },
          { number: "05", title: "Kolaborasi Mitra", actor: "Manajer PD & Bisnis", description: "Membangun & memperluas kerja sama dengan mitra strategis", nodeType: "action" },
          { number: "06", title: "Implementasi 7 Jalur + Verifikasi Donor", actor: "Seluruh Unit", description: "[BARU 2025] Pemberi hibah wajib tandatangan instrumen verifikasi. Donasi swasta butuh persetujuan pleno", nodeType: "action" },
          { number: "07", title: "Penerimaan & Pencatatan", actor: "Manajer Keuangan", description: "Dana masuk dicatat di sistem keuangan, laporan serapan", nodeType: "doc" },
          { number: "08", title: "Evaluasi Periodik", actor: "Pengawas Yayasan", description: "Monitoring dan evaluasi pengelolaan sumber-sumber pendapatan", nodeType: "decision", isDecision: true },
        ],
      },
    ],
  },
];

export const actors: Actor[] = [
  {
    name: "Direktur",
    sops: ["Keuangan", "SDM", "PPKS", "Penggalangan Dana"],
    mainRole: "Pengambil keputusan strategis tertinggi di level eksekutif",
    documents: ["RAB", "SPK", "SK", "PAR ≥ Rp15 juta"],
    decisionPoints: ["Persetujuan anggaran", "Pengangkatan/PHK pekerja", "Persetujuan proposal hibah", "Approver internet banking"],
  },
  {
    name: "Pengurus Yayasan",
    sops: ["PPKS", "Penggalangan Dana"],
    mainRole: "Organ yayasan yang mengawasi dan mengarahkan lembaga",
    documents: ["Keputusan Dewan", "Berita Acara Pleno"],
    decisionPoints: ["Persetujuan strategi penggalangan dana", "Pembentukan Satgas PPKS", "Keputusan sanksi PPKS"],
  },
  {
    name: "Pengawas Yayasan",
    sops: ["Penggalangan Dana"],
    mainRole: "Melaksanakan evaluasi & monitoring pengelolaan sumber pendapatan",
    documents: ["Laporan Evaluasi"],
    decisionPoints: ["Evaluasi periodik penggalangan dana", "Persetujuan pleno donasi swasta (2025)"],
  },
  {
    name: "Manajer Keuangan",
    sops: ["Keuangan", "SDM", "Penggalangan Dana"],
    mainRole: "Pimpinan unit keuangan, pemegang token internet banking & kunci brankas",
    documents: ["RAB", "PAR", "VKM/VKK", "Laporan Keuangan", "Proyeksi 3 Tahun"],
    decisionPoints: ["Approver 1 internet banking", "Verifikasi PAR", "Negosiasi upah pekerja baru"],
  },
  {
    name: "Staf Keuangan",
    sops: ["Keuangan"],
    mainRole: "Pelaksana transaksi kas masuk/keluar, Maker 1 internet banking",
    documents: ["VKM", "VKK", "Formulir Kas Kecil"],
    decisionPoints: ["Input transaksi SANGO"],
  },
  {
    name: "Staf Akuntansi",
    sops: ["Keuangan"],
    mainRole: "Review, posting transaksi, laporan keuangan, perpajakan",
    documents: ["Laporan Keuangan Bulanan/Tahunan", "Laporan Pajak"],
    decisionPoints: ["Posting transaksi di SANGO", "Rekonsiliasi bank"],
  },
  {
    name: "Pelaksana Fungsi SDM",
    sops: ["SDM"],
    mainRole: "Garda terdepan operasional SDM, ditunjuk Direktur",
    documents: ["SPK", "Pakta Integritas", "KPI", "Surat Penawaran Upah"],
    decisionPoints: ["Koordinasi rekrutmen", "Verifikasi referensi", "Koordinasi induksi & offboarding"],
  },
  {
    name: "Supervisor / Manajer Unit",
    sops: ["Keuangan", "SDM"],
    mainRole: "Bertanggung jawab atas disiplin dan kinerja pekerja di unitnya",
    documents: ["Evaluasi Kinerja", "Persetujuan Cuti", "Persetujuan PAR"],
    decisionPoints: ["Persetujuan cuti", "Evaluasi KPI", "Persetujuan pengajuan pengeluaran"],
  },
  {
    name: "Focal Point PPKS",
    sops: ["PPKS"],
    mainRole: "Bertugas reguler menerima & menindaklanjuti aduan kekerasan seksual",
    documents: ["Formulir Pengaduan", "Dokumentasi Aduan"],
    decisionPoints: ["Konfirmasi penerimaan aduan", "Eskalasi ke Dewan Pengurus"],
  },
  {
    name: "Manajer PD & Pengembangan Bisnis",
    sops: ["Penggalangan Dana"],
    mainRole: "Merancang konsep hibah, donasi, konsultansi, dan unit usaha",
    documents: ["Proposal Hibah", "MoU Konsultansi", "Rencana Penggalangan Dana"],
    decisionPoints: ["Identifikasi peluang donor", "Penyusunan proposal"],
  },
  {
    name: "Koordinator Administrasi & Logistik",
    sops: ["SDM", "Keuangan"],
    mainRole: "Mengelola administrasi umum, publikasi lowongan, logistik kantor",
    documents: ["Iklan Lowongan", "Surat Administratif"],
    decisionPoints: ["Publikasi lowongan kerja"],
  },
];

export const compareItems = [
  {
    category: "Strategi",
    item: "Rencana penggalangan dana",
    status2024: "Multi-years (tidak spesifik)",
    status2025: "Minimal 3 tahun (lebih spesifik)",
    badge: "revised" as const,
  },
  {
    category: "Strategi",
    item: "Proyeksi anggaran",
    status2024: "Tidak diatur secara eksplisit",
    status2025: "Proyeksi pendapatan & pengeluaran min. 3 tahun sebagai rujukan target",
    badge: "new" as const,
  },
  {
    category: "Definisi",
    item: "Struktur organ yayasan",
    status2024: "Implisit",
    status2025: "Definisi eksplisit: Organ Yayasan, Pengurus, Pengawas, Badan Pelaksana/Eksekutif",
    badge: "new" as const,
  },
  {
    category: "Hibah",
    item: "Verifikasi donor/pemberi hibah",
    status2024: "Prinsip umum (bukan dari kejahatan/partai)",
    status2025: "Wajib tandatangan instrumen verifikasi yang disediakan lembaga",
    badge: "new" as const,
  },
  {
    category: "Hibah",
    item: "Proposal inisiatif & undangan",
    status2024: "Definisi standar",
    status2025: "Klarifikasi: dapat berupa perluasan/lanjutan program sebelumnya",
    badge: "revised" as const,
  },
  {
    category: "Donasi",
    item: "Donasi dari sektor swasta",
    status2024: "Tidak diatur khusus",
    status2025: "Wajib disetujui secara pleno oleh Pengawas + Pengurus + Eksekutif",
    badge: "new" as const,
  },
  {
    category: "Tujuan",
    item: "Rumusan tujuan SOP",
    status2024: "Standar",
    status2025: "Diperluas dengan frasa 'agar dapat melaksanakan visi misinya'",
    badge: "revised" as const,
  },
  {
    category: "Konsultansi",
    item: "Fee konsultan kompetisi",
    status2024: "1%–3% dari total nilai hibah",
    status2025: "Tetap 1%–3% dari total nilai hibah",
    badge: "same" as const,
  },
];

export const faqItems: FAQItem[] = [
  {
    question: "SOP mana yang dipakai untuk pengajuan uang muka?",
    answer: "Pengajuan uang muka (advance) diatur dalam SOP Keuangan 2022, melalui formulir PAR (Payment Authorization Request). Staf mengisi PAR, mendapat persetujuan Supervisor, lalu diverifikasi Manajer Keuangan. Pertanggungjawaban menggunakan formulir PJUM dalam 7 hari kerja setelah kegiatan.",
  },
  {
    question: "Jika proses menyangkut staf, SOP mana yang relevan?",
    answer: "SOP SDM 2022 mengatur seluruh siklus hidup pekerja: rekrutmen, kontrak kerja (PKWT/PKWTT), induksi, evaluasi kinerja (KPI), cuti & izin, kompensasi, sanksi, hingga offboarding. Untuk aspek keuangan terkait staf (payroll, reimbursement), merujuk ke SOP Keuangan.",
  },
  {
    question: "Jika ada hibah masuk, alurnya terhubung ke SOP apa saja?",
    answer: "Hibah masuk melibatkan: (1) SOP Penggalangan Dana — untuk proses pengajuan proposal, negosiasi, dan penandatanganan MoU; (2) SOP Keuangan — untuk pencatatan penerimaan, pengelolaan dana program, dan pelaporan keuangan; (3) Jika melibatkan rekrutmen staf proyek → SOP SDM.",
  },
  {
    question: "Bagaimana jalur pelaporan kasus PPKS?",
    answer: "Laporan disampaikan ke Focal Point (lisan/tertulis, offline/online). Focal Point konfirmasi dalam maks. 3×24 jam, lalu meneruskan ke Dewan Pengurus dalam maks. 5×24 jam. Dewan membentuk Satgas yang melakukan investigasi maks. 14 hari kerja. Keputusan akhir oleh Dewan Pengurus berdasarkan rekomendasi Satgas.",
  },
  {
    question: "Bagaimana membedakan Penggalangan Dana 2024 dan Pembaruan 2025?",
    answer: "Pembaruan 2025 menambahkan: (1) Proyeksi pendapatan & pengeluaran minimal 3 tahun; (2) Mekanisme pleno untuk donasi swasta; (3) Instrumen verifikasi wajib bagi pemberi hibah; (4) Klarifikasi definisi struktur organ yayasan; (5) Perluasan rumusan tujuan SOP. Seluruh ketentuan lain tetap berlaku dari versi 2024.",
  },
  {
    question: "Apa batas otorisasi kritis dalam SOP Keuangan?",
    answer: "Transaksi pengeluaran ≥ Rp 15.000.000 wajib mendapat persetujuan Direktur. Di bawah batas ini, Manajer Keuangan cukup sebagai approver. Untuk kas kecil, batas per pengeluaran adalah < Rp 250.000 dengan saldo maksimal Rp 10.000.000 (metode imprest).",
  },
];

export const processTypes = [
  "Pengajuan",
  "Verifikasi",
  "Persetujuan",
  "Pelaksanaan",
  "Pelaporan",
  "Arsip / Dokumentasi",
];

export const allDocumentTypes = [
  "PAR",
  "Reimbursement",
  "Uang Muka",
  "PJUM",
  "SPK",
  "KPI",
  "Surat Tugas",
  "Proposal Hibah",
  "VKM/VKK",
  "RAB",
  "Pakta Integritas",
  "Formulir Pengaduan",
];
