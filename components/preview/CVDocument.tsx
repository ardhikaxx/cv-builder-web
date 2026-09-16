'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import { cleanUrl, formatDateRange } from '@/lib/dateFormatter';

interface CVDocumentProps {
  data: CVData;
  id?: string;
}

interface SpacingTokens {
  padding: string;
  sectionMargin: string;
  itemMargin: string;
  lineHeight: string;
  textSize: string;
  nameSize: string;
  headSize: string;
  headingSize: string;
}

const SPACING_CONFIG: Record<'compact' | 'normal' | 'spacious', SpacingTokens> = {
  compact: {
    padding: 'py-[14mm] px-[16mm]',
    sectionMargin: 'mb-3',
    itemMargin: 'mb-2',
    lineHeight: 'leading-snug',
    textSize: 'text-[10px]',
    nameSize: 'text-2xl',
    headSize: 'text-xs',
    headingSize: 'text-xs',
  },
  normal: {
    padding: 'py-[18mm] px-[20mm]',
    sectionMargin: 'mb-4',
    itemMargin: 'mb-2.5',
    lineHeight: 'leading-normal',
    textSize: 'text-[10.5px]',
    nameSize: 'text-[24px]',
    headSize: 'text-[12px]',
    headingSize: 'text-[12.5px]',
  },
  spacious: {
    padding: 'py-[20mm] px-[22mm]',
    sectionMargin: 'mb-5',
    itemMargin: 'mb-3.5',
    lineHeight: 'leading-relaxed',
    textSize: 'text-[11px]',
    nameSize: 'text-[26px]',
    headSize: 'text-[13px]',
    headingSize: 'text-[13px]',
  },
};

