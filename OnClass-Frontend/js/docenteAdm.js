const btnAddProfessor = document.getElementById('btn-add-professor');
const modalProfessor = document.getElementById('modal-professor');
const closeModal = document.getElementById('close-modal');
const formProfessor = document.getElementById('form-professor');
const salvarProfessor = document.getElementById('salvar-professor');

salvarProfessor.addEventListener('click', async (event) => {
    event.preventDefault();
    const professor = {
        matricula: document.getElementById('matricula').value,
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senhaHASH: document.getElementById('senha').value

    }
    const criarProfessor = await fetch('http://localhost:5000/api/professores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(professor)
    });
}
)



// Abrir modal//
btnAddProfessor.addEventListener('click', () => {
    modalProfessor.style.display = 'flex';
});

// Fechar modal
closeModal.addEventListener('click', () => {
    modalProfessor.style.display = 'none';
});

// Fechar modal clicando fora
window.addEventListener('click', (e) => {
if (e.target === modalProfessor) {
    modalProfessor.style.display = 'none';
 }

});
