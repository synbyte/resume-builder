'use client';

import { ResumeData } from '@/lib/types';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LayoutTemplate, Check, X, Info, Layers } from 'lucide-react';

// Import all templates
import ModernTemplate from './Templates/Modern';
import ClassicTemplate from './Templates/Classic';
import MinimalTemplate from './Templates/Minimal';
import ProfessionalTemplate from './Templates/Professional';
import CreativeTemplate from './Templates/Creative';
import ElegantTemplate from './Templates/Elegant';
import TechTemplate from './Templates/Tech';
import TimelineTemplate from './Templates/Timeline';
import CompactTemplate from './Templates/Compact';
import BoldTemplate from './Templates/Bold';

import { ResumeLayoutProvider, defaultDesignSettings } from './ResumeLayoutContext';

// Dummy data for previews
const PREVIEW_DATA: ResumeData = {
    personalInfo: {
        fullName: 'Alex Morgan',
        email: 'alex@example.com',
        phone: '(555) 123-4567',
        linkedin: 'linkedin.com/in/alexmorgan',
        website: 'alexmorgan.dev',
    },
    summary: 'Senior Software Engineer with 8 years of experience building scalable web applications. Passionate about clean code, performance optimization, and user experience.',
    experience: [
        {
            id: '1',
            company: 'Tech Solutions Inc.',
            title: 'Senior Developer',
            startDate: '2020',
            endDate: 'Present',
            duties: ['Led a team of 5 developers', 'Architected microservices', 'Improved performance by 40%']
        }
    ],
    education: [
        {
            id: '1',
            school: 'State University',
            degree: 'B.S. Computer Science',
            year: '2016'
        }
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Design Systems']
};

const TEMPLATES = [
    { id: 'Modern', component: ModernTemplate, description: 'Clean and contemporary' },
    { id: 'Professional', component: ProfessionalTemplate, description: 'Traditional two-column' },
    { id: 'Minimal', component: MinimalTemplate, description: 'Simple and effective' },
    { id: 'Classic', component: ClassicTemplate, description: 'Timeless serif style' },
    { id: 'Creative', component: CreativeTemplate, description: 'Bold colors and layout' },
    { id: 'Elegant', component: ElegantTemplate, description: 'Sophisticated serif design' },
    { id: 'Tech', component: TechTemplate, description: 'Monospace code aesthetic' },
    { id: 'Timeline', component: TimelineTemplate, description: 'Visual career path' },
    { id: 'Compact', component: CompactTemplate, description: 'Dense info-rich layout' },
    { id: 'Bold', component: BoldTemplate, description: 'High contrast typography' },
];

interface TemplateSelectorProps {
    currentTemplate: string;
    onSelect: (template: string) => void;
}

export default function TemplateSelector({ currentTemplate, onSelect }: TemplateSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (id: string) => {
        onSelect(id);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 bg-white rounded-lg transition-all gap-2 shadow-sm"
            >
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span className="uppercase tracking-widest">Change Template</span>
            </button>

            {isOpen && typeof window !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white border border-slate-200 shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 rounded-xl">
                        {/* Internal Style Header */}
                        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                                    <LayoutTemplate className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 leading-none">Choose a Template</h2>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Select the perfect design for your resume</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-slate-200 rounded-lg transition-all text-slate-400 hover:text-slate-600"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-50/50">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {TEMPLATES.map((t) => (
                                    <div
                                        key={t.id}
                                        className="group flex flex-col gap-3 cursor-pointer"
                                        onClick={() => handleSelect(t.id)}
                                    >
                                        <div
                                            className={`relative aspect-[210/297] bg-white rounded-lg border overflow-hidden transition-all duration-200 shadow-sm
                                                ${currentTemplate === t.id
                                                    ? 'ring-2 ring-blue-600 border-blue-600 scale-[1.02] shadow-xl'
                                                    : 'border-slate-200 hover:border-slate-400 hover:shadow-md'
                                                }`}
                                        >
                                            {/* Preview Container */}
                                            <div className="absolute inset-0 overflow-hidden">
                                                <div
                                                    className="origin-top-left pointer-events-none select-none bg-white scale-[0.31] p-8"
                                                    style={{
                                                        width: '210mm',
                                                        height: '297mm',
                                                    }}
                                                >
                                                    <ResumeLayoutProvider
                                                        offsets={{}}
                                                        updateLayout={() => { }}
                                                        designSettings={defaultDesignSettings}
                                                    >
                                                        <t.component data={PREVIEW_DATA} />
                                                    </ResumeLayoutProvider>
                                                </div>
                                            </div>

                                            {/* Selection State */}
                                            {currentTemplate === t.id && (
                                                <div className="absolute inset-0 bg-blue-600/5 flex items-center justify-center">
                                                    <div className="bg-blue-600 text-white rounded-full p-1.5 shadow-lg border-4 border-white">
                                                        <Check size={16} strokeWidth={4} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className={`font-bold text-sm tracking-tight ${currentTemplate === t.id ? 'text-blue-600' : 'text-slate-900 font-extrabold'}`}>
                                                    {t.id.toUpperCase()}
                                                </h3>
                                                <div className="flex gap-1">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" title="Active" />
                                                </div>
                                            </div>
                                            <p className="text-[11px] font-medium text-slate-500">{t.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Internal Style Footer */}
                        <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-slate-200">
                            <div className="flex items-center gap-2 text-slate-500">
                                <Info size={14} className="text-blue-500" />
                                <span className="text-xs font-semibold uppercase tracking-tight">Active Template: <span className="text-slate-900">{currentTemplate}</span></span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-lg transition-all uppercase tracking-widest"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
