import { useEffect, useState } from "react";
import arrowUp from "./assets/arrow-up.svg";
import arrowDown from "./assets/arrow-down.svg";
import edit from "./assets/edit.svg";
import trash from "./assets/trash.svg";
import { format } from "date-fns";

import "./App.css";
import axios from "axios";
interface Tarefa {
    id: number;
    nome: string;
    custo: number;
    data_limite: string;
    ordem_apresentacao: number;
}

function App() {
    const [dataTarefas, setDataTarefas] = useState<Tarefa[]>([]);
    const [nome, setNome] = useState<string>("");
    const [custo, setCusto] = useState<number>();
    const [dataLimite, setDataLimite] = useState<string>();
    const [editarTarefa, setEditarTarefa] = useState<Boolean>(false);
    const [ordem_apresentacao, setOrdem_apresentacao] = useState(0);

    const [selectedId, setSelectedId] = useState<number | null>(null);

    //conferir se o valor de 'custo' esta correto

    const checkCusto = () => {
        if (custo === null || custo === undefined) {
            setCusto(0);
            return false;
        } else {
            return true;
        }
    };

    //verifica se a tarefa ja existe

    const checkNomeExistente = (nomeTarefa: string) => {
        return dataTarefas.some((tarefa: any) => tarefa.nome === nomeTarefa);
    };

    const moveUp = async (id: number) => {
        const index = dataTarefas.findIndex((tarefa) => tarefa.id === id);

        if (index > 0) {
            const updatedDataTarefas = [...dataTarefas];

            // Captura da ordem das tarefas
            const ordemAtual = updatedDataTarefas[index].ordem_apresentacao;
            const ordemAnterior =
                updatedDataTarefas[index - 1].ordem_apresentacao;

            // Troca de ordens diretamente
            updatedDataTarefas[index].ordem_apresentacao = ordemAnterior;
            updatedDataTarefas[index - 1].ordem_apresentacao = ordemAtual;

            // Atualizar ordens no backend
            await updateOrdem(updatedDataTarefas[index]);
            await updateOrdem(updatedDataTarefas[index - 1]);
            setDataTarefas(updatedDataTarefas);
        }
    };

    // Atualiza a ordem das tarefas ao mover para baixo
    const moveDown = async (id: number) => {
        const index = dataTarefas.findIndex((tarefa) => tarefa.id === id);

        if (index < dataTarefas.length - 1) {
            const updatedDataTarefas = [...dataTarefas];

            // Captura da ordem das tarefas
            const ordemAtual = updatedDataTarefas[index].ordem_apresentacao;
            const ordemSeguindo =
                updatedDataTarefas[index + 1].ordem_apresentacao;

            // Trocar de lugar com a tarefa seguinte
            updatedDataTarefas[index].ordem_apresentacao = ordemSeguindo;
            updatedDataTarefas[index + 1].ordem_apresentacao = ordemAtual;

            // Atualizar as ordens no backend
            await updateOrdem(updatedDataTarefas[index]);
            await updateOrdem(updatedDataTarefas[index + 1]);
            setDataTarefas(updatedDataTarefas);
        }
    };

    // Função para atualizar a ordem no backend
    const updateOrdem = async (tarefa: Tarefa) => {
        const data_limite = tarefa.data_limite
            ? tarefa.data_limite.split("T")[0]
            : null;

        try {
            const response = await axios.put(
                `http://localhost:8000/api/update/tarefa/${tarefa.id}`,
                {
                    nome: tarefa.nome,
                    custo: tarefa.custo ?? 0,
                    data_limite: data_limite,
                    ordem_apresentacao: tarefa.ordem_apresentacao,
                }
            );
            console.log("Resposta da API:", response.data);
        } catch (error) {
            console.error("Erro ao atualizar ordem:", error);
        }
    };

    //get de todas tarefas

    const showTarefas = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/show/tarefas"
            );
            const data = response.data;
            setDataTarefas(data);
        } catch (error) {
            console.log(error);
        }
    };

    //adicionar tarefa

    const addTarefa = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setOrdem_apresentacao(dataTarefas.length + 1);
        const data_limite = dataLimite;

        if (checkNomeExistente(nome)) {
            alert("Já existe uma tarefa com esse nome!");
            return;
        }
        try {
            if (checkCusto()) {
                const add = await axios.post(
                    "http://localhost:8000/api/create/list",
                    {
                        nome,
                        custo,
                        data_limite,
                        ordem_apresentacao,
                    }
                );
                if (add.status === 200) {
                    setNome("");
                    setCusto(0);
                    showTarefas();
                }
            } else {
                console.log("Erro no custo!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    //deletar tarefa

    const deleteTarefa = async (id: any) => {
        // Exibe uma caixa de confirmação para o usuário
        const confirmDelete = window.confirm(
            "Você tem certeza que deseja excluir esta tarefa?"
        );

        if (confirmDelete) {
            try {
                const deleteTarefa = await axios.delete(
                    `http://localhost:8000/api/delete/tarefa/${id}`
                );
                if (deleteTarefa.status === 200) {
                    showTarefas();
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            // Se o usuário cancelar, apenas loga que a exclusão foi cancelada
            console.log("Exclusão cancelada");
        }
    };
    //mostrar uma tarefa(seleciona a tarefa para a edição)

    const mostrarTarefa = async (id: any) => {
        setEditarTarefa(!editarTarefa);
        setSelectedId(id);
        try {
            const response = await axios.get(
                `http://localhost:8000/api/show/${id}`
            );
            const editTarefa = response.data;
            setNome(editTarefa.nome);
            setCusto(editTarefa.custo);
            const formattedDate = new Date(editTarefa.data_limite)
                .toISOString()
                .split("T")[0];
            setDataLimite(formattedDate);
            // if (editTarefa.status === 200) {
            //     showTarefas();
            // }
        } catch (error) {
            console.log(error);
        }
    };

    //editar tarefa

    const editTarefa = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const data_limite = dataLimite;

        if (
            checkNomeExistente(nome) &&
            dataTarefas.find((tarefa: any) => tarefa.id !== selectedId)
                ?.nome === nome
        ) {
            alert("Já existe uma tarefa com esse nome!");
            return;
        }

        try {
            const edit = await axios.put(
                `http://localhost:8000/api/update/tarefa/${selectedId}`,
                {
                    nome,
                    custo,
                    data_limite,
                    ordem_apresentacao,
                }
            );
            if (edit.status === 200) {
                setEditarTarefa(false);
                setNome("");
                setCusto(0);
                setDataLimite(undefined);
                setSelectedId(null);
                showTarefas();
            }
        } catch (error) {
            console.error("Erro ao editar a tarefa:", error);
        }
    };

    useEffect(() => {
        showTarefas();
    }, []);

    // console.log(dataTarefas);

    return (
        <>
            <main>
                <h1 className="text-white text-5xl font-bold my-12">
                    Fatto do list
                </h1>

                <form
                    onSubmit={editarTarefa ? editTarefa : addTarefa}
                    className="mb-6"
                >
                    <input
                        id="nome"
                        name="nome"
                        className="m-2 p-1 rounded-lg"
                        type="text"
                        placeholder="Tarefa"
                        onChange={(e) => setNome(e.target.value)}
                        value={nome}
                    />
                    <input
                        id="custo"
                        name="custo"
                        className="m-2 p-1 rounded-lg"
                        type="number"
                        placeholder="Custo (R$)"
                        onChange={(e) => setCusto(parseFloat(e.target.value))}
                        value={custo}
                    />
                    <input
                        id="data"
                        name="data"
                        className="m-2 p-1 rounded-lg"
                        type="date"
                        placeholder="Data Limite"
                        onChange={(e) => setDataLimite(e.target.value)}
                        value={dataLimite}
                    />
                    <button
                        type="submit"
                        className="text-white w-24 m-2 p-1 rounded-lg border-2 border-red-50 hover:bg-white hover:text-gray-700"
                    >
                        {editarTarefa ? "Salvar" : "Adicionar"}
                    </button>
                </form>

                {dataTarefas.length > 0 ? (
                    dataTarefas
                        .sort(
                            (a, b) =>
                                a.ordem_apresentacao - b.ordem_apresentacao
                        )
                        .map((tarefa) => (
                            <div
                                key={tarefa.id}
                                className="flex flex-row justify-center w-auto mb-4"
                            >
                                <div className="w-auto h-24 flex flex-row gap-2">
                                    <div className="flex flex-col h-24 relative border-2 border-white rounded-lg">
                                        <p className="text-white  border-white rounded-lg w-10 flex justify-center items-center text-center absolute top-0 left-0">
                                            {`ID: ${tarefa.id}\n`}
                                        </p>
                                        <p className="text-white  w-96 h-24 flex justify-center items-center text-center mt-6">
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
                                            onClick={() =>
                                                mostrarTarefa(tarefa.id)
                                            }
                                            className="h-12 w-12 p-1 hover:p-2 bg-green-500 border-2 border-green-300 rounded-lg hover:cursor-pointer hover:bg-green-300"
                                        >
                                            <img
                                                src={edit}
                                                alt="Editar tarefa."
                                            />
                                        </a>
                                        <a
                                            onClick={() =>
                                                deleteTarefa(tarefa.id)
                                            }
                                            className="h-12 w-12 p-1 hover:p-2 bg-red-500 border-2 border-red-300 rounded-lg hover:cursor-pointer hover:bg-red-300"
                                        >
                                            <img
                                                src={trash}
                                                alt="Excluir tarefa."
                                            />
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
            </main>
        </>
    );
}

export default App;
