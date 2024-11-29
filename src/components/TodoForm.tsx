import React from "react";

interface TodoFormProps {
    nome: string;
    custo: number;
    dataLimite: string;
    setNome: (value: string) => void;
    setCusto: (value: number) => void;
    setDataLimite: (value: string) => void;
    editarTarefa: boolean;
    onSubmit: (e: React.FormEvent) => void;
}

const TarefaForm: React.FC<TodoFormProps> = ({
    nome,
    custo,
    dataLimite,
    setNome,
    setCusto,
    setDataLimite,
    editarTarefa,
    onSubmit,
}) => (
    <form onSubmit={onSubmit} className="mb-6">
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
            className={`text-white w-24 m-2 p-1 rounded-lg border-2 border-red-50 hover:bg-white hover:text-gray-700 ${
                editarTarefa ? "bg-green-500" : "bg-transparent"
            }`}
        >
            {editarTarefa ? "Salvar" : "Adicionar"}
        </button>
    </form>
);

export default TarefaForm;
