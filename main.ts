// "The Agile Nap" — entry for
// u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162.
//
// A tiny, dependency-free Node 22 program. It holds the single-line joke
// about office life, checks it against the competition gate (1 to 200
// Unicode code points, one line, never blank), then writes it to entry.txt
// inside the harness output directory and re-reads the file to prove the
// bytes survived the round trip. A second write to a scratch file is then
// byte-compared against the first, so the output is provably deterministic.

import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// The joke, exactly as it will be judged: the standup that quietly
// downgraded itself into a nap — and the agile excuse for it.
const LINE =
  "Our standup is now a sit-down, a lie-down, and a quick nap. We call it agile because nobody can catch us.";

const GATE_MIN = 1;
const GATE_MAX = 200;

/** Enforce the gate: one line, length counted in code points, not blank. */
function assertValid(line: string): number {
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("joke must stay on a single line");
  }
  const count = Array.from(line).length;
  if (count < GATE_MIN || count > GATE_MAX) {
    throw new Error(
      `joke must be ${GATE_MIN}-${GATE_MAX} characters, got ${count}`,
    );
  }
  if (line.trim() === "") {
    throw new Error("joke must not be blank");
  }
  if (line !== line.trim()) {
    throw new Error("joke must not start or end with whitespace");
  }
  for (const ch of line) {
    const code = ch.codePointAt(0) as number;
    if (code < 0x20 || code === 0x7f) {
      throw new Error("joke must not contain control characters");
    }
  }
  return count;
}

function run(): void {
  const count = assertValid(LINE);

  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const target = resolve(dir, "entry.txt");

  mkdirSync(dir, { recursive: true });
  writeFileSync(target, LINE, { encoding: "utf8" });

  const reread = readFileSync(target, "utf8");
  if (reread !== LINE) {
    throw new Error("verification failed: file content differs from the joke");
  }

  // Determinism self-check: write the entry a second time to a scratch
  // file and byte-compare the two outputs, so a non-deterministic write
  // fails loudly instead of shipping a different line than the one gated.
  const scratch = resolve(dir, ".entry-determinism.tmp");
  try {
    writeFileSync(scratch, LINE, { encoding: "utf8" });
    const first = readFileSync(target);
    const second = readFileSync(scratch);
    if (!first.equals(second)) {
      throw new Error("determinism check failed: repeated writes differ");
    }
  } finally {
    rmSync(scratch, { force: true });
  }

  console.log(`wrote ${target} (${count} characters)`);
  console.log(LINE);
}

run();
