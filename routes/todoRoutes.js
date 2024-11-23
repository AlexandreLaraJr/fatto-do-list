import express from "express";
import { createDB, createTable, createList, showTarefas, showUmaTarefa, updateTarefa, deleteTarefa } from "../controllers/todoController.js";

const router = express.Router();

router.get("/create/database", createDB);
router.get('/create/table', createTable)
router.post('/create/list', createList)
router.get('/show/tarefas', showTarefas)
router.get('/show/:id', showUmaTarefa)
router.put('/update/tarefa/:id', updateTarefa)
router.delete('/delete/tarefa/:id', deleteTarefa)


export default router;
