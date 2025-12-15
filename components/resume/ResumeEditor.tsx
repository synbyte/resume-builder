'use client';

import { useState, useEffect, useCallback } from 'react';
import { ResumeData, ResumeDataSchema } from '@/lib/types';
import { renameResume, updateResume } from '@/lib/actions';
import Wizard from './Wizard';
import Preview from './Preview';
import DesignSettingsPanel from './DesignSettingsPanel';
import { DesignSettings, defaultDesignSettings } from './ResumeLayoutContext';
import { ArrowLeft, Save, Printer, FileText, Paintbrush } from 'lucide-react';
import Link from 'next/link';
import TemplateSelector from './TemplateSelector';

interface ResumeEditorProps {
    id: string;
    initialData: ResumeData;
    title: string;
}

export default function ResumeEditor({ id, initialData, title: initialTitle }: ResumeEditorProps) {
    const [data, setData] = useState<ResumeData>(initialData);
    const [title, setTitle] = useState(initialTitle);
    const [isSaving, setIsSaving] = useState(false);

    // Initialize template from saved selection or default
    const [template, setTemplate] = useState(initialData.selectedTemplate || 'modern');

    const [isDesignPanelOpen, setIsDesignPanelOpen] = useState(false);

    // Initialize design settings from saved data or defaults
    const [designSettings, setDesignSettings] = useState<DesignSettings>(
        (initialData.designSettings as DesignSettings) || defaultDesignSettings
    );

    // Store settings for all templates
    const [savedTemplateSettings, setSavedTemplateSettings] = useState<Record<string, DesignSettings>>(
        initialData.templateSettings as Record<string, DesignSettings> || {}
    );

    // Store layout offsets for all templates (NEW)
    const [savedTemplateLayouts, setSavedTemplateLayouts] = useState<Record<string, Record<string, { marginTop?: number; forcedBreak?: boolean }>>>(
        initialData.templateLayouts as Record<string, Record<string, { marginTop?: number; forcedBreak?: boolean }>> || {}
    );

    // Current layout for the active template
    const [currentLayout, setCurrentLayout] = useState<Record<string, { marginTop?: number; forcedBreak?: boolean }>>(
        (initialData.templateLayouts as Record<string, Record<string, { marginTop?: number; forcedBreak?: boolean }>>)?.[template] ||
        initialData.layout as Record<string, { marginTop?: number; forcedBreak?: boolean }> ||
        {}
    );

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Update the map with current settings before saving
            const updatedTemplateSettings = {
                ...savedTemplateSettings,
                [template]: designSettings
            };
            setSavedTemplateSettings(updatedTemplateSettings); // Sync local state

            // Update the map with current layout before saving
            const updatedTemplateLayouts = {
                ...savedTemplateLayouts,
                [template]: currentLayout
            };
            setSavedTemplateLayouts(updatedTemplateLayouts); // Sync local state

            const dataToSave = {
                ...data,
                designSettings, // Current settings (for backward comp/defaults)
                templateSettings: updatedTemplateSettings, // All saved settings
                layout: currentLayout, // Current layout (for backward comp/defaults)
                templateLayouts: updatedTemplateLayouts, // All saved layouts
                selectedTemplate: template
            };
            await updateResume(id, dataToSave);
        } catch (error) {
            console.error('Failed to save resume:', error);
            alert('Failed to save resume');
        } finally {
            setIsSaving(false);
        }
    };

    const handleTemplateChange = (newTemplate: string) => {
        // 1. Save current settings and layout for the OLD template
        const updatedSettingsMap = {
            ...savedTemplateSettings,
            [template]: designSettings
        };
        setSavedTemplateSettings(updatedSettingsMap);

        const updatedLayoutsMap = {
            ...savedTemplateLayouts,
            [template]: currentLayout
        };
        setSavedTemplateLayouts(updatedLayoutsMap);

        // 2. Switch template
        setTemplate(newTemplate);

        // 3. Load settings for the NEW template (or default)
        // If we have saved settings for this new template, load them.
        // Otherwise, load default settings (fresh start for that template).
        const newSettings = updatedSettingsMap[newTemplate] || defaultDesignSettings;
        setDesignSettings(newSettings);

        // 4. Load layout for the NEW template (or empty)
        const newLayout = updatedLayoutsMap[newTemplate] || {};
        setCurrentLayout(newLayout);
    };

    const handleLayoutChange = useCallback((newLayout: Record<string, { marginTop?: number; forcedBreak?: boolean }>) => {
        setCurrentLayout(newLayout);
    }, []);

    const handleTitleBlur = async () => {
        if (title !== initialTitle) {
            await renameResume(id, title);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 print:bg-white print:h-auto print:overflow-visible font-sans text-foreground">
            {/* Header */}
            <header className="relative bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-sm px-6 py-4 flex justify-between items-center z-50 shrink-0 print:hidden transition-all">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-transparent to-purple-50/50 pointer-events-none" />

                <div className="relative flex items-center gap-4">
                    <Link
                        href="/dashboard"
                        className="group p-2.5 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 text-slate-600 hover:text-blue-600 transition-all duration-200 hover:shadow-sm"
                        title="Back to Dashboard"
                    >
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
                    </Link>
                    <div className="h-8 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleTitleBlur}
                        className="text-lg font-bold bg-transparent border-2 border-transparent hover:border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg px-4 py-2 transition-all outline-none min-w-[200px] text-slate-800"
                        placeholder="Resume Title"
                    />
                </div>

                <div className="relative flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2 bg-gradient-to-br from-slate-100/80 to-slate-50 p-1.5 rounded-xl border border-slate-200/60 shadow-sm">
                        <button
                            onClick={() => setIsDesignPanelOpen(!isDesignPanelOpen)}
                            className={`flex items-center px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${isDesignPanelOpen
                                ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/30'
                                : 'text-slate-600 hover:text-blue-600 hover:bg-white/80'
                                }`}
                        >
                            <Paintbrush className="w-4 h-4 mr-2" />
                            Design
                        </button>
                        <div className="h-6 w-px bg-slate-300/60" />
                        <TemplateSelector
                            currentTemplate={template}
                            onSelect={handleTemplateChange}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrint}
                            className="group flex items-center px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl shadow-sm hover:shadow transition-all focus:ring-2 focus:ring-blue-500/20"
                        >
                            <Printer className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                            Print
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="relative flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500/20 hover:scale-105 disabled:hover:scale-100"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {isSaving ? 'Saving...' : 'Save'}
                            <div className="absolute inset-0 rounded-xl bg-white opacity-0 hover:opacity-10 transition-opacity" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Split View */}
            <div className="flex flex-1 overflow-hidden print:overflow-visible print:h-auto relative">
                {/* Left: Guided Wizard */}
                <div className="w-full md:w-[450px] lg:w-[500px] xl:w-[550px] overflow-y-auto border-r border-slate-200/80 bg-white/60 backdrop-blur-sm print:hidden scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                    <Wizard data={data} onChange={setData} />
                </div>

                {/* Right: Live Preview */}
                <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-100/50 via-blue-50/30 to-indigo-50/40 p-8 flex justify-center print:w-full print:p-0 print:bg-white print:overflow-visible relative">
                    <div className="max-w-[210mm] w-full print:shadow-none transition-transform duration-300 ease-in-out">
                        <Preview
                            data={data}
                            template={template}
                            designSettings={designSettings}
                            layout={currentLayout}
                            onLayoutChange={handleLayoutChange}
                        />
                    </div>
                </div>

                {/* Design Settings Panel (Overlay) */}
                {isDesignPanelOpen && (
                    <div className="absolute right-0 top-0 bottom-0 z-40 shadow-2xl animate-in slide-in-from-right duration-300">
                        <DesignSettingsPanel
                            settings={designSettings}
                            onChange={setDesignSettings}
                            onClose={() => setIsDesignPanelOpen(false)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
