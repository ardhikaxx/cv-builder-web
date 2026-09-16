'use client';

import React from 'react';
import { AchievementItem } from '@/types/cv';
import { TextInput, TextArea } from '@/components/common/FormField';
import { ItemControls, AddItemButton } from '@/components/common/ActionButtons';

interface AchievementsSectionProps {
  items: AchievementItem[];
  onChange: (items: AchievementItem[]) => void;
}

export function AchievementsSection({ items, onChange }: AchievementsSectionProps) {
  const addItem = () => {
    const newItem: AchievementItem = {
      id: `ach-${Date.now()}`,
      title: '',
      issuerOrEvent: '',
      year: new Date().getFullYear().toString(),
      description: '',
    };
    onChange([...items, newItem]);
  };

  const updateItem = (index: number, field: keyof AchievementItem, value: unknown) => {
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

  return (
    <div className="space-y-4">
      {items.length === 0 && (
        <div className="p-4 text-center border border-dashed border-slate-300 rounded-lg text-xs text-slate-500">
          Belum ada penghargaan atau prestasi. Klik tombol di bawah jika memiliki pencapaian akademik/kompetisi.
        </div>
      )}

      {items.map((item, index) => (
        <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
          <ItemControls
            title={item.title || `Prestasi #${index + 1}`}
            onMoveUp={() => moveItem(index, 'up')}
            onMoveDown={() => moveItem(index, 'down')}
            onDelete={() => removeItem(index)}
            canMoveUp={index > 0}
            canMoveDown={index < items.length - 1}
          />

          <div className="p-3.5 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TextInput
                label="Nama Prestasi / Juara / Penghargaan"
                required
                placeholder="Contoh: Juara 1 - National Hackathon InnovateTech"
                value={item.title}
                onChange={e => updateItem(index, 'title', e.target.value)}
              />

              <div className="grid grid-cols-2 gap-2">
                <TextInput
                  label="Penyelenggara / Event"
                  placeholder="Contoh: TechFest Indonesia"
                  value={item.issuerOrEvent}
                  onChange={e => updateItem(index, 'issuerOrEvent', e.target.value)}
                />
                <TextInput
                  label="Tahun"
                  placeholder="Contoh: 2024"
                  value={item.year}
                  onChange={e => updateItem(index, 'year', e.target.value)}
                />
              </div>
            </div>

            <TextArea
              label="Keterangan Tambahan Singkat (Opsional)"
              placeholder="Contoh: Mengembangkan purwarupa aplikasi penanganan sampah cerdas dan bersaing dengan 80+ tim universitas tingkat nasional."
              rows={2}
              value={item.description || ''}
              onChange={e => updateItem(index, 'description', e.target.value)}
            />
          </div>
        </div>
      ))}

      <AddItemButton onClick={addItem} label="Tambah Penghargaan / Prestasi" />
    </div>
  );
}
