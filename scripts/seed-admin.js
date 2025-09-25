// scripts/seed-admin.js
// @ts-nocheck
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
(async () => {
  await prisma.user.update({
    where: { email: 'adminNew@g.com' },
    data: { roles: { set: ['admin'] } },
  });
  console.log('Bootstrapped admin');
  await prisma.$disconnect();
})();
