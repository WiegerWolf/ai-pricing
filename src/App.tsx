import { DataTable } from "@/components/Tables/LLMTable/DataTable";
import { columns } from "@/components/Tables/LLMTable/columns";
import llmData from '@/data/llm-data.json';

export default function App() {
  return (
      <DataTable columns={columns} data={llmData} />
  );
}
