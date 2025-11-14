// js/vulnerabilidades.js

const API_BASE = "https://easy-soc-backend.onrender.com/api";

// 🔐 Verifica token
if (!localStorage.getItem("token")) {
  window.location.href = "index.html";
}

/* ============================================================
   📥 Carregar vulnerabilidades da API
   ============================================================ */
async function carregarVulnerabilidades() {
  const tabela = document.getElementById("tbody-vulnerabilidades");
  const loading = document.getElementById("loading");
  const titulo = document.getElementById("titulo-vuln");

  try {
    loading.innerText = "Carregando vulnerabilidades...";
    tabela.innerHTML = "";

    const response = await fetch(`${API_BASE}/vulnerabilidades`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar vulnerabilidades");
    }

    const data = await response.json();
    const lista = data.vulnerabilidades || [];

    titulo.innerText = `Vulnerabilidades encontradas: ${lista.length}`;
    loading.style.display = "none";

    if (lista.length === 0) {
      tabela.innerHTML = `<tr><td colspan="5">Nenhuma vulnerabilidade encontrada.</td></tr>`;
      return;
    }

    lista.forEach(v => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${v.CVE || "-"}</td>
        <td>${v.Máquina || "-"}</td>
        <td>${v.Severidade || "-"}</td>
        <td>${v.Descrição || "-"}</td>
        <td>${v.Detalhes || "-"}</td>
      `;
      tabela.appendChild(tr);
    });

  } catch (err) {
    console.error("Erro ao carregar vulnerabilidades:", err);
    loading.innerText = "Erro ao carregar vulnerabilidades.";
  }
}

// 🚀 Executa ao abrir a página
carregarVulnerabilidades();
