import { Column } from "@tanstack/react-table";
import { LLMModel } from "@/types/llm";

interface FilterInputProps {
    column?: Column<LLMModel, unknown>;
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
    const value = propValue ?? (column?.getFilterValue() as string) ?? '';
    const onChange = propOnChange ?? ((value: string) => column?.setFilterValue(value));

    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 outline-none px-1 py-0 text-[10px] h-[18px] text-slate-600 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600"
        />
    );
};
