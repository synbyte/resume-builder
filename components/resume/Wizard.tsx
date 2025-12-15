'use client';

import { ResumeData } from '@/lib/types';
import PersonalForm from './Wizard/PersonalForm';
import SummaryForm from './Wizard/SummaryForm';
import ExperienceForm from './Wizard/ExperienceForm';
import SkillsForm from './Wizard/SkillsForm';
import EducationForm from './Wizard/EducationForm';

interface WizardProps {
    data: ResumeData;
    onChange: (data: ResumeData) => void;
}

export default function Wizard({ data, onChange }: WizardProps) {
    const updateSection = (section: keyof ResumeData, value: any) => {
        onChange({ ...data, [section]: value });
    };

    return (
        <div className="p-6 space-y-8 pb-20">
            <section>
                <h2 className="text-xl font-bold mb-4 text-foreground border-b border-border pb-2">Personal Information</h2>
                <PersonalForm
                    data={data.personalInfo || {}}
                    onChange={(val) => updateSection('personalInfo', val)}
                />
            </section>

            <section>
                <h2 className="text-xl font-bold mb-4 text-foreground border-b border-border pb-2">Professional Summary</h2>
                <SummaryForm
                    value={data.summary || ''}
                    onChange={(val) => updateSection('summary', val)}
                />
            </section>

            <section>
                <h2 className="text-xl font-bold mb-4 text-foreground border-b border-border pb-2">Experience</h2>
                <ExperienceForm
                    items={data.experience || []}
                    onChange={(val) => updateSection('experience', val)}
                />
            </section>

            <section>
                <h2 className="text-xl font-bold mb-4 text-foreground border-b border-border pb-2">Education</h2>
                <EducationForm
                    items={data.education || []}
                    onChange={(val) => updateSection('education', val)}
                />
            </section>

            <section>
                <h2 className="text-xl font-bold mb-4 text-foreground border-b border-border pb-2">Skills</h2>
                <SkillsForm
                    items={data.skills || []}
                    onChange={(val) => updateSection('skills', val)}
                />
            </section>
        </div>
    );
}
