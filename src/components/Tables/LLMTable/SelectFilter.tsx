// components/Tables/LLMTable/SelectFilter.tsx
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Column } from "@tanstack/react-table";
import { LLMModel } from "@/types/llm";

interface SelectFilterProps {
    column: Column<LLMModel, unknown>;
    options: string[];
    placeholder?: string;
}

export function SelectFilter({ column, options, placeholder }: SelectFilterProps) {
    const currentValue = column?.getFilterValue() as string;

    return (
        <Select
            value={currentValue || "all"}
            onValueChange={(value) => {
                column?.setFilterValue(value === "all" ? "" : value);
            }}
        >
            <SelectTrigger className="h-8 w-full text-xs">
                <SelectValue placeholder={placeholder || "Select..."} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                {options.map((option) => (
                    <SelectItem key={option} value={option}>
                        {option}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
