'use client';

import React from 'react';
import { PersonalInfo } from '@/types/cv';
import { TextInput, TextArea } from '@/components/common/FormField';
import { Info } from 'lucide-react';

interface PersonalInfoSectionProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export function PersonalInfoSection({ data, onChange }: PersonalInfoSectionProps) {
  const updateField = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="space-y-4">
      {/* ATS Photo Clarification Note */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-start gap-2.5 leading-relaxed">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-800">Catatan Standar ATS:</span> Foto profil sengaja tidak disediakan. Mesin pemindai ATS (Applicant Tracking System) memproses dokumen berbasis plain-text hierarkis; foto sering memicu parsing error dan memakan ruang halaman A4.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <TextInput
          label="Nama Lengkap"
          required
          placeholder="Contoh: Alex Pratama"
          value={data.fullName}
          onChange={e => updateField('fullName', e.target.value)}
          helperText="Gunakan nama lengkap tanpa gelar non-akademik di awal"
        />

        <TextInput
          label="Professional Title / Target Peran"
          placeholder="Contoh: Fresh Graduate Software Engineer | Web & Mobile"
          value={data.headline}
          onChange={e => updateField('headline', e.target.value)}
          helperText="Posisi atau bidang keahlian target Anda"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <TextInput
          label="Email"
          type="email"
          required
          placeholder="nama@email.com"
          value={data.email}
          onChange={e => updateField('email', e.target.value)}
        />

        <TextInput
          label="Nomor Telepon / WhatsApp"
          required
          placeholder="+62 812-3456-7890"
          value={data.phone}
          onChange={e => updateField('phone', e.target.value)}
        />

        <TextInput
          label="Domisili / Lokasi"
          required
          placeholder="Jakarta, Indonesia"
          value={data.location}
          onChange={e => updateField('location', e.target.value)}
          helperText="Cukup tulis Kota, Provinsi/Negara"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-slate-100">
        <TextInput
          label="LinkedIn"
          placeholder="linkedin.com/in/username"
          value={data.linkedin}
          onChange={e => updateField('linkedin', e.target.value)}
          helperText="Bisa berupa tautan pendek atau username profil"
        />

        <TextInput
          label="GitHub"
          placeholder="github.com/username"
          value={data.github}
          onChange={e => updateField('github', e.target.value)}
          helperText="Krusial untuk pelamar IT/Software/Data"
        />

        <TextInput
          label="Portofolio / Website"
          placeholder="portofolio.dev"
          value={data.portfolio}
          onChange={e => updateField('portfolio', e.target.value)}
        />
      </div>

      <TextArea
        label="Informasi Tambahan Kontak (Opsional)"
        placeholder="Contoh: Bersedia relokasi atau penempatan kerja full-time / on-site / remote."
        rows={2}
        value={data.additionalInfo || ''}
        onChange={e => updateField('additionalInfo', e.target.value)}
        helperText="Informasi singkat seperti ketersediaan mulai kerja atau kesiapan relokasi"
      />
    </div>
  );
}
