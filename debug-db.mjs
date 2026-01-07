import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
    try {
        const resumes = await prisma.resumes.findMany({
            select: {
                id: true,
                user_id: true,
                title: true
            }
        });
        console.log('Current Resumes:', JSON.stringify(resumes, null, 2));

        const users = await prisma.users.findMany({
            select: {
                id: true,
                email: true
            }
        });
        console.log('Current Users:', JSON.stringify(users, null, 2));
    } catch (err) {
        console.error('Error during DB check:', err);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
