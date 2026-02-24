import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  PenTool,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const suggestedJobs = [
  { title: "Senior React Developer", company: "TechCorp", type: "Full-time" },
  { title: "UI/UX Designer", company: "DesignStudio", type: "Contract" },
  { title: "Full Stack Engineer", company: "StartupXYZ", type: "Remote" },
];

const tips = [
  "Complete your skill assessments to rank higher",
  "Add a profile photo to get 40% more views",
  "Set your availability status to attract recruiters",
];

export function ProfileCompletionCard() {
  return (
    <Card>
      <CardContent className="p-5">
        <h3 className="text-sm font-medium text-muted-foreground">
          Profile Completion
        </h3>
        <div className="mt-3 flex items-end gap-2">
          <span className="text-3xl font-bold">75%</span>
        </div>
        <Progress value={75} className="mt-3 h-2" />
        <p className="mt-2 text-xs text-muted-foreground">
          Add a photo and skills assessment to reach 100%
        </p>
      </CardContent>
    </Card>
  );
}

export function PostServiceCard() {
  return (
    <Card className="group cursor-pointer transition-all hover:shadow-md">
      <CardContent className="flex h-full flex-col items-center justify-center gap-2 p-5 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <PenTool className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-semibold">Post a Service</h3>
        <p className="text-xs text-muted-foreground">
          Let clients know what you offer
        </p>
      </CardContent>
    </Card>
  );
}

export function SuggestedJobsCard() {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">Suggested Jobs</h3>
        </div>
        <div className="mt-3 space-y-0">
          {suggestedJobs.map((job, i) => (
            <div key={job.title}>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium">{job.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {job.company}
                  </p>
                </div>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                  {job.type}
                </span>
              </div>
              {i < suggestedJobs.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function QuickTipsCard() {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-yellow-500" />
          <h3 className="font-semibold">Quick Tips</h3>
        </div>
        <ul className="mt-3 space-y-2">
          {tips.map((tip) => (
            <li
              key={tip}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              {tip}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
