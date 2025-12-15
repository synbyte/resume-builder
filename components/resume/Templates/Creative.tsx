import { ResumeData } from '@/lib/types';
import { useResumeLayout } from '../ResumeLayoutContext';
import InteractiveItem from '../InteractiveItem';
import { Mail, Phone, Linkedin, Globe } from 'lucide-react';

export default function CreativeTemplate({ data }: { data: ResumeData }) {
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
            <div className="bg-slate-900 text-white p-8 -mx-8 -mt-8 mb-8">
                <h1
                    className="font-bold mb-2 tracking-tight"
                    style={{ fontSize: `${headingSizes.h1}px` }}
                >
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                    {personalInfo?.email && (
                        <div className="flex items-center gap-1.5">
                            <Mail size={14} className="text-slate-400" />
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo?.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone size={14} className="text-slate-400" />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo?.linkedin && (
                        <div className="flex items-center gap-1.5">
                            <Linkedin size={14} className="text-slate-400" />
                            <span>{personalInfo.linkedin}</span>
                        </div>
                    )}
                    {personalInfo?.website && (
                        <div className="flex items-center gap-1.5">
                            <Globe size={14} className="text-slate-400" />
                            <span>{personalInfo.website}</span>
                        </div>
                    )}
                </div>
            </div>

            {summary && (
                <div className="mb-8">
                    <p
                        className="leading-relaxed font-light text-slate-700"
                        style={{ fontSize: `${baseFontSize + 2}px` }} // Creative uses slightly larger summary
                    >{summary}</p>
                </div>
            )}

            {(experience?.length ?? 0) > 0 && (
                <div className="mb-8">
                    <InteractiveItem id="heading-experience">
                        <h2
                            className="font-bold text-slate-900 mb-4 flex items-center"
                            style={{ fontSize: `${headingSizes.h2}px` }}
                        >
                            <span
                                className="w-1 h-6 mr-2 rounded-full"
                                style={{ backgroundColor: primaryColor }} // Dynamic accent
                            ></span>
                            Experience
                        </h2>
                    </InteractiveItem>
                    <div className="border-l-2 border-slate-100 ml-1.5 pl-6 space-y-6 relative">
                        {experience?.map((exp) => (
                            <InteractiveItem
                                key={exp.id}
                                id={exp.id}
                            >
                                <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-slate-300 border-2 border-white"></div>

                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                    <h3
                                        className="font-bold"
                                        style={{ fontSize: `${headingSizes.h3}px` }}
                                    >
                                        {exp.company}
                                    </h3>
                                    <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 rounded text-slate-600">
                                        {exp.startDate} - {exp.endDate || 'Present'}
                                    </span>
                                </div>
                                <div
                                    className="font-medium mb-2"
                                    style={{ color: primaryColor, fontSize: `${baseFontSize}px` }}
                                >{exp.title}</div>
                                <ul className="list-disc ml-4 space-y-1 text-gray-600" style={{ fontSize: `${baseFontSize}px` }}>
                                    {exp.duties.map((duty, idx) => (
                                        <li key={idx} className="pl-1">{duty}</li>
                                    ))}
                                </ul>
                            </InteractiveItem>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-8">
                {(education?.length ?? 0) > 0 && (
                    <div>
                        <InteractiveItem id="heading-education">
                            <h2
                                className="font-bold text-slate-900 mb-4 flex items-center"
                                style={{ fontSize: `${headingSizes.h2}px` }}
                            >
                                <span
                                    className="w-1 h-6 mr-2 rounded-full"
                                    style={{ backgroundColor: primaryColor }}
                                ></span>
                                Education
                            </h2>
                        </InteractiveItem>
                        <div className="space-y-4">
                            {education?.map((edu) => (
                                <InteractiveItem
                                    key={edu.id}
                                    id={edu.id}
                                    className="bg-slate-50 p-4 rounded-lg"
                                >
                                    <div className="font-bold" style={{ fontSize: `${baseFontSize}px` }}>{edu.school}</div>
                                    <div
                                        className=""
                                        style={{ color: primaryColor, fontSize: `${baseFontSize - 1}px` }}
                                    >{edu.degree}</div>
                                    <div className="text-xs text-gray-500 mt-1">{edu.year}</div>
                                </InteractiveItem>
                            ))}
                        </div>
                    </div>
                )}

                {(skills?.length ?? 0) > 0 && (
                    <div>
                        <InteractiveItem id="heading-skills">
                            <h2
                                className="font-bold text-slate-900 mb-4 flex items-center"
                                style={{ fontSize: `${headingSizes.h2}px` }}
                            >
                                <span
                                    className="w-1 h-6 mr-2 rounded-full"
                                    style={{ backgroundColor: primaryColor }}
                                ></span>
                                Skills
                            </h2>
                        </InteractiveItem>
                        <div className="flex flex-wrap gap-2">
                            {skills?.map((skill, idx) => (
                                <span key={idx} className="px-3 py-1 bg-white border border-slate-200 shadow-sm rounded-full text-xs font-medium text-slate-700">{skill}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

