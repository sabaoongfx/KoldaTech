"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { ScreenLayout } from "./ScreenLayout";

interface WelcomeScreenProps {
  onNext: () => void;
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <ScreenLayout maxWidth="lg" className="text-center" innerClassName="flex flex-col items-center gap-6 space-y-0">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <Sparkles className="h-8 w-8 text-primary" />
      </div>

      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Welcome to{" "}
        <span className="bg-[linear-gradient(61.63deg,rgb(45,66,255)_-15.05%,rgb(156,99,250)_104.96%)] bg-clip-text text-transparent">
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
    </ScreenLayout>
  );
}
