export interface LLMModel {
    model: string;
    provider: string;
    smartsElo: number | null;
    simpleBench?: number;
    codingElo: number | null;
    context: number;
    inputPrice: number;
    outputPrice: number;
    hasVision?: boolean;
    toolUse?: boolean;
    notes?: string;
    pricingUrl: string;
}

export interface CalculatorState {
    inputTokens: number;
    outputTokens: number;
    isVisible: boolean;
}
