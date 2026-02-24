"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Trophy } from "lucide-react";

interface ProfileCompleteProps {
  onNext: () => void;
}

export function ProfileComplete({ onNext }: ProfileCompleteProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="animate-fade-in w-full max-w-md space-y-8 text-center">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>Step 3 of 3</span>
            <span>100%</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>

        <div className="flex flex-col items-center gap-4 py-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 className="h-12 w-12" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight">
            Your profile is complete!
          </h2>
          <p className="text-muted-foreground">
            You&apos;re all set up and ready to explore KoldaTech.
          </p>
        </div>

        <div className="rounded-xl border bg-muted/50 p-4">
          <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <div className="text-left">
              <p className="text-sm font-medium">Earn your first badge!</p>
              <p className="text-xs text-muted-foreground">
                Complete a skill assessment to stand out to employers
              </p>
            </div>
            <Badge variant="secondary" className="ml-auto shrink-0">
              +50 XP
            </Badge>
          </div>
        </div>

        <Button size="lg" className="w-full" onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  );
}
