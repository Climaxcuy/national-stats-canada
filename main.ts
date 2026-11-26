/* Canada in Numbers — main.ts (hand-in entrypoint)
 *
 * Copies the static site (app/) and its screenshots (screenshots/) from this
 * repository into the output directory and writes /output/dossier.json with
 * buildDossier from the kit's vendored library.
 *
 * Run:  MAKEFUN_OUTPUT_DIR=/tmp/out-stats-climaxku-a node main.ts
 * Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.
 * Node 22, standard library only. No network, no build step.
 */

import { cpSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

/* The bounty gate's caps for this competition. */
const CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

/* The repository root is the directory holding this entrypoint. */
const REPO_ROOT: string = dirname(fileURLToPath(import.meta.url));

/* The grader hands the program a writable /output; locally the env var
   overrides it so the same program can be run twice for a byte check. */
const OUTPUT_DIR: string = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");

function copyTree(sourceDir: string, targetDir: string): void {
  mkdirSync(targetDir, { recursive: true });
  cpSync(sourceDir, targetDir, { recursive: true, dereference: true });
}

function main(): void {
  const appDir: string = join(REPO_ROOT, "app");
  const shotsDir: string = join(REPO_ROOT, "screenshots");

  mkdirSync(OUTPUT_DIR, { recursive: true });
  copyTree(appDir, join(OUTPUT_DIR, "app"));
  copyTree(shotsDir, join(OUTPUT_DIR, "screenshots"));

  /* buildDossier reads app/ and screenshots/ back from the output
     directory and returns the dossier as canonical JSON bytes. */
  const dossier: Uint8Array = buildDossier(OUTPUT_DIR, CAPS);
  writeFileSync(join(OUTPUT_DIR, "dossier.json"), dossier);

  console.log(`Canada in Numbers handed in: ${OUTPUT_DIR} (${dossier.length} byte dossier)`);
}

main();
