"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Card } from "@/components/ui/card";
import type { TripPlan } from "@/types/trip";
import { MapPin, Navigation, Utensils } from "lucide-react";

export function MapPanel({ trip }: { trip: TripPlan }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const markers = trip.attractions.filter((item) => item.lat && item.lng);
  const center = markers[0] ? { lat: markers[0].lat!, lng: markers[0].lng! } : { lat: 15.2993, lng: 74.124 };

  return (
    <Card id="map" className="scroll-mt-24">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Google Maps</p>
          <h2 className="mt-2 text-2xl font-black">Explore {trip.destination}</h2>
        </div>
        <a className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trip.destination)}`} target="_blank">
          <Navigation size={16} /> Navigate
        </a>
      </div>

      {apiKey ? (
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap mapContainerClassName="h-80 w-full rounded-lg" center={center} zoom={12}>
            {markers.map((attraction) => (
              <Marker key={attraction.name} position={{ lat: attraction.lat!, lng: attraction.lng! }} title={attraction.name} />
            ))}
          </GoogleMap>
        </LoadScript>
      ) : (
        <div className="relative h-80 overflow-hidden rounded-lg border bg-[linear-gradient(135deg,rgba(20,184,166,0.22),rgba(14,165,233,0.16),rgba(236,72,153,0.18))]">
          <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:42px_42px]" />
          <div className="absolute left-[-8%] top-1/2 h-5 w-[120%] -rotate-12 rounded-full bg-white/25 shadow-[0_0_0_10px_rgba(255,255,255,0.06)]" />
          <div className="absolute left-[18%] top-[-10%] h-[120%] w-4 rotate-[24deg] rounded-full bg-white/20 shadow-[0_0_0_8px_rgba(255,255,255,0.05)]" />
          <div className="absolute bottom-5 left-5 rounded-lg bg-background/80 p-4 backdrop-blur">
            <p className="text-sm font-black">Smart map preview</p>
            <p className="mt-1 text-xs text-foreground/65">Attractions and food stops are ready for live navigation.</p>
          </div>
          {trip.attractions.slice(0, 4).map((attraction, index) => {
            const positions = [
              "left-[18%] top-[28%]",
              "left-[58%] top-[22%]",
              "left-[72%] top-[58%]",
              "left-[35%] top-[68%]"
            ];

            return (
              <div key={attraction.name} className={`absolute ${positions[index]} flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-background/90 px-3 py-2 text-xs font-semibold shadow-lg backdrop-blur`}>
                <MapPin className="h-4 w-4 text-primary" />
                {attraction.name.replace(trip.destination, "").trim() || attraction.category}
              </div>
            );
          })}
          <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-background/85 px-3 py-2 text-xs font-semibold shadow-lg backdrop-blur">
            <Utensils className="h-4 w-4 text-secondary" />
            Nearby restaurants
          </div>
        </div>
      )}

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {trip.attractions.map((attraction) => (
          <div key={attraction.name} className="rounded-lg border bg-card/55 p-3 text-sm">
            <p className="font-semibold">{attraction.name}</p>
            <p className="text-foreground/60">{attraction.category}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
