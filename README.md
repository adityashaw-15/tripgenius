# TripGenius

TripGenius is a modern full-stack AI travel planner built for the Google PromptSprint topic “AI Travel Planner”.

It uses Next.js App Router, Tailwind CSS, Firebase Authentication, Firestore, Google Gemini API, Google Maps, Framer Motion, React Hook Form, and Recharts. The app also has a mock fallback, so it runs as a polished demo even before API keys are configured.

## Features

- Firebase Google Sign In and user profile display
- Beautiful travel form for destination, budget, days, travel style, interests, and travelers
- Gemini-powered itinerary generation with a strict JSON response shape
- Day-wise expandable itinerary cards with morning, afternoon, and evening activities
- Hotel recommendations with price, rating, distance, and stay vibe
- Budget breakdown with chart and progress bars
- Google Maps destination panel with attraction markers when a Maps key is available
- Firestore saved trips for signed-in users
- Local saved trips fallback for demo mode
- Dashboard with upcoming trips, saved plans, travel stats, and recent destinations
- AI packing checklist, hidden gems, weather tips, scam warnings, and best time to visit
- Dark/light mode, animated gradients, glassmorphism cards, loading skeletons, empty states, and toast notifications

## Getting Started

Install dependencies:

```bash
npm install
```

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Fill in the keys you have:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
GEMINI_API_KEY=
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Firebase Setup

1. Create a Firebase project.
2. Enable Authentication > Google provider.
3. Create a Firestore database.
4. Add your web app credentials to `.env.local`.
5. Add your local domain to Firebase authorized domains if needed.

Firestore path used by the app:

```text
users/{userId}/trips/{tripId}
```

## Gemini Setup

Add `GEMINI_API_KEY` to `.env.local`. The route at `app/api/generate-itinerary/route.ts` calls Gemini and asks for strict JSON that the frontend can render directly.

If the Gemini key is missing or the API fails, TripGenius returns mock itinerary data so demos still work.

## Google Maps Setup

Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` to show the live map. Without it, TripGenius shows a clean map-ready empty state and a Google Maps navigation link.

## Project Structure

```text
app/
components/
components/ui/
firebase/
hooks/
lib/
services/
types/
```

## Build

```bash
npm run build
```
