'use client';

import { EducationSchema } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface EducationFormProps {
    items: any[];
    onChange: (items: any[]) => void;
}

export default function EducationForm({ items, onChange }: EducationFormProps) {
    const addEducation = () => {
        onChange([
            ...items,
            { id: uuidv4(), school: '', degree: '', year: '' },
        ]);
    };

    const removeEducation = (id: string) => {
        onChange(items.filter((item) => item.id !== id));
    };

    const updateEducation = (id: string, field: string, value: string) => {
        onChange(
            items.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    return (
        <div className="space-y-6">
            {items.map((item) => (
                <div key={item.id} className="border border-border p-5 rounded-lg relative bg-card/50 hover:bg-card transition-colors">
                    <button
                        onClick={() => removeEducation(item.id)}
                        className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-muted-foreground mb-1">School</label>
                            <input
                                type="text"
                                value={item.school}
                                onChange={(e) => updateEducation(item.id, 'school', e.target.value)}
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                                placeholder="University of Examples"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1">Degree</label>
                                <input
                                    type="text"
                                    value={item.degree}
                                    onChange={(e) => updateEducation(item.id, 'degree', e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                                    placeholder="Bachelor of Science"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1">Year</label>
                                <input
                                    type="text"
                                    value={item.year}
                                    onChange={(e) => updateEducation(item.id, 'year', e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                                    placeholder="2020-2024"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={addEducation}
                className="flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
                <Plus className="w-4 h-4 mr-1" /> Add Education
            </button>
        </div>
    );
}
