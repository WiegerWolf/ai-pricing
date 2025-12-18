import { ColumnDef, Row } from "@tanstack/react-table";
import { LLMModel } from "@/types/llm";
import { ColumnHeader } from "./ColumnHeader";
import { developerLogos } from "@/config/logos";
import { getCellBackground, getColumnMinMax } from "@/utils/colorScale";

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

export const columns = (data: LLMModel[]): ColumnDef<LLMModel>[] => {
  // Calculate min/max values for numerical columns
  const SWEBenchRange = getColumnMinMax(data, "SWEBench");
  const GPQAdiamondRange = getColumnMinMax(data, "GPQAdiamond");
  const HumLastExamRange = getColumnMinMax(data, "HumLastExam");
  const simpleBenchRange = getColumnMinMax(data, "simpleBench");
  const fictionLiveBenchRange = getColumnMinMax(data, "fictionLiveBench");
  const ARCAGI2Range = getColumnMinMax(data, "ARCAGI2");
  const costRange = getColumnMinMax(data, "costAAIndex");
  const tokenUseAAIndexRange = getColumnMinMax(data, "tokenUseAAIndex");
  const aaIndexRange = getColumnMinMax(data, "AAIndex"); // Add AAIndex range calculation
  const VendingBenchRange = getColumnMinMax(data, "VendingBench");

  return [
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
        const content = (
          <div className="flex items-center gap-2">
            {logo && (
              <img
                src={logo}
                alt={`${developer} logo`}
                className="w-4 h-4 object-contain"
              />
            )}
            <span>{row.original.model}</span>
          </div>
        );

        return row.original.modelUrl ? (
          <a
            href={row.original.modelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1"
          >
            {content}
            <svg className="h-3 w-3 text-gray-400" viewBox="0 0 12 12">
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
      minSize: 180,
    },
    {
      accessorKey: "AAIndex",
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
      cell: ({ row }) => {
        const value = row.original.AAIndex;
        // Use the AAIndex range for background color
        const cellStyle = getCellBackground(
          value,
          aaIndexRange.min,
          aaIndexRange.max,
          {
            useLog: true,
          },
        );
        return (
          <div
            style={cellStyle}
            className="font-mono text-right block px-2 py-1"
          >
            {value === undefined || value === null ? "-" : value}
          </div>
        );
      },
      sortingFn: "alphanumeric",
      sortDescFirst: true,
      sortUndefined: "last",
      maxSize: 150,
    },
    {
      accessorKey: "costAAIndex",
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title="AA Index cost"
          subtitle="USD spent"
          tooltip="Cost (USD) to run all evaluations in the Artificial Analysis Intelligence Index. Lower is better."
          link={{
            url: "https://artificialanalysis.ai/models#cost-to-run-artificial-analysis-intelligence-index",
            title: "Cost to run Artificial Analysis Intelligence Index",
          }}
          filter={{ type: "range", enabled: true }}
          sort={{ enabled: true }}
        />
      ),
      cell: ({ row }) => {
        const value = row.original.costAAIndex;
        const cellStyle =
          value === 0
            ? {}
            : getCellBackground(value, costRange.min, costRange.max, {
                color: "rgb(254 226 226)",
              });
        return (
          <div
            style={cellStyle}
            className="font-mono text-right block px-2 py-1"
          >
            {value === undefined ? "-" : `$${value}`}
          </div>
        );
      },
      maxSize: 200,
      filterFn: createPriceRangeFilter,
    },
    {
      accessorKey: "tokenUseAAIndex",
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title="AA Index Token Use"
          subtitle="MTok"
          tooltip="Output Tokens Used to Run Artificial Analysis Intelligence Index, Millions (lower is better)"
          link={{
            url: "https://artificialanalysis.ai/models#output-tokens-used-to-run-artificial-analysis-intelligence-index",
            title: "Tokens used to run all evaluations in the Artificial Analysis Intelligence Index",
          }}
          sort={{ enabled: true }}
        />
      ),
      cell: ({ row }) => {
        const value = row.original.tokenUseAAIndex;
        const cellStyle =
          value === 0
            ? {}
            : getCellBackground(value, tokenUseAAIndexRange.min, tokenUseAAIndexRange.max, {
                useLog: true,
                color: "rgba(0, 128, 128, .3)",
              });
        return (
          <div
            style={cellStyle}
            className="font-mono text-right block px-2 py-1"
          >
            {value === undefined ? "-" : `${value}M`}
          </div>
        );
      },
      maxSize: 150,
    },
    {
      accessorKey: "GPQAdiamond",
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title="GPQA Diamond"
          subtitle="no tools"
          tooltip="A challenging multiple-choice question set in biology, chemistry, and physics, authored by PhD-level experts (Human baseline 69.7%) (higher is better)"
          link={{
            url: "https://epoch.ai/benchmarks/gpqa-diamond",
            title: "AI performance on a set of Ph.D.-level science questions"
          }}
          sort={{ enabled: true }}
        />
      ),
      cell: ({ row }) => {
        const value = row.original.GPQAdiamond;
        const cellStyle =
          value === 0
            ? {}
            : getCellBackground(value, GPQAdiamondRange.min, GPQAdiamondRange.max);
        return (
          <div
            style={cellStyle}
            className="font-mono text-right block px-2 py-1"
          >
            {value ? `${value.toFixed(1)}%` : "-"}
          </div>
        );
      },
      sortDescFirst: true,
      sortUndefined: "last",
    },
    {
      accessorKey: "HumLastExam",
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title="Humanity's Last Exam"
          subtitle="no tools"
          tooltip="A multi-modal benchmark at the frontier of human knowledge, designed to be the final closed-ended academic benchmark of its kind with broad subject coverage (higher is better)"
          link={{
            url: "https://lastexam.ai/",
            title: "2,500 challenging questions across over a hundred subjects"
          }}
          sort={{ enabled: true }}
        />
      ),
      cell: ({ row }) => {
        const value = row.original.HumLastExam;
        const cellStyle =
          value === 0
            ? {}
            : getCellBackground(value, HumLastExamRange.min, HumLastExamRange.max);
        return (
          <div
            style={cellStyle}
            className="font-mono text-right block px-2 py-1"
          >
            {value ? `${value.toFixed(1)}%` : "-"}
          </div>
        );
      },
      sortDescFirst: true,
      sortUndefined: "last",
    },
    {
      accessorKey: "simpleBench",
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
      cell: ({ row }) => {
        const value = row.original.simpleBench;
        return (
          <div
            style={getCellBackground(
              value,
              simpleBenchRange.min,
              simpleBenchRange.max,
            )}
            className="font-mono text-right block px-2 py-1"
          >
            {value ? `${value.toFixed(1)}%` : "-"}
          </div>
        );
      },
      sortingFn: "alphanumeric",
      sortDescFirst: true,
      sortUndefined: "last",
    },
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
      cell: ({ row }) => {
        const value = row.original.SWEBench;
        return (
          <div
            style={getCellBackground(
              value,
              SWEBenchRange.min,
              SWEBenchRange.max,
            )}
            className="font-mono text-right block px-2 py-1"
          >
            {value ? `${value.toFixed(1)}%` : "-"}
          </div>
        );
      },
      sortDescFirst: true,
      sortUndefined: "last",
    },
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
      cell: ({ row }) => {
        const value = row.original.ARCAGI2;
        return (
          <div
            style={getCellBackground(
              value,
              ARCAGI2Range.min,
              ARCAGI2Range.max,
            )}
            className="font-mono text-right block px-2 py-1"
          >
            {value ? `${value.toFixed(1)}%` : "-"}
          </div>
        );
      },
      sortDescFirst: true,
      sortUndefined: "last",
    },
    {
      accessorKey: "fictionLiveBench",
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title="Fiction.LiveBench"
          subtitle="@60k"
          tooltip="Fiction.LiveBench: Evaluates performance on long complex stories across different context lengths (higher is better). We use the 60k context length score here."
          link={{
            url: "https://fiction.live/stories/Fiction-liveBench-Mar-25-2025/oQdzQvKHw8JyXbN87",
            title: "Fiction.LiveBench Methodology",
          }}
          sort={{ enabled: true }}
        />
      ),
      cell: ({ row }) => {
        const value = row.original.fictionLiveBench;
        return (
          <div
            style={getCellBackground(
              value,
              fictionLiveBenchRange.min,
              fictionLiveBenchRange.max,
            )}
            className="font-mono text-right block px-2 py-1"
          >
            {value ? `${value.toFixed(1)}%` : "-"}
          </div>
        );
      },
      sortingFn: "alphanumeric",
      sortDescFirst: true,
      sortUndefined: "last",
    },
    {
      accessorKey: "VendingBench",
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title="Vending Bench 2"
          subtitle="Net worth, USD"
          tooltip="A benchmark for measuring AI model performance on running a business over a year; bank balance in the end (higher is better)"
          link={{
            url: "https://andonlabs.com/evals/vending-bench-2",
            title: "Fiction.LiveBench Methodology",
          }}
          sort={{ enabled: true }}
        />
      ),
      cell: ({ row }) => {
        const value = row.original.VendingBench;
        return (
          <div
            style={getCellBackground(
              value,
              VendingBenchRange.min,
              VendingBenchRange.max,
            )}
            className="font-mono text-right block px-2 py-1"
          >
            {value ? `$${value.toFixed(2)}` : "-"}
          </div>
        );
      },
      sortUndefined: "last",
    },
    {
      accessorKey: "hasVision",
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          title="Vision"
          tooltip="Whether the model can process images"
          filter={{ type: "boolean", enabled: true }}
          verticalText={true} // Add this line
        />
      ),
      cell: ({ row }) => (
        <span className="text-center block">
          {row.original.hasVision ? "✓" : "-"}
        </span>
      ),
      filterFn: (row, id, value: boolean) => {
        if (value === undefined) return true;
        return row.getValue(id) === value;
      },
      maxSize: 50,
    },
  ];
};
