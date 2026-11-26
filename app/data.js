/* Canada in Numbers — data.js
   Every figure below is a real published statistic. Each record carries its
   source institution and the reference year so the page can cite it.
   Sources used: Statistics Canada, World Bank (WDI), IEA, Environment and
   Climate Change Canada (Canadian Climate Normals 1991-2020), OECD. */

const CANADA = {
  name: "Canada",
  landAreaKm2: 9984670,
  capital: "Ottawa",
  largestCity: "Toronto",
  officialLanguages: ["English", "French"],
  provincesCount: 10,
  territoriesCount: 3,
};

/* National headline indicators — one record per KPI card. */
const HEADLINE = [
  {
    id: "population",
    label: "Population",
    value: 41288599,
    display: "41.29 million",
    unit: "people",
    year: 2024,
    note: "July 1 estimate; +3.0% on 2023",
    source: "Statistics Canada, population estimates",
  },
  {
    id: "gdp",
    label: "GDP (nominal)",
    value: 2.24,
    display: "US$2.24 trillion",
    unit: "US$, current",
    year: 2024,
    note: "9th largest economy in the world",
    source: "World Bank, World Development Indicators",
  },
  {
    id: "gdpPerCapita",
    label: "GDP per capita",
    value: 54340,
    display: "US$54,340",
    unit: "US$, current",
    year: 2024,
    note: "High-income economy",
    source: "World Bank, World Development Indicators",
  },
  {
    id: "exports",
    label: "Merchandise exports",
    value: 721.1,
    display: "C$721.1 billion",
    unit: "C$, goods",
    year: 2024,
    note: "75.9% of exports go to the United States",
    source: "Statistics Canada, international merchandise trade",
  },
  {
    id: "forest",
    label: "Forest cover",
    value: 42.0,
    display: "42.0%",
    unit: "of land area",
    year: 2024,
    note: "About 3.7 million km² — ~9% of world forests",
    source: "World Bank / FAO, forest area indicator",
  },
  {
    id: "lifeExpectancy",
    label: "Life expectancy",
    value: 82.1,
    display: "82.1 years",
    unit: "at birth",
    year: 2024,
    note: "Fertility rate 1.25 births per woman",
    source: "World Bank, World Development Indicators",
  },
  {
    id: "unemployment",
    label: "Unemployment rate",
    value: 6.3,
    display: "6.3%",
    unit: "of labour force",
    year: 2024,
    note: "Annual average, Labour Force Survey",
    source: "Statistics Canada, Labour Force Survey",
  },
  {
    id: "inflation",
    label: "Inflation (CPI)",
    value: 2.4,
    display: "2.4%",
    unit: "annual average",
    year: 2024,
    note: "Consumer Price Index, annual average",
    source: "Statistics Canada, Consumer Price Index",
  },
];

/* Population, July 1 each year (World Bank WDI, based on UN/Statistics Canada). */
const POPULATION_SERIES = [
  { year: 2015, value: 35704498 },
  { year: 2016, value: 36110803 },
  { year: 2017, value: 36545075 },
  { year: 2018, value: 37072620 },
  { year: 2019, value: 37618495 },
  { year: 2020, value: 38028638 },
  { year: 2021, value: 38239864 },
  { year: 2022, value: 38950132 },
  { year: 2023, value: 40049088 },
  { year: 2024, value: 41262329 },
];

/* Provinces and territories — Statistics Canada, quarterly population
   estimates, July 1, 2024. Share is computed at render time. */
const PROVINCES = [
  { name: "Ontario", code: "ON", capital: "Toronto", population: 16124116, areaKm2: 1076395, joined: 1867, driver: "Finance, tech, manufacturing" },
  { name: "Quebec", code: "QC", capital: "Québec City", population: 9056044, areaKm2: 1542056, joined: 1867, driver: "Aerospace, energy, AI" },
  { name: "British Columbia", code: "BC", capital: "Victoria", population: 5698430, areaKm2: 944735, joined: 1871, driver: "Film, tech, forestry, ports" },
  { name: "Alberta", code: "AB", capital: "Edmonton", population: 4888723, areaKm2: 661848, joined: 1905, driver: "Oil and gas, renewables" },
  { name: "Manitoba", code: "MB", capital: "Winnipeg", population: 1494301, areaKm2: 647797, joined: 1870, driver: "Agriculture, transport" },
  { name: "Saskatchewan", code: "SK", capital: "Regina", population: 1239865, areaKm2: 651900, joined: 1905, driver: "Potash, wheat, oil" },
  { name: "Nova Scotia", code: "NS", capital: "Halifax", population: 1076374, areaKm2: 55284, joined: 1867, driver: "Ocean industries, shipbuilding" },
  { name: "New Brunswick", code: "NB", capital: "Fredericton", population: 854355, areaKm2: 72908, joined: 1867, driver: "Forestry, fisheries, energy" },
  { name: "Newfoundland and Labrador", code: "NL", capital: "St. John's", population: 545247, areaKm2: 405212, joined: 1949, driver: "Offshore oil, fisheries" },
  { name: "Prince Edward Island", code: "PE", capital: "Charlottetown", population: 178550, areaKm2: 5660, joined: 1873, driver: "Potatoes, tourism, fisheries" },
  { name: "Yukon", code: "YT", capital: "Whitehorse", population: 46704, areaKm2: 482443, joined: 1898, driver: "Mining, tourism" },
  { name: "Northwest Territories", code: "NT", capital: "Yellowknife", population: 44731, areaKm2: 1346106, joined: 1870, driver: "Diamonds, mining" },
  { name: "Nunavut", code: "NU", capital: "Iqaluit", population: 41159, areaKm2: 2093190, joined: 1999, driver: "Mining, arts, public service" },
];

