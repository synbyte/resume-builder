'use client';

import { ResumeData } from '@/lib/types';
import PersonalForm from './Wizard/PersonalForm';
import SummaryForm from './Wizard/SummaryForm';
import ExperienceForm from './Wizard/ExperienceForm';
import SkillsForm from './Wizard/SkillsForm';
import EducationForm from './Wizard/EducationForm';
import { User, FileText, Briefcase, GraduationCap, Zap, ChevronRight } from 'lucide-react';

interface WizardProps {
    data: ResumeData;
    onChange: (data: ResumeData) => void;
}

export default function Wizard({ data, onChange }: WizardProps) {
    const updateSection = (section: keyof ResumeData, value: any) => {
        onChange({ ...data, [section]: value });
    };

    return (
        <div className="p-6 space-y-12 pb-32 bg-white">
            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-600" />
                        <h2 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-900">Personal Information</h2>
                    </div>
                    <ChevronRight className="w-3 h-3 text-slate-300" />
                </div>
                <PersonalForm
                    data={data.personalInfo || {}}
                    onChange={(val) => updateSection('personalInfo', val)}
                />
            </section>

            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <h2 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-900">Professional Summary</h2>
                    </div>
                    <ChevronRight className="w-3 h-3 text-slate-300" />
                </div>
                <SummaryForm
                    value={data.summary || ''}
                    onChange={(val) => updateSection('summary', val)}
                />
            </section>

            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-blue-600" />
                        <h2 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-900">Work Experience</h2>
                    </div>
                    <ChevronRight className="w-3 h-3 text-slate-300" />
                </div>
                <ExperienceForm
                    items={data.experience || []}
                    onChange={(val) => updateSection('experience', val)}
                />
            </section>

            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                        <h2 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-900">Education</h2>
                    </div>
                    <ChevronRight className="w-3 h-3 text-slate-300" />
                </div>
                <EducationForm
                    items={data.education || []}
                    onChange={(val) => updateSection('education', val)}
                />
            </section>

            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-blue-600" />
                        <h2 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-900">Skills</h2>
                    </div>
                    <ChevronRight className="w-3 h-3 text-slate-300" />
                </div>
                <SkillsForm
                    items={data.skills || []}
                    onChange={(val) => updateSection('skills', val)}
                />
            </section>

            <div className="pt-8 border-t border-slate-100">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">Resume Data Entry Complete</p>
                </div>
            </div>
        </div>
    );
}
