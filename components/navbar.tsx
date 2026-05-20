"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Moon, Plane, Sun, UserRound } from "lucide-react";
import type { AuthUser } from "@/hooks/use-auth";

type NavbarProps = {
  user: AuthUser | null;
  onLogin: () => void;
  onLogout: () => void;
};

export function Navbar({ user, onLogin, onLogout }: NavbarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b bg-background/72 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg animated-gradient animate-gradient-flow text-white shadow-glow">
            <Plane size={20} />
          </span>
          <div>
            <p className="text-lg font-black tracking-tight">TripGenius</p>
            <p className="text-xs text-foreground/60">AI travel planner</p>
          </div>
        </div>

        <nav className="hidden items-center gap-5 text-sm font-medium text-foreground/70 md:flex">
          <a href="#planner" className="hover:text-foreground">Planner</a>
          <a href="#dashboard" className="hover:text-foreground">Dashboard</a>
          <a href="#map" className="hover:text-foreground">Maps</a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-4 w-4 dark:hidden" />
            <Moon className="hidden h-4 w-4 dark:block" />
          </Button>
          {user ? (
            <div className="flex items-center gap-2">
              <Badge className="hidden gap-2 sm:inline-flex"><UserRound size={13} />{user.displayName ?? "Traveler"}</Badge>
              <Button variant="ghost" size="icon" aria-label="Sign out" onClick={onLogout}><LogOut size={17} /></Button>
            </div>
          ) : (
            <Button size="sm" onClick={onLogin}>Google Sign In</Button>
          )}
        </div>
      </div>
    </header>
  );
}