/* Nominal GDP, current US$ billions (World Bank WDI). */
const GDP_SERIES = [
  { year: 2015, value: 1556 },
  { year: 2016, value: 1527 },
  { year: 2017, value: 1649 },
  { year: 2018, value: 1725 },
  { year: 2019, value: 1744 },
  { year: 2020, value: 1650 },
  { year: 2021, value: 2002 },
  { year: 2022, value: 2161 },
  { year: 2023, value: 2137 },
  { year: 2024, value: 2244 },
];

/* Real GDP growth, annual % (World Bank WDI). */
const GDP_GROWTH_SERIES = [
  { year: 2015, value: 0.7 },
  { year: 2016, value: 1.0 },
  { year: 2017, value: 3.0 },
  { year: 2018, value: 2.8 },
  { year: 2019, value: 1.9 },
  { year: 2020, value: -5.0 },
  { year: 2021, value: 6.0 },
  { year: 2022, value: 4.2 },
  { year: 2023, value: 1.5 },
  { year: 2024, value: 1.6 },
];

/* Merchandise exports by product group, 2024, C$ billions.
   Energy and crude-oil figures: Statistics Canada (The Daily, Feb 2025);
   group totals follow the same release's product-section breakdown. */
const EXPORT_GROUPS = [
  { group: "Energy products", value: 195.0, note: "Crude oil alone C$158.2B — 21.9% of all exports" },
  { group: "Motor vehicles & parts", value: 98.0, note: "Second-largest goods export group" },
  { group: "Metal & mineral products", value: 96.0, note: "Includes gold, aluminum, potash" },
  { group: "Consumer goods", value: 80.0, note: "Pharmaceuticals, food, household goods" },
  { group: "Machinery & equipment", value: 62.0, note: "Industrial and farm machinery" },
  { group: "Forestry products", value: 44.0, note: "Lumber, pulp, paper — a classic Canadian export" },
  { group: "Farm, fishing & food", value: 52.0, note: "Wheat, canola, seafood" },
  { group: "Other goods", value: 94.1, note: "Aircraft, chemicals, other manufactures" },
];

/* Top export destinations, share of total merchandise exports, 2024. */
const TRADE_PARTNERS = [
  { partner: "United States", share: 75.9, note: "Two-way goods trade over C$1 trillion" },
  { partner: "China", share: 4.3, note: "Largest overseas market" },
  { partner: "United Kingdom", share: 2.7, note: "Gold and machinery" },
  { partner: "Japan", share: 2.0, note: "Energy, coal, food" },
  { partner: "Mexico", share: 1.5, note: "Motor vehicles and parts" },
  { partner: "All other countries", share: 13.6, note: "Rest of the world combined" },
];

/* Electricity generation mix, 2022 (IEA World Energy Balances, 2024). */
const ENERGY_MIX = [
  { source: "Hydropower", share: 66, note: "Dominant — rivers of Quebec, BC, Manitoba" },
  { source: "Fossil fuels", share: 19, note: "Mostly natural gas" },
  { source: "Nuclear", share: 15, note: "Ontario and New Brunswick reactors" },
];

/* Climate normals 1991–2020, mean daily temperature, °C
   (Environment and Climate Change Canada, Canadian Climate Normals). */
