// Run: npm run seed:admin:raw
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ADMIN_EMAIL = "adminNew@g.com";

(async () => {
  // Ensure roles column exists (idempotent)
  await prisma.$executeRawUnsafe(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'User' AND column_name = 'roles'
      ) THEN
        ALTER TABLE "User" ADD COLUMN "roles" TEXT[] NOT NULL DEFAULT '{}';
      END IF;
    END$$;
  `);

  const count = await prisma.$executeRawUnsafe(
    `UPDATE "User" SET roles = ARRAY['admin']::text[] WHERE email = $1`,
    ADMIN_EMAIL
  );
  console.log(`Updated ${count} row(s). Admin bootstrapped -> ${ADMIN_EMAIL}`);
  await prisma.$disconnect();
})().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
