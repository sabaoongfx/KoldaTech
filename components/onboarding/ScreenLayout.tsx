import { cn } from "@/lib/utils";

interface ScreenLayoutProps {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "2xl";
  centered?: boolean;
  className?: string;
  innerClassName?: string;
}

export function ScreenLayout({
  children,
  maxWidth = "md",
  centered = true,
  className,
  innerClassName,
}: ScreenLayoutProps) {
  const maxWidthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    "2xl": "max-w-2xl",
  }[maxWidth];

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center px-4",
        centered && "justify-center",
        className
      )}
    >
      <div
        className={cn(
          "animate-fade-in w-full space-y-8",
          maxWidthClass,
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
