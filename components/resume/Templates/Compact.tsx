import { ResumeData } from '@/lib/types';
import { useResumeLayout } from '../ResumeLayoutContext';
import InteractiveItem from '../InteractiveItem';
import { Mail, Phone, Linkedin, Globe } from 'lucide-react';

export default function CompactTemplate({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills } = data;
    const { offsets, designSettings } = useResumeLayout();

    const { baseFontSize, primaryColor, headingSizes, lineHeight } = designSettings;

    return (
        <div
            className="font-sans text-stone-900"
            style={{
                fontFamily: designSettings.fontFamily,
                fontSize: `${baseFontSize - 1}px`, // Slightly smaller base font for compactness
                lineHeight: 1.4 // Tighter line height
            }}
        >
            {/* Header: Compact two-column */}
            <div className="flex justify-between items-start border-b-4 border-stone-800 pb-4 mb-4">
                <div>
                    <h1
                        className="font-black uppercase tracking-tight leading-none"
                        style={{ fontSize: `${headingSizes.h1}px` }}
                    >
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    <p className="text-stone-500 font-medium text-sm mt-1">{summary?.slice(0, 60)}...</p> {/* Tiny snippet if available */}
                </div>
                <div className="text-right text-xs font-semibold space-y-1">
                    {personalInfo?.email && <div className="flex justify-end items-center gap-1"><span>{personalInfo.email}</span><Mail size={12} /></div>}
                    {personalInfo?.phone && <div className="flex justify-end items-center gap-1"><span>{personalInfo.phone}</span><Phone size={12} /></div>}
                    {personalInfo?.linkedin && <div className="flex justify-end items-center gap-1"><span>{personalInfo.linkedin}</span><Linkedin size={12} /></div>}
                    {personalInfo?.website && <div className="flex justify-end items-center gap-1"><span>{personalInfo.website}</span><Globe size={12} /></div>}
                </div>
            </div>

            <div className="grid grid-cols-[1fr_200px] gap-6">
                {/* Main Content Column */}
                <div>
                    {summary && (
                        <div className="mb-6">
                            <InteractiveItem id="heading-summary">
                                <h2
                                    className="font-bold border-b border-stone-300 mb-2"
                                    style={{
                                        fontSize: `${headingSizes.h2}px`,
                                        color: primaryColor,
                                    }}
                                >
                                    Summary
                                </h2>
                            </InteractiveItem>
                            <p className="text-justify">{summary}</p>
                        </div>
                    )}

                    {(experience?.length ?? 0) > 0 && (
                        <div>
                            <InteractiveItem id="heading-experience">
                                <h2
                                    className="font-bold border-b border-stone-300 mb-3"
                                    style={{
                                        fontSize: `${headingSizes.h2}px`,
                                        color: primaryColor,
                                    }}
                                >
                                    Work Experience
                                </h2>
                            </InteractiveItem>
                            <div className="space-y-4">
                                {experience?.map((exp) => (
                                    <InteractiveItem key={exp.id} id={exp.id}>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-bold" style={{ fontSize: `${headingSizes.h3}px` }}>{exp.company}</h3>
                                            <span className="text-xs font-bold text-stone-500 whitespace-nowrap">{exp.startDate} - {exp.endDate || 'Present'}</span>
                                        </div>
                                        <div className="text-sm font-semibold mb-1" style={{ color: primaryColor }}>{exp.title}</div>
                                        <ul className="list-square ml-4 space-y-0.5">
                                            {exp.duties.map((duty, idx) => (
                                                <li key={idx} className="pl-1">{duty}</li>
                                            ))}
                                        </ul>
                                    </InteractiveItem>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Column */}
                <div className="bg-stone-50 p-3 rounded h-fit">
                    {(skills?.length ?? 0) > 0 && (
                        <div className="mb-6">
                            <InteractiveItem id="heading-skills">
                                <h2
                                    className="font-bold border-b border-stone-300 mb-2"
                                    style={{
                                        fontSize: `${headingSizes.h2}px`,
                                        color: primaryColor,
                                    }}
                                >
                                    Skills
                                </h2>
                            </InteractiveItem>
                            <div className="flex flex-col gap-1 text-sm">
                                {skills?.map((skill, idx) => (
                                    <span key={idx} className="font-medium text-stone-700 border-b border-stone-100 pb-1">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {(education?.length ?? 0) > 0 && (
                        <div>
                            <InteractiveItem id="heading-education">
                                <h2
                                    className="font-bold border-b border-stone-300 mb-2"
                                    style={{
                                        fontSize: `${headingSizes.h2}px`,
                                        color: primaryColor,
                                    }}
                                >
                                    Education
                                </h2>
                            </InteractiveItem>
                            <div className="space-y-3">
                                {education?.map((edu) => (
                                    <InteractiveItem key={edu.id} id={edu.id}>
                                        <div className="font-bold leading-tight" style={{ fontSize: `${headingSizes.h3}px` }}>{edu.school}</div>
                                        <div className="text-xs leading-tight mb-1">{edu.degree}</div>
                                        <div className="text-xs text-stone-500">{edu.year}</div>
                                    </InteractiveItem>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
