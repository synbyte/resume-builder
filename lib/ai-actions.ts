'use server';

import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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
