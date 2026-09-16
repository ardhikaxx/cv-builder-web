'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CVData } from '@/types/cv';
import { CVDocument } from './CVDocument';
import { ZoomIn, ZoomOut, RotateCcw, Printer, FileText } from 'lucide-react';

interface CVPreviewContainerProps {
  data: CVData;
  onPrint: () => void;
}

export function CVPreviewContainer({ data, onPrint }: CVPreviewContainerProps) {
  const [zoom, setZoom] = useState<number>(90);
  const docRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState<number>(1);

  // Check document height to calculate approximate A4 pages
  // 1 A4 page at 96 DPI is ~1123px (297mm)
  useEffect(() => {
    if (!docRef.current) return;

    const checkHeight = () => {
      const printArea = docRef.current?.querySelector('#cv-print-area');
      if (printArea) {
        const heightPx = printArea.clientHeight;
        // 297mm in pixels approx 1122.5px
        const estimatedPages = Math.max(1, Math.ceil(heightPx / 1120));
        setPageCount(estimatedPages);
      }
    };

    checkHeight();
    const timer = setTimeout(checkHeight, 300);
    return () => clearTimeout(timer);
  }, [data, zoom]);

  const zoomIn = () => setZoom(prev => Math.min(130, prev + 10));
  const zoomOut = () => setZoom(prev => Math.max(60, prev - 10));
  const zoomReset = () => setZoom(90);

  return (
    <div className="flex flex-col h-full bg-slate-200/60 rounded-xl border border-slate-300/80 overflow-hidden shadow-inner">
      {/* Top Preview Toolbar (no-print) */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-200 no-print">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-slate-600" />
          <span className="text-xs font-semibold text-slate-800">Preview A4 Real-Time</span>
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
              pageCount === 1
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}
          >
            {pageCount === 1 ? '1 Lembar A4 (Ideal)' : `${pageCount} Lembar A4`}
          </span>
        </div>

        {/* Zoom controls & Print trigger */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              type="button"
              onClick={zoomOut}
              disabled={zoom <= 60}
              className="p-1 text-slate-600 hover:text-slate-900 rounded disabled:opacity-30 transition-colors"
              title="Perkecil Preview"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-semibold text-slate-700 w-11 text-center select-none">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={zoomIn}
              disabled={zoom >= 130}
              className="p-1 text-slate-600 hover:text-slate-900 rounded disabled:opacity-30 transition-colors"
              title="Perbesar Preview"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={zoomReset}
              className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors ml-0.5"
              title="Reset Zoom ke 90%"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          <button
            type="button"
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Scaled Preview Canvas Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start custom-scrollbar">
        <div
          ref={docRef}
          id="cv-preview-wrapper"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className="transition-all duration-150 origin-top mb-12"
        >
          <CVDocument data={data} />
        </div>
      </div>
    </div>
  );
}
