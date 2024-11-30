CREATE TABLE IF NOT EXISTS tarefas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL,
    custo DECIMAL(10,2),
    data_limite DATE NOT NULL,
    ordem_apresentacao INT NOT NULL
);

