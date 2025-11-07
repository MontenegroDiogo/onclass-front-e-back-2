// ---------- Referências ----------
const modalQrcode = document.getElementById("modal-qrcode");
const closeModal  = document.getElementById("close-modal");
const infoAula    = document.getElementById("infoAula");
const qrcodeDiv   = document.getElementById("qrcode");
const baixarBtn   = document.getElementById("baixarBtn");

// tbody da tabela (fallback caso o querySelector falhe)
const tabela =
  document.querySelector("#tabelaHorarios tbody") ||
  (document.getElementById("tabelaHorarios") && document.getElementById("tabelaHorarios").querySelector("tbody"));

// ---------- Dados simulados ----------
const horarios = [
  { dia: "Segunda-feira", horario: "08:00 - 10:00", curso: "ADS", disciplina: "Eng. Software", turma: "A", professor: "Igor Cardoso"},
  { dia: "Terça-feira",   horario: "08:00 - 10:00", curso: "ADS", disciplina: "Eng. Software", turma: "A", professor: "Igor Cardoso"},
  { dia: "Quarta-feira",  horario: "08:00 - 10:00", curso: "ADS", disciplina: "Eng. Software", turma: "A", professor: "Igor Cardoso"},
  { dia: "Quinta-feira",  horario: "08:00 - 10:00", curso: "ADS", disciplina: "Eng. Software", turma: "A", professor: "Igor Cardoso"},
  { dia: "Sexta-feira",   horario: "08:00 - 10:00", curso: "ADS", disciplina: "Eng. Software", turma: "A", professor: "Igor Cardoso"}
];

// ---------- Renderização da tabela ----------
function renderTabela() {
  if (!tabela) return;
  tabela.innerHTML = "";

  horarios.forEach((h) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${h.dia}</td>
      <td>${h.horario}</td>
      <td>${h.curso}</td>
      <td>${h.disciplina}</td>
      <td>${h.turma}</td>
      <td>${h.professor}</td>
    `;
    row.addEventListener("click", () => abrirModalComQR(h));
    tabela.appendChild(row);
  });
}

// ---------- Estado do QR ----------
let qrInstance = null;

// ---------- Abre modal + gera QR ----------
function abrirModalComQR(aula) {
  if (!modalQrcode || !infoAula || !qrcodeDiv) return;

  modalQrcode.style.display = "flex";

  infoAula.innerHTML = `
    <p><strong>Dia:</strong> ${aula.dia}</p>
    <p><strong>Horário:</strong> ${aula.horario}</p>
    <p><strong>Curso:</strong> ${aula.curso}</p>
    <p><strong>Turma:</strong> ${aula.turma}</p>
    <p><strong>Professor:</strong> ${aula.professor}</p>
  `;

  // Limpa QR anterior
  qrcodeDiv.innerHTML = "";
  qrInstance = null;

  // Params na URL (serão lidos em alunologin.html)
  const params = new URLSearchParams({
    dia: aula.dia,
    horario: aula.horario,
    curso: aula.curso,
    turma: aula.turma,
    prof: aula.professor,
    ts: Date.now()
  }).toString();

  // Base da URL (teu IP + Live Server)
  const base = `http://192.168.3.32:5500`;

  // Tela de login do aluno
  const urlLogin = `${base}/OnClass-main/telas/alunologin.html?${params}`;

  // Gera QR
  qrInstance = new QRCode(qrcodeDiv, {
    text: urlLogin,
    width: 256,
    height: 256,
    correctLevel: QRCode.CorrectLevel.M
  });

  // Download do QR
  baixarBtn.onclick = () => {
    const canvas = qrcodeDiv.querySelector("canvas");
    const img    = qrcodeDiv.querySelector("img");

    let dataURL = null;
    if (canvas) dataURL = canvas.toDataURL("image/png");
    else if (img && img.src) dataURL = img.src;

    if (dataURL) {
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = `QRCode_${aula.dia.replace(/\s+/g, "_")}.png`;
      a.click();
    }
  };
}

// ---------- Fechar modal ----------
if (closeModal) {
  closeModal.addEventListener("click", () => {
    modalQrcode.style.display = "none";
    qrcodeDiv.innerHTML = "";
    qrInstance = null;
  });
}

window.addEventListener("click", (e) => {
  if (e.target === modalQrcode) {
    modalQrcode.style.display = "none";
    qrcodeDiv.innerHTML = "";
    qrInstance = null;
  }
});

// ---------- Inicializa ----------
renderTabela();


// ================== Justificativa de faltas ==================
const btnAddJustificativa  = document.getElementById("btn-add-justificativa");
const modalJustificativa   = document.getElementById("modal-justificativa");
const fecharModalJust      = document.getElementById("fechar-modal-justificativa");
const formJustificativa    = document.getElementById("form-justificativa");

if (btnAddJustificativa && modalJustificativa) {
  btnAddJustificativa.addEventListener("click", () => {
    modalJustificativa.style.display = "flex";
  });
}

if (fecharModalJust && modalJustificativa) {
  fecharModalJust.addEventListener("click", () => {
    modalJustificativa.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === modalJustificativa) {
    modalJustificativa.style.display = "none";
  }
});
