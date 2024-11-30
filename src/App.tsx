import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoTarefas from "./components/TodoTarefas";
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
    const [ordem_apresentacao, setOrdem_apresentacao] = useState(0);
    const [nome, setNome] = useState("");
    const [custo, setCusto] = useState(0);
    const [dataLimite, setDataLimite] = useState<string>("");
    const [editarTarefa, setEditarTarefa] = useState(false);
    const [dataTarefas, setDataTarefas] = useState<Tarefa[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const API_URL = process.env.REACT_APP_API_URL;
    // const API_URL = "https://fatto-do-list.netlify.app";
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
            await axios.put(`${API_URL}/update/tarefa/${tarefa.id}`, {
                nome: tarefa.nome,
                custo: tarefa.custo ?? 0,
                data_limite: data_limite,
                ordem_apresentacao: tarefa.ordem_apresentacao,
            });
        } catch (error) {
            console.error("Erro ao atualizar ordem:", error);
        }
    };

    //get de todas tarefas

    const showTarefas = async () => {
        try {
            const response = await axios.get(`${API_URL}/show/tarefas`);
            const data = response.data;
            setDataTarefas(data);
        } catch (error) {
            console.log(error);
        }
    };

    //adicionar tarefa

    const addTarefa = async (e: { preventDefault: () => void }) => {
        console.log("api url", process.env.REACT_APP_API_URL);
        e.preventDefault();
        setOrdem_apresentacao(dataTarefas.length + 1);
        const data_limite = dataLimite;

        if (checkNomeExistente(nome)) {
            alert("Já existe uma tarefa com esse nome!");
            return;
        }
        try {
            if (checkCusto()) {
                const add = await axios.post(`${API_URL}/create/list`, {
                    nome,
                    custo,
                    data_limite,
                    ordem_apresentacao,
                });
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
                    `${API_URL}/delete/tarefa/${id}`
                );
                if (deleteTarefa.status === 200) {
                    showTarefas();
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Exclusão cancelada");
        }
    };

    //mostrar uma tarefa(seleciona a tarefa para a edição)

    const mostrarTarefa = async (id: any) => {
        setEditarTarefa(!editarTarefa);
        setSelectedId(id);
        try {
            const response = await axios.get(`${API_URL}/show/${id}`);
            const editTarefa = response.data;
            setNome(editTarefa.nome);
            setCusto(editTarefa.custo);
            const formattedDate = new Date(editTarefa.data_limite)
                .toISOString()
                .split("T")[0];
            setDataLimite(formattedDate);
            setOrdem_apresentacao(editTarefa.ordem_apresentacao);
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
        console.log(dataTarefas);

        try {
            const edit = await axios.put(
                `${API_URL}/update/tarefa/${selectedId}`,
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
                setDataLimite(dataLimite || "");
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

    return (
        <>
            <main>
                <h1 className="text-white text-5xl font-bold my-12">
                    Fatto do list
                </h1>
                <TodoForm
                    nome={nome}
                    custo={custo}
                    dataLimite={dataLimite}
                    setNome={setNome}
                    setCusto={setCusto}
                    setDataLimite={setDataLimite}
                    editarTarefa={editarTarefa}
                    onSubmit={editarTarefa ? editTarefa : addTarefa}
                />
                <section>
                    <article className="flex flex-col gap-4">
                        <TodoTarefas
                            dataTarefas={dataTarefas}
                            deleteTarefa={deleteTarefa}
                            mostrarTarefa={mostrarTarefa}
                            moveUp={moveUp}
                            moveDown={moveDown}
                        />
                    </article>
                </section>
            </main>
        </>
    );
}

export default App;
