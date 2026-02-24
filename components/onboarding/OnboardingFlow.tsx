"use client";

import { useState } from "react";
import { WelcomeScreen } from "./WelcomeScreen";
import { UserTypeScreen } from "./UserTypeScreen";
import { ProfileStep1 } from "./ProfileStep1";
import { ProfileStep2 } from "./ProfileStep2";
import { ProfileComplete } from "./ProfileComplete";
import { FirstActionScreen } from "./FirstActionScreen";
import { DashboardScreen } from "./DashboardScreen";

interface OnboardingState {
  userType: "talent" | "business" | null;
  name: string;
  profession: string;
  skills: string[];
  experience: string;
  portfolio: File[] | null;
  firstAction: "apply" | "post" | "contact" | null;
}

const initialState: OnboardingState = {
  userType: null,
  name: "",
  profession: "",
  skills: [],
  experience: "",
  portfolio: null,
  firstAction: null,
};

export function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<OnboardingState>(initialState);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  function goNext() {
    setDirection("forward");
    setStep((s) => s + 1);
  }

  function renderStep() {
    switch (step) {
      case 0:
        return <WelcomeScreen onNext={goNext} />;
      case 1:
        return (
          <UserTypeScreen
            onSelect={(type) => {
              setState((s) => ({ ...s, userType: type }));
              goNext();
            }}
          />
        );
      case 2:
        return (
          <ProfileStep1
            name={state.name}
            profession={state.profession}
            skills={state.skills}
            onUpdate={(data) => setState((s) => ({ ...s, ...data }))}
            onNext={goNext}
          />
        );
      case 3:
        return (
          <ProfileStep2
            experience={state.experience}
            onUpdate={(data) => setState((s) => ({ ...s, ...data }))}
            onNext={goNext}
          />
        );
      case 4:
        return <ProfileComplete onNext={goNext} />;
      case 5:
        return (
          <FirstActionScreen
            onSelect={(action) => {
              setState((s) => ({ ...s, firstAction: action }));
              goNext();
            }}
          />
        );
      case 6:
        return (
          <DashboardScreen
            name={state.name}
            profession={state.profession}
            skills={state.skills}
            experience={state.experience}
            firstAction={state.firstAction}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        key={step}
        className={`animate-step-${direction === "forward" ? "in" : "in"}`}
      >
        {renderStep()}
      </div>
    </div>
  );
}
