// animations.js - production micro-interactions
(() => {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }
  }, { threshold: .12 });
  document.querySelectorAll('.slide-up,.fade-in,.zoom-in').forEach(el => io.observe(el));

  // Ripple effect for .btn
  function addRipple(e) {
    const btn = e.currentTarget;
    const r = document.createElement('span');
    r.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = size + 'px';
    r.style.left = (e.clientX - rect.left - size / 2) + 'px';
    r.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(r);
    setTimeout(() => r.remove(), 520);
  }
  document.addEventListener('click', (ev) => {
    const t = ev.target.closest('.btn');
    if (t) { addRipple(ev); }
  }, true);

  // Navbar scroll elevation
  const header = document.querySelector('.nav');
  let last = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY || 0;
    if (!header) return;
    if (y > 8 && last <= 8) { header.style.boxShadow = '0 6px 18px rgba(0,0,0,.28)'; }
    if (y <= 8 && last > 8) { header.style.boxShadow = 'none'; }
    last = y;
  });

  // Typing dots helper for mini-chat (if present)
  const msgs = document.getElementById('chat-messages');
  if (msgs) {
    msgs.addEventListener('chat:typing', () => {
      const row = document.createElement('div'); row.className = 'chat-row assistant';
      const b = document.createElement('div'); b.className = 'bubble typing'; b.innerHTML = '<span></span><span></span><span></span>';
      row.appendChild(b); msgs.appendChild(row); msgs.scrollTop = msgs.scrollHeight;
      setTimeout(() => row.remove(), 900);
    });
  }

  // Enhance voice indicator random modulation if active
  const bars = Array.from(document.querySelectorAll('.voice-indicator.active .bar'));
  if (bars.length) {
    let rid = null;
    const loop = () => {
      bars.forEach((el, i) => {
        el.style.height = (8 + Math.abs(Math.sin(performance.now() / 180 + i)) * 16) + 'px';
      });
      rid = requestAnimationFrame(loop);
    };
    rid = requestAnimationFrame(loop);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && rid) {
        cancelAnimationFrame(rid);
      } else if (!rid) {
        rid = requestAnimationFrame(loop);
      }
    });
  }
})();

// active link highlight
(() => {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.menu a').forEach(a => {
    if (a.getAttribute('href') === path) { a.classList.add('active'); }
  });
})();
