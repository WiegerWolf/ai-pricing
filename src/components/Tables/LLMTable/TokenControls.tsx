import { useState, useRef, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TokenControlsProps {
  onInputChange: (value: number) => void;
  onOutputChange: (value: number) => void;
  inputTokens: number;
  outputTokens: number;
}

export function TokenControls({
  onInputChange,
  onOutputChange,
  inputTokens,
  outputTokens,
}: TokenControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative text-xs" ref={containerRef}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="flex items-center gap-0.5 hover:bg-gray-100 p-0.5 rounded cursor-pointer select-none"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <span className="font-medium text-gray-900">Usage Cost</span>
              <svg
                className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" align="end" className="text-xs">
            <p className="max-w-xs">Estimated monthly cost based on input/output token usage</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isExpanded && (
        <div className="absolute z-20 right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Input Tokens
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="10000000"
                  step="100000"
                  value={inputTokens}
                  onChange={(e) => onInputChange(Number(e.target.value))}
                  className="flex-grow"
                />
                <input
                  type="number"
                  min="0"
                  max="10000000"
                  value={inputTokens}
                  onChange={(e) => onInputChange(Number(e.target.value))}
                  className="w-24 p-1 text-sm border rounded"
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {inputTokens.toLocaleString()} tokens
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Output Tokens
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="10000000"
                  step="100000"
                  value={outputTokens}
                  onChange={(e) => onOutputChange(Number(e.target.value))}
                  className="flex-grow"
                />
                <input
                  type="number"
                  min="0"
                  max="10000000"
                  value={outputTokens}
                  onChange={(e) => onOutputChange(Number(e.target.value))}
                  className="w-24 p-1 text-sm border rounded"
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {outputTokens.toLocaleString()} tokens
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
