const express = require('express');
const dotenv = require('dotenv');
console.log("Porta configurada no .env:", process.env.PORT);
const sequelize = require('./config/database');
const rotasTarefas = require('./routes/tarefaRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

dotenv.config();

const app = express();

app.use(express.json());

app.use(rotasTarefas);

app.use(errorHandler);

sequelize.sync().then(() => {
  console.log('Banco de dados conectado!');

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });

}).catch(err => {
  console.error('Erro ao conectar ao banco:', err);
});
