import { createMockTrip } from "@/lib/mock-data";
import type { TripFormValues, TripPlan } from "@/types/trip";

export async function generateItinerary(form: TripFormValues): Promise<TripPlan> {
  const response = await fetch("/api/generate-itinerary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form)
  });

  if (!response.ok) {
    return createMockTrip(form);
  }

  const data = (await response.json()) as TripPlan;
  return data.destination ? data : createMockTrip(form);
}
