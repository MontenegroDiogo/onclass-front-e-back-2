document.addEventListener("DOMContentLoaded", () => {
  const tabelaBody = document.querySelector("#tabelaDisciplinas tbody");
  const modal = document.getElementById("modal");
  const btnAbrirModal = document.getElementById("abrirModal");
  const fecharModal = document.getElementById("fecharModal");
  const form = document.getElementById("formDisciplina");
  const tituloModal = document.getElementById("tituloModal");
  const nomeCursoSpan = document.getElementById("nomeCurso");

  // Pega o curso selecionado da URL
  const params = new URLSearchParams(window.location.search);
  const cursoSelecionado = params.get("curso") || "Curso não definido";
  nomeCursoSpan.textContent = cursoSelecionado;

  // Lista de disciplinas no localStorage
  let disciplinas = JSON.parse(localStorage.getItem("disciplinas")) || [];
  let editandoIndex = null;

  // --- Função para renderizar a tabela ---
  function atualizarTabela() {
    tabelaBody.innerHTML = "";

    const disciplinasFiltradas = disciplinas.filter(d => d.curso === cursoSelecionado);

    if (disciplinasFiltradas.length === 0) {
      tabelaBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; color:#777;">
            Nenhuma disciplina cadastrada para o curso ${cursoSelecionado}.
          </td>
        </tr>
      `;
      return;
    }

    disciplinasFiltradas.forEach((disc, idx) => {
      // Pegamos o índice correto no array original
      const index = disciplinas.findIndex(d => d === disc);

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${disc.disciplina}</td>
        <td>${disc.docente}</td>
        <td>${disc.dia}</td>
        <td>${disc.horario}</td>
        <td>${disc.curso}</td>
        <td>
          <button class="editar" data-index="${index}">Editar</button>
          <button class="remover" data-index="${index}">Remover</button>
        </td>
      `;
      tabelaBody.appendChild(tr);
    });
  }

  // --- Abrir Modal ---
  btnAbrirModal.addEventListener("click", () => {
    tituloModal.textContent = "Adicionar Disciplina";
    form.reset();
    editandoIndex = null;
    // Preenche automaticamente o curso
    document.getElementById("curso").value = cursoSelecionado;
    modal.style.display = "flex";
  });

  // --- Fechar Modal ---
  fecharModal.addEventListener("click", () => (modal.style.display = "none"));
  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  // --- Salvar Disciplina ---
  form.addEventListener("submit", e => {
    e.preventDefault();

    const novaDisciplina = {
      disciplina: document.getElementById("disciplina").value.trim(),
      docente: document.getElementById("docente").value.trim(),
      dia: document.getElementById("dia").value.trim(),
      horario: document.getElementById("horario").value.trim(),
      curso: cursoSelecionado, // sempre o curso que veio da URL
    };

    if (!novaDisciplina.disciplina || !novaDisciplina.docente) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    if (editandoIndex !== null) {
      disciplinas[editandoIndex] = novaDisciplina;
    } else {
      disciplinas.push(novaDisciplina);
    }

    localStorage.setItem("disciplinas", JSON.stringify(disciplinas));
    atualizarTabela();
    modal.style.display = "none";
  });


  // --- Editar e Remover ---
  tabelaBody.addEventListener("click", e => {
    const index = e.target.dataset.index;

    if (e.target.classList.contains("editar")) {
      const d = disciplinas[index];
      document.getElementById("disciplina").value = d.disciplina;
      document.getElementById("docente").value = d.docente;
      document.getElementById("dia").value = d.dia;
      document.getElementById("horario").value = d.horario;
      document.getElementById("curso").value = d.curso;

      tituloModal.textContent = "Editar Disciplina";
      editandoIndex = index;
      modal.style.display = "flex";
    }

    if (e.target.classList.contains("remover")) {
      if (confirm("Deseja remover esta disciplina?")) {
        disciplinas.splice(index, 1);
        localStorage.setItem("disciplinas", JSON.stringify(disciplinas));
        atualizarTabela();
      }
    }
  });

  // --- Inicializa tabela ---
  atualizarTabela();
});
