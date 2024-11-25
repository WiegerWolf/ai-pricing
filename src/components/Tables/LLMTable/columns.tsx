import { ColumnDef } from "@tanstack/react-table";
import { LLMModel } from "../../../types/llm";
import { SortableHeader } from "./SortableHeader";

export const columns: ColumnDef<LLMModel>[] = [
    {
        accessorKey: "model",
        header: "Model",
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
        header: "Provider",
        filterFn: "includesString",
        cell: ({ row }) => (
            <span className="text-gray-600">{row.original.provider}</span>
        ),
    },
    {
        accessorKey: "smartsElo",
        header: ({ column }) => <SortableHeader column={column} title="Arena ELO" />,
        cell: ({ row }) => (
            <span className="font-mono text-right block">
                {row.original.smartsElo || "-"}
            </span>
        ),
    },
    {
        accessorKey: "simpleBench",
        header: ({ column }) => <SortableHeader column={column} title="SimpleBench" />,
        cell: ({ row }) => (
            <span className="font-mono text-right block">
                {row.original.simpleBench ? `${row.original.simpleBench.toFixed(1)}%` : "-"}
            </span>
        ),
    },
    {
        accessorKey: "codingElo",
        header: ({ column }) => <SortableHeader column={column} title="Coding ELO" />,
        cell: ({ row }) => row.original.codingElo || "-",
        sortingFn: (a, b) => {
            const aValue = a.original.codingElo || 0;
            const bValue = b.original.codingElo || 0;
            return aValue - bValue;
        },
    },
    {
        accessorKey: "context",
        header: ({ column }) => <SortableHeader column={column} title="Context (k)" />,
        sortingFn: "alphanumeric"
    },
    {
        accessorKey: "inputPrice",
        header: ({ column }) => <SortableHeader column={column} title="Input Price" />,
        cell: ({ row }) => `$${row.original.inputPrice}`,
        sortingFn: "alphanumeric"
    },
    {
        accessorKey: "outputPrice",
        header: ({ column }) => <SortableHeader column={column} title="Output Price" />,
        cell: ({ row }) => `$${row.original.outputPrice}`,
        sortingFn: "alphanumeric"
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
