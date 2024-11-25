// components/Tables/LLMTable/ColumnHeader.tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FilterInput } from "./FilterInput";
import { ColumnHeaderProps } from "@/components/types/column-header";
import { SelectFilter } from "./SelectFilter";

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

export function ColumnHeader({
    title,
    column,
    tooltip,
    link,
    filter,
    sort
}: ColumnHeaderProps) {
    // Prepare the title content
    const titleContent = (
        <div className="flex items-center gap-1">
            {/* Title with optional link */}
            {link ? (
                <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    onClick={(e) => e.stopPropagation()}
                    title={link.title}
                >
                    {title}
                    <ExternalLinkIcon />
                </a>
            ) : (
                title
            )}

            {/* Sort indicator */}
            {sort?.enabled && (
                <span className="ml-1">
                    {{
                        asc: " 🔼",
                        desc: " 🔽",
                    }[column.getIsSorted() as string] ?? null}
                </span>
            )}
        </div>
    );

    // Wrap content in header container
    const headerContent = (
        <div className="space-y-1">
            {/* Title area (with sort if enabled) */}
            <div
                className="flex items-center"
                onClick={() => sort?.enabled && column.toggleSorting()}
                style={{ cursor: sort?.enabled ? 'pointer' : 'default' }}
            >
                {titleContent}
            </div>

            {/* Filter area */}
            {filter?.enabled && (
                filter.type === 'range' ? (
                    <div className="flex gap-1">
                        <FilterInput
                            placeholder="Min"
                            value={(column.getFilterValue() as [string, string])?.[0] ?? ""}
                            onChange={(value) =>
                                column.setFilterValue((old: [string, string]) => [
                                    value,
                                    old?.[1] ?? "",
                                ])
                            }
                        />
                        <FilterInput
                            placeholder="Max"
                            value={(column.getFilterValue() as [string, string])?.[1] ?? ""}
                            onChange={(value) =>
                                column.setFilterValue((old: [string, string]) => [
                                    old?.[0] ?? "",
                                    value,
                                ])
                            }
                        />
                    </div>
                ) : filter.type === 'select' ? (
                    <SelectFilter
                        column={column}
                        options={filter.options || []}
                        placeholder={`Select ${title}...`}
                    />
                ) : (
                    <FilterInput
                        column={column}
                        placeholder={`Filter ${title}...`}
                    />
                )
            )}
        </div>
    );

    // Wrap in tooltip if tooltip text provided
    return tooltip ? (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {headerContent}
                </TooltipTrigger>
                <TooltipContent>
                    <p className="max-w-xs">{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    ) : headerContent;
}
