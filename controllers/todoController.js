import { response } from "express";
import db from "../db/database.js";

export const createDB = (req, response) => {
    let query = "CREATE DATABASE fatto_do_list";
    db.query(q, (err, result) => {
        if (err) throw err;
        return response.status(201).json({ message: "Banco de dados criado" });
    });
};


//criar tabela
export const createTable = (req, response) => {
    let query = "CREATE TABLE tarefas(id INT PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(100) UNIQUE NOT NULL, custo DECIMAL(10,2), data_limite DATE NOT NULL, ordem_apresentacao INT UNIQUE NOT NULL)"
    db.query(query, (err, result) => {
        if (err) throw err
        return response.status(201).json({ message: "Tabela criada!" })
    })
}

//criar lista

export const createList = (req, response) => {
    let query = "INSERT INTO tarefas SET ?"

    const { nome, custo, data_limite, ordem_apresentacao } = req.body

    db.query(query, { nome, custo, data_limite, ordem_apresentacao }, (err, result) => {
        if (err) return response.json(err);
        return response.status(200).json(result)
    })
}

//mostrar todas tarefas

export const showTarefas = (req, response) => {
    const query = "SELECT * FROM tarefas"

    db.query(query, (err, result) => {
        if (err) return response.json(err)
        return response.status(200).json(result)
    })
}

//mostra uma tarefa

export const showUmaTarefa = (req, response) => {
    const query = `SELECT * FROM tarefas WHERE id=${req.params.id}`

    db.query(query, (err, result) => {
        if (err) return response.json(err)
        return response.status(200).json(result[0])
    })
}

//atualizar tarefa

export const updateTarefa = (req, response) => {
    const { nome, custo, data_limite, ordem_apresentacao } = req.body

    const query = `UPDATE tarefas SET ? WHERE id=${req.params.id}`

    db.query(query, { nome, custo, data_limite, ordem_apresentacao }, (err, result) => {
        if (err) return response.json(err)
        return response.status(200).json(result)
    })
}

//deletar tarefa

export const deleteTarefa = (req, response) => {
    const query = `DELETE from tarefas WHERE id=${req.params.id}`

    db.query(query, (err, result) => {
        if (err) response.json(err)
        return response.status(200).json({ message: "Tarefa exluida!" })
    })
}