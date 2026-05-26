/* ============================================
   PORTFÓLIO CARROSSEL
   Adicione este código ao seu script.js
   ou inclua como <script src="portfolio-carousel.js"></script>
   ============================================ */
(function () {
  const track     = document.getElementById('portfolio-track');
  const cards     = track ? track.querySelectorAll('.portfolio-item') : [];
  const dotsEl    = document.getElementById('portfolio-dots');
  const btnPrev   = document.getElementById('portfolio-prev');
  const btnNext   = document.getElementById('portfolio-next');

  if (!track || cards.length === 0) return;

  const visible   = 3;
  const total     = cards.length;
  const maxIndex  = total - visible;
  let   current   = 0;
  let   timer;
  const dotList   = [];

  /* Cria os dots */
  for (let i = 0; i <= maxIndex; i++) {
    const d = document.createElement('button');
    d.className = 'portfolio-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Ir para o item ' + (i + 1));
    d.addEventListener('click', () => { goTo(i); resetTimer(); });
    dotsEl.appendChild(d);
    dotList.push(d);
  }

  function updateDots() {
    dotList.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, maxIndex));
    const gap    = 20; /* deve bater com o gap do CSS (--spacing-md = 20px) */
    const cardW  = cards[0].offsetWidth + gap;
    track.style.transform = `translateX(-${current * cardW}px)`;
    updateDots();
  }

  btnPrev.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  btnNext.addEventListener('click', () => { goTo(current + 1); resetTimer(); });

  function advance() { goTo(current < maxIndex ? current + 1 : 0); }
  function resetTimer() { clearInterval(timer); timer = setInterval(advance, 4000); }

  /* Recalcula posição ao redimensionar a janela */
  window.addEventListener('resize', () => goTo(current));

  resetTimer();
})();
