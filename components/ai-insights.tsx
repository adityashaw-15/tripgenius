import { Card } from "@/components/ui/card";
import type { TripPlan } from "@/types/trip";
import { AlertTriangle, CalendarDays, Gem, Luggage, Umbrella } from "lucide-react";

export function AiInsights({ trip }: { trip: TripPlan }) {
  const sections = [
    { title: "Packing checklist", icon: Luggage, items: trip.packingChecklist },
    { title: "Hidden gems", icon: Gem, items: trip.hiddenGems },
    { title: "Weather-aware tips", icon: Umbrella, items: trip.weatherTips },
    { title: "Local scam warnings", icon: AlertTriangle, items: trip.scamWarnings }
  ];

  return (
    <Card>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Bonus AI</p>
      <h2 className="mt-2 text-2xl font-black">Travel intelligence</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {sections.map(({ title, icon: Icon, items }) => (
          <div key={title} className="rounded-lg border bg-card/55 p-4">
            <p className="mb-3 flex items-center gap-2 font-black"><Icon size={18} />{title}</p>
            <ul className="space-y-2 text-sm leading-6 text-foreground/70">
              {items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg border bg-primary/10 p-4 text-sm">
        <p className="mb-1 flex items-center gap-2 font-black"><CalendarDays size={18} />Best time to visit</p>
        <p className="text-foreground/72">{trip.bestTimeToVisit}</p>
      </div>
    </Card>
  );
}
