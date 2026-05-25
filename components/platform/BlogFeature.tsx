import Link from "next/link";
import { blogFeature } from "@/lib/data/platform";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function BlogFeature() {
  const { author, sample } = blogFeature;

  return (
    <section id="blog" className="section">
      <div className="container">
        <Link href="/platform#blog" className="blog">
          <div className="blog__copy">
            <Eyebrow>{blogFeature.eyebrow}</Eyebrow>
            <h2 className="heading">{blogFeature.heading}</h2>
            <p className="lede">{blogFeature.body}</p>
            <p className="blog__author">
              <Avatar initials={author.initials} size="sm" />
              <span>
                <b>{author.name}</b> {author.role} · {author.date}
              </span>
            </p>
          </div>
          <Card className="blog__sample">
            <p className="bubble bubble--question">{sample.question}</p>
            <div className="bubble bubble--answer">
              <p>{sample.answer}</p>
              <div className="chip-row">
                {sample.citations.map((citation) => (
                  <code key={citation} className="policy-id">
                    {citation}
                  </code>
                ))}
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </section>
  );
}
