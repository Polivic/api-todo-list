const express = require('express');
const cors = require('cors');

const sequelize = require('./config/database');
const rotasTarefas = require('./routes/tarefaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/tarefas', rotasTarefas);

app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error('Falha ao iniciar API:', e);
    process.exit(1);
  }
})();
