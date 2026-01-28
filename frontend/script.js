const API_URL = "http://localhost:3000/tarefas";

const form = document.getElementById("formTarefa");
const inputTitulo = document.getElementById("titulo");
const inputDescricao = document.getElementById("descricao");
const lista = document.getElementById("lista");
const msg = document.getElementById("msg");


async function safeJson(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function mostrarMensagem(texto, tipo = "ok") {
  msg.textContent = texto;
  msg.className = `msg ${tipo}`;
}

async function carregarTarefas() {
  try {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
      throw new Error("Falha ao buscar tarefas");
    }

    const tarefas = await resposta.json();

    lista.innerHTML = "";

    if (!tarefas || tarefas.length === 0) {
      lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
      return;
    }

    tarefas.forEach((tarefa) => {
      const card = document.createElement("article");
      card.className = "item"; // combina com seu CSS (item)

      const concluida = tarefa.status === "concluída";

      card.innerHTML = `
        <div class="item-top">
          <div>
            <h3>${tarefa.titulo}</h3>
            <p>${tarefa.descricao || ""}</p>
          </div>

          <span class="badge">
            ${tarefa.status}
          </span>
        </div>

        <div class="actions">
          <label style="display:flex; gap:8px; align-items:center;">
            <input type="checkbox" class="chk-status" data-id="${tarefa.id}" ${concluida ? "checked" : ""} />
            Concluída
          </label>

          <button class="btn-delete" data-id="${tarefa.id}">
            Deletar
          </button>
        </div>
      `;

      lista.appendChild(card);
    });
  } catch (erro) {
    lista.innerHTML = "<p>Não consegui conectar na API. Ela está ligada?</p>";
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = inputTitulo.value.trim();
  const descricao = inputDescricao.value.trim();

  if (!titulo) {
    mostrarMensagem("O título é obrigatório.", "erro");
    return;
  }

  try {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, descricao }),
    });

    const dados = await safeJson(resposta);

    if (!resposta.ok) {
      mostrarMensagem(dados?.erro || "Erro ao criar tarefa.", "erro");
      return;
    }

    mostrarMensagem("Tarefa criada com sucesso!", "ok");
    form.reset();
    carregarTarefas();
  } catch (erro) {
    mostrarMensagem("Erro de conexão com a API.", "erro");
  }
});


lista.addEventListener("click", async (e) => {
  const botaoDelete = e.target.closest(".btn-delete");

  if (botaoDelete) {
    const id = botaoDelete.dataset.id;

    try {
      const resposta = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      
      const dados = await safeJson(resposta);

      if (!resposta.ok) {
        alert(dados?.message || dados?.erro || "Erro ao deletar.");
        return;
      }

      carregarTarefas();
    } catch (erro) {
      alert("Erro de conexão com a API.");
    }
  }
});


lista.addEventListener("change", async (e) => {
  const chk = e.target.closest(".chk-status");
  if (!chk) return;

  const id = chk.dataset.id;
  const novoStatus = chk.checked ? "concluída" : "a fazer";

  try {
    // ✅ PUT (mais de acordo com o PDF)
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: novoStatus }),
    });

    const dados = await safeJson(resposta);

    if (!resposta.ok) {
      alert(dados?.erro || "Erro ao atualizar status.");
      carregarTarefas();
      return;
    }

    carregarTarefas();
  } catch (erro) {
    alert("Erro de conexão com a API.");
    carregarTarefas();
  }
});

carregarTarefas();
