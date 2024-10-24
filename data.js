const modelData = [
  // OpenAI
  {
    model: "ChatGPT-4o-latest",
    provider: "OpenAI",
    smartsElo: 1339,
    codingElo: 1338,
    speed: 69,
    context: 128,
    inputPrice: 5.0, // Updated
    outputPrice: 15.0, // Updated
    hasVision: true,
    hasFreeTier: false,
    notes: "can be 50% cheaper using batch processing",
    pricingUrl: "https://openai.com/api/pricing/",
  },
  {
    model: "o1-preview",
    provider: "OpenAI",
    smartsElo: 1335,
    codingElo: 1354,
    speed: null,
    context: 128,
    inputPrice: 15.0, // Updated
    outputPrice: 60.0, // Updated
    hasVision: true,
    hasFreeTier: false,
    notes: "Output includes internal reasoning tokens",
    pricingUrl: "https://openai.com/api/pricing/",
  },
  {
    model: "o1-mini",
    provider: "OpenAI",
    smartsElo: 1313,
    codingElo: 1373,
    speed: null,
    context: 128,
    inputPrice: 3.0, // Updated
    outputPrice: 12.0, // Updated
    hasVision: true,
    hasFreeTier: false,
    notes: "Output includes internal reasoning tokens",
    pricingUrl: "https://openai.com/api/pricing/",
  },
  {
    model: "GPT-4o-mini-2024-07-18",
    provider: "OpenAI",
    smartsElo: 1274,
    codingElo: 1284,
    speed: null,
    context: 128,
    inputPrice: 0.15, // Verified correct
    outputPrice: 0.6, // Verified correct
    hasVision: true,
    hasFreeTier: false,
    notes: "can be 50% cheaper using batch processing",
    pricingUrl: "https://openai.com/api/pricing/",
  },
  {
    model: "gpt-4-turbo-2024-04-09",
    provider: "OpenAI",
    smartsElo: 1250,
    codingElo: 1254,
    speed: 17,
    context: 128,
    inputPrice: 10.0, // Verified correct
    outputPrice: 30.0, // Verified correct
    hasVision: true,
    hasFreeTier: false,
    notes: "can be 50% cheaper using batch processing",
    pricingUrl: "https://openai.com/api/pricing/",
  },

  // Anthropic
  {
    model: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    smartsElo: 1268,
    codingElo: 1295,
    speed: null,
    context: 200,
    inputPrice: 3.0, // Verified correct
    outputPrice: 15.0, // Verified correct
    hasVision: true,
    hasFreeTier: false,
    notes: "50% discount available with Batches API",
    pricingUrl: "https://www.anthropic.com/pricing#anthropic-api",
  },
  {
    model: "Claude 3.5 Haiku",
    provider: "Anthropic",
    smartsElo: 1179,
    codingElo: 1189,
    speed: 89,
    context: 200,
    inputPrice: 0.25, // Updated
    outputPrice: 1.25, // Updated
    hasVision: true,
    hasFreeTier: false,
    notes: "Fastest model, 50% discount available with Batches API",
    pricingUrl: "https://www.anthropic.com/pricing#anthropic-api",
  },

  // Google AI
  {
    model: "Gemini-1.5-Pro-002", // Updated name
    provider: "Google AI",
    smartsElo: 1305,
    codingElo: 1287,
    speed: 52,
    context: 2000,
    inputPrice: 3.5,
    outputPrice: 10.5,
    hasVision: true,
    hasFreeTier: false,
    notes:
      "these prices are for <128k context, for more see pricing page, no free tier in EU",
    pricingUrl: "https://ai.google.dev/pricing",
  },
  {
    model: "Gemini-1.5-Flash-002",
    provider: "Google AI",
    smartsElo: 1269, // Updated to Gemini-1.5-Flash-002 value
    codingElo: 1249,
    speed: 156,
    context: 1000,
    inputPrice: 0.35,
    outputPrice: 0.53,
    hasVision: true,
    hasFreeTier: false,
    notes:
      "these prices are for <128k context, for more see pricing page, no free tier in EU",
    pricingUrl: "https://ai.google.dev/pricing",
  },

  // Groq
  {
    model: "llama-3-70b-instruct",
    provider: "Groq",
    smartsElo: 1206,
    codingElo: 1200,
    speed: 330, // Updated from pricing page
    context: 8,
    inputPrice: 0.59, // Verified correct
    outputPrice: 0.79, // Verified correct
    hasVision: false,
    hasFreeTier: false,
    notes: "8k context window",
    pricingUrl: "https://groq.com/pricing/",
  },
  {
    model: "llama-3-8b-instruct",
    provider: "Groq",
    smartsElo: 1152,
    codingElo: 1146,
    speed: 1250, // Updated from pricing page
    context: 8,
    inputPrice: 0.05, // Verified correct
    outputPrice: 0.08, // Updated from pricing page
    hasVision: false,
    hasFreeTier: false,
    notes: "",
    pricingUrl: "https://groq.com/pricing/",
  },
  {
    model: "llama-3.2-1b-preview",
    provider: "Groq",
    smartsElo: 1050, // Estimated lower due to small model size
    codingElo: 1040, // Estimated lower due to small model size
    speed: 3100, // Fastest in the lineup
    context: 8,
    inputPrice: 0.04,
    outputPrice: 0.04,
    hasVision: false,
    hasFreeTier: false,
    notes: "8k context window, preview version, fastest model available",
  },
  {
    model: "llama-3.2-3b-preview",
    provider: "Groq",
    smartsElo: 1100, // Estimated based on model size
    codingElo: 1090, // Estimated based on model size
    speed: 1600,
    context: 8,
    inputPrice: 0.06,
    outputPrice: 0.06,
    hasVision: false,
    hasFreeTier: false,
    notes: "8k context window, preview version",
  },
  {
    model: "llama-3.1-70b-versatile",
    provider: "Groq",
    smartsElo: 1206, // Using same as llama-3-70b as baseline
    codingElo: 1200, // Using same as llama-3-70b as baseline
    speed: 250,
    context: 128,
    inputPrice: 0.59,
    outputPrice: 0.79,
    hasVision: false,
    hasFreeTier: false,
    notes: "",
    pricingUrl: "https://groq.com/pricing/",
  },
  {
    model: "llama-3.1-8b-instant",
    provider: "Groq",
    smartsElo: 1152, // Using same as llama-3-8b as baseline
    codingElo: 1146, // Using same as llama-3-8b as baseline
    speed: 750,
    context: 128,
    inputPrice: 0.05,
    outputPrice: 0.08,
    hasVision: false,
    hasFreeTier: false,
    notes: "",
    pricingUrl: "https://groq.com/pricing/",
  },
  {
    model: "llama-3-70b-tool-use",
    provider: "Groq",
    smartsElo: 1210, // Estimated slightly higher than base due to tool use
    codingElo: 1205, // Estimated slightly higher than base due to tool use
    speed: 335,
    context: 8,
    inputPrice: 0.89,
    outputPrice: 0.89,
    hasVision: false,
    hasFreeTier: false,
    notes: "preview version with tool use capabilities",
    pricingUrl: "https://groq.com/pricing/",
  },
  {
    model: "llama-guard-3-8b",
    provider: "Groq",
    smartsElo: 1140, // Estimated based on model size and specialized nature
    codingElo: 1130, // Estimated based on model size and specialized nature
    speed: 765,
    context: 8,
    inputPrice: 0.2,
    outputPrice: 0.2,
    hasVision: false,
    hasFreeTier: false,
    notes:
      "specialized for content moderation to work in pair with other llamas",
    pricingUrl: "https://groq.com/pricing/",
  },

  // xAI
  {
    model: "Grok-2-08-13", // New entry
    provider: "xAI",
    smartsElo: 1291,
    codingElo: 1287,
    speed: null,
    context: 128,
    inputPrice: null,
    outputPrice: null,
    hasVision: false,
    hasFreeTier: false,
    notes: "Not yet publicly available",
  },

  // 01 AI
  {
    model: "Yi-Lightning", // New entry
    provider: "01 AI",
    smartsElo: 1287,
    codingElo: 1300,
    speed: null,
    context: 128,
    inputPrice: null,
    outputPrice: null,
    hasVision: false,
    hasFreeTier: false,
    notes: "",
  },

  // Zhipu
  {
    model: "GLM-4-Plus", // New entry
    provider: "Zhipu AI",
    smartsElo: 1274,
    codingElo: 1284,
    speed: null,
    context: 128,
    inputPrice: null,
    outputPrice: null,
    hasVision: false,
    hasFreeTier: false,
    notes: "",
  },

  // Cohere
  {
    model: "Command R+",
    provider: "Cohere",
    smartsElo: 1214,
    codingElo: 1180,
    speed: 109,
    context: 128,
    inputPrice: 3,
    outputPrice: 15,
    hasVision: false,
    hasFreeTier: false,
    notes: "",
  },

  // Reka
  {
    model: "Reka-Core",
    provider: "Reka AI",
    smartsElo: 1230,
    codingElo: 1208,
    speed: null,
    context: 128,
    inputPrice: 10,
    outputPrice: 25,
    hasVision: true,
    hasFreeTier: false,
    notes: "",
  },

  // cloudflare
  {
    model: "llama-3-8b-instruct",
    provider: "cloudflare",
    smartsElo: 1152,
    codingElo: 1146,
    speed: 215,
    context: 8,
    inputPrice: 0,
    outputPrice: 0,
    hasVision: false,
    hasFreeTier: true,
    notes: "currently in free beta",
  },
];
