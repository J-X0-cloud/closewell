import Image from "next/image";
import { keyPeople, scatteredWork } from "@/lib/data/shift";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";

/** "Before" state: the close spread across files, inboxes, chat and people. */
export function ScatteredBoard() {
  const { spreadsheet, invoices, inbox, chat, journal, folders } = scatteredWork;

  return (
    <div className="board">
      <article className="mcard mcard--sheet">
        <header className="mcard__head">
          <span className="mcard__icon mcard__icon--sheet" aria-hidden="true">
            X
          </span>
          <span className="mcard__title">{spreadsheet.file}</span>
          <span className="mcard__tag mcard__tag--warn">{spreadsheet.tag}</span>
        </header>
        <div className="sheet-grid" aria-hidden="true">
          {Array.from({ length: 15 }, (_, i) => (
            <span key={i} className={i === 7 || i === 11 ? "is-bad" : undefined} />
          ))}
        </div>
        <p className="mcard__stat">
          {spreadsheet.statLabel} <b>{spreadsheet.stat}</b>
        </p>
      </article>

      <article className="mcard mcard--invoices">
        <header className="mcard__head">
          <span className="mcard__icon mcard__icon--pdf" aria-hidden="true">
            PDF
          </span>
          <span className="mcard__title">{invoices.file}</span>
          <span className="mcard__tag mcard__tag--warn">{invoices.tag}</span>
        </header>
        <dl className="mcard__rows">
          {invoices.rows.map((row) => (
            <div key={row.vendor}>
              <dt>{row.vendor}</dt>
              <dd>{row.amount}</dd>
            </div>
          ))}
        </dl>
        <p className="mcard__hand">
          <Icon name="alert" size={12} />
          {invoices.note}
        </p>
      </article>

      <article className="mcard mcard--inbox">
        <header className="mcard__head">
          <span className="mcard__icon mcard__icon--mail" aria-hidden="true">
            @
          </span>
          <span className="mcard__title">{inbox.label}</span>
          <span className="mcard__tag mcard__tag--danger">{inbox.unread}</span>
        </header>
        <ul className="mcard__mail">
          {inbox.threads.map((thread) => (
            <li key={thread.subject} className={thread.unread ? undefined : "is-read"}>
              <i aria-hidden="true" />
              {thread.subject}
            </li>
          ))}
        </ul>
      </article>

      <article className="mcard mcard--chat">
        <header className="mcard__head">
          <span className="mcard__icon mcard__icon--chat" aria-hidden="true">
            #
          </span>
          <span className="mcard__title">{chat.channel}</span>
        </header>
        {chat.messages.map((message) => (
          <p key={message.text} className={message.mine ? "chat-bubble chat-bubble--me" : "chat-bubble"}>
            {message.text}
          </p>
        ))}
      </article>

      <article className="mcard mcard--je">
        <header className="mcard__head">
          <span className="mcard__icon mcard__icon--je" aria-hidden="true">
            JE
          </span>
          <span className="mcard__title">{journal.title}</span>
          <span className="mcard__tag mcard__tag--danger">{journal.tag}</span>
        </header>
        <dl className="mcard__rows mono">
          {journal.lines.map((line) => (
            <div key={line.account}>
              <dt>
                {line.side}  {line.account}
              </dt>
              <dd className="is-unknown">?</dd>
            </div>
          ))}
          <div>
            <dt>Difference</dt>
            <dd className="is-unknown">{journal.difference}</dd>
          </div>
        </dl>
      </article>

      <div className="board__folders">
        {folders.map((folder) => (
          <figure key={folder} className="folder">
            <Image src="/images/folder.avif" alt="folder" width={88} height={70} />
            <figcaption>{folder}</figcaption>
          </figure>
        ))}
      </div>

      <ul className="board__people">
        {keyPeople.map((person) => (
          <li key={person.name} className="person">
            <Avatar initials={person.initials} size="lg" tone="slate" />
            <span className="person__name">{person.name}</span>
            <span className="person__role">{person.role}</span>
            <span className="person__note">{person.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
