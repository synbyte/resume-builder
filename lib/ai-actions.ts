'use server';

import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''
});

// Helper to clean up AI response list
function parseList(text: string): string[] {
    return text.split('\n')
        .map(line => line.replace(/^[\s-•*]+/, '').trim())
        .filter(line => line.length > 0);
}

export async function generateSummary(jobTitle: string, experience: string) {
    if (!process.env.GEMINI_API_KEY) return "Error: API Key missing.";

    const prompt = `Write a professional resume summary for a ${jobTitle}. 
  Experience highlights: ${experience}. 
  Keep it under 50 words, professional tone.`;

    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.0-flash', // Or gemini-1.5-flash if 2.0 not available
            contents: prompt,
        });
        return response.text || '';
    } catch (error) {
        console.error('AI Error:', error);
        return "Failed to generate summary.";
    }
}

export async function generateSkills(jobTitle: string) {
    if (!process.env.GEMINI_API_KEY) return [];

    const prompt = `List 8-10 key professional skills for a ${jobTitle}. 
  Return only the skills, one per line. No bullets or numbering.`;

    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
        });
        return parseList(response.text || '');
    } catch (error) {
        console.error('AI Error:', error);
        return [];
    }
}

export async function generateJobDuties(jobTitle: string, company: string) {
    if (!process.env.GEMINI_API_KEY) return [];

    const prompt = `Write 3-4 professional resume bullet points for a ${jobTitle} role at ${company}.
  Focus on achievements and action verbs. Keep them concise.
  Return only the bullet points, one per line. No numbering.`;

    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
        });
        return parseList(response.text || '');
    } catch (error) {
        console.error('AI Error:', error);
        return [];
    }
}

export async function improveSummary(currentText: string) {
    if (!process.env.GEMINI_API_KEY) return "Error: API Key missing.";

    const prompt = `Rewrite and improve the following professional resume summary. 
  Make it more impactful, concise, and professional. Fix any grammar issues.
  Keep it under 60 words.
  
  Current text: "${currentText}"
  
  Return only the improved text.`;

    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
        });
        return response.text?.trim() || currentText;
    } catch (error) {
        console.error('AI Error:', error);
        return currentText; // Return original if failed
    }
}

export async function processResumeEdit(prompt: string, currentData: any) {
    const systemPrompt = `You are an expert resume designer. You help users modify their resume by interpreting natural language commands.
You will receive the current ResumeData object and a user request.
Your task is to return a JSON object that contains ONLY THE UPDATED fields of the ResumeData.

The ResumeData structure includes:
- personalInfo: { fullName, email, phone, linkedin, website }
- summary: string
- experience: Array<{ id, company, title, startDate, endDate, duties }>
- skills: Array<string>
- education: Array<{ id, school, degree, year }>
- designSettings: { fontFamily, baseFontSize, primaryColor, headingSizes: { h1, h2, h3 }, lineHeight }
- selectedTemplate: string (Available: 'Modern', 'Classic', 'Minimal', 'Professional', 'Creative', 'Elegant', 'Tech', 'Timeline', 'Compact', 'Bold')
- layout: Record<string, { marginTop: number, forcedBreak: boolean }> where keys are element IDs.

Guidelines:
1. ONLY return the fields that have changed. 
2. For top-level objects like 'personalInfo' or 'designSettings', you can return only the sub-fields that changed.
3. For arrays like 'experience', 'education', or 'skills', return the ENTIRE updated array if any item within it changed.
4. For the 'layout' record, return only the specific keys that were updated.
5. If the user says 'make font smaller', reduce baseFontSize by 1 (min 10).
6. If the user says 'make font larger', increase baseFontSize by 1 (max 18).
7. If the user says 'change color to X', update primaryColor.
8. If the user says 'add spacing above X', update the marginTop in the layout object for that ID.

IMPORTANT: Strictly return ONLY raw JSON. No markdown code blocks.`;

    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: `${systemPrompt}\n\nCurrent Resume Data: ${JSON.stringify(currentData)}\n\nUser Request: "${prompt}"`,
        });

        const text = response.text || '';
        // Clean up text just in case AI adds markdown
        const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error('AI Edit Error:', error);
        throw error;
    }
}
