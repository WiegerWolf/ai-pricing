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
    const SortIcon = () => (
        <svg
            className={`ml-1 h-4 w-4 ${sort?.enabled ? 'opacity-100' : 'opacity-0'}`}
            xmlns="http://www.w3.org/2000/svg"
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

    const titleContent = (
        <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={handleHeaderClick}
        >
            {link ? (
                <div className="flex items-center">
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
                </div>
            ) : (
                <span>{title}</span>
            )}

            {sort?.enabled && <SortIcon />}
        </div>
    );

    return (
        <div>
            {tooltip ? (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div>{titleContent}</div>
                        </TooltipTrigger>
                        <TooltipContent side="top" align="start">
                            <p className="max-w-xs">{tooltip}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : (
                titleContent
            )}

            {filter?.enabled && (
                <div className="mt-2">
                    {filter.type === 'range' ? (
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
                    )}
                </div>
            )}
        </div>
    );
}