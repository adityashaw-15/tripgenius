"use client";

import { auth, googleProvider, isFirebaseConfigured } from "@/firebase/config";
import { onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type AuthUser = Pick<User, "uid" | "displayName" | "email" | "photoURL">;

const demoUserKey = "tripgenius.demoUser";
const demoUser: AuthUser = {
  uid: "demo-traveler",
  displayName: "Demo Traveler",
  email: "demo@tripgenius.app",
  photoURL: null
};

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      const savedDemoUser = localStorage.getItem(demoUserKey);
      if (savedDemoUser) {
        setUser(JSON.parse(savedDemoUser) as AuthUser);
      }
      setLoading(false);
      return;
    }

    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  async function login() {
    if (!auth || !isFirebaseConfigured) {
      localStorage.setItem(demoUserKey, JSON.stringify(demoUser));
      setUser(demoUser);
      toast.success("Signed in as Demo Traveler");
      return;
    }

    await signInWithPopup(auth, googleProvider);
    toast.success("Signed in with Google");
  }

  async function logout() {
    if (!auth || !isFirebaseConfigured) {
      localStorage.removeItem(demoUserKey);
      setUser(null);
      toast.success("Signed out");
      return;
    }

    await signOut(auth);
    toast.success("Signed out");
  }

  return { user, loading, login, logout, isFirebaseConfigured };
}
