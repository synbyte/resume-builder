'use client';

import { Loader2, FileText } from 'lucide-react';

export default function LoadingSpinner({ message = 'Loading...' }: { message?: string }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center">
                        <FileText className="w-8 h-8 text-blue-400" />
                    </div>
                    <Loader2 className="absolute -inset-2 w-20 h-20 text-blue-600 animate-spin" />
                </div>
                <div className="text-center">
                    <p className="text-sm font-bold text-slate-900">{message}</p>
                    <p className="text-xs text-slate-500 mt-1">Please wait a moment</p>
                </div>
            </div>
        </div>
    );
}
