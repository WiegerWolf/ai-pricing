import { ColumnDef, Row } from "@tanstack/react-table";
import { LLMModel } from "@/types/llm";
import { ColumnHeader } from "./ColumnHeader";
import { developerLogos, developerFlags } from "@/config/logos";
import { getColumnMinMax } from "@/utils/colorScale";
import { BarCell } from "./BarCell";

// Color palette — semantic meaning
const COLORS = {
  quality: "rgba(99, 102, 241, 0.24)",     // indigo — intelligence/quality
  cost: "rgba(244, 63, 94, 0.18)",         // rose — expense (lower is better)
  tokens: "rgba(245, 158, 11, 0.20)",      // amber — resource usage
  benchmark: "rgba(99, 102, 241, 0.16)",   // indigo lighter — benchmark scores
  profit: "rgba(34, 197, 94, 0.24)",       // emerald — positive outcome
};

// Helper function for price range filtering
const createPriceRangeFilter = (
  row: Row<LLMModel>,
  columnId: string,
  value: [string, string],
) => {
  const price = row.getValue(columnId) as number;
  const [min, max] = value;
  const numMin = Number(min);
  const numMax = Number(max);
  if (min && max) return price >= numMin && price <= numMax;
  if (min) return price >= numMin;
  if (max) return price <= numMax;
  return true;
};

// Column group definitions — used by DataTable for group headers
export const columnGroups = [
  { label: "Model", span: 1 },
  { label: "Quality", span: 1 },
  { label: "Cost", span: 2 },
  { label: "Benchmarks", span: 6 },
  { label: "Caps", span: 1 },
];

