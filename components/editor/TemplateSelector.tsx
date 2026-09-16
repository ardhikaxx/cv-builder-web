'use client';

import React from 'react';
import { TemplateId, FontFamily, AccentColor, CVData } from '@/types/cv';
import { Palette, Type, Layout, Sliders } from 'lucide-react';

interface TemplateSelectorProps {
  settings: CVData['settings'];
  onChange: (settings: CVData['settings']) => void;
}

const TEMPLATES: { id: TemplateId; name: string; desc: string }[] = [
  {
    id: 'classic',
    name: 'Classic ATS',
    desc: 'Standar korporat global dengan garis horizontal pemisah tajam dan nama di tengah.',
  },
  {
    id: 'modern',
    name: 'Modern ATS',
    desc: 'Layout kiri kontemporer dengan penekanan heading beraksen rapi.',
  },
  {
    id: 'minimal',
    name: 'Minimal ATS',
    desc: 'Bebas garis ornamen, memaksimalkan hierarki whitespace dan tipografi murni.',
  },
  {
    id: 'executive',
    name: 'Executive ATS',
    desc: 'Tipografi tegas dengan divider solid dan format tanggal rata kanan yang sangat terstruktur.',
  },
];

const FONTS: { id: FontFamily; label: string; previewClass: string }[] = [
  { id: 'inter', label: 'Inter (Modern Sans)', previewClass: 'font-ats-inter' },
  { id: 'arial', label: 'Arial / Helvetica (Universal)', previewClass: 'font-ats-arial' },
  { id: 'calibri', label: 'Calibri (Corporate Standard)', previewClass: 'font-ats-calibri' },
  { id: 'times', label: 'Times New Roman (Classic Serif)', previewClass: 'font-ats-times' },
];

const ACCENTS: { color: AccentColor; label: string }[] = [
  { color: '#111827', label: 'Charcoal Black' },
  { color: '#1e3a8a', label: 'Navy Blue' },
  { color: '#1e293b', label: 'Slate Dark' },
  { color: '#0f766e', label: 'Deep Teal' },
  { color: '#14532d', label: 'Forest Green' },
  { color: '#831843', label: 'Deep Burgundy' },
];

export function TemplateSelector({ settings, onChange }: TemplateSelectorProps) {
  const updateSettings = (key: keyof CVData['settings'], val: unknown) => {
    onChange({
      ...settings,
      [key]: val,
    });
  };

  return (
    <div className="space-y-4">
      {/* Template selection */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
          <Layout className="w-3.5 h-3.5 text-slate-500" />
          Pilihan Gaya Template (Semua 100% Single-Column ATS)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {TEMPLATES.map(tpl => {
            const isSelected = settings.template === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => updateSettings('template', tpl.id)}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                }`}
              >
                <div className="font-semibold text-xs leading-tight">{tpl.name}</div>
                <div
                  className={`text-[10px] mt-1 line-clamp-2 leading-relaxed ${
                    isSelected ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {tpl.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Font selection */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
          <Type className="w-3.5 h-3.5 text-slate-500" />
          Pilihan Font Standar ATS
        </label>
        <div className="grid grid-cols-2 gap-2">
          {FONTS.map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => updateSettings('fontFamily', f.id)}
              className={`p-2 rounded-lg border text-left text-xs transition-all ${f.previewClass} ${
                settings.fontFamily === f.id
                  ? 'border-slate-900 bg-slate-50 font-bold text-slate-900 ring-1 ring-slate-900'
                  : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accent color */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
          <Palette className="w-3.5 h-3.5 text-slate-500" />
          Aksen Warna Heading (Kontras Tinggi & Aman ATS)
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {ACCENTS.map(acc => (
            <button
              key={acc.color}
              type="button"
              onClick={() => updateSettings('accentColor', acc.color)}
              title={acc.label}
              className={`w-7 h-7 rounded-full transition-transform border flex items-center justify-center ${
                settings.accentColor === acc.color
                  ? 'ring-2 ring-offset-2 ring-slate-800 scale-110'
                  : 'hover:scale-105 border-slate-300'
              }`}
              style={{ backgroundColor: acc.color }}
            />
          ))}
        </div>
      </div>

      {/* Spacing & Density */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
          <Sliders className="w-3.5 h-3.5 text-slate-500" />
          Kepadatan Spasi (Density)
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['compact', 'normal', 'spacious'] as const).map(density => (
            <button
              key={density}
              type="button"
              onClick={() => updateSettings('lineSpacing', density)}
              className={`py-1.5 px-2 rounded-lg border text-center text-xs capitalize transition-all ${
                settings.lineSpacing === density
                  ? 'border-slate-900 bg-slate-900 text-white font-semibold'
                  : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
              }`}
            >
              {density === 'compact' ? 'Padat (1 Hal)' : density === 'normal' ? 'Normal' : 'Longgar'}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-slate-500">
          Pilih &quot;Padat (1 Hal)&quot; bila Anda ingin seluruh informasi masuk pas dalam 1 lembar A4.
        </p>
      </div>
    </div>
  );
}
