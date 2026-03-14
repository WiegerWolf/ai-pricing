import { DataTable } from "@/components/Tables/LLMTable/DataTable";
import llmData from '@/data/llm-data.json';
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (isDark: boolean) => {
      document.documentElement.classList.toggle('dark', isDark);
    };

    applyTheme(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      applyTheme(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <header className="flex items-center justify-between px-3 py-1 bg-slate-800 text-slate-300 dark:bg-slate-950 dark:text-slate-400 shrink-0 border-b border-slate-700/60 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <h1 className="text-[13px] font-semibold text-white tracking-tight">
            LLM Comparison
          </h1>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">
            {llmData.length} models
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-slate-400 dark:text-slate-500">
          <span>Updated Mar 14, 2026</span>
          <a
            href="https://github.com/WiegerWolf/ai-pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white dark:text-slate-500 dark:hover:text-slate-200 transition-colors"
          >
            Submit a correction &rarr;
          </a>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <DataTable data={llmData} />
      </main>
    </div>
  );
}
