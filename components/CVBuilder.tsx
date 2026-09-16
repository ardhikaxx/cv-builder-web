'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CVData } from '@/types/cv';
import { SAMPLE_CV_DATA } from '@/data/sampleData';
import { EMPTY_CV_DATA } from '@/data/emptyData';
import { loadCVFromStorage, saveCVToStorage, clearCVFromStorage } from '@/lib/storage';
import { analyzeCVATS } from '@/lib/atsChecker';
import { exportCVToJson, validateCVJson } from '@/lib/exportImport';
import { useToast } from '@/components/common/Toast';
import { Navbar } from '@/components/common/Navbar';
import { EditorPanel } from '@/components/editor/EditorPanel';
import { CVPreviewContainer } from '@/components/preview/CVPreviewContainer';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import { ATSScoreModal } from '@/components/common/ATSScoreModal';

export function CVBuilder() {
  const { showToast } = useToast();

  // Initialize with sample data by default so user sees ready-to-use template
  const [cvData, setCvData] = useState<CVData>(SAMPLE_CV_DATA);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  // Modal states
  const [isATSModalOpen, setIsATSModalOpen] = useState<boolean>(false);
  const [confirmModalConfig, setConfirmModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    variant?: 'danger' | 'primary';
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // Load initial data from localStorage on client mount (asynchronous to avoid cascading render)
  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = loadCVFromStorage();
      if (saved) {
        setCvData(saved);
      }
      setIsLoaded(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Auto-save to localStorage whenever cvData changes (debounced slightly)
  useEffect(() => {
    if (!isLoaded) return;
    const timer = setTimeout(() => {
      saveCVToStorage(cvData);
    }, 400);
    return () => clearTimeout(timer);
  }, [cvData, isLoaded]);

  // Real-time ATS Readiness analysis
  const analysis = useMemo(() => {
    return analyzeCVATS(cvData);
  }, [cvData]);

  // Handler: Print / Download PDF
  const handlePrint = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }, []);

  // Handler: Load Sample CV
  const handleLoadSample = useCallback(() => {
    setConfirmModalConfig({
      isOpen: true,
      title: 'Muat Contoh CV Fresh Graduate?',
      message:
        'Data yang sedang Anda isi akan digantikan dengan data contoh profil lulusan Teknik Informatika (Alex Pratama). Anda dapat mengeditnya kembali setelah dimuat.',
      confirmLabel: 'Muat Contoh CV',
      variant: 'primary',
      onConfirm: () => {
        setCvData(SAMPLE_CV_DATA);
        saveCVToStorage(SAMPLE_CV_DATA);
        showToast('Contoh CV Fresh Graduate berhasil dimuat.', 'success');
        setConfirmModalConfig(prev => ({ ...prev, isOpen: false }));
      },
    });
  }, [showToast]);

  // Handler: Start from Scratch (Blank)
  const handleStartScratch = useCallback(() => {
    setConfirmModalConfig({
      isOpen: true,
      title: 'Mulai dari Formulir Kosong?',
      message:
        'Tindakan ini akan mengosongkan seluruh isian data CV agar Anda dapat mengisi semuanya dari nol. Lanjutkan?',
      confirmLabel: 'Mulai dari Nol',
      variant: 'danger',
      onConfirm: () => {
        setCvData(EMPTY_CV_DATA);
        saveCVToStorage(EMPTY_CV_DATA);
        showToast('Formulir CV dikosongkan untuk mulai dari nol.', 'info');
        setConfirmModalConfig(prev => ({ ...prev, isOpen: false }));
      },
    });
  }, [showToast]);

  // Handler: Reset CV
  const handleReset = useCallback(() => {
    setConfirmModalConfig({
      isOpen: true,
      title: 'Konfirmasi Reset Data CV',
      message:
        'Apakah Anda yakin ingin mereset seluruh data CV? Data lokal di browser akan dibersihkan dan dikembalikan ke template awal.',
      confirmLabel: 'Reset Sekarang',
      variant: 'danger',
      onConfirm: () => {
        clearCVFromStorage();
        setCvData(EMPTY_CV_DATA);
        showToast('Data CV berhasil direset.', 'info');
        setConfirmModalConfig(prev => ({ ...prev, isOpen: false }));
      },
    });
  }, [showToast]);

  // Handler: Export JSON
  const handleExport = useCallback(() => {
    try {
      exportCVToJson(cvData);
      showToast('File JSON data CV berhasil diunduh.', 'success');
    } catch {
      showToast('Gagal mengekspor file JSON.', 'error');
    }
  }, [cvData, showToast]);

  // Handler: Import JSON
  const handleImportFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const rawText = e.target?.result as string;
          const parsed = JSON.parse(rawText);
          const validation = validateCVJson(parsed);

          if (!validation.isValid || !validation.data) {
            showToast(validation.error || 'Format file JSON tidak valid.', 'error');
            return;
          }

          const importedData = validation.data;
          setConfirmModalConfig({
            isOpen: true,
            title: 'Konfirmasi Impor Data CV',
            message: `File JSON valid untuk "${importedData.personal.fullName || 'CV'}". Mengimpor file ini akan menimpa data yang sedang aktif saat ini. Lanjutkan?`,
            confirmLabel: 'Impor & Terapkan',
            variant: 'primary',
            onConfirm: () => {
              setCvData(importedData);
              saveCVToStorage(importedData);
              showToast('Data CV berhasil diimpor dari file JSON.', 'success');
              setConfirmModalConfig(prev => ({ ...prev, isOpen: false }));
            },
          });
        } catch {
          showToast('Gagal membaca file JSON. Pastikan format file benar.', 'error');
        }
      };

      reader.onerror = () => {
        showToast('Terjadi kesalahan saat membaca file.', 'error');
      };

      reader.readAsText(file);
    },
    [showToast]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {/* Top Navigation */}
      <Navbar
        analysis={analysis}
        onLoadSample={handleLoadSample}
        onStartScratch={handleStartScratch}
        onReset={handleReset}
        onExport={handleExport}
        onImport={handleImportFile}
        onOpenATSModal={() => setIsATSModalOpen(true)}
        onPrint={handlePrint}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {/* Desktop: Two-Column Split Layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Column: Form Editor (Visible on desktop or when activeTab is 'editor' on mobile) */}
          <div
            className={`w-full lg:w-[480px] xl:w-[500px] shrink-0 ${
              activeTab === 'editor' ? 'block' : 'hidden lg:block'
            }`}
          >
            <EditorPanel
              cvData={cvData}
              onChange={setCvData}
              analysis={analysis}
              onOpenATSModal={() => setIsATSModalOpen(true)}
            />
          </div>

          {/* Right Column: Live A4 Preview (Visible on desktop or when activeTab is 'preview' on mobile) */}
          <div
            className={`w-full lg:flex-1 min-w-0 lg:sticky lg:top-20 lg:h-[calc(100vh-100px)] ${
              activeTab === 'preview' ? 'block' : 'hidden lg:block'
            }`}
          >
            <CVPreviewContainer data={cvData} onPrint={handlePrint} />
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModalConfig.isOpen}
        title={confirmModalConfig.title}
        message={confirmModalConfig.message}
        confirmLabel={confirmModalConfig.confirmLabel}
        variant={confirmModalConfig.variant}
        onConfirm={confirmModalConfig.onConfirm}
        onCancel={() => {
          setConfirmModalConfig(prev => ({ ...prev, isOpen: false }));
        }}
      />

      {/* ATS Readiness Audit Modal */}
      <ATSScoreModal
        isOpen={isATSModalOpen}
        onClose={() => setIsATSModalOpen(false)}
        analysis={analysis}
      />
    </div>
  );
}
