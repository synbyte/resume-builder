'use client';

import React, { createContext, useContext } from 'react';

export interface DesignSettings {
    fontFamily: string;
    baseFontSize: number;
    primaryColor: string;
    headingSizes: {
        h1: number;
        h2: number;
        h3: number;
    };
    lineHeight: number;
}

export const defaultDesignSettings: DesignSettings = {
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    baseFontSize: 14,
    primaryColor: '#000000',
    headingSizes: {
        h1: 24,
        h2: 18,
        h3: 16,
    },
    lineHeight: 1.5,
};

interface ResumeLayoutContextType {
    offsets: Record<string, number>;
    manualOffsets: Record<string, number>;
    updateLayout: (id: string, changes: { marginTop?: number; forcedBreak?: boolean }) => void;
    designSettings: DesignSettings;
}

const ResumeLayoutContext = createContext<ResumeLayoutContextType>({
    offsets: {},
    manualOffsets: {},
    updateLayout: () => { },
    designSettings: defaultDesignSettings,
});

export const useResumeLayout = () => useContext(ResumeLayoutContext);

export const ResumeLayoutProvider = ({
    children,
    offsets,
    manualOffsets = {},
    updateLayout,
    designSettings = defaultDesignSettings
}: {
    children: React.ReactNode;
    offsets: Record<string, number>;
    manualOffsets?: Record<string, number>;
    updateLayout: (id: string, changes: { marginTop?: number; forcedBreak?: boolean }) => void;
    designSettings?: DesignSettings;
}) => {
    return (
        <ResumeLayoutContext.Provider value={{ offsets, manualOffsets, updateLayout, designSettings }}>
            {children}
        </ResumeLayoutContext.Provider>
    );
};
