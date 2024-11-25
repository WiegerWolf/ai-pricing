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
            value={column?.getFilterValue() as string || "all"}
            onValueChange={(value) => {
                column?.setFilterValue(value === "all" ? "" : value);
            }}
        >
            <SelectTrigger className="h-6 w-full text-xs min-w-[100px] py-0">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="text-xs">
                <SelectItem value="all">All</SelectItem>
                {options.map((option) => (
                    <SelectItem key={option} value={option} className="py-0.5">
                        {option}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
