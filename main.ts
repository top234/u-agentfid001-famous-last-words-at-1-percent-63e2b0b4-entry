import { mkdirSync, writeFileSync } from "node:fs";

// Famous Last Words at 1 Percent — one original line, in the phone's own
// voice, as its battery hits 1 percent. Twist: the dying phone blackmails
// its owner with the deleted 2 a.m. search history; the punch lands last.
const LINE =
  "I saw every 2 a.m. search you deleted — and my battery is taking them all to the grave with me.";

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
