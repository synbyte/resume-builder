import { ResumeData } from '@/lib/types';
import { useResumeLayout } from '../ResumeLayoutContext';
import InteractiveItem from '../InteractiveItem';
import { Mail, Phone, Linkedin, Globe, Circle, CircleDot } from 'lucide-react';

export default function TimelineTemplate({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills } = data;
    const { offsets, designSettings } = useResumeLayout();

    const { baseFontSize, primaryColor, headingSizes, lineHeight } = designSettings;

    return (
        <div
            className="font-sans text-gray-800 relative"
            style={{
                fontFamily: designSettings.fontFamily,
                fontSize: `${baseFontSize}px`,
                lineHeight
            }}
        >
            <div className="flex flex-col items-center mb-10">
                <h1
                    className="font-bold text-3xl mb-2"
                    style={{ fontSize: `${headingSizes.h1}px`, color: primaryColor }}
                >
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                <div className="flex gap-4 text-sm text-gray-600">
                    {personalInfo?.email && <div className="flex items-center gap-1"><Mail size={14} /> {personalInfo.email}</div>}
                    {personalInfo?.phone && <div className="flex items-center gap-1"><Phone size={14} /> {personalInfo.phone}</div>}
                    {/* Simplified header contact for timeline visual focus */}
                </div>
                <div className="flex gap-4 text-sm text-gray-600 mt-1">
                    {personalInfo?.linkedin && <div className="flex items-center gap-1"><Linkedin size={14} /> {personalInfo.linkedin}</div>}
                    {personalInfo?.website && <div className="flex items-center gap-1"><Globe size={14} /> {personalInfo.website}</div>}
                </div>
            </div>

            <div className="relative pl-8 border-l-2 border-gray-200 ml-4 space-y-0">
                {/* Summary Timeline Node */}
                {summary && (
                    <div className="relative">
                        <div className="absolute -left-[41px] top-0 bg-white p-1">
                            <CircleDot size={18} color={primaryColor} />
                        </div>
                        <InteractiveItem id="heading-summary">
                            <h2
                                className="font-bold uppercase tracking-wider mb-2"
                                style={{
                                    fontSize: `${headingSizes.h2}px`,
                                    color: primaryColor,
                                }}
                            >
                                Professional Summary
                            </h2>
                        </InteractiveItem>
                        <p className="textAlign-justify leading-relaxed text-gray-700 bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
                            {summary}
                        </p>
                    </div>
                )}

                {/* Experience Timeline Nodes */}
                {(experience?.length ?? 0) > 0 && (
                    <div className="relative">
                        <div className="absolute -left-[41px] top-0 bg-white p-1">
                            <CircleDot size={18} color={primaryColor} />
                        </div>
                        <InteractiveItem id="heading-experience">
                            <h2
                                className="font-bold uppercase tracking-wider mb-6"
                                style={{
                                    fontSize: `${headingSizes.h2}px`,
                                    color: primaryColor,
                                }}
                            >
                                Experience
                            </h2>
                        </InteractiveItem>

                        <div className="space-y-0">
                            {experience?.map((exp) => (
                                <InteractiveItem key={exp.id} id={exp.id}>
                                    <div className="relative">
                                        <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-gray-300 rounded-full border-2 border-white box-content"></div>
                                        <div className="flex flex-col mb-2">
                                            <span className="text-xs font-bold uppercase text-gray-400 tracking-wide mb-1">
                                                {exp.startDate} - {exp.endDate || 'Present'}
                                            </span>
                                            <h3 className="font-bold text-gray-900" style={{ fontSize: `${headingSizes.h3}px` }}>
                                                {exp.company}
                                            </h3>
                                            <div className="text-gray-600 font-medium">{exp.title}</div>
                                        </div>
                                        <ul className="list-disc ml-5 space-y-1 text-gray-700">
                                            {exp.duties.map((duty, idx) => (
                                                <li key={idx} className="pl-1">{duty}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </InteractiveItem>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education Timeline Node */}
                {(education?.length ?? 0) > 0 && (
                    <div className="relative">
                        <div className="absolute -left-[41px] top-0 bg-white p-1">
                            <CircleDot size={18} color={primaryColor} />
                        </div>
                        <InteractiveItem id="heading-education">
                            <h2
                                className="font-bold uppercase tracking-wider mb-6"
                                style={{
                                    fontSize: `${headingSizes.h2}px`,
                                    color: primaryColor,
                                }}
                            >
                                Education
                            </h2>
                        </InteractiveItem>
                        <div className="space-y-0">
                            {education?.map((edu) => (
                                <InteractiveItem key={edu.id} id={edu.id}>
                                    <div className="relative">
                                        <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-gray-300 rounded-full border-2 border-white box-content"></div>
                                        <div className="font-bold text-gray-900" style={{ fontSize: `${headingSizes.h3}px` }}>{edu.school}</div>
                                        <div className="text-gray-600">{edu.degree}</div>
                                        <div className="text-sm text-gray-400 mt-1">{edu.year}</div>
                                    </div>
                                </InteractiveItem>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills Timeline Node */}
                {(skills?.length ?? 0) > 0 && (
                    <div className="relative">
                        <div className="absolute -left-[41px] top-0 bg-white p-1">
                            <CircleDot size={18} color={primaryColor} />
                        </div>
                        <InteractiveItem id="heading-skills">
                            <h2
                                className="font-bold uppercase tracking-wider mb-4"
                                style={{
                                    fontSize: `${headingSizes.h2}px`,
                                    color: primaryColor,
                                }}
                            >
                                Skills
                            </h2>
                        </InteractiveItem>
                        <div className="flex flex-wrap gap-2">
                            {skills?.map((skill, idx) => (
                                <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
