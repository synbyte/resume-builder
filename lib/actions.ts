'use server';

import { prisma } from './prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ResumeData } from './types';

// Helper to get a default user ID for this internal tool.
// In a real app, this would come from the session.
async function getUserId() {
    // Try to find the first user in the DB.
    const user = await prisma.users.findFirst();
    if (!user) {
        throw new Error('No users found in database. Cannot create resume.');
    }
    return user.id;
}

export async function getResumes() {
    try {
        return await prisma.resumes.findMany({
            orderBy: { updated_at: 'desc' },
        });
    } catch (error) {
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
        console.error('Failed to create resume:', error);
        throw new Error('Failed to create resume. Please try again.');
    }
}

export async function deleteResume(id: string) {
    try {
        await prisma.resumes.delete({
            where: { id },
        });
        revalidatePath('/dashboard');
    } catch (error) {
        console.error('Failed to delete resume:', error);
        throw new Error('Failed to delete resume. Please try again.');
    }
}

export async function renameResume(id: string, title: string) {
    await prisma.resumes.update({
        where: { id },
        data: {
            title,
            updated_at: new Date(),
        },
    });
    revalidatePath(`/resume/${id}`);
    revalidatePath('/dashboard');
}

export async function updateResume(id: string, data: ResumeData) {
    await prisma.resumes.update({
        where: { id },
        data: {
            content: data as any, // Prisma Json type needs explicit casting or is compatible
            updated_at: new Date(),
        },
    });
    revalidatePath(`/resume/${id}`);
}

export async function getResume(id: string) {
    const resume = await prisma.resumes.findUnique({
        where: { id },
    });
    return resume;
}
