import { getRelativeValue } from "@/utils/colorScale";

interface BarCellProps {
  value: number | null | undefined;
  min: number;
  max: number;
  format?: (v: number) => string;
  color: string; // CSS color like "rgba(99, 102, 241, 0.22)"
  useLog?: boolean;
  textColor?: string;
}

export function BarCell({
  value,
  min,
  max,
  format,
  color,
  useLog,
  textColor,
}: BarCellProps) {
  if (value === null || value === undefined) {
    return (
      <div className="font-mono text-right px-1.5 py-px text-gray-300 dark:text-slate-600">
        &mdash;
      </div>
    );
  }

  const relative = getRelativeValue(value, min, max, useLog);
  const pct = Math.max(0, Math.min(100, relative * 100));
  const formatted = format ? format(value) : String(value);

  return (
    <div className="relative px-1.5 py-px">
      <div
        className="absolute inset-y-0 left-0 rounded-[2px] bar-fill"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
      <span
        className="relative font-mono text-right block text-[12px] leading-snug"
        style={textColor ? { color: textColor } : undefined}
      >
        {formatted}
      </span>
    </div>
  );
}
