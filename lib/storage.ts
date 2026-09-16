import { CVData } from '@/types/cv';

const STORAGE_KEY = 'ats-cv-builder-data';

export function loadCVFromStorage(): CVData | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && parsed.personal && parsed.version) {
      return parsed as CVData;
    }
    return null;
  } catch (error) {
    console.warn('Gagal membaca data CV dari localStorage:', error);
    return null;
  }
}

export function saveCVToStorage(data: CVData): boolean {
  if (typeof window === 'undefined') return false;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Gagal menyimpan data CV ke localStorage:', error);
    return false;
  }
}

export function clearCVFromStorage(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Gagal menghapus data CV dari localStorage:', error);
    return false;
  }
}
