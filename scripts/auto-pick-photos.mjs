import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const CANDIDATES = path.join(process.cwd(), "data", "photo-candidates.json");
const PHOTOS = path.join(process.cwd(), "data", "destination-photos.json");

const BAD_WORDS = ["portrait", "people", "woman", "man", "girl", "boy", "model", "wedding", "food", "dog", "cat"];

function isBad(candidate) {
  const text = ((candidate.alt || "") + " " + (candidate.description || "")).toLowerCase();
  return BAD_WORDS.some((w) => text.includes(w));
}

const candidates = JSON.parse(readFileSync(CANDIDATES, "utf8"));
const photos = JSON.parse(readFileSync(PHOTOS, "utf8"));

const usedIds = new Set(Object.values(photos).map((p) => p.id));

let added = 0;
for (const city of Object.keys(candidates)) {
  if (photos[city]) continue; // don't overwrite existing
  const cands = candidates[city];
  if (!Array.isArray(cands) || cands.length === 0) continue;

  // filter: landscape, width >= 2000, not bad
  let filtered = cands.filter((c) => c.width > c.height && c.width >= 2000 && !isBad(c) && !usedIds.has(c.id));
  if (filtered.length === 0) {
    // relax: just landscape + not bad
    filtered = cands.filter((c) => c.width > c.height && !isBad(c) && !usedIds.has(c.id));
  }
  if (filtered.length === 0) continue;

  // sort by likes (desc) if available, else keep order
  filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));

  const pick = filtered[0];
  photos[city] = {
    id: pick.id,
    url: pick.url,
    blur_hash: pick.blur_hash || null,
    color: pick.color || null,
    alt: pick.alt || "",
    width: pick.width,
    height: pick.height,
    author: pick.author,
    authorUrl: pick.authorUrl,
    photoUrl: pick.photoUrl,
    downloadLocation: pick.downloadLocation,
  };
  usedIds.add(pick.id);
  added++;
}

writeFileSync(PHOTOS, JSON.stringify(photos, null, 2) + "\n");
console.log("Added", added, "photos. Total:", Object.keys(photos).length);