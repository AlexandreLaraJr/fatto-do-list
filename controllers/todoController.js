

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
