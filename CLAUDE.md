# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **Bun** (`bun.lockb`).

```bash
bun install          # install dependencies
bun run dev          # vite dev server with HMR
bun run build        # tsc -b && vite build (typecheck then bundle)
bun run lint         # eslint .
bun run preview      # preview production build
```

No test framework is configured.

## Architecture

This is a static **Vite + React + TypeScript** app for comparing AI model pricing and benchmarks. Deployed at https://ai.tsatsin.com/. No backend — all data is in static JSON files.

### Data Flow

1. **`src/data/llm-data.json`** — the single source of truth for all model data (pricing, benchmarks, capabilities)
2. **`src/types/llm.ts`** — `LLMModel` interface defining the schema; all benchmark fields are `number | null` optional
3. **`src/components/Tables/LLMTable/columns.tsx`** — column definitions that drive the entire table: each column specifies its accessor, header (with tooltip/filter config), cell renderer, sorting, and color scaling
4. **`src/components/Tables/LLMTable/DataTable.tsx`** — renders the TanStack React Table using the column defs and data

### Key Patterns

- **Column definitions are the core abstraction.** Adding a new metric means: add the field to `LLMModel`, add data to `llm-data.json`, add a column def in `columns.tsx` (with range calculation via `getColumnMinMax` if color-scaled).
- **Filter components** (`FilterInput`, `RangeFilter`, `SelectFilter`, `MultiSelectFilter`, `CheckboxFilter`) are chosen per-column via the `filter` prop on `ColumnHeader`.
- **Color scaling** (`src/utils/colorScale.ts`) — `getCellBackground()` colors cells by relative value within a column. Supports linear and logarithmic scaling.
- **Provider logos** (`src/config/logos.ts`) — two maps: `providerLogos` (API provider) and `developerLogos` (model creator). When adding a new provider/developer, add the logo asset to `src/assets/` and register it here.
- **UI components** (`src/components/ui/`) are shadcn/ui (New York style) wrappers around Radix UI primitives. Import path alias: `@/*` → `src/*`.
- **`src/lib/utils.ts`** exports `cn()` for merging Tailwind classes (clsx + tailwind-merge).

### Adding a New Model

1. Add entry to `src/data/llm-data.json` with fields matching `LLMModel`
2. If new developer/provider, add logo to `src/assets/` and register in `src/config/logos.ts`

### Adding a New Benchmark Column

1. Add optional field to `LLMModel` in `src/types/llm.ts`
2. Populate values in `src/data/llm-data.json`
3. Add column definition in `columns.tsx` — include `getColumnMinMax` range + `getCellBackground` cell renderer if color-scaled
