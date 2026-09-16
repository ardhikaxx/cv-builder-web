'use client';

import React from 'react';
import { OrganizationItem } from '@/types/cv';
import { TextInput } from '@/components/common/FormField';
import { ItemControls, AddItemButton } from '@/components/common/ActionButtons';
import { Plus, Trash2 } from 'lucide-react';

interface OrganizationSectionProps {
  items: OrganizationItem[];
  onChange: (items: OrganizationItem[]) => void;
}

export function OrganizationSection({ items, onChange }: OrganizationSectionProps) {
  const addItem = () => {
    const newItem: OrganizationItem = {
      id: `org-${Date.now()}`,
      organization: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      bullets: [''],
    };
    onChange([...items, newItem]);
  };

  const updateItem = (index: number, field: keyof OrganizationItem, value: unknown) => {
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

  const addBullet = (orgIndex: number) => {
    const updated = [...items];
    updated[orgIndex].bullets.push('');
    onChange(updated);
  };

  const updateBullet = (orgIndex: number, bulletIndex: number, text: string) => {
    const updated = [...items];
    updated[orgIndex].bullets[bulletIndex] = text;
    onChange(updated);
  };

  const removeBullet = (orgIndex: number, bulletIndex: number) => {
    const updated = [...items];
    updated[orgIndex].bullets = updated[orgIndex].bullets.filter((_, i) => i !== bulletIndex);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 leading-relaxed">
        <span className="font-semibold text-slate-800">Sangat Berharga untuk Fresh Graduate:</span> Pengalaman organisasi, kepanitiaan kampus, dan komunitas membuktikan kepemimpinan (leadership), kerjasama tim, dan inisiatif nyata sebelum memasuki dunia kerja penuh waktu.
      </div>

      {items.length === 0 && (
        <div className="p-4 text-center border border-dashed border-slate-300 rounded-lg text-xs text-slate-500">
          Belum ada pengalaman organisasi. Klik tombol di bawah untuk menambahkan.
        </div>
      )}

      {items.map((item, index) => (
        <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
          <ItemControls
            title={item.organization ? `${item.role || 'Staff'} - ${item.organization}` : `Organisasi #${index + 1}`}
            onMoveUp={() => moveItem(index, 'up')}
            onMoveDown={() => moveItem(index, 'down')}
            onDelete={() => removeItem(index)}
            canMoveUp={index > 0}
            canMoveDown={index < items.length - 1}
          />

          <div className="p-3.5 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TextInput
                label="Nama Organisasi / Komunitas"
                required
                placeholder="Contoh: Himpunan Mahasiswa Informatika / GDSC"
                value={item.organization}
                onChange={e => updateItem(index, 'organization', e.target.value)}
              />

              <TextInput
                label="Peran / Jabatan"
                required
                placeholder="Contoh: Koordinator Divisi Web / Anggota Inti"
                value={item.role}
                onChange={e => updateItem(index, 'role', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TextInput
                label="Lokasi / Kampus"
                placeholder="Contoh: Universitas Indonesia, Depok"
                value={item.location}
                onChange={e => updateItem(index, 'location', e.target.value)}
              />

              <div>
                <div className="grid grid-cols-2 gap-2">
                  <TextInput
                    label="Mulai"
                    placeholder="Sep 2023"
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
                  <span className="text-[11px] text-slate-600">Masih aktif menjabat</span>
                </label>
              </div>
            </div>

            {/* Bullet points */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-700">
                Kontribusi & Kegiatan Utama
              </label>

              <div className="space-y-2">
                {item.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2">
                    <span className="text-slate-400 text-xs mt-2">•</span>
                    <textarea
                      rows={2}
                      value={bullet}
                      onChange={e => updateBullet(index, bIdx, e.target.value)}
                      placeholder="Contoh: Mengorganisir webinar teknologi berskala nasional yang dihadiri lebih dari 300 peserta."
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
                <Plus className="w-3 h-3" /> Tambah Poin Kontribusi
              </button>
            </div>
          </div>
        </div>
      ))}

      <AddItemButton onClick={addItem} label="Tambah Pengalaman Organisasi" />
    </div>
  );
}
