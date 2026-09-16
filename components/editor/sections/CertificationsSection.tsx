'use client';

import React from 'react';
import { CertificationItem } from '@/types/cv';
import { TextInput } from '@/components/common/FormField';
import { ItemControls, AddItemButton } from '@/components/common/ActionButtons';

interface CertificationsSectionProps {
  items: CertificationItem[];
  onChange: (items: CertificationItem[]) => void;
}

export function CertificationsSection({ items, onChange }: CertificationsSectionProps) {
  const addItem = () => {
    const newItem: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      issueDate: '',
      expirationDate: '',
      doesNotExpire: true,
      credentialId: '',
      credentialUrl: '',
    };
    onChange([...items, newItem]);
  };

  const updateItem = (index: number, field: keyof CertificationItem, value: unknown) => {
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
          Belum ada sertifikasi. Klik tombol di bawah jika memiliki sertifikasi relevan.
        </div>
      )}

      {items.map((item, index) => (
        <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
          <ItemControls
            title={item.name ? `${item.name} (${item.issuer})` : `Sertifikasi #${index + 1}`}
            onMoveUp={() => moveItem(index, 'up')}
            onMoveDown={() => moveItem(index, 'down')}
            onDelete={() => removeItem(index)}
            canMoveUp={index > 0}
            canMoveDown={index < items.length - 1}
          />

          <div className="p-3.5 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TextInput
                label="Nama Sertifikasi"
                required
                placeholder="Contoh: AWS Certified Cloud Practitioner"
                value={item.name}
                onChange={e => updateItem(index, 'name', e.target.value)}
              />

              <TextInput
                label="Lembaga Penerbit (Issuing Organization)"
                required
                placeholder="Contoh: Amazon Web Services / Dicoding"
                value={item.issuer}
                onChange={e => updateItem(index, 'issuer', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
              <TextInput
                label="Bulan & Tahun Terbit"
                placeholder="Jan 2025"
                value={item.issueDate}
                onChange={e => updateItem(index, 'issueDate', e.target.value)}
              />

              <div>
                <TextInput
                  label="Masa Berlaku Hingga"
                  placeholder="Jan 2028"
                  disabled={item.doesNotExpire}
                  value={item.expirationDate || ''}
                  onChange={e => updateItem(index, 'expirationDate', e.target.value)}
                />
                <label className="flex items-center gap-2 mt-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.doesNotExpire}
                    onChange={e => updateItem(index, 'doesNotExpire', e.target.checked)}
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-400 w-3.5 h-3.5"
                  />
                  <span className="text-[11px] text-slate-600">Tidak ada kedaluwarsa</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TextInput
                label="ID Kredensial / Sertifikat (Opsional)"
                placeholder="Contoh: AWS-983142"
                value={item.credentialId || ''}
                onChange={e => updateItem(index, 'credentialId', e.target.value)}
              />

              <TextInput
                label="URL Verifikasi (Opsional)"
                placeholder="https://verify.certificate.com/..."
                value={item.credentialUrl || ''}
                onChange={e => updateItem(index, 'credentialUrl', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <AddItemButton onClick={addItem} label="Tambah Sertifikasi" />
    </div>
  );
}
