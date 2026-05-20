export type TravelStyle = "Luxury" | "Budget" | "Adventure" | "Family" | "Solo";

export type TripFormValues = {
  destination: string;
  budget: number;
  days: number;
  style: TravelStyle;
  interests: string[];
  travelers: number;
};

export type ItineraryActivity = {
  time: "Morning" | "Afternoon" | "Evening";
  title: string;
  description: string;
  cost: number;
  location: string;
};

export type ItineraryDay = {
  day: number;
  theme: string;
  activities: ItineraryActivity[];
  food: string[];
  tips: string[];
  estimatedCost: number;
};

export type HotelRecommendation = {
  name: string;
  priceRange: string;
  rating: number;
  distanceFromCenter: string;
  vibe: string;
};

export type BudgetBreakdown = {
  hotel: number;
  food: number;
  transport: number;
  activities: number;
  emergency: number;
};

export type Attraction = {
  name: string;
  category: string;
  lat?: number;
  lng?: number;
};

export type TripPlan = {
  id?: string;
  createdAt?: string;
  destination: string;
  summary: string;
  form: TripFormValues;
  days: ItineraryDay[];
  hotels: HotelRecommendation[];
  budget: BudgetBreakdown;
  attractions: Attraction[];
  packingChecklist: string[];
  hiddenGems: string[];
  weatherTips: string[];
  scamWarnings: string[];
  bestTimeToVisit: string;
};
