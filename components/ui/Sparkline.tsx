import { cn } from "@/lib/cn";

interface SparklineProps {
  values: readonly number[];
  width?: number;
  height?: number;
  className?: string;
  label?: string;
}

/** Builds an SVG path through the points, scaled to the viewbox with a small vertical inset. */
export function sparklinePath(values: readonly number[], width: number, height: number, inset = 3): string {
  if (values.length === 0) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const step = values.length > 1 ? width / (values.length - 1) : 0;

  return values
    .map((value, i) => {
      const x = i * step;
      const y = inset + (1 - (value - min) / span) * (height - inset * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

export function Sparkline({ values, width = 120, height = 36, className, label }: SparklineProps) {
  const gradientId = `spark-${values.join("-").replace(/\./g, "_")}`;
  const line = sparklinePath(values, width, height);
  const area = `${line} L${width} ${height} L0 ${height} Z`;

  return (
    <svg
      className={cn("sparkline", className)}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} />
      <path d={line} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
