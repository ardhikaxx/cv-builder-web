'use client';

import React, { useMemo } from 'react';
import { ProjectItem } from '@/types/cv';
import { TextInput } from '@/components/common/FormField';
import { ItemControls, AddItemButton } from '@/components/common/ActionButtons';
import { Plus, Trash2, Code2 } from 'lucide-react';

interface ProjectsSectionProps {
  items: ProjectItem[];
  onChange: (items: ProjectItem[]) => void;
}

export function ProjectsSection({ items, onChange }: ProjectsSectionProps) {
  const addItem = () => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: '',
      role: 'Full-Stack Developer',
      startDate: '',
      endDate: '',
      techStack: [],
      link: '',
      githubLink: '',
      bullets: [''],
    };
    onChange([...items, newItem]);
  };

  const updateItem = (index: number, field: keyof ProjectItem, value: unknown) => {
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

  const updateTechStackString = (index: number, raw: string) => {
    const hasTrailingComma = raw.endsWith(',');
    const split = raw.split(',').map(s => s.trim()).filter(Boolean);
    if (hasTrailingComma) split.push('');
    updateItem(index, 'techStack', split);
  };

  const addBullet = (projIndex: number) => {
    const updated = [...items];
    updated[projIndex].bullets.push('');
    onChange(updated);
  };

  const updateBullet = (projIndex: number, bulletIndex: number, text: string) => {
    const updated = [...items];
    updated[projIndex].bullets[bulletIndex] = text;
    onChange(updated);
  };

  const removeBullet = (projIndex: number, bulletIndex: number) => {
    const updated = [...items];
    updated[projIndex].bullets = updated[projIndex].bullets.filter((_, i) => i !== bulletIndex);
    onChange(updated);
  };

  const parseStartDate = (dateStr: string): number => {
    if (!dateStr) return -1;
    const months: Record<string, number> = {
      'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'Mei': 5, 'Jun': 6,
      'Jul': 7, 'Agu': 8, 'Sep': 9, 'Okt': 10, 'Nov': 11, 'Des': 12,
    };
    const parts = dateStr.trim().split(/\s+/);
    if (parts.length < 2) return -1;
    const month = months[parts[0]];
    const year = parseInt(parts[1]);
    if (!month || isNaN(year)) return -1;
    return year * 12 + month;
  };

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => parseStartDate(b.startDate) - parseStartDate(a.startDate));
  }, [items]);

  const getRealIndex = (itemId: string) => items.findIndex(i => i.id === itemId);

  return (
    <div className="space-y-4">
      <div className="p-3 bg-emerald-50/60 border border-emerald-200/70 rounded-lg text-xs text-emerald-900 flex items-start gap-2.5 leading-relaxed">
        <Code2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Paling Penting Bagi Fresh Graduate IT:</span> Proyek portofolio adalah bukti nyata kompetensi teknis Anda. Tuliskan teknologi yang digunakan secara spesifik (misal: Next.js, TypeScript, PostgreSQL) dan tautan kode sumber di GitHub.
        </div>
      </div>

      {items.length === 0 && (
        <div className="p-4 text-center border border-dashed border-slate-300 rounded-lg text-xs text-slate-500">
          Belum ada proyek portofolio. Klik tombol di bawah untuk menambahkan.
        </div>
      )}

      {sortedItems.map((item, displayIndex) => {
        const index = getRealIndex(item.id);
        return (
        <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
          <ItemControls
            title={item.title ? `${item.title} (${item.role || 'Developer'})` : `Proyek #${displayIndex + 1}`}
            onMoveUp={() => moveItem(index, 'up')}
            onMoveDown={() => moveItem(index, 'down')}
            onDelete={() => removeItem(index)}
            canMoveUp={index > 0}
            canMoveDown={index < items.length - 1}
          />

          <div className="p-3.5 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TextInput
                label="Nama Proyek"
                required
                placeholder="Contoh: StoreHub - B2B POS & Inventory Platform"
                value={item.title}
                onChange={e => updateItem(index, 'title', e.target.value)}
              />

              <TextInput
                label="Peran dalam Proyek"
                placeholder="Contoh: Full-Stack Developer / Solo Creator"
                value={item.role}
                onChange={e => updateItem(index, 'role', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TextInput
                label="Teknologi / Tech Stack (Pisahkan dengan koma)"
                placeholder="Contoh: Next.js, TypeScript, Tailwind CSS, PostgreSQL, Prisma"
                value={item.techStack.join(', ')}
                onChange={e => updateTechStackString(index, e.target.value)}
                helperText="Teknologi utama yang digunakan pada proyek ini"
              />

              <div className="grid grid-cols-2 gap-2">
                <TextInput
                  label="Mulai"
                  placeholder="Agu 2024"
                  value={item.startDate}
                  onChange={e => updateItem(index, 'startDate', e.target.value)}
                />
                <TextInput
                  label="Selesai"
                  placeholder="Nov 2024"
                  value={item.endDate}
                  onChange={e => updateItem(index, 'endDate', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TextInput
                label="Link Demo / Website Live (Opsional)"
                placeholder="https://proyek-demo.vercel.app"
                value={item.link || ''}
                onChange={e => updateItem(index, 'link', e.target.value)}
              />

              <TextInput
                label="Link Repository GitHub (Opsional)"
                placeholder="github.com/username/repo-name"
                value={item.githubLink || ''}
                onChange={e => updateItem(index, 'githubLink', e.target.value)}
              />
            </div>

            {/* Bullet points */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-700">
                Deskripsi Fitur & Dampak Proyek
              </label>

              <div className="space-y-2">
                {item.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2">
                    <span className="text-slate-400 text-xs mt-2">•</span>
                    <textarea
                      rows={2}
                      value={bullet}
                      onChange={e => updateBullet(index, bIdx, e.target.value)}
                      placeholder="Contoh: Merancang dan membangun fitur pelacakan inventaris multi-gudang dengan responsivitas tinggi menggunakan Server Actions."
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
                <Plus className="w-3 h-3" /> Tambah Poin Proyek
              </button>
            </div>
          </div>
        </div>
        );
      })}

      <AddItemButton onClick={addItem} label="Tambah Proyek Portofolio" />
    </div>
  );
}
