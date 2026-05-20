"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import type { TripPlan } from "@/types/trip";
import { ChevronDown, Clock, Lightbulb, Utensils } from "lucide-react";
import { useState } from "react";

export function ItineraryCards({ trip }: { trip: TripPlan }) {
  const [openDay, setOpenDay] = useState(1);

  return (
    <Card>
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">AI Itinerary</p>
          <h2 className="mt-2 text-3xl font-black">{trip.destination}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground/70">{trip.summary}</p>
        </div>
        <Badge>{trip.days.length} days</Badge>
      </div>

      <div className="space-y-3">
        {trip.days.map((day) => {
          const expanded = openDay === day.day;
          return (
            <div key={day.day} className="overflow-hidden rounded-lg border bg-card/55">
              <button className="flex w-full items-center justify-between gap-3 p-4 text-left" onClick={() => setOpenDay(expanded ? 0 : day.day)}>
                <div>
                  <p className="font-black">Day {day.day}: {day.theme}</p>
                  <p className="text-sm text-foreground/62">{formatCurrency(day.estimatedCost)} estimated</p>
                </div>
                <ChevronDown className={`h-5 w-5 transition ${expanded ? "rotate-180" : ""}`} />
              </button>
              {expanded && (
                <div className="grid gap-3 border-t p-4 lg:grid-cols-3">
                  {day.activities.map((activity) => (
                    <div key={`${day.day}-${activity.time}`} className="rounded-lg bg-muted/55 p-4">
                      <Badge className="mb-3 gap-1"><Clock size={12} />{activity.time}</Badge>
                      <h3 className="font-black">{activity.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-foreground/68">{activity.description}</p>
                      <p className="mt-3 text-sm font-semibold">{activity.location} · {formatCurrency(activity.cost)}</p>
                    </div>
                  ))}
                  <div className="rounded-lg bg-muted/55 p-4 lg:col-span-3">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="mb-2 flex items-center gap-2 font-black"><Utensils size={17} /> Food recommendations</p>
                        <ul className="space-y-1 text-sm text-foreground/70">
                          {day.food.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2 flex items-center gap-2 font-black"><Lightbulb size={17} /> Local tips</p>
                        <ul className="space-y-1 text-sm text-foreground/70">
                          {day.tips.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
