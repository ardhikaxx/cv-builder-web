import { SectionMeta } from '@/types/cv';

export const DEFAULT_SECTION_ORDER: SectionMeta[] = [
  { key: 'personal', label: 'Informasi Pribadi', visible: true },
  { key: 'summary', label: 'Professional Summary', visible: true },
  { key: 'education', label: 'Pendidikan', visible: true },
  { key: 'skills', label: 'Keahlian & Teknologi (Skills)', visible: true },
  { key: 'projects', label: 'Proyek Portofolio (Projects)', visible: true },
  { key: 'experience', label: 'Pengalaman Kerja / Magang', visible: true },
  { key: 'organization', label: 'Organisasi & Kepemimpinan', visible: true },
  { key: 'certifications', label: 'Sertifikasi', visible: true },
  { key: 'achievements', label: 'Penghargaan & Prestasi', visible: true },
  { key: 'languages', label: 'Bahasa', visible: true },
  { key: 'additional', label: 'Informasi Tambahan', visible: true },
];
