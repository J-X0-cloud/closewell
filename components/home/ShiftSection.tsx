"use client";

import { useState } from "react";
import { shiftCopy } from "@/lib/data/shift";
import { cn } from "@/lib/cn";
import { CloseRunCard } from "@/components/home/CloseRunCard";
import { ScatteredBoard } from "@/components/home/ScatteredBoard";

type Mode = "before" | "after";

/** Problem → solution section. A two-state toggle stands in for the scroll-driven transition. */
export function ShiftSection() {
  const [mode, setMode] = useState<Mode>("before");
  const copy = shiftCopy[mode];

  return (
    <section className="section shift" aria-live="polite">
      <div className="container">
        <div className="shift__toggle" role="tablist" aria-label="Month-end, before and after">
          {(["before", "after"] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={mode === value}
              className={cn("shift__toggle-btn", mode === value && "is-active")}
              onClick={() => setMode(value)}
            >
              {shiftCopy[value].eyebrow}
            </button>
          ))}
        </div>
        <header className={cn("section-header section-header--center shift__head", `is-${mode}`)}>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="heading">{copy.heading}</h2>
          <p className="lede">{copy.body}</p>
        </header>
        <div className="shift__stage">{mode === "before" ? <ScatteredBoard /> : <CloseRunCard />}</div>
      </div>
    </section>
  );
}
