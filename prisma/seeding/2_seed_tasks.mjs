import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Ambil users
  const adminUser = await prisma.user.findUnique({
    where: {
      email: "admin@turboly.com",
    },
  });

  const kelvinUser = await prisma.user.findUnique({
    where: {
      email: "kelvintryanto@turboly.com",
    },
  });

  const skyjackUser = await prisma.user.findUnique({
    where: {
      email: "skyjack@turboly.com",
    },
  });

  console.log("📝 Seeding tasks...");

  const today = new Date();

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const tasks = [
    {
      title: "Finish adaptive layout",
      description: "Complete mobile, tablet, and desktop layouts",
      dueDate: today,
      priority: "HIGH",
      completed: false,
      userId: adminUser.id,
    },

    {
      title: "Deploy app to Vercel",
      description: "Production deployment testing",
      dueDate: tomorrow,
      priority: "MEDIUM",
      completed: false,
      userId: adminUser.id,
    },

    {
      title: "Fix login authentication",
      description: "Resolve auth session issue",
      dueDate: yesterday,
      priority: "HIGH",
      completed: true,
      userId: kelvinUser.id,
    },

    {
      title: "Create task dashboard UI",
      description: "Build responsive dashboard",
      dueDate: today,
      priority: "LOW",
      completed: false,
      userId: kelvinUser.id,
    },

    {
      title: "Prepare coding challenge README",
      description: "Add screenshots and setup guide",
      dueDate: tomorrow,
      priority: "MEDIUM",
      completed: false,
      userId: skyjackUser.id,
    },

    {
      title: "Implement sorting feature",
      description: "Sort by due date and priority",
      dueDate: today,
      priority: "HIGH",
      completed: false,
      userId: skyjackUser.id,
    },
  ];

  for (const task of tasks) {
    await prisma.task.create({
      data: task,
    });
  }

  console.log(
    "✅ Tasks seeded:",
    tasks.map((t) => t.title).join(", ")
  );
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });