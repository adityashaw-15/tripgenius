import type { BudgetBreakdown, TripFormValues, TripPlan } from "@/types/trip";

function splitBudget(total: number): BudgetBreakdown {
  return {
    hotel: Math.round(total * 0.38),
    food: Math.round(total * 0.2),
    transport: Math.round(total * 0.16),
    activities: Math.round(total * 0.18),
    emergency: Math.round(total * 0.08)
  };
}

export function createMockTrip(form: TripFormValues): TripPlan {
  const perDay = Math.max(Math.round(form.budget / Math.max(form.days, 1)), 1200);
  const days = Array.from({ length: form.days }, (_, index) => {
    const day = index + 1;

    return {
      day,
      theme: day === 1 ? "Arrival, icons, and first tastes" : day % 2 === 0 ? "Culture, food lanes, and hidden corners" : "Nature, markets, and sunset views",
      estimatedCost: Math.round(perDay * (day === 1 ? 0.9 : 1)),
      activities: [
        {
          time: "Morning" as const,
          title: day === 1 ? `Land in ${form.destination} and settle in` : `Explore a signature ${form.interests[0] ?? "local"} district`,
          description: `Start easy with a smart route that keeps commute time low for ${form.travelers} traveler${form.travelers > 1 ? "s" : ""}.`,
          cost: Math.round(perDay * 0.22),
          location: `${form.destination} city center`
        },
        {
          time: "Afternoon" as const,
          title: "Local experience block",
          description: `Blend ${form.style.toLowerCase()} travel with ${form.interests.slice(0, 3).join(", ") || "classic sightseeing"} and a flexible lunch stop.`,
          cost: Math.round(perDay * 0.34),
          location: `${form.destination} old town`
        },
        {
          time: "Evening" as const,
          title: "Sunset walk and dinner shortlist",
          description: "Wind down near a well-lit area with easy rides back to the hotel.",
          cost: Math.round(perDay * 0.24),
          location: `${form.destination} promenade`
        }
      ],
      food: ["Local breakfast plate", "Highly rated street food crawl", "Dinner at a neighborhood favorite"],
      tips: ["Pre-book peak attractions", "Keep offline maps downloaded", "Use licensed taxis or app-based transport"]
    };
  });

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    destination: form.destination,
    summary: `${form.days}-day ${form.style.toLowerCase()} itinerary for ${form.destination}, tuned to ${form.interests.join(", ") || "balanced discovery"}.`,
    form,
    days,
    hotels: [
      { name: `${form.destination} Skyview Suites`, priceRange: "₹7,500 - ₹12,000/night", rating: 4.7, distanceFromCenter: "1.2 km", vibe: "Premium skyline stay" },
      { name: `Nomad Nest ${form.destination}`, priceRange: "₹3,200 - ₹5,800/night", rating: 4.4, distanceFromCenter: "2.4 km", vibe: "Modern budget boutique" },
      { name: `Heritage House ${form.destination}`, priceRange: "₹5,000 - ₹8,500/night", rating: 4.6, distanceFromCenter: "0.9 km", vibe: "Walkable local charm" }
    ],
    budget: splitBudget(form.budget),
    attractions: [
      { name: `${form.destination} Central Market`, category: "Shopping" },
      { name: `${form.destination} Heritage Walk`, category: "History" },
      { name: `${form.destination} Viewpoint`, category: "Nature" },
      { name: `${form.destination} Food Street`, category: "Food" }
    ],
    packingChecklist: ["Reusable water bottle", "Power bank", "Comfortable walking shoes", "Light rain layer", "Printed ID copies"],
    hiddenGems: [`A quiet sunrise viewpoint outside ${form.destination}`, "Family-run cafe with regional specials", "Local artisan lane away from peak crowds"],
    weatherTips: ["Check hourly forecasts before outdoor blocks", "Keep one indoor backup per day", "Carry breathable layers for long sightseeing days"],
    scamWarnings: ["Confirm taxi fare before starting", "Avoid unofficial attraction guides", "Buy tickets only through official counters or verified apps"],
    bestTimeToVisit: "Shoulder season is ideal for better hotel rates, fewer queues, and comfortable weather."
  };
}
