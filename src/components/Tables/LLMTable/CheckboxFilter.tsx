import { Checkbox } from "@/components/ui/checkbox";
import { Column } from "@tanstack/react-table";
import { LLMModel } from "@/types/llm";

interface CheckboxFilterProps {
    column: Column<LLMModel, unknown>;
}

export function CheckboxFilter({ column }: CheckboxFilterProps) {
    const value = column?.getFilterValue() as boolean | undefined;

    return (
        <div className="flex items-center gap-1">
            <Checkbox
                checked={value === true}
                onClick={() => {
                    if (value === true) {
                        column?.setFilterValue(undefined);
                    } else {
                        column?.setFilterValue(true);
                    }
                }}
                className="h-3 w-3 rounded-sm"
            />
            <span className="text-[10px] text-slate-400 dark:text-slate-500">only</span>
        </div>
    );
}
