// js/riscos.js

const API_BASE = "https://easy-soc-backend.onrender.com/api";

// 🔐 Verifica token
if (!localStorage.getItem("token")) {
  window.location.href = "index.html";
}

/* ============================================================
   📥 Carregar riscos da API
   ============================================================ */
async function carregarRiscos() {
  const tabela = document.getElementById("tbody-riscos");
  const loading = document.getElementById("loading");
  const titulo = document.getElementById("titulo-riscos");

  try {
    loading.innerText = "Carregando riscos...";
    tabela.innerHTML = "";

    const response = await fetch(`${API_BASE}/riscos`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar riscos");
    }

    const data = await response.json();
    const lista = data.riscos || [];

    titulo.innerText = `Riscos encontrados: ${lista.length}`;
    loading.style.display = "none";

    if (lista.length === 0) {
      tabela.innerHTML = `<tr><td colspan="5">Nenhum risco encontrado.</td></tr>`;
      return;
    }

    lista.forEach(r => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${r.Risco || "-"}</td>
        <td>${r.Máquina || "-"}</td>
        <td>${r.Nível || "-"}</td>
        <td>${r.Descrição || "-"}</td>
        <td>${r.Detalhes || "-"}</td>
      `;
      tabela.appendChild(tr);
    });

  } catch (err) {
    console.error("Erro ao carregar riscos:", err);
    loading.innerText = "Erro ao carregar riscos.";
  }
}

// 🚀 Executa ao abrir a página
carregarRiscos();
