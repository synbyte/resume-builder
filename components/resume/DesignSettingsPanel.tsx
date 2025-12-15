'use client';

import React from 'react';
import { X, Type, Paintbrush, MinusSquare, PlusSquare } from 'lucide-react';
import { DesignSettings, defaultDesignSettings } from './ResumeLayoutContext';

interface DesignSettingsPanelProps {
    settings: DesignSettings;
    onChange: (settings: DesignSettings) => void;
    onClose: () => void;
}

export default function DesignSettingsPanel({ settings, onChange, onClose }: DesignSettingsPanelProps) {

    const updateSetting = <K extends keyof DesignSettings>(key: K, value: DesignSettings[K]) => {
        onChange({ ...settings, [key]: value });
    };

    const updateHeadingSize = (key: 'h1' | 'h2' | 'h3', value: number) => {
        onChange({
            ...settings,
            headingSizes: {
                ...settings.headingSizes,
                [key]: value
            }
        });
    };

    return (
        <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl border-l border-slate-200 z-[50] flex flex-col h-full">
            {/* Header with gradient */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />

                <div className="relative flex items-center justify-between p-5 text-white">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <Paintbrush size={18} />
                        Design Settings
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-xl transition-all backdrop-blur-sm"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-slate-300 bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/20">

                {/* Typography Section */}
                <div className="space-y-4">
                    <label className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-2">
                        <Type size={14} /> Typography
                    </label>

                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-semibold text-slate-700">Font Family</span>
                            <select
                                className="w-full text-sm bg-white border-2 border-slate-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl p-3 outline-none transition-all shadow-sm"
                                value={settings.fontFamily}
                                onChange={(e) => updateSetting('fontFamily', e.target.value)}
                            >
                                <option value="ui-sans-serif, system-ui, sans-serif">System Sans</option>
                                <option value="Arial, Helvetica, sans-serif">Arial</option>
                                <option value="'Inter', sans-serif">Inter</option>
                                <option value="'Roboto', sans-serif">Roboto</option>
                                <option value="'Georgia', serif">Georgia</option>
                                <option value="'Times New Roman', Times, serif">Times New Roman</option>
                                <option value="'Garamond', serif">Garamond</option>
                                <option value="'Courier New', monospace">Courier New</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold text-slate-700">Base Font Size</span>
                                <span className="text-xs font-mono bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 px-3 py-1 rounded-lg font-semibold">{settings.baseFontSize}px</span>
                            </div>
                            <input
                                type="range"
                                min="10"
                                max="18"
                                step="0.5"
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                value={settings.baseFontSize}
                                onChange={(e) => updateSetting('baseFontSize', parseFloat(e.target.value))}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold text-slate-700">Line Height</span>
                                <span className="text-xs font-mono bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 px-3 py-1 rounded-lg font-semibold">{settings.lineHeight}</span>
                            </div>
                            <input
                                type="range"
                                min="1.0"
                                max="2.0"
                                step="0.1"
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                value={settings.lineHeight}
                                onChange={(e) => updateSetting('lineHeight', parseFloat(e.target.value))}
                            />
                        </div>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

                {/* Colors Section */}
                <div className="space-y-4">
                    <label className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-2">
                        Colors
                    </label>

                    <div className="flex items-center justify-between border-2 border-slate-200 rounded-xl p-4 hover:border-blue-300 transition-all bg-white shadow-sm">
                        <span className="text-sm font-semibold text-slate-700">Primary Theme</span>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-mono uppercase text-slate-500 font-semibold">{settings.primaryColor}</span>
                            <div className="relative w-10 h-10 rounded-xl shadow-md ring-2 ring-slate-200 overflow-hidden hover:scale-110 transition-transform">
                                <input
                                    type="color"
                                    className="absolute inset-0 w-[150%] h-[150%] p-0 border-0 cursor-pointer -top-1/4 -left-1/4"
                                    value={settings.primaryColor}
                                    onChange={(e) => updateSetting('primaryColor', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

                {/* Headings Section */}
                <div className="space-y-4">
                    <label className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-2">
                        <MinusSquare size={14} /> Scale
                    </label>
                    <div className="space-y-5 bg-white p-5 rounded-xl border-2 border-slate-200 shadow-sm">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-700 font-semibold">Name Size (H1)</span>
                                <span className="text-xs font-mono text-blue-600 font-semibold">{settings.headingSizes.h1}px</span>
                            </div>
                            <input
                                type="range" min="18" max="48"
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                value={settings.headingSizes.h1}
                                onChange={(e) => updateHeadingSize('h1', parseInt(e.target.value))}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-700 font-semibold">Headers (H2)</span>
                                <span className="text-xs font-mono text-blue-600 font-semibold">{settings.headingSizes.h2}px</span>
                            </div>
                            <input
                                type="range" min="14" max="32"
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                value={settings.headingSizes.h2}
                                onChange={(e) => updateHeadingSize('h2', parseInt(e.target.value))}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-700 font-semibold">Sub-headers (H3)</span>
                                <span className="text-xs font-mono text-blue-600 font-semibold">{settings.headingSizes.h3}px</span>
                            </div>
                            <input
                                type="range" min="12" max="24"
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                value={settings.headingSizes.h3}
                                onChange={(e) => updateHeadingSize('h3', parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                </div>

                {/* Reset Button */}
                <div className="pt-4 pb-8">
                    <button
                        onClick={() => onChange(defaultDesignSettings)}
                        className="w-full py-3 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all border-2 border-red-200 hover:border-red-300 shadow-sm"
                    >
                        Reset to Defaults
                    </button>
                </div>
            </div>
        </div>
    );
}
