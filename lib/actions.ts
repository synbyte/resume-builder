'use server';

import { prisma } from './prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ResumeData } from './types';
import { createClient } from './supabase/server';

// Helper to get the current authenticated user ID
async function getUserId() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect('/login');
    }
    return user.id;
}

export async function getCurrentUser() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

export async function getResumes() {
    try {
        const userId = await getUserId();
        return await prisma.resumes.findMany({
            where: { user_id: userId },
            orderBy: { updated_at: 'desc' },
        });
    } catch (error) {
        if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) throw error;
        console.error('Failed to fetch resumes:', error);
        throw new Error('Failed to load resumes. Please try again.');
    }
}

export async function createResume(title: string, template?: string) {
    try {
        const userId = await getUserId();

        const resume = await prisma.resumes.create({
            data: {
                user_id: userId,
                title: title || 'Untitled Resume',
                content: template ? { selectedTemplate: template } : {},
                status: 'draft',
            },
        });

        revalidatePath('/dashboard');
        return resume.id;
    } catch (error) {
        if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) throw error;
        console.error('Failed to create resume:', error);
        throw new Error('Failed to create resume. Please try again.');
    }
}

export async function deleteResume(id: string) {
    try {
        const userId = await getUserId();
        await prisma.resumes.delete({
            where: {
                id,
                user_id: userId
            },
        });
        revalidatePath('/dashboard');
    } catch (error) {
        if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) throw error;
        console.error('Failed to delete resume:', error);
        throw new Error('Failed to delete resume. Please try again.');
    }
}

export async function renameResume(id: string, title: string) {
    try {
        const userId = await getUserId();
        await prisma.resumes.update({
            where: {
                id,
                user_id: userId
            },
            data: {
                title,
                updated_at: new Date(),
            },
        });
        revalidatePath(`/resume/${id}`);
        revalidatePath('/dashboard');
    } catch (error) {
        if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) throw error;
        throw error;
    }
}

export async function updateResume(id: string, data: ResumeData) {
    try {
        const userId = await getUserId();
        await prisma.resumes.update({
            where: {
                id,
                user_id: userId
            },
            data: {
                content: data as any,
                updated_at: new Date(),
            },
        });
        revalidatePath(`/resume/${id}`);
    } catch (error) {
        if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) throw error;
        throw error;
    }
}

export async function getResume(id: string) {
    try {
        const userId = await getUserId();
        const resume = await prisma.resumes.findFirst({
            where: {
                id,
                user_id: userId
            },
        });
        return resume;
    } catch (error) {
        if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) throw error;
        throw error;
    }
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/login');
}
