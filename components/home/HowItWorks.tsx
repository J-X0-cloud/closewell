"use client";

import { useState } from "react";
import { howItWorksIntro, howItWorksSteps } from "@/lib/data/how-it-works";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HowItWorksScene } from "@/components/home/HowItWorksScene";

export function HowItWorks() {
  const [index, setIndex] = useState(0);
  const step = howItWorksSteps[index];
  const next = howItWorksSteps[index + 1];
  const isLast = next === undefined;

  if (!step) return null;

  return (
    <section id="hiw" className="section">
      <div className="container">
        <SectionHeader eyebrow={howItWorksIntro.eyebrow} heading={howItWorksIntro.heading} body={howItWorksIntro.body} />
        <div className="hiw">
          <div className="hiw__card">
            <div className="hiw__nav">
              <span className="hiw__pill">
                <i aria-hidden="true" />
                {String(index + 1).padStart(2, "0")} · {step.label}
              </span>
              <button type="button" className="hiw__next-label" onClick={() => setIndex(isLast ? 0 : index + 1)}>
                {isLast ? "Start again" : `Next · ${next.label}`}
              </button>
              <button
                type="button"
                className="hiw__next"
                aria-label={isLast ? "Restart" : "Next step"}
                onClick={() => setIndex(isLast ? 0 : index + 1)}
              >
                <Icon name={isLast ? "replay" : "arrow-right"} size={15} strokeWidth={2.4} />
              </button>
            </div>
            <div className="hiw__text" aria-live="polite">
              <h3 className="subheading">{step.title}</h3>
              <p>{step.description}</p>
            </div>
            <HowItWorksScene scene={step.id} />
            <ol className="hiw__dots" aria-label="Steps">
              {howItWorksSteps.map((item, i) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={cn(i === index && "is-active")}
                    aria-label={`${String(i + 1).padStart(2, "0")} · ${item.label}`}
                    aria-current={i === index ? "step" : undefined}
                    onClick={() => setIndex(i)}
                  />
                </li>
              ))}
            </ol>
          </div>
          <aside className="hiw__loop">
            <Icon name="replay" size={18} />
            <div>
              <h4>{howItWorksIntro.loop.title}</h4>
              <p>{howItWorksIntro.loop.body}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