export const columns = (data: LLMModel[]): ColumnDef<LLMModel>[] => {
  const SWEBenchRange = getColumnMinMax(data, "SWEBench");
  const simpleBenchRange = getColumnMinMax(data, "simpleBench");
  const fictionLiveBenchRange = getColumnMinMax(data, "fictionLiveBench");
  const ARCAGI2Range = getColumnMinMax(data, "ARCAGI2");
  const costRange = getColumnMinMax(data, "costAAIndex");
  const tokenUseAAIndexRange = getColumnMinMax(data, "tokenUseAAIndex");
  const aaIndexRange = getColumnMinMax(data, "AAIndex");
  const skateBenchRange = getColumnMinMax(data, "skateBench");
  const vendingBenchValues = data
    .map((item) => item.VendingBench)
    .filter((value): value is number => value !== null && value !== undefined);
  const maxPositiveVendingBench = Math.max(
    0,
    ...vendingBenchValues.filter((value) => value > 0),
  );

  return [
    // ─── Model ───
    {
      accessorKey: "model",
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title="Model"
          tooltip="Model name. For benchmark results, assume the highest reasoning ability."
          filter={{ type: "text", enabled: true }}
        />
      ),
      filterFn: "includesString",
      cell: ({ row }) => {
        const developer = row.original.developer;
        const logo = developerLogos[developer];
        const flag = developerFlags[developer];
        const content = (
          <div className="flex items-center gap-1.5">
            {logo && (
              <img
                src={logo}
                alt={`${developer} logo`}
                className="w-4 h-4 object-contain shrink-0 rounded-sm"
              />
            )}
            {flag && <span className="text-xs leading-none">{flag}</span>}
            <span className="truncate font-medium text-[12px]">{row.original.model}</span>
          </div>
        );

        return row.original.modelUrl ? (
          <a
            href={row.original.modelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 hover:text-blue-600 hover:underline inline-flex items-center gap-0.5"
          >
            {content}
            <svg className="h-2.5 w-2.5 text-slate-300 shrink-0 ml-0.5" viewBox="0 0 12 12">
              <path
                fill="currentColor"
                d="M3.5 3a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V6h1v2.5A1.5 1.5 0 0 1 8.5 10h-5A1.5 1.5 0 0 1 2 8.5v-5A1.5 1.5 0 0 1 3.5 2H6v1H3.5z"
              />
              <path
                fill="currentColor"
                d="M6.5 1H11v4.5L9.25 3.75 6.5 6.5 5.5 5.5l2.75-2.75L6.5 1z"
              />
            </svg>
          </a>
        ) : (
          content
        );
      },
      minSize: 170,
    },

    // ─── Quality: AAIndex ───
    {
      accessorKey: "AAIndex",
      meta: { groupStart: true },
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title="AAIndex"
          tooltip="Artificial Analysis Intelligence Index (higher is better)"
          link={{
            url: "https://artificialanalysis.ai/leaderboards/models",
            title: "AAIndex Benchmark",
          }}
          sort={{ enabled: true }}
        />
      ),
      cell: ({ row }) => (
        <BarCell
          value={row.original.AAIndex}
          min={aaIndexRange.min}
          max={aaIndexRange.max}
          color={COLORS.quality}
          useLog
        />
      ),
      sortingFn: "alphanumeric",
      sortDescFirst: true,
      sortUndefined: "last",
      maxSize: 100,
    },

    // ─── Cost: AA Index cost ───
    {
      accessorKey: "costAAIndex",
      meta: { groupStart: true },
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title="AA Index cost"
          subtitle="USD"
          tooltip="Cost (USD) to run all evaluations in the Artificial Analysis Intelligence Index. Lower is better."
          link={{
            url: "https://artificialanalysis.ai/models#cost-to-run-artificial-analysis-intelligence-index",
            title: "Cost to run Artificial Analysis Intelligence Index",
          }}
          filter={{ type: "range", enabled: true }}
          sort={{ enabled: true }}
        />
      ),
      cell: ({ row }) => (
        <BarCell
          value={row.original.costAAIndex}
          min={costRange.min}
          max={costRange.max}
          color={COLORS.cost}
          format={(v) => (v === 0 ? "Free" : `$${v}`)}
        />
      ),
      maxSize: 130,
      filterFn: createPriceRangeFilter,
    },

    // ─── Cost: Token Use ───
    {
      accessorKey: "tokenUseAAIndex",
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title="Token Use"
          subtitle="MTok"
          tooltip="Output Tokens Used to Run Artificial Analysis Intelligence Index, Millions (lower is better)"
          link={{
            url: "https://artificialanalysis.ai/models#output-tokens-used-to-run-artificial-analysis-intelligence-index",
            title: "Tokens used to run all evaluations in the Artificial Analysis Intelligence Index",
          }}
          sort={{ enabled: true }}
        />
      ),
      cell: ({ row }) => (
        <BarCell
          value={row.original.tokenUseAAIndex}
          min={tokenUseAAIndexRange.min}
          max={tokenUseAAIndexRange.max}
          color={COLORS.tokens}
          useLog
          format={(v) => `${v}M`}
        />
      ),
      maxSize: 100,
    },

    // ─── Benchmarks: SimpleBench ───
    {
      accessorKey: "simpleBench",
      meta: { groupStart: true },
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title="SimpleBench"
          tooltip="Benchmark covering spatio-temporal reasoning, social intelligence, and trick questions (Human Baseline 83.7%) (higher is better)"
          link={{
            url: "https://simple-bench.com/#leaderboardTable",
            title: "Simple Bench Leaderboard Table",
          }}
          sort={{ enabled: true }}
        />
      ),
      cell: ({ row }) => (
        <BarCell
          value={row.original.simpleBench}
          min={simpleBenchRange.min}
          max={simpleBenchRange.max}
          color={COLORS.benchmark}
          format={(v) => `${v.toFixed(1)}%`}
        />
      ),
      sortingFn: "alphanumeric",
      sortDescFirst: true,
      sortUndefined: "last",
    },

    // ─── Benchmarks: SWE-Bench ───
    {
      accessorKey: "SWEBench",
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title="SWE-Bench"
          subtitle="Verified"
          tooltip="A benchmark measuring the ability of an AI to edit code agentically across multiple programming languages (higher is better)"
          link={{
            url: "https://swebench.com/",
            title: "SWEBench",
          }}
          sort={{ enabled: true }}
        />
      ),
      cell: ({ row }) => (
        <BarCell
          value={row.original.SWEBench}
          min={SWEBenchRange.min}
          max={SWEBenchRange.max}
          color={COLORS.benchmark}
          format={(v) => `${v.toFixed(1)}%`}
        />
      ),
      sortDescFirst: true,
      sortUndefined: "last",
    },

    // ─── Benchmarks: ARC-AGI-2 ───
    {
      accessorKey: "ARCAGI2",
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title="ARC-AGI-2"
          tooltip="ARC-AGI-2 uses abstract visual puzzles to evaluate on-the-spot reasoning skills (higher is better)"
          link={{
            url: "https://arcprize.org/leaderboard",
            title: "ARC-AGI-2 Leaderboard",
          }}
          sort={{ enabled: true }}
        />
      ),
      cell: ({ row }) => (
        <BarCell
          value={row.original.ARCAGI2}
          min={ARCAGI2Range.min}
          max={ARCAGI2Range.max}
          color={COLORS.benchmark}
          format={(v) => `${v.toFixed(1)}%`}
        />
      ),
      sortDescFirst: true,
      sortUndefined: "last",
    },

    // ─── Benchmarks: SkateBench ───
    {
      accessorKey: "skateBench",
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title="SkateBench"
          tooltip="Technical skateboarding trick terminology knowledge — percentage of correct answers out of 210 tests (higher is better)"
          link={{
            url: "https://skatebench.t3.gg/",
            title: "SkateBench Leaderboard",
          }}
          sort={{ enabled: true }}
        />
      ),
      cell: ({ row }) => (
        <BarCell
          value={row.original.skateBench}
          min={skateBenchRange.min}
          max={skateBenchRange.max}
          color={COLORS.benchmark}
          format={(v) => `${v.toFixed(1)}%`}
        />
      ),
      sortDescFirst: true,
      sortUndefined: "last",
    },

    // ─── Benchmarks: Fiction.LiveBench ───
    {
      accessorKey: "fictionLiveBench",
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title="Fiction.Live"
          subtitle="@60k"
          tooltip="Fiction.LiveBench: Evaluates performance on long complex stories across different context lengths (higher is better). We use the 60k context length score here."
          link={{
            url: "https://fiction.live/stories/Fiction-liveBench-Mar-25-2025/oQdzQvKHw8JyXbN87",
            title: "Fiction.LiveBench Methodology",
          }}
          sort={{ enabled: true }}
        />
      ),
      cell: ({ row }) => (
        <BarCell
          value={row.original.fictionLiveBench}
          min={fictionLiveBenchRange.min}
          max={fictionLiveBenchRange.max}
          color={COLORS.benchmark}
          format={(v) => `${v.toFixed(1)}%`}
        />
      ),
      sortingFn: "alphanumeric",
      sortDescFirst: true,
      sortUndefined: "last",
    },

    // ─── Benchmarks: VendingBench ───
    {
      accessorKey: "VendingBench",
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title="VendingBench"
          subtitle="Net USD"
          tooltip="A benchmark for measuring AI model performance on running a business over a year; bank balance in the end (higher is better)"
          link={{
            url: "https://andonlabs.com/evals/vending-bench-2",
            title: "VendingBench 2",
          }}
          sort={{ enabled: true }}
        />
      ),
      cell: ({ row }) => {
        const value = row.original.VendingBench;
        if (value === null || value === undefined) {
          return <div className="font-mono text-right px-1.5 py-px text-gray-300">&mdash;</div>;
        }
        if (value < 0) {
          return (
            <div className="font-mono text-right px-1.5 py-px text-[12px] leading-snug text-rose-600">
              ${value.toFixed(0)}
            </div>
          );
        }
        return (
          <BarCell
            value={value}
            min={0}
            max={maxPositiveVendingBench}
            color={COLORS.profit}
            format={(v) => `$${v.toFixed(0)}`}
          />
        );
      },
      sortUndefined: "last",
    },

    // ─── Capabilities: Vision ───
    {
      accessorKey: "hasVision",
      meta: { groupStart: true },
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title="Vision"
          tooltip="Whether the model can process images"
          filter={{ type: "boolean", enabled: true }}
          verticalText={true}
        />
      ),
      cell: ({ row }) => (
        <span className="text-center block text-[12px]">
          {row.original.hasVision ? (
            <span className="text-emerald-500">&#10003;</span>
          ) : (
            <span className="text-gray-300">&mdash;</span>
          )}
        </span>
      ),
      filterFn: (row, id, value: boolean) => {
        if (value === undefined) return true;
        return row.getValue(id) === value;
      },
      maxSize: 44,
    },
  ];
};
