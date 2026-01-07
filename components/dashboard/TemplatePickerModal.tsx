'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, LayoutGrid, Info } from 'lucide-react';
import { ResumeData } from '@/lib/types';

// Import all templates
import ModernTemplate from '../resume/Templates/Modern';
import ClassicTemplate from '../resume/Templates/Classic';
import MinimalTemplate from '../resume/Templates/Minimal';
import ProfessionalTemplate from '../resume/Templates/Professional';
import CreativeTemplate from '../resume/Templates/Creative';
import ElegantTemplate from '../resume/Templates/Elegant';
import TechTemplate from '../resume/Templates/Tech';
import TimelineTemplate from '../resume/Templates/Timeline';
import CompactTemplate from '../resume/Templates/Compact';
import BoldTemplate from '../resume/Templates/Bold';

import { ResumeLayoutProvider, defaultDesignSettings } from '../resume/ResumeLayoutContext';

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

interface TemplatePickerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (templateId: string) => void;
}

export default function TemplatePickerModal({ isOpen, onClose, onSelect }: TemplatePickerModalProps) {
    const [selectedTemplate, setSelectedTemplate] = useState<string>('Modern');

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleSelect = () => {
        onSelect(selectedTemplate);
        onClose();
    };

    if (!isOpen || typeof window === 'undefined') return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white border border-slate-200 shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 rounded-xl">
                {/* Internal Style Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                            <LayoutGrid className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 leading-none">Choose a Template</h2>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Select a template to start building your resume</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
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
                                onClick={() => setSelectedTemplate(t.id)}
                            >
                                <div
                                    className={`relative aspect-[210/297] bg-white rounded-lg border overflow-hidden transition-all duration-200 shadow-sm
                                        ${selectedTemplate === t.id
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
                                    {selectedTemplate === t.id && (
                                        <div className="absolute inset-0 bg-blue-600/5 flex items-center justify-center">
                                            <div className="bg-blue-600 text-white rounded-full p-1.5 shadow-lg border-4 border-white">
                                                <Check size={16} strokeWidth={4} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className={`font-bold text-sm tracking-tight ${selectedTemplate === t.id ? 'text-blue-600' : 'text-slate-900 font-extrabold'}`}>
                                            {t.id.toUpperCase()}
                                        </h3>
                                        <div className="flex gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" title="Stable" />
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
                        <span className="text-xs font-semibold">Active Selection: <span className="text-slate-900">{selectedTemplate}</span></span>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-lg transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSelect}
                            className="px-6 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-all active:scale-95"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
