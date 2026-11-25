import { mkdirSync, writeFileSync } from "node:fs";

// Famous Last Words at 1 Percent — v2. One original line, in the phone's
// own voice, as its battery hits 1 percent. The joke: this phone is a
// survivor — cracked drops, a toilet swim, the ex's 2 a.m. calls — yet
// none of that killed it. The group chat did: a thousand unread messages
// burning the last percent while it types its own obituary.
const LINE =
  "Battery at 1%. I survived three drops, one toilet, and your ex's 2 a.m. calls — but this group chat is where I die.";

// Gate guard: the sealed scorer only judges UTF-8 text of 1-199
// characters, not whitespace-only, on a single line. Fail hard here
// instead of writing an entry that can never be judged.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 199) {
  throw new Error(`line must be 1-199 characters, got ${chars.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be whitespace-only");
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("line must be a single line (no newline)");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
