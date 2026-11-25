// Monday Morning Punchlines — writes one joke about Monday mornings
// to <output>/entry.txt (UTF-8, one line, no trailing newline).
// Node 22, TypeScript, stdlib only.

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My Monday alarm went off, took one look at the time, and hit snooze on itself.";

// The gate requires 1–200 characters, not only whitespace, single line.
function validate(entry: string): void {
  if (entry.length < 1 || entry.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${entry.length}`);
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function clearDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  validate(ENTRY);
  const dir = outputDir();
  clearDir(dir);
  const target = join(dir, "entry.txt");
  writeFileSync(target, ENTRY, "utf8");
  // Read back and confirm the file holds exactly the decided line.
  const written = readFileSync(target, "utf8");
  if (written !== ENTRY) {
    throw new Error("read-back mismatch: entry.txt does not match the entry");
  }
}

main();
