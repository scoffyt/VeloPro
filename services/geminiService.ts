
import { GoogleGenAI, Type } from "@google/genai";
import { Activity } from "../types";

// Fix: Strictly follow initialization guidelines for API key
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIInsights = async (activity: Activity) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this cycling activity and provide coaching advice in Portuguese.
        Activity: ${activity.title}
        Distance: ${activity.distance}km
        Duration: ${activity.duration} seconds
        Avg Speed: ${activity.avgSpeed}km/h
        Elevation Gain: ${activity.elevation}m
        Calories: ${activity.calories}
        Provide:
        1. A summary of performance quality.
        2. One specific tip for improvement (e.g., cadence, power output, or recovery).
        3. A suggested difficulty for the next ride.`,
      config: {
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            performance_analysis: { type: Type.STRING },
            improvement_tip: { type: Type.STRING },
            next_step: { type: Type.STRING },
          },
          required: ["performance_analysis", "improvement_tip", "next_step"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Insights Error:", error);
    return null;
  }
};

export const suggestRoute = async (userProfile: any, city: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Como um especialista em ciclismo local, sugira 3 rotas populares em ${city} para uma bike do tipo ${userProfile.bikeType}.
      Nível do ciclista: ${userProfile.level}.`,
      config: {
        temperature: 0.8,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              difficulty: { type: Type.STRING },
              estimated_km: { type: Type.NUMBER },
              description: { type: Type.STRING }
            },
            required: ["name", "difficulty", "estimated_km", "description"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Route Suggestion Error:", error);
    return [];
  }
};
