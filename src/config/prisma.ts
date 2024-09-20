import {Prisma, PrismaClient} from '@prisma/client';

const dev = process.env.NODE_ENV !== 'production';

const globalForPrisma = global as unknown as {prisma: PrismaClient};

const options: Prisma.PrismaClientOptions = {
  log: dev ? ['query', 'info', 'error', 'warn'] : ['error'],
};

const prisma = globalForPrisma.prisma || new PrismaClient(options);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
