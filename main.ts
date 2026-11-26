// Two Days of Quiet Dread — make.fun one-liner entry.
//
// Writes a single-line code review comment that approves a pull request
// while carrying quiet existential dread to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt). Node 22, standard library only, no network,
// no secrets, fully deterministic.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "LGTM. It works, the diff is clean, and I've stopped asking who any of this is actually for.";

function validate(line: string): void {
  if (line.length < 1 || line.length > 140) {
    throw new Error(`line must be 1-140 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

validate(LINE);
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
console.log(`wrote ${LINE.length} characters to ${outPath}`);
