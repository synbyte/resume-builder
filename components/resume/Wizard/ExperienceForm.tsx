'use client';

import { useState, useTransition, useEffect } from 'react';
import { generateJobDuties } from '@/lib/ai-actions';
import { Trash2, Plus, Sparkles, X, Edit } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface ExperienceFormProps {
    items: any[]; // Typed generically for now to avoid complexity in this file, ideally explicit Experience type
    onChange: (items: any[]) => void;
}

export default function ExperienceForm({ items, onChange }: ExperienceFormProps) {

    const addExperience = () => {
        onChange([
            ...items,
            { id: uuidv4(), company: '', jobTitle: '', startDate: '', endDate: '', duties: [] }, // duties is string[]
        ]);
    };

    const removeExperience = (id: string) => {
        onChange(items.filter((item) => item.id !== id));
    };

    const updateExperience = (id: string, field: string, value: any) => {
        onChange(
            items.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    return (
        <div className="space-y-6">
            {items.map((item) => (
                <ExperienceItem
                    key={item.id}
                    item={item}
                    onUpdate={(field, val) => updateExperience(item.id, field, val)}
                    onRemove={() => removeExperience(item.id)}
                />
            ))}
            <button
                type="button"
                onClick={addExperience}
                className="flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
                <Plus className="w-4 h-4 mr-1" /> Add Experience
            </button>
        </div>
    );
}

function ExperienceItem({ item, onUpdate, onRemove }: { item: any, onUpdate: (f: string, v: any) => void, onRemove: () => void }) {
    const [isPending, startTransition] = useTransition();
    const [dutyInput, setDutyInput] = useState('');

    const handleAutoGenerate = () => {
        if (!item.jobTitle) return; // Silent return or hint?

        startTransition(async () => {
            const duties = await generateJobDuties(item.jobTitle, item.company || 'Generic Company');
            // Append new duties
            onUpdate('duties', [...(item.duties || []), ...duties]);
        });
    };

    // Auto-trigger when jobTitle is blurred if it's not empty? 
    // User requested: "when a person types in their job title, gemini should automatically populate"
    // Ideally onBlur or a debounce. onBlur is safer to avoid spamming API while typing.
    const handleTitleBlur = () => {
        if (item.jobTitle && (!item.duties || item.duties.length === 0)) {
            handleAutoGenerate();
        }
    };

    const addDuty = () => {
        if (dutyInput.trim()) {
            onUpdate('duties', [...(item.duties || []), dutyInput.trim()]);
            setDutyInput('');
        }
    };

    const removeDuty = (idx: number) => {
        onUpdate('duties', (item.duties || []).filter((_: any, i: number) => i !== idx));
    };

    const handleDutyKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addDuty();
        }
    };

    return (
        <div className="border border-border p-5 rounded-lg relative bg-card/50 hover:bg-card transition-colors">
            <button
                onClick={onRemove}
                className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
            >
                <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Job Title</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={item.jobTitle}
                            onChange={(e) => onUpdate('jobTitle', e.target.value)}
                            onBlur={handleTitleBlur}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                            placeholder="Software Engineer"
                        />
                        {/* Manual trigger if auto failed or wanted more */}
                        <button
                            onClick={handleAutoGenerate}
                            disabled={isPending || !item.jobTitle}
                            className="flex items-center justify-center px-3 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors disabled:opacity-50"
                            title="Generate Duties"
                        >
                            <Sparkles className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Company</label>
                    <input
                        type="text"
                        value={item.company}
                        onChange={(e) => onUpdate('company', e.target.value)}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        placeholder="Acme Corp"
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Start Date</label>
                        <input
                            type="text"
                            value={item.startDate}
                            onChange={(e) => onUpdate('startDate', e.target.value)}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                            placeholder="Jan 2020"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">End Date</label>
                        <input
                            type="text"
                            value={item.endDate}
                            onChange={(e) => onUpdate('endDate', e.target.value)}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                            placeholder="Present"
                        />
                    </div>
                </div>
            </div>

            {/* Duties (Pills) */}
            <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Responsibilities (Bullet Points)</label>

                {/* Input */}
                <div className="flex gap-2 mb-3">
                    <input
                        type="text"
                        value={dutyInput}
                        onChange={(e) => setDutyInput(e.target.value)}
                        onKeyDown={handleDutyKeyDown}
                        placeholder="Type responsibility and press Enter"
                        className="flex h-9 flex-1 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                    <button
                        onClick={addDuty}
                        className="px-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    {(item.duties || []).map((duty: string, idx: number) => (
                        <DutyItem
                            key={idx}
                            duty={duty}
                            onUpdate={(newVal) => {
                                const newDuties = [...(item.duties || [])];
                                newDuties[idx] = newVal;
                                onUpdate('duties', newDuties);
                            }}
                            onRemove={() => removeDuty(idx)}
                        />
                    ))}
                    {(item.duties || []).length === 0 && (
                        <p className="text-xs text-muted-foreground italic">No duties added. Type above or enter Job Title to auto-generate.</p>
                    )}
                    {isPending && <p className="text-xs text-primary animate-pulse flex items-center gap-1"><Sparkles className="w-3 h-3" /> Generating suggestions...</p>}
                </div>
            </div>
        </div>
    );
}

function DutyItem({ duty, onUpdate, onRemove }: { duty: string, onUpdate: (newVal: string) => void, onRemove: () => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDuty, setEditedDuty] = useState(duty);

    // Sync internal state if duty prop changes from parent
    useEffect(() => {
        setEditedDuty(duty);
    }, [duty]);

    const handleSave = () => {
        if (editedDuty.trim()) {
            onUpdate(editedDuty.trim());
            setIsEditing(false);
        } else {
            // If edited duty is empty, remove it
            onRemove();
        }
    };

    const handleCancel = () => {
        setEditedDuty(duty); // Revert to original
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSave();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            handleCancel();
        }
    };

    return (
        <div className="flex items-center bg-background p-2.5 border border-border rounded-md shadow-sm group hover:border-primary/50 transition-colors">
            {isEditing ? (
                <input
                    type="text"
                    value={editedDuty}
                    onChange={(e) => setEditedDuty(e.target.value)}
                    onBlur={handleSave} // Save on blur
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-sm text-foreground p-0"
                    autoFocus
                />
            ) : (
                <span className="flex-1 text-sm text-foreground cursor-pointer" onClick={() => setIsEditing(true)}>
                    {duty}
                </span>
            )}
            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleSave}
                            className="ml-2 text-green-600 hover:text-green-700"
                            title="Save"
                        >
                            ✓
                        </button>
                        <button
                            onClick={handleCancel}
                            className="ml-2 text-muted-foreground hover:text-foreground"
                            title="Cancel"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="ml-2 text-muted-foreground hover:text-primary transition-colors"
                            title="Edit"
                        >
                            <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={onRemove}
                            className="ml-2 text-muted-foreground hover:text-destructive transition-colors"
                            title="Remove"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
