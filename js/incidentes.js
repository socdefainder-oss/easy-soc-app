// js/incidentes.js

const API_BASE = "https://easy-soc-backend.onrender.com/api";

// 🔐 Verifica token
if (!localStorage.getItem("token")) {
  window.location.href = "index.html";
}

/* ============================================================
   📥 Carregar incidentes da API
   ============================================================ */
async function carregarIncidentes() {
  const tabela = document.getElementById("tbody-incidentes");
  const loading = document.getElementById("loading");
  const titulo = document.getElementById("titulo-incidentes");

  try {
    loading.innerText = "Carregando incidentes...";
    tabela.innerHTML = "";

    const response = await fetch(`${API_BASE}/incidentes`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar incidentes");
    }

    const data = await response.json();
    const lista = data.incidentes || [];

    titulo.innerText = `Incidentes encontrados: ${lista.length}`;
    loading.style.display = "none";

    if (lista.length === 0) {
      tabela.innerHTML = `<tr><td colspan="6">Nenhum incidente encontrado.</td></tr>`;
      return;
    }

    lista.forEach(inc => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${inc.ID || "-"}</td>
        <td>${inc.Máquina || "-"}</td>
        <td>${inc.Tipo || "-"}</td>
        <td>${inc.Status || "-"}</td>
        <td>${inc.Data || "-"}</td>
        <td>${inc.Detalhes || "-"}</td>
      `;
      tabela.appendChild(tr);
    });

  } catch (err) {
    console.error("Erro ao carregar incidentes:", err);
    loading.innerText = "Erro ao carregar incidentes.";
  }
}

// 🚀 Executa ao abrir a página
carregarIncidentes();
