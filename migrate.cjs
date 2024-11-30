const { Client } = require('pg');
const fs = require('fs');

// Configuração da conexão com o banco de dados
const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '90903818',
    database: process.env.DB_DATABASE || 'fatto_do_list',
});

// Função para rodar o arquivo SQL de migração
async function runMigrations() {
    try {
        // Conectar ao banco de dados
        await client.connect();
        console.log('Conectado ao banco de dados PostgreSQL.');

        // Ler e executar o arquivo de migração
        const migrationSQL = fs.readFileSync('./migrate.sql', 'utf8');
        await client.query(migrationSQL);
        console.log('Migrações aplicadas com sucesso!');
    } catch (err) {
        console.error('Erro ao executar as migrações:', err);
    } finally {
        // Fechar a conexão
        await client.end();
    }
}

runMigrations();
