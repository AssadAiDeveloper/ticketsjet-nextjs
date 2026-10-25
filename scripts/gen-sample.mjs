const fs = require("fs");
const major = ["AMS","LON","PAR","ROM","IST","DXB","CAI","CMN","RUH","TLV","THR","MOW","WAW","BER","MAD","LIS","NYC","BKK","TYO","SIN"];
const locs = ["en","ar","nl","es","fr","de","it","pt","tr","ru","pl","fa","he"];
const enData = JSON.parse(fs.readFileSync("data/city-names/en.json","utf8"));
let md = "# City Names Sample\n\nFor each locale, 20 major cities with the chosen name and source.\nSource: TP (Travelpayouts per-locale) or Fallback (English). Rows for fa/he/ar/tr are marked needs native review.\n\n";
for (const loc of locs) {
  const data = JSON.parse(fs.readFileSync("data/city-names/"+loc+".json","utf8"));
  md += "## " + loc + "\n\n| Code | Name | Source |\n|------|------|--------|\n";
  for (const code of major) {
    const name = data[code] || code;
    const enName = enData[code] || code;
    const source = (name !== enName) ? "TP" : "Fallback (EN)";
    const review = (loc==="fa"||loc==="he"||loc==="ar"||loc==="tr") ? " needs native review" : "";
    md += "| " + code + " | " + name + " | " + source + review + " |\n";
  }
  md += "\n";
}
fs.writeFileSync("docs/city-names-sample.md", md);
console.log("written");
