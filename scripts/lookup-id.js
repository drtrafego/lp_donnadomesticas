const { neon } = require('@neondatabase/serverless');

const SEARCH_ID = '8f6eed8c-ce0d-472e-9531-aa4e76149be0';

// Usando a connection string do .env.local
const connectionString = 'postgresql://neondb_owner:npg_1bLg0vyUfPxC@ep-red-water-ahtndd0s-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
const sql = neon(connectionString);

async function lookupId() {
    try {
        console.log(`🔍 Buscando ID: ${SEARCH_ID} (Filtragem em JS)...`);

        // 1. Buscar tudo de organizations
        const allOrgs = await sql`SELECT * FROM organizations`;
        const foundOrg = allOrgs.find(o => o.id === SEARCH_ID);

        if (foundOrg) {
            console.log('\n✅ ENCONTRADO: É uma Organização!');
            console.table([foundOrg]);

            // Buscar colunas desta organização
            const allCols = await sql`SELECT * FROM columns`;
            const orgCols = allCols.filter(c => c.organization_id === SEARCH_ID).sort((a, b) => a.position - b.position);

            console.log('\n📋 Colunas desta Organização:');
            console.table(orgCols.map(c => ({ id: c.id, title: c.title, position: c.position })));
            return;
        }

        // 2. Buscar tudo de columns
        const allCols = await sql`SELECT * FROM columns`;
        const foundCol = allCols.find(c => c.id === SEARCH_ID);

        if (foundCol) {
            console.log('\n✅ ENCONTRADO: É uma Coluna!');
            console.table([foundCol]);

            // Buscar organização desta coluna
            const allOrgs = await sql`SELECT * FROM organizations`;
            const parentOrg = allOrgs.find(o => o.id === foundCol.organization_id);

            console.log('\n🏢 Pertence à Organização:');
            console.table(parentOrg ? [parentOrg] : []);
            return;
        }

        console.log('\n❌ ID não encontrado nas tabelas organizations ou columns.');

    } catch (error) {
        console.error('Erro ao acessar o banco:', error);
    }
}

lookupId();