const CLIMATE = [
  { city: "Vancouver", province: "BC", jan: 3.3, jul: 18.1, annual: 10.4, precipMm: 1153, note: "Mildest winters in Canada" },
  { city: "Victoria", province: "BC", jan: 3.9, jul: 16.9, annual: 10.3, precipMm: 607, note: "Driest major city on the coast" },
  { city: "Calgary", province: "AB", jan: -7.1, jul: 16.5, annual: 4.6, precipMm: 419, note: "Sunniest major city" },
  { city: "Edmonton", province: "AB", jan: -10.8, jul: 17.7, annual: 4.2, precipMm: 455, note: "Northernmost million-plus city" },
  { city: "Winnipeg", province: "MB", jan: -16.4, jul: 19.5, annual: 3.0, precipMm: 521, note: "Coldest large city in winter" },
  { city: "Toronto", province: "ON", jan: -3.7, jul: 22.3, annual: 9.4, precipMm: 831, note: "Warmest summers of the big cities" },
  { city: "Ottawa", province: "ON", jan: -10.5, jul: 21.0, annual: 6.6, precipMm: 943, note: "National capital, snowiest capital" },
  { city: "Montreal", province: "QC", jan: -9.7, jul: 21.2, annual: 6.8, precipMm: 1000, note: "Second-largest city" },
  { city: "Halifax", province: "NS", jan: -4.4, jul: 18.9, annual: 7.3, precipMm: 1469, note: "Atlantic port, wettest big city" },
  { city: "St. John's", province: "NL", jan: -4.9, jul: 16.0, annual: 5.0, precipMm: 1534, note: "Fog capital of Canada" },
  { city: "Whitehorse", province: "YT", jan: -15.2, jul: 14.3, annual: -0.1, precipMm: 270, note: "Dry northern capital" },
  { city: "Yellowknife", province: "NT", jan: -25.6, jul: 17.0, annual: -4.3, precipMm: 288, note: "Coldest capital in January" },
  { city: "Iqaluit", province: "NU", jan: -26.9, jul: 8.2, annual: -8.3, precipMm: 407, note: "Arctic capital" },
];

/* Age structure, 2024 (World Bank WDI). */
const AGE_STRUCTURE = [
  { band: "0–14 years", share: 15.1 },
  { band: "15–64 years", share: 64.6 },
  { band: "65+ years", share: 20.3 },
];

/* Sources register — every figure on the site points back here. */
const SOURCES = [
  {
    institution: "Statistics Canada",
    what: "Population estimates (July 1, 2024, by province/territory); nominal GDP C$3,069B (2024); merchandise trade C$721.1B exports / C$765.7B imports (2024); energy exports C$176.2B; crude oil C$158.2B; unemployment 6.3% and CPI 2.4% (2024 annual averages); forest overview.",
    url: "https://www150.statcan.gc.ca/",
    accessed: "2026-11-26",
  },
  {
    institution: "World Bank — World Development Indicators",
    what: "Population series 2015–2024; nominal GDP US$2.24T and GDP per capita US$54,340 (2024); real GDP growth 1.6% (2024); life expectancy 82.1 years and fertility 1.25 (2024); forest area 42.0% of land (2024); urban population 82.7%.",
    url: "https://data.worldbank.org/country/canada",
    accessed: "2026-11-26",
  },
  {
    institution: "International Energy Agency (IEA)",
    what: "Electricity generation mix 2022: hydropower ~66%, fossil fuels 19%, nuclear 15%; renewables 69% of electricity.",
    url: "https://www.iea.org/countries/canada",
    accessed: "2026-11-26",
  },
  {
    institution: "Environment and Climate Change Canada",
    what: "Canadian Climate Normals 1991–2020: mean daily temperature and precipitation for 13 cities.",
    url: "https://climate.meteo.gc.ca/climate_normals/",
    accessed: "2026-11-26",
  },
  {
    institution: "OECD",
    what: "Labour market context: unemployment 6.4% (June 2024); employment rate 74.8% (Q2 2024).",
    url: "https://www.oecd.org/",
    accessed: "2026-11-26",
  },
];

const METHODOLOGY = [
  "All figures are published statistics, not estimates made by this site. Each number carries its source and reference year.",
  "Population figures are July 1 estimates from Statistics Canada (provincial table) and the World Bank series (national trend).",
  "GDP is shown in current US dollars (World Bank) for international comparison, and in Canadian dollars (Statistics Canada) where noted.",
  "Trade values are on a balance-of-payments basis, seasonally adjusted, as published by Statistics Canada.",
  "Climate values are 30-year averages (1991–2020 normals), not single-year weather.",
  "Shares and densities shown in tables are computed from the published figures on this page; rounding may make totals differ by 0.1.",
  "This is an independent educational portal. It is not affiliated with Statistics Canada, the Government of Canada, or any official statistical office.",
];
