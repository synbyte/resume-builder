'use client';

import { ResumeData } from '@/lib/types';
import ModernTemplate from './Templates/Modern';
import ClassicTemplate from './Templates/Classic';
import MinimalTemplate from './Templates/Minimal';
import ProfessionalTemplate from './Templates/Professional';
import CreativeTemplate from './Templates/Creative';
import ElegantTemplate from './Templates/Elegant';
import TechTemplate from './Templates/Tech';
import TimelineTemplate from './Templates/Timeline';
import CompactTemplate from './Templates/Compact';
import BoldTemplate from './Templates/Bold';
import { DesignSettings } from './ResumeLayoutContext';

interface PreviewProps {
    data: ResumeData;
    template?: string;
    designSettings?: DesignSettings;
    layout?: Record<string, { marginTop?: number; forcedBreak?: boolean }>;
    onLayoutChange?: (layout: Record<string, { marginTop?: number; forcedBreak?: boolean }>) => void;
}

import PagedPreviewWrapper from './PagedPreviewWrapper';

export default function Preview({ data, template = 'modern', designSettings, layout, onLayoutChange }: PreviewProps) {

    const renderTemplate = () => {
        switch (template) {
            case 'Classic':
                return <ClassicTemplate data={data} />;
            case 'Modern':
                return <ModernTemplate data={data} />;
            case 'Minimal':
                return <MinimalTemplate data={data} />;
            case 'Professional':
                return <ProfessionalTemplate data={data} />;
            case 'Creative':
                return <CreativeTemplate data={data} />;
            case 'Elegant':
                return <ElegantTemplate data={data} />;
            case 'Tech':
                return <TechTemplate data={data} />;
            case 'Timeline':
                return <TimelineTemplate data={data} />;
            case 'Compact':
                return <CompactTemplate data={data} />;
            case 'Bold':
                return <BoldTemplate data={data} />;
            default:
                return <ModernTemplate data={data} />;
        }
    };

    return (
        <div className="origin-top scale-90 md:scale-100 print:scale-100">
            <PagedPreviewWrapper
                className="text-sm text-gray-800 font-sans"
                designSettings={designSettings}
                layout={layout}
                onLayoutChange={onLayoutChange}
            >
                {renderTemplate()}
            </PagedPreviewWrapper>
        </div>
    );
}
