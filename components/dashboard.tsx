"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { TripPlan } from "@/types/trip";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CalendarCheck2, Heart, PlaneTakeoff, TrendingUp } from "lucide-react";

type DashboardProps = {
  trips: TripPlan[];
  currentTrip?: TripPlan | null;
  onSelectTrip: (trip: TripPlan) => void;
};

export function Dashboard({ trips, currentTrip, onSelectTrip }: DashboardProps) {
  const activeTrips = currentTrip ? [currentTrip, ...trips.filter((trip) => trip.id !== currentTrip.id)] : trips;
  const stats = [
    { label: "Saved plans", value: trips.length, icon: Heart },
    { label: "Upcoming trips", value: activeTrips.length, icon: PlaneTakeoff },
    { label: "Planned days", value: activeTrips.reduce((sum, trip) => sum + trip.days.length, 0), icon: CalendarCheck2 },
    { label: "Avg budget", value: activeTrips.length ? formatCurrency(activeTrips.reduce((sum, trip) => sum + trip.form.budget, 0) / activeTrips.length) : "₹0", icon: TrendingUp }
  ];
  const chartData = activeTrips.slice(0, 5).map((trip) => ({ destination: trip.destination, budget: trip.form.budget }));

  return (
    <Card id="dashboard" className="scroll-mt-24">
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Dashboard</p>
          <h2 className="mt-2 text-3xl font-black">Your travel command center</h2>
        </div>
        <Badge>{activeTrips.length ? "Live data" : "Empty state"}</Badge>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-lg border bg-card/55 p-4">
            <Icon className="mb-3 h-5 w-5 text-primary" />
            <p className="text-2xl font-black">{value}</p>
            <p className="text-sm text-foreground/62">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.85fr]">
        <div className="h-72 rounded-lg border bg-card/55 p-4">
          {chartData.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="destination" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="budget" fill="#14b8a6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-center text-sm text-foreground/65">Generate or save a trip to see travel statistics.</div>
          )}
        </div>

        <div className="rounded-lg border bg-card/55 p-4">
          <p className="mb-3 font-black">Recently viewed destinations</p>
          <div className="space-y-2">
            {activeTrips.length ? activeTrips.slice(0, 5).map((trip) => (
              <button key={trip.id ?? trip.destination} onClick={() => onSelectTrip(trip)} className="w-full rounded-lg border bg-background/45 p-3 text-left transition hover:bg-muted">
                <p className="font-semibold">{trip.destination}</p>
                <p className="text-sm text-foreground/60">{trip.days.length} days · {formatCurrency(trip.form.budget)}</p>
              </button>
            )) : (
              <div className="rounded-lg border border-dashed p-6 text-center text-sm text-foreground/65">Your saved plans will appear here.</div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
