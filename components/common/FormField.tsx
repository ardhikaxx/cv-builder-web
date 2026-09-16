'use client';

import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
}

export function TextInput({
  label,
  id,
  helperText,
  error,
  className = '',
  required,
  ...props
}: TextInputProps) {
  const inputId = id || `field-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between">
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      </div>

      <input
        id={inputId}
        required={required}
        className={`w-full px-3 py-2 text-xs text-slate-900 bg-white border rounded-lg transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500 ${
          error ? 'border-rose-300 focus:ring-rose-300' : 'border-slate-200 hover:border-slate-300'
        } ${className}`}
        {...props}
      />

      {error ? (
        <p className="text-[11px] text-rose-600">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500 leading-normal">{helperText}</p>
      ) : null}
    </div>
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
  showCounts?: boolean;
}

export function TextArea({
  label,
  id,
  helperText,
  showCounts,
  className = '',
  value = '',
  required,
  ...props
}: TextAreaProps) {
  const inputId = id || `textarea-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  const textValue = typeof value === 'string' ? value : '';
  const charCount = textValue.length;
  const wordCount = textValue.trim() ? textValue.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between">
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        {showCounts && (
          <span className="text-[11px] text-slate-400">
            {wordCount} kata • {charCount} karakter
          </span>
        )}
      </div>

      <textarea
        id={inputId}
        value={value}
        required={required}
        className={`w-full px-3 py-2 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500 hover:border-slate-300 resize-y custom-scrollbar ${className}`}
        {...props}
      />

      {helperText && <p className="text-[11px] text-slate-500 leading-normal">{helperText}</p>}
    </div>
  );
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string }[];
  helperText?: string;
}

export function SelectField({
  label,
  id,
  options,
  helperText,
  className = '',
  required,
  ...props
}: SelectFieldProps) {
  const inputId = id || `select-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  return (
    <div className="space-y-1.5 w-full">
      <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>

      <select
        id={inputId}
        className={`w-full px-3 py-2 text-xs text-slate-900 bg-white border border-slate-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500 hover:border-slate-300 ${className}`}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {helperText && <p className="text-[11px] text-slate-500 leading-normal">{helperText}</p>}
    </div>
  );
}
