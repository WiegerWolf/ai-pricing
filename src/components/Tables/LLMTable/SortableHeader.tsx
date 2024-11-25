// src/components/Tables/LLMTable/SortableHeader.tsx
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
      className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="h-4 w-4" />
    </button>
  );
};
