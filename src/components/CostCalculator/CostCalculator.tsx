import { useState, useMemo } from 'react';
import type { LLMModel } from '../../types/llm';

interface CostCalculatorProps {
  data: LLMModel[];
}

export function CostCalculator({ data }: CostCalculatorProps) {
  const [selectedModel, setSelectedModel] = useState(data[0]?.model || '');
  const [inputTokens, setInputTokens] = useState(100000); // Default 100k tokens
  const [outputTokens, setOutputTokens] = useState(50000); // Default 50k tokens

  const selectedModelData = useMemo(() => {
    return data.find(model => model.model === selectedModel);
  }, [data, selectedModel]);

  const calculateCost = () => {
    if (!selectedModelData) return 0;
    
    // Convert to millions of tokens and multiply by price per million
    const inputCost = (inputTokens / 1_000_000) * selectedModelData.inputPrice;
    const outputCost = (outputTokens / 1_000_000) * selectedModelData.outputPrice;
    
    return inputCost + outputCost;
  };

  const totalCost = useMemo(calculateCost, [selectedModelData, inputTokens, outputTokens]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Cost Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Model
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {data.map((model) => (
              <option key={`${model.model}-${model.provider}`} value={model.model}>
                {model.model} ({model.provider})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Input Tokens
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="10000000"
              step="100000"
              value={inputTokens}
              onChange={(e) => setInputTokens(Number(e.target.value))}
              className="flex-grow"
            />
            <input
              type="number"
              min="0"
              max="10000000"
              value={inputTokens}
              onChange={(e) => setInputTokens(Number(e.target.value))}
              className="w-32 p-1 border rounded-md"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{inputTokens.toLocaleString()} tokens</span>
            <span>${((inputTokens / 1_000_000) * (selectedModelData?.inputPrice || 0)).toFixed(2)}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Output Tokens
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="10000000"
              step="100000"
              value={outputTokens}
              onChange={(e) => setOutputTokens(Number(e.target.value))}
              className="flex-grow"
            />
            <input
              type="number"
              min="0"
              max="10000000"
              value={outputTokens}
              onChange={(e) => setOutputTokens(Number(e.target.value))}
              className="w-32 p-1 border rounded-md"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{outputTokens.toLocaleString()} tokens</span>
            <span>${((outputTokens / 1_000_000) * (selectedModelData?.outputPrice || 0)).toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Estimated Monthly Cost:</span>
            <span className="text-2xl font-bold text-green-600">
              ${totalCost.toFixed(2)}
            </span>
          </div>
          {selectedModelData?.notes && (
            <p className="mt-2 text-sm text-gray-600">
              Note: {selectedModelData.notes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
