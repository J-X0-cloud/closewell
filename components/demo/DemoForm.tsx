"use client";

import { useState, type FormEvent } from "react";
import { closeLengthOptions, demoForm, ledgerOptions, roleOptions } from "@/lib/data/demo";
import { demoRequestSchema, type DemoRequestInput } from "@/lib/validation/demo-request";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type FieldErrors = Partial<Record<keyof DemoRequestInput, string[]>>;
type Status = "idle" | "submitting" | "success" | "error";

function readForm(form: HTMLFormElement): DemoRequestInput {
  const data = new FormData(form);
  const value = (name: string) => String(data.get(name) ?? "");
  return {
    firstName: value("first_name"),
    lastName: value("last_name"),
    email: value("email"),
    company: value("company"),
    role: value("role") as DemoRequestInput["role"],
    ledger: value("ledger") as DemoRequestInput["ledger"],
    closeDays: value("close_days") as DemoRequestInput["closeDays"],
    focus: value("focus"),
  };
}

export function DemoForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = readForm(event.currentTarget);

    const parsed = demoRequestSchema.safeParse(input);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    setMessage(null);
    setStatus("submitting");

    try {
      const response = await fetch("/api/demo-requests", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json()) as { ok: boolean; error?: string; fieldErrors?: FieldErrors };

      if (!response.ok || !result.ok) {
        setErrors(result.fieldErrors ?? {});
        setMessage(result.error ?? "Please check the highlighted fields.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setMessage("We couldn’t reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="demo-form demo-form--done" role="status">
        <span className="demo-form__done-icon" aria-hidden="true">
          <Icon name="check" size={22} strokeWidth={2.6} />
        </span>
        <h2 className="subheading">{demoForm.success.heading}</h2>
        <p>{demoForm.success.body}</p>
      </div>
    );
  }

  const fieldError = (name: keyof DemoRequestInput) =>
    errors[name]?.[0] ? (
      <span className="field__error" id={`${name}-error`}>
        {errors[name]?.[0]}
      </span>
    ) : null;

  return (
    <form className="demo-form" onSubmit={onSubmit} noValidate>
      <h2 className="subheading">{demoForm.heading}</h2>
      <p className="demo-form__intro">{demoForm.body}</p>

      <div className="field-grid">
        <label className={cn("field", errors.firstName && "has-error")}>
          <span>First name</span>
          <input name="first_name" type="text" autoComplete="given-name" placeholder="Dana" required />
          {fieldError("firstName")}
        </label>
        <label className={cn("field", errors.lastName && "has-error")}>
          <span>Last name</span>
          <input name="last_name" type="text" autoComplete="family-name" placeholder="Reyes" required />
          {fieldError("lastName")}
        </label>
        <label className={cn("field", errors.email && "has-error")}>
          <span>Work email</span>
          <input name="email" type="email" autoComplete="email" placeholder="dana@company.com" required />
          {fieldError("email")}
        </label>
        <label className="field">
          <span>Company</span>
          <input name="company" type="text" autoComplete="organization" placeholder="Company name" />
        </label>
        <label className="field">
          <span>Your role</span>
          <select name="role" defaultValue={roleOptions[0]}>
            {roleOptions.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Ledger / ERP</span>
          <select name="ledger" defaultValue={ledgerOptions[0]}>
            {ledgerOptions.map((ledger) => (
              <option key={ledger}>{ledger}</option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="field field--radios">
        <legend>How long does month-end take today?</legend>
        <div className="radio-chips">
          {closeLengthOptions.map((option) => (
            <label key={option.value} className="radio-chip">
              <input type="radio" name="close_days" value={option.value} defaultChecked={option.value === "5-10"} />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="field">
        <span>What should we look at first?</span>
        <textarea name="focus" rows={3} placeholder="e.g. card clearing account, intercompany, prepaid schedules" />
      </label>

      {message ? (
        <p className="demo-form__message" role="alert">
          {message}
        </p>
      ) : null}

      <Button type="submit" size="lg" withArrow disabled={status === "submitting"} className="demo-form__submit">
        {status === "submitting" ? "Sending…" : demoForm.submit}
      </Button>
      <p className="demo-form__consent">{demoForm.consent}</p>
    </form>
  );
}
