import { Column } from "@tanstack/react-table";
import { LLMModel } from "@/types/llm";

interface FilterInputProps {
    column?: Column<LLMModel, unknown>;  // Make column optional
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
}

export const FilterInput = ({
    column,
    value: propValue,
    onChange: propOnChange,
    placeholder
}: FilterInputProps) => {
    // Use either direct props or column filter value
    const value = propValue ?? (column?.getFilterValue() as string) ?? '';
    const onChange = propOnChange ?? ((value: string) => column?.setFilterValue(value));

    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent border-b border-gray-200 focus:border-blue-500 outline-none px-1 py-0.5 text-xs"
        />
    );
};
