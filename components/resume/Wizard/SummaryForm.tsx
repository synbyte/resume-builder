'use client';

import { useState, useTransition } from 'react';
import { generateSummary, improveSummary } from '@/lib/ai-actions';
import { Sparkles, Wand2 } from 'lucide-react';

interface SummaryFormProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SummaryForm({ value, onChange }: SummaryFormProps) {
    const [jobTitle, setJobTitle] = useState('');
    const [isPending, startTransition] = useTransition();

    const handleGenerate = () => {
        if (!jobTitle) return alert("Please enter a job title context.");

        startTransition(async () => {
            const summary = await generateSummary(jobTitle, "various experience");
            onChange(summary);
        });
    };

    const handleImprove = () => {
        if (!value.trim()) return;

        startTransition(async () => {
            const improved = await improveSummary(value);
            onChange(improved);
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Context Job Title (e.g. Senior Developer)"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="flex h-9 flex-1 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button
                    onClick={handleGenerate}
                    disabled={isPending || !jobTitle}
                    className="flex items-center px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 disabled:opacity-50 text-xs font-semibold shadow-sm transition-all"
                >
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    {isPending ? 'Writing...' : 'AI Write'}
                </button>
            </div>

            <div className="relative">
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={4}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Professional summary..."
                />
                <button
                    onClick={handleImprove}
                    disabled={isPending || !value.trim()}
                    className="absolute right-2 bottom-2 flex items-center px-2 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded text-[10px] font-medium transition-colors disabled:opacity-0 disabled:pointer-events-none"
                    title="Improve existing text with AI"
                >
                    <Wand2 className="w-3 h-3 mr-1" />
                    Improve
                </button>
            </div>
            {isPending && <p className="text-xs text-muted-foreground animate-pulse">AI is working...</p>}
        </div>
    );
}
