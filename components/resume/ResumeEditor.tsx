'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ResumeData, ResumeDataSchema } from '@/lib/types';
import { renameResume, updateResume } from '@/lib/actions';
import Wizard from './Wizard';
import Preview from './Preview';
import DesignSettingsPanel from './DesignSettingsPanel';
import { DesignSettings, defaultDesignSettings } from './ResumeLayoutContext';
import { ArrowLeft, Save, Printer, FileText, Paintbrush, Database, HardDrive, Share2, Download } from 'lucide-react';
import Link from 'next/link';
import TemplateSelector from './TemplateSelector';
import AIAssistant from './AIAssistant';
import { Undo2, Redo2 } from 'lucide-react';


interface ResumeEditorProps {
    id: string;
    initialData: ResumeData;
    title: string;
}

export default function ResumeEditor({ id, initialData, title: initialTitle }: ResumeEditorProps) {
    const [data, setData] = useState<ResumeData>(initialData);
    const [title, setTitle] = useState(initialTitle);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    // Initialize template from saved selection or default
    const [template, setTemplate] = useState(initialData.selectedTemplate || 'Modern');

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

    // History System
    const [undoStack, setUndoStack] = useState<any[]>([]);
    const [redoStack, setRedoStack] = useState<any[]>([]);

    const captureState = useCallback(() => {
        return {
            data,
            template,
            designSettings,
            currentLayout,
            savedTemplateSettings,
            savedTemplateLayouts
        };
    }, [data, template, designSettings, currentLayout, savedTemplateSettings, savedTemplateLayouts]);

    const pushToHistory = useCallback(() => {
        const state = captureState();
        setUndoStack(prev => [...prev.slice(-19), state]); // Keep last 20 states
        setRedoStack([]);
    }, [captureState]);

    const undo = () => {
        if (undoStack.length === 0) return;

        const prevState = undoStack[undoStack.length - 1];
        const currentState = captureState();

        setRedoStack(prev => [...prev, currentState]);
        setUndoStack(prev => prev.slice(0, -1));

        // Apply previous state
        setData(prevState.data);
        setTemplate(prevState.template);
        setDesignSettings(prevState.designSettings);
        setCurrentLayout(prevState.currentLayout);
        setSavedTemplateSettings(prevState.savedTemplateSettings);
        setSavedTemplateLayouts(prevState.savedTemplateLayouts);
    };

    const redo = () => {
        if (redoStack.length === 0) return;

        const nextState = redoStack[redoStack.length - 1];
        const currentState = captureState();

        setUndoStack(prev => [...prev, currentState]);
        setRedoStack(prev => prev.slice(0, -1));

        // Apply next state
        setData(nextState.data);
        setTemplate(nextState.template);
        setDesignSettings(nextState.designSettings);
        setCurrentLayout(nextState.currentLayout);
        setSavedTemplateSettings(nextState.savedTemplateSettings);
        setSavedTemplateLayouts(nextState.savedTemplateLayouts);
    };

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                if (e.shiftKey) {
                    e.preventDefault();
                    redo();
                } else {
                    e.preventDefault();
                    undo();
                }
            } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
                e.preventDefault();
                redo();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [undo, redo]); // These are stable or updated correctly

    const resumeRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    // Auto-save effect (debounced)
    useEffect(() => {
        const timer = setTimeout(() => {
            // Only auto-save if there's been actual changes
            if (JSON.stringify(data) !== JSON.stringify(initialData)) {
                handleSave();
            }
        }, 2000); // 2 seconds after last change

        return () => clearTimeout(timer);
    }, [data, designSettings, template, currentLayout]); // Auto-save on content changes

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Update the map with current settings before saving
            const updatedTemplateSettings = {
                ...savedTemplateSettings,
                [template]: designSettings
            };
            setSavedTemplateSettings(updatedTemplateSettings);

            // Update the map with current layout before saving
            const updatedTemplateLayouts = {
                ...savedTemplateLayouts,
                [template]: currentLayout
            };
            setSavedTemplateLayouts(updatedTemplateLayouts);

            const dataToSave = {
                ...data,
                designSettings,
                templateSettings: updatedTemplateSettings,
                layout: currentLayout,
                templateLayouts: updatedTemplateLayouts,
                selectedTemplate: template
            };
            await updateResume(id, dataToSave);
            setLastSaved(new Date());
        } catch (error) {
            console.error('Failed to save resume:', error);
            alert('Failed to save resume');
        } finally {
            setIsSaving(false);
        }
    };

    const handleTemplateChange = (newTemplate: string) => {
        pushToHistory();
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

        setTemplate(newTemplate);

        const newSettings = updatedSettingsMap[newTemplate] || defaultDesignSettings;
        setDesignSettings(newSettings);

        const newLayout = updatedLayoutsMap[newTemplate] || {};
        setCurrentLayout(newLayout);
    };

    const handleLayoutChange = useCallback((newLayout: Record<string, { marginTop?: number; forcedBreak?: boolean }>) => {
        // For spacing, we might want to be careful not to spam history, 
        // but since it's discrete moves in InteractiveItem, it's usually fine.
        pushToHistory();
        setCurrentLayout(newLayout);
    }, [pushToHistory]);

    const handleTitleBlur = async () => {
        if (title !== initialTitle) {
            await renameResume(id, title);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleAIUpdate = (newData: any) => {
        pushToHistory();

        // Update content data
        setData(prev => ({
            ...prev,
            personalInfo: newData.personalInfo ? { ...prev.personalInfo, ...newData.personalInfo } : prev.personalInfo,
            summary: newData.summary ?? prev.summary,
            experience: newData.experience ?? prev.experience,
            education: newData.education ?? prev.education,
            skills: newData.skills ?? prev.skills,
        }));

        // Update design settings
        if (newData.designSettings) {
            setDesignSettings(prev => ({
                ...prev,
                ...newData.designSettings,
                headingSizes: newData.designSettings.headingSizes
                    ? { ...prev.headingSizes, ...newData.designSettings.headingSizes }
                    : prev.headingSizes
            }));
        }

        // Update template
        if (newData.selectedTemplate && newData.selectedTemplate !== template) {
            handleTemplateChange(newData.selectedTemplate);
        }

        // Update layout mapping
        if (newData.layout) {
            setCurrentLayout(prev => ({
                ...prev,
                ...newData.layout
            }));
        }
    };

    const handleDownload = async () => {
        if (!resumeRef.current) return;
        setIsDownloading(true);

        try {
            // Dynamic imports
            const jspdf = (await import('jspdf')).default;
            const { toJpeg } = await import('html-to-image');

            // Find all page elements
            const pages = resumeRef.current.querySelectorAll('[data-resume-page]');
            if (pages.length === 0) {
                // Fallback if no specific pages found
                const imgData = await toJpeg(resumeRef.current, { quality: 0.95, backgroundColor: '#ffffff', pixelRatio: 2 });
                const pdf = new jspdf({ orientation: 'portrait', unit: 'mm', format: 'a4' });
                pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
                pdf.save(`${title.replace(/\s+/g, '_') || 'resume'}.pdf`);
                return;
            }

            const pdf = new jspdf({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            for (let i = 0; i < pages.length; i++) {
                const page = pages[i] as HTMLElement;
                const imgData = await toJpeg(page, {
                    quality: 0.95,
                    backgroundColor: '#ffffff',
                    pixelRatio: 2,
                    // Filter out any elements marked for removal in the PDF
                    filter: (node) => {
                        if (node instanceof HTMLElement && node.hasAttribute('data-pdf-ignore')) {
                            return false;
                        }
                        return true;
                    },
                    style: {
                        margin: '0',
                        boxShadow: 'none',
                        transform: 'none'
                    }
                });

                if (i > 0) pdf.addPage();
                pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
            }

            pdf.save(`${title.replace(/\s+/g, '_') || 'resume'}.pdf`);
        } catch (error) {
            console.error('PDF Generation failed:', error);
            alert('Failed to generate PDF. Please use the Print option as a fallback.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-slate-50 print:bg-white print:h-auto print:overflow-visible font-sans text-slate-900">
            {/* Internal Tool Header */}
            <header className="bg-white border-b border-slate-200 px-4 py-3 flex justify-between items-center z-50 shrink-0 print:hidden shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/dashboard"
                            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-all"
                            title="Exit to Dashboard"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <div className="h-6 w-px bg-slate-200" />
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <FileText className="w-3.5 h-3.5 text-blue-600" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Draft ID: {id.slice(0, 8)}</span>
                            </div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onBlur={handleTitleBlur}
                                className="text-sm font-bold bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:ring-0 px-0 py-0.5 transition-all outline-none min-w-[300px] text-slate-900"
                                placeholder="Untitled Resume"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Undo / Redo Controls */}
                    <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
                        <button
                            onClick={undo}
                            disabled={undoStack.length === 0}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-white rounded-md transition-all disabled:opacity-30 disabled:hover:text-slate-500 disabled:hover:bg-transparent group relative"
                        >
                            <Undo2 className="w-4 h-4" />
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold uppercase tracking-widest">Undo (Ctrl+Z)</span>
                        </button>
                        <button
                            onClick={redo}
                            disabled={redoStack.length === 0}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-white rounded-md transition-all disabled:opacity-30 disabled:hover:text-slate-500 disabled:hover:bg-transparent group relative"
                        >
                            <Redo2 className="w-4 h-4" />
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold uppercase tracking-widest">Redo (Ctrl+Y)</span>
                        </button>
                    </div>

                    <div className="h-4 w-px bg-slate-200" />

                    {/* Action Group: Configuration */}
                    <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg border border-slate-200">
                        <button
                            id="onboarding-design-settings"
                            onClick={() => setIsDesignPanelOpen(!isDesignPanelOpen)}
                            className={`flex items-center px-3 py-1.5 text-[11px] font-bold  border border-slate-200 uppercase tracking-wider rounded-md transition-all ${isDesignPanelOpen
                                ? 'bg-slate-900 text-white shadow-md'
                                : 'text-slate-500 hover:bg-white hover:text-slate-900'
                                }`}
                        >
                            <Paintbrush className="w-3.5 h-3.5 mr-2" />
                            Design Settings
                        </button>
                        <div className="h-4 w-px bg-slate-200" />
                        <div id="onboarding-templates" className="h-full flex items-center">
                            <TemplateSelector
                                currentTemplate={template}
                                onSelect={handleTemplateChange}
                            />
                        </div>
                    </div>

                    <div className="h-8 w-px bg-slate-200" />

                    {/* Action Group: Deployment */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className="flex items-center px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-sm transition-all disabled:opacity-50"
                        >
                            <Download className="w-3.5 h-3.5 mr-2" />
                            {isDownloading ? 'Processing...' : 'Download PDF'}
                        </button>

                        <button
                            onClick={handlePrint}
                            className="flex items-center px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-700 bg-transparent hover:bg-slate-50 rounded-lg transition-all"
                        >
                            <Printer className="w-3.5 h-3.5 mr-2" />
                            Print
                        </button>

                        <div className="h-4 w-px bg-slate-200 mx-1" />

                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save className="w-3.5 h-3.5 mr-2" />
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                        {lastSaved && !isSaving && (
                            <span className="text-[10px] text-slate-400 font-medium ml-2">
                                Saved {new Date(lastSaved).toLocaleTimeString()}
                            </span>
                        )}
                    </div>
                </div>
            </header>

            {/* Editor Workspace */}
            <div className="flex flex-1 overflow-hidden print:overflow-visible print:h-auto">
                {/* Data Entry Panel */}
                <div className="w-[480px] lg:w-[520px] overflow-y-auto border-r border-slate-200 bg-white print:hidden scrollbar-thin">
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Entry Blocks / Content Editor</span>
                        <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <div className="w-2 h-2 rounded-full bg-slate-200" />
                        </div>
                    </div>
                    <Wizard data={data} onChange={setData} />
                </div>

                {/* Real-time Preview Engine */}
                <div className="flex-1 overflow-y-auto bg-slate-200 p-8 md:p-12 flex flex-col items-center print:w-full print:p-0 print:bg-white print:overflow-visible">
                    {/* Floating Status Indicator */}
                    <div className="sticky top-0 self-start mb-6 z-20 flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm print:hidden">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Preview Sync Active</span>
                    </div>

                    <div className="w-full h-fit print:w-full print:p-0" ref={resumeRef}>
                        <Preview
                            data={data}
                            template={template}
                            designSettings={designSettings}
                            layout={currentLayout}
                            onLayoutChange={handleLayoutChange}
                        />
                    </div>
                </div>

                {/* Parameter Configuration Sidebar */}
                {isDesignPanelOpen && (
                    <div className="absolute right-0 top-0 bottom-0 z-40 bg-white border-l border-slate-200 shadow-2xl animate-in slide-in-from-right duration-300 w-80">
                        <DesignSettingsPanel
                            settings={designSettings}
                            onChange={setDesignSettings}
                            onClose={() => setIsDesignPanelOpen(false)}
                        />
                    </div>
                )}
            </div>

            <div id="onboarding-ai-assistant">
                <AIAssistant
                    data={{
                        ...data,
                        designSettings,
                        layout: currentLayout,
                        selectedTemplate: template
                    }}
                    onUpdate={handleAIUpdate}
                />
            </div>
        </div>
    );
}
