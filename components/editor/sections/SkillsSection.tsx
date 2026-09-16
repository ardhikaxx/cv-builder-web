'use client';

import React from 'react';
import { SkillCategory } from '@/types/cv';
import { TextInput } from '@/components/common/FormField';
import { ItemControls, AddItemButton } from '@/components/common/ActionButtons';
import { ShieldAlert } from 'lucide-react';

interface SkillsSectionProps {
  categories: SkillCategory[];
  onChange: (categories: SkillCategory[]) => void;
}

export function SkillsSection({ categories, onChange }: SkillsSectionProps) {
  const addCategory = () => {
    const newCategory: SkillCategory = {
      id: `cat-${Date.now()}`,
      name: 'Kategori Keahlian Baru',
      skills: [],
    };
    onChange([...categories, newCategory]);
  };

  const updateCategoryName = (index: number, name: string) => {
    const updated = [...categories];
    updated[index].name = name;
    onChange(updated);
  };

  const updateSkillsString = (index: number, rawString: string) => {
    const updated = [...categories];
    // Keep raw string parsing clean
    const skillsList = rawString.split(',').map(s => s.trim()).filter(Boolean);
    updated[index].skills = skillsList;
    onChange(updated);
  };

  const removeCategory = (index: number) => {
    onChange(categories.filter((_, i) => i !== index));
  };

  const moveCategory = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;
    const updated = [...categories];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* ATS Rule Reminder */}
      <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-lg text-xs text-amber-900 flex items-start gap-2.5 leading-relaxed">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Aturan Standar ATS:</span> Jangan gunakan rating bintang (⭐⭐⭐), persentase (85%), atau progress bar grafis. Sistem ATS hanya memindai teks kata kunci nama teknologi untuk mencocokkan dengan kualifikasi pekerjaan.
        </div>
      </div>

      {categories.length === 0 && (
        <div className="p-4 text-center border border-dashed border-slate-300 rounded-lg text-xs text-slate-500">
          Belum ada kategori keahlian. Klik tombol di bawah untuk menambahkan kategori.
        </div>
      )}

      {categories.map((cat, index) => (
        <div key={cat.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
          <ItemControls
            title={cat.name || `Kategori #${index + 1}`}
            onMoveUp={() => moveCategory(index, 'up')}
            onMoveDown={() => moveCategory(index, 'down')}
            onDelete={() => removeCategory(index)}
            canMoveUp={index > 0}
            canMoveDown={index < categories.length - 1}
          />

          <div className="p-3.5 space-y-3">
            <TextInput
              label="Nama Kategori Keahlian"
              required
              placeholder="Contoh: Bahasa Pemrograman / Frameworks / Tools & Cloud"
              value={cat.name}
              onChange={e => updateCategoryName(index, e.target.value)}
            />

            <TextInput
              label="Daftar Keahlian (Pisahkan dengan koma)"
              required
              placeholder="Contoh: TypeScript, React.js, Next.js, Node.js, Tailwind CSS"
              value={cat.skills.join(', ')}
              onChange={e => updateSkillsString(index, e.target.value)}
              helperText="Ketik keahlian dipisahkan dengan tanda koma (',')"
            />

            {/* Tag preview */}
            {cat.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      <AddItemButton onClick={addCategory} label="Tambah Kategori Keahlian Baru" />
    </div>
  );
}
