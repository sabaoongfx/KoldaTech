"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";
import { ScreenLayout } from "./ScreenLayout";

interface ProfileStep1Props {
  name: string;
  profession: string;
  skills: string[];
  onUpdate: (data: { name: string; profession: string; skills: string[] }) => void;
  onNext: () => void;
}

export function ProfileStep1({
  name,
  profession,
  skills,
  onUpdate,
  onNext,
}: ProfileStep1Props) {
  const [skillInput, setSkillInput] = useState("");

  function handleAddSkill(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        onUpdate({ name, profession, skills: [...skills, skillInput.trim()] });
      }
      setSkillInput("");
    }
  }

  function handleRemoveSkill(skill: string) {
    onUpdate({ name, profession, skills: skills.filter((s) => s !== skill) });
  }

  const isValid = name.trim() && profession.trim() && skills.length > 0;

  return (
    <ScreenLayout>
      <div>
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>Step 1 of 3</span>
          <span>33%</span>
        </div>
        <Progress value={33} className="h-2" />
      </div>

      <div>
        <h2 className="text-3xl font-bold tracking-tight">Basic Info</h2>
        <p className="mt-1 text-muted-foreground">
          Tell us a bit about yourself
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full Name
          </label>
          <Input
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) =>
              onUpdate({ name: e.target.value, profession, skills })
            }
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="profession" className="text-sm font-medium">
            Profession
          </label>
          <Input
            id="profession"
            placeholder="e.g. Frontend Developer"
            value={profession}
            onChange={(e) =>
              onUpdate({ name, profession: e.target.value, skills })
            }
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="skills" className="text-sm font-medium">
            Skills
          </label>
          <Input
            id="skills"
            placeholder="Type a skill and press Enter"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleAddSkill}
          />
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="gap-1 pr-1"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <Button
        size="lg"
        className="w-full"
        disabled={!isValid}
        onClick={onNext}
      >
        Next
      </Button>
    </ScreenLayout>
  );
}
