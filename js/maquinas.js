const API_BASE = "https://easy-soc-backend.onrender.com/api";
const TOKEN = localStorage.getItem("token");
const CLIENTE = localStorage.getItem("cliente");

if (!TOKEN || !CLIENTE) window.location.href = "index.html";

let maquinas = [];

// Carregar dados do backend
async function carregarMaquinas() {
  try {
    const res = await fetch(`${API_BASE}/resumo/${CLIENTE}`, {
      headers: {
        "Authorization": "Bearer " + TOKEN
      }
    });

    const data = await res.json();
    maquinas = data.detalhes.maquinas;

    preencherTabela(maquinas);

  } catch (err) {
    console.error("Erro ao carregar máquinas:", err);
  }
}

function preencherTabela(lista) {
  const tbody = document.getElementById("tabela-maquinas");
  tbody.innerHTML = "";

  lista.forEach(m => {
    const tr = document.createElement("tr");

    const statusClass =
      m.status === "segura" ? "status-ok" :
      m.status === "risco" ? "status-risk" :
      "status-vuln";

    tr.innerHTML = `
      <td>${m.nome}</td>
      <td>${m.usuario}</td>
      <td class="${statusClass}">${m.status.toUpperCase()}</td>
      <td>${m.vulnerabilidades}</td>
      <td><button onclick='abrirModal(${JSON.stringify(m)})'>Ver</button></td>
    `;

    tbody.appendChild(tr);
  });
}

// Busca
document.getElementById("busca").addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();
  const filtradas = maquinas.filter(m =>
    m.nome.toLowerCase().includes(texto) ||
    m.usuario.toLowerCase().includes(texto)
  );
  preencherTabela(filtradas);
});

// Filtros
document.getElementById("filtro").addEventListener("change", e => {
  const filtro = e.target.value;

  if (filtro === "todas") {
    preencherTabela(maquinas);
    return;
  }

  const filtradas = maquinas.filter(m => m.status === filtro);
  preencherTabela(filtradas);
});

// Modal
function abrirModal(m) {
  document.getElementById("modal-bg").style.display = "flex";

  document.getElementById("modal-conteudo").innerHTML = `
    <p><b>Nome:</b> ${m.nome}</p>
    <p><b>Usuário:</b> ${m.usuario}</p>
    <p><b>Status:</b> ${m.status}</p>
    <p><b>Vulnerabilidades:</b> ${m.vulnerabilidades}</p>
    <p><b>Sistema Operacional:</b> ${m.so}</p>
    <p><b>IP:</b> ${m.ip}</p>
    <p><b>Última atualização:</b> ${m.atualizado}</p>
  `;
}

function fecharModal() {
  document.getElementById("modal-bg").style.display = "none";
}

carregarMaquinas();
