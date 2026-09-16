import { CVData, ATSCheckResult, ATSCheckItem } from '@/types/cv';

const ACTION_VERBS = [
  // Indonesian action verbs
  'mengembangkan', 'merancang', 'membangun', 'mengoptimalkan', 'memimpin',
  'menginisiasi', 'menerapkan', 'mengintegrasikan', 'memelihara', 'menganalisis',
  'meningkatkan', 'mengelola', 'menyusun', 'mengotomatisasi', 'mengkoordinasikan',
  'membuat', 'melakukan', 'memfasilitasi', 'mengorkestrasi',
  // English action verbs
  'developed', 'designed', 'built', 'implemented', 'optimized', 'led',
  'managed', 'engineered', 'created', 'improved', 'automated', 'spearheaded',
  'collaborated', 'integrated', 'delivered', 'orchestrated', 'maintained'
];

export function analyzeCVATS(cv: CVData): ATSCheckResult {
  const passed: ATSCheckItem[] = [];
  const recommended: ATSCheckItem[] = [];
  const missing: ATSCheckItem[] = [];

  // 1. Personal Information Checks
  if (cv.personal.fullName.trim().length >= 3) {
    passed.push({
      id: 'name',
      title: 'Nama Lengkap Terisi',
      description: 'Nama kandidat terbaca jelas sebagai judul utama dokumen.',
      type: 'essential',
      status: 'complete',
      sectionTarget: 'personal',
    });
  } else {
    missing.push({
      id: 'name',
      title: 'Nama Lengkap Belum Diisi',
      description: 'ATS dan recruiter memerlukan nama lengkap di bagian paling atas CV.',
      type: 'essential',
      status: 'missing',
      sectionTarget: 'personal',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(cv.personal.email.trim())) {
    passed.push({
      id: 'email',
      title: 'Email Valid Terisi',
      description: 'Alamat email aktif tersedia untuk korespondensi rekrutmen.',
      type: 'essential',
      status: 'complete',
      sectionTarget: 'personal',
    });
  } else {
    missing.push({
      id: 'email',
      title: 'Email Belum Valid / Kosong',
      description: 'Cantumkan alamat email profesional aktif (contoh: nama@gmail.com).',
      type: 'essential',
      status: 'missing',
      sectionTarget: 'personal',
    });
  }

  if (cv.personal.phone.trim().length >= 8) {
    passed.push({
      id: 'phone',
      title: 'Nomor Telepon Terisi',
      description: 'Nomor telepon/WhatsApp terdaftar untuk undangan interview cepat.',
      type: 'essential',
      status: 'complete',
      sectionTarget: 'personal',
    });
  } else {
    missing.push({
      id: 'phone',
      title: 'Nomor Telepon Kosong',
      description: 'Sertakan nomor kontak aktif dengan kode negara (misal +62).',
      type: 'essential',
      status: 'missing',
      sectionTarget: 'personal',
    });
  }

  if (cv.personal.location.trim().length >= 3) {
    passed.push({
      id: 'location',
      title: 'Domisili / Lokasi Terisi',
      description: 'Kota domisili membantu recruiter memetakan lokasi kerja/relokasi.',
      type: 'essential',
      status: 'complete',
      sectionTarget: 'personal',
    });
  } else {
    missing.push({
      id: 'location',
      title: 'Lokasi Domisili Kosong',
      description: 'Cantumkan kota domisili (cukup "Kota, Provinsi/Negara", tidak perlu alamat lengkap jalan).',
      type: 'essential',
      status: 'missing',
      sectionTarget: 'personal',
    });
  }

  if (cv.personal.headline.trim().length >= 5) {
    passed.push({
      id: 'headline',
      title: 'Professional Headline Spesifik',
      description: 'Memberikan kesan instan mengenai target peran (misal "Fresh Graduate Software Engineer").',
      type: 'recommended',
      status: 'complete',
      sectionTarget: 'personal',
    });
  } else {
    recommended.push({
      id: 'headline',
      title: 'Tambahkan Professional Headline',
      description: 'Tuliskan jabatan atau bidang keahlian target Anda agar CV lebih terarah.',
      type: 'recommended',
      status: 'warning',
      sectionTarget: 'personal',
    });
  }

  if (cv.personal.linkedin.trim().length >= 5) {
    passed.push({
      id: 'linkedin',
      title: 'Tautan LinkedIn Terpasang',
      description: 'Recruiter dapat melakukan verifikasi profil profesional Anda lebih lanjut.',
      type: 'recommended',
      status: 'complete',
      sectionTarget: 'personal',
    });
  } else {
    recommended.push({
      id: 'linkedin',
      title: 'Tautan LinkedIn Belum Ditambahkan',
      description: 'Profil LinkedIn sangat direkomendasikan untuk pelamar profesional dan fresh graduate.',
      type: 'recommended',
      status: 'warning',
      sectionTarget: 'personal',
    });
  }

  if (cv.personal.github.trim().length >= 5 || cv.personal.portfolio.trim().length >= 5) {
    passed.push({
      id: 'portfolio',
      title: 'Tautan Portofolio / GitHub Tersedia',
      description: 'Bukti nyata hasil karya dan kode sumber dapat ditinjau langsung.',
      type: 'recommended',
      status: 'complete',
      sectionTarget: 'personal',
    });
  } else {
    recommended.push({
      id: 'portfolio',
      title: 'Tautan Portofolio / GitHub Disarankan',
      description: 'Untuk fresh graduate (khususnya bidang teknologi & desain), portofolio memperkuat profil.',
      type: 'recommended',
      status: 'warning',
      sectionTarget: 'personal',
    });
  }

  // 2. Summary Checks
  const summaryWords = cv.summary.trim() ? cv.summary.trim().split(/\s+/).length : 0;
  if (summaryWords >= 25 && summaryWords <= 100) {
    passed.push({
      id: 'summary-length',
      title: 'Professional Summary Ideal (25–100 Kata)',
      description: `Summary saat ini memuat ${summaryWords} kata, padat dan relevan.`,
      type: 'recommended',
      status: 'complete',
      sectionTarget: 'summary',
    });
  } else if (summaryWords > 100) {
    recommended.push({
      id: 'summary-length',
      title: 'Ringkasan Summary Terlalu Panjang',
      description: `Summary memuat ${summaryWords} kata. Sebaiknya persingkat menjadi 2–4 kalimat padat agar menghemat ruang A4.`,
      type: 'recommended',
      status: 'warning',
      sectionTarget: 'summary',
    });
  } else if (summaryWords > 0) {
    recommended.push({
      id: 'summary-length',
      title: 'Ringkasan Summary Masih Terlalu Singkat',
      description: `Summary baru ${summaryWords} kata. Tambahkan fokus keahlian, teknologi utama, dan minat karier Anda.`,
      type: 'recommended',
      status: 'warning',
      sectionTarget: 'summary',
    });
  } else {
    recommended.push({
      id: 'summary-length',
      title: 'Professional Summary Belum Diisi',
      description: 'Tambahkan 2–4 kalimat ringkasan tentang profil akademik, kemampuan teknis, dan tujuan karier.',
      type: 'recommended',
      status: 'warning',
      sectionTarget: 'summary',
    });
  }

  // 3. Education Checks
  if (cv.education.length > 0 && cv.education[0].institution.trim()) {
    passed.push({
      id: 'education',
      title: 'Riwayat Pendidikan Terisi',
      description: `${cv.education.length} institusi pendidikan tercantum secara rapi.`,
      type: 'essential',
      status: 'complete',
      sectionTarget: 'education',
    });
  } else {
    missing.push({
      id: 'education',
      title: 'Pendidikan Belum Ditambahkan',
      description: 'Pendidikan adalah salah satu kualifikasi utama bagi fresh graduate yang dipindai ATS.',
      type: 'essential',
      status: 'missing',
      sectionTarget: 'education',
    });
  }

  // 4. Experience OR Projects (Essential for Fresh Graduates)
  const hasExperience = cv.experience.length > 0 && cv.experience.some(e => e.position.trim());
  const hasProjects = cv.projects.length > 0 && cv.projects.some(p => p.title.trim());

  if (hasExperience || hasProjects) {
    passed.push({
      id: 'exp-or-proj',
      title: 'Pengalaman Nyata / Proyek Portofolio Terlampir',
      description: hasExperience && hasProjects
        ? 'Lengkap: Memiliki pengalaman kerja/magang sekaligus proyek portofolio.'
        : hasProjects
        ? 'Bagus: Memiliki proyek portofolio mandiri/akademik yang menjadi bukti kemampuan teknis.'
        : 'Bagus: Memiliki riwayat magang/kerja.',
      type: 'essential',
      status: 'complete',
      sectionTarget: hasProjects ? 'projects' : 'experience',
    });
  } else {
    missing.push({
      id: 'exp-or-proj',
      title: 'Belum Ada Pengalaman Kerja Maupun Proyek',
      description: 'Sertakan minimal 1 proyek akademik/tugas akhir atau pengalaman magang.',
      type: 'essential',
      status: 'missing',
      sectionTarget: 'projects',
    });
  }

  // 5. Skills Checks
  const totalSkills = cv.skills.reduce((acc, cat) => acc + cat.skills.filter(s => s.trim().length > 0).length, 0);
  if (totalSkills >= 6) {
    passed.push({
      id: 'skills',
      title: `Daftar Keahlian Memadai (${totalSkills} Keahlian)`,
      description: 'Keywords keahlian dikelompokkan dengan format teks bersih yang ramah ATS.',
      type: 'essential',
      status: 'complete',
      sectionTarget: 'skills',
    });
  } else if (totalSkills > 0) {
    recommended.push({
      id: 'skills',
      title: `Tambahkan Lebih Banyak Keywords Keahlian (Baru ${totalSkills})`,
      description: 'ATS mencocokkan kata kunci keahlian dari lowongan kerja. Lengkapi keahlian teknis & tools Anda.',
      type: 'recommended',
      status: 'warning',
      sectionTarget: 'skills',
    });
  } else {
    missing.push({
      id: 'skills',
      title: 'Daftar Keahlian (Skills) Masih Kosong',
      description: 'Section skills sangat krusial untuk pencocokan kata kunci pada sistem ATS.',
      type: 'essential',
      status: 'missing',
      sectionTarget: 'skills',
    });
  }

  // 6. Action Verbs Check
  const allBullets = [
    ...cv.experience.flatMap(e => e.bullets),
    ...cv.organization.flatMap(o => o.bullets),
    ...cv.projects.flatMap(p => p.bullets),
  ].filter(b => b.trim().length > 0);

  let bulletsWithActionVerbs = 0;
  for (const bullet of allBullets) {
    const firstWord = bullet.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '');
    if (ACTION_VERBS.some(v => firstWord.startsWith(v) || v.startsWith(firstWord))) {
      bulletsWithActionVerbs++;
    }
  }

  if (allBullets.length > 0 && bulletsWithActionVerbs >= Math.ceil(allBullets.length * 0.4)) {
    passed.push({
      id: 'action-verbs',
      title: 'Penggunaan Action Verbs Efektif',
      description: 'Deskripsi tanggung jawab diawali kata kerja aksi berorientasi hasil.',
      type: 'recommended',
      status: 'complete',
    });
  } else if (allBullets.length > 0) {
    recommended.push({
      id: 'action-verbs',
      title: 'Optimalkan Bullet Points dengan Action Verbs',
      description: 'Awali poin dengan kata kerja aksi aktif (misal: "Mengembangkan...", "Merancang...", "Mengoptimalkan...").',
      type: 'recommended',
      status: 'warning',
    });
  }

  // 7. ATS Best Practice Compliances
  passed.push({
    id: 'layout-ats',
    title: 'Format Single-Column Standar ATS',
    description: 'Layout satu kolom memastikan parser ATS membaca alur teks secara sekuensial tanpa terbalik.',
    type: 'essential',
    status: 'complete',
  });

  passed.push({
    id: 'no-graphics',
    title: 'Bebas Grafik & Progress Bar',
    description: 'Dokumen tidak menggunakan rating bintang atau visual meter yang sering tidak terbaca ATS.',
    type: 'essential',
    status: 'complete',
  });

  // Calculate completeness percentage
  // Essential items: weight 70% total
  // Recommended items: weight 30% total
  const essentialTotal = passed.filter(p => p.type === 'essential').length + missing.filter(m => m.type === 'essential').length;
  const essentialPassed = passed.filter(p => p.type === 'essential').length;
  const essentialScore = essentialTotal > 0 ? (essentialPassed / essentialTotal) * 70 : 0;

  const recTotal = passed.filter(p => p.type === 'recommended').length + recommended.filter(r => r.type === 'recommended').length;
  const recPassed = passed.filter(p => p.type === 'recommended').length;
  const recScore = recTotal > 0 ? (recPassed / recTotal) * 30 : 0;

  const totalScore = Math.min(100, Math.round(essentialScore + recScore));

  let scoreLabel: ATSCheckResult['scoreLabel'] = 'Needs Work';
  if (totalScore >= 90) scoreLabel = 'Excellent';
  else if (totalScore >= 80) scoreLabel = 'Strong';
  else if (totalScore >= 65) scoreLabel = 'Good';
  else if (totalScore >= 50) scoreLabel = 'Fair';

  return {
    completenessPercentage: totalScore,
    scoreLabel,
    passedChecks: passed,
    recommendedChecks: recommended,
    missingChecks: missing,
  };
}
