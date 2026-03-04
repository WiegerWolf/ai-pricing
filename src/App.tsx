import { DataTable } from "@/components/Tables/LLMTable/DataTable";
import { columns } from "@/components/Tables/LLMTable/columns";
import llmData from '@/data/llm-data.json';

export default function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <header className="flex items-center justify-between px-3 py-1 bg-slate-800 text-slate-300 shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-[13px] font-semibold text-white tracking-tight">
            AI Model Comparison
          </h1>
          <span className="text-[10px] text-slate-400">
            {llmData.length} models
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-slate-400">
          <span>Updated Mar 4, 2026</span>
          <a
            href="https://github.com/WiegerWolf/ai-pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Submit a correction &rarr;
          </a>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <DataTable columns={columns(llmData)} data={llmData} />
      </main>
    </div>
  );
}
