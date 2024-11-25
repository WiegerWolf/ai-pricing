import { Column } from "@tanstack/react-table";
import { LLMModel } from "@/types/llm";

export interface ColumnHeaderProps {
    // Basic props (required)
    title: string;
    column: Column<LLMModel, unknown>;

    // Optional features
    tooltip?: string;          // Hover explanation
    link?: {                   // External link
        url: string;
        title: string;
    };
    filter?: {                 // Filter configuration
        type: 'text' | 'range';
        enabled: boolean;
    };
    sort?: {                   // Sort configuration
        enabled: boolean;
        descFirst?: boolean;
    };
}