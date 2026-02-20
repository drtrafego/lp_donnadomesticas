const { neon } = require('@neondatabase/serverless');

// Usando a connection string do .env.local
const connectionString = 'postgresql://neondb_owner:npg_1bLg0vyUfPxC@ep-red-water-ahtndd0s-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
const sql = neon(connectionString);

async function checkSchema() {
    try {
        console.log('--- SCHEMA ORGANIZATIONS ---');
        const orgExample = await sql`SELECT * FROM organizations LIMIT 1`;
        if (orgExample.length > 0) {
            console.log('Keys:', Object.keys(orgExample[0]));
        } else {
            console.log('Tabela organizations vazia.');
        }

        console.log('\n--- SCHEMA COLUMNS ---');
        const colExample = await sql`SELECT * FROM columns LIMIT 1`;
        if (colExample.length > 0) {
            console.log('Keys:', Object.keys(colExample[0]));
        } else {
            console.log('Tabela columns vazia.');
        }

    } catch (error) {
        console.error('Erro ao acessar o banco:', error);
    }
}

checkSchema();
