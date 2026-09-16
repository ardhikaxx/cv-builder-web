'use client';

import React from 'react';
import { TextArea } from '@/components/common/FormField';
import { Lightbulb } from 'lucide-react';

interface SummarySectionProps {
  value: string;
  onChange: (val: string) => void;
}

export function SummarySection({ value, onChange }: SummarySectionProps) {
  return (
    <div className="space-y-4">
      <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-lg text-xs text-amber-900 flex items-start gap-2.5 leading-relaxed">
        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Tips Summary Fresh Graduate:</span> Tuliskan 2–4 kalimat (sekitar 40–80 kata) yang merangkum latar belakang pendidikan Anda, keahlian teknis/tools utama yang dikuasai, proyek/magang relevan, serta nilai tambah yang ingin Anda berikan kepada perusahaan.
        </div>
      </div>

      <TextArea
        label="Ringkasan Profesional (Professional Summary)"
        rows={4}
        showCounts
        placeholder="Contoh: Lulusan baru S1 Teknik Informatika dengan fondasi kuat dalam rekayasa perangkat lunak dan arsitektur web modern (React, Next.js, Node.js, Laravel). Memiliki pengalaman 1 tahun magang industri sebagai Full-Stack Developer dan berhasil menyelesaikan 4+ proyek aplikasi nyata. Memiliki semangat kolaborasi tinggi, terbiasa dengan metode Agile/Scrum, dan siap berkontribusi pada pengembangan produk digital perusahaan."
        value={value}
        onChange={e => onChange(e.target.value)}
        helperText="Panjang ideal untuk lembar 1 halaman A4 adalah antara 30 hingga 80 kata."
      />
    </div>
  );
}
