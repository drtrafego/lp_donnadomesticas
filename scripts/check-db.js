const { neon } = require('@neondatabase/serverless');

async function checkDatabase() {
    try {
        // Usando a URL diretamente para evitar dependência de dotenv
        const sql = neon('postgresql://neondb_owner:npg_1bLg0vyUfPxC@ep-red-water-ahtndd0s-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require');

        console.log('--- ORGANIZAÇÕES NO BANCO ---');
        const organizations = await sql`SELECT id, name, slug FROM organizations LIMIT 15`;
        console.table(organizations);

        console.log('\n--- COLUNAS NO BANCO ---');
        // Listando colunas e seus nomes para identificar o Kanban do cliente
        const columns = await sql`SELECT id, name, organization_id FROM columns LIMIT 50`;
        console.table(columns);

    } catch (error) {
        console.error('Erro ao acessar o banco:', error);
    }
}

checkDatabase();
