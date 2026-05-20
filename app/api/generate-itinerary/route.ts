import { GoogleGenerativeAI } from "@google/generative-ai";
import { createMockTrip } from "@/lib/mock-data";
import type { TripFormValues, TripPlan } from "@/types/trip";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = (await request.json()) as TripFormValues;

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(createMockTrip(form));
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = buildTripPrompt(form);
    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(text) as TripPlan;

    return NextResponse.json({
      ...parsed,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      form
    });
  } catch (error) {
    console.error("Gemini itinerary generation failed", error);
    return NextResponse.json(createMockTrip(form));
  }
}

function buildTripPrompt(form: TripFormValues) {
  return `Generate a premium, practical travel itinerary as strict JSON only.

Destination: ${form.destination}
Budget in INR: ${form.budget}
Days: ${form.days}
Travel Style: ${form.style}
Interests: ${form.interests.join(", ")}
Travelers: ${form.travelers}

Return valid JSON matching this TypeScript type:
{
  "destination": string,
  "summary": string,
  "days": [{
    "day": number,
    "theme": string,
    "estimatedCost": number,
    "activities": [
      { "time": "Morning", "title": string, "description": string, "cost": number, "location": string },
      { "time": "Afternoon", "title": string, "description": string, "cost": number, "location": string },
      { "time": "Evening", "title": string, "description": string, "cost": number, "location": string }
    ],
    "food": string[],
    "tips": string[]
  }],
  "hotels": [{ "name": string, "priceRange": string, "rating": number, "distanceFromCenter": string, "vibe": string }],
  "budget": { "hotel": number, "food": number, "transport": number, "activities": number, "emergency": number },
  "attractions": [{ "name": string, "category": string, "lat": number, "lng": number }],
  "packingChecklist": string[],
  "hiddenGems": string[],
  "weatherTips": string[],
  "scamWarnings": string[],
  "bestTimeToVisit": string
}

Make costs add up close to the budget. Include weather-aware tips, local scam warnings, hidden gems, and packing advice.`;
}
