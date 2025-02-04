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
import anthropicLogo from "@/assets/anthropic.png";
import cloudflareLogo from "@/assets/cloudflare.png";
import deepseekLogo from "@/assets/deepseek.svg";
import googleLogo from "@/assets/google.png";
import groqLogo from "@/assets/groq.png";
import metaLogo from "@/assets/meta.svg";
import nvidiaLogo from "@/assets/nvidia.ico";
import openaiLogo from "@/assets/openai.ico";
import openrouterLogo from "@/assets/openrouter.png";
import xaiLogo from "@/assets/xAI.svg";

const providerImages: { [key: string]: string } = {
    anthropic: anthropicLogo,
    cloudflare: cloudflareLogo,
    deepseek: deepseekLogo,
    'google ai': googleLogo,
    groq: groqLogo,
    meta: metaLogo,
    nvidia: nvidiaLogo,
    openai: openaiLogo,
    openrouter: openrouterLogo,
    xai: xaiLogo
};

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
                            {providerImages[option.toLowerCase()] && (
                                <img
                                    src={providerImages[option.toLowerCase()]}
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
