import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps<T extends ElementType> = {
  as?: T;
  variant?: "glass" | "solid" | "dark";
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/** Frosted product-mockup surface; `solid` for inner panels, `dark` for navy run cards. */
export function Card<T extends ElementType = "div">({ as, variant = "glass", className, children, ...props }: CardProps<T>) {
  const Component: ElementType = as ?? "div";
  return (
    <Component className={cn("card", `card--${variant}`, className)} {...props}>
      {children}
    </Component>
  );
}
