// components/Tables/LLMTable/ColumnHeader.tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FilterInput } from "./FilterInput";
import { ColumnHeaderProps } from "@/components/types/column-header";
import { SelectFilter } from "./SelectFilter";

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
                            className="flex items-center gap-0.5 hover:bg-gray-50 p-0.5 rounded cursor-pointer select-none"
                            onClick={handleHeaderClick}
                        >
                            {link ? (
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline inline-flex items-center"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {title}
                                    <svg className="w-2.5 h-2.5 ml-0.5 opacity-50" viewBox="0 0 12 12">
                                        <path fill="currentColor" d="M6.5 1H11v4.5L9.25 3.75 6.5 6.5 5.5 5.5l2.75-2.75L6.5 1z" />
                                    </svg>
                                </a>
                            ) : (
                                <span>{title}</span>
                            )}
                            {sort?.enabled && <SortIcon />}
                        </div>
                    </TooltipTrigger>
                    {tooltip && (
                        <TooltipContent side="top" align="start" className="text-xs">
                            <p className="max-w-xs">{tooltip}</p>
                        </TooltipContent>
                    )}
                </Tooltip>
            </TooltipProvider>

            {filter?.enabled && (
                <div className="flex gap-0.5">
                    {filter.type === 'range' ? (
                        <>
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
                        </>
                    ) : filter.type === 'select' ? (
                        <SelectFilter
                            column={column}
                            options={filter.options || []}
                            placeholder={`Filter...`}
                        />
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