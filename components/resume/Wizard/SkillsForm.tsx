'use client';

import { useState, useTransition } from 'react';
import { generateSkills } from '@/lib/ai-actions';
import { X, Sparkles, Plus } from 'lucide-react';

interface SkillsFormProps {
    items: string[];
    onChange: (items: string[]) => void;
}

export default function SkillsForm({ items, onChange }: SkillsFormProps) {
    const [input, setInput] = useState('');
    const [jobTitle, setJobTitle] = useState(''); // For context
    const [isPending, startTransition] = useTransition();

    const addSkill = () => {
        if (input.trim()) {
            onChange([...items, input.trim()]);
            setInput('');
        }
    };

    const removeSkill = (index: number) => {
        onChange(items.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    };

    const handleGenerate = () => {
        // We ideally need the job title from the main state, but for now let's ask or assume.
        // Or we can add an input for "Target Role" in this form if not present.
        // Let's rely on a local input for now.
        if (!jobTitle) return alert("Please enter a target job title to generate skills for.");

        startTransition(async () => {
            const suggestions = await generateSkills(jobTitle);
            // Merge unique suggestion
            const newSkills = [...new Set([...items, ...suggestions])];
            onChange(newSkills);
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2 mb-3">
                <input
                    type="text"
                    placeholder="Target Job Title (for AI generation)"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="flex h-9 flex-1 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                />
                <button
                    onClick={handleGenerate}
                    disabled={isPending || !jobTitle}
                    className="flex items-center px-3 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 disabled:opacity-50 text-xs font-semibold shadow-sm transition-all"
                >
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    {isPending ? 'Generating...' : 'AI Generate'}
                </button>
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a skill and press Enter"
                    className="flex h-9 flex-1 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                />
                <button
                    onClick={addSkill}
                    className="px-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Pills Container */}
            <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border border-border rounded-lg bg-card/50">
                {items.length === 0 && <span className="text-xs text-muted-foreground p-1 italic">No skills added yet.</span>}
                {items.map((skill, idx) => (
                    <SkillPill
                        key={idx}
                        skill={skill}
                        onUpdate={(newVal) => {
                            const newSkills = [...items];
                            newSkills[idx] = newVal;
                            onChange(newSkills);
                        }}
                        onRemove={() => removeSkill(idx)}
                    />
                ))}
            </div>
        </div>
    );
}

function SkillPill({ skill, onUpdate, onRemove }: { skill: string, onUpdate: (val: string) => void, onRemove: () => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [val, setVal] = useState(skill);

    const handleSave = () => {
        if (val.trim()) {
            onUpdate(val.trim());
        } else {
            onRemove();
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSave();
        }
    };

    if (isEditing) {
        return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground ring-1 ring-primary">
                <input
                    autoFocus
                    type="text"
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    className="w-24 bg-transparent border-none focus:outline-none text-foreground p-0 text-xs"
                />
            </span>
        );
    }

    return (
        <span
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary cursor-pointer hover:bg-primary/20 transition-colors border border-primary/20 hover:border-primary/30"
            title="Click to edit"
        >
            {skill}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }}
                className="ml-1.5 h-3.5 w-3.5 rounded-full inline-flex items-center justify-center text-primary/60 hover:text-destructive hover:bg-destructive/10 focus:outline-none transition-colors"
            >
                <X className="w-3 h-3" />
            </button>
        </span>
    );
}
