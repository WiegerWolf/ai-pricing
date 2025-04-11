import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        state: {
            sorting,
            columnFilters,
        },
    });

    return (
        // Removed overflow-auto and max-h-[] from this div. Scrolling is handled by the page structure in App.tsx
        <div className="border border-gray-200 rounded-sm shadow-sm"> 
            <table className="w-full border-collapse text-sm">
                {/* thead remains sticky relative to the nearest scroll container (likely main or viewport) */}
                <thead className="sticky top-0 z-10"> 
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="bg-gray-50 border-b border-gray-200"> {/* Ensure background for sticky header */}
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="text-left font-medium text-gray-500 p-2 first:pl-4 last:pr-4"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="bg-white">
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="p-2 first:pl-4 last:pr-4"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="p-2 text-center text-gray-500">
                                No results.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
