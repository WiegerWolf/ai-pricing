interface FilterInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const FilterInput = ({ value, onChange, placeholder }: FilterInputProps) => (
    <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-gray-200 focus:border-blue-500 outline-none px-1 py-0.5 text-xs"
    />
);
