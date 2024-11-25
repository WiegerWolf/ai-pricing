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
    return (
        <Select
            value={(column?.getFilterValue() as string) ?? ''}
            onValueChange={(value) => column?.setFilterValue(value)}
        >
            <SelectTrigger className="h-8 w-full text-xs">
                <SelectValue placeholder={placeholder || "Select..."} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="">All</SelectItem>
                {options.map((option) => (
                    <SelectItem key={option} value={option}>
                        {option}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
