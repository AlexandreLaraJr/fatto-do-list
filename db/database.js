import mysql from "mysql";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "90903818",
    database: "fatto_do_list",
    port: 3306,
});

// open the MySQL connection
db.connect((error) => {
    if (error) throw error;
    console.log("DB connected");
});

export default db;
