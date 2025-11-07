const tabelaCursosBody = document.getElementById("tabelaCursosBody");
const modalEditarCurso = document.getElementById("modalEditarCurso");
const btnFecharModal = document.querySelector(".fechar");
const formEditarCurso = document.getElementById("formEditarCurso");
const modalAdicionarCurso = document.getElementById("modalAdicionarCurso");
const formAdicionarCurso = document.getElementById("formAdicionarCurso");
const btnAdicionarCurso = document.getElementById("adicionarCurso"); 

let cursos = [
  { nome: "Análise e Desenvolvimento de Sistemas", codigo: "ANgIE", turno: "Noite", semestre: 3, docente:"Igor Cardoso" },
  { nome: "Engenharia de Software", codigo: "ENgSW", turno: "Noite", semestre: 4, docente: "Renata ingrata" },
];

let cursoEditando = null;

function carregarTabela() {
  tabelaCursosBody.innerHTML = "";
  cursos.forEach((curso, index) => {
    const row = `
      <tr>
        <td>${curso.nome}</td>
        <td>${curso.codigo}</td>
        <td>${curso.turno}</td>
        <td>${curso.semestre}º</td>
        <td>${curso.docente}</td>
        <td>
          <button class="btn-editar" onclick="editarCurso(${index})">Editar</button>
          <button class="btn-remover" onclick="removerCurso(${index})">Remover</button>
        </td>
      </tr>
    `;
    tabelaCursosBody.innerHTML += row;
  });
}

function editarCurso(index) {
  cursoEditando = index;
  const curso = cursos[index];
  document.getElementById("editarNome").value = curso.nome;
  document.getElementById("editarCodigo").value = curso.codigo;
  document.getElementById("editarTurno").value = curso.turno;
  document.getElementById("editarSemestre").value = curso.semestre;
  document.getElementById("editarDocente").value= curso.docente;
  modalEditarCurso.style.display = "flex";
}

function removerCurso(index) {
  if (confirm("Deseja realmente remover este curso?")) {
    cursos.splice(index, 1);
    carregarTabela();
  }
}

// Função para abrir o modal de adicionar curso
btnAdicionarCurso.addEventListener("click", () => {
  modalAdicionarCurso.style.display = "flex";
});

// Função para salvar novo curso
formAdicionarCurso.addEventListener("submit", (e) => {
  e.preventDefault();

  const novoCurso = {
    nome: document.getElementById("novoNome").value,
    codigo: document.getElementById("novoCodigo").value,
    turno: document.getElementById("novoTurno").value,
    semestre: parseInt(document.getElementById("novoSemestre").value),
    docente: document.getElementById("novoDocente").value,
  };

  cursos.push(novoCurso);
  carregarTabela();
  modalAdicionarCurso.style.display = "none";
  formAdicionarCurso.reset();
});


formEditarCurso.addEventListener("submit", (e) => {
  e.preventDefault();
  cursos[cursoEditando] = {
    nome: document.getElementById("editarNome").value,
    codigo: document.getElementById("editarCodigo").value,
    turno: document.getElementById("editarTurno").value,
    semestre: parseInt(document.getElementById("editarSemestre").value),
    docente: document.getElementById("editarDocente").value,
  };
  modalEditarCurso.style.display = "none";
  carregarTabela();
});

btnFecharModal.addEventListener("click", () => {
  modalEditarCurso.style.display = "none";
  modalAdicionarCurso.style.display= "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modalEditarCurso || event.target === modalAdicionarCurso) {
    modalEditarCurso.style.display = "none";
    modalAdicionarCurso.style.display = "none";
  }
});

carregarTabela();
