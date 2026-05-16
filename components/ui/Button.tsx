import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

type Variant = "primary" | "secondary" | "dark" | "text";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
}

function classes({ variant = "primary", size = "md", className }: Omit<BaseProps, "children">) {
  return cn("btn", `btn--${variant}`, `btn--${size}`, className);
}

type ButtonLinkProps = BaseProps & Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children">;

export function ButtonLink({ variant, size, withArrow, children, className, ...props }: ButtonLinkProps) {
  return (
    <Link className={classes({ variant, size, className })} {...props}>
      {children}
      {withArrow ? <Icon name="arrow-right" size={15} strokeWidth={2.4} className="btn__arrow" /> : null}
    </Link>
  );
}

type ButtonProps = BaseProps & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button({ variant, size, withArrow, children, className, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={classes({ variant, size, className })} {...props}>
      {children}
      {withArrow ? <Icon name="arrow-right" size={15} strokeWidth={2.4} className="btn__arrow" /> : null}
    </button>
  );
}
