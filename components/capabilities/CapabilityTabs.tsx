"use client";

import { useState } from "react";
import type { Capability, CapabilityId } from "@/types/content";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CapabilityPreview } from "@/components/capabilities/CapabilityPreview";

interface CapabilityTabsProps {
  capabilities: Capability[];
}

export function CapabilityTabs({ capabilities }: CapabilityTabsProps) {
  const [activeId, setActiveId] = useState<CapabilityId>(capabilities[0]?.id ?? "revenue");
  const active = capabilities.find((capability) => capability.id === activeId) ?? capabilities[0];

  if (!active) return null;

  return (
    <div className="cap-tabs">
      <div className="cap-tabs__list" role="tablist" aria-label="Capabilities">
        {capabilities.map((capability) => (
          <button
            key={capability.id}
            type="button"
            role="tab"
            id={`cap-tab-${capability.id}`}
            aria-selected={capability.id === active.id}
            aria-controls={`cap-panel-${capability.id}`}
            className={cn("cap-tabs__tab", capability.id === active.id && "is-active")}
            onClick={() => setActiveId(capability.id)}
          >
            <span className="cap-tabs__index">{capability.index}</span>
            {capability.label}
          </button>
        ))}
      </div>

      <div
        className="cap-tabs__panel"
        role="tabpanel"
        id={`cap-panel-${active.id}`}
        aria-labelledby={`cap-tab-${active.id}`}
      >
        <div className="cap-tabs__copy">
          <p className="eyebrow">{active.label}</p>
          <h3 className="subheading">{active.heading}</h3>
          <ul className="ticks">
            {active.bullets.map((bullet) => (
              <li key={bullet}>
                <Icon name="check" size={14} strokeWidth={2.6} />
                {bullet}
              </li>
            ))}
          </ul>
          {active.cta ? (
            <ButtonLink href={active.cta.href} variant="text" withArrow>
              {active.cta.label}
            </ButtonLink>
          ) : null}
        </div>
        <CapabilityPreview preview={active.preview} />
      </div>
    </div>
  );
}
