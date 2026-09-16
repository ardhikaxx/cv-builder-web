'use client';

import React from 'react';
import { AdditionalItem } from '@/types/cv';
import { TextInput, TextArea } from '@/components/common/FormField';
import { ItemControls, AddItemButton } from '@/components/common/ActionButtons';

interface AdditionalSectionProps {
  items: AdditionalItem[];
  onChange: (items: AdditionalItem[]) => void;
}

export function AdditionalSection({ items, onChange }: AdditionalSectionProps) {
  const addItem = () => {
    const newItem: AdditionalItem = {
      id: `add-${Date.now()}`,
      title: 'Aktivitas Sukarelawan / Volunteer',
      content: '',
    };
    onChange([...items, newItem]);
  };

  const updateItem = (index: number, field: keyof AdditionalItem, value: string) => {
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
          Belum ada informasi tambahan. Klik tombol di bawah jika ingin mencantumkan kegiatan volunteer, publikasi, atau asosiasi profesional.
        </div>
      )}

      {items.map((item, index) => (
        <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
          <ItemControls
            title={item.title || `Informasi Tambahan #${index + 1}`}
            onMoveUp={() => moveItem(index, 'up')}
            onMoveDown={() => moveItem(index, 'down')}
            onDelete={() => removeItem(index)}
            canMoveUp={index > 0}
            canMoveDown={index < items.length - 1}
          />

          <div className="p-3.5 space-y-3">
            <TextInput
              label="Judul Kategori / Aktivitas"
              required
              placeholder="Contoh: Kegiatan Relawan / Publikasi Ilmiah / Asosiasi Profesi"
              value={item.title}
              onChange={e => updateItem(index, 'title', e.target.value)}
            />

            <TextArea
              label="Deskripsi / Isi Informasi"
              required
              rows={2}
              placeholder="Contoh: Mengajar pemrograman dasar untuk 30 siswa sekolah menengah di program sosial kampus."
              value={item.content}
              onChange={e => updateItem(index, 'content', e.target.value)}
            />
          </div>
        </div>
      ))}

      <AddItemButton onClick={addItem} label="Tambah Informasi Tambahan" />
    </div>
  );
}
