import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start seeding users...");

  // Hapus data lama
  await prisma.user.deleteMany();

  console.log("🧹 Existing users deleted");

  // Hash password
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Seed users
  const users = [
    {
      name: "Admin",
      email: "admin@turboly.com",
      password: hashedPassword,
    },

    {
      name: "Kelvin Tryanto",
      email: "kelvintryanto@turboly.com",
      password: hashedPassword,
    },

    {
      name: "Skyjack",
      email: "skyjack@turboly.com",
      password: hashedPassword,
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log(
    "✅ Users seeded:",
    users.map((u) => u.email).join(", ")
  );

  console.log("🎉 Seeding completed");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });