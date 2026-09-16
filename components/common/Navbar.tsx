'use client';

import React, { useRef } from 'react';
import { ATSCheckResult } from '@/types/cv';
import {
  FileDown,
  Upload,
  RotateCcw,
  Sparkles,
  Printer,
  ShieldCheck,
  FilePlus,
} from 'lucide-react';

interface NavbarProps {
  analysis: ATSCheckResult;
  onLoadSample: () => void;
  onStartScratch: () => void;
  onReset: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
  onOpenATSModal: () => void;
  onPrint: () => void;
  activeTab: 'editor' | 'preview';
  onTabChange: (tab: 'editor' | 'preview') => void;
}

export function Navbar({
  analysis,
  onLoadSample,
  onStartScratch,
  onReset,
  onExport,
  onImport,
  onOpenATSModal,
  onPrint,
  activeTab,
  onTabChange,
}: NavbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
    }
    // reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Logo & Tagline */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-base shadow-xs">
            CV
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-base tracking-tight">CVForge</span>
              <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                Fresh Graduate ATS
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Buat CV standar ATS siap kerja gratis tanpa login
            </p>
          </div>
        </div>

        {/* Mobile Tab Switcher (Visible only on mobile/small screens) */}
        <div className="flex md:hidden bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => onTabChange('editor')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'editor'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Editor
          </button>
          <button
            type="button"
            onClick={() => onTabChange('preview')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'preview'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Preview A4
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* ATS Score quick button */}
          <button
            type="button"
            onClick={onOpenATSModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
            title="Buka Analisis Kesiapan ATS"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ATS: {analysis.completenessPercentage}%</span>
          </button>

          {/* Load Sample / Scratch */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={onLoadSample}
              className="px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:text-slate-900 rounded hover:bg-white transition-all flex items-center gap-1"
              title="Isi form dengan contoh data fresh graduate IT"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Contoh CV</span>
            </button>
            <button
              type="button"
              onClick={onStartScratch}
              className="px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 rounded hover:bg-white transition-all flex items-center gap-1"
              title="Kosongkan seluruh data untuk mulai mengisi dari nol"
            >
              <FilePlus className="w-3 h-3 text-slate-500" />
              <span>Mulai Baru</span>
            </button>
          </div>

          {/* Import / Export JSON */}
          <div className="hidden sm:flex items-center gap-1">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              title="Impor Data CV dari file JSON"
            >
              <Upload className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onExport}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              title="Ekspor & Cadangkan Data CV ke file JSON"
            >
              <FileDown className="w-4 h-4" />
            </button>
          </div>

          {/* Reset button */}
          <button
            type="button"
            onClick={onReset}
            className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-slate-200 transition-colors"
            title="Reset Data CV"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Main Download PDF */}
          <button
            type="button"
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors focus:ring-2 focus:ring-slate-400"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
}
