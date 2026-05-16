import type { ReactNode } from "react";
import type { Tone } from "@/types/content";
import { cn } from "@/lib/cn";

interface BadgeProps {
  tone?: Tone;
  children: ReactNode;
  className?: string;
  dot?: boolean;
}

export function Badge({ tone = "muted", dot = false, children, className }: BadgeProps) {
  return (
    <span className={cn("badge", `badge--${tone}`, className)}>
      {dot ? <i className="badge__dot" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
