import { cn } from "@/lib/cn";

interface AvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  tone?: "navy" | "marigold" | "slate";
  className?: string;
}

/** Initials avatar used for reviewers, pilot customers and authors. */
export function Avatar({ initials, size = "md", tone = "navy", className }: AvatarProps) {
  return (
    <span className={cn("avatar", `avatar--${size}`, `avatar--${tone}`, className)} aria-hidden="true">
      {initials}
    </span>
  );
}
