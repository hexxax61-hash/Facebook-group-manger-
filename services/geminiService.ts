import { GoogleGenAI } from "@google/genai";

// Ensure the API key is handled securely and not exposed in client-side code.
// For this project, we assume it's set in the environment variables.
const API_KEY = process.env.API_KEY;

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

if (!API_KEY) {
    console.warn("Gemini API key not found. AI features will be disabled.");
}

export const generatePostIdea = async (topic: string): Promise<string> => {
    if (!ai) {
        return Promise.resolve("AI functionality is disabled. Please configure your API key.");
    }

    try {
        const prompt = `Generate a short, engaging social media post idea for a community group about "${topic}". The post should be friendly and encourage interaction. Don't include hashtags.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating post idea:", error);
        return "Sorry, I couldn't generate an idea right now. Please try again later.";
    }
};