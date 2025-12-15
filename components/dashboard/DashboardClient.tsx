'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import ResumeCard from '@/components/dashboard/ResumeCard';
import TemplatePickerModal from '@/components/dashboard/TemplatePickerModal';
import { Plus, Sparkles, FileText, Zap } from 'lucide-react';
import { createResume } from '@/lib/actions';

interface Resume {
    id: string;
    title: string;
    updated_at: Date;
}

interface DashboardClientProps {
    resumes: Resume[];
}

export default function DashboardClient({ resumes }: DashboardClientProps) {
    const [isTemplatePickerOpen, setIsTemplatePickerOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleTemplateSelect = async (templateId: string) => {
        startTransition(async () => {
            const id = await createResume('Untitled Resume', templateId);
            router.push(`/resume/${id}`);
        });
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
                {/* Hero Header Section */}
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent" />

                    <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium">
                                    <Sparkles className="w-4 h-4" />
                                    Professional Resume Builder
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                                    Create Your Perfect
                                    <span className="block bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent mt-1">
                                        Resume in Minutes
                                    </span>
                                </h1>
                                <p className="text-blue-100 text-lg md:text-xl max-w-2xl leading-relaxed">
                                    Choose from 10 professional templates, customize with ease, and land your dream job.
                                </p>
                                <div className="flex flex-wrap gap-4 pt-2">
                                    <div className="flex items-center gap-2 text-white/90">
                                        <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-medium">10+ Templates</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/90">
                                        <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                            <Zap className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-medium">AI-Powered</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsTemplatePickerOpen(true)}
                                disabled={isPending}
                                className="group relative inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-xl shadow-black/10 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-black/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                <Plus className="w-5 h-5 mr-2 transition-transform group-hover:rotate-90" />
                                {isPending ? 'Creating...' : 'Create New Resume'}
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-10" />
                            </button>
                        </div>
                    </div>

                    {/* Wave separator */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <svg className="w-full h-12 md:h-16 fill-slate-50" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ transform: 'scaleY(-1)' }}>
                            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
                        </svg>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                    {resumes.length === 0 ? (
                        <div className="relative group">
                            {/* Gradient border effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-20 blur group-hover:opacity-30 transition-opacity" />

                            <div className="relative flex flex-col items-center justify-center py-24 md:py-32 px-6 bg-white rounded-2xl shadow-xl text-center">
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse" />
                                    <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-5 rounded-2xl shadow-lg">
                                        <FileText className="w-10 h-10 text-white" />
                                    </div>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                    Ready to Get Started?
                                </h3>
                                <p className="text-slate-600 mt-3 max-w-md mx-auto text-lg leading-relaxed">
                                    Create your first professional resume in minutes with our beautiful templates and AI-powered suggestions.
                                </p>

                                <button
                                    onClick={() => setIsTemplatePickerOpen(true)}
                                    disabled={isPending}
                                    className="group mt-8 relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-blue-600/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                                    {isPending ? 'Creating Your Resume...' : 'Create Your First Resume'}
                                    <div className="absolute inset-0 rounded-xl bg-white opacity-0 transition-opacity group-hover:opacity-10" />
                                </button>

                                {/* Feature highlights */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-2xl">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">10+</div>
                                        <div className="text-sm text-slate-600 mt-1">Templates</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">AI</div>
                                        <div className="text-sm text-slate-600 mt-1">Powered</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">∞</div>
                                        <div className="text-sm text-slate-600 mt-1">Possibilities</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Your Resumes</h2>
                                    <p className="text-slate-600 mt-1">Manage and edit your professional resumes</p>
                                </div>
                                <div className="text-sm font-medium text-slate-500">
                                    {resumes.length} {resumes.length === 1 ? 'Resume' : 'Resumes'}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {resumes.map((resume, index) => (
                                    <div
                                        key={resume.id}
                                        className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <ResumeCard
                                            id={resume.id}
                                            title={resume.title}
                                            updatedAt={resume.updated_at}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <TemplatePickerModal
                isOpen={isTemplatePickerOpen}
                onClose={() => setIsTemplatePickerOpen(false)}
                onSelect={handleTemplateSelect}
            />
        </>
    );
}
