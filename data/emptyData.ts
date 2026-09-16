import { CVData } from '@/types/cv';
import { DEFAULT_SECTION_ORDER } from './defaultSections';

export const EMPTY_CV_DATA: CVData = {
  version: 1,
  personal: {
    fullName: '',
    headline: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    additionalInfo: '',
  },
  summary: '',
  education: [],
  experience: [],
  organization: [],
  projects: [],
  skills: [
    {
      id: 'skill-cat-1',
      name: 'Programming Languages',
      skills: [],
    },
    {
      id: 'skill-cat-2',
      name: 'Frameworks & Libraries',
      skills: [],
    },
    {
      id: 'skill-cat-3',
      name: 'Tools & Databases',
      skills: [],
    },
  ],
  certifications: [],
  achievements: [],
  languages: [],
  additional: [],
  sectionOrder: DEFAULT_SECTION_ORDER,
  settings: {
    template: 'classic',
    fontFamily: 'inter',
    accentColor: '#111827',
    fontSize: 'normal',
    lineSpacing: 'normal',
  },
};
