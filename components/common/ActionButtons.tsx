'use client';

import React from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus } from 'lucide-react';

interface ItemControlsProps {
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDelete: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  title?: string;
}

export function ItemControls({
  onMoveUp,
  onMoveDown,
  onDelete,
  canMoveUp = false,
  canMoveDown = false,
  title,
}: ItemControlsProps) {
  return (
    <div className="flex items-center justify-between py-2 px-3 bg-slate-50 border-b border-slate-100 rounded-t-lg">
      <span className="text-xs font-semibold text-slate-700 truncate max-w-[200px]">
        {title || 'Item'}
      </span>
      <div className="flex items-center gap-1">
        {onMoveUp && (
          <button
            type="button"
            onClick={onMoveUp}
            disabled={!canMoveUp}
            aria-label="Pindahkan ke atas"
            className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500 transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        )}
        {onMoveDown && (
          <button
            type="button"
            onClick={onMoveDown}
            disabled={!canMoveDown}
            aria-label="Pindahkan ke bawah"
            className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500 transition-colors"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          type="button"
          onClick={onDelete}
          aria-label="Hapus item ini"
          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

interface AddItemButtonProps {
  onClick: () => void;
  label: string;
}

export function AddItemButton({ onClick, label }: AddItemButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-dashed border-slate-300 hover:border-slate-400 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
    >
      <Plus className="w-3.5 h-3.5 text-slate-500" />
      <span>{label}</span>
    </button>
  );
}
