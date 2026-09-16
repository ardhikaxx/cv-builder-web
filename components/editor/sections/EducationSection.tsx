'use client';

import React from 'react';
import { EducationItem } from '@/types/cv';
import { TextInput, TextArea } from '@/components/common/FormField';
import { ItemControls, AddItemButton } from '@/components/common/ActionButtons';

interface EducationSectionProps {
  items: EducationItem[];
  onChange: (items: EducationItem[]) => void;
}

export function EducationSection({ items, onChange }: EducationSectionProps) {
  const addItem = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: 'Sarjana Komputer (S.Kom)',
      fieldOfStudy: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      gpa: '',
      maxGpa: '4.00',
      description: '',
    };
    onChange([...items, newItem]);
  };

  const updateItem = (index: number, field: keyof EducationItem, value: unknown) => {
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
          Belum ada riwayat pendidikan. Klik tombol di bawah untuk menambahkan.
        </div>
      )}

      {items.map((item, index) => (
        <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
          <ItemControls
            title={item.institution || `Pendidikan #${index + 1}`}
            onMoveUp={() => moveItem(index, 'up')}
            onMoveDown={() => moveItem(index, 'down')}
            onDelete={() => removeItem(index)}
            canMoveUp={index > 0}
            canMoveDown={index < items.length - 1}
          />

          <div className="p-3.5 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TextInput
                label="Nama Universitas / Institusi"
                required
                placeholder="Contoh: Universitas Indonesia"
                value={item.institution}
                onChange={e => updateItem(index, 'institution', e.target.value)}
              />

              <TextInput
                label="Jenjang & Gelar"
                placeholder="Contoh: Sarjana Komputer (S.Kom) / S1"
                value={item.degree}
                onChange={e => updateItem(index, 'degree', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TextInput
                label="Jurusan / Program Studi"
                required
                placeholder="Contoh: Teknik Informatika / Ilmu Komputer"
                value={item.fieldOfStudy}
                onChange={e => updateItem(index, 'fieldOfStudy', e.target.value)}
              />

              <TextInput
                label="Kota / Lokasi Kampus"
                placeholder="Contoh: Depok, Jawa Barat"
                value={item.location}
                onChange={e => updateItem(index, 'location', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
              <TextInput
                label="Tahun Mulai"
                placeholder="Contoh: 2021"
                value={item.startDate}
                onChange={e => updateItem(index, 'startDate', e.target.value)}
              />

              <div>
                <TextInput
                  label="Tahun Lulus"
                  placeholder="Contoh: 2025"
                  disabled={item.isCurrent}
                  value={item.endDate}
                  onChange={e => updateItem(index, 'endDate', e.target.value)}
                />
                <label className="flex items-center gap-2 mt-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.isCurrent}
                    onChange={e => updateItem(index, 'isCurrent', e.target.checked)}
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-400 w-3.5 h-3.5"
                  />
                  <span className="text-[11px] text-slate-600">Sedang menempuh (Expected)</span>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <TextInput
                  label="IPK / GPA"
                  placeholder="3.80"
                  value={item.gpa || ''}
                  onChange={e => updateItem(index, 'gpa', e.target.value)}
                  helperText="Opsional"
                />
                <TextInput
                  label="Skala Maks"
                  placeholder="4.00"
                  value={item.maxGpa || '4.00'}
                  onChange={e => updateItem(index, 'maxGpa', e.target.value)}
                />
              </div>
            </div>

            <TextArea
              label="Prestasi Akademik / Mata Kuliah Relevan (Relevant Coursework)"
              placeholder="Contoh: Predikat Cum Laude. Mata kuliah relevan: Struktur Data & Algoritma, Rekayasa Perangkat Lunak, Basis Data, Arsitektur Sistem Komputer."
              rows={2}
              value={item.description || ''}
              onChange={e => updateItem(index, 'description', e.target.value)}
              helperText="Tuliskan mata kuliah atau pencapaian akademik yang relevan dengan pekerjaan yang dilamar"
            />
          </div>
        </div>
      ))}

      <AddItemButton onClick={addItem} label="Tambah Riwayat Pendidikan" />
    </div>
  );
}
