"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, User } from "lucide-react";

interface UserTypeScreenProps {
  onSelect: (type: "talent" | "business") => void;
}

export function UserTypeScreen({ onSelect }: UserTypeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="animate-fade-in flex max-w-2xl flex-col items-center gap-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            I am a...
          </h2>
          <p className="mt-2 text-muted-foreground">
            Choose how you want to use KoldaTech
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          <Card
            className="group cursor-pointer border-2 border-transparent transition-all hover:border-primary hover:shadow-lg"
            onClick={() => onSelect("talent")}
          >
            <CardContent className="flex flex-col items-center gap-4 p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold">Talent</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Find jobs, showcase skills, and get hired
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative cursor-not-allowed border-2 border-transparent opacity-60">
            <div className="absolute right-3 top-3 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              Coming soon
            </div>
            <CardContent className="flex flex-col items-center gap-4 p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                <Briefcase className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold">Business</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Post jobs, find talent, and grow your team
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
