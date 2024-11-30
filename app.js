// import express from 'express';
// const app = express();
// import morgan from 'morgan'
// import bodyParser from 'body-parser';
// import cors from 'cors'

// import todos from './routes/todoRoutes.js'


// //configuração middleware
// app.use(morgan("dev"));
// app.use(bodyParser.json({ limit: "5mb" }));
// app.use(
//     bodyParser.urlencoded({
//         limit: "5mb",
//         extended: true,
//     })
// );
// app.use(cors());

// //rota do middleware

// app.use('/api', todos)


// const port = 8000;
// app.listen(port, () => {
//     console.log(`Conectado na port: ${port}`);
// });
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import todos from "./routes/todoRoutes.js";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cors());

// Rotas
app.use("/api", todos);

// Inicia o servidor
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
