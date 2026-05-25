import type { FaqItem } from "@/types/content";
import { Icon } from "@/components/ui/Icon";

/** Native <details> accordion: works without JavaScript and keeps answers indexable. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq">
      {items.map((item, i) => (
        <details key={item.question} className="faq__item" open={i === 0}>
          <summary>
            <span>{item.question}</span>
            <Icon name="plus" size={16} className="faq__icon" />
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
