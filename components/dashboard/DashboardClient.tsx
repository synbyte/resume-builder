'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import ResumeCard from '@/components/dashboard/ResumeCard';
import TemplatePickerModal from '@/components/dashboard/TemplatePickerModal';
import { Plus, FileText, Search, LayoutGrid, LogOut, HelpCircle } from 'lucide-react';
import { createResume, logout } from '@/lib/actions';
import { useMemo } from 'react';
import { useNextStep } from 'nextstepjs';

interface Resume {
    id: string;
    title: string;
    updated_at: Date;
}

interface DashboardClientProps {
    resumes: Resume[];
    userEmail: string;
}

export default function DashboardClient({ resumes, userEmail }: DashboardClientProps) {
    const [isTemplatePickerOpen, setIsTemplatePickerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { startNextStep } = useNextStep();

    const filteredResumes = useMemo(() => {
        return resumes.filter((resume) =>
            resume.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [resumes, searchQuery]);

    const handleTemplateSelect = async (templateId: string) => {
        startTransition(async () => {
            const id = await createResume('Untitled Resume', templateId);
            router.push(`/resume/${id}`);
        });
    };

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* Internal Tool Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-lg text-white">
                                <FileText className="w-5 h-5 text-blue-400" />
                                <span className="font-bold tracking-tight text-sm">Resume Builder</span>
                            </div>
                            <div className="hidden md:flex items-center gap-1 text-slate-400">
                                <span className="mx-2 text-slate-300">/</span>
                                <span className="text-sm font-medium text-slate-600">Dashboard</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 p-2 px-3 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all border border-transparent hover:border-red-100 font-medium text-sm"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                            <div className="h-6 w-[1px] bg-slate-200 mx-1" />
                            <div className="flex items-center gap-3 pl-1">
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white shadow-sm">
                                    {userEmail.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <div className="hidden sm:block text-left">
                                    <p className="text-[11px] font-bold text-slate-900 leading-none">{userEmail || 'User Session'}</p>
                                    <p className="text-[10px] text-slate-500 mt-1 leading-none uppercase tracking-wider">Active Session</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-screen-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-10">
                {/* Dashboard Action Bar */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Resume Management</h1>
                        <p className="text-slate-500 text-sm mt-1.5 font-medium">Index of all registered professional profiles</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="relative group min-w-[280px]">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by document title..."
                                className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg bg-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button
                            id="onboarding-create-resume"
                            onClick={() => setIsTemplatePickerOpen(true)}
                            disabled={isPending}
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 whitespace-nowrap"
                        >
                            <Plus className="w-4 h-4 mr-2 stroke-[3px]" />
                            Create New Resume
                        </button>
                    </div>
                </div>

                {resumes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-white rounded-2xl border border-slate-200 border-dashed shadow-inner">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 rotate-3 shadow-sm">
                            <LayoutGrid className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">No resumes found</h3>
                        <p className="text-slate-500 text-sm mt-2 mb-8 text-center max-w-sm leading-relaxed">
                            You haven't created any resumes yet. Click the button below to get started.
                        </p>
                        <button
                            onClick={() => setIsTemplatePickerOpen(true)}
                            className="group flex items-center gap-2 bg-slate-900 px-6 py-3 rounded-xl text-sm font-bold text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-200"
                        >
                            <Plus className="w-4 h-4" />
                            Create Your First Resume
                        </button>
                    </div>
                ) : filteredResumes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <div className="p-4 bg-slate-50 rounded-full mb-4 border border-slate-100">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Query Resulted in No Matches</h3>
                        <p className="text-slate-500 text-sm mt-1 font-medium">No document matching "{searchQuery}" found in repository</p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="mt-6 text-blue-600 text-sm font-bold hover:text-blue-700 flex items-center gap-1 transition-colors"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredResumes.map((resume) => (
                            <ResumeCard
                                key={resume.id}
                                id={resume.id}
                                title={resume.title}
                                updatedAt={resume.updated_at}
                            />
                        ))}
                    </div>
                )}
            </main>

            <footer className="mt-auto py-6 border-t border-slate-200 bg-white">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-400 font-medium tracking-tight">
                        © 2026 Resume Builder • Internal Tool v1.0.42
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Operational</span>
                        </span>
                        <div className="h-4 w-[1px] bg-slate-200" />
                        <button
                            onClick={() => startNextStep('dashboard')}
                            className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest cursor-help hover:text-slate-900 transition-colors"
                        >
                            <HelpCircle className="w-3 h-3" />
                            Documentation
                        </button>
                    </div>
                </div>
            </footer>

            <TemplatePickerModal
                isOpen={isTemplatePickerOpen}
                onClose={() => setIsTemplatePickerOpen(false)}
                onSelect={handleTemplateSelect}
            />
        </div>
    );
}
