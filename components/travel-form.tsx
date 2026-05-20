"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import type { TripFormValues, TravelStyle } from "@/types/trip";
import { Loader2, WandSparkles } from "lucide-react";

const interests = ["Food", "Nature", "Shopping", "Nightlife", "History", "Beaches"];
const styles: TravelStyle[] = ["Luxury", "Budget", "Adventure", "Family", "Solo"];

const schema = z.object({
  destination: z.string().min(2, "Destination is required"),
  budget: z.coerce.number().min(1000, "Budget should be at least ₹1,000"),
  days: z.coerce.number().min(1).max(21),
  style: z.enum(["Luxury", "Budget", "Adventure", "Family", "Solo"]),
  interests: z.array(z.string()).min(1, "Choose at least one interest"),
  travelers: z.coerce.number().min(1).max(20)
});

type TravelFormProps = {
  loading: boolean;
  onSubmit: (values: TripFormValues) => Promise<void>;
};

export function TravelForm({ loading, onSubmit }: TravelFormProps) {
  const form = useForm<TripFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      destination: "Goa",
      budget: 45000,
      days: 4,
      style: "Adventure",
      interests: ["Food", "Beaches", "Nature"],
      travelers: 2
    }
  });

  return (
    <Card id="planner" className="scroll-mt-24">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Trip Builder</p>
        <h2 className="mt-2 text-3xl font-black">Tell TripGenius what you like</h2>
      </div>
      <form className="grid gap-4 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
        <label className="space-y-2">
          <span className="text-sm font-semibold">Destination</span>
          <Input placeholder="Paris, Bali, Manali..." {...form.register("destination")} />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold">Budget</span>
          <Input type="number" {...form.register("budget")} />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold">Number of days</span>
          <Input type="number" {...form.register("days")} />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold">Travel style</span>
          <Select {...form.register("style")}>
            {styles.map((style) => <option key={style}>{style}</option>)}
          </Select>
        </label>
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-semibold">Number of travelers</span>
          <Input type="number" {...form.register("travelers")} />
        </label>
        <Controller
          name="interests"
          control={form.control}
          render={({ field }) => (
            <div className="space-y-3 md:col-span-2">
              <span className="text-sm font-semibold">Interests</span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {interests.map((interest) => {
                  const selected = field.value.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      className={`rounded-lg border px-3 py-3 text-left text-sm font-semibold transition ${selected ? "border-primary bg-primary/15 text-primary" : "bg-card/60 hover:bg-muted"}`}
                      onClick={() => field.onChange(selected ? field.value.filter((item) => item !== interest) : [...field.value, interest])}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        />
        <div className="md:col-span-2">
          <Button className="w-full sm:w-auto" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <WandSparkles size={17} />}
            Generate AI itinerary
          </Button>
        </div>
      </form>
    </Card>
  );
}
