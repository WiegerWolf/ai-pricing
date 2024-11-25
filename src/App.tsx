import { DataTable } from "@/components/Tables/LLMTable/DataTable";
import { columns } from "@/components/Tables/LLMTable/columns";
import llmData from '@/data/llm-data.json';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <DataTable columns={columns} data={llmData} />
      </main>
      <footer className="text-xs text-gray-500 py-4 px-4 flex items-center justify-between border-t">
        <span>Last updated: November 1, 2024</span>
        <span>
          Found a mistake? Submit a PR at{" "}
          <a
            href="https://github.com/WiegerWolf/ai-pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            WiegerWolf/ai-pricing
          </a>
        </span>
      </footer>
    </div>
  );
}
