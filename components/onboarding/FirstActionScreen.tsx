"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Search, PenTool, MessageCircle } from "lucide-react";

interface FirstActionScreenProps {
  onSelect: (action: "apply" | "post" | "contact") => void;
}

const actions = [
  {
    id: "apply" as const,
    icon: Search,
    title: "Apply to a Job",
    description: "Browse open positions and find your next opportunity",
  },
  {
    id: "post" as const,
    icon: PenTool,
    title: "Post a Service",
    description: "Showcase what you offer and attract clients",
  },
  {
    id: "contact" as const,
    icon: MessageCircle,
    title: "Contact a Professional",
    description: "Connect with experts and collaborators",
  },
];

export function FirstActionScreen({ onSelect }: FirstActionScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="animate-fade-in flex max-w-lg flex-col items-center gap-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Pick your first action on KoldaTech
          </p>
        </div>

        <div className="grid w-full gap-3">
          {actions.map((action) => (
            <Card
              key={action.id}
              className="group cursor-pointer border-2 border-transparent transition-all hover:border-primary hover:shadow-lg"
              onClick={() => onSelect(action.id)}
            >
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <action.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
