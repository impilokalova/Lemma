
(() => {
  const elements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if(entry.isIntersecting) {
        entry.target.classList.add('revealed'); observer.unobserve(entry.target);
      }
    }, { threshold: .08 });
    elements.forEach(el => observer.observe(el));
  } else { elements.forEach(el => el.classList.add('revealed')); }
})();
