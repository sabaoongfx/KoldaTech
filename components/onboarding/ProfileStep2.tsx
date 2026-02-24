"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Upload, Image, Video } from "lucide-react";

interface ProfileStep2Props {
  experience: string;
  onUpdate: (data: { experience: string }) => void;
  onNext: () => void;
}

export function ProfileStep2({
  experience,
  onUpdate,
  onNext,
}: ProfileStep2Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="animate-fade-in w-full max-w-md space-y-8">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>Step 2 of 3</span>
            <span>66%</span>
          </div>
          <Progress value={66} className="h-2" />
        </div>

        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Details & Portfolio
          </h2>
          <p className="mt-1 text-muted-foreground">
            Share your experience and work samples
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="experience" className="text-sm font-medium">
              Experience
            </label>
            <Textarea
              id="experience"
              placeholder="Tell us about your professional experience, achievements, and what makes you stand out..."
              rows={5}
              value={experience}
              onChange={(e) => onUpdate({ experience: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Portfolio</label>
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-muted-foreground/25 p-8 text-center transition-colors hover:border-primary/50 hover:bg-muted/50">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">
                  Drag & drop files here
                </p>
                <p className="text-xs text-muted-foreground">
                  or click to browse
                </p>
              </div>
              <div className="flex gap-4 pt-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Image className="h-3.5 w-3.5" />
                  Images
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Video className="h-3.5 w-3.5" />
                  Videos
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground italic">
            Adding these details increases your chances of getting hired.
          </p>
        </div>

        <Button size="lg" className="w-full" onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
