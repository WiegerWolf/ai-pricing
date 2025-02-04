import { ColumnDef, Row } from "@tanstack/react-table";
import { LLMModel } from "@/types/llm";
import anthropicLogo from '@/assets/anthropic.png';
import cloudflareLogo from '@/assets/cloudflare.png';
import googleLogo from '@/assets/google.png';
import openaiLogo from '@/assets/openai.ico';
import groqLogo from '@/assets/groq.png';
import metaLogo from '@/assets/meta.svg';
import xAILogo from '@/assets/xAI.svg';
import deepseekLogo from '@/assets/deepseek.svg';
import openrouterLogo from '@/assets/openrouter.png';
import nvidiaLogo from '@/assets/nvidia.ico';
import { ColumnHeader } from "./ColumnHeader";

// Create a mapping of provider names to their logos
const providerLogos: Record<string, string> = {
    'Anthropic': anthropicLogo,
    'Cloudflare': cloudflareLogo,
    'Google AI': googleLogo,
    'OpenAI': openaiLogo,
    "Groq": groqLogo,
    'xAI': xAILogo,
    'Meta': metaLogo,
    'DeepSeek': deepseekLogo,
    'OpenRouter': openrouterLogo,
};

// Add developer logos mapping (using same logos as providers)
const developerLogos: Record<string, string> = {
    'Anthropic': anthropicLogo,
    'OpenAI': openaiLogo,
    'Google AI': googleLogo,
    'Meta': metaLogo,
    'xAI': xAILogo,
    'DeepSeek': deepseekLogo,
    'Nvidia': nvidiaLogo,
};

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

export const columns = (data: LLMModel[]): ColumnDef<LLMModel>[] => [
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
    },
    {
        accessorKey: "provider",
        header: ({ column }) => (
            <ColumnHeader
                column={column}
                title="Provider"
                tooltip="The company that provides the model"
                filter={{
                    type: 'select',
                    enabled: true,
                    options: getUniqueProviders(data)
                }}
                sort={{ enabled: true }}
            />
        ),
        filterFn: "includesString",
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
        accessorKey: "smartsElo",
        header: ({ column }) => (
            <ColumnHeader
                column={column}
                title="Arena"
                tooltip="What people prefer (higher is better)"
                link={{ url: "https://lmarena.ai/?leaderboard", title: "LM Arena Leaderboard" }}
                filter={{ type: 'range', enabled: true }}
                sort={{ enabled: true }}
            />
        ),
        cell: ({ row }) => (
            <span className="font-mono text-right block">
                {row.original.smartsElo || "-"}
            </span>
        ),
        sortDescFirst: true,
        sortUndefined: 'last'
    },
    {
        accessorKey: "codingElo",
        header: ({ column }) => (
            <ColumnHeader
                column={column}
                title="Coding"
                tooltip="Coding-specific performance score (higher is better)"
                link={{ url: "https://openlm.ai/chatbot-arena/", title: "OpenLM Chatbot Arena" }}
                filter={{ type: 'range', enabled: true }}
                sort={{ enabled: true }}
            />
        ),
        cell: ({ row }) => (
            <span className="font-mono text-right block">
                {row.original.codingElo || "-"}
            </span>
        ),
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
        cell: ({ row }) => (
            <span className="font-mono text-right block">
                {row.original.simpleBench ? `${row.original.simpleBench.toFixed(1)}%` : "-"}
            </span>
        ),
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
                tooltip="The maximum number of tokens the model can process at once. 'k' stands for thousands of tokens."
                filter={{ type: 'range', enabled: true }}
                sort={{ enabled: true }}
            />
        ),
        cell: ({ row }) => {
            const context = row.original.context;
            return context ? `${context}k` : "-";
        },
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
        cell: ({ row }) => (
            <span className="font-mono text-right block">
                ${row.original.inputPrice}
            </span>
        ),
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
        cell: ({ row }) => (
            <span className="font-mono text-right block">
                ${row.original.outputPrice}
            </span>
        ),
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
    },
    {
        accessorKey: "toolUse",
        header: ({ column }) => (
            <ColumnHeader
                column={column}
                title="Tools"
                tooltip="Whether the model can use tools"
                filter={{ type: 'boolean', enabled: true }}
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
    },
];
