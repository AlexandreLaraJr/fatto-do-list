// import pkg from "pg";
// const { Pool } = pkg;

// const db = new Pool({
//     host: "localhost",
//     user: "postgres",
//     password: "90903818",
//     database: "fatto_do_list",
//     port: 5432,
// });

// // Teste a conexão
// db.connect()
//     .then(() => console.log("PostgreSQL conectado"))
//     .catch((err) => console.error("Erro ao conectar no PostgreSQL:", err));

// export default db;

import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

// Carrega variáveis de ambiente
dotenv.config();

// Cria o pool de conexões
const db = new Pool({
    connectionString: process.env.DATABASE_URL, // URL do Neon
    ssl: {
        rejectUnauthorized: false, // Necessário para o Neon
    },
});

// Teste a conexão
db.connect()
    .then(() => console.log("PostgreSQL conectado!"))
    .catch((err) => console.error("Erro ao conectar no PostgreSQL:", err));

export default db;
