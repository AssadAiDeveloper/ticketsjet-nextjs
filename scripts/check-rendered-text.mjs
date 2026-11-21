import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const appDir = path.join(process.cwd(), ".next", "server", "app");
if (!existsSync(appDir)) {
  console.error("check-rendered-text: .next/server/app not found. Run npm run build first.");
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const target = path.join(dir, name);
    if (statSync(target).isDirectory()) out.push(...walk(target));
    else out.push(target);
  }
  return out;
}

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#x27;|&#39;/gi, "'")
    .replace(/\s+/g, " ");
}

const routeDir = `${path.sep}cheap-flights${path.sep}`;
const destinationDir = `${path.sep}destinations${path.sep}`;
const allHtmlFiles = walk(appDir).filter((file) => file.endsWith(".html"));
const files = allHtmlFiles.filter(
  (file) => file.includes(routeDir) || file.includes(destinationDir),
);

if (!files.length) {
  console.error("check-rendered-text: no prerendered route or destination pages found");
  process.exit(1);
}

let failed = false;
for (const file of files) {
  const text = visibleText(readFileSync(file, "utf8"));
  const placeholders = [...new Set(text.match(/\{[A-Za-z]+\}/g) ?? [])];
  const badHours = /\b1 hours\b/.test(text);
  if (placeholders.length || badHours) {
    failed = true;
    console.error(`check-rendered-text: ${path.relative(process.cwd(), file)}`);
    if (placeholders.length) console.error(`  placeholders: ${placeholders.join(", ")}`);
    if (badHours) console.error("  singular hour wording: 1 hours");
  }
}

for (const file of allHtmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const match of html.matchAll(/<link\b[^>]*\brel\s*=\s*["'][^"']*icon[^"']*["'][^>]*>/gi)) {
    const href = match[0].match(/\bhref\s*=\s*["']([^"']*)["']/i)?.[1];
    if (href && /^data:/i.test(href)) {
      failed = true;
      console.error(`check-rendered-text: data URI icon in ${path.relative(process.cwd(), file)}`);
    }
  }
  if (/C6613F/i.test(html)) {
    failed = true;
    console.error(`check-rendered-text: legacy icon colour in ${path.relative(process.cwd(), file)}`);
  }
}

console.log(`check-rendered-text: ${files.length} route and destination pages checked`);
console.log(`check-rendered-text: ${allHtmlFiles.length} HTML files checked for data URI icons`);
if (failed) {
  console.error("check-rendered-text: FAILED");
  process.exit(1);
}
console.log("check-rendered-text: OK");
