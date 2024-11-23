import { useEffect, useState } from "react";

import "./App.css";

function App() {
    return (
        <>
            <main>
                <h1 className="text-white my-12">Fatto do list</h1>

                <form>
                    <input
                        id="nome"
                        name="nome"
                        className="m-2 p-1 rounded-lg"
                        type="text"
                        placeholder="Nome da tarefa"
                    />
                    <input
                        id="custo"
                        name="custo"
                        className="m-2 p-1 rounded-lg"
                        type="number"
                        placeholder="Custo (R$)"
                    />
                    <input
                        id="data"
                        name="data"
                        className="m-2 p-1 rounded-lg"
                        type="date"
                        placeholder="Data Limite"
                    />
                    <button
                        type="submit"
                        className="text-white m-2 p-1 rounded-lg border-2 border-red-50 hover:bg-white hover:text-gray-700"
                    >
                        Adicionar
                    </button>
                </form>
                <div className="bg-slate-400 flex flex-row">
                    <div className="bg-slate-800 w-48 h-24 flex flex-col gap-2">
                        <p className="text-white border-2 border-white rounded-lg">
                            NomeDaTarefa
                        </p>
                        <p className="text-white border-2 border-white rounded-lg">
                            Custo
                        </p>
                        <p className="text-white border-2 border-white rounded-lg">
                            DATA
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <a className="h-8 w-24 bg-green-500 border-2 border-green-300 rounded-lg">
                            editar
                        </a>
                        <a className="h-12 w-12 bg-red-500 border-2 border-red-300 rounded-lg">
                            excluir
                        </a>
                    </div>
                </div>
            </main>
        </>
    );
}

export default App;
