(() => {
  const root = document.documentElement;
  const cursor = document.querySelector('.cursor');
  let mx = 0, my = 0, tx = 0, ty = 0;
  window.addEventListener('mousemove', e => {
    const x = e.clientX / window.innerWidth - .5;
    const y = e.clientY / window.innerHeight - .5;
    root.style.setProperty('--mx', x.toFixed(3));
    root.style.setProperty('--my', y.toFixed(3));
    tx = e.clientX; ty = e.clientY;
  });
  if (cursor) {
    const tick = () => {
      mx += (tx - mx) * .16;
      my += (ty - my) * .16;
      cursor.style.transform = `translate(${mx}px, ${my}px)`;
      requestAnimationFrame(tick);
    };
    tick();
    document.querySelectorAll('a, .service-card, .project-tile, .step, .panel').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
    });
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: .16 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();
