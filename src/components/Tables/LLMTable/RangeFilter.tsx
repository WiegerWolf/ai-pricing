// components/Tables/LLMTable/RangeFilter.tsx
import { FilterInput } from "./FilterInput";
import { Column } from "@tanstack/react-table";
import { LLMModel } from "@/types/llm";
import { useContainerWidth } from "@/hooks/useContainerWidth";

interface RangeFilterProps {
    column: Column<LLMModel, unknown>;
}

export function RangeFilter({ column }: RangeFilterProps) {
    const { containerRef, width } = useContainerWidth();
    const MINIMUM_SIDE_BY_SIDE_WIDTH = 60; // Adjust this value as needed

    return (
        <div
            ref={containerRef}
            className={`grid gap-0.5 ${width >= MINIMUM_SIDE_BY_SIDE_WIDTH
                    ? 'grid-cols-2'
                    : 'grid-cols-1'
                }`}
        >
            <FilterInput
                placeholder="Min"
                value={(column.getFilterValue() as [string, string])?.[0] ?? ""}
                onChange={(value) =>
                    column.setFilterValue((old: [string, string]) => [
                        value,
                        old?.[1] ?? "",
                    ])
                }
            />
            <FilterInput
                placeholder="Max"
                value={(column.getFilterValue() as [string, string])?.[1] ?? ""}
                onChange={(value) =>
                    column.setFilterValue((old: [string, string]) => [
                        old?.[0] ?? "",
                        value,
                    ])
                }
            />
        </div>
    );
}