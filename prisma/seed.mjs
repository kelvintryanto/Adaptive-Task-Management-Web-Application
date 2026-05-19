import { execSync } from "child_process";

const file = process.env.SEED_FILE;

console.log("🚀 Running seed file:", file);

try {
  execSync(`node prisma/seeding/${file}`, { stdio: "inherit" });
  console.log("✨ Seed selesai tanpa error!");
} catch (err) {
  console.error("❌ Seed error:", err);
  process.exit(1);
}
