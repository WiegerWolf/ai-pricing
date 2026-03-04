import {
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { columns as createColumns, columnGroups, ModelSortMode, MODEL_SORT_CYCLE } from "./columns";
import { LLMModel } from "@/types/llm";

interface DataTableProps {
    data: LLMModel[];
}

export function DataTable({ data }: DataTableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [modelSortMode, setModelSortMode] = useState<ModelSortMode>(null);

    const cycleModelSort = useCallback(() => {
        setModelSortMode((prev) => {
            const idx = MODEL_SORT_CYCLE.indexOf(prev);
            const next = MODEL_SORT_CYCLE[(idx + 1) % MODEL_SORT_CYCLE.length];
            if (next) {
                setSorting([{ id: "model", desc: false }]);
            } else {
                setSorting((s) => s.filter((col) => col.id !== "model"));
            }
            return next;
        });
    }, []);

    const handleSortingChange = useCallback(
        (updater: SortingState | ((prev: SortingState) => SortingState)) => {
            setSorting((prev) => {
                const next = typeof updater === "function" ? updater(prev) : updater;
                // If sorting changed to a non-model column, reset model sort mode
                const modelSort = next.find((s) => s.id === "model");
                if (!modelSort) {
                    setModelSortMode(null);
                }
                return next;
            });
        },
        [],
    );

    const tableColumns = useMemo(
        () => createColumns(data, modelSortMode, cycleModelSort),
        [data, modelSortMode, cycleModelSort],
    );

    const table = useReactTable({
        data,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: handleSortingChange,
        onColumnFiltersChange: setColumnFilters,
        state: {
            sorting,
            columnFilters,
        },
    });

    return (
        <table className="w-full border-collapse text-[12px]">
            <thead className="sticky top-0 z-10">
                {/* Column group header */}
                <tr className="bg-slate-700 text-slate-200">
                    {columnGroups.map((group, i) => (
                        <th
                            key={group.label}
                            colSpan={group.span}
                            className={`px-2 py-[3px] text-[10px] font-medium uppercase tracking-widest text-left ${
                                i > 0 ? "border-l border-slate-500/50" : ""
                            }`}
                        >
                            {group.label}
                        </th>
                    ))}
                </tr>

                {/* Column headers */}
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="bg-slate-50 border-b border-slate-200">
                        {headerGroup.headers.map((header) => {
                            const isGroupStart = (header.column.columnDef.meta as any)?.groupStart;
                            return (
                                <th
                                    key={header.id}
                                    className={`text-left align-bottom font-medium text-slate-500 px-1.5 py-1 ${
                                        isGroupStart ? "group-border-l" : ""
                                    }`}
                                    style={{ width: `${header.getSize()}px` }}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            );
                        })}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row, rowIndex) => (
                        <tr
                            key={row.id}
                            className={`
                                border-b border-slate-100/80
                                hover:bg-blue-50/40
                                transition-colors duration-75
                                ${rowIndex % 2 === 1 ? "bg-slate-50/40" : "bg-white"}
                            `}
                        >
                            {row.getVisibleCells().map((cell) => {
                                const isGroupStart = (cell.column.columnDef.meta as any)?.groupStart;
                                return (
                                    <td
                                        key={cell.id}
                                        className={`px-1 py-[2px] ${
                                            isGroupStart ? "group-border-l" : ""
                                        }`}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                );
                            })}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={tableColumns.length} className="p-4 text-center text-slate-400">
                            No results.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
