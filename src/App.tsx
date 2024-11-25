import { DataTable } from "@/components/Tables/LLMTable/DataTable";
import { columns } from "@/components/Tables/LLMTable/columns";
import llmData from '@/data/llm-data.json';

export default function App() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">AI Model Pricing Comparison</h1>
      <DataTable columns={columns} data={llmData} />
    </div>
  );
}
