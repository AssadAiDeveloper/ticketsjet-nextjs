# City Names Audit

## Where city/airport names are rendered
- `lib/places.ts` — `getCities()` fetches `https://api.travelpayouts.com/data/en/cities.json` (English only). Cached in memory.
- `lib/cityNames.ts` — manual ar/nl overrides for ~200 popular cities (`NAMES`), plus `cityName(code, en, locale)` and `cityAliases(code, en)`.
- `lib/fares.ts`, `lib/deals.ts`, `lib/tripSearch.ts` — join fares with city names from `getCities()`.
- `app/api/cities/route.ts` — autocomplete endpoint; uses `cityName(code, name, locale)` and `cityAliases` for matching.
- `app/[locale]/destinations/[city]/page.tsx`, `app/[locale]/cheap-flights/[route]/page.tsx` — render destination/city names.
- `components/DestinationCards.tsx`, `HeroFlightForm`, `searchParts` — search inputs and suggestion lists.
- Page titles/meta descriptions in destinations/cheap-flights pages use city names.

## Travelpayouts per-locale support
Travelpayouts exposes `/data/<locale>/cities.json`. The `name` field is localized; `name_translations.en` holds the English name.

Coverage (cities with a name different from English):

| Locale | Total | Translated | % |
|--------|-------|-----------|---|
| ar | 9653 | 8798 | 91.1% |
| ru | 9653 | 9653 | 100.0% |
| tr | 9653 | 2682 | 27.8% |
| de | 9653 | 2041 | 21.1% |
| fr | 9653 | 1960 | 20.3% |
| es | 9653 | 1938 | 20.1% |
| pl | 9653 | 2294 | 23.8% |
| pt | 9653 | 1838 | 19.0% |
| it | 9653 | 1701 | 17.6% |
| nl | 9653 | 0 | 0.0% (English fallback) |
| fa | 9653 | 0 | 0.0% (English fallback) |
| he | 9653 | 0 | 0.0% (English fallback) |
| en | 9653 | 9653 | 100.0% (base) |

Notes:
- nl/fa/he have no localized names from Travelpayouts; rely on manual overrides (cityNames.ts) + English fallback.
- GeoNames alternateNamesV2 is the planned secondary source for the remaining gaps; not yet integrated.
- City names in search fields are only localized for ar/nl today; other languages fall back to English.
