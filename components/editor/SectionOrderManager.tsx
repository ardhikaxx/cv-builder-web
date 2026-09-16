'use client';

import React from 'react';
import { SectionMeta, SectionKey } from '@/types/cv';
import { ArrowUp, ArrowDown, Eye, EyeOff, GripVertical } from 'lucide-react';

interface SectionOrderManagerProps {
  sections: SectionMeta[];
  onChange: (sections: SectionMeta[]) => void;
}

export function SectionOrderManager({ sections, onChange }: SectionOrderManagerProps) {
  const toggleVisibility = (key: SectionKey) => {
    if (key === 'personal') return; // Personal info always visible
    const updated = sections.map(s => (s.key === key ? { ...s, visible: !s.visible } : s));
    onChange(updated);
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    // Don't move above personal info (personal info is always header)
    if (targetIndex === 0 && sections[0].key === 'personal') return;
    if (index === 0 && sections[0].key === 'personal') return;

    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500 leading-relaxed">
        Atur urutan dan visibilitas section CV Anda. Untuk fresh graduate, disarankan menempatkan <strong>Pendidikan</strong>, <strong>Proyek</strong>, atau <strong>Keahlian</strong> di urutan teratas setelah ringkasan profil.
      </p>

      <div className="space-y-1.5 border border-slate-200 rounded-lg p-2 bg-slate-50/50">
        {sections.map((section, index) => {
          const isFixed = section.key === 'personal';

          return (
            <div
              key={section.key}
              className={`flex items-center justify-between p-2.5 rounded-md border transition-colors ${
                section.visible ? 'bg-white border-slate-200 text-slate-900 shadow-2xs' : 'bg-slate-100/70 border-slate-200/60 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <GripVertical className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-xs font-semibold truncate">{section.label}</span>
                {isFixed && (
                  <span className="text-[10px] font-medium bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                    Header Tetap
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {!isFixed && (
                  <>
                    <button
                      type="button"
                      onClick={() => moveSection(index, 'up')}
                      disabled={index <= 1}
                      title="Pindahkan ke atas"
                      className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded disabled:opacity-25 transition-colors"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSection(index, 'down')}
                      disabled={index >= sections.length - 1}
                      title="Pindahkan ke bawah"
                      className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded disabled:opacity-25 transition-colors"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleVisibility(section.key)}
                      title={section.visible ? 'Sembunyikan dari CV' : 'Tampilkan di CV'}
                      className={`p-1 rounded transition-colors ml-1 ${
                        section.visible
                          ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                          : 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                      }`}
                    >
                      {section.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
