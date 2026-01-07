'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ResumeLayoutProvider, DesignSettings, defaultDesignSettings } from './ResumeLayoutContext';

interface PagedPreviewWrapperProps {
    children: React.ReactNode;
    className?: string;
    designSettings?: DesignSettings;
    layout?: Record<string, { marginTop?: number; forcedBreak?: boolean }>;
    onLayoutChange?: (layout: Record<string, { marginTop?: number; forcedBreak?: boolean }>) => void;
}

export default function PagedPreviewWrapper({
    children,
    className = '',
    designSettings = defaultDesignSettings,
    layout = {}, // Default to empty object if not provided, but parent should provide it
    onLayoutChange
}: PagedPreviewWrapperProps) {
    const measureRef = useRef<HTMLDivElement>(null);
    const [pageCount, setPageCount] = useState(1);
    const [autoOffsets, setAutoOffsets] = useState<Record<string, number>>({});

    // Controlled component: We use the passed 'layout' prop directly.
    // No local state for manualLayout.

    const updateLayout = (id: string, changes: { marginTop?: number; forcedBreak?: boolean }) => {
        // Calculate the new layout based on the CURRENT prop value
        const newLayout = {
            ...layout,
            [id]: { ...layout[id], ...changes }
        };
        // Notify parent. No local state update.
        onLayoutChange?.(newLayout);
    };

    const manualOffsets = Object.entries(layout).reduce((acc, [id, val]) => {
        if (val.marginTop) acc[id] = val.marginTop;
        return acc;
    }, {} as Record<string, number>);

    const finalVisibleOffsets = { ...manualOffsets };
    // Merge auto-offsets: Add them to manual offsets to ensure we bridge the gap to the next page
    // even if the user added some manual spacing.
    Object.entries(autoOffsets).forEach(([id, val]) => {
        finalVisibleOffsets[id] = (finalVisibleOffsets[id] || 0) + val;
    });

    // Use ResizeObserver to detect size changes instead of depending on 'children' prop,
    // which can be referentially unstable even if content hasn't changed.
    useEffect(() => {
        if (!measureRef.current) return;

        const calculate = () => {
            if (!measureRef.current) return;

            const contentHeight = measureRef.current.scrollHeight;
            const pageHeight = 1123; // A4 px
            const verticalPadding = 40; // ~10mm padding top/bottom

            // Calculate basic page count
            const p1Capacity = pageHeight - verticalPadding;
            const pNCapacity = pageHeight - (verticalPadding * 2);

            let needed = 1;
            if (contentHeight > p1Capacity) {
                needed = 1 + Math.ceil((contentHeight - p1Capacity) / pNCapacity);
            }
            // Only update if changed to avoid unnecessary renders
            setPageCount(prev => prev !== needed ? needed : prev);

            // --- Smart Pagination Logic ---
            const newOffsets: Record<string, number> = {};
            const shifts: { triggerY: number; amount: number; left: number; right: number }[] = [];

            // Find all elements that want to avoid breaks
            const elements = measureRef.current.querySelectorAll('[data-break-inside="avoid"]');
            const sortedElements = Array.from(elements).sort((a, b) => {
                const rectA = a.getBoundingClientRect();
                const rectB = b.getBoundingClientRect();
                return rectA.top - rectB.top;
            });

            for (const el of sortedElements) {
                const rect = el.getBoundingClientRect();
                const containerRect = measureRef.current.getBoundingClientRect();
                const originalTop = rect.top - containerRect.top;

                // Track horizontal position relative to container
                const relativeLeft = rect.left - containerRect.left;
                const relativeRight = relativeLeft + rect.width;
                const height = rect.height;

                // Calculate inherited shift from previous elements
                const inheritedShift = shifts.reduce((sum, s) => {
                    const isBelow = originalTop >= (s.triggerY - 1);
                    // Check horizontal overlap
                    const overlap = Math.max(relativeLeft, s.left) < Math.min(relativeRight, s.right);

                    return (isBelow && overlap) ? sum + s.amount : sum;
                }, 0);

                const effectiveTop = originalTop + inheritedShift;
                const effectiveBottom = effectiveTop + height;

                // Check page boundaries
                let pageIndex = 0;
                let pageEnd = p1Capacity;
                while (effectiveTop >= pageEnd) {
                    pageIndex++;
                    pageEnd += pNCapacity;
                }

                const id = el.getAttribute('data-item-id');
                const hasManualOffset = id && layout[id]?.marginTop !== undefined && layout[id].marginTop !== 0;

                if (effectiveBottom > pageEnd && height < pNCapacity && !hasManualOffset) {
                    // Crosses boundary -> Shift to next page
                    const moveAmount = pageEnd - effectiveTop;

                    shifts.push({
                        triggerY: originalTop + height,
                        amount: moveAmount,
                        left: relativeLeft,
                        right: relativeRight
                    });

                    if (id) {
                        newOffsets[id] = inheritedShift + moveAmount;
                    }
                } else if (inheritedShift > 0) {
                    if (id) {
                        newOffsets[id] = inheritedShift;
                    }
                }
            }

            // Only update if changed (deep compare simplified to JSON string or simple check)
            // Ideally we'd do a better check, but JSON.stringify is okay for this size
            setAutoOffsets(prev => {
                if (JSON.stringify(prev) !== JSON.stringify(newOffsets)) {
                    return newOffsets;
                }
                return prev;
            });
        };

        // Run immediately
        calculate();

        // Run on resize
        const observer = new ResizeObserver(() => {
            calculate();
        });
        observer.observe(measureRef.current);

        return () => observer.disconnect();
    }, [layout, children, designSettings]); // Re-calculate when layout, content, or design changes

    return (
        <div className="flex flex-col gap-8 items-center print:bg-white print:gap-0 print:block">
            {/* Hidden measurement div - clean render without offsets */}
            <div
                ref={measureRef}
                className={`invisible absolute w-[210mm] p-8 ${className}`}
                style={{ top: -9999, left: -9999 }}
            >
                {/* 
                    We pass MANUAL offsets here so the measurement sees the user's added spacing.
                    This allows the "Auto-Breaker" to respect user's manual spacing and push things FURTHER if needed.
                */}
                <ResumeLayoutProvider
                    offsets={manualOffsets}
                    manualOffsets={manualOffsets}
                    updateLayout={() => { }}
                    designSettings={designSettings}
                >
                    {children}
                </ResumeLayoutProvider>
            </div>

            {/* Render pages for preview with intelligent offsets */}
            {Array.from({ length: pageCount }, (_, pageIndex) => {
                const pageHeight = 1123;
                const verticalPadding = 40;
                const topPadding = pageIndex === 0 ? 0 : verticalPadding;
                const bottomPadding = verticalPadding;
                const maskHeight = pageHeight - topPadding - bottomPadding;

                let contentOffset = 0;
                if (pageIndex > 0) {
                    const p1Capacity = pageHeight - verticalPadding;
                    const pNCapacity = pageHeight - (verticalPadding * 2);
                    contentOffset = p1Capacity + ((pageIndex - 1) * pNCapacity);
                }

                return (
                    <div
                        key={pageIndex}
                        data-resume-page
                        className={`bg-white shadow-lg w-[210mm] h-[297mm] relative ${className} print:shadow-none print:m-0 print:w-[210mm] print:h-[297mm]`}
                        style={{ breakAfter: pageIndex < pageCount - 1 ? 'page' : 'auto' }}
                    >
                        <div
                            className="absolute w-full overflow-hidden"
                            style={{
                                top: topPadding,
                                height: maskHeight,
                                left: 0
                            }}
                        >
                            <div
                                style={{
                                    position: 'relative',
                                    top: -contentOffset,
                                }}
                            >
                                <div className="p-8">
                                    <ResumeLayoutProvider
                                        offsets={finalVisibleOffsets}
                                        manualOffsets={manualOffsets}
                                        updateLayout={updateLayout}
                                        designSettings={designSettings}
                                    >
                                        {children}
                                    </ResumeLayoutProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

