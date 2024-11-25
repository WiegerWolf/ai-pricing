import { ColumnDef, Row } from "@tanstack/react-table";
import { LLMModel } from "@/types/llm";
import { SortableHeader } from "./SortableHeader";
import { RangeFilterHeader } from "./RangeFilterHeader";
import anthropicLogo from '@/assets/anthropic.png';
import cloudflareLogo from '@/assets/cloudflare.png';
import googleLogo from '@/assets/google.png';
import openaiLogo from '@/assets/openai.ico';
import groqLogo from '@/assets/groq.png';
import xAILogo from '@/assets/xAI.svg';

// Create a mapping of provider names to their logos
const providerLogos: Record<string, string> = {
    'Anthropic': anthropicLogo,
    'Cloudflare': cloudflareLogo,
    'Google AI': googleLogo,
    'OpenAI': openaiLogo,
    "Groq": groqLogo,
    'xAI': xAILogo,
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

export const columns: ColumnDef<LLMModel>[] = [
    {
        accessorKey: "model",
        header: ({ column }) => (
            <SortableHeader column={column} title="Model" canFilter />
        ),
        filterFn: "includesString",
        cell: ({ row }) => (
            <a
                href={row.original.pricingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1"
            >
                {row.original.model}
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
        ),
    },
    {
        accessorKey: "provider",
        header: ({ column }) => (
            <SortableHeader column={column} title="Provider" canFilter />
        ),
        filterFn: "includesString",
        cell: ({ row }) => {
            const provider = row.getValue<string>("provider");
            const logo = providerLogos[provider];

            return (
                <div className="flex items-center gap-2">
                    {logo && (
                        <img
                            src={logo}
                            alt={`${provider} logo`}
                            className="w-4 h-4 object-contain"
                        />
                    )}
                    <span>{provider}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "smartsElo",
        header: ({ column }) => <SortableHeader column={column} title="Arena ELO" />,
        cell: ({ row }) => (
            <span className="font-mono text-right block">
                {row.original.smartsElo || "-"}
            </span>
        ),
        sortDescFirst: true,
        sortUndefined: 'last'
    },
    {
        accessorKey: "simpleBench",
        header: ({ column }) => <SortableHeader column={column} title="SimpleBench" />,
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
        accessorKey: "codingElo",
        header: ({ column }) => <SortableHeader column={column} title="Coding ELO" />,
        cell: ({ row }) => row.original.codingElo || "-",
        sortDescFirst: true,
        sortUndefined: 'last'
    },
    {
        accessorKey: "context",
        header: ({ column }) => <SortableHeader column={column} title="Context (k)" />,
        sortingFn: "alphanumeric",
        sortDescFirst: true,
    },
    {
        accessorKey: "inputPrice",
        header: ({ column }) => (
            <RangeFilterHeader column={column} title="Input Price" />
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
            <RangeFilterHeader column={column} title="Output Price" />
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
        header: "Vision",
        cell: ({ row }) => (
            <span className="text-center block">
                {row.original.hasVision ? "✓" : "-"}
            </span>
        ),
    },
];

