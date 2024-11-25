import { ArrowUpDown } from "lucide-react";
import { Column } from "@tanstack/react-table";
import { LLMModel } from "@/types/llm";
import { FilterInput } from "./FilterInput";

interface SortableHeaderProps {
    column: Column<LLMModel, unknown>;
    title: string;
    canFilter?: boolean;
}

export const SortableHeader = ({ column, title, canFilter }: SortableHeaderProps) => {
    return (
        <div className="space-y-1">
            <button
                className="inline-flex items-center gap-1 hover:bg-gray-100 rounded px-1 py-0.5 text-xs font-medium"
                onClick={() => column.toggleSorting()}
            >
                {title}
                <ArrowUpDown className="h-3 w-3 text-gray-400" />
            </button>
            {canFilter && (
                <FilterInput
                    value={(column?.getFilterValue() as string) ?? ""}
                    onChange={(value) => column.setFilterValue(value)}
                    placeholder={`Filter ${title.toLowerCase()}...`}
                />
            )}
        </div>
    );
};
