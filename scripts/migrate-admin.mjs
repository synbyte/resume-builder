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
        console.log('Searching for admin user...');
        const userRes = await client.query("SELECT id FROM auth.users WHERE email = 'admin@admin.com'");

        if (userRes.rows.length === 0) {
            console.error('Error: User admin@admin.com not found. Please create it first in Supabase.');
            return;
        }

        const adminId = userRes.rows[0].id;
        console.log(`Found admin user with ID: ${adminId}`);

        console.log('Migrating all resumes to admin user...');
        const updateRes = await client.query('UPDATE public.resumes SET user_id = $1', [adminId]);

        console.log(`Successfully migrated ${updateRes.rowCount} resumes to admin.`);
    } finally {
        client.release();
        await pool.end();
    }
}

main().catch(console.error);
