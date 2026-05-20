"use client";

import { AiInsights } from "@/components/ai-insights";
import { BudgetBreakdown } from "@/components/budget-breakdown";
import { Dashboard } from "@/components/dashboard";
import { Hero } from "@/components/hero";
import { HotelsSection } from "@/components/hotels-section";
import { ItineraryCards } from "@/components/itinerary-cards";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { MapPanel } from "@/components/map-panel";
import { Navbar } from "@/components/navbar";
import { TravelForm } from "@/components/travel-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { generateItinerary } from "@/services/gemini";
import { loadTrips, saveTrip } from "@/services/trips";
import type { TripFormValues, TripPlan } from "@/types/trip";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function TripGeniusApp() {
  const { user, login, logout } = useAuth();
  const [trip, setTrip] = useState<TripPlan | null>(null);
  const [savedTrips, setSavedTrips] = useState<TripPlan[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTrips(user?.uid).then(setSavedTrips).catch(() => toast.error("Could not load saved trips"));
  }, [user?.uid]);

  async function handleGenerate(values: TripFormValues) {
    setLoading(true);
    try {
      const plan = await generateItinerary(values);
      setTrip(plan);
      toast.success("Your itinerary is ready");
    } catch {
      toast.error("Trip generation failed. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!trip) return;
    await saveTrip(user?.uid, trip);
    const refreshed = await loadTrips(user?.uid);
    setSavedTrips(refreshed);
    toast.success(user ? "Trip saved to Firestore" : "Trip saved locally in demo mode");
  }

  return (
    <main>
      <Navbar user={user} onLogin={login} onLogout={logout} />
      <Hero />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <TravelForm loading={loading} onSubmit={handleGenerate} />
          <Dashboard trips={savedTrips} currentTrip={trip} onSelectTrip={setTrip} />
        </div>

        <div className="space-y-5">
          {loading && <LoadingSkeleton />}
          {!loading && !trip && (
            <Card className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Empty State</p>
              <h2 className="mt-3 text-3xl font-black">Your first smart itinerary will appear here</h2>
              <p className="mt-3 max-w-md text-foreground/68">Try Goa, Tokyo, Jaipur, Dubai, Bali, or anywhere you are curious about. The app works in demo mode until API keys are added.</p>
            </Card>
          )}
          {trip && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <div className="flex justify-end">
                <Button onClick={handleSave}><Save size={17} /> Save trip</Button>
              </div>
              <ItineraryCards trip={trip} />
              <div className="grid gap-5 xl:grid-cols-2">
                <HotelsSection hotels={trip.hotels} />
                <BudgetBreakdown budget={trip.budget} />
              </div>
              <MapPanel trip={trip} />
              <AiInsights trip={trip} />
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
