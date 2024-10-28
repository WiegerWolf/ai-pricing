#!/usr/bin/env bun
import fs from "fs";

// Map of our model names to OpenRouter model IDs
const modelMapping = {
  "ChatGPT-4o-latest": "openai/chatgpt-4o-latest",
  "o1-preview": "openai/o1-preview",
  "o1-mini": "openai/o1-mini",
  "GPT-4o-mini-2024-07-18": "openai/gpt-4o-mini-2024-07-18",
  "gpt-4-turbo-2024-04-09": "openai/gpt-4-turbo",
  "Claude-3-5-Sonnet-20241022": "anthropic/claude-3.5-sonnet",
  "Claude-3-5-Sonnet-20240620": "anthropic/claude-3.5-sonnet-20240620",
  // no info on haiku
  "Gemini-1.5-Pro-002": "google/gemini-pro-1.5",
  "Gemini-1.5-Flash-002": "google/gemini-flash-1.5",
  // no info on groq llama
  "Grok-2-08-13": "x-ai/grok-beta",
  "Command R+": "cohere/command-r-plus-08-2024",
  // no info on Reka
  // no info on Cloudflare
};

async function updatePrices() {
  try {
    // Read current data
    const data = JSON.parse(fs.readFileSync("data.json", "utf8"));

    // Fetch new prices
    const response = await fetch("https://openrouter.ai/api/v1/models");
    const openRouterData = await response.json();

    // Update prices
    data.forEach((model) => {
      const openRouterId = modelMapping[model.model];
      if (openRouterId) {
        const orModel = openRouterData.data.find((m) => m.id === openRouterId);
        if (orModel) {
          model.inputPrice = Number(
            (orModel.pricing.prompt * 1000000).toFixed(2)
          );
          model.outputPrice = Number(
            (orModel.pricing.completion * 1000000).toFixed(2)
          );
        }
      }
    });

    // Write updated data
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    console.log("Prices updated successfully!");
  } catch (error) {
    console.error("Error updating prices:", error);
  }
}

// Only run if this is the main module
if (import.meta.main) {
  await updatePrices();
}

// Export for use as a module
export { updatePrices };
