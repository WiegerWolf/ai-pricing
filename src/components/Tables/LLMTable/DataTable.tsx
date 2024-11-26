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
        <div className="overflow-hidden bg-white">
            <div className="overflow-x-auto relative">
                <div className="sticky right-0 bg-gradient-to-l from-white via-white/80 to-transparent w-32 h-full top-0 z-[1]" />
                <table className="w-full border-collapse text-sm">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="bg-gray-50 border-b border-gray-200">
                                {headerGroup.headers.map((header, index) => {
                                    const isLastColumn = index === headerGroup.headers.length - 1;
                                    return (
                                        <th
                                            key={header.id}
                                            className={`text-left font-medium text-gray-500 p-2 first:pl-4 ${
                                                isLastColumn ? 'sticky right-0 bg-gray-50 pr-4 shadow-[-8px_0_8px_-4px_rgba(0,0,0,0.05)] z-[2]' : ''
                                            }`}
                                            style={{
                                                minWidth: header.column.columnDef.id === 'model' ? '200px' : 'auto',
                                                maxWidth: header.column.columnDef.id === 'model' ? '300px' : 'auto'
                                            }}
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
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                                >
                                    {row.getVisibleCells().map((cell, index) => {
                                        const isLastColumn = index === row.getVisibleCells().length - 1;
                                        return (
                                            <td
                                                key={cell.id}
                                                className={`p-2 first:pl-4 ${
                                                    isLastColumn ? 'sticky right-0 bg-white pr-4 shadow-[-8px_0_8px_-4px_rgba(0,0,0,0.05)] z-[2]' : ''
                                                } ${row.getIsSelected() ? 'bg-gray-50' : ''}`}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        );
                                    })}
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
        </div>
    );
}
