import { ResumeData } from '@/lib/types';
import { useResumeLayout } from '../ResumeLayoutContext';
import InteractiveItem from '../InteractiveItem';
import { Mail, Phone, Linkedin, Globe, Terminal } from 'lucide-react';

export default function TechTemplate({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills } = data;
    const { offsets, designSettings } = useResumeLayout();

    const { fontFamily, baseFontSize, primaryColor, headingSizes, lineHeight } = designSettings;

    return (
        <div
            className="font-sans text-stone-300 bg-stone-900 p-8 -m-8 min-h-full"
            style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                fontSize: `${baseFontSize}px`,
                lineHeight
            }}
        >
            <div className="border-b border-stone-700 pb-6 mb-8 flex justify-between items-end">
                <div>
                    <h1
                        className="font-bold tracking-tighter text-emerald-400 mb-2"
                        style={{ fontSize: `${headingSizes.h1}px`, color: primaryColor }}
                    >
                        <span className="text-stone-500 mr-2">&gt;</span>
                        {personalInfo?.fullName || 'Your Name'}
                        <span className="animate-pulse inline-block w-3 h-6 bg-emerald-500 ml-2 align-middle"></span>
                    </h1>
                    <div className="text-stone-400 text-sm font-mono mt-2">
                        {personalInfo?.email && <div className="inline-block mr-4 text-emerald-200/80">const email = "{personalInfo.email}";</div>}
                        <br className="hidden sm:block" />
                        {personalInfo?.phone && <div className="inline-block mr-4">let phone = "{personalInfo.phone}";</div>}
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2 text-stone-400">
                    {personalInfo?.linkedin && <a className="hover:text-emerald-400 flex items-center gap-2 text-xs"><Linkedin size={14} /> {personalInfo.linkedin}</a>}
                    {personalInfo?.website && <a className="hover:text-emerald-400 flex items-center gap-2 text-xs"><Globe size={14} /> {personalInfo.website}</a>}
                </div>
            </div>

            {summary && (
                <div className="mb-10">
                    <InteractiveItem id="heading-summary">
                        <h2
                            className="text-stone-500 mb-2 font-mono text-sm uppercase tracking-widest"
                            style={{
                                fontSize: `${headingSizes.h2 - 4}px`,
                            }}
                        >
                            // SUMMARY
                        </h2>
                    </InteractiveItem>
                    <p className="leading-relaxed text-stone-300 border-l-2 border-stone-700 pl-4 py-1">
                        <span className="text-stone-500 mr-2">/**</span>
                        {summary}
                        <span className="text-stone-500 ml-2">*/</span>
                    </p>
                </div>
            )}

            {(experience?.length ?? 0) > 0 && (
                <div className="mb-10">
                    <InteractiveItem id="heading-experience">
                        <h2
                            className="text-stone-500 mb-6 font-mono text-sm uppercase tracking-widest"
                            style={{
                                fontSize: `${headingSizes.h2 - 4}px`,
                            }}
                        >
                            // EXPERIENCE_LOG
                        </h2>
                    </InteractiveItem>

                    <div className="space-y-8">
                        {experience?.map((exp) => (
                            <InteractiveItem key={exp.id} id={exp.id}>
                                <div className="mb-2 flex items-baseline justify-between">
                                    <h3
                                        className="font-bold text-stone-100"
                                        style={{ fontSize: `${headingSizes.h3}px` }}
                                    >
                                        {exp.company}
                                    </h3>
                                    <span className="text-xs font-mono text-stone-500 bg-stone-800 px-2 py-1 rounded">
                                        [{exp.startDate} : {exp.endDate || 'NOW'}]
                                    </span>
                                </div>
                                <div className="text-emerald-400 font-mono text-sm mb-3" style={{ color: primaryColor }}>
                                    function {(exp.title || 'role').replace(/\s+/g, '_')}() {'{'}
                                </div>
                                <ul className="list-none ml-4 space-y-1 text-stone-400 border-l border-stone-800 pl-4">
                                    {exp.duties.map((duty, idx) => (
                                        <li key={idx} className="pl-1">
                                            <span className="text-stone-600 mr-2">return</span>
                                            &quot;{duty}&quot;;
                                        </li>
                                    ))}
                                </ul>
                                <div className="text-emerald-400 font-mono text-sm mt-1" style={{ color: primaryColor }}>{'}'}</div>
                            </InteractiveItem>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(education?.length ?? 0) > 0 && (
                    <div>
                        <InteractiveItem id="heading-education">
                            <h2
                                className="text-stone-500 mb-6 font-mono text-sm uppercase tracking-widest"
                                style={{
                                    fontSize: `${headingSizes.h2 - 4}px`,
                                }}
                            >
                                // EDUCATION
                            </h2>
                        </InteractiveItem>
                        <div className="space-y-6">
                            {education?.map((edu) => (
                                <InteractiveItem key={edu.id} id={edu.id}>
                                    <div className="bg-stone-800/50 p-4 border border-stone-800 rounded">
                                        <div className="font-bold text-stone-200" style={{ fontSize: `${headingSizes.h3}px` }}>{edu.school}</div>
                                        <div className="text-stone-400">{edu.degree}</div>
                                        <div className="text-stone-600 text-xs mt-2">&lt;Year val={'{'}{edu.year}{'}'} /&gt;</div>
                                    </div>
                                </InteractiveItem>
                            ))}
                        </div>
                    </div>
                )}

                {(skills?.length ?? 0) > 0 && (
                    <div>
                        <InteractiveItem id="heading-skills">
                            <h2
                                className="text-stone-500 mb-6 font-mono text-sm uppercase tracking-widest"
                                style={{
                                    fontSize: `${headingSizes.h2 - 4}px`,
                                }}
                            >
                                // SKILLS_ARRAY
                            </h2>
                        </InteractiveItem>
                        <div className="font-mono text-sm text-stone-400 bg-stone-800/30 p-4 rounded border border-stone-800">
                            <span className="text-purple-400">const</span> <span className="text-yellow-200">stack</span> = [<br />
                            {skills?.map((skill, idx) => (
                                <span key={idx} className="ml-4 text-emerald-300">
                                    &apos;{skill}&apos;{idx < (skills?.length || 0) - 1 ? ',' : ''}<br />
                                </span>
                            ))}
                            ];
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
