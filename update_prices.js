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
    // Read existing data.js as string
    const existingData = fs.readFileSync("data.js", "utf8");

    // Fetch OpenRouter data
    const response = await fetch("https://openrouter.ai/api/v1/models");
    const openRouterData = await response.json();

    // Create a map of OpenRouter models for easy lookup
    const openRouterModels = {};
    openRouterData.data.forEach((model) => {
      openRouterModels[model.id] = model;
    });

    // Update prices using regex to preserve formatting and comments
    let updatedContent = existingData;

    Object.entries(modelMapping).forEach(([ourModel, openRouterId]) => {
      if (openRouterModels[openRouterId]) {
        const orModel = openRouterModels[openRouterId];
        const inputPrice = (orModel.pricing.prompt * 1000000).toFixed(1);
        const outputPrice = (orModel.pricing.completion * 1000000).toFixed(1);

        console.log(`Updating ${ourModel}:`);
        console.log(`  Input price: ${inputPrice}`);
        console.log(`  Output price: ${outputPrice}`);

        // Update input price
        updatedContent = updatedContent.replace(
          new RegExp(
            `(model:\\s*"${ourModel}"[\\s\\S]*?inputPrice:)\\s*[\\d\\.]+`
          ),
          `$1 ${inputPrice}`
        );

        // Update output price
        updatedContent = updatedContent.replace(
          new RegExp(
            `(model:\\s*"${ourModel}"[\\s\\S]*?outputPrice:)\\s*[\\d\\.]+`
          ),
          `$1 ${outputPrice}`
        );

        // Update context if available
        if (orModel.context_length) {
          const contextK = Math.floor(orModel.context_length / 1000);
          updatedContent = updatedContent.replace(
            new RegExp(`(model:\\s*"${ourModel}"[\\s\\S]*?context:)\\s*[\\d]+`),
            `$1 ${contextK}`
          );
        }
      } else {
        console.warn(
          `Warning: No OpenRouter data found for ${ourModel} (${openRouterId})`
        );
      }
    });

    // Write updated content back to file
    fs.writeFileSync("data.js", updatedContent);

    console.log("Prices updated successfully!");
  } catch (error) {
    console.error("Error updating prices:", error);
  }
}

updatePrices();
