import { ResumeData } from '@/lib/types';
import { useResumeLayout } from '../ResumeLayoutContext';
import InteractiveItem from '../InteractiveItem';
import { Mail, Phone, Linkedin, Globe } from 'lucide-react';

export default function ModernTemplate({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills } = data;
    const { offsets, designSettings } = useResumeLayout();

    const { fontFamily, baseFontSize, primaryColor, headingSizes, lineHeight } = designSettings;

    return (
        <div
            className="font-sans text-gray-900"
            style={{
                fontFamily,
                fontSize: `${baseFontSize}px`,
                lineHeight
            }}
        >
            <div className="text-center border-b-2 border-gray-800 pb-4 mb-6" style={{ borderColor: primaryColor }}>
                <h1
                    className="font-bold uppercase tracking-widest mb-2"
                    style={{ fontSize: `${headingSizes.h1}px`, color: primaryColor }}
                >
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                <div className="flex justify-center flex-wrap gap-4 text-gray-600 text-xs uppercase tracking-wide">
                    {personalInfo?.email && (
                        <div className="flex items-center gap-1.5">
                            <Mail size={12} />
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo?.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone size={12} />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo?.linkedin && (
                        <div className="flex items-center gap-1.5">
                            <Linkedin size={12} />
                            <span>{personalInfo.linkedin}</span>
                        </div>
                    )}
                    {personalInfo?.website && (
                        <div className="flex items-center gap-1.5">
                            <Globe size={12} />
                            <span>{personalInfo.website}</span>
                        </div>
                    )}
                </div>
            </div>

            {summary && (
                <div className="mb-6">
                    <InteractiveItem id="heading-summary">
                        <h2
                            className="font-bold uppercase border-b border-gray-300 mb-2 pb-1 break-after-avoid"
                            style={{
                                fontSize: `${headingSizes.h2}px`,
                                color: primaryColor,
                                borderColor: primaryColor
                            }}
                        >
                            Professional Summary
                        </h2>
                    </InteractiveItem>
                    <p className="leading-relaxed text-justify" style={{ fontSize: `${baseFontSize}px` }}>{summary}</p>
                </div>
            )}

            {(experience?.length ?? 0) > 0 && (
                <div className="mb-6">
                    <InteractiveItem id="heading-experience">
                        <h2
                            className="font-bold uppercase border-b border-gray-300 mb-2 pb-1 break-after-avoid"
                            style={{
                                fontSize: `${headingSizes.h2}px`,
                                color: primaryColor,
                                borderColor: primaryColor
                            }}
                        >
                            Experience
                        </h2>
                    </InteractiveItem>
                    <div className="space-y-4">
                        {experience?.map((exp) => (
                            <InteractiveItem
                                key={exp.id}
                                id={exp.id}
                            >
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3
                                        className="font-bold text-gray-900"
                                        style={{ fontSize: `${headingSizes.h3}px` }}
                                    >
                                        {exp.company}
                                    </h3>
                                    <span className="text-xs text-gray-500 italic">
                                        {exp.startDate} - {exp.endDate || 'Present'}
                                    </span>
                                </div>
                                <div className="font-semibold text-gray-700 mb-1" style={{ fontSize: `${baseFontSize}px` }}>{exp.title}</div>
                                <ul className="list-disc list-outside ml-4 space-y-1" style={{ fontSize: `${baseFontSize}px` }}>
                                    {exp.duties.map((duty, idx) => (
                                        <li key={idx} className="pl-1">{duty}</li>
                                    ))}
                                </ul>
                            </InteractiveItem>
                        ))}
                    </div>
                </div>
            )}

            {(education?.length ?? 0) > 0 && (
                <div className="mb-6">
                    <InteractiveItem id="heading-education">
                        <h2
                            className="font-bold uppercase border-b border-gray-300 mb-2 pb-1 break-after-avoid"
                            style={{
                                fontSize: `${headingSizes.h2}px`,
                                color: primaryColor,
                                borderColor: primaryColor
                            }}
                        >
                            Education
                        </h2>
                    </InteractiveItem>
                    <div className="space-y-2">
                        {education?.map((edu) => (
                            <InteractiveItem
                                key={edu.id}
                                id={edu.id}
                            >
                                <div>
                                    <div className="font-bold" style={{ fontSize: `${headingSizes.h3}px` }}>{edu.school}</div>
                                    <div className="italic text-xs">{edu.degree}</div>
                                </div>
                                <div className="text-xs text-gray-500">{edu.year}</div>
                            </InteractiveItem>
                        ))}
                    </div>
                </div>
            )}

            {(skills?.length ?? 0) > 0 && (
                <div className="mb-6">
                    <InteractiveItem id="heading-skills">
                        <h2
                            className="font-bold uppercase border-b border-gray-300 mb-2 pb-1 break-after-avoid"
                            style={{
                                fontSize: `${headingSizes.h2}px`,
                                color: primaryColor,
                                borderColor: primaryColor
                            }}
                        >
                            Skills
                        </h2>
                    </InteractiveItem>
                    <div className="flex flex-wrap gap-2 text-xs" style={{ fontSize: `${baseFontSize}px` }}>
                        {skills?.join(' • ')}
                    </div>
                </div>
            )}
        </div>
    );
}