export function CVDocument({ data, id }: CVDocumentProps) {
  const { personal, summary, education, experience, organization, projects, skills, certifications, achievements, languages, additional, sectionOrder, settings } = data;

  // Font class mapping
  const fontClass =
    settings.fontFamily === 'arial'
      ? 'font-ats-arial'
      : settings.fontFamily === 'calibri'
      ? 'font-ats-calibri'
      : settings.fontFamily === 'times'
      ? 'font-ats-times'
      : 'font-ats-inter';

  // Density spacing mapping
  const spacingConfig: SpacingTokens =
    SPACING_CONFIG[settings.lineSpacing || 'normal'] || SPACING_CONFIG.normal;

  // Render contact info parts
  const contactParts: { text: string; href?: string }[] = [];
  if (personal.location) contactParts.push({ text: personal.location });
  if (personal.phone) contactParts.push({ text: personal.phone, href: `tel:${personal.phone}` });
  if (personal.email) contactParts.push({ text: personal.email, href: `mailto:${personal.email}` });
  if (personal.linkedin) {
    const url = personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`;
    contactParts.push({ text: cleanUrl(personal.linkedin), href: url });
  }
  if (personal.github) {
    const url = personal.github.startsWith('http') ? personal.github : `https://${personal.github}`;
    contactParts.push({ text: cleanUrl(personal.github), href: url });
  }
  if (personal.portfolio) {
    const url = personal.portfolio.startsWith('http') ? personal.portfolio : `https://${personal.portfolio}`;
    contactParts.push({ text: cleanUrl(personal.portfolio), href: url });
  }

  // Section Heading component that adapts to template
  const SectionHeader = ({ title }: { title: string }) => {
    switch (settings.template) {
      case 'modern':
        return (
          <div className="mb-1.5 pb-1 border-b" style={{ borderColor: settings.accentColor }}>
            <h2
              className={`font-bold tracking-wider uppercase ${spacingConfig.headingSize}`}
              style={{ color: settings.accentColor }}
            >
              {title}
            </h2>
          </div>
        );
      case 'minimal':
        return (
          <div className="mb-1.5">
            <h2
              className={`font-bold tracking-wider uppercase ${spacingConfig.headingSize}`}
              style={{ color: settings.accentColor }}
            >
              {title}
            </h2>
          </div>
        );
      case 'executive':
        return (
          <div className="mb-2 flex items-center gap-2">
            <h2
              className={`font-bold tracking-wider uppercase whitespace-nowrap ${spacingConfig.headingSize}`}
              style={{ color: settings.accentColor }}
            >
              {title}
            </h2>
            <div className="h-[1.5px] w-full" style={{ backgroundColor: settings.accentColor }} />
          </div>
        );
      case 'classic':
      default:
        return (
          <div className="mb-1.5 pb-0.5 border-b border-gray-400">
            <h2
              className={`font-bold tracking-wider uppercase ${spacingConfig.headingSize}`}
              style={{ color: settings.accentColor }}
            >
              {title}
            </h2>
          </div>
        );
    }
  };

  // Check which sections have content
  const hasSummary = summary.trim().length > 0;
  const hasEducation = education.length > 0 && education.some(e => e.institution.trim());
  const hasExperience = experience.length > 0 && experience.some(e => e.position.trim());
  const hasOrganization = organization.length > 0 && organization.some(o => o.organization.trim());
  const hasProjects = projects.length > 0 && projects.some(p => p.title.trim());
  const hasSkills = skills.some(c => c.skills.length > 0);
  const hasCertifications = certifications.length > 0 && certifications.some(c => c.name.trim());
  const hasAchievements = achievements.length > 0 && achievements.some(a => a.title.trim());
  const hasLanguages = languages.length > 0 && languages.some(l => l.language.trim());
  const hasAdditional = additional.length > 0 && additional.some(a => a.content.trim());

  // Render individual sections dynamically based on user's defined sectionOrder
  const renderSection = (key: string) => {
    switch (key) {
      case 'summary':
        if (!hasSummary) return null;
        return (
          <section key="summary" className={`break-avoid ${spacingConfig.sectionMargin}`}>
            <SectionHeader title="Professional Summary" />
            <p className={`${spacingConfig.textSize} ${spacingConfig.lineHeight} text-gray-800 text-justify`}>
              {summary}
            </p>
          </section>
        );

      case 'education':
        if (!hasEducation) return null;
        return (
          <section key="education" className={`break-avoid ${spacingConfig.sectionMargin}`}>
            <SectionHeader title="Education" />
            <div className="space-y-2">
              {education.map(item => {
                if (!item.institution.trim()) return null;
                const dateStr = formatDateRange(item.startDate, item.endDate, item.isCurrent, 'Expected Graduation');

                return (
                  <div key={item.id} className={`break-avoid ${spacingConfig.itemMargin}`}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-gray-900 text-[11px]">
                        {item.institution}
                        {item.location && <span className="font-normal text-gray-600"> — {item.location}</span>}
                      </h3>
                      {dateStr && <span className="text-[10px] text-gray-600 shrink-0 ml-2">{dateStr}</span>}
                    </div>

                    <div className="flex justify-between items-baseline">
                      <div className="text-[10.5px] text-gray-800 font-medium">
                        {item.degree}
                        {item.fieldOfStudy && <span> in {item.fieldOfStudy}</span>}
                        {item.gpa && (
                          <span className="text-gray-700 font-semibold ml-1.5">
                            (GPA: {item.gpa}{item.maxGpa ? `/${item.maxGpa}` : ''})
                          </span>
                        )}
                      </div>
                    </div>

                    {item.description && (
                      <p className={`text-[10px] text-gray-700 mt-0.5 ${spacingConfig.lineHeight}`}>
                        {item.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );

      case 'skills':
        if (!hasSkills) return null;
        return (
          <section key="skills" className={`break-avoid ${spacingConfig.sectionMargin}`}>
            <SectionHeader title="Technical & Professional Skills" />
            <div className="space-y-1">
              {skills.map(cat => {
                const validSkills = cat.skills.filter(s => s.trim().length > 0);
                if (validSkills.length === 0) return null;

                return (
                  <div key={cat.id} className="text-[10px] leading-tight">
                    <span className="font-bold text-gray-900">{cat.name}: </span>
                    <span className="text-gray-800">{validSkills.join(', ')}</span>
                  </div>
                );
              })}
            </div>
          </section>
        );

      case 'projects':
        if (!hasProjects) return null;
        return (
          <section key="projects" className={`break-avoid ${spacingConfig.sectionMargin}`}>
            <SectionHeader title="Key Projects & Technical Portfolio" />
            <div className="space-y-2.5">
              {projects.map(proj => {
                if (!proj.title.trim()) return null;
                const dateStr = formatDateRange(proj.startDate, proj.endDate);
                const validBullets = proj.bullets.filter(b => b.trim().length > 0);

                return (
                  <div key={proj.id} className={`break-avoid ${spacingConfig.itemMargin}`}>
                    <div className="flex justify-between items-baseline">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-bold text-gray-900 text-[11px]">{proj.title}</h3>
                        {proj.role && <span className="text-[10px] text-gray-600 font-medium">| {proj.role}</span>}
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[9.5px] text-blue-800 hover:underline font-normal"
                          >
                            [Demo]
                          </a>
                        )}
                        {proj.githubLink && (
                          <a
                            href={proj.githubLink.startsWith('http') ? proj.githubLink : `https://${proj.githubLink}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[9.5px] text-blue-800 hover:underline font-normal"
                          >
                            [GitHub]
                          </a>
                        )}
                      </div>
                      {dateStr && <span className="text-[10px] text-gray-600 shrink-0 ml-2">{dateStr}</span>}
                    </div>

                    {proj.techStack && proj.techStack.length > 0 && (
                      <div className="text-[10px] text-gray-700 italic mt-0.5">
                        <span className="font-semibold not-italic text-gray-800">Stack: </span>
                        {proj.techStack.join(', ')}
                      </div>
                    )}

                    {validBullets.length > 0 && (
                      <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-gray-800">
                        {validBullets.map((bullet, idx) => (
                          <li key={idx} className={`${spacingConfig.textSize} ${spacingConfig.lineHeight} pl-0.5 text-justify`}>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );

      case 'experience':
        if (!hasExperience) return null;
        return (
          <section key="experience" className={`break-avoid ${spacingConfig.sectionMargin}`}>
            <SectionHeader title="Work & Internship Experience" />
            <div className="space-y-2.5">
              {experience.map(exp => {
                if (!exp.position.trim()) return null;
                const dateStr = formatDateRange(exp.startDate, exp.endDate, exp.isCurrent, 'Present');
                const validBullets = exp.bullets.filter(b => b.trim().length > 0);

                return (
                  <div key={exp.id} className={`break-avoid ${spacingConfig.itemMargin}`}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-gray-900 text-[11px]">
                        {exp.position}
                        {exp.employmentType && <span className="font-normal text-gray-600"> ({exp.employmentType})</span>}
                      </h3>
                      {dateStr && <span className="text-[10px] text-gray-600 shrink-0 ml-2">{dateStr}</span>}
                    </div>

                    <div className="flex justify-between items-baseline text-[10px] text-gray-700 font-medium">
                      <span>{exp.company}</span>
                      {exp.location && <span>{exp.location}</span>}
                    </div>

                    {validBullets.length > 0 && (
                      <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-gray-800">
                        {validBullets.map((bullet, idx) => (
                          <li key={idx} className={`${spacingConfig.textSize} ${spacingConfig.lineHeight} pl-0.5 text-justify`}>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );

      case 'organization':
        if (!hasOrganization) return null;
        return (
          <section key="organization" className={`break-avoid ${spacingConfig.sectionMargin}`}>
            <SectionHeader title="Leadership & Campus Organizations" />
            <div className="space-y-2.5">
              {organization.map(org => {
                if (!org.organization.trim()) return null;
                const dateStr = formatDateRange(org.startDate, org.endDate, org.isCurrent, 'Present');
                const validBullets = org.bullets.filter(b => b.trim().length > 0);

                return (
                  <div key={org.id} className={`break-avoid ${spacingConfig.itemMargin}`}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-gray-900 text-[11px]">
                        {org.role} <span className="font-normal text-gray-600">— {org.organization}</span>
                      </h3>
                      {dateStr && <span className="text-[10px] text-gray-600 shrink-0 ml-2">{dateStr}</span>}
                    </div>

                    {org.location && <div className="text-[10px] text-gray-600">{org.location}</div>}

                    {validBullets.length > 0 && (
                      <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-gray-800">
                        {validBullets.map((bullet, idx) => (
                          <li key={idx} className={`${spacingConfig.textSize} ${spacingConfig.lineHeight} pl-0.5 text-justify`}>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );

      case 'certifications':
        if (!hasCertifications) return null;
        return (
          <section key="certifications" className={`break-avoid ${spacingConfig.sectionMargin}`}>
            <SectionHeader title="Certifications & Licenses" />
            <div className="space-y-1.5">
              {certifications.map(cert => {
                if (!cert.name.trim()) return null;
                const dateStr = cert.issueDate
                  ? cert.doesNotExpire
                    ? `${cert.issueDate}`
                    : cert.expirationDate
                    ? `${cert.issueDate} – ${cert.expirationDate}`
                    : cert.issueDate
                  : '';

                return (
                  <div key={cert.id} className="flex justify-between items-baseline text-[10px]">
                    <div>
                      <span className="font-bold text-gray-900">{cert.name}</span>
                      {cert.issuer && <span className="text-gray-700"> — {cert.issuer}</span>}
                      {cert.credentialId && <span className="text-gray-500 text-[9.5px]"> (ID: {cert.credentialId})</span>}
                    </div>
                    {dateStr && <span className="text-gray-600 shrink-0 ml-2">{dateStr}</span>}
                  </div>
                );
              })}
            </div>
          </section>
        );

      case 'achievements':
        if (!hasAchievements) return null;
        return (
          <section key="achievements" className={`break-avoid ${spacingConfig.sectionMargin}`}>
            <SectionHeader title="Honors & Achievements" />
            <div className="space-y-1.5">
              {achievements.map(ach => {
                if (!ach.title.trim()) return null;

                return (
                  <div key={ach.id} className="text-[10px]">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-gray-900">
                        {ach.title}
                        {ach.issuerOrEvent && <span className="font-normal text-gray-700"> — {ach.issuerOrEvent}</span>}
                      </span>
                      {ach.year && <span className="text-gray-600 shrink-0 ml-2">{ach.year}</span>}
                    </div>
                    {ach.description && <p className="text-gray-700 mt-0.5">{ach.description}</p>}
                  </div>
                );
              })}
            </div>
          </section>
        );

      case 'languages':
        if (!hasLanguages) return null;
        return (
          <section key="languages" className={`break-avoid ${spacingConfig.sectionMargin}`}>
            <SectionHeader title="Languages" />
            <div className="text-[10px] text-gray-800">
              {languages.map((l, i) => (
                <span key={l.id}>
                  <span className="font-bold text-gray-900">{l.language}</span> ({l.proficiency})
                  {i < languages.length - 1 ? ' • ' : ''}
                </span>
              ))}
            </div>
          </section>
        );

      case 'additional':
        if (!hasAdditional) return null;
        return (
          <section key="additional" className={`break-avoid ${spacingConfig.sectionMargin}`}>
            <SectionHeader title="Additional Information" />
            <div className="space-y-1 text-[10px] text-gray-800">
              {additional.map(item => (
                <div key={item.id}>
                  <span className="font-bold text-gray-900">{item.title}: </span>
                  <span className="text-gray-700">{item.content}</span>
                </div>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  // Header layout alignment based on template
  const isCentered = settings.template === 'classic';

  return (
    <div
      id={id || 'cv-print-area'}
      className={`a4-page-sheet ${fontClass} ${spacingConfig.padding} shadow-md print:shadow-none mx-auto`}
    >
      {/* CV Header */}
      <header className={`break-avoid mb-3.5 ${isCentered ? 'text-center' : 'text-left'}`}>
        <h1
          className={`font-extrabold uppercase tracking-tight text-gray-950 ${spacingConfig.nameSize}`}
          style={{ letterSpacing: '0.02em' }}
        >
          {personal.fullName || 'NAMA LENGKAP KANDIDAT'}
        </h1>

        {personal.headline && (
          <p
            className={`font-semibold tracking-wide mt-1 text-gray-700 ${spacingConfig.headSize}`}
            style={{ color: settings.accentColor }}
          >
            {personal.headline}
          </p>
        )}

        {/* Contact info bar */}
        {contactParts.length > 0 && (
          <div
            className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1.5 text-[10px] text-gray-700 ${
              isCentered ? 'justify-center' : 'justify-start'
            }`}
          >
            {contactParts.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-gray-400 select-none">•</span>}
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-gray-800 hover:text-blue-700"
                  >
                    {item.text}
                  </a>
                ) : (
                  <span>{item.text}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {personal.additionalInfo && (
          <p className="text-[9.5px] text-gray-500 italic mt-1">{personal.additionalInfo}</p>
        )}
      </header>

      {/* Main Content Sections dynamically sorted */}
      <main>
        {sectionOrder
          .filter(sec => sec.visible && sec.key !== 'personal')
          .map(sec => renderSection(sec.key))}
      </main>
    </div>
  );
}
