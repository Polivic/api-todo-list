const API_URL = "http://localhost:3000/tarefas";

const form = document.getElementById("formTarefa");
const inputTitulo = document.getElementById("titulo");
const inputDescricao = document.getElementById("descricao");
const lista = document.getElementById("lista");
const msg = document.getElementById("msg");
const busca = document.getElementById("busca");
const filtroStatus = document.getElementById("filtroStatus");

let tarefasCache = [];

async function safeJson(res) {
  const text = await res.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { return null; }
}

function mostrarMensagem(texto, tipo = "ok") {
  msg.textContent = texto;
  msg.className = `msg ${tipo}`;
}

function normalizar(str) {
  return (str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function renderizar(tarefas) {
  lista.innerHTML = "";

  if (!tarefas.length) {
    lista.innerHTML = "<p>Nenhuma tarefa encontrada.</p>";
    return;
  }

  tarefas.forEach(tarefa => {
    const item = document.createElement("article");
    item.className = "item";
    item.dataset.id = tarefa.id;

    item.innerHTML = `
      <div class="item-top">
        <div>
          <h3>${tarefa.titulo}</h3>
          <p>${tarefa.descricao || ""}</p>
        </div>
        <span class="badge ${tarefa.status.replace(" ", "-")}">${tarefa.status}</span>
      </div>

      <div class="actions">
        <div class="left-actions">
          <label class="chk-wrap">
            <input type="checkbox" class="chk-status" ${tarefa.status === "concluída" ? "checked" : ""}>
            Concluída
          </label>

          <select class="status-select">
            <option ${tarefa.status==="a fazer"?"selected":""}>a fazer</option>
            <option ${tarefa.status==="em andamento"?"selected":""}>em andamento</option>
            <option ${tarefa.status==="concluída"?"selected":""}>concluída</option>
          </select>
        </div>

        <div class="right-actions">
          <button class="btn ghost btn-edit">Editar</button>
          <button class="btn danger btn-delete">Deletar</button>
        </div>
      </div>

      <div class="editor hidden">
        <input class="edit-titulo" value="${tarefa.titulo}">
        <input class="edit-descricao" value="${tarefa.descricao || ""}">
        <div class="right-actions">
          <button class="btn primary btn-save">Salvar</button>
          <button class="btn ghost btn-cancel">Cancelar</button>
        </div>
      </div>
    `;

    lista.appendChild(item);
  });
}

function aplicarFiltros() {
  const q = normalizar(busca.value);
  const status = filtroStatus.value;

  let filtradas = tarefasCache;

  if (status !== "todos") {
    filtradas = filtradas.filter(t => t.status === status);
  }

  if (q) {
    filtradas = filtradas.filter(t =>
      normalizar(t.titulo).includes(q) ||
      normalizar(t.descricao).includes(q)
    );
  }

  renderizar(filtradas);
}

async function carregarTarefas() {
  const res = await fetch(API_URL);
  tarefasCache = await res.json();
  aplicarFiltros();
}

form.addEventListener("submit", async e => {
  e.preventDefault();

  const titulo = inputTitulo.value.trim();
  const descricao = inputDescricao.value.trim();

  if (!titulo) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, descricao })
  });

  form.reset();
  carregarTarefas();
});

lista.addEventListener("click", async e => {
  const item = e.target.closest(".item");
  if (!item) return;

  const id = item.dataset.id;

  if (e.target.classList.contains("btn-delete")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    carregarTarefas();
  }

  if (e.target.classList.contains("btn-edit")) {
    item.querySelector(".editor").classList.remove("hidden");
  }

  if (e.target.classList.contains("btn-cancel")) {
    item.querySelector(".editor").classList.add("hidden");
  }

  if (e.target.classList.contains("btn-save")) {
    const titulo = item.querySelector(".edit-titulo").value;
    const descricao = item.querySelector(".edit-descricao").value;

    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, descricao })
    });

    carregarTarefas();
  }
});

lista.addEventListener("change", async e => {
  const item = e.target.closest(".item");
  if (!item) return;

  const id = item.dataset.id;

  if (e.target.classList.contains("chk-status")) {
    const status = e.target.checked ? "concluída" : "a fazer";
    await fetch(`${API_URL}/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    carregarTarefas();
  }

  if (e.target.classList.contains("status-select")) {
    await fetch(`${API_URL}/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: e.target.value })
    });
    carregarTarefas();
  }
});

busca.addEventListener("input", aplicarFiltros);
filtroStatus.addEventListener("change", aplicarFiltros);

carregarTarefas();
