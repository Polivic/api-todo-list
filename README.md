# 📋 Organizador de Tarefas (To-Do List)

Este projeto é um **Organizador de Tarefas (To-Do List)** desenvolvido como parte dos **Módulos 2 e 3** do curso **Programadores do Amanhã**, com o objetivo de aplicar na prática conceitos de **desenvolvimento Full Stack**.

O sistema permite criar, gerenciar e organizar tarefas por meio de uma **API REST** integrada a uma **interface web responsiva**, simulando um cenário real de desenvolvimento utilizado no mercado.

---

## 🚀 Funcionalidades

- Criar novas tarefas com título e descrição  
- Listar todas as tarefas cadastradas  
- Editar tarefas existentes  
- Excluir tarefas  
- Atualizar status das tarefas:
  - A fazer  
  - Em andamento  
  - Concluída  
- Interface intuitiva e responsiva  

---

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js  
- Express  
- Sequelize  
- SQLite  

### Frontend
- HTML5 semântico  
- CSS (Flexbox e layout responsivo)  
- JavaScript  
- Fetch API  

### Outras ferramentas
- Git e GitHub  
- Render (deploy da API)  
- Vercel (deploy do frontend)  

---

## 🌐 Deploy do Projeto

- **Frontend (Vercel):**  
  https://api-todo-list-tau.vercel.app  

- **API (Render):**  
  https://api-todo-list-rhuw.onrender.com  

- **Health Check da API:**  
  https://api-todo-list-rhuw.onrender.com/health  

---

## 📁 Estrutura do Projeto

api-to-do-list/
│
├── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── config/
│ └── server.js
│
├── docs/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
├── package.json
├── README.md
└── database.sqlite


---

## ▶️ Como Executar o Projeto Localmente

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/Polivic/api-todo-list.git
cd api-todo-list
2️⃣ Instalar as dependências
npm install
3️⃣ Iniciar o servidor
node src/server.js
A API estará disponível em:

http://localhost:3000
📚 Principais Aprendizados
Construção de APIs REST do zero

Integração entre Frontend e Backend utilizando Fetch API

Organização de rotas, controllers e banco de dados

Versionamento de código com Git e GitHub

Debug e resolução de erros em projetos reais

Importância de planejar a estrutura antes do deploy

👩‍💻 Autora
Projeto desenvolvido por Poliana Leandro
Curso Programadores do Amanhã

🚀 Seguimos evoluindo, aprendendo e encarando novos desafios!
