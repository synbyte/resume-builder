'use client';

import React from 'react';
import { X, Type, Paintbrush, Sliders, Palette, ZoomIn, RotateCcw, Activity } from 'lucide-react';
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
        <div className="flex flex-col h-full bg-white border-l border-slate-200 shadow-xl overflow-hidden">
            {/* Technical Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-slate-900 text-white">
                <div className="flex items-center gap-2">
                    <Paintbrush className="w-4 h-4 text-blue-400" />
                    <h2 className="text-xs font-bold uppercase tracking-widest">Design Settings</h2>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-white/10 rounded transition-all text-slate-400 hover:text-white"
                >
                    <X size={16} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-10 bg-slate-50/50 scrollbar-thin">

                {/* Typography Engine */}
                <div className="space-y-5">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                        <Type size={14} className="text-blue-600" />
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Typography</span>
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-700">Font Family</label>
                            <select
                                className="w-full text-xs font-medium bg-white border border-slate-200 rounded-lg p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/10 transition-all shadow-sm"
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

                        <div className="space-y-3 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-900">Font Size (px)</span>
                                <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100 font-bold">{settings.baseFontSize}</span>
                            </div>
                            <input
                                type="range" min="10" max="18" step="0.5"
                                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                value={settings.baseFontSize}
                                onChange={(e) => updateSetting('baseFontSize', parseFloat(e.target.value))}
                            />
                        </div>

                        <div className="space-y-3 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-900">Line Height Scalar</span>
                                <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100 font-bold">{settings.lineHeight}</span>
                            </div>
                            <input
                                type="range" min="1.0" max="2.0" step="0.1"
                                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                value={settings.lineHeight}
                                onChange={(e) => updateSetting('lineHeight', parseFloat(e.target.value))}
                            />
                        </div>
                    </div>
                </div>

                {/* Color Palette Matrix */}
                <div className="space-y-5">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                        <Palette size={14} className="text-blue-600" />
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Colors</span>
                    </div>

                    <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-900">Primary Color</span>
                            <span className="text-[10px] font-mono text-slate-400 mt-0.5">{settings.primaryColor.toUpperCase()}</span>
                        </div>
                        <div className="relative w-10 h-10 rounded-lg border border-slate-200 overflow-hidden shadow-inner ring-4 ring-slate-50">
                            <input
                                type="color"
                                className="absolute inset-0 w-[200%] h-[200%] p-0 border-0 cursor-pointer -top-1/2 -left-1/2"
                                value={settings.primaryColor}
                                onChange={(e) => updateSetting('primaryColor', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Scaling Factors */}
                <div className="space-y-5">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                        <ZoomIn size={14} className="text-blue-600" />
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Heading Sizes</span>
                    </div>

                    <div className="space-y-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-xs font-bold">
                                <span className="text-slate-600 uppercase tracking-tighter">Name Size</span>
                                <span className="font-mono text-blue-600">{settings.headingSizes.h1}px</span>
                            </div>
                            <input
                                type="range" min="18" max="48"
                                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                value={settings.headingSizes.h1}
                                onChange={(e) => updateHeadingSize('h1', parseInt(e.target.value))}
                            />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-xs font-bold">
                                <span className="text-slate-600 uppercase tracking-tighter">Headers</span>
                                <span className="font-mono text-blue-600">{settings.headingSizes.h2}px</span>
                            </div>
                            <input
                                type="range" min="14" max="32"
                                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                value={settings.headingSizes.h2}
                                onChange={(e) => updateHeadingSize('h2', parseInt(e.target.value))}
                            />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-xs font-bold">
                                <span className="text-slate-600 uppercase tracking-tighter">Sub-headers</span>
                                <span className="font-mono text-blue-600">{settings.headingSizes.h3}px</span>
                            </div>
                            <input
                                type="range" min="12" max="24"
                                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                value={settings.headingSizes.h3}
                                onChange={(e) => updateHeadingSize('h3', parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                </div>

                {/* Reset System */}
                <div className="pt-4 pb-12">
                    <button
                        onClick={() => onChange(defaultDesignSettings)}
                        className="w-full py-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all border border-red-200 active:scale-95"
                    >
                        <RotateCcw size={14} />
                        Reset to Defaults
                    </button>
                </div>
            </div>
        </div>
    );
}
