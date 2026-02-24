"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { ScreenLayout } from "./ScreenLayout";
import {
  ProfileCompletionCard,
  PostServiceCard,
  SuggestedJobsCard,
  QuickTipsCard,
} from "./DashboardCards";

interface DashboardScreenProps {
  name: string;
  profession: string;
  skills: string[];
  experience: string;
  firstAction: "apply" | "post" | "contact" | null;
}

export function DashboardScreen({
  name,
  profession,
  skills,
  experience,
  firstAction,
}: DashboardScreenProps) {
  const router = useRouter();
  const firstName = name.split(" ")[0] || "there";

  function handleGoToDashboard() {
    localStorage.setItem(
      "kolda-user-profile",
      JSON.stringify({ name, profession, skills, experience, firstAction })
    );
    router.push("/dashboard");
  }

  return (
    <ScreenLayout maxWidth="2xl">
      <div className="text-center">
        <div className="mb-3 flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">
          Great, {firstName}! You&apos;ve taken your first step.
        </h2>
        <p className="mt-2 text-muted-foreground">
          Here&apos;s a preview of your dashboard
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ProfileCompletionCard />
        <PostServiceCard />
      </div>

      <SuggestedJobsCard />
      <QuickTipsCard />

      <Button size="lg" className="w-full" onClick={handleGoToDashboard}>
        Go to Dashboard
      </Button>
    </ScreenLayout>
  );
}
