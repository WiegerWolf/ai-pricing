# AI Model Pricing Comparison

A fast, interactive web app for comparing AI models across the metrics that actually matter when choosing what to use: price, context window, speed, benchmark performance, vision support, and free-tier availability.

Live demo: [ai.tsatsin.com](https://ai.tsatsin.com/)

## What this is for

When you're comparing models across providers, the information is usually scattered across pricing pages, benchmark sites, and launch posts. This project pulls the useful bits into one place so you can scan tradeoffs quickly instead of opening ten tabs.

## What you can compare

### LLM metrics
- Arena ELO scores (general and coding)
- Processing speed (tokens/second)
- Context window size
- Input and output pricing per million tokens
- Vision capabilities
- Free tier availability

### App features
- Sortable columns for fast comparison
- Tooltips that explain less obvious metrics
- Direct links to official provider pricing pages
- Regular data updates as models and pricing change

## Data sources
- Public benchmark data
- Official provider pricing and documentation
- Ongoing manual updates as models evolve

## Tech stack
- TypeScript
- React
- Vite
- Tailwind CSS

## Local development

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Contributing

Contributions are welcome, especially for:
- pricing/data corrections
- newly released models
- UX improvements
- documentation fixes

## License

MIT

