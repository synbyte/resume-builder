import { z } from 'zod';

export const ExperienceSchema = z.object({
    id: z.string(),
    company: z.string(),
    title: z.string(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    duties: z.array(z.string()),
});

export const EducationSchema = z.object({
    id: z.string(),
    school: z.string(),
    degree: z.string(),
    year: z.string().optional(),
});

export const ResumeDataSchema = z.object({
    personalInfo: z.object({
        fullName: z.string().optional(),
        email: z.string().email().optional().or(z.literal('')),
        phone: z.string().optional(),
        linkedin: z.string().optional(),
        website: z.string().optional(),
    }).optional(),
    summary: z.string().optional(),
    experience: z.array(ExperienceSchema).optional(),
    skills: z.array(z.string()).optional(),
    education: z.array(EducationSchema).optional(),
    layout: z.record(z.string(), z.object({
        marginTop: z.number().optional(),
        forcedBreak: z.boolean().optional(),
    })).optional(),
    designSettings: z.object({
        fontFamily: z.string(),
        baseFontSize: z.number(),
        primaryColor: z.string(),
        headingSizes: z.object({
            h1: z.number(),
            h2: z.number(),
            h3: z.number(),
        }),
        lineHeight: z.number(),
    }).optional(),
    templateSettings: z.record(z.string(), z.object({
        fontFamily: z.string(),
        baseFontSize: z.number(),
        primaryColor: z.string(),
        headingSizes: z.object({
            h1: z.number(),
            h2: z.number(),
            h3: z.number(),
        }),
        lineHeight: z.number(),
    })).optional(),
    templateLayouts: z.record(z.string(), z.record(z.string(), z.object({
        marginTop: z.number().optional(),
        forcedBreak: z.boolean().optional(),
    }))).optional(),
    selectedTemplate: z.string().optional(),
});

export type ResumeData = z.infer<typeof ResumeDataSchema>;
