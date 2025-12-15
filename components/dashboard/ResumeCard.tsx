'use client';

import { ResumeData } from '@/lib/types';
import { deleteResume } from '@/lib/actions';
import { Trash2, FileText, Edit, Clock } from 'lucide-react';
import Link from 'next/link';
import { useTransition } from 'react';

interface ResumeCardProps {
    id: string;
    title: string;
    updatedAt: Date;
}

export default function ResumeCard({ id, title, updatedAt }: ResumeCardProps) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this resume?')) {
            startTransition(async () => {
                await deleteResume(id);
            });
        }
    };

    const formatDate = (date: Date) => {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;

        return new Date(date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <Link href={`/resume/${id}`} className="block group">
            <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden h-64 flex flex-col">
                {/* Gradient background with pattern */}
                <div className="relative h-36 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden">
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Grid pattern */}
                    <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />

                    {/* Icon */}
                    <div className="relative z-10 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 shadow-lg">
                            <FileText className="w-10 h-10 text-white" strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex flex-col justify-between bg-white">
                    <div>
                        <h3 className="font-bold text-lg leading-tight text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {title}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{formatDate(updatedAt)}</span>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                        <div className="flex items-center gap-1.5 text-sm font-medium text-blue-600">
                            <Edit className="w-4 h-4" />
                            <span>Edit Resume</span>
                        </div>
                        <button
                            onClick={handleDelete}
                            disabled={isPending}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete resume"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Hover border glow */}
                <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/0 group-hover:ring-blue-500/20 transition-all duration-300 pointer-events-none" />
            </div>
        </Link>
    );
}
