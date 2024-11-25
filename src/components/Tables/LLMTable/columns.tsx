import { ColumnDef } from "@tanstack/react-table";
import { LLMModel } from "../../../types/llm";
import { SortableHeader } from "./SortableHeader";

export const columns: ColumnDef<LLMModel>[] = [
    {
        accessorKey: "model",
        header: "Model",
        cell: ({ row }) => (
            <a
                href={row.original.pricingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="model-link"
            >
                {row.original.model}
                <svg className="external-link-icon" width="12" height="12" viewBox="0 0 12 12">
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
    },
    {
        accessorKey: "smartsElo",
        header: ({ column }) => <SortableHeader column={column} title="Arena ELO" />,
        cell: ({ row }) => row.original.smartsElo || "-",
        sortingFn: (a, b) => {
            const aValue = a.original.smartsElo || 0;
            const bValue = b.original.smartsElo || 0;
            return aValue - bValue;
        },
    },
    {
        accessorKey: "simpleBench",
        header: ({ column }) => <SortableHeader column={column} title="SimpleBench" />,
        cell: ({ row }) =>
            row.original.simpleBench ? `${row.original.simpleBench.toFixed(1)}%` : "-",
        sortingFn: (a, b) => {
            const aValue = a.original.simpleBench || 0;
            const bValue = b.original.simpleBench || 0;
            return aValue - bValue;
        },
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
        cell: ({ row }) => (row.original.hasVision ? "✓" : "-"),
    },
];
