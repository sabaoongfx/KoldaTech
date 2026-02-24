"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onNext: () => void;
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="animate-fade-in flex max-w-lg flex-col items-center gap-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            KoldaTech
          </span>
        </h1>

        <p className="max-w-md text-lg text-muted-foreground">
          The digital marketplace connecting top talent with businesses.
          Find work, showcase your skills, and grow your career.
        </p>

        <Button size="lg" className="mt-4 text-lg px-8 py-6" onClick={onNext}>
          Get Started
        </Button>
      </div>
    </div>
  );
}
