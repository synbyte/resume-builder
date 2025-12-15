import { ResumeData } from '@/lib/types';
import { useResumeLayout } from '../ResumeLayoutContext';
import InteractiveItem from '../InteractiveItem';
import { Mail, Phone, Linkedin, Globe } from 'lucide-react';

export default function ElegantTemplate({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills } = data;
    const { offsets, designSettings } = useResumeLayout();

    const { baseFontSize, primaryColor, headingSizes, lineHeight } = designSettings;
    // Elegant always uses a serif font for that classic look, overriding user selection or offering a specific elegant serif if we had multiple choices. 
    // For now we'll use the user's font but 'Elegant' implies Serif, so let's default to serif if the user hasn't explicitly chosen a sans-serif that clashes. 
    // Actually, following the "Elegant" name, we should force a Serif stack or use the user's font if they want control. 
    // Let's use the user's font for consistency but style the layout elegantly.

    return (
        <div
            className="font-serif text-slate-900"
            style={{
                fontFamily: designSettings.fontFamily.includes('Sans') ? 'Georgia, Cambria, "Times New Roman", Times, serif' : designSettings.fontFamily,
                fontSize: `${baseFontSize}px`,
                lineHeight
            }}
        >
            <div className="text-center border-b double-border border-slate-300 pb-6 mb-8 relative">
                <h1
                    className="font-normal uppercase tracking-[0.2em] mb-3 text-slate-800"
                    style={{ fontSize: `${headingSizes.h1}px`, color: primaryColor }}
                >
                    {personalInfo?.fullName || 'Your Name'}
                </h1>

                <div className="flex justify-center flex-wrap gap-6 text-slate-500 text-sm italic">
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
                <div className="mb-8 px-4">
                    <InteractiveItem id="heading-summary">
                        <div className="flex items-center mb-4">
                            <div className="flex-grow h-px bg-slate-200"></div>
                            <h2
                                className="px-4 font-semibold italic text-slate-700"
                                style={{
                                    fontSize: `${headingSizes.h2}px`,
                                    color: primaryColor,
                                }}
                            >
                                Professional Profile
                            </h2>
                            <div className="flex-grow h-px bg-slate-200"></div>
                        </div>
                    </InteractiveItem>
                    <p className="textAlign-center leading-relaxed text-slate-600 text-center italic" style={{ fontSize: `${baseFontSize + 1}px` }}>
                        &ldquo;{summary}&rdquo;
                    </p>
                </div>
            )}

            {(experience?.length ?? 0) > 0 && (
                <div className="mb-8">
                    <InteractiveItem id="heading-experience">
                        <div className="border-b border-slate-800 mb-6 pb-1">
                            <h2
                                className="font-bold uppercase tracking-widest text-sm"
                                style={{
                                    fontSize: `${headingSizes.h2}px`,
                                    color: primaryColor
                                }}
                            >
                                Experience
                            </h2>
                        </div>
                    </InteractiveItem>

                    <div className="space-y-8">
                        {experience?.map((exp) => (
                            <InteractiveItem key={exp.id} id={exp.id}>
                                <div className="grid grid-cols-[120px_1fr] gap-4">
                                    <div className="text-right text-slate-500 italic text-sm mt-1">
                                        {exp.startDate} <br /> &mdash; <br /> {exp.endDate || 'Present'}
                                    </div>
                                    <div>
                                        <h3
                                            className="font-bold text-slate-800"
                                            style={{ fontSize: `${headingSizes.h3}px` }}
                                        >
                                            {exp.company}
                                        </h3>
                                        <div className="text-slate-600 font-medium mb-2 italic" style={{ color: primaryColor }}>{exp.title}</div>
                                        <ul className="list-disc ml-4 space-y-1 text-slate-600 marker:text-slate-400">
                                            {exp.duties.map((duty, idx) => (
                                                <li key={idx} className="pl-1 leading-relaxed">{duty}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </InteractiveItem>
                        ))}
                    </div>
                </div>
            )}

            {(education?.length ?? 0) > 0 && (
                <div className="mb-8">
                    <InteractiveItem id="heading-education">
                        <div className="border-b border-slate-800 mb-6 pb-1">
                            <h2
                                className="font-bold uppercase tracking-widest text-sm"
                                style={{
                                    fontSize: `${headingSizes.h2}px`,
                                    color: primaryColor
                                }}
                            >
                                Education
                            </h2>
                        </div>
                    </InteractiveItem>
                    <div className="grid grid-cols-2 gap-6">
                        {education?.map((edu) => (
                            <InteractiveItem key={edu.id} id={edu.id}>
                                <div>
                                    <div className="font-bold text-slate-800" style={{ fontSize: `${headingSizes.h3}px` }}>{edu.school}</div>
                                    <div className="italic text-slate-600">{edu.degree}</div>
                                    <div className="text-sm text-slate-400 mt-1">{edu.year}</div>
                                </div>
                            </InteractiveItem>
                        ))}
                    </div>
                </div>
            )}

            {(skills?.length ?? 0) > 0 && (
                <div>
                    <InteractiveItem id="heading-skills">
                        <div className="border-b border-slate-800 mb-6 pb-1">
                            <h2
                                className="font-bold uppercase tracking-widest text-sm"
                                style={{
                                    fontSize: `${headingSizes.h2}px`,
                                    color: primaryColor
                                }}
                            >
                                Skills
                            </h2>
                        </div>
                    </InteractiveItem>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 italic text-slate-700">
                        {skills?.map((skill, idx) => (
                            <span key={idx} className="relative">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
