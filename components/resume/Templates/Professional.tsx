import { ResumeData } from '@/lib/types';
import { useResumeLayout } from '../ResumeLayoutContext';
import InteractiveItem from '../InteractiveItem';
import { Mail, Phone, Linkedin, Globe } from 'lucide-react';

export default function ProfessionalTemplate({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills } = data;
    const { offsets, designSettings } = useResumeLayout();

    const { fontFamily, baseFontSize, primaryColor, headingSizes, lineHeight } = designSettings;

    return (
        <div
            className="font-sans text-gray-900 h-full flex gap-6"
            style={{
                fontFamily,
                fontSize: `${baseFontSize}px`,
                lineHeight
            }}
        >
            {/* Left Column */}
            <div className="w-1/3 border-r border-gray-200 pr-4">
                <h1
                    className="font-bold mb-4 break-words"
                    style={{ fontSize: `${headingSizes.h1}px`, color: primaryColor }}
                >
                    {personalInfo?.fullName || 'Your Name'}
                </h1>

                <div className="space-y-2 mb-6 text-gray-600" style={{ fontSize: `${baseFontSize - 2}px` }}>
                    <div className="font-semibold text-gray-900 uppercase tracking-wider mb-2" style={{ fontSize: `${baseFontSize - 4}px` }}>Contact</div>
                    {personalInfo?.email && (
                        <div className="flex items-center gap-2 break-all">
                            <Mail size={14} className="shrink-0" />
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo?.phone && (
                        <div className="flex items-center gap-2">
                            <Phone size={14} className="shrink-0" />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo?.linkedin && (
                        <div className="flex items-center gap-2 break-all">
                            <Linkedin size={14} className="shrink-0" />
                            <span>{personalInfo.linkedin}</span>
                        </div>
                    )}
                    {personalInfo?.website && (
                        <div className="flex items-center gap-2 break-all">
                            <Globe size={14} className="shrink-0" />
                            <span>{personalInfo.website}</span>
                        </div>
                    )}
                </div>

                {(education?.length ?? 0) > 0 && (
                    <div className="mb-6">
                        <InteractiveItem id="heading-education">
                            <div
                                className="font-semibold text-gray-900 uppercase tracking-wider mb-2 border-b pb-1"
                                style={{ fontSize: `${baseFontSize - 4}px`, borderColor: primaryColor }}
                            >Education</div>
                        </InteractiveItem>
                        <div className="space-y-3">
                            {education?.map((edu) => (
                                <InteractiveItem key={edu.id} id={edu.id}>
                                    <div className="font-bold" style={{ fontSize: `${baseFontSize}px` }}>{edu.school}</div>
                                    <div className="" style={{ fontSize: `${baseFontSize}px` }}>{edu.degree}</div>
                                    <div className="text-gray-500" style={{ fontSize: `${baseFontSize - 2}px` }}>{edu.year}</div>
                                </InteractiveItem>
                            ))}
                        </div>
                    </div>
                )}

                {(skills?.length ?? 0) > 0 && (
                    <div>
                        <InteractiveItem id="heading-skills">
                            <div
                                className="font-semibold text-gray-900 uppercase tracking-wider mb-2 border-b pb-1"
                                style={{ fontSize: `${baseFontSize - 4}px`, borderColor: primaryColor }}
                            >Skills</div>
                        </InteractiveItem>
                        <div className="flex flex-col gap-1" style={{ fontSize: `${baseFontSize}px` }}>
                            {skills?.map((skill, idx) => (
                                <span key={idx}>{skill}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Column */}
            <div className="w-2/3">
                {summary && (
                    <div className="mb-6">
                        <h2
                            className="font-bold mb-2"
                            style={{ fontSize: `${headingSizes.h2}px`, color: primaryColor }}
                        >Profile</h2>
                        <p className="leading-relaxed text-gray-700" style={{ fontSize: `${baseFontSize}px` }}>{summary}</p>
                    </div>
                )}

                {(experience?.length ?? 0) > 0 && (
                    <div>
                        <InteractiveItem id="heading-experience">
                            <h2
                                className="font-bold mb-4"
                                style={{ fontSize: `${headingSizes.h2}px`, color: primaryColor }}
                            >Experience</h2>
                        </InteractiveItem>
                        <div className="space-y-5">
                            {experience?.map((exp) => (
                                <InteractiveItem key={exp.id} id={exp.id}>
                                    <h3
                                        className="font-bold"
                                        style={{ fontSize: `${headingSizes.h3}px` }}
                                    >{exp.company}</h3>
                                    <div
                                        className="flex justify-between font-medium mb-1"
                                        style={{ color: primaryColor, fontSize: `${baseFontSize - 2}px` }}
                                    >
                                        <span>{exp.title}</span>
                                        <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                                    </div>
                                    <ul
                                        className="list-square ml-4 space-y-1 text-gray-700 marker:text-blue-500" // kept marker blue as specific to template style, or could change
                                        style={{ fontSize: `${baseFontSize}px` }}
                                    >
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
        </div>
    );
}
