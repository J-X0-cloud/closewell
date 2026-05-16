import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface SectionHeaderProps {
  eyebrow?: string;
  heading: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeader({ eyebrow, heading, body, align = "center", as: Heading = "h2", className }: SectionHeaderProps) {
  return (
    <header className={cn("section-header", `section-header--${align}`, className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading className={Heading === "h1" ? "display" : "heading"}>{heading}</Heading>
      {body ? <p className="lede">{body}</p> : null}
    </header>
  );
}
