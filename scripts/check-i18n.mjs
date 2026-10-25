import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

// Check for U+FFFD replacement characters in all source/message files.
function walk(dir) {
  const out = [];
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    const s = statSync(p);
    if (s.isDirectory()) { if (f === "node_modules" || f === ".next" || f === ".git") continue; out.push(...walk(p)); }
    else if (/\.(tsx?|json|css|mjs|cjs)$/.test(f)) out.push(p);
  }
  return out;
}
let ffdFailed = false;
for (const f of walk(process.cwd())) {
  const txt = readFileSync(f, "utf8");
  if (txt.includes("\uFFFD")) { console.error(`U+FFFD found in ${f}`); ffdFailed = true; }
}
if (ffdFailed) { console.error("check-i18n: FAILED (U+FFFD present)"); process.exit(1); }

const messagesDir = path.join(process.cwd(), "messages");
const enPath = path.join(messagesDir, "en.json");
const en = JSON.parse(readFileSync(enPath, "utf8"));

function flatten(obj, prefix = "", out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) flatten(v, key, out);
    else out[key] = v;
  }
  return out;
}

const enFlat = flatten(en);
const enKeys = Object.keys(enFlat);

function placeholders(s) {
  const set = new Set();
  let i = 0;
  const str = String(s);
  while (i < str.length) {
    if (str[i] === "{") {
      let depth = 0;
      let j = i;
      for (; j < str.length; j++) {
        if (str[j] === "{") depth++;
        else if (str[j] === "}") { depth--; if (depth === 0) break; }
      }
      if (j < str.length) {
        const inner = str.slice(i + 1, j).trim();
        const varName = inner.split(/[,\s]/)[0];
        if (varName) set.add(varName);
        i = j + 1; continue;
      }
    }
    i++;
  }
  return set;
}
function tags(s) {
  const set = new Set();
  for (const m of String(s).matchAll(/<\/?[A-Za-z0-9_]+(?:\s[^>]*)?>/g)) {
    const t = m[0].replace(/\s.*$/, ">");
    set.add(t);
  }
  return set;
}

const files = readdirSync(messagesDir).filter((f) => f.endsWith(".json") && f !== "en.json");
let failed = false;

for (const file of files) {
  const locale = file.replace(".json", "");
  const data = JSON.parse(readFileSync(path.join(messagesDir, file), "utf8"));
  const flat = flatten(data);

  const missing = enKeys.filter((k) => !(k in flat));
  const extra = Object.keys(flat).filter((k) => !(k in enFlat));

  const mismatches = [];
  for (const k of enKeys) {
    if (!(k in flat)) continue;
    const enVal = enFlat[k];
    const locVal = flat[k];
    if (typeof enVal !== "string" || typeof locVal !== "string") continue;
    const phEn = placeholders(enVal);
    const phLoc = placeholders(locVal);
    const tagEn = tags(enVal);
    const tagLoc = tags(locVal);
    if (phEn.size !== phLoc.size || [...phEn].some((p) => !phLoc.has(p))) {
      mismatches.push({ key: k, kind: "placeholder", en: [...phEn], loc: [...phLoc] });
    }
    if (tagEn.size !== tagLoc.size || [...tagEn].some((t) => !tagLoc.has(t))) {
      mismatches.push({ key: k, kind: "tag", en: [...tagEn], loc: [...tagLoc] });
    }
  }

  if (missing.length || mismatches.length) {
    failed = true;
    console.error(`\n[${locale}] ${file}`);
    if (missing.length) console.error(`  Missing keys (${missing.length}): ${missing.slice(0, 10).join(", ")}${missing.length > 10 ? "..." : ""}`);
    if (extra.length) console.warn(`  Extra keys (${extra.length}): ${extra.slice(0, 5).join(", ")}${extra.length > 5 ? "..." : ""}`);
    for (const m of mismatches.slice(0, 20)) console.error(`  Mismatch ${m.kind} at ${m.key}: en=${JSON.stringify(m.en)} loc=${JSON.stringify(m.loc)}`);
    if (mismatches.length > 20) console.error(`  ...and ${mismatches.length - 20} more mismatches`);
  } else {
    console.log(`[${locale}] OK (${Object.keys(flat).length} keys)`);
  }
}

if (failed) {
  console.error("\ncheck-i18n: FAILED");
  process.exit(1);
} else {
  console.log("\ncheck-i18n: all locales OK");
}
