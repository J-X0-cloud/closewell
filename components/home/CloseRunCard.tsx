"use client";

import { useState } from "react";
import { closeRun } from "@/lib/data/shift";
import { cn } from "@/lib/cn";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";

type ReviewId = (typeof closeRun.reviews)[number]["id"];

/** "After" state: the close run prepared by Closewell, with two items waiting on people. */
export function CloseRunCard() {
  const [resolved, setResolved] = useState<ReadonlySet<ReviewId>>(new Set());
  const allResolved = resolved.size === closeRun.reviews.length;

  const resolve = (id: ReviewId) => setResolved((current) => new Set(current).add(id));

  return (
    <div className="close-run">
      <Card variant="dark" className="close-run__card">
        <header className="close-run__head">
          <span>{closeRun.title}</span>
          <Badge tone={allResolved ? "success" : "marigold"} dot>
            {allResolved ? "closed" : "running"}
          </Badge>
        </header>
        <ol className="close-run__steps">
          {closeRun.steps.map((step) => (
            <li key={step.label}>
              <span className="close-run__check" aria-hidden="true">
                <Icon name="check" size={12} strokeWidth={3} />
              </span>
              <span>
                <b>{step.label}</b> {step.value}
              </span>
              <span className="close-run__detail">{step.detail}</span>
            </li>
          ))}
          <li className={cn("close-run__lock", allResolved && "is-done")}>
            <span className="close-run__check" aria-hidden="true">
              <Icon name="lock" size={12} strokeWidth={2.4} />
            </span>
            <span>
              <b>{closeRun.lock.label}</b> {closeRun.lock.value}
            </span>
            <span className="close-run__detail">{closeRun.lock.detail}</span>
          </li>
        </ol>
      </Card>

      <div className="close-run__reviews">
        {closeRun.reviews.map((review) => {
          const done = resolved.has(review.id);
          return (
            <article key={review.id} className={cn("review", done && "is-done")}>
              <Avatar initials={review.person.initials} tone="slate" />
              <div className="review__body">
                <p className="review__who">
                  <b>{review.person.name}</b> {review.person.role}
                  {!done ? (
                    <Badge tone="marigold" className="review__badge">
                      Input needed
                    </Badge>
                  ) : null}
                </p>
                <p className="review__text">
                  {review.prompt}
                  {review.figure ? (
                    <>
                      {" "}
                      <mark className="cite">{review.figure}</mark>.
                    </>
                  ) : null}{" "}
                  {review.context}
                </p>
                {done ? (
                  <p className="review__resolved">
                    <Icon name="check" size={13} strokeWidth={2.6} />
                    {review.resolved}
                  </p>
                ) : (
                  <Button size="sm" variant="dark" onClick={() => resolve(review.id)}>
                    {review.action}
                  </Button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
