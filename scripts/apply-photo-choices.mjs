// scripts/apply-photo-choices.mjs
// Reads data/photo-choices.json + data/photo-candidates.json, calls download_location once per chosen photo,
// writes final data/destination-photos.json.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const envPath = path.join(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
  }
}
const KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!KEY) { console.error("UNSPLASH_ACCESS_KEY missing"); process.exit(0); }

const choices = JSON.parse(readFileSync(path.join(process.cwd(), "data", "photo-choices.json"), "utf8"));
const candidates = JSON.parse(readFileSync(path.join(process.cwd(), "data", "photo-candidates.json"), "utf8"));
const PHOTOS_PATH = path.join(process.cwd(), "data", "destination-photos.json");
let photos = {};
if (existsSync(PHOTOS_PATH)) {
  try { photos = JSON.parse(readFileSync(PHOTOS_PATH, "utf8")); } catch { photos = {}; }
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${KEY}` } });
  if (!res.ok) throw new Error("fetch " + res.status);
  return res.json();
}

let triggered = 0;
for (const [code, photoId] of Object.entries(choices)) {
  if (photoId === "__none__") { console.log(code, "-> none (skip)"); continue; }
  if (photos[code]?.id === photoId && photos[code]?.triggered) { console.log(code, "-> already triggered"); continue; }
  const cands = candidates[code] || [];
  const chosen = cands.find((c) => c.id === photoId);
  if (!chosen) { console.log(code, "-> candidate not found"); continue; }
  try {
    await fetch(chosen.downloadLocation + `?client_id=${KEY}`);
    triggered++;
  } catch (e) { console.error(code, "download_location failed:", e.message); }
  photos[code] = {
    id: chosen.id,
    url: chosen.url,
    blur_hash: chosen.blur_hash,
    color: chosen.color,
    alt: chosen.alt,
    width: chosen.width,
    height: chosen.height,
    author: chosen.author,
    authorUrl: chosen.authorUrl,
    photoUrl: chosen.photoUrl,
    downloadLocation: chosen.downloadLocation,
    triggered: true,
  };
  console.log(code, "->", chosen.author, chosen.width + "x" + chosen.height);
}
writeFileSync(PHOTOS_PATH, JSON.stringify(photos, null, 2));
console.log(`\nTriggered download_location for ${triggered} new photos.`);
console.log(`Total photos: ${Object.keys(photos).length}`);
