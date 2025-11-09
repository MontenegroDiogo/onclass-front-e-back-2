document.addEventListener("DOMContentLoaded", () => {
  const tabelaBody = document.getElementById("tabelaCursosBody");
  const btnAdicionar = document.getElementById("adicionarCurso");
  const formAdicionar = document.getElementById("formAdicionarCurso");
  const formEditar = document.getElementById("formEditarCurso");

  const modalAdicionar = document.getElementById("modalAdicionarCurso");
  const modalEditar = document.getElementById("modalEditarCurso");

  const selectDocente = document.getElementById("select-docente");
  const selectCurso = document.getElementById("select-curso");
  const selectTurno = document.getElementById("select-turno");
  const selectSemestre = document.getElementById("select-semestre");

  let cursos = JSON.parse(localStorage.getItem("cursos")) || [];
  let cursoEditando = null;

  function salvarLocalStorage() {
    localStorage.setItem("cursos", JSON.stringify(cursos));
  }

  function carregarTabela(lista = cursos) {
    tabelaBody.innerHTML = "";
    lista.forEach((curso, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>
          <a href="disciplina.html?curso=${encodeURIComponent(curso.nome)}" class="link-curso">
            ${curso.nome}
          </a>
        </td>
        <td>${curso.codigo}</td>
        <td>${curso.turno}</td>
        <td>${curso.semestre}</td>
        <td>${curso.docente}</td>
        <td>
          <button class="btn-amarelo" onclick="editarCurso(${index})">Editar</button>
          <button class="btn-vermelho" onclick="excluirCurso(${index})">Remover</button>
        </td>
      `;
      tabelaBody.appendChild(tr);
    });

    atualizarFiltros();
  }

  function atualizarFiltros() {
    // Limpar opções atuais (mantendo a primeira opção)
    selectDocente.innerHTML = '<option value="">DOCENTE</option>';
    selectCurso.innerHTML = '<option value="">CURSO</option>';
    selectTurno.innerHTML = `
      <option value="">TURNO</option>
      <option value="Manhã">Manhã</option>
      <option value="Noite">Noite</option>
    `;

    // Criar conjuntos únicos para cada categoria
    const docentes = [...new Set(cursos.map(c => c.docente))];
    const nomesCursos = [...new Set(cursos.map(c => c.nome))];
    const turnos = [...new Set(cursos.map(c => c.turno))];

    // Preencher as opções dinamicamente
    docentes.forEach(d => {
      const opt = document.createElement("option");
      opt.value = d;
      opt.textContent = d;
      selectDocente.appendChild(opt);
    });

    nomesCursos.forEach(n => {
      const opt = document.createElement("option");
      opt.value = n;
      opt.textContent = n;
      selectCurso.appendChild(opt);
    });

    // Apenas adiciona novos turnos se ainda não existirem
    turnos.forEach(t => {
      if (![...selectTurno.options].some(opt => opt.value === t)) {
        const opt = document.createElement("option");
        opt.value = t;
        opt.textContent = t;
        selectTurno.appendChild(opt);
      }
    });
  }

  window.editarCurso = (index) => {
    cursoEditando = index;
    const curso = cursos[index];
    document.getElementById("editarNome").value = curso.nome;
    document.getElementById("editarCodigo").value = curso.codigo;
    document.getElementById("editarTurno").value = curso.turno;
    document.getElementById("editarSemestre").value = curso.semestre;
    document.getElementById("editarDocente").value = curso.docente;
    modalEditar.style.display = "flex";
  };

  window.excluirCurso = (index) => {
    if (confirm("Tem certeza que deseja excluir este curso?")) {
      cursos.splice(index, 1);
      salvarLocalStorage();
      carregarTabela();
    }
  };

  formEditar.addEventListener("submit", (e) => {
    e.preventDefault();
    cursos[cursoEditando] = {
      nome: document.getElementById("editarNome").value,
      codigo: document.getElementById("editarCodigo").value,
      turno: document.getElementById("editarTurno").value,
      semestre: document.getElementById("editarSemestre").value,
      docente: document.getElementById("editarDocente").value,
    };
    salvarLocalStorage();
    modalEditar.style.display = "none";
    carregarTabela();
  });

  btnAdicionar.onclick = () => (modalAdicionar.style.display = "flex");

  formAdicionar.addEventListener("submit", (e) => {
    e.preventDefault();
    const novoCurso = {
      nome: document.getElementById("novoNome").value,
      codigo: document.getElementById("novoCodigo").value,
      turno: document.getElementById("novoTurno").value,
      semestre: document.getElementById("novoSemestre").value,
      docente: document.getElementById("novoDocente").value,
    };
    cursos.push(novoCurso);
    salvarLocalStorage();
    carregarTabela();
    modalAdicionar.style.display = "none";
    formAdicionar.reset();
  });

  document.querySelectorAll(".fechar").forEach((btn) =>
    btn.addEventListener("click", () => {
      modalAdicionar.style.display = "none";
      modalEditar.style.display = "none";
    })
  );

  // FILTRO DINÂMICO
  document.getElementById("btn-filtrar").addEventListener("click", () => {
    const docente = selectDocente.value.toLowerCase();
    const curso = selectCurso.value.toLowerCase();
    const turno = selectTurno.value.toLowerCase();
    const semestre = selectSemestre.value.toLowerCase();

    const filtrados = cursos.filter(c =>
      (!docente || c.docente.toLowerCase() === docente) &&
      (!curso || c.nome.toLowerCase() === curso) &&
      (!turno || c.turno.toLowerCase() === turno) &&
      (!semestre || c.semestre.toString() === semestre)
    );

    carregarTabela(filtrados);
  });

  // Carrega dados e filtros ao iniciar
  carregarTabela();
});

