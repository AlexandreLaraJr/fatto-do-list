-- CreateTable
CREATE TABLE "Tarefa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "custo" DOUBLE PRECISION,
    "data_limite" TIMESTAMP(3) NOT NULL,
    "ordem_apresentacao" INTEGER NOT NULL,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tarefa_nome_key" ON "Tarefa"("nome");
