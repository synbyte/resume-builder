'use client';

import { deleteResume } from '@/lib/actions';
import { Trash2, FileText, ExternalLink, Clock, FileEdit, MoreVertical } from 'lucide-react';
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
        if (confirm('Are you sure you want to delete this document from the repository?')) {
            startTransition(async () => {
                await deleteResume(id);
            });
        }
    };

    const formatDate = (date: Date) => {
        const now = new Date();
        const updatedAtDate = new Date(date);
        const diffTime = Math.abs(now.getTime() - updatedAtDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Just now';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;

        return updatedAtDate.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <Link href={`/resume/${id}`} className="block group">
            <div className="relative bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-200 flex flex-col h-full min-h-[180px]">
                {/* Status Bar */}
                <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-xl">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Document ID: {id.slice(0, 8)}</span>
                    </div>
                </div>

                {/* Main Body */}
                <div className="p-4 flex-1">
                    <div className="flex items-start gap-4">
                        <div className="shrink-0 w-12 h-14 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                            <FileText className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate text-sm sm:text-base mb-1">
                                {title}
                            </h3>
                            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Modified {formatDate(updatedAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Footer */}
                <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-[11px] font-bold text-blue-600 uppercase tracking-tighter">
                            <FileEdit className="w-3.5 h-3.5" />
                            <span>Edit Draft</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={handleDelete}
                            disabled={isPending}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all disabled:opacity-50"
                            title="Delete Resume"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="p-1.5 text-slate-300">
                            <ExternalLink className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* Interactive Overlay */}
                <div className="absolute inset-0 rounded-xl bg-blue-600/[0.02] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
            </div>
        </Link>
    );
}
