# 🧠 API To-Do List

Este projeto é uma API REST simples para gerenciamento de tarefas (To-Do List), desenvolvida com **Node.js**, **Express** e **Sequelize**, utilizando **SQLite** como banco de dados.

---

## 🚀 Funcionalidades

- Criar uma nova tarefa (**POST /tarefas**)
- Listar todas as tarefas (**GET /tarefas**)
- Buscar uma tarefa por ID (**GET /tarefas/:id**)
- Atualizar completamente uma tarefa (**PUT /tarefas/:id**)
- Atualizar apenas o status (**PATCH /tarefas/:id/status**)
- Excluir uma tarefa (**DELETE /tarefas/:id**)

---

## 🧩 Estrutura do Projeto

src/
├── config/ → conexão com o banco de dados
├── controllers/ → lógica das rotas
├── middlewares/ → tratamento de erros
├── models/ → modelos das tabelas (ORM)
├── routes/ → rotas da aplicação
└── server.js → inicializa o servidor


---

## ⚙️ Tecnologias Utilizadas

- Node.js
- Express
- Sequelize
- SQLite
- Nodemon
- Dotenv

---

## ▶️ Como Executar

1. Instale as dependências:
npm install

2. Inicie o servidor:
npm run dev
3. Teste no Postman usando:
http://localhost:3000/tarefas

---

💛 **Desenvolvido por:** Natalia Leandro  
📅 **Data:** Novembro de 2025  
🎓 **Atividade:** API To-Do List (Desenvolvimento Web)
