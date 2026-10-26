// scripts/build-photo-picker.mjs
// Generates smoke-report/photo-picker.html (self-contained, no external JS/CSS).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const candidates = JSON.parse(readFileSync(path.join(process.cwd(), "data", "photo-candidates.json"), "utf8"));
const queries = JSON.parse(readFileSync(path.join(process.cwd(), "data", "photo-queries.json"), "utf8"));
const cities = Object.keys(candidates).sort();

const imgBase = (url, w) => `${url}?w=${w}&q=60&auto=format&fit=crop&crop=entropy`;

const cards = cities.map((code) => {
  const cands = candidates[code] || [];
  const q = queries[code] || code;
  const opts = cands.map((c, i) => `
    <label class="cand">
      <input type="radio" name="${code}" value="${c.id}" />
      <div class="imgwrap"><img src="${imgBase(c.url, 480)}" loading="lazy" alt="${(c.alt||"").replace(/"/g,'&quot;')}" /></div>
      <div class="meta">${c.width}x${c.height} &middot; ${c.author}</div>
    </label>`).join("");
  const noneOpt = `<label class="cand none"><input type="radio" name="${code}" value="__none__" /><div class="imgwrap nonebox">None / keep gradient</div></label>`;
  return `
  <section class="city" data-code="${code}">
    <h2>${code} <span class="q">${q}</span></h2>
    <div class="grid">${opts}${noneOpt}</div>
  </section>`;
}).join("");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Photo Picker</title>
<style>
*{box-sizing:border-box}
body{font-family:system-ui,sans-serif;background:#0b1b2b;color:#fff;margin:0;padding:16px}
h1{font-size:20px;margin:0 0 12px}
.sticky{position:sticky;top:0;background:#0b1b2b;padding:12px 0;border-bottom:1px solid #333;z-index:10;display:flex;gap:12px;align-items:center;flex-wrap:wrap}
.sticky button{padding:8px 16px;background:#FFB703;color:#0b1b2b;border:none;border-radius:8px;font-weight:700;cursor:pointer}
.sticky textarea{flex:1;min-width:200px;height:60px;font-family:monospace;font-size:11px;background:#111;color:#0f0;border:1px solid #333;border-radius:8px;padding:6px}
.city{margin:24px 0;padding:16px;border:1px solid #333;border-radius:12px}
.city h2{font-size:16px;margin:0 0 12px;font-family:monospace}
.city h2 .q{font-size:12px;color:#aaa;font-weight:400;margin-left:8px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px}
.cand{cursor:pointer;display:block}
.cand input{display:none}
.imgwrap{aspect-ratio:16/9;overflow:hidden;border-radius:8px;border:2px solid transparent;background:#222}
.cand input:checked + .imgwrap{border-color:#FFB703;box-shadow:0 0 0 2px #FFB703}
.imgwrap img{width:100%;height:100%;object-fit:cover;display:block}
.nonebox{display:flex;align-items:center;justify-content:center;color:#aaa;font-size:12px}
.meta{font-size:10px;color:#aaa;margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
@media (max-width:400px){.grid{grid-template-columns:repeat(2,1fr)}}
</style>
</head>
<body>
<h1>Photo Picker (needs human review)</h1>
<div class="sticky">
  <button id="export">Export choices</button>
  <span id="count">0 chosen</span>
  <textarea id="out" readonly placeholder="choices JSON..."></textarea>
</div>
${cards}
<script>
const KEY="photoChoices";
function load(){try{return JSON.parse(localStorage.getItem(KEY)||"{}")}catch{return{}}}
function save(o){localStorage.setItem(KEY,JSON.stringify(o));refresh()}
function refresh(){
  const o=load();
  document.querySelectorAll("input[type=radio]").forEach(i=>{i.checked = o[i.name]===i.value;});
  document.getElementById("count").textContent = Object.keys(o).length + " chosen";
  document.getElementById("out").value = JSON.stringify(o,null,2);
}
document.addEventListener("change", (e)=>{
  if(e.target && e.target.type==="radio"){
    const o=load(); o[e.target.name]=e.target.value; save(o);
  }
});
document.getElementById("export").addEventListener("click", ()=>{
  const o=load();
  const blob=new Blob([JSON.stringify(o,null,2)],{type:"application/json"});
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="photo-choices.json"; a.click();
  document.getElementById("out").value=JSON.stringify(o,null,2);
});
refresh();
</script>
</body>
</html>`;

mkdirSync(path.join(process.cwd(), "smoke-report"), { recursive: true });
writeFileSync(path.join(process.cwd(), "smoke-report", "photo-picker.html"), html);
console.log("written: smoke-report/photo-picker.html");
console.log("cities:", cities.length);
