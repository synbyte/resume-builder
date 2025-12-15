import { ResumeData } from '@/lib/types';
import { useResumeLayout } from '../ResumeLayoutContext';
import InteractiveItem from '../InteractiveItem';
import { Mail, Phone, Linkedin, Globe } from 'lucide-react';

export default function BoldTemplate({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills } = data;
    const { offsets, designSettings } = useResumeLayout();

    const { baseFontSize, primaryColor, headingSizes, lineHeight } = designSettings;

    return (
        <div
            className="font-sans text-black"
            style={{
                fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif', // Fallback to robust sans
                fontSize: `${baseFontSize}px`,
                lineHeight: 1.4
            }}
        >
            <div className="bg-black text-white p-8 mb-8 -mx-8 -mt-8">
                <h1
                    className="font-black uppercase tracking-tighter leading-none mb-4"
                    style={{ fontSize: `${headingSizes.h1 * 1.5}px` }} // Extra large
                >
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
                    {personalInfo?.email && <div className="flex items-center gap-2"><Mail size={16} /> <span className="underline decoration-2 underline-offset-4">{personalInfo.email}</span></div>}
                    {personalInfo?.phone && <div className="flex items-center gap-2"><Phone size={16} /> {personalInfo.phone}</div>}
                    {personalInfo?.linkedin && <div className="flex items-center gap-2"><Linkedin size={16} /> {personalInfo.linkedin}</div>}
                    {personalInfo?.website && <div className="flex items-center gap-2"><Globe size={16} /> {personalInfo.website}</div>}
                </div>
            </div>

            <div style={{ fontFamily: designSettings.fontFamily }}> {/* Reset font for body text readability */}
                {summary && (
                    <div className="mb-10">
                        <InteractiveItem id="heading-summary">
                            <div className="bg-black text-white inline-block px-4 py-1 mb-4 transform -skew-x-12">
                                <h2
                                    className="font-black uppercase tracking-widest transform skew-x-12"
                                    style={{
                                        fontSize: `${headingSizes.h2}px`,
                                    }}
                                >
                                    About Me
                                </h2>
                            </div>
                        </InteractiveItem>
                        <p className="text-xl leading-relaxed font-bold text-gray-800">{summary}</p>
                    </div>
                )}

                {(experience?.length ?? 0) > 0 && (
                    <div className="mb-10">
                        <InteractiveItem id="heading-experience">
                            <div className="bg-black text-white inline-block px-4 py-1 mb-6 transform -skew-x-12">
                                <h2
                                    className="font-black uppercase tracking-widest transform skew-x-12"
                                    style={{
                                        fontSize: `${headingSizes.h2}px`,
                                    }}
                                >
                                    Work History
                                </h2>
                            </div>
                        </InteractiveItem>

                        <div className="space-y-8 border-l-4 border-black pl-6 ml-2">
                            {experience?.map((exp) => (
                                <InteractiveItem key={exp.id} id={exp.id}>
                                    <h3
                                        className="font-black uppercase text-3xl mb-1"
                                        style={{ fontSize: `${headingSizes.h3 * 1.2}px` }}
                                    >
                                        {exp.company}
                                    </h3>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="bg-gray-200 px-2 py-1 font-bold text-sm uppercase">{exp.title}</span>
                                        <span className="font-mono font-bold text-gray-500 text-sm">{exp.startDate} - {exp.endDate || 'Present'}</span>
                                    </div>
                                    <ul className="list-disc ml-5 space-y-2 font-medium text-gray-800">
                                        {exp.duties.map((duty, idx) => (
                                            <li key={idx} className="pl-1">{duty}</li>
                                        ))}
                                    </ul>
                                </InteractiveItem>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-12">
                    {(education?.length ?? 0) > 0 && (
                        <div>
                            <InteractiveItem id="heading-education">
                                <h2
                                    className="font-black uppercase tracking-widest mb-4 border-b-4 border-black pb-2"
                                    style={{
                                        fontSize: `${headingSizes.h2}px`,
                                    }}
                                >
                                    Education
                                </h2>
                            </InteractiveItem>
                            <div className="space-y-6">
                                {education?.map((edu) => (
                                    <InteractiveItem key={edu.id} id={edu.id}>
                                        <div className="font-black text-xl">{edu.school}</div>
                                        <div className="font-bold text-gray-600">{edu.degree}</div>
                                        <div className="font-mono text-sm text-gray-400 mt-1">{edu.year}</div>
                                    </InteractiveItem>
                                ))}
                            </div>
                        </div>
                    )}

                    {(skills?.length ?? 0) > 0 && (
                        <div>
                            <InteractiveItem id="heading-skills">
                                <h2
                                    className="font-black uppercase tracking-widest mb-4 border-b-4 border-black pb-2"
                                    style={{
                                        fontSize: `${headingSizes.h2}px`,
                                    }}
                                >
                                    Expertise
                                </h2>
                            </InteractiveItem>
                            <div className="flex flex-wrap gap-3">
                                {skills?.map((skill, idx) => (
                                    <span key={idx} className="font-bold border-2 border-black px-3 py-1 hover:bg-black hover:text-white transition-colors cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
