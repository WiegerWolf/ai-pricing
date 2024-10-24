const modelData = [
    {
        "model": "ChatGPT-4o-latest",
        "provider": "OpenAI",
        "smartsElo": 1339,
        "codingElo": 1338,
        "speed": 69,
        "context": 128,
        "inputPrice": 5.00,  // Updated
        "outputPrice": 15.00,  // Updated
        "hasVision": true,
        "hasFreeTier": false,
        "notes": "can be 50% cheaper using batch processing",
        "pricingUrl": "https://openai.com/api/pricing/"
    },
    {
        "model": "o1-preview",
        "provider": "OpenAI",
        "smartsElo": 1335,
        "codingElo": 1354,
        "speed": null,
        "context": 128,
        "inputPrice": 15.00,  // Updated
        "outputPrice": 60.00,  // Updated
        "hasVision": true,
        "hasFreeTier": false,
        "notes": "Output includes internal reasoning tokens",
        "pricingUrl": "https://openai.com/api/pricing/"
    },
    {
        "model": "o1-mini",
        "provider": "OpenAI",
        "smartsElo": 1313,
        "codingElo": 1373,
        "speed": null,
        "context": 128,
        "inputPrice": 3.00,  // Updated
        "outputPrice": 12.00,  // Updated
        "hasVision": true,
        "hasFreeTier": false,
        "notes": "Output includes internal reasoning tokens",
        "pricingUrl": "https://openai.com/api/pricing/"
    },
    {
        "model": "Gemini-1.5-Pro-002",  // Updated name
        "provider": "Google AI",
        "smartsElo": 1305,
        "codingElo": 1287,
        "speed": 52,
        "context": 2000,
        "inputPrice": 3.5,
        "outputPrice": 10.5,
        "hasVision": true,
        "hasFreeTier": false,
        "notes": "these prices are for <128k context, for more see pricing page, no free tier in EU"
    },
    {
        "model": "Grok-2-08-13",  // New entry
        "provider": "xAI",
        "smartsElo": 1291,
        "codingElo": 1287,
        "speed": null,
        "context": 128,
        "inputPrice": null,
        "outputPrice": null,
        "hasVision": false,
        "hasFreeTier": false,
        "notes": "Not yet publicly available"
    },
    {
        "model": "Yi-Lightning",  // New entry
        "provider": "01 AI",
        "smartsElo": 1287,
        "codingElo": 1300,
        "speed": null,
        "context": 128,
        "inputPrice": null,
        "outputPrice": null,
        "hasVision": false,
        "hasFreeTier": false,
        "notes": ""
    },
    {
        "model": "GPT-4o-mini-2024-07-18",
        "provider": "OpenAI",
        "smartsElo": 1274,
        "codingElo": 1284,
        "speed": null,
        "context": 128,
        "inputPrice": 0.15,  // Verified correct
        "outputPrice": 0.60,  // Verified correct
        "hasVision": true,
        "hasFreeTier": false,
        "notes": "can be 50% cheaper using batch processing",
        "pricingUrl": "https://openai.com/api/pricing/"
    },
    {
        "model": "GLM-4-Plus",  // New entry
        "provider": "Zhipu AI",
        "smartsElo": 1274,
        "codingElo": 1284,
        "speed": null,
        "context": 128,
        "inputPrice": null,
        "outputPrice": null,
        "hasVision": false,
        "hasFreeTier": false,
        "notes": ""
    },
    {
        "model": "gpt-4-turbo-2024-04-09",
        "provider": "OpenAI",
        "smartsElo": 1250,
        "codingElo": 1254,
        "speed": 17,
        "context": 128,
        "inputPrice": 10.00,  // Verified correct
        "outputPrice": 30.00,  // Verified correct
        "hasVision": true,
        "hasFreeTier": false,
        "notes": "can be 50% cheaper using batch processing",
        "pricingUrl": "https://openai.com/api/pricing/"
    },
    {
        "model": "gpt-3.5-turbo-0125",
        "provider": "OpenAI",
        "smartsElo": 1106,
        "codingElo": 1124,
        "speed": 56,
        "context": 16,
        "inputPrice": 0.50,  // Verified correct
        "outputPrice": 1.50,  // Verified correct
        "hasVision": false,
        "hasFreeTier": false,
        "notes": "",
        "pricingUrl": "https://openai.com/api/pricing/"
    },
    {
        "model": "Claude 3.5 Sonnet",
        "provider": "Anthropic",
        "smartsElo": 1268,
        "codingElo": 1295,
        "speed": null,
        "context": 200,
        "inputPrice": 3.00,  // Verified correct
        "outputPrice": 15.00,  // Verified correct
        "hasVision": true,
        "hasFreeTier": false,
        "notes": "50% discount available with Batches API",
        "pricingUrl": "https://www.anthropic.com/pricing#anthropic-api"
    },
    {
        "model": "Claude 3.5 Haiku",
        "provider": "Anthropic",
        "smartsElo": 1179,
        "codingElo": 1189,
        "speed": 89,
        "context": 200,
        "inputPrice": 0.25,  // Updated
        "outputPrice": 1.25,  // Updated
        "hasVision": true,
        "hasFreeTier": false,
        "notes": "Fastest model, 50% discount available with Batches API",
        "pricingUrl": "https://www.anthropic.com/pricing#anthropic-api"
    },
    {
        "model": "Claude 3 Opus",
        "provider": "Anthropic",
        "smartsElo": 1248,
        "codingElo": 1250,
        "speed": 26,
        "context": 200,
        "inputPrice": 15.00,  // Updated
        "outputPrice": 75.00,  // Updated
        "hasVision": true,
        "hasFreeTier": false,
        "notes": "Most powerful model, 50% discount available with Batches API",
        "pricingUrl": "https://www.anthropic.com/pricing#anthropic-api"
    },
    {
        "model": "Claude 3 Sonnet",
        "provider": "Anthropic",
        "smartsElo": 1201,
        "codingElo": 1213,
        "speed": 59,
        "context": 200,
        "inputPrice": 3.00,  // Verified correct
        "outputPrice": 15.00,  // Verified correct
        "hasVision": true,
        "hasFreeTier": false,
        "notes": "Good balance of speed and performance",
        "pricingUrl": "https://www.anthropic.com/pricing#anthropic-api"
    },
    {
        "model": "llama-3-70b-instruct",
        "provider": "Groq",
        "smartsElo": 1206,
        "codingElo": 1200,
        "speed": 280,
        "context": 8,
        "inputPrice": 0.59,
        "outputPrice": 0.79,
        "hasVision": false,
        "hasFreeTier": true,
        "notes": "free tier, subject to 7k t/min limit"
    },
    {
        "model": "llama-3-70b-instruct",
        "provider": "together.ai",
        "smartsElo": 1206,
        "codingElo": 1200,
        "speed": 52,
        "context": 8,
        "inputPrice": 0.9,
        "outputPrice": 0.9,
        "hasVision": false,
        "hasFreeTier": false,
        "notes": ""
    },
    {
        "model": "Command R+",
        "provider": "Cohere",
        "smartsElo": 1214,
        "codingElo": 1180,
        "speed": 109,
        "context": 128,
        "inputPrice": 3,
        "outputPrice": 15,
        "hasVision": false,
        "hasFreeTier": false,
        "notes": ""
    },
    {
        "model": "Reka-Core",
        "provider": "Reka AI",
        "smartsElo": 1230,
        "codingElo": 1208,
        "speed": null,
        "context": 128,
        "inputPrice": 10,
        "outputPrice": 25,
        "hasVision": true,
        "hasFreeTier": false,
        "notes": ""
    },
    {
        "model": "Gemini 1.5 Flash",
        "provider": "Google AI",
        "smartsElo": 1269, // Updated to Gemini-1.5-Flash-002 value
        "codingElo": 1249,
        "speed": 156,
        "context": 1000,
        "inputPrice": 0.35,
        "outputPrice": 0.53,
        "hasVision": true,
        "hasFreeTier": false,
        "notes": "these prices are for <128k context, for more see pricing page, no free tier in EU"
    },
    {
        "model": "llama-3-8b-instruct",
        "provider": "Groq",
        "smartsElo": 1152,
        "codingElo": 1146,
        "speed": 870,
        "context": 8,
        "inputPrice": 0.05,
        "outputPrice": 0.1,
        "hasVision": false,
        "hasFreeTier": true,
        "notes": "free tier, subject to 15k t/min limit"
    },
    {
        "model": "llama-3-8b-instruct",
        "provider": "cloudflare",
        "smartsElo": 1152,
        "codingElo": 1146,
        "speed": 215,
        "context": 8,
        "inputPrice": 0,
        "outputPrice": 0,
        "hasVision": false,
        "hasFreeTier": true,
        "notes": "currently in free beta"
    },
    {
        "model": "Llama-3.1-8b-Instruct",
        "provider": "Groq",
        "smartsElo": 1173,
        "codingElo": 1182,
        "speed": null,
        "context": 128,
        "inputPrice": 0,
        "outputPrice": 0,
        "hasVision": false,
        "hasFreeTier": true,
        "notes": "free tier, subject to 121k t/min limit"
    },
    {
        "model": "Phi-3-medium",
        "provider": "Azure AI",
        "smartsElo": 1123,
        "codingElo": 1125,
        "speed": null,
        "context": 128,
        "inputPrice": 0.5,
        "outputPrice": 1.5,
        "hasVision": false,
        "hasFreeTier": false,
        "notes": "There's also Phi-3-vision but it's not yet on Model-as-a-Service offering"
    },
];
