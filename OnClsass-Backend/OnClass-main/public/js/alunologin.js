function verificarLogin() {
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  const popup = document.getElementById('popup');
  const popupConteudo = document.getElementById('popupConteudo');
  const popupIcone = document.getElementById('popupIcone');

  // Credenciais corretas
  const usuarioCorreto = 'aluno';
  const senhaCorreta = '1234';

  if (usuario === usuarioCorreto && senha === senhaCorreta) {
    popupConteudo.className = 'popup-conteudo sucesso';
    popupConteudo.querySelector('h3').textContent = 'Presença realizada com sucesso!';
    popupConteudo.querySelector('p').textContent = 'Sua presença foi confirmada no sistema.';
    popupIcone.src = '../img/verificado.png';
  } else {
    popupConteudo.className = 'popup-conteudo erro';
    popupConteudo.querySelector('h3').textContent = 'Presença não confirmada!';
    popupConteudo.querySelector('p').textContent = 'Usuário ou senha incorretos.';
    popupIcone.src = '../img/botao-apagar.png';
  }

  popup.style.display = 'flex';
  setTimeout(() => popup.classList.add('show'), 10);
}

function fecharPopup() {
  const popup = document.getElementById('popup');
  popup.classList.remove('show');
  setTimeout(() => popup.style.display = 'none', 300);
}
