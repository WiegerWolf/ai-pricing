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
import { providerLogos } from "@/config/logos";

interface SelectFilterProps {
    column: Column<LLMModel, unknown>;
    options: string[];
    placeholder?: string;
}

export function SelectFilter({ column, options, placeholder }: SelectFilterProps) {
    const filterValue = column.getFilterValue() as string;

    return (
        <Select
            value={filterValue || "all"}
            onValueChange={(value) => {
                column?.setFilterValue(value === "all" ? "" : value);
            }}
        >
            <SelectTrigger className="h-6 w-full text-xs min-w-[30px] py-0 pl-2 pr-6">
                <SelectValue placeholder={placeholder} className="truncate" />
            </SelectTrigger>
            <SelectContent className="text-xs">
                <SelectItem value="all" className="pl-2 pr-6">All</SelectItem>
                {options.map((option) => (
                    <SelectItem
                        key={option}
                        value={option}
                        className="py-1 pl-2 pr-6"
                    >
                        <div className="flex items-center gap-2 w-full">
                            {providerLogos[option] && (
                                <img
                                    src={providerLogos[option]}
                                    alt={`${option} logo`}
                                    className="w-3.5 h-3.5 object-contain flex-shrink-0"
                                />
                            )}
                            <span className="truncate">{option}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
