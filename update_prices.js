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
  // no info on 01 AI
  // no info on Zhipu
  "Command R+": "cohere/command-r-plus-08-2024",
  // no info on Reka
  // no info on Cloudflare
};

async function updatePrices() {
  try {
    // Read existing data.js
    const existingData = fs.readFileSync("data.js", "utf8");
    const modelData = eval(existingData.replace("const modelData = ", ""));

    // Fetch OpenRouter data
    const response = await fetch("https://openrouter.ai/api/v1/models");
    const openRouterData = await response.json();

    // Create a map of OpenRouter models for easy lookup
    const openRouterModels = {};
    openRouterData.data.forEach((model) => {
      openRouterModels[model.id] = model;
    });

    // Update prices in our model data
    modelData.forEach((model) => {
      const openRouterId = modelMapping[model.model];
      if (openRouterId && openRouterModels[openRouterId]) {
        const orModel = openRouterModels[openRouterId];

        // Convert prices from per token to per million tokens
        model.inputPrice = parseFloat(
          (orModel.pricing.prompt * 1000000).toFixed(2)
        );
        model.outputPrice = parseFloat(
          (orModel.pricing.completion * 1000000).toFixed(2)
        );

        // Update context window if available
        if (orModel.context_length) {
          model.context = Math.floor(orModel.context_length / 1000); // Convert to K
        }
      }
    });

    // Write updated data back to file
    const updatedContent = `const modelData = ${JSON.stringify(
      modelData,
      null,
      2
    )};`;
    fs.writeFileSync("data.js", updatedContent);

    console.log("Prices updated successfully!");
  } catch (error) {
    console.error("Error updating prices:", error);
  }
}

updatePrices();
