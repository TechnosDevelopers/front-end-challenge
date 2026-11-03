// Menu Hamburguer

const BREAKPOINT_DESKTOP = 992;

function iniciarMenu() {
  const botao = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!botao || !menu) return;

  function abrirMenu() {
    menu.classList.add('aberto');
    botao.setAttribute('aria-expanded', 'true');
    botao.setAttribute('aria-label', 'Fechar menu');
  }

  function fecharMenu() {
    menu.classList.remove('aberto');
    botao.setAttribute('aria-expanded', 'false');
    botao.setAttribute('aria-label', 'Abrir menu');
  }

  botao.addEventListener('click', () => {
    menu.classList.contains('aberto') ? fecharMenu() : abrirMenu();
  });

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', fecharMenu));

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') fecharMenu();
  });


  window.addEventListener('resize', () => {
    if (window.innerWidth >= BREAKPOINT_DESKTOP) fecharMenu();
  });
}

document.addEventListener('DOMContentLoaded', iniciarMenu);
// Menu Hamburguer FIM

const itens = document.querySelectorAll('input[name="itens"]');
const valorPersonalizado = document.getElementById('valor-personalizado');
const resumo = document.getElementById('resumo-doacao');

function calcularDoacao() {

    let soma = 0;

    itens.forEach(item => {
        if (item.checked) {
            soma += Number(item.dataset.valor || 0);
        }
    });

    let personalizado = parseFloat(
        valorPersonalizado.value.replace(',', '.')
    ) || 0;

    soma += personalizado;

    resumo.innerText = `Total da sua doação: ${soma.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })}`;
}


itens.forEach(item => {
    item.addEventListener('change', calcularDoacao);
});


valorPersonalizado.addEventListener('input', calcularDoacao);