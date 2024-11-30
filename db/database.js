import pkg from "pg";
const { Pool } = pkg;

const db = new Pool({
    // host: "localhost",
    // user: "postgres",
    // password: "90903818",
    // database: "fatto_do_list",
    // port: 5432,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
    ssl: {
        rejectUnauthorized: true,
    },
});

// Teste a conexão
db.connect()
    .then(() => console.log("PostgreSQL conectado"))
    .catch((err) => console.error("Erro ao conectar no PostgreSQL:", err));

export default db;