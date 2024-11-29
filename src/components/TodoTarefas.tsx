import React from "react";
import arrowUp from "../assets/arrow-up.svg";
import arrowDown from "../assets/arrow-down.svg";
import edit from "../assets/edit.svg";
import trash from "../assets/trash.svg";
import { format } from "date-fns";

interface Tarefa {
    id: number;
    nome: string;
    custo: number;
    data_limite: string;
    ordem_apresentacao: number;
}

interface TodoTarefasProps {
    dataTarefas: Tarefa[];
    deleteTarefa: (id: number) => void;
    mostrarTarefa: (id: number) => void;
    moveUp: (id: number) => void;
    moveDown: (id: number) => void;
}

const TarefaList: React.FC<TodoTarefasProps> = ({
    dataTarefas,
    deleteTarefa,
    mostrarTarefa,
    moveUp,
    moveDown,
}) => (
    <>
        {dataTarefas.length > 0 ? (
            dataTarefas
                .sort((a, b) => a.ordem_apresentacao - b.ordem_apresentacao)
                .map((tarefa) => (
                    <div
                        key={tarefa.id}
                        className="flex flex-row justify-center w-auto mb-4"
                    >
                        <div className="w-auto h-24 flex flex-row gap-2">
                            <div className="flex flex-col h-24 relative border-2 border-white rounded-lg">
                                <p className="text-white border-white rounded-lg w-10 flex justify-center items-center text-center absolute top-0 left-0">
                                    {`ID: ${tarefa.id}\n`}
                                </p>
                                <p className="text-white w-96 h-24 flex justify-center items-center text-center mt-6">
                                    {tarefa.nome}
                                </p>
                            </div>
                            <div className="flex flex-col justify-around gap-2">
                                <p
                                    className={`text-white border-2 border-white rounded-lg w-40 h-12 py-2 text-center ${
                                        tarefa.custo >= 1000
                                            ? "bg-yellow-400 text-black"
                                            : "bg-transparent"
                                    }`}
                                >
                                    {`R$ ${tarefa.custo}`}
                                </p>
                                <p className="text-white border-2 border-white rounded-lg w-40 h-12 py-2 text-center">
                                    {format(
                                        new Date(tarefa.data_limite),
                                        "dd/MM/yyyy"
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="my-auto px-4 flex flex-row gap-2">
                                <a
                                    onClick={() => mostrarTarefa(tarefa.id)}
                                    className="h-12 w-12 p-1 hover:p-2 bg-green-500 border-2 border-green-300 rounded-lg hover:cursor-pointer hover:bg-green-300"
                                >
                                    <img src={edit} alt="Editar tarefa." />
                                </a>
                                <a
                                    onClick={() => deleteTarefa(tarefa.id)}
                                    className="h-12 w-12 p-1 hover:p-2 bg-red-500 border-2 border-red-300 rounded-lg hover:cursor-pointer hover:bg-red-300"
                                >
                                    <img src={trash} alt="Excluir tarefa." />
                                </a>
                            </div>
                            <div className="flex flex-col gap-2 my-auto">
                                <a
                                    onClick={() => moveUp(tarefa.id)}
                                    className="h-8 w-8 p-1 hover:p-1.5 rounded-xl bg-orange-400 border-2 border-orange-200 hover:cursor-pointer hover:bg-orange-200"
                                >
                                    <img
                                        src={arrowUp}
                                        alt="Mover a tarefa para cima."
                                    />
                                </a>
                                <a
                                    onClick={() => moveDown(tarefa.id)}
                                    className="h-8 w-8 p-1 hover:p-1.5 rounded-xl bg-orange-400 border-2 border-orange-200 hover:cursor-pointer hover:bg-orange-200"
                                >
                                    <img
                                        src={arrowDown}
                                        alt="Mover a tarefa para baixo."
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                ))
        ) : (
            <p className="text-white font-bold">
                Você não possui nenhuma tarefa!
            </p>
        )}
    </>
);

export default TarefaList;
