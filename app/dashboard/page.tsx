"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { User, X } from "lucide-react";
import { ScreenLayout } from "@/components/onboarding/ScreenLayout";
import {
  ProfileCompletionCard,
  PostServiceCard,
  SuggestedJobsCard,
  QuickTipsCard,
} from "@/components/onboarding/DashboardCards";

interface UserProfile {
  name: string;
  profession: string;
  skills: string[];
  experience: string;
  firstAction: "apply" | "post" | "contact" | null;
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<UserProfile | null>(null);
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("kolda-user-profile");
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  const firstName = profile.name.split(" ")[0] || "there";

  function handleEdit() {
    setDraft({ ...profile! });
    setSkillInput("");
    setEditing(true);
  }

  function handleSave() {
    if (!draft) return;
    localStorage.setItem("kolda-user-profile", JSON.stringify(draft));
    setProfile(draft);
    setEditing(false);
  }

  function handleCancel() {
    setDraft(null);
    setEditing(false);
  }

  function handleAddSkill(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && skillInput.trim() && draft) {
      e.preventDefault();
      if (!draft.skills.includes(skillInput.trim())) {
        setDraft({ ...draft, skills: [...draft.skills, skillInput.trim()] });
      }
      setSkillInput("");
    }
  }

  function handleRemoveSkill(skill: string) {
    if (!draft) return;
    setDraft({ ...draft, skills: draft.skills.filter((s) => s !== skill) });
  }

  return (
    <ScreenLayout maxWidth="2xl" centered={false} className="py-12">
      {/* Greeting Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome back, {firstName}!
            </h1>
            <p className="text-sm text-muted-foreground">
              {profile.profession || "Your dashboard is ready"}
            </p>
          </div>
        </div>
        {profile.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Inline Edit Form */}
      {editing && draft && (
        <Card>
          <CardContent className="space-y-4 p-5">
            <h3 className="font-semibold">Edit Profile</h3>

            <div className="space-y-2">
              <label htmlFor="edit-name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="edit-name"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="edit-profession" className="text-sm font-medium">
                Profession
              </label>
              <Input
                id="edit-profession"
                value={draft.profession}
                onChange={(e) =>
                  setDraft({ ...draft, profession: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="edit-skills" className="text-sm font-medium">
                Skills
              </label>
              <Input
                id="edit-skills"
                placeholder="Type a skill and press Enter"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
              />
              {draft.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {draft.skills.map((skill) => (
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

            <div className="space-y-2">
              <label htmlFor="edit-experience" className="text-sm font-medium">
                Experience
              </label>
              <Textarea
                id="edit-experience"
                rows={4}
                value={draft.experience}
                onChange={(e) =>
                  setDraft({ ...draft, experience: e.target.value })
                }
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button className="flex-1" onClick={handleSave}>
                Save Changes
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        <ProfileCompletionCard />
        <PostServiceCard />
      </div>

      <SuggestedJobsCard />
      <QuickTipsCard />

      {!editing && (
        <Button
          size="lg"
          className="w-full"
          variant="outline"
          onClick={handleEdit}
        >
          Edit Profile
        </Button>
      )}
    </ScreenLayout>
  );
}
