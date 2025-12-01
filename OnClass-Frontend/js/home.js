// ======== FUNÇÃO PARA ABRIR MODAL ========
function abrirModal(id) {
  document.getElementById(id).style.display = "flex";
}

// ======== FUNÇÃO PARA LIMPAR FORMULÁRIO ========
function limparCampos(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.reset();
  }
}

// ======== FUNÇÃO PARA FECHAR MODAL ========
function fecharModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = "none";

  // Limpa os campos ao fechar
  if (id === "modalAdmin") limparCampos("formAdmin");
  if (id === "modalDocente") limparCampos("formDocente");
}

// ======== BOTÕES PARA ABRIR MODAL ========
document.getElementById("btnAdmin").addEventListener("click", () => abrirModal("modalAdmin"));
document.getElementById("btnDocente").addEventListener("click", () => abrirModal("modalDocente"));

// ======== FECHAR MODAL AO CLICAR NO "X" ========
document.querySelectorAll(".close").forEach(botao => {
  botao.addEventListener("click", () => {
    const modalId = botao.getAttribute("data-close");
    fecharModal(modalId);
  });
});

// ======== FECHAR MODAL AO CLICAR FORA ========
window.addEventListener("click", (e) => {
  document.querySelectorAll(".modal").forEach(modal => {
    if (e.target === modal) {
      fecharModal(modal.id);
    }
  });
});

// ======== MOSTRAR/OCULTAR SENHA ========
document.querySelectorAll(".toggle-senha").forEach(botao => {
  botao.addEventListener("click", () => {
    const inputId = botao.getAttribute("data-input");
    const input = document.getElementById(inputId);
    const img = botao.querySelector("img");

    if (input.type === "password") {
      input.type = "text";
      img.src = "../img/olho.png";
    } else {
      input.type = "password";
      img.src = "../img/fechado.png";
    }
  });
});

// ======== LOGIN SIMPLES (Simulação) ========
const loginAdmin = { matricula: "01717319", senha: "admin123" };
const loginDocente = { matricula: "01649407", senha: "prof123" };

// Login do Administrador
document.getElementById("formAdmin").addEventListener("submit", function(e) {
  e.preventDefault();

  const matricula = document.getElementById("matriculaAdmin").value.trim();
  const senha = document.getElementById("senhaAdmin").value.trim();

  if (matricula === loginAdmin.matricula && senha === loginAdmin.senha) {
    window.location.href = "../telas/homeAdmin.html";
  } else {
    alert("Matrícula ou senha incorretos para Administrador!");
  }
});

// Login do Docente
document.getElementById("formDocente").addEventListener("submit", function(e) {
  e.preventDefault();

  const matricula = document.getElementById("matriculaDocente").value.trim();
  const senha = document.getElementById("senhaDocente").value.trim();

  if (matricula === loginDocente.matricula && senha === loginDocente.senha) {
    window.location.href = "../telas/professor.html";
  } else {
    alert("Matrícula ou senha incorretos para Docente!");
  }
});
