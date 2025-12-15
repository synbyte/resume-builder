import { ResumeData } from '@/lib/types';
import { useResumeLayout } from '../ResumeLayoutContext';
import InteractiveItem from '../InteractiveItem';
import { Mail, Phone, Linkedin, Globe } from 'lucide-react';

export default function MinimalTemplate({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills } = data;
    const { offsets, designSettings } = useResumeLayout();

    const { fontFamily, baseFontSize, primaryColor, headingSizes, lineHeight } = designSettings;

    return (
        <div
            className="font-sans text-gray-800"
            style={{
                fontFamily,
                fontSize: `${baseFontSize}px`,
                lineHeight
            }}
        >
            <div className="mb-8">
                <h1
                    className="font-light mb-2"
                    style={{ fontSize: `${headingSizes.h1}px`, color: primaryColor }}
                >
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                <div className="text-gray-500 space-y-1" style={{ fontSize: `${baseFontSize}px` }}>
                    {personalInfo?.email && (
                        <div className="flex items-center gap-2">
                            <Mail size={14} />
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo?.phone && (
                        <div className="flex items-center gap-2">
                            <Phone size={14} />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo?.linkedin && (
                        <div className="flex items-center gap-2">
                            <Linkedin size={14} />
                            <span>{personalInfo.linkedin}</span>
                        </div>
                    )}
                    {personalInfo?.website && (
                        <div className="flex items-center gap-2">
                            <Globe size={14} />
                            <span>{personalInfo.website}</span>
                        </div>
                    )}
                </div>
            </div>

            {summary && (
                <div className="mb-8 grid grid-cols-4 gap-4">
                    <div
                        className="col-span-1 font-bold uppercase tracking-wider text-gray-400"
                        style={{ fontSize: `${baseFontSize - 2}px` }}
                    >Profile</div>
                    <div className="col-span-3 leading-relaxed">{summary}</div>
                </div>
            )}

            {(experience?.length ?? 0) > 0 && (
                <div className="mb-8 grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                        <InteractiveItem id="heading-history">
                            <div
                                className="font-bold uppercase tracking-wider text-gray-400"
                                style={{ fontSize: `${baseFontSize - 2}px`, color: primaryColor }}
                            >History</div>
                        </InteractiveItem>
                    </div>
                    <div className="col-span-3 space-y-6">
                        {experience?.map((exp) => (
                            <InteractiveItem key={exp.id} id={exp.id}>
                                <h3
                                    className="font-medium text-gray-900"
                                    style={{ fontSize: `${headingSizes.h3}px` }}
                                >{exp.company}</h3>
                                <div className="text-gray-500 mb-2" style={{ fontSize: `${baseFontSize - 1}px` }}>{exp.title} | {exp.startDate} - {exp.endDate || 'Present'}</div>
                                <ul className="space-y-1 text-gray-600">
                                    {exp.duties.map((duty, idx) => (
                                        <li key={idx} className="block">• {duty}</li>
                                    ))}
                                </ul>
                            </InteractiveItem>
                        ))}
                    </div>
                </div>
            )}

            {(education?.length ?? 0) > 0 && (
                <div className="mb-8 grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                        <InteractiveItem id="heading-education">
                            <div
                                className="font-bold uppercase tracking-wider text-gray-400"
                                style={{ fontSize: `${baseFontSize - 2}px`, color: primaryColor }}
                            >Education</div>
                        </InteractiveItem>
                    </div>
                    <div className="col-span-3 space-y-2">
                        {education?.map((edu) => (
                            <InteractiveItem key={edu.id} id={edu.id}>
                                <div className="font-medium" style={{ fontSize: `${baseFontSize}px` }}>{edu.school}</div>
                                <div className="text-gray-500" style={{ fontSize: `${baseFontSize - 1}px` }}>{edu.degree} · {edu.year}</div>
                            </InteractiveItem>
                        ))}
                    </div>
                </div>
            )}

            {(skills?.length ?? 0) > 0 && (
                <div className="mb-8 grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                        <InteractiveItem id="heading-expertise">
                            <div
                                className="font-bold uppercase tracking-wider text-gray-400"
                                style={{ fontSize: `${baseFontSize - 2}px`, color: primaryColor }}
                            >Expertise</div>
                        </InteractiveItem>
                    </div>
                    <div className="col-span-3 flex flex-wrap gap-x-4 gap-y-1">
                        {skills?.map((skill, idx) => <span key={idx} className="text-gray-700">{skill}</span>)}
                    </div>
                </div>
            )}
        </div>
    );
}
