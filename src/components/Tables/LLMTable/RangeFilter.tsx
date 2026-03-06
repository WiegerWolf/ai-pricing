// components/Tables/LLMTable/RangeFilter.tsx
import { FilterInput } from "./FilterInput";
import { Column } from "@tanstack/react-table";
import { LLMModel } from "@/types/llm";
import { useContainerWidth } from "@/hooks/useContainerWidth";

interface RangeFilterProps {
    column: Column<LLMModel, unknown>;
    showMax?: boolean;
}

export function RangeFilter({ column, showMax = true }: RangeFilterProps) {
    const { containerRef, width } = useContainerWidth();
    const MINIMUM_SIDE_BY_SIDE_WIDTH = 60; // Adjust this value as needed
    const filterValue = (column.getFilterValue() as [string, string]) ?? ["", ""];

    return (
        <div
            ref={containerRef}
            className={`grid gap-0.5 ${showMax && width >= MINIMUM_SIDE_BY_SIDE_WIDTH
                    ? 'grid-cols-2'
                    : 'grid-cols-1'
                }`}
        >
            <FilterInput
                placeholder="Min"
                value={filterValue[0]}
                onChange={(value) =>
                    column.setFilterValue((old: [string, string]) => {
                        const prev = old ?? ["", ""];
                        return [value, showMax ? (prev[1] ?? "") : ""];
                    })
                }
            />
            {showMax && (
                <FilterInput
                    placeholder="Max"
                    value={filterValue[1]}
                    onChange={(value) =>
                        column.setFilterValue((old: [string, string]) => [
                            old?.[0] ?? "",
                            value,
                        ])
                    }
                />
            )}
        </div>
    );
}
