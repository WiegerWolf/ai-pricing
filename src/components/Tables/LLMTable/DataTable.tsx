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
        <div className="space-y-2">
            <div className="flex gap-2">
                <input
                    placeholder="Filter models..."
                    value={(table.getColumn("model")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("model")?.setFilterValue(event.target.value)
                    }
                    className="px-2 py-1 border rounded-sm text-sm w-64"
                />
                <input
                    placeholder="Filter providers..."
                    value={(table.getColumn("provider")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("provider")?.setFilterValue(event.target.value)
                    }
                    className="px-2 py-1 border rounded-sm text-sm w-48"
                />
            </div>
            <div className="border border-gray-200 rounded-sm shadow-sm overflow-hidden">
                <table className="w-full border-collapse text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-50 border-b border-gray-200">
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
        </div>
    );
}
