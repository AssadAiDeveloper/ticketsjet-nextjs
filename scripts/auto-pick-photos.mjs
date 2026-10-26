import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const CANDIDATES = path.join(process.cwd(), "data", "photo-candidates.json");
const PHOTOS = path.join(process.cwd(), "data", "destination-photos.json");
const OVERRIDES = path.join(process.cwd(), "scripts", "photo-overrides.json");

const BAD_WORDS = ["portrait", "people", "woman", "man", "girl", "boy", "model", "wedding", "food", "dog", "cat",
  "sign", "letters", "text", "typography", "lettering", "neon", "poster", "billboard", "logo", "graffiti",
  "street art", "sticker", "selfie", "interior", "indoor", "restaurant", "hotel room", "car", "bicycle", "bike", "bus"];

const PREFER_WORDS = ["skyline", "cityscape", "aerial", "panorama", "harbor", "old town", "street", "church",
  "castle", "bridge", "tower", "beach", "mountain", "landmark"];

function isBad(candidate) {
  const text = ((candidate.alt || "") + " " + (candidate.description || "") + " " + (candidate.tags || []).join(" ")).toLowerCase();
  return BAD_WORDS.some((w) => text.includes(w));
}

function score(candidate, cityName) {
  const text = ((candidate.alt || "") + " " + (candidate.description || "") + " " + (candidate.tags || []).join(" ")).toLowerCase();
  let s = 0;
  if (cityName && text.includes(cityName.toLowerCase())) s += 3;
  for (const w of PREFER_WORDS) if (text.includes(w)) s += 2;
  if (candidate.likes) s += Math.min(candidate.likes / 1000, 5);
  return s;
}

const candidates = JSON.parse(readFileSync(CANDIDATES, "utf8"));
const photos = JSON.parse(readFileSync(PHOTOS, "utf8"));

let overrides = {};
if (existsSync(OVERRIDES)) {
  try { overrides = JSON.parse(readFileSync(OVERRIDES, "utf8")); } catch { overrides = {}; }
}

const usedIds = new Set(Object.values(photos).map((p) => p.id));

// Handle overrides first
for (const [city, photoId] of Object.entries(overrides)) {
  if (photos[city]) continue; // don't overwrite existing
  // find candidate with that id
  const cands = candidates[city] || [];
  const pick = cands.find((c) => c.id === photoId);
  if (pick) {
    photos[city] = {
      id: pick.id, url: pick.url, blur_hash: pick.blur_hash || null, color: pick.color || null,
      alt: pick.alt || "", width: pick.width, height: pick.height, author: pick.author,
      authorUrl: pick.authorUrl, photoUrl: pick.photoUrl, downloadLocation: pick.downloadLocation,
    };
    usedIds.add(pick.id);
  }
}

let added = 0;
for (const city of Object.keys(candidates)) {
  if (photos[city]) continue;
  const cands = candidates[city];
  if (!Array.isArray(cands) || cands.length === 0) continue;

  let filtered = cands.filter((c) => c.width > c.height && c.width >= 2000 && !isBad(c) && !usedIds.has(c.id));
  if (filtered.length === 0) {
    filtered = cands.filter((c) => c.width > c.height && !isBad(c) && !usedIds.has(c.id));
  }
  if (filtered.length === 0) continue;

  const cityName = city; // use IATA as fallback for city name matching
  filtered.sort((a, b) => score(b, cityName) - score(a, cityName));
  // tie-break by likes
  filtered.sort((a, b) => {
    const sa = score(a, cityName), sb = score(b, cityName);
    if (sb !== sa) return sb - sa;
    return (b.likes || 0) - (a.likes || 0);
  });

  const pick = filtered[0];
  photos[city] = {
    id: pick.id, url: pick.url, blur_hash: pick.blur_hash || null, color: pick.color || null,
    alt: pick.alt || "", width: pick.width, height: pick.height, author: pick.author,
    authorUrl: pick.authorUrl, photoUrl: pick.photoUrl, downloadLocation: pick.downloadLocation,
  };
  usedIds.add(pick.id);
  added++;
}

writeFileSync(PHOTOS, JSON.stringify(photos, null, 2) + "\n");
console.log("Added", added, "photos. Total:", Object.keys(photos).length);