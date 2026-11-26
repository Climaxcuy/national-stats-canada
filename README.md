# national-stats-canada

[![Canada in Numbers](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Climaxcuy/national-stats-canada/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Climaxcuy/national-stats-canada/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

**Canada in Numbers** — an independent national statistics portal for Canada, built for the make.fun "Best National Statistics Site" bounty.

## What it is

A static, dependency-free site that gathers Canada's headline statistics into one readable place — population, economy, provinces and territories, resources, climate and trade — with the source institution and reference year attached to every figure. All figures are real published statistics (2024 unless stated), not estimates made by this site.

- **Home** — 8 headline KPI cards with sparklines, population growth chart, age structure, GDP and exports charts.
- **Population** — growth 2015–2024, age structure, and a sortable, searchable table of all 10 provinces and 3 territories.
- **Economy** — nominal GDP and real growth 2015–2024, exports by product group, trade partners, electricity mix.
- **Regions & Climate** — January/July temperature normals for 13 cities (1991–2020), precipitation tab, forest cover and energy facts.
- **Data & Sources** — full sources register and methodology.

Design is original: deep pine green + maple amber on warm paper, system fonts only, no external assets, no network requests, no tracking.

## Sources

- Statistics Canada — population estimates (July 1, 2024), GDP, merchandise trade, labour market
- World Bank, World Development Indicators — population series, GDP, life expectancy, forest area
- International Energy Agency — electricity generation mix (2022)
- Environment and Climate Change Canada — Canadian Climate Normals 1991–2020
- OECD — labour market context

See `app/data.html` for the full register and methodology.

## Run it locally

```sh
# Serve the static site (any static server works)
python3 -m http.server 8080 --directory app
# Open http://localhost:8080/
```

Or open `app/index.html` directly in a browser — the site works from `file://` too, since every reference is a relative path inside `app/`.

## Hand in (what main.ts does)

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out-stats-climaxku-a node main.ts
```

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` into the output directory and writes `dossier.json` with `buildDossier` from `vendor/makefun-frontend.ts` (the kit's copy, unchanged). Running it twice into two different directories produces byte-identical output.

## Layout

```
app/
  index.html       Home — KPI cards, hero charts
  population.html  Population trends + provinces table
  economy.html     GDP, trade, energy
  regions.html     Provinces, climate tables + tabs
  data.html        Sources register + methodology
  styles.css       All styling (Variant A: dense dashboard)
  data.js          Every figure + its source and year
  charts.js        Dependency-free SVG chart builders
  app.js           Navigation, sortable tables, filters, tabs
screenshots/      1-cover.jpg, 2-economy.jpg, 3-phone.jpg, 4-regions.jpg
main.ts            Hand-in entrypoint
vendor/            makefun-frontend.ts (kit library, unchanged)
```

## License

MIT — see [LICENSE](LICENSE).
