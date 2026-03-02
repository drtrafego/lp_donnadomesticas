const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });
if (!process.env.DATABASE_URL) require('dotenv').config({ path: '.env' });

async function run() {
    try {
        const sql = neon(process.env.DATABASE_URL);
        await sql`ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS utm_content text;`;
        console.log('Column utm_content added successfully');
    } catch (err) {
        console.error('Error:', err);
    }
}
run();
