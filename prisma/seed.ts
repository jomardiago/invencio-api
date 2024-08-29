import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();
const password = "admin";

async function main() {
  const hashedPassword = await hash(password, 10);

  const josediago = await prisma.user.upsert({
    where: { email: "josediago@gmail.com" },
    update: {},
    create: {
      email: "josediago@gmail.com",
      password: hashedPassword,
      isAdmin: true,
    },
  });

  console.log({ josediago });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
