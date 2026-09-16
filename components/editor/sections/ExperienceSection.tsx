'use client';

import React from 'react';
import { ExperienceItem } from '@/types/cv';
import { TextInput, SelectField } from '@/components/common/FormField';
import { ItemControls, AddItemButton } from '@/components/common/ActionButtons';
import { Plus, Trash2, Sparkles } from 'lucide-react';

interface ExperienceSectionProps {
  items: ExperienceItem[];
  onChange: (items: ExperienceItem[]) => void;
}

export function ExperienceSection({ items, onChange }: ExperienceSectionProps) {
  const addItem = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      position: '',
      company: '',
      location: '',
      employmentType: 'Internship',
      startDate: '',
      endDate: '',
      isCurrent: false,
      bullets: [''],
    };
    onChange([...items, newItem]);
  };

  const updateItem = (index: number, field: keyof ExperienceItem, value: unknown) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated);
  };

  const addBullet = (expIndex: number) => {
    const updated = [...items];
    updated[expIndex].bullets.push('');
    onChange(updated);
  };

  const updateBullet = (expIndex: number, bulletIndex: number, text: string) => {
    const updated = [...items];
    updated[expIndex].bullets[bulletIndex] = text;
    onChange(updated);
  };

  const removeBullet = (expIndex: number, bulletIndex: number) => {
    const updated = [...items];
    updated[expIndex].bullets = updated[expIndex].bullets.filter((_, i) => i !== bulletIndex);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Helper guide on Action Verbs & XYZ formula */}
      <div className="p-3 bg-blue-50/60 border border-blue-200/70 rounded-lg text-xs text-blue-900 flex items-start gap-2.5 leading-relaxed">
        <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Formula ATS (Action + Task + Result):</span> Awali setiap poin dengan kata kerja aksi terukur, contoh:
          <span className="font-medium text-blue-950"> Developed, Designed, Implemented, Managed, Improved, Led, Built, Optimized.</span> Cantumkan metrik jika ada (misal: &quot;meningkatkan efisiensi 30%&quot;, &quot;digunakan 1.000+ pengguna&quot;).
        </div>
      </div>

      {items.length === 0 && (
        <div className="p-4 text-center border border-dashed border-slate-300 rounded-lg text-xs text-slate-500">
          Belum ada riwayat pengalaman kerja/magang. Klik tombol di bawah untuk menambahkan.
        </div>
      )}

      {items.map((item, index) => (
        <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
          <ItemControls
            title={item.position ? `${item.position} - ${item.company}` : `Pengalaman #${index + 1}`}
            onMoveUp={() => moveItem(index, 'up')}
            onMoveDown={() => moveItem(index, 'down')}
            onDelete={() => removeItem(index)}
            canMoveUp={index > 0}
            canMoveDown={index < items.length - 1}
          />

          <div className="p-3.5 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TextInput
                label="Posisi / Jabatan"
                required
                placeholder="Contoh: Frontend Developer Intern"
                value={item.position}
                onChange={e => updateItem(index, 'position', e.target.value)}
              />

              <TextInput
                label="Perusahaan / Instansi"
                required
                placeholder="Contoh: PT Solusi Digital Nusantara"
                value={item.company}
                onChange={e => updateItem(index, 'company', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <TextInput
                label="Lokasi / Status Kerja"
                placeholder="Contoh: Jakarta / Remote"
                value={item.location}
                onChange={e => updateItem(index, 'location', e.target.value)}
              />

              <SelectField
                label="Tipe Pekerjaan"
                value={item.employmentType}
                onChange={e => updateItem(index, 'employmentType', e.target.value)}
                options={[
                  { label: 'Internship / Magang', value: 'Internship' },
                  { label: 'Full-Time', value: 'Full-time' },
                  { label: 'Contract / Project-Based', value: 'Contract' },
                  { label: 'Part-Time', value: 'Part-time' },
                  { label: 'Freelance', value: 'Freelance' },
                  { label: 'Apprenticeship', value: 'Apprenticeship' },
                ]}
              />

              <div>
                <div className="grid grid-cols-2 gap-2">
                  <TextInput
                    label="Mulai"
                    placeholder="Feb 2024"
                    value={item.startDate}
                    onChange={e => updateItem(index, 'startDate', e.target.value)}
                  />
                  <TextInput
                    label="Selesai"
                    placeholder="Agu 2024"
                    disabled={item.isCurrent}
                    value={item.endDate}
                    onChange={e => updateItem(index, 'endDate', e.target.value)}
                  />
                </div>
                <label className="flex items-center gap-2 mt-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.isCurrent}
                    onChange={e => updateItem(index, 'isCurrent', e.target.checked)}
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-400 w-3.5 h-3.5"
                  />
                  <span className="text-[11px] text-slate-600">Masih bekerja saat ini</span>
                </label>
              </div>
            </div>

            {/* Bullet Points */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-700">
                Poin Tanggung Jawab & Pencapaian (Bullet Points)
              </label>

              <div className="space-y-2">
                {item.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2">
                    <span className="text-slate-400 text-xs mt-2">•</span>
                    <textarea
                      rows={2}
                      value={bullet}
                      onChange={e => updateBullet(index, bIdx, e.target.value)}
                      placeholder="Contoh: Mengembangkan modul dashboard dengan Next.js dan TypeScript yang mempercepat loading halaman 35%."
                      className="flex-1 px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg hover:border-slate-300 focus:ring-2 focus:ring-slate-400 focus:outline-none custom-scrollbar"
                    />
                    <button
                      type="button"
                      onClick={() => removeBullet(index, bIdx)}
                      disabled={item.bullets.length <= 1}
                      aria-label="Hapus poin"
                      className="text-slate-400 hover:text-rose-600 p-1.5 rounded disabled:opacity-20 hover:bg-rose-50 transition-colors mt-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => addBullet(index)}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 hover:text-slate-900 py-1 px-2.5 bg-slate-100 hover:bg-slate-200/80 rounded-md transition-colors"
              >
                <Plus className="w-3 h-3" /> Tambah Poin
              </button>
            </div>
          </div>
        </div>
      ))}

      <AddItemButton onClick={addItem} label="Tambah Pengalaman Kerja / Magang" />
    </div>
  );
}
