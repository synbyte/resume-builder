'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowDown, ArrowUp, X, MoveVertical, FileInput } from 'lucide-react';
import { useResumeLayout } from './ResumeLayoutContext';

interface InteractiveItemProps {
    id: string;
    children: React.ReactNode;
    className?: string;
}

export default function InteractiveItem({ id, children, className = '' }: InteractiveItemProps) {
    const { updateLayout, offsets, manualOffsets } = useResumeLayout();
    const totalMargin = offsets[id] || 0;
    const manualMargin = manualOffsets[id] || 0;
    const [isHovered, setIsHovered] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState({ top: 0, left: 0, height: 0 });
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // State for manual input
    // State for manual input reflects the total visual space
    const [inputValue, setInputValue] = useState(totalMargin.toString());

    // Sync input value when prop changes
    useEffect(() => {
        setInputValue(totalMargin.toString());
    }, [totalMargin]);

    // Simplified hover handling with minimal delay for safety
    const handleMouseEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        // Small 75ms delay to smooth out the transition across the gap/bridge
        hoverTimeoutRef.current = setTimeout(() => {
            setIsHovered(false);
        }, 75);
    };

    const handleMoveDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Sticky initialization: if manual is 0 but total > 0, start from total
        const base = (manualMargin === 0 && totalMargin > 0) ? totalMargin : manualMargin;
        updateLayout(id, { marginTop: base + 20 });
    };

    const handleMoveUp = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Sticky initialization: if manual is 0 but total > 0, start from total
        const base = (manualMargin === 0 && totalMargin > 0) ? totalMargin : manualMargin;
        updateLayout(id, { marginTop: base - 20 });
    };
    const handlePageBreak = (e: React.MouseEvent) => {
        e.stopPropagation();
        updateLayout(id, { marginTop: manualMargin + 400 });
    };

    const handleReset = (e: React.MouseEvent) => {
        e.stopPropagation();
        updateLayout(id, { marginTop: 0 });
    };

    // Update coordinates when hovered or when scrolled
    useEffect(() => {
        if (isHovered && itemRef.current) {
            const updatePosition = () => {
                if (itemRef.current) {
                    const rect = itemRef.current.getBoundingClientRect();
                    setCoords({
                        top: rect.top + window.scrollY,
                        left: rect.left + window.scrollX,
                        height: rect.height
                    });
                }
            };

            updatePosition();
            window.addEventListener('scroll', updatePosition);
            window.addEventListener('resize', updatePosition);

            return () => {
                window.removeEventListener('scroll', updatePosition);
                window.removeEventListener('resize', updatePosition);
            };
        }
    }, [isHovered]);

    return (
        <div
            ref={itemRef}
            className={`group/item relative ${className} break-inside-avoid transition-all duration-200 hover:bg-gray-50/50 rounded-sm hover:ring-1 hover:ring-gray-200`}
            data-break-inside="avoid"
            data-item-id={id}
            style={{ marginTop: totalMargin }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Controls Overlay - Rendered in Portal */}
            {isHovered && createPortal(
                <div
                    className="absolute flex flex-col items-end z-[9999] print:hidden"
                    style={{
                        top: coords.top,
                        // Adding "pr-3" padding effectively extends the hitbox to the right to overlap/touch the item
                        // Position slightly closer to ensure overlap (35px offset instead of 45 if width is small)
                        // Actually, let's keep left position but add enough transparent padding-right to bridge the gap.
                        // If gap was ~5px, padding-right: 12px (p-3) is plenty.
                        left: coords.left - 45,
                        paddingRight: '12px', // Invisible bridge
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div
                        className="bg-white shadow-md border border-gray-200 rounded-md p-1 flex flex-col gap-1 pointer-events-auto"
                    >
                        <button
                            onClick={handleMoveUp}
                            className="p-1.5 hover:bg-gray-100 text-gray-600 rounded"
                            title="Move Up (Remove Space)"
                        >
                            <ArrowUp size={14} />
                        </button>
                        <input
                            className="w-10 text-[10px] font-mono text-center text-gray-500 bg-transparent outline-none border-b border-transparent hover:border-gray-200 focus:border-blue-300 p-0"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    const val = parseInt(inputValue);
                                    if (!isNaN(val)) {
                                        // Calculate what the manual offset needs to be to reach this total
                                        const autoOffset = totalMargin - manualMargin;
                                        updateLayout(id, { marginTop: val - autoOffset });
                                        (e.target as HTMLInputElement).blur();
                                    } else {
                                        setInputValue(totalMargin.toString());
                                    }
                                }
                            }}
                            onBlur={() => {
                                const val = parseInt(inputValue);
                                if (!isNaN(val)) {
                                    const autoOffset = totalMargin - manualMargin;
                                    updateLayout(id, { marginTop: val - autoOffset });
                                } else {
                                    setInputValue(totalMargin.toString());
                                }
                            }}
                        />
                        <button
                            onClick={handleMoveDown}
                            className="p-1.5 hover:bg-gray-100 text-gray-600 rounded"
                            title="Move Down"
                        >
                            <ArrowDown size={14} />
                        </button>

                        <div className="w-full h-px bg-gray-100 my-0.5" />

                        <button
                            onClick={handlePageBreak}
                            className="p-1.5 hover:bg-purple-50 text-purple-600 rounded"
                            title="Force Page Break (Add Gap)"
                        >
                            <FileInput size={14} />
                        </button>

                        {manualMargin !== 0 && (
                            <>
                                <div className="w-full h-px bg-gray-100 my-0.5" />
                                <button
                                    onClick={handleReset}
                                    className="p-1.5 hover:bg-red-50 text-red-500 rounded"
                                    title="Reset Spacing"
                                >
                                    <X size={14} />
                                </button>
                            </>
                        )}
                    </div>
                </div>,
                document.body
            )}

            {/* Content */}
            {children}

            {/* Visual Indicator of the total gap (Manual + Auto) */}
            {totalMargin > 0 && (
                <div
                    data-pdf-ignore
                    className="absolute left-0 right-0 -top-[1px] border-l-2 border-t-2 border-r-2 border-dashed border-blue-100 bg-blue-50/10 pointer-events-none print:hidden transition-all"
                    style={{ height: totalMargin, top: -totalMargin }}
                >
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-blue-300 font-mono">
                        {totalMargin}px spacer
                    </div>
                </div>
            )}
        </div>
    );
}
