export interface LLMModel {
    model: string;
    provider: string;
    smartsElo?: number | null;
    simpleBench?: number | null; // Allow null
    fictionLiveBench?: number | null; // Add Fiction.LiveBench
    aiderBench?: number | null;  // Allow null
    codingElo?: number | null;
    webdevElo?: number | null;
    mcBenchElo?: number | null; // Add mcBenchElo and allow null
    context?: number;
    inputPrice?: number;
    outputPrice?: number;
    hasVision?: boolean;
    toolUse?: boolean;
    notes?: string;
    pricingUrl?: string;  // Changed from required to optional
    inputPriceCacheHit?: number;
    maxOutputTokens?: number;
    maxOutputTokensBeta?: number;
    modelUrl?: string;
    developer: string;
    hasReasoning?: boolean; // Add the new property for thinking/reasoning mode
}

export interface CalculatorState {
    inputTokens: number;
    outputTokens: number;
    isVisible: boolean;
}
