'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Loader2, Wand2, History, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ResumeData } from '@/lib/types';
import { processResumeEdit } from '@/lib/ai-actions';

interface AIAssistantProps {
    data: ResumeData;
    onUpdate: (newData: ResumeData) => void;
}

export default function AIAssistant({ data, onUpdate }: AIAssistantProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const updatedData = await processResumeEdit(prompt, data);
            onUpdate(updatedData);
            setSuccess(true);
            setPrompt('');
            // Optional: Close after a delay or keep open for more edits
            setTimeout(() => setSuccess(false), 3000);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    return (
        <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-4">
            {/* AI Response Feedback */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">{error}</span>
                </div>
            )}
            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Changes applied by AI!</span>
                </div>
            )}

            {/* Main Assistant Interface */}
            {isOpen ? (
                <div className="w-80 md:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                    {/* Header */}
                    <div className="bg-slate-900 px-4 py-3 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-blue-400 fill-blue-400" />
                            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-100">AI Resume Architect</h3>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4 text-slate-400 hover:text-white" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4">
                        <div className="space-y-2">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Try asking for:</p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    "Make the font larger",
                                    "Change theme to Blue",
                                    "Add space above Experience",
                                    "Change template to Professional"
                                ].map((suggestion) => (
                                    <button
                                        key={suggestion}
                                        onClick={() => setPrompt(suggestion)}
                                        className="text-[10px] font-semibold bg-slate-50 hover:bg-slate-100 text-slate-600 px-2.5 py-1.5 rounded-full border border-slate-200 transition-colors"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="relative group">
                            <input
                                ref={inputRef}
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Tell AI what to change..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-12 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 font-medium"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!prompt.trim() || isLoading}
                                className="absolute right-2 top-2 bottom-2 px-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white rounded-lg transition-all flex items-center justify-center shadow-sm disabled:shadow-none"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Send className="w-4 h-4" />
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Footer / Status */}
                    <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 group cursor-help" title="AI uses Gemini 2.0 Flash">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Engine Online</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <History className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-slate-600" />
                            <Wand2 className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Sparkles className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                </button>
            )}
        </div>
    );
}
