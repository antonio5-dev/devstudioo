(function () {
  const track   = document.getElementById('portfolio-track');
  const dotsEl  = document.getElementById('portfolio-dots');
  const btnPrev = document.getElementById('portfolio-prev');
  const btnNext = document.getElementById('portfolio-next');

  if (!track) return;

  const cards   = track.querySelectorAll('.portfolio-item');
  const total   = cards.length;
  const GAP     = 20;
  let current   = 0;
  let timer;
  let dotList   = [];

  /* Quantos cards cabem na janela */
  function getVisible() {
    const outerW = track.parentElement.offsetWidth - GAP * 2; /* desconta padding */
    const cardW  = cards[0].offsetWidth + GAP;
    return Math.round(outerW / cardW);
  }

  function getMaxIndex() {
    return Math.max(0, total - getVisible());
  }

  /* Reconstrói dots conforme visível atual */
  function buildDots() {
    /* Remove dots antigos (mantém as setas) */
    dotList.forEach(d => d.remove());
    dotList = [];

    const max = getMaxIndex();
    for (let i = 0; i <= max; i++) {
      const d = document.createElement('button');
      d.className = 'portfolio-dot' + (i === current ? ' active' : '');
      d.setAttribute('aria-label', 'Ir para o item ' + (i + 1));
      d.addEventListener('click', () => { goTo(i); resetTimer(); });
      /* Insere antes do botão direito */
      btnNext.insertAdjacentElement('beforebegin', d);
      dotList.push(d);
    }
  }

  function updateDots() {
    dotList.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, getMaxIndex()));
    const cardW = cards[0].offsetWidth + GAP;
    track.style.transform = `translateX(-${current * cardW}px)`;
    updateDots();
  }

  btnPrev.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  btnNext.addEventListener('click', () => { goTo(current + 1); resetTimer(); });

  function advance() {
    goTo(current < getMaxIndex() ? current + 1 : 0);
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(advance, 4000);
  }

  /* Reconstrói ao redimensionar */
  window.addEventListener('resize', () => {
    buildDots();
    goTo(current);
  });

  /* Init */
  buildDots();
  resetTimer();
})();
