export interface ParentConcern {
  number: string;
  title: string;
  summary: string;
  realityNote: string;
}

export interface CareerStage {
  step: string;
  roleTitle: string;
  roleSubtitle: string;
  description: string;
}

export interface TransparencyItem {
  label: string;
  statusTag: string;
  detail: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: {
    value: string;
    label: string;
    score: number;
  }[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const HERO_IMAGE = {
  src: '/src/assets/images/hero_caregiver_support_1794983712102.jpg',
  alt: 'Seorang penjaga muda Asia membantu seorang warga emas wanita berjalan dengan senyuman mesra di ruang kediaman yang terang dan tenang',
  caption: 'Gambar ilustrasi — bukan gambar sebenar GIS',
};

export const LEARNING_IMAGES = {
  demo: {
    src: '/src/assets/images/learning_demo_practice_1794983713778.jpg',
    alt: 'Pengajar menunjukkan teknik asas pemantauan tekanan darah menggunakan patung latihan kepada pelatih dalam bilik simulasi yang cerah',
    caption: 'Gambar ilustrasi — bukan gambar sebenar GIS',
  },
  coaching: {
    src: '/src/assets/images/learning_supportive_coaching_1794983715356.jpg',
    alt: 'Pelatih muda berlatih kemahiran komunikasi empati dan sokongan mobiliti bersama pengajar kanan di bilik latihan yang terang',
    caption: 'Gambar ilustrasi — bukan gambar sebenar GIS',
  },
  career: {
    src: '/src/assets/images/career_care_environment_1794983714683.jpg',
    alt: 'Penjaga warga emas kanan berbual mesra sambil menuang teh bersama penghuni warga emas di ruang santai yang bercahaya semula jadi',
    caption: 'Gambar ilustrasi — bukan gambar sebenar GIS',
  },
};

export const PARENT_CONCERNS: ParentConcern[] = [
  {
    number: '01',
    title: 'Peluang Pekerjaan & Keperluan Sebenar',
    summary:
      'Penjagaan warga emas merupakan sektor yang berkembang seiring peningkatan populasi menua, khususnya di pusat jagaan berdaftar, komuniti persaraan, dan penjagaan di rumah.',
    realityNote:
      'Pengambilan pekerja bergantung kepada keperluan majikan, kekosongan semasa, dan kelayakan pemohon — tiada janji pekerjaan automatik.',
  },
  {
    number: '02',
    title: 'Gaji & Gambaran Pendapatan Realistik',
    summary:
      'Julat pendapatan dalam bidang penjagaan berbeza mengikut lokasi, jenis fasiliti, waktu syif, dan tahap kemahiran serta pengalaman kerja seseorang.',
    realityNote:
      'GIS tidak menerbitkan angka gaji tetap tanpa sumber pasaran tempatan yang sah serta terkini, dan tidak menjanjikan gaji luar negara.',
  },
  {
    number: '03',
    title: 'Laluan Kemajuan Kerjaya Jangka Panjang',
    summary:
      'Bidang ini bukan sekadar kerja rutin; pelatih yang tekun boleh berkembang daripada peranan penjaga asas kepada penyeliaan operasi penjagaan.',
    realityNote:
      'Kemajuan ke peringkat kanan atau penyeliaan bergantung pada pengalaman lapangan, rekod prestasi, dan syarat kelayakan tambahan.',
  },
  {
    number: '04',
    title: 'Kos Pengajian & Ketelusan Kewangan',
    summary:
      'Ibu bapa wajar mengetahui keseluruhan struktur yuran, tempoh pengajian, dan kos kelengkapan sebelum membuat keputusan untuk anak.',
    realityNote:
      'Butiran yuran rasmi, jadual ansuran, dan status bantuan pembiayaan sedang disahkan oleh pihak GIS sebelum diumumkan.',
  },
  {
    number: '05',
    title: 'Suasana Pembelajaran & Bimbingan Lepasan SPM',
    summary:
      'Ramai pelajar lepasan SPM belajar dengan lebih berkesan melalui tunjuk ajar berperingkat, latihan praktikal, dan persekitaran kelas yang menyokong.',
    realityNote:
      'Pendekatan latihan menggabungkan demonstrasi dan amali; mekanisme sokongan pelajar terperinci akan dikongsi setelah disahkan GIS.',
  },
  {
    number: '06',
    title: 'Kesesuaian Peribadi Anak Anda',
    summary:
      'Tidak semua pelajar sesuai dengan laluan akademik konvensional. Anak yang sabar, prihatin, dan suka membantu orang lain sering menemui kekuatan diri dalam bidang ini.',
    realityNote:
      'Sesi konsultasi membantu ibu bapa dan anak menilai minat secara jujur tanpa sebarang paksaan pendaftaran.',
  },
];

export const CAREER_STAGES: CareerStage[] = [
  {
    step: 'Tahap 01',
    roleTitle: 'Penjaga Warga Emas (Caregiver)',
    roleSubtitle: 'Peringkat Permulaan & Kemahiran Teras',
    description:
      'Membantu aktiviti harian warga emas dengan penuh hormat — termasuk sokongan mobiliti selamat, kebersihan diri, pemakanan, teman berbual, dan pemerhatian kesejahteraan asas.',
  },
  {
    step: 'Tahap 02',
    roleTitle: 'Penjaga Kanan (Senior Caregiver)',
    roleSubtitle: 'Pengalaman Lapangan & Kepercayaan Pasukan',
    description:
      'Menangani kes penjagaan lebih kompleks, membimbing penjaga baharu semasa syif, menyelaras rutin harian penghuni, serta berkomunikasi lebih rapat dengan keluarga.',
  },
  {
    step: 'Tahap 03',
    roleTitle: 'Penyelia / Trek Pengurusan Penjagaan',
    roleSubtitle: 'Koordinasi Operasi & Kepimpinan',
    description:
      'Mengurus jadual petugas, memantau piawaian keselamatan dan mutu perkhidmatan pusat jagaan, tertakluk kepada pengalaman kerja dan kelayakan tambahan yang diperlukan.',
  },
];

export const LEARNING_PILLARS = [
  {
    number: '01',
    title: 'Demonstrasi Langkah demi Langkah',
    description:
      'Pengajar menunjuk cara teknik penjagaan asas yang betul dan selamat terlebih dahulu agar pelajar memahami tujuan setiap prosedur sebelum mencubanya sendiri.',
  },
  {
    number: '02',
    title: 'Latihan Kemahiran Praktikal Berpandu',
    description:
      'Pelajar berlatih kemahiran mobiliti, komunikasi empati, dan pengendalian peralatan sokongan dalam suasana latihan terkawal untuk membina keyakinan.',
  },
  {
    number: '03',
    title: 'Bimbingan Pengajar yang Menyokong',
    description:
      'Penekanan diberikan kepada sikap profesional, kesabaran, dan etika kerja. Mekanisme sokongan pembelajaran rasmi tertakluk kepada pengesahan lanjut pihak GIS.',
  },
];

export const TRANSPARENCY_ITEMS: TransparencyItem[] = [
  {
    label: 'Nama Rasmi Program, Kod & Tahap SKM / Akreditasi JPK',
    statusTag: 'Belum disahkan oleh GIS',
    detail:
      'Tajuk rasmi kursus, kod program, dan bukti pengiktirafan semasa akan dipaparkan selepas semakan muktamad bersama pihak GIS dan Jabatan Pembangunan Kemahiran (JPK).',
  },
  {
    label: 'Tempoh Pengajian & Syarat Kemasukan Rasmi',
    statusTag: 'Belum disahkan oleh GIS',
    detail:
      'Bilangan bulan pengajian, struktur latihan industri (jika ada), dan syarat kelayakan minimum lepasan SPM akan disahkan secara bertulis sebelum pengambilan dibuka.',
  },
  {
    label: 'Yuran Pengajian, Yuran Pendaftaran & Kos Tambahan',
    statusTag: 'Belum disahkan oleh GIS',
    detail:
      'Jumlah penuh yuran, pakaian seragam, peralatan latihan, atau penginapan (sekiranya berkaitan) tidak dianggarkan secara rambang di halaman draf ini.',
  },
  {
    label: 'Pembiayaan (PTPK), Geran, Diskaun atau Pelan Ansuran',
    statusTag: 'Belum disahkan — tidak diiklankan sebagai tersedia',
    detail:
      'Sebarang kemudahan pinjaman latihan kemahiran, geran, atau bayaran ansuran belum disahkan oleh GIS dan tidak ditawarkan sebagai jaminan buat masa ini.',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: '1. Bagaimana cara anak anda berinteraksi dengan orang yang lebih tua di rumah atau komuniti?',
    options: [
      { value: 'a', label: 'Sabar mendengar, mudah berbual, dan prihatin terhadap keselesaan mereka', score: 3 },
      { value: 'b', label: 'Boleh berinteraksi dengan baik apabila diberi panduan atau tugasan jelas', score: 2 },
      { value: 'c', label: 'Lebih selesa dengan kerja bersendirian dan kurang gemar berbual panjang', score: 1 },
    ],
  },
  {
    id: 'q2',
    prompt: '2. Apakah gaya pembelajaran yang paling membantu anak anda memahami kemahiran baharu?',
    options: [
      { value: 'a', label: 'Belajar melalui demonstrasi, amali tangan, dan latihan berulang', score: 3 },
      { value: 'b', label: 'Gabungan penerangan ringkas di kelas serta contoh praktikal', score: 2 },
      { value: 'c', label: 'Lebih cenderung kepada teori buku semata-mata tanpa kerja fizikal', score: 1 },
    ],
  },
  {
    id: 'q3',
    prompt: '3. Bagaimana reaksi anak anda apabila berdepan situasi yang memerlukan ketenangan dan empati?',
    options: [
      { value: 'a', label: 'Tenang, ringan tulang membantu, dan tidak mudah panik', score: 3 },
      { value: 'b', label: 'Masih belajar mengawal emosi, tetapi terbuka menerima bimbingan', score: 2 },
      { value: 'c', label: 'Cepat tertekan jika berurusan dengan keperluan individu lain', score: 1 },
    ],
  },
  {
    id: 'q4',
    prompt: '4. Adakah anak anda terbuka mempertimbangkan kerjaya bermakna dalam sektor penjagaan selepas SPM?',
    options: [
      { value: 'a', label: 'Ya, anak menunjukkan minat untuk mencuba bidang kemahiran berkaitan manusia', score: 3 },
      { value: 'b', label: 'Masih mencari arah dan perlukan penerangan lanjut bersama ibu bapa', score: 2 },
      { value: 'c', label: 'Belum pasti atau lebih berminat dengan bidang teknikal bukan penjagaan', score: 1 },
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Adakah pekerjaan dijamin 100% sebaik sahaja anak saya tamat program?',
    answer:
      'Tidak. Halaman ini tidak membuat sebarang dakwaan jaminan pekerjaan 100%. Pengambilan pekerja selepas tamat latihan bergantung kepada keperluan majikan, kekosongan jawatan semasa, prestasi pelatih, dan kelayakan pemohon. GIS hanya menyatakan wujudnya kerjasama industri di peringkat umum sehingga nama rakan industri dan terma penempatan disahkan secara rasmi.',
  },
  {
    question: 'Berapakah gaji permulaan dalam bidang penjagaan warga emas dan adakah peluang ke Singapura?',
    answer:
      'Kadar gaji berbeza-beza mengikut negeri, jenis pusat jagaan atau majikan, pengalaman kerja, dan skop tugas. GIS tidak menerbitkan julat gaji tanpa rujukan pasaran tempatan yang sah serta bertarikh, dan tidak menjanjikan pekerjaan, kadar gaji, atau kelayakan pas kerja di Singapura.',
  },
  {
    question: 'Adakah pembiayaan PTPK, biasiswa, atau bayaran ansuran disediakan?',
    answer:
      'Kemudahan pembiayaan seperti PTPK, geran, diskaun, atau pelan bayaran ansuran belum disahkan oleh pihak GIS dan tidak diiklankan sebagai tersedia pada peringkat draf ini. Ibu bapa akan dimaklumkan secara telus sekiranya terdapat pilihan rasmi yang disahkan.',
  },
  {
    question: 'Bolehkah kami melawat kampus dan bilik latihan simulasi sebelum membuat keputusan?',
    answer:
      'Ya, lawatan kampus boleh diatur melalui temujanji konsultasi terlebih dahulu supaya ibu bapa dan anak dapat melihat sendiri suasana pembelajaran serta bertanya terus kepada wakil GIS. Semua foto di halaman draf ini hanyalah gambar ilustrasi sementara.',
  },
  {
    question: 'Adakah semakan kesesuaian anak di halaman ini merupakan ujian kelayakan kemasukan?',
    answer:
      'Bukan. Semakan empat soalan tersebut hanyalah alat pemula perbincangan untuk membantu ibu bapa dan anak melihat kecenderungan minat terhadap bidang penjagaan. Syarat kemasukan rasmi Program SKM akan diumumkan setelah disahkan oleh GIS dan JPK.',
  },
];

export const CONCERN_OPTIONS = [
  'Peluang pekerjaan & halatuju selepas SPM',
  'Gaji & perkembangan kerjaya jangka panjang',
  'Yuran pengajian & pilihan pembiayaan',
  'Suasana pembelajaran & latihan praktikal',
  'Kesesuaian anak dengan bidang penjagaan warga emas',
  'Lawatan kampus & maklumat kemasukan rasmi',
];

export const AGE_GROUP_OPTIONS = [
  '17–18 tahun (Lepasan SPM terkini)',
  '19–21 tahun',
  '22 tahun ke atas',
  'Belum pasti / ingin berbincang dahulu',
];

export const DRAFT_WHATSAPP_DISPLAY = '+60 19-211 5642';
export const DRAFT_WHATSAPP_DIGITS = '60192115642';
