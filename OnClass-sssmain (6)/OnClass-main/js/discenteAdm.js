// const btnAddAluno = document.getElementById('btn-add-aluno');
// const modalAluno = document.getElementById('modal-aluno');
// const closeModal = document.getElementById('close-modal-aluno');
// const formAluno = document.getElementById('form-aluno');
// const salvarAluno = document.getElementById('salvar-aluno');

// // Abrir modal//
// btnAddAluno.addEventListener('click', () => {
//     modalAluno.style.display = 'flex';
// });

// // Fechar modal
// closeModal.addEventListener('click', () => {
//     modalAluno.style.display = 'none';
// });

// // Fechar modal clicando fora
// window.addEventListener('click', (e) => {
// if (e.target === modalAluno) {
//     modalAluno.style.display = 'none';
//  }

// });
// console.log(btnAddAluno, modalAluno, closeModal);

// ======= Referências do modal (abrir/fechar) =======
const btnAddAluno   = document.getElementById('btn-add-aluno');
const modalAluno    = document.getElementById('modal-aluno');
const closeModal    = document.getElementById('close-modal-aluno');
const formAluno     = document.getElementById('form-aluno');
const salvarAluno   = document.getElementById('salvar-aluno');

// ======= Helper: SHA-256 (para gerar senhaHASH) =======
async function sha256Hex(text) {
  const enc = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', enc);
  const bytes = Array.from(new Uint8Array(hashBuffer));
  return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ======= Helper: DeviceId persistente no navegador =======
function getOrCreateDeviceId() {
  const KEY = 'onclass_device_id';
  let id = localStorage.getItem(KEY);
  if (!id) {
    // UUID v4 simples
    id = ([1e7]+-1e3+-4e3+-8e3+-1e11)
      .replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    localStorage.setItem(KEY, id);
  }
  return id;
}

// ======= Abrir / Fechar modal =======
btnAddAluno?.addEventListener('click', () => {
  modalAluno.style.display = 'flex';
});

closeModal?.addEventListener('click', () => {
  modalAluno.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modalAluno) modalAluno.style.display = 'none';
});

// ======= Submeter (criar aluno) =======
salvarAluno?.addEventListener('click', async (e) => {
  e.preventDefault();

  // Pega valores do form
  const nome       = document.getElementById('nome-completo')?.value?.trim();
  const matricula  = document.getElementById('matricula')?.value?.trim();
  const disciplina = document.getElementById('disciplina')?.value?.trim();
  const curso      = document.getElementById('curso')?.value?.trim();
  const turma      = document.getElementById('turma')?.value?.trim();
  const turno      = document.getElementById('turno')?.value?.trim();
  const senha      = document.getElementById('senha')?.value ?? '';
  const emailField = document.getElementById('email'); // opcional

  // Campos exigidos pelo backend (vide validators.js)
  const email     = emailField?.value?.trim() || `${matricula}@aluno.local`;
  const senhaHASH = await sha256Hex(senha);
  const DeviceId  = getOrCreateDeviceId();

  // Monta payload (pode incluir outros campos sem problema)
  const aluno = {
    nome,
    matricula,
    email,
    senhaHASH,
    DeviceId,
    curso,
    turma,
    turno,
    disciplina
  };

  // Validação simples no front (evita 400 desnecessário)
  if (!nome || !matricula || !email || !senhaHASH) {
    alert('Preencha pelo menos Nome, Matrícula e Senha.');
    return;
  }

  try {
    const resp = await fetch('http://localhost:5000/api/alunos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.message || `Erro ${resp.status}`);
    }

    const data = await resp.json();
    alert('Aluno cadastrado com sucesso!');

    // limpa e fecha
    formAluno?.reset();
    modalAluno.style.display = 'none';

    // TODO: recarregar lista de "Alunos Recém-Cadastrados"
    // ex.: await carregarAlunos();
  } catch (err) {
    console.error(err);
    alert(`Falha ao cadastrar aluno: ${err.message}`);
  }
});
