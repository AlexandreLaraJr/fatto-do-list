import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>
                <h1 className="text-white my-12">Fatto do list</h1>
                <input className="m-2 p-1 rounded-lg" type="text" />
                <button className="text-white m-2 p-1 rounded-lg border-2 border-red-50 hover:bg-white hover:text-gray-700">
                    Adicionar
                </button>
            </div>
            <div>{/* fetch com o bdd para puxar as tarefas salvas */}</div>
        </>
    );
}

export default App;
