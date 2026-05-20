"use client";

import { db } from "@/firebase/config";
import type { TripPlan } from "@/types/trip";
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";

const localKey = "tripgenius.savedTrips";

export async function saveTrip(userId: string | undefined, trip: TripPlan) {
  if (db && userId) {
    await addDoc(collection(db, "users", userId, "trips"), {
      ...trip,
      createdAt: serverTimestamp()
    });
    return;
  }

  const existing = loadLocalTrips();
  localStorage.setItem(localKey, JSON.stringify([{ ...trip, id: trip.id ?? crypto.randomUUID(), createdAt: new Date().toISOString() }, ...existing]));
}

export async function loadTrips(userId: string | undefined): Promise<TripPlan[]> {
  if (db && userId) {
    const snapshot = await getDocs(query(collection(db, "users", userId, "trips"), orderBy("createdAt", "desc")));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TripPlan[];
  }

  return loadLocalTrips();
}

function loadLocalTrips(): TripPlan[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(localKey) ?? "[]") as TripPlan[];
  } catch {
    return [];
  }
}
