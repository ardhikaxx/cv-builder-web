'use client';

import React, { useEffect } from 'react';
import { ATSCheckResult } from '@/types/cv';
import { CheckCircle2, AlertTriangle, XCircle, Info, X, ShieldCheck } from 'lucide-react';

interface ATSScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: ATSCheckResult;
}

export function ATSScoreModal({ isOpen, onClose, analysis }: ATSScoreModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 80) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 65) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  const getScoreProgressBar = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 65) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs no-print overflow-y-auto">
      <div
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8 transform transition-all animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-900 text-white rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-base">ATS Readiness & Completeness Checker</h3>
              <p className="text-xs text-slate-500">Pemeriksaan format dan kelengkapan CV untuk sistem ATS & recruiter</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors hover:bg-slate-100"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Score Card */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-xl border bg-slate-50/80">
            <div className="flex flex-col items-center justify-center shrink-0 w-28 h-28 rounded-full border-4 border-slate-200 bg-white shadow-inner">
              <span className="text-3xl font-bold text-slate-900">{analysis.completenessPercentage}%</span>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Lengkap</span>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${getScoreColor(analysis.completenessPercentage)}`}>
                  Status: {analysis.scoreLabel}
                </span>
                <span className="text-xs text-slate-500">
                  {analysis.passedChecks.length} lolos • {analysis.missingChecks.length} perlu diisi • {analysis.recommendedChecks.length} saran
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${getScoreProgressBar(analysis.completenessPercentage)}`}
                  style={{ width: `${analysis.completenessPercentage}%` }}
                />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pemeriksaan ini menganalisis struktur single-column, kehadiran kontak penting, rincian pendidikan, proyek nyata, dan kata kunci keahlian fresh graduate.
              </p>
            </div>
          </div>

          {/* Missing Checks (Priority) */}
          {analysis.missingChecks.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> Belum Terisi / Wajib Dilengkapi ({analysis.missingChecks.length})
              </h4>
              <div className="space-y-2">
                {analysis.missingChecks.map(item => (
                  <div key={item.id} className="p-3 bg-rose-50/60 border border-rose-100 rounded-lg text-xs flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-rose-950">{item.title}</div>
                      <div className="text-rose-800/80 mt-0.5 leading-relaxed">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Checks */}
          {analysis.recommendedChecks.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Rekomendasi Optimalisasi ({analysis.recommendedChecks.length})
              </h4>
              <div className="space-y-2">
                {analysis.recommendedChecks.map(item => (
                  <div key={item.id} className="p-3 bg-amber-50/60 border border-amber-100 rounded-lg text-xs flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-amber-950">{item.title}</div>
                      <div className="text-amber-800/80 mt-0.5 leading-relaxed">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Passed Checks */}
          {analysis.passedChecks.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Pemeriksaan Sukses ({analysis.passedChecks.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {analysis.passedChecks.map(item => (
                  <div key={item.id} className="p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-lg text-xs flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-emerald-950">{item.title}</div>
                      <div className="text-emerald-800/70 text-[11px] mt-0.5 leading-tight">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ATS Disclaimer note */}
          <div className="p-3.5 bg-slate-100/80 rounded-lg border border-slate-200 text-slate-600 text-xs flex items-start gap-2.5 leading-relaxed">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800">Catatan Transparansi:</span> Checker ini melakukan validasi format dokumen A4, struktur hierarki teks, keberadaan keywords, dan kelengkapan field krusial. Sistem ATS proprietary (seperti Workday, Taleo, Greenhouse, Lever) memiliki algoritma pencocokan unik sesuai deskripsi lowongan kerja spesifik.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors focus:ring-2 focus:ring-slate-400 focus:outline-none"
          >
            Tutup & Lanjutkan Mengisi
          </button>
        </div>
      </div>
    </div>
  );
}
