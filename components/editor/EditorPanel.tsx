'use client';

import React, { useState } from 'react';
import { CVData, ATSCheckResult } from '@/types/cv';
import { Accordion } from '@/components/common/Accordion';
import { CompletenessBar } from './CompletenessBar';
import { TemplateSelector } from './TemplateSelector';
import { SectionOrderManager } from './SectionOrderManager';
import { PersonalInfoSection } from './sections/PersonalInfoSection';
import { SummarySection } from './sections/SummarySection';
import { EducationSection } from './sections/EducationSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { OrganizationSection } from './sections/OrganizationSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { SkillsSection } from './sections/SkillsSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { AchievementsSection } from './sections/AchievementsSection';
import { LanguagesSection } from './sections/LanguagesSection';
import { AdditionalSection } from './sections/AdditionalSection';
import {
  User,
  FileText,
  GraduationCap,
  Briefcase,
  Users,
  Code2,
  Wrench,
  Award,
  Trophy,
  Globe,
  PlusCircle,
  Palette,
  SlidersHorizontal,
} from 'lucide-react';

interface EditorPanelProps {
  cvData: CVData;
  onChange: (data: CVData) => void;
  analysis: ATSCheckResult;
  onOpenATSModal: () => void;
}

export function EditorPanel({ cvData, onChange, analysis, onOpenATSModal }: EditorPanelProps) {
  // Track open state of sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    summary: false,
    education: true,
    projects: true,
    skills: true,
    experience: false,
    organization: false,
    certifications: false,
    achievements: false,
    languages: false,
    additional: false,
    templates: false,
    order: false,
  });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const updateField = <K extends keyof CVData>(key: K, value: CVData[K]) => {
    onChange({
      ...cvData,
      [key]: value,
    });
  };

  return (
    <div className="flex flex-col gap-4 pb-20">
      {/* Completeness bar */}
      <CompletenessBar analysis={analysis} onOpenModal={onOpenATSModal} />

      {/* Template & Visual Styling */}
      <Accordion
        id="templates"
        title="Pilihan Template & Font ATS"
        icon={<Palette className="w-4 h-4" />}
        isOpen={!!openSections['templates']}
        onToggle={() => toggleSection('templates')}
      >
        <TemplateSelector
          settings={cvData.settings}
          onChange={newSettings => updateField('settings', newSettings)}
        />
      </Accordion>

      {/* Section Order & Visibility Management */}
      <Accordion
        id="order"
        title="Atur Urutan & Tampilan Section"
        icon={<SlidersHorizontal className="w-4 h-4" />}
        isOpen={!!openSections['order']}
        onToggle={() => toggleSection('order')}
      >
        <SectionOrderManager
          sections={cvData.sectionOrder}
          onChange={newOrder => updateField('sectionOrder', newOrder)}
        />
      </Accordion>

      {/* Personal Information */}
      <Accordion
        id="personal"
        title="Informasi Pribadi & Kontak"
        icon={<User className="w-4 h-4" />}
        isOpen={!!openSections['personal']}
        onToggle={() => toggleSection('personal')}
        isComplete={!!cvData.personal.fullName && !!cvData.personal.email}
      >
        <PersonalInfoSection
          data={cvData.personal}
          onChange={personal => updateField('personal', personal)}
        />
      </Accordion>

      {/* Professional Summary */}
      <Accordion
        id="summary"
        title="Professional Summary"
        icon={<FileText className="w-4 h-4" />}
        isOpen={!!openSections['summary']}
        onToggle={() => toggleSection('summary')}
        badge={cvData.summary.trim() ? `${cvData.summary.trim().split(/\s+/).length} kata` : ''}
        isComplete={cvData.summary.trim().length > 30}
      >
        <SummarySection
          value={cvData.summary}
          onChange={summary => updateField('summary', summary)}
        />
      </Accordion>

      {/* Education */}
      <Accordion
        id="education"
        title="Pendidikan"
        icon={<GraduationCap className="w-4 h-4" />}
        isOpen={!!openSections['education']}
        onToggle={() => toggleSection('education')}
        badge={cvData.education.length > 0 ? cvData.education.length : undefined}
        isComplete={cvData.education.length > 0 && !!cvData.education[0].institution}
      >
        <EducationSection
          items={cvData.education}
          onChange={education => updateField('education', education)}
        />
      </Accordion>

      {/* Skills */}
      <Accordion
        id="skills"
        title="Keahlian & Teknologi (Skills)"
        icon={<Wrench className="w-4 h-4" />}
        isOpen={!!openSections['skills']}
        onToggle={() => toggleSection('skills')}
        badge={cvData.skills.reduce((acc, c) => acc + c.skills.length, 0) || undefined}
        isComplete={cvData.skills.some(c => c.skills.length > 0)}
      >
        <SkillsSection
          categories={cvData.skills}
          onChange={skills => updateField('skills', skills)}
        />
      </Accordion>

      {/* Projects */}
      <Accordion
        id="projects"
        title="Proyek Portofolio (Projects)"
        icon={<Code2 className="w-4 h-4" />}
        isOpen={!!openSections['projects']}
        onToggle={() => toggleSection('projects')}
        badge={cvData.projects.length > 0 ? cvData.projects.length : undefined}
        isComplete={cvData.projects.length > 0 && !!cvData.projects[0].title}
      >
        <ProjectsSection
          items={cvData.projects}
          onChange={projects => updateField('projects', projects)}
        />
      </Accordion>

      {/* Experience */}
      <Accordion
        id="experience"
        title="Pengalaman Kerja / Magang"
        icon={<Briefcase className="w-4 h-4" />}
        isOpen={!!openSections['experience']}
        onToggle={() => toggleSection('experience')}
        badge={cvData.experience.length > 0 ? cvData.experience.length : undefined}
        isComplete={cvData.experience.length > 0 && !!cvData.experience[0].position}
      >
        <ExperienceSection
          items={cvData.experience}
          onChange={experience => updateField('experience', experience)}
        />
      </Accordion>

      {/* Organization */}
      <Accordion
        id="organization"
        title="Organisasi & Kepemimpinan"
        icon={<Users className="w-4 h-4" />}
        isOpen={!!openSections['organization']}
        onToggle={() => toggleSection('organization')}
        badge={cvData.organization.length > 0 ? cvData.organization.length : undefined}
        isComplete={cvData.organization.length > 0 && !!cvData.organization[0].organization}
      >
        <OrganizationSection
          items={cvData.organization}
          onChange={organization => updateField('organization', organization)}
        />
      </Accordion>

      {/* Certifications */}
      <Accordion
        id="certifications"
        title="Sertifikasi"
        icon={<Award className="w-4 h-4" />}
        isOpen={!!openSections['certifications']}
        onToggle={() => toggleSection('certifications')}
        badge={cvData.certifications.length > 0 ? cvData.certifications.length : undefined}
        isComplete={cvData.certifications.length > 0}
      >
        <CertificationsSection
          items={cvData.certifications}
          onChange={certifications => updateField('certifications', certifications)}
        />
      </Accordion>

      {/* Achievements */}
      <Accordion
        id="achievements"
        title="Penghargaan & Prestasi"
        icon={<Trophy className="w-4 h-4" />}
        isOpen={!!openSections['achievements']}
        onToggle={() => toggleSection('achievements')}
        badge={cvData.achievements.length > 0 ? cvData.achievements.length : undefined}
        isComplete={cvData.achievements.length > 0}
      >
        <AchievementsSection
          items={cvData.achievements}
          onChange={achievements => updateField('achievements', achievements)}
        />
      </Accordion>

      {/* Languages */}
      <Accordion
        id="languages"
        title="Bahasa"
        icon={<Globe className="w-4 h-4" />}
        isOpen={!!openSections['languages']}
        onToggle={() => toggleSection('languages')}
        badge={cvData.languages.length > 0 ? cvData.languages.length : undefined}
        isComplete={cvData.languages.length > 0}
      >
        <LanguagesSection
          items={cvData.languages}
          onChange={languages => updateField('languages', languages)}
        />
      </Accordion>

      {/* Additional Information */}
      <Accordion
        id="additional"
        title="Informasi Tambahan"
        icon={<PlusCircle className="w-4 h-4" />}
        isOpen={!!openSections['additional']}
        onToggle={() => toggleSection('additional')}
        badge={cvData.additional.length > 0 ? cvData.additional.length : undefined}
        isComplete={cvData.additional.length > 0}
      >
        <AdditionalSection
          items={cvData.additional}
          onChange={additional => updateField('additional', additional)}
        />
      </Accordion>
    </div>
  );
}
