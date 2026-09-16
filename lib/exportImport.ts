import { CVData } from '@/types/cv';

export function exportCVToJson(data: CVData): void {
  try {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    const sanitizedName = (data.personal.fullName || 'cv-data')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');

    link.href = url;
    link.download = `${sanitizedName}-ats-cv.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting CV JSON:', error);
    throw new Error('Gagal mengekspor data CV ke file JSON.');
  }
}

export function validateCVJson(data: unknown): { isValid: boolean; error?: string; data?: CVData } {
  if (!data || typeof data !== 'object') {
    return { isValid: false, error: 'File bukan objek JSON yang valid.' };
  }

  const obj = data as Partial<CVData>;

  if (!obj.personal || typeof obj.personal !== 'object') {
    return { isValid: false, error: 'Format data tidak valid: Field "personal" tidak ditemukan.' };
  }

  // Ensure arrays exist
  const validated: CVData = {
    version: obj.version || 1,
    personal: {
      fullName: obj.personal.fullName || '',
      headline: obj.personal.headline || '',
      email: obj.personal.email || '',
      phone: obj.personal.phone || '',
      location: obj.personal.location || '',
      linkedin: obj.personal.linkedin || '',
      github: obj.personal.github || '',
      portfolio: obj.personal.portfolio || '',
      additionalInfo: obj.personal.additionalInfo || '',
    },
    summary: typeof obj.summary === 'string' ? obj.summary : '',
    education: Array.isArray(obj.education) ? obj.education : [],
    experience: Array.isArray(obj.experience) ? obj.experience : [],
    organization: Array.isArray(obj.organization) ? obj.organization : [],
    projects: Array.isArray(obj.projects) ? obj.projects : [],
    skills: Array.isArray(obj.skills) ? obj.skills : [],
    certifications: Array.isArray(obj.certifications) ? obj.certifications : [],
    achievements: Array.isArray(obj.achievements) ? obj.achievements : [],
    languages: Array.isArray(obj.languages) ? obj.languages : [],
    additional: Array.isArray(obj.additional) ? obj.additional : [],
    sectionOrder: Array.isArray(obj.sectionOrder) ? obj.sectionOrder : [],
    settings: {
      template: obj.settings?.template || 'classic',
      fontFamily: obj.settings?.fontFamily || 'inter',
      accentColor: obj.settings?.accentColor || '#111827',
      fontSize: obj.settings?.fontSize || 'normal',
      lineSpacing: obj.settings?.lineSpacing || 'normal',
    },
  };

  return { isValid: true, data: validated };
}
