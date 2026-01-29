const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const sequelize = require("./config/database");
const rotasTarefas = require("./routes/tarefaRoutes");
const errorHandler = require("./middlewares/errorMiddleware");

dotenv.config();

const app = express();


app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());


app.get("/", (req, res) => {
  res.send("API To-Do List rodando ✅");
});


app.use(rotasTarefas);

app.use(errorHandler);

sequelize.sync()
  .then(() => {
    console.log("Banco de dados conectado!");
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch(err => {
    console.error("Erro ao conectar ao banco:", err);
  });
