'use client';

import React from 'react';
import { LanguageItem } from '@/types/cv';
import { TextInput, SelectField } from '@/components/common/FormField';
import { ItemControls, AddItemButton } from '@/components/common/ActionButtons';

interface LanguagesSectionProps {
  items: LanguageItem[];
  onChange: (items: LanguageItem[]) => void;
}

export function LanguagesSection({ items, onChange }: LanguagesSectionProps) {
  const addItem = () => {
    const newItem: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: '',
      proficiency: 'Professional Working Proficiency',
    };
    onChange([...items, newItem]);
  };

  const updateItem = (index: number, field: keyof LanguageItem, value: unknown) => {
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
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 leading-relaxed">
        <span className="font-semibold text-slate-800">Format Standar Teks:</span> Kemampuan bahasa dicantumkan dalam bentuk tingkat kompetensi baku (seperti Fluent atau Professional Working Proficiency) tanpa progress bar grafis.
      </div>

      {items.length === 0 && (
        <div className="p-4 text-center border border-dashed border-slate-300 rounded-lg text-xs text-slate-500">
          Belum ada bahasa yang ditambahkan. Klik tombol di bawah.
        </div>
      )}

      {items.map((item, index) => (
        <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
          <ItemControls
            title={item.language || `Bahasa #${index + 1}`}
            onMoveUp={() => moveItem(index, 'up')}
            onMoveDown={() => moveItem(index, 'down')}
            onDelete={() => removeItem(index)}
            canMoveUp={index > 0}
            canMoveDown={index < items.length - 1}
          />

          <div className="p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TextInput
              label="Nama Bahasa"
              required
              placeholder="Contoh: Bahasa Indonesia / English"
              value={item.language}
              onChange={e => updateItem(index, 'language', e.target.value)}
            />

            <SelectField
              label="Tingkat Kemampuan"
              value={item.proficiency}
              onChange={e => updateItem(index, 'proficiency', e.target.value)}
              options={[
                { label: 'Native / Penutur Asli', value: 'Native' },
                { label: 'Fluent / Sangat Fasih', value: 'Fluent' },
                { label: 'Professional Working Proficiency', value: 'Professional Working Proficiency' },
                { label: 'Intermediate / Menengah', value: 'Intermediate' },
                { label: 'Elementary / Dasar', value: 'Elementary' },
              ]}
            />
          </div>
        </div>
      ))}

      <AddItemButton onClick={addItem} label="Tambah Bahasa" />
    </div>
  );
}
