// components/Tables/LLMTable/CheckboxFilter.tsx
import { Checkbox } from "@/components/ui/checkbox";
import { Column } from "@tanstack/react-table";
import { LLMModel } from "@/types/llm";

interface CheckboxFilterProps {
    column: Column<LLMModel, unknown>;
}

export function CheckboxFilter({ column }: CheckboxFilterProps) {
    const value = column?.getFilterValue() as boolean | undefined;

    return (
        <div className="flex items-center gap-1.5">
            <Checkbox
                checked={value === true}
                onClick={() => {
                    if (value === true) {
                        column?.setFilterValue(undefined);
                    } else {
                        column?.setFilterValue(true);
                    }
                }}
                className="h-3 w-3"
            />
            <span className="text-xs text-gray-500">has</span>
        </div>
    );
}
