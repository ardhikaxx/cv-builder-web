'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  badge?: string | number;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  isComplete?: boolean;
}

export function Accordion({
  id,
  title,
  icon,
  badge,
  isOpen,
  onToggle,
  children,
  isComplete = false,
}: AccordionProps) {
  return (
    <div className="border border-slate-200/90 rounded-xl bg-white shadow-xs overflow-hidden transition-all duration-200">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${id}`}
        id={`accordion-btn-${id}`}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div className={`p-1.5 rounded-lg ${isOpen ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'} transition-colors`}>
              {icon}
            </div>
          )}
          <span className="font-semibold text-slate-800 text-sm">{title}</span>
          {badge !== undefined && badge !== '' && (
            <span className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-600 rounded-full border border-slate-200">
              {badge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isComplete && (
            <span className="hidden sm:inline-block text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Terisi
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-slate-700' : ''}`}
          />
        </div>
      </button>

      {isOpen && (
        <div
          id={`accordion-panel-${id}`}
          role="region"
          aria-labelledby={`accordion-btn-${id}`}
          className="p-4 sm:p-5 border-t border-slate-100 bg-white"
        >
          {children}
        </div>
      )}
    </div>
  );
}
