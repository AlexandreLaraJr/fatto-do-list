// import { response } from "express";
// import db from "../db/database.js";

// export const createDB = (req, response) => {
//     let query = "CREATE DATABASE fatto_do_list";
//     db.query(q, (err, result) => {
//         if (err) throw err;
//         return response.status(201).json({ message: "Banco de dados criado" });
//     });
// };


// //criar tabela
// export const createTable = (req, response) => {
//     let query = "CREATE TABLE tarefas(id INT PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(100) UNIQUE NOT NULL, custo DECIMAL(10,2), data_limite DATE NOT NULL, ordem_apresentacao INT  NOT NULL)"
//     db.query(query, (err, result) => {
//         if (err) throw err
//         return response.status(201).json({ message: "Tabela criada!" })
//     })
// }

// //criar lista

// export const createList = (req, response) => {
//     let query = "INSERT INTO tarefas SET ?"

//     const { nome, custo, data_limite, ordem_apresentacao } = req.body

//     db.query(query, { nome, custo, data_limite, ordem_apresentacao }, (err, result) => {
//         if (err) return response.json(err);
//         return response.status(200).json(result)
//     })
// }

// //mostrar todas tarefas

// export const showTarefas = (req, response) => {
//     const query = "SELECT * FROM tarefas"

//     db.query(query, (err, result) => {
//         if (err) return response.json(err)
//         return response.status(200).json(result)
//     })
// }

// //mostra uma tarefa

// export const showUmaTarefa = (req, response) => {
//     const query = `SELECT * FROM tarefas WHERE id=${req.params.id}`

//     db.query(query, (err, result) => {
//         if (err) return response.json(err)
//         return response.status(200).json(result[0])
//     })
// }

// //atualizar tarefa

// export const updateTarefa = (req, response) => {
//     const { nome, custo, data_limite, ordem_apresentacao } = req.body
//     const query = `UPDATE tarefas SET ? WHERE id=${req.params.id}`

//     db.query(query, { nome, custo, data_limite, ordem_apresentacao }, (err, result) => {
//         if (err) return response.json(err)
//         return response.status(200).json(result)
//     })
// }

// //deletar tarefa

// export const deleteTarefa = (req, response) => {
//     const query = `DELETE from tarefas WHERE id=${req.params.id}`

//     db.query(query, (err, result) => {
//         if (err) response.json(err)
//         return response.status(200).json({ message: "Tarefa exluida!" })
//     })
// }

//-------------------------------------------------------

// import db from "../db/database.js";

// // Criar banco de dados (não necessário em PostgreSQL, mas para exemplo)
// export const createDB = (req, response) => {
//     const query = `CREATE DATABASE fatto_do_list`;
//     db.query(query, (err, result) => {
//         if (err) return response.json(err);
//         return response.status(201).json({ message: "Banco de dados criado" });
//     });
// };

// // Criar tabela
// export const createTable = (req, response) => {
//     const query = `
//         CREATE TABLE IF NOT EXISTS tarefas (
//             id SERIAL PRIMARY KEY,
//             nome VARCHAR(100) UNIQUE NOT NULL,
//             custo NUMERIC(10,2),
//             data_limite DATE NOT NULL,
//             ordem_apresentacao INT NOT NULL
//         )
//     `;
//     db.query(query, (err, result) => {
//         if (err) return response.json(err);
//         return response.status(201).json({ message: "Tabela criada!" });
//     });
// };

// // Criar lista
// export const createList = (req, response) => {
//     const query = `
//         INSERT INTO tarefas (nome, custo, data_limite, ordem_apresentacao)
//         VALUES ($1, $2, $3, $4)
//     `;
//     const { nome, custo, data_limite, ordem_apresentacao } = req.body;
//     const values = [nome, custo, data_limite, ordem_apresentacao];

//     db.query(query, values, (err, result) => {
//         if (err) return response.json(err);
//         return response.status(200).json(result);
//     });
// };

