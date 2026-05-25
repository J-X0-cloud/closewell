import Link from "next/link";
import { cn } from "@/lib/cn";

export function LogoMark({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#13234A" />
      <path d="M22.6 10.2A8.3 8.3 0 1 0 22.6 21.8" fill="none" stroke="#FFFFFF" strokeWidth="2.7" strokeLinecap="round" />
      <path
        d="M13.2 16.3l2.7 2.7 5.3-5.6"
        fill="none"
        stroke="#F2B544"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" aria-label="Closewell home" className={cn("logo", inverted && "logo--inverted", className)}>
      <LogoMark />
      <span className="logo__word">Closewell</span>
    </Link>
  );
}
