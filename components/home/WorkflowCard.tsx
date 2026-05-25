"use client";

import { useEffect, useState } from "react";
import type { WorkflowId } from "@/types/content";
import { heroWorkflows, workflowStepLabels } from "@/lib/data/workflows";
import { cn } from "@/lib/cn";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";

const ROTATE_MS = 7000;

/** Hero mockup: one policy workflow at a time, read → run → ask → remember. */
export function WorkflowCard() {
  const [activeId, setActiveId] = useState<WorkflowId>("cash");
  const [autoplay, setAutoplay] = useState(true);
  const workflow = heroWorkflows.find((item) => item.id === activeId) ?? heroWorkflows[0];

  useEffect(() => {
    if (!autoplay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveId((current) => {
        const index = heroWorkflows.findIndex((item) => item.id === current);
        return heroWorkflows[(index + 1) % heroWorkflows.length]?.id ?? current;
      });
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [autoplay]);

  if (!workflow) return null;

  const select = (id: WorkflowId) => {
    setAutoplay(false);
    setActiveId(id);
  };

  return (
    <Card className="workflow" aria-label="Closewell policy workflow">
      <div className="workflow__top">
        <span className="workflow__eyebrow">Workflow</span>
        <div className="segmented" role="tablist" aria-label="Workflow">
          {heroWorkflows.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === workflow.id}
              className={cn("segmented__btn", item.id === workflow.id && "is-active")}
              onClick={() => select(item.id)}
            >
              {item.label}
            </button>
          ))}
          <span className="segmented__more">+ more</span>
        </div>
      </div>

      <div className="workflow__head">
        <h3 className="workflow__title">Policy in, cited out</h3>
        <Badge tone="success" dot>
          Live
        </Badge>
      </div>

      <ol className="workflow__steps" key={workflow.id}>
        <li className="wf-step">
          <StepLabel index={0} />
          <div className="wf-step__sources">
            {workflow.sources.map((source) => (
              <span key={source.label} className={`src src--${source.tone}`}>
                <i aria-hidden="true">{source.mark}</i>
                {source.label}
              </span>
            ))}
          </div>
          <code className="policy-id">
            {workflow.policy.id} · {workflow.policy.rule}
          </code>
        </li>

        <li className="wf-step">
          <StepLabel index={1} />
          <div className="wf-step__row">
            <span>
              {workflow.runs.counterparty} <span className="muted">{workflow.runs.reference}</span>
            </span>
            <strong className="mono">{workflow.runs.amount}</strong>
            <Badge tone="success">
              <Icon name="check" size={11} strokeWidth={3} />
              {workflow.runs.outcome}
            </Badge>
          </div>
        </li>

        <li className="wf-step wf-step--ask">
          <StepLabel index={2} />
          <div className="wf-step__row">
            <span>
              {workflow.asks.counterparty} <span className="muted">{workflow.asks.reference}</span>
            </span>
            <strong className="mono">{workflow.asks.amount}</strong>
            <Badge tone="marigold">{workflow.asks.outcome}</Badge>
          </div>
          <div className="wf-step__ask">
            <Avatar initials="C" size="sm" />
            <span className="ask-bubble">{workflow.asks.question}</span>
            <span className="muted">{workflow.asks.reviewer}</span>
          </div>
        </li>

        <li className="wf-step">
          <StepLabel index={3} />
          <div className="wf-step__row">
            <code className="policy-id">
              {workflow.remembers.id} · {workflow.remembers.rule}
            </code>
            <Badge tone="navy">updated</Badge>
          </div>
        </li>
      </ol>

      <p className="workflow__foot">
        <Icon name="link" size={13} />
        Every answer cites its source
      </p>
    </Card>
  );
}

function StepLabel({ index }: { index: number }) {
  return (
    <span className="wf-step__label">
      <span className="wf-step__num">{String(index + 1).padStart(2, "0")}</span>
      {workflowStepLabels[index]}
    </span>
  );
}
