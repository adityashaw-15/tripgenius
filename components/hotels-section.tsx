import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { HotelRecommendation } from "@/types/trip";
import { Building2, MapPin, Star } from "lucide-react";

export function HotelsSection({ hotels }: { hotels: HotelRecommendation[] }) {
  return (
    <Card>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Hotels</p>
      <h2 className="mt-2 text-2xl font-black">Recommended stays</h2>
      <div className="mt-5 grid gap-3">
        {hotels.map((hotel) => (
          <div key={hotel.name} className="rounded-lg border bg-card/55 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 font-black"><Building2 size={17} />{hotel.name}</p>
                <p className="mt-1 text-sm text-foreground/68">{hotel.vibe}</p>
              </div>
              <Badge className="gap-1"><Star size={12} className="fill-secondary text-secondary" />{hotel.rating}</Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-foreground/70">
              <Badge>{hotel.priceRange}</Badge>
              <Badge className="gap-1"><MapPin size={12} />{hotel.distanceFromCenter} from center</Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
