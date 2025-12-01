const btnFiltrar = document.getElementById('btn-filtrar');

// Evento do botão Filtrar
  btnFiltrar.addEventListener('click', () => {
    const filtros = {
      docente: document.getElementById('select-docente').value,
      curso: document.getElementById('select-curso').value,
      turno: document.getElementById('select-turno').value,
      semestre: document.getElementById('select-semestre').value
    };
    carregarHorarios(filtros);
  });

const tabela = document.querySelector("#tabelaHorarios tbody");
const abrirModal = document.querySelector("#abrirModal");
const modal = document.querySelector("#modal");
const fecharModal = document.querySelector(".fechar");
const form = document.querySelector("#formHorario");
const tituloModal = document.querySelector("#modalTitulo");

let editandoIndex = null;

let horarios = [
  { dia: "Segunda-feira", horario: "08:00 - 10:00", curso: "ADS", turma: "A1", professor: "Nina" },
  { dia: "Terça-feira", horario: "10:00 - 12:00", curso: "Eng. Software", turma: "B2", professor: "Lili" },
];

// Renderizar tabela
function renderTabela() {
  tabela.innerHTML = "";
  horarios.forEach((h, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${h.dia}</td>
      <td>${h.horario}</td>
      <td>${h.curso}</td>
      <td>${h.turma}</td>
      <td>${h.professor}</td>
      <td>
        <button class="acao editar" onclick="editarHorario(${i})">Editar</button>
        <button class="acao remover" onclick="removerHorario(${i})">Remover</button>
      </td>
    `;
    tabela.appendChild(row);
  });
}

// Abrir modal
abrirModal.addEventListener("click", () => {
  tituloModal.textContent = "Adicionar Horário";
  form.reset();
  modal.style.display = "flex";
  editandoIndex = null;
});

// Fechar modal
fecharModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Salvar horário
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const novoHorario = {
    dia: document.querySelector("#dia").value,
    horario: document.querySelector("#horario").value,
    curso: document.querySelector("#curso").value,
    turma: document.querySelector("#turma").value,
    professor: document.querySelector("#professor").value,
  };

  if (editandoIndex !== null) {
    horarios[editandoIndex] = novoHorario;
  } else {
    horarios.push(novoHorario);
  }

  renderTabela();
  modal.style.display = "none";
});

// Editar horário
function editarHorario(index) {
  const h = horarios[index];
  document.querySelector("#dia").value = h.dia;
  document.querySelector("#horario").value = h.horario;
  document.querySelector("#curso").value = h.curso;
  document.querySelector("#turma").value = h.turma;
  document.querySelector("#professor").value = h.professor;
  tituloModal.textContent = "Editar Horário";
  modal.style.display = "flex";
  editandoIndex = index;
}

// Remover horário
function removerHorario(index) {
  if (confirm("Tem certeza que deseja remover este horário?")) {
    horarios.splice(index, 1);
    renderTabela();
  }
}

renderTabela();
