// src/components/Tables/LLMTable/RangeFilterHeader.tsx
import { Column } from "@tanstack/react-table";
import { FilterInput } from "./FilterInput";
import { SortableHeader } from "./SortableHeader";
import { LLMModel } from "@/types/llm";

interface RangeFilterHeaderProps {
    column: Column<LLMModel, unknown>;
    title: string;
}

export const RangeFilterHeader = ({ column, title }: RangeFilterHeaderProps) => (
    <div className="space-y-1">
        <SortableHeader column={column} title={title} />
        <div className="flex gap-1 items-center text-xs">
            <FilterInput
                value={(column?.getFilterValue() as [string, string])?.[0] ?? ""}
                onChange={(value) =>
                    column.setFilterValue((old: [string, string]) => [value, old?.[1]])
                }
                placeholder="Min"
            />
            <span>-</span>
            <FilterInput
                value={(column?.getFilterValue() as [string, string])?.[1] ?? ""}
                onChange={(value) =>
                    column.setFilterValue((old: [string, string]) => [old?.[0], value])
                }
                placeholder="Max"
            />
        </div>
    </div>
);
