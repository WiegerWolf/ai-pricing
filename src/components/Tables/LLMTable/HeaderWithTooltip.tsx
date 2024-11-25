// src/components/Tables/LLMTable/HeaderWithTooltip.tsx
import { Column } from "@tanstack/react-table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LLMModel } from "@/types/llm";

interface HeaderWithTooltipProps {
    column: Column<LLMModel, unknown>;
    title: string;
    tooltip: string;
    link?: string;
}

const ExternalLinkIcon = () => (
    <svg className="inline-block ml-1 w-3 h-3" viewBox="0 0 12 12">
        <path
            fill="currentColor"
            d="M3.5 3a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V6h1v2.5A1.5 1.5 0 0 1 8.5 10h-5A1.5 1.5 0 0 1 2 8.5v-5A1.5 1.5 0 0 1 3.5 2H6v1H3.5z"
        />
        <path
            fill="currentColor"
            d="M6.5 1H11v4.5L9.25 3.75 6.5 6.5 5.5 5.5l2.75-2.75L6.5 1z"
        />
    </svg>
);

export function HeaderWithTooltip({ column, title, tooltip, link }: HeaderWithTooltipProps) {
    const content = (
        <div className="flex items-center gap-1">
            {title}
            {link && <ExternalLinkIcon />}
        </div>
    );

    const header = link ? (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            onClick={(e) => e.stopPropagation()}
        >
            {content}
        </a>
    ) : (
        content
    );

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex items-center" onClick={() => column.toggleSorting()}>
                        {header}
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="max-w-xs">{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
