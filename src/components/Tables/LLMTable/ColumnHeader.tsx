// components/Tables/LLMTable/ColumnHeader.tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FilterInput } from "./FilterInput";
import { ColumnHeaderProps } from "@/components/types/column-header";
import { SelectFilter } from "./SelectFilter";
import { CheckboxFilter } from "./CheckboxFilter";
import { RangeFilter } from "./RangeFilter";
import { MultiSelectFilter } from "./MultiSelectFilter";

export function ColumnHeader({
    title,
    column,
    tooltip,
    link,
    filter,
    sort,
    verticalText // Add verticalText prop
}: ColumnHeaderProps) {
    const SortIcon = () => (
        <svg
            className={`h-3 w-3 ${sort?.enabled ? 'opacity-100' : 'opacity-0'}`}
            viewBox="0 0 24 24"
        >
            <path
                fill="currentColor"
                d="M12 3.5L7 8.5h10l-5-5zm0 17l5-5H7l5 5z"
                className={column.getIsSorted() === "asc"
                    ? "fill-current opacity-100"
                    : column.getIsSorted() === "desc"
                        ? "fill-current opacity-100"
                        : "fill-current opacity-40"
                }
            />
        </svg>
    );

    const handleHeaderClick = (e: React.MouseEvent) => {
        if (sort?.enabled) {
            e.preventDefault();
            e.stopPropagation();
            column.toggleSorting();
        }
    };

    return (
        <div className="space-y-0.5 text-xs">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div
                            className={`hover:bg-gray-50 p-0.5 rounded cursor-pointer select-none ${verticalText
                                ? '[writing-mode:vertical-rl] rotate-180 whitespace-nowrap h-16 flex flex-col items-start justify-center gap-1' // Reduced height for vertical text
                                : 'flex items-center gap-0.5' // Horizontal layout: flex, items-center
                                }`}
                            onClick={handleHeaderClick}
                        >
                            {/* Title or Link (without icon for vertical) */}
                            {link && !verticalText ? (
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline inline-flex items-center"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {title}
                                    {/* Link icon for horizontal layout */}
                                    <svg className="w-2.5 h-2.5 ml-0.5 opacity-50" viewBox="0 0 12 12">
                                        <path fill="currentColor" d="M6.5 1H11v4.5L9.25 3.75 6.5 6.5 5.5 5.5l2.75-2.75L6.5 1z" />
                                    </svg>
                                </a>
                            ) : (
                                <span>{title}</span>
                            )}

                            {/* Icons container (horizontal for normal, vertical for verticalText due to writing-mode) */}
                            <div className={`flex items-center ${verticalText ? 'gap-1' : 'gap-0.5'}`}>
                                {/* Link icon for vertical layout */}
                                {link && verticalText && (
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <svg className="w-2.5 h-2.5 opacity-50 hover:opacity-80" viewBox="0 0 12 12">
                                            <path fill="currentColor" d="M6.5 1H11v4.5L9.25 3.75 6.5 6.5 5.5 5.5l2.75-2.75L6.5 1z" />
                                        </svg>
                                    </a>
                                )}
                                {/* Tooltip Icon */}
                                {tooltip && (
                                    <span className="text-gray-400 text-xs rounded-full border border-gray-300 inline-flex items-center justify-center w-3.5 h-3.5">
                                        ?
                                    </span>
                                )}
                                {/* Sort Icon */}
                                {sort?.enabled && <span><SortIcon /></span>}
                            </div>
                        </div>
                    </TooltipTrigger>
                    {tooltip && (
                        <TooltipContent side={verticalText ? "left" : "top"} align="start" className="text-xs"> {/* Adjust tooltip side for vertical */}
                            <p className="max-w-xs">{tooltip}</p>
                        </TooltipContent>
                    )}
                </Tooltip>
            </TooltipProvider>

            {filter?.enabled && (
                <div className="flex gap-0.5">
                    {filter.type === 'range' ? (
                        <RangeFilter column={column} />
                    ) : filter.type === 'select' ? (
                        <SelectFilter
                            column={column}
                            options={filter.options || []}
                            placeholder={`Filter...`}
                        />
                    ) : filter.type === 'multi-select' ? (
                        <MultiSelectFilter
                            column={column}
                            options={filter.options || []}
                            placeholder={`Filter...`}
                        />
                    ) : filter.type === 'boolean' ? (
                        <CheckboxFilter column={column} />
                    ) : (
                        <FilterInput
                            column={column}
                            placeholder="Filter..."
                        />
                    )}
                </div>
            )}
        </div>
    );
}
