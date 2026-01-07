import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
});

async function main() {
    const client = await pool.connect();
    try {
        const resumes = await client.query('SELECT id, user_id, title FROM public.resumes');
        console.log('Resumes:', resumes.rows);

        const users = await client.query('SELECT id, email FROM auth.users');
        console.log('Users:', users.rows);
    } finally {
        client.release();
        await pool.end();
    }
}

main().catch(console.error);