// // Mostrar todas as tarefas
// export const showTarefas = (req, response) => {
//     const query = `SELECT * FROM tarefas`;
//     db.query(query, (err, result) => {
//         if (err) return response.json(err);
//         return response.status(200).json(result.rows);
//     });
// };

// // Mostrar uma tarefa
// export const showUmaTarefa = (req, response) => {
//     const query = `SELECT * FROM tarefas WHERE id = $1`;
//     db.query(query, [req.params.id], (err, result) => {
//         if (err) return response.json(err);
//         return response.status(200).json(result.rows[0]);
//     });
// };

// // Atualizar tarefa
// export const updateTarefa = (req, response) => {
//     const { nome, custo, data_limite, ordem_apresentacao } = req.body;
//     const query = `
//         UPDATE tarefas
//         SET nome = $1, custo = $2, data_limite = $3, ordem_apresentacao = $4
//         WHERE id = $5
//     `;
//     const values = [nome, custo, data_limite, ordem_apresentacao, req.params.id];
//     db.query(query, values, (err, result) => {
//         if (err) return response.json(err);
//         return response.status(200).json(result);
//     });
// };

// // Deletar tarefa
// export const deleteTarefa = (req, response) => {
//     const query = `DELETE FROM tarefas WHERE id = $1`;
//     db.query(query, [req.params.id], (err, result) => {
//         if (err) return response.json(err);
//         return response.status(200).json({ message: "Tarefa excluída!" });
//     });
// };


import db from "../db/database.js";

// Criar tabela
export const createTable = async (req, response) => {
    const query = `
        CREATE TABLE IF NOT EXISTS tarefas (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(100) UNIQUE NOT NULL,
            custo NUMERIC(10,2),
            data_limite DATE NOT NULL,
            ordem_apresentacao INT NOT NULL
        )
    `;
    try {
        await db.query(query);
        response.status(201).json({ message: "Tabela criada!" });
    } catch (err) {
        response.status(500).json(err);
    }
};

// Criar lista
export const createList = async (req, response) => {
    const query = `
        INSERT INTO tarefas (nome, custo, data_limite, ordem_apresentacao)
        VALUES ($1, $2, $3, $4)
    `;
    const { nome, custo, data_limite, ordem_apresentacao } = req.body;
    const values = [nome, custo, data_limite, ordem_apresentacao];

    try {
        const result = await db.query(query, values);
        response.status(200).json(result);
    } catch (err) {
        response.status(500).json(err);
    }
};

// Mostrar todas as tarefas
export const showTarefas = async (req, response) => {
    const query = `SELECT * FROM tarefas`;
    try {
        const result = await db.query(query);
        response.status(200).json(result.rows);
    } catch (err) {
        response.status(500).json(err);
    }
};

// Mostrar uma tarefa
export const showUmaTarefa = async (req, response) => {
    const query = `SELECT * FROM tarefas WHERE id = $1`;
    try {
        const result = await db.query(query, [req.params.id]);
        response.status(200).json(result.rows[0]);
    } catch (err) {
        response.status(500).json(err);
    }
};

// Atualizar tarefa
export const updateTarefa = async (req, response) => {
    const { nome, custo, data_limite, ordem_apresentacao } = req.body;
    const query = `
        UPDATE tarefas
        SET nome = $1, custo = $2, data_limite = $3, ordem_apresentacao = $4
        WHERE id = $5
    `;
    const values = [nome, custo, data_limite, ordem_apresentacao, req.params.id];
    try {
        const result = await db.query(query, values);
        response.status(200).json(result);
    } catch (err) {
        response.status(500).json(err);
    }
};

// Deletar tarefa
export const deleteTarefa = async (req, response) => {
    const query = `DELETE FROM tarefas WHERE id = $1`;
    try {
        await db.query(query, [req.params.id]);
        response.status(200).json({ message: "Tarefa excluída!" });
    } catch (err) {
        response.status(500).json(err);
    }
};
