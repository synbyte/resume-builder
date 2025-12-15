import { ResumeData } from '@/lib/types';
import { useResumeLayout } from '../ResumeLayoutContext';
import InteractiveItem from '../InteractiveItem';
import { Mail, Phone, Linkedin, Globe } from 'lucide-react';

export default function ClassicTemplate({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills } = data;
    const { offsets, designSettings } = useResumeLayout();

    const { fontFamily, baseFontSize, primaryColor, headingSizes, lineHeight } = designSettings;

    return (
        <div
            className="font-serif text-gray-900 leading-normal"
            style={{
                fontFamily,
                fontSize: `${baseFontSize}px`,
                lineHeight
            }}
        >
            <div className="text-center mb-8">
                <h1
                    className="font-bold mb-1"
                    style={{ fontSize: `${headingSizes.h1}px`, color: primaryColor }}
                >
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                <div className="flex justify-center flex-wrap gap-4 text-sm mt-2">
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
                            className="font-bold border-b mb-2 uppercase"
                            style={{
                                fontSize: `${headingSizes.h2}px`,
                                borderColor: primaryColor,
                                color: primaryColor
                            }}
                        >
                            Professional Summary
                        </h2>
                    </InteractiveItem>
                    <p className="text-justify" style={{ fontSize: `${baseFontSize}px` }}>{summary}</p>
                </div>
            )}

            {(experience?.length ?? 0) > 0 && (
                <div className="mb-6">
                    <InteractiveItem id="heading-experience">
                        <h2
                            className="font-bold border-b mb-2 uppercase"
                            style={{
                                fontSize: `${headingSizes.h2}px`,
                                borderColor: primaryColor,
                                color: primaryColor
                            }}
                        >
                            Experience
                        </h2>
                    </InteractiveItem>
                    <div className="space-y-4">
                        {experience?.map((exp) => (
                            <InteractiveItem key={exp.id} id={exp.id}>
                                <div className="flex justify-between font-bold text-sm">
                                    <span style={{ fontSize: `${headingSizes.h3}px` }}>{exp.company}</span>
                                    <span style={{ fontSize: `${baseFontSize}px` }}>{exp.startDate} - {exp.endDate || 'Present'}</span>
                                </div>
                                <div className="italic mb-1" style={{ fontSize: `${baseFontSize}px` }}>{exp.title}</div>
                                <ul className="list-disc ml-5 space-y-1" style={{ fontSize: `${baseFontSize}px` }}>
                                    {exp.duties.map((duty, idx) => (
                                        <li key={idx}>{duty}</li>
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
                            className="font-bold border-b mb-2 uppercase"
                            style={{
                                fontSize: `${headingSizes.h2}px`,
                                borderColor: primaryColor,
                                color: primaryColor
                            }}
                        >
                            Education
                        </h2>
                    </InteractiveItem>
                    <div className="space-y-2">
                        {education?.map((edu) => (
                            <InteractiveItem key={edu.id} id={edu.id} className="flex justify-between text-sm">
                                <div>
                                    <span className="font-bold" style={{ fontSize: `${baseFontSize}px` }}>{edu.school}</span>, <span className="italic" style={{ fontSize: `${baseFontSize}px` }}>{edu.degree}</span>
                                </div>
                                <span style={{ fontSize: `${baseFontSize}px` }}>{edu.year}</span>
                            </InteractiveItem>
                        ))}
                    </div>
                </div>
            )}

            {(skills?.length ?? 0) > 0 && (
                <div className="mb-6">
                    <InteractiveItem id="heading-skills">
                        <h2
                            className="font-bold border-b mb-2 uppercase"
                            style={{
                                fontSize: `${headingSizes.h2}px`,
                                borderColor: primaryColor,
                                color: primaryColor
                            }}
                        >
                            Core Skills
                        </h2>
                    </InteractiveItem>
                    <div className="" style={{ fontSize: `${baseFontSize}px` }}>
                        {skills?.join(', ')}
                    </div>
                </div>
            )}
        </div>
    );
}
