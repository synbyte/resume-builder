'use client';

import { ResumeData } from '@/lib/types';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LayoutTemplate, Check, X } from 'lucide-react';

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

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Prevent scrolling when open
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
                className="flex items-center px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/50 rounded-md transition-all gap-2"
            >
                <LayoutTemplate size={16} />
                <span className="hidden sm:inline">Change Template</span>
                <span className="sm:hidden">Template</span>
            </button>

            {isOpen && typeof window !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-blue-900/60 to-indigo-900/60 backdrop-blur-md animate-in fade-in duration-200"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 ">
                        {/* Header with gradient */}
                        <div className="relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
                            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />

                            <div className="relative flex items-center justify-between px-6 py-5 mb-28 text-white">
                                <div>
                                    <h2 className="text-2xl font-bold">Choose a Template</h2>
                                    <p className="text-blue-100 text-sm mt-1">Select the perfect design for your resume</p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2   hover:bg-white/10 rounded-xl transition-all text-white/90 hover:text-white backdrop-blur-sm"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Wave separator */}
                            <div className="absolute bottom-0 left-0 right-0">
                                <svg className="w-full h-6 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ transform: 'scaleY(-1)' }}>
                                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-10">
                                {TEMPLATES.map((t) => (
                                    <div
                                        key={t.id}
                                        className={`group relative flex flex-col gap-3 cursor-pointer transition-all duration-200 hover:-translate-y-1 ${currentTemplate === t.id ? 'translate-y-0' : ''}`}
                                        onClick={() => handleSelect(t.id)}
                                    >
                                        <div
                                            className={`relative aspect-[210/297] bg-white rounded-xl shadow-md border overflow-hidden transition-all duration-200
                                                ${currentTemplate === t.id
                                                    ? 'ring-4 ring-blue-500 ring-offset-2 shadow-2xl shadow-blue-500/30 border-blue-500'
                                                    : 'border-slate-200 hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-300'
                                                }`}
                                        >
                                            {/* Container sized to the scaled dimensions */}
                                            <div className="absolute inset-0 overflow-hidden">
                                                {/* Scaled Preview - transform origin at top-left */}
                                                <div
                                                    className="origin-top-left pointer-events-none select-none bg-white"
                                                    style={{
                                                        width: '210mm',
                                                        height: '297mm',
                                                        transform: 'scale(0.305)',
                                                        padding: '32px'
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

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/5 group-hover:to-indigo-600/5 transition-all duration-200" />

                                            {/* Checkmark for active */}
                                            {currentTemplate === t.id && (
                                                <div className="absolute top-3 right-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full p-2 shadow-lg shadow-blue-500/40 z-10 animate-in zoom-in duration-200">
                                                    <Check size={16} strokeWidth={3} />
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-center px-2">
                                            <h3 className={`font-bold text-base transition-colors ${currentTemplate === t.id ? 'text-blue-600' : 'text-slate-700 group-hover:text-blue-600'}`}>
                                                {t.id}
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-0.5">{t.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
