const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const usdCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

/** Formats an amount held in cents, e.g. 1248000 → "$12,480.00". */
export function formatCents(cents: number): string {
  return usd.format(cents / 100);
}

/** Signed variant used for variances: "+$31,400.00" / "−$38.00". */
export function formatSignedCents(cents: number): string {
  const formatted = usd.format(Math.abs(cents) / 100);
  if (cents === 0) return formatted;
  return cents > 0 ? `+${formatted}` : `−${formatted}`;
}

/** Compact dollars for headline figures, e.g. 18_400_000 → "$18.4M". */
export function formatCompactDollars(dollars: number): string {
  return usdCompact.format(dollars);
}

export function formatPercent(value: number, fractionDigits = 0): string {
  return `${value.toFixed(fractionDigits)}%`;
}

/** Parses a user-entered money string ("$1,204.18", "1204.18") into cents. */
export function parseMoneyToCents(input: string): number | null {
  const normalized = input.replace(/[$,\s]/g, "").replace("−", "-");
  if (!/^-?\d+(\.\d{1,2})?$/.test(normalized)) return null;
  return Math.round(Number.parseFloat(normalized) * 100);
}
