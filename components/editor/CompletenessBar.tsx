'use client';

import React from 'react';
import { ATSCheckResult } from '@/types/cv';
import { ShieldCheck, ChevronRight, AlertCircle } from 'lucide-react';

interface CompletenessBarProps {
  analysis: ATSCheckResult;
  onOpenModal: () => void;
}

export function CompletenessBar({ analysis, onOpenModal }: CompletenessBarProps) {
  const { completenessPercentage, scoreLabel, missingChecks, recommendedChecks } = analysis;

  const topRecommendation = missingChecks[0] || recommendedChecks[0];

  const getBarColor = (pct: number) => {
    if (pct >= 90) return 'bg-emerald-500';
    if (pct >= 75) return 'bg-blue-600';
    if (pct >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-slate-700" />
          <span className="text-xs font-semibold text-slate-800">Kesiapan Dokumen ATS</span>
          <span className="text-[11px] font-medium text-slate-500">({scoreLabel})</span>
        </div>

        <button
          type="button"
          onClick={onOpenModal}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          Lihat Detail
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-500">Kelengkapan Konten</span>
          <span className="font-bold text-slate-900">{completenessPercentage}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${getBarColor(completenessPercentage)}`}
            style={{ width: `${completenessPercentage}%` }}
          />
        </div>
      </div>

      {topRecommendation && (
        <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-600 border-t border-slate-100">
          <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
          <p className="line-clamp-1 leading-snug">
            <span className="font-medium text-slate-800">Saran: </span>
            {topRecommendation.title}
          </p>
        </div>
      )}
    </div>
  );
}
