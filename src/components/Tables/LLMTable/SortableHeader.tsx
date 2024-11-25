import { ArrowUpDown } from "lucide-react";
import { Column } from "@tanstack/react-table";
import { LLMModel } from "../../../types/llm";

interface SortableHeaderProps {
  column: Column<LLMModel, unknown>;
  title: string;
}

export const SortableHeader = ({ column, title }: SortableHeaderProps) => {
  return (
    <button
      className="inline-flex items-center gap-1 hover:bg-gray-100 rounded px-1 py-0.5 text-xs font-medium"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="h-3 w-3 text-gray-400" />
    </button>
  );
};
