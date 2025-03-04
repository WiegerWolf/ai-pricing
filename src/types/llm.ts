export interface LLMModel {
    model: string;
    provider: string;
    smartsElo?: number | null;
    simpleBench?: number;
    aiderBench?: number;  // Add the new property
    codingElo?: number | null;
    webdevElo?: number | null;
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
}

export interface CalculatorState {
    inputTokens: number;
    outputTokens: number;
    isVisible: boolean;
}
