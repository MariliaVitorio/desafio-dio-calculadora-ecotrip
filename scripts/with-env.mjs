import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

config({ path: path.join(root, ".env") });

const [, , ...args] = process.argv;

if (args.length === 0) {
  console.error("Usage: node scripts/with-env.mjs <command> [args...]");
  process.exit(1);
}

const result = spawnSync(args[0], args.slice(1), {
  stdio: "inherit",
  shell: true,
  env: process.env,
  cwd: root,
});

process.exit(result.status ?? 1);
