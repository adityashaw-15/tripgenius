"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-12 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:pb-20 lg:pt-16">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="flex flex-col justify-center">
        <Badge className="mb-5 w-fit gap-2"><Sparkles size={13} /> Gemini-powered trip intelligence</Badge>
        <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-normal md:text-7xl">
          TripGenius builds the trip before the tabs multiply.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground/72">
          Enter a destination, budget, vibe, and interests. Get a day-wise itinerary, hotel shortlist, map-aware attractions, budget plan, packing checklist, and local travel intelligence.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={() => document.querySelector("#planner")?.scrollIntoView({ behavior: "smooth" })}>
            Build my trip <ArrowDown size={17} />
          </Button>
          <Button variant="ghost" onClick={() => document.querySelector("#dashboard")?.scrollIntoView({ behavior: "smooth" })}>View dashboard</Button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.1 }} className="relative min-h-[420px] overflow-hidden rounded-lg glass">
        <div className="absolute inset-0 animated-gradient animate-gradient-flow opacity-85" />
        <div className="absolute inset-x-6 top-6 rounded-lg bg-white/18 p-4 text-white backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em]">Live Preview</p>
          <h2 className="mt-2 text-3xl font-black">Tokyo in 5 days</h2>
          <p className="mt-1 text-white/80">Food markets, neon walks, temples, skyline views</p>
        </div>
        <div className="absolute bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-3">
          {["Day plans", "Budget", "Hidden gems"].map((item, index) => (
            <div key={item} className="rounded-lg bg-white/20 p-4 text-white backdrop-blur-xl" style={{ animationDelay: `${index * 0.3}s` }}>
              <p className="text-2xl font-black">{index === 0 ? "5" : index === 1 ? "₹92k" : "12"}</p>
              <p className="text-sm text-white/78">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
