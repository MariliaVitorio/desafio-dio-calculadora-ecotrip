import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(root, ".env");
const envExamplePath = path.join(root, ".env.example");

if (!fs.existsSync(envPath)) {
  fs.copyFileSync(envExamplePath, envPath);
  console.log("Created .env from .env.example");
}

console.log("\nSetup complete.");
console.log("Run:");
console.log("  pnpm dev:web");
console.log("\nThen open http://localhost:5173");
