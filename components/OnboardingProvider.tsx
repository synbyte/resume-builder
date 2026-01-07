'use client';

import React, { useEffect } from 'react';
import { NextStepProvider, NextStep, useNextStep } from 'nextstepjs';
import { Wand2, Brain, Layout, Palette, MoveVertical, FileText, CheckCircle2 } from 'lucide-react';

const steps = [
    {
        tour: 'dashboard',
        steps: [
            {
                icon: <FileText className="w-5 h-5 text-blue-500" />,
                title: 'Welcome to Resume Builder!',
                content: 'Get started by creating your first professional resume with our easy-to-use templates and AI tools.',
                selector: '#onboarding-create-resume',
                side: 'bottom' as const,
                showControls: true,
            }
        ]
    },
    {
        tour: 'editor',
        steps: [
            {
                icon: <Wand2 className="w-5 h-5 text-purple-500" />,
                title: 'AI Generated Duties',
                content: 'Don\'t sweat the wording. Use our AI to generate professional, industry-standard bullet points for your job experience.',
                selector: '#onboarding-ai-duties',
                side: 'right' as const,
                showControls: true,
            },
            {
                icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
                title: 'Skills Management',
                content: 'Add your Technical and Soft skills. These are automatically formatted to look great on any template.',
                selector: '#onboarding-skills',
                side: 'right' as const,
                showControls: true,
            },
            {
                icon: <Brain className="w-5 h-5 text-pink-500" />,
                title: 'AI Assistant',
                content: 'Need more help? Our AI Assistant can rewrite sections, suggest improvements, or even write your summary for you.',
                selector: '#onboarding-ai-assistant',
                side: 'top' as const,
                showControls: true,
            },
            {
                icon: <Layout className="w-5 h-5 text-orange-500" />,
                title: 'Professional Templates',
                content: 'Switch between different layouts instantly. Your content stays safe while you find the perfect look.',
                selector: '#onboarding-templates',
                side: 'bottom' as const,
                showControls: true,
            },
            {
                icon: <Palette className="w-5 h-5 text-blue-500" />,
                title: 'Design Settings',
                content: 'Fine-tune fonts, colors, and margins to make your resume truly unique.',
                selector: '#onboarding-design-settings',
                side: 'bottom' as const,
                showControls: true,
            },
            {
                icon: <MoveVertical className="w-5 h-5 text-slate-500" />,
                title: 'Adjust Spacing',
                content: 'Drag the handles between elements to adjust spacing manually. We handle the pagination automatically!',
                selector: '#onboarding-spacing',
                side: 'left' as const,
                showControls: true,
            }
        ]
    }
];

import { usePathname } from 'next/navigation';

export function OnboardingManager() {
    const { startNextStep } = useNextStep();
    const pathname = usePathname();

    useEffect(() => {
        const isDashboard = pathname === '/dashboard';
        const isEditor = pathname.startsWith('/resume/');

        if (isDashboard) {
            const hasSeenDashboard = localStorage.getItem('hasSeenDashboard');
            if (!hasSeenDashboard) {
                const timer = setTimeout(() => {
                    startNextStep('dashboard');
                    localStorage.setItem('hasSeenDashboard', 'true');
                }, 1500);
                return () => clearTimeout(timer);
            }
        }

        if (isEditor) {
            const hasSeenEditor = localStorage.getItem('hasSeenEditor');
            if (!hasSeenEditor) {
                const timer = setTimeout(() => {
                    startNextStep('editor');
                    localStorage.setItem('hasSeenEditor', 'true');
                }, 1500);
                return () => clearTimeout(timer);
            }
        }
    }, [startNextStep, pathname]);

    return null;
}

export default function OnboardingProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextStepProvider>
            <NextStep steps={steps}>
                {children}
                <OnboardingManager />
            </NextStep>
        </NextStepProvider>
    );
}
