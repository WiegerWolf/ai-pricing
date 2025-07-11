import { ColumnDef, Row } from "@tanstack/react-table";
import { LLMModel } from "@/types/llm";
import { ColumnHeader } from "./ColumnHeader";
import { providerLogos, developerLogos } from "@/config/logos";
import { getCellBackground, getColumnMinMax } from "@/utils/colorScale";

// Helper function for price range filtering
const createPriceRangeFilter = (
    row: Row<LLMModel>,
    columnId: string,
    value: [string, string]
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

// Get unique providers from the data
const getUniqueProviders = (data: LLMModel[]) => {
    const providers = new Set(data.map(model => model.provider));
    return Array.from(providers).sort();
};

export const columns = (data: LLMModel[]): ColumnDef<LLMModel>[] => {
    // Calculate min/max values for numerical columns
    const webdevEloRange = getColumnMinMax(data, 'webdevElo');
    const simpleBenchRange = getColumnMinMax(data, 'simpleBench');
    const fictionLiveBenchRange = getColumnMinMax(data, 'fictionLiveBench');
    const contextRange = getColumnMinMax(data, 'context');
    const inputPriceRange = getColumnMinMax(data, 'inputPrice');
    const outputPriceRange = getColumnMinMax(data, 'outputPrice');
    const costRange = getColumnMinMax(data, 'costAAIndex');
    const aaIndexRange = getColumnMinMax(data, 'AAIndex'); // Add AAIndex range calculation
    const aiderBenchRange = getColumnMinMax(data, 'aiderBench');
    const mcBenchEloRange = getColumnMinMax(data, 'mcBenchElo'); // Ensure this uses the correct key

    return [
        {
            accessorKey: "model",
            header: ({ column }) => (
                <ColumnHeader
                    column={column}
                    title="Model"
                    tooltip="Model name and version"
                    filter={{ type: 'text', enabled: true }}
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
            minSize: 250,
        },
        {
            accessorKey: "provider",
            header: ({ column }) => (
                <ColumnHeader
                    column={column}
                    title="Provider"
                    tooltip="The company that provides the model"
                    filter={{
                        type: 'multi-select',
                        enabled: true,
                        options: getUniqueProviders(data)
                    }}
                    sort={{ enabled: true }}
                />
            ),
            filterFn: (row, id, value) => {
                if (!value || (Array.isArray(value) && value.length === 0)) return true;
                return Array.isArray(value) && value.includes(row.getValue(id));
            },
            cell: ({ row }) => {
                const provider = row.getValue<string>("provider");
                const logo = providerLogos[provider];
                const content = (
                    <>
                        {logo && (
                            <img
                                src={logo}
                                alt={`${provider} logo`}
                                className="w-4 h-4 object-contain"
                            />
                        )}
                        <span>{provider}</span>
                    </>
                );

                return row.original.pricingUrl ? (
                    <a
                        href={row.original.pricingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
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
                    <div className="flex items-center gap-2">
                        {content}
                    </div>
                );
            },
        },
        {
            accessorKey: "webdevElo",
            header: ({ column }) => (
                <ColumnHeader
                    column={column}
                    title="WebDev"
                    tooltip="Web development specific performance score (higher is better)"
                    link={{ url: "https://web.lmarena.ai/leaderboard", title: "Web Arena Leaderboard" }}
                    sort={{ enabled: true }}
                />
            ),
            cell: ({ row }) => {
                const value = row.original.webdevElo;
                return (
                    <div 
                        style={getCellBackground(value, webdevEloRange.min, webdevEloRange.max)}
                        className="font-mono text-right block px-2 py-1"
                    >
                        {value || "-"}
                    </div>
                );
            },
            sortDescFirst: true,
            sortUndefined: 'last'
        },
        {
            accessorKey: "aiderBench",
            header: ({ column }) => (
                <ColumnHeader
                    column={column}
                    title="Aider"
                    tooltip="Polyglot benchmark measuring ability to edit code across multiple languages (higher is better)"
                    link={{ url: "https://aider.chat/docs/leaderboards/", title: "Aider LLM Benchmarks" }}
                    sort={{ enabled: true }}
                />
            ),
            cell: ({ row }) => {
                const value = row.original.aiderBench;
                return (
                    <div 
                        style={getCellBackground(value, aiderBenchRange.min, aiderBenchRange.max)}
                        className="font-mono text-right block px-2 py-1"
                    >
                        {value ? `${value.toFixed(1)}%` : "-"}
                    </div>
                );
            },
            sortingFn: "alphanumeric",
            sortDescFirst: true,
            sortUndefined: 'last'
        },
        {
            accessorKey: "mcBenchElo",
            header: ({ column }) => (
                <ColumnHeader
                    column={column}
                    title="MCBench"
                    tooltip="Minecraft benchmark measuring ability to build 3D structures (higher is better)"
                    link={{ url: "https://mcbench.ai/leaderboard", title: "MCBench Leaderboard" }}
                    sort={{ enabled: true }}
                />
            ),
            cell: ({ row }) => {
                const value = row.original.mcBenchElo;
                return (
                    <div
                        style={getCellBackground(value, mcBenchEloRange.min, mcBenchEloRange.max)}
                        className="font-mono text-right block px-2 py-1"
                    >
                        {value || "-"}
                    </div>
                );
            },
            sortDescFirst: true,
            sortUndefined: 'last'
        },
        {
            accessorKey: "simpleBench",
            header: ({ column }) => (
                <ColumnHeader
                    column={column}
                    title="SimpleBench"
                    tooltip="Benchmark covering spatio-temporal reasoning, social intelligence, and trick questions (Human Baseline 83.7%) (higher is better)"
                    link={{ url: "https://simple-bench.com/#leaderboardTable", title: "Simple Bench Leaderboard Table" }}
                    sort={{ enabled: true }}
                />
            ),
            cell: ({ row }) => {
                const value = row.original.simpleBench;
                return (
                    <div 
                        style={getCellBackground(value, simpleBenchRange.min, simpleBenchRange.max)}
                        className="font-mono text-right block px-2 py-1"
                    >
                        {value ? `${value.toFixed(1)}%` : "-"}
                    </div>
                );
            },
            sortingFn: "alphanumeric",
            sortDescFirst: true,
            sortUndefined: 'last'
        },
        {
            accessorKey: "fictionLiveBench",
            header: ({ column }) => (
                <ColumnHeader
                    column={column}
                    title="Fiction@60k"
                    tooltip="Fiction.LiveBench: Evaluates performance on long complex stories across different context lengths (higher is better). We use the 60k context length score here."
                    link={{ url: "https://fiction.live/stories/Fiction-liveBench-Mar-25-2025/oQdzQvKHw8JyXbN87", title: "Fiction.LiveBench Methodology" }}
                    sort={{ enabled: true }}
                />
            ),
            cell: ({ row }) => {
                const value = row.original.fictionLiveBench;
                return (
                    <div
                        style={getCellBackground(value, fictionLiveBenchRange.min, fictionLiveBenchRange.max)}
                        className="font-mono text-right block px-2 py-1"
                    >
                        {value ? `${value.toFixed(1)}%` : "-"} 
                    </div>
                );
            },
            sortingFn: "alphanumeric",
            sortDescFirst: true,
            sortUndefined: 'last'
        },
        {
            accessorKey: "context",
            header: ({ column }) => (
                <ColumnHeader
                    column={column}
                    title="Context"
                    tooltip="The maximum number of tokens the model can process at once. 'k' stands for thousands of tokens. 'M' stands for millions of tokens."
                    filter={{ type: 'range', enabled: true }}
                    sort={{ enabled: true }}
                />
            ),
            cell: ({ row }) => {
                const value = row.original.context;
                let displayValue = "-";
                if (value) {
                    if (value >= 1000) {
                        displayValue = "1M";
                    } else {
                        displayValue = `${value}k`;
                    }
                }
                const cellStyle = getCellBackground(row.original.context, contextRange.min, contextRange.max, {
                    useLog: true,
                    color: 'rgb(219 234 254)'
                });
                return (
                    <div
                        style={cellStyle}
                        className="font-mono text-right block px-2 py-1"
                    >
                        {displayValue}
                    </div>
                );
            },
            maxSize: 150,
            sortingFn: "alphanumeric",
            sortDescFirst: true,
        },
        {
            accessorKey: "inputPrice",
            header: ({ column }) => (
                <ColumnHeader
                    column={column}
                    title="Input"
                    tooltip="The cost per 1,000,000 tokens sent to the model"
                    filter={{ type: 'range', enabled: true }}
                    sort={{ enabled: true }}
                />
            ),
            cell: ({ row }) => {
                const value = row.original.inputPrice;
                const cellStyle = value === 0 ? {} : getCellBackground(value, inputPriceRange.min, inputPriceRange.max, {
                    useLog: true,
                    color: 'rgb(254 226 226)'
                });
                return (
                    <div
                        style={cellStyle}
                        className="font-mono text-right block px-2 py-1"
                    >
                        {value === 0 ? 'free' : value === undefined ? '-' : `$${value.toFixed(2)}`}
                    </div>
                );
            },
            maxSize: 150,
            filterFn: createPriceRangeFilter,
        },
        {
            accessorKey: "outputPrice",
            header: ({ column }) => (
                <ColumnHeader
                    column={column}
                    title="Output"
                    tooltip="The cost per 1,000,000 tokens received from the model"
                    filter={{ type: 'range', enabled: true }}
                    sort={{ enabled: true }}
                />
            ),
            cell: ({ row }) => {
                const value = row.original.outputPrice;
                const cellStyle = value === 0 ? {} : getCellBackground(value, outputPriceRange.min, outputPriceRange.max, {
                    useLog: true,
                    color: 'rgb(254 226 226)'
                });
                return (
                    <div
                        style={cellStyle}
                        className="font-mono text-right block px-2 py-1"
                    >
                        {value === 0 ? 'free' : value === undefined ? '-' : `$${value.toFixed(2)}`}
                    </div>
                );
            },
            maxSize: 150,
            filterFn: createPriceRangeFilter,
        },
        {
            accessorKey: "AAIndex",
            header: ({ column }) => (
                <ColumnHeader
                    column={column}
                    title="AAIndex"
                    tooltip="Artificial Analysis Intelligence Index (higher is better)"
                    link={{ url: "https://artificialanalysis.ai/leaderboards/models", title: "AAIndex Benchmark" }}
                    sort={{ enabled: true }}
                />
            ),
            cell: ({ row }) => {
                const value = row.original.AAIndex;
                // Use the AAIndex range for background color
                const cellStyle = getCellBackground(value, aaIndexRange.min, aaIndexRange.max, {
                    useLog: true,
                });
                return (
                    <div style={cellStyle} className="font-mono text-right block px-2 py-1">
                        {value === undefined || value === null ? '-' : value}
                    </div>
                );
            },
            sortingFn: "alphanumeric",
            sortDescFirst: true,
            sortUndefined: 'last',
            maxSize: 150,
        },
        {
            accessorKey: "costAAIndex",
            header: ({ column }) => (
                <ColumnHeader
                    column={column}
                    title="CostAAIndex"
                    tooltip="Cost (USD) to run all evaluations in the Artificial Analysis Intelligence Index"
                    link={{ url: "https://artificialanalysis.ai/models#cost-to-run-artificial-analysis-intelligence-index", title: "Cost to run Artificial Analysis Intelligence Index" }}
                    filter={{ type: 'range', enabled: true }}
                    sort={{ enabled: true }}
                />
            ),
            cell: ({ row }) => {
                const value = row.original.costAAIndex;
                const cellStyle = value === 0 ? {} : getCellBackground(value, costRange.min, costRange.max, {
                    useLog: true,
                    color: 'rgb(254 226 226)'
                });
                return (
                    <div
                        style={cellStyle}
                        className="font-mono text-right block px-2 py-1"
                    >
                        {value === undefined ? '-' : `$${value.toFixed(2)}`}
                    </div>
                );
            },
            maxSize: 150,
            filterFn: createPriceRangeFilter,
        },
        {
            accessorKey: "hasVision",
            header: ({ column }) => (
                <ColumnHeader
                    column={column}
                    title="Vision"
                    tooltip="Whether the model can process images"
                    filter={{ type: 'boolean', enabled: true }}
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
        {
            accessorKey: "toolUse",
            header: ({ column }) => (
                <ColumnHeader
                    column={column}
                    title="Tools"
                    tooltip="Whether the model can use tools"
                    filter={{ type: 'boolean', enabled: true }}
                    verticalText={true} // Add this line
                />
            ),
            cell: ({ row }) => (
                <span className="text-center block">
                    {row.original.toolUse ? "✓" : "-"}
                </span>
            ),
            filterFn: (row, id, value: boolean) => {
                if (value === undefined) return true;
                return row.getValue(id) === value;
            },
            maxSize: 50,
        },
        {
            accessorKey: "hasReasoning",
            header: ({ column }) => (
                <ColumnHeader
                    column={column}
                    title="Reasoning"
                    tooltip="Whether the model has an explicit 'thinking' or 'reasoning' mode"
                    filter={{ type: 'boolean', enabled: true }}
                    verticalText={true} // Add this line
                />
            ),
            cell: ({ row }) => (
                <span className="text-center block">
                    {row.original.hasReasoning ? "✓" : "-"}
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
