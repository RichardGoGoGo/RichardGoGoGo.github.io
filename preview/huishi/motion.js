// 亮色版官网共享动效引擎
export function initMotion() {
  const cleanups = [];
  const on = (t, ev, fn, o) => { t.addEventListener(ev, fn, o); cleanups.push(() => t.removeEventListener(ev, fn, o)); };
  const EASE = 'cubic-bezier(.22,1,.36,1)';

  // 滚动进度条
  const prog = document.getElementById('scroll-progress');
  if (prog) {
    const upd = () => {
      const h = document.documentElement;
      prog.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`;
    };
    on(window, 'scroll', upd, { passive: true }); upd();
  }

  // 滚动显现（交错 + 虚化聚焦）
  const revealEls = [...document.querySelectorAll('[data-reveal]')];
  revealEls.forEach(el => {
    const kind = el.getAttribute('data-reveal');
    el.style.opacity = '0';
    el.style.transform = kind === 'left' ? 'translateX(-36px)' : kind === 'right' ? 'translateX(36px)' : kind === 'scale' ? 'scale(.92)' : 'translateY(36px)';
    el.style.filter = 'blur(6px)';
  });
  const pending = new Set(revealEls);
  const show = (el, withDelay) => {
    if (!pending.has(el)) return;
    pending.delete(el);
    const d = withDelay ? parseFloat(el.getAttribute('data-reveal-delay') || 0) : 0;
    el.style.transition = `opacity .9s ${EASE} ${d}s, transform .9s ${EASE} ${d}s, filter .9s ease ${d}s`;
    el.style.opacity = '1'; el.style.transform = 'none'; el.style.filter = 'none';
    io.unobserve(el);
  };
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) show(e.target, true); });
  }, { threshold: 0.15, rootMargin: '200px 0px' });
  revealEls.forEach(el => io.observe(el));
  // 兜底：快速滚动/锚点跳转越过的元素（已在视口上方）立即显示；视口内的由 IO 正常交错显示
  const sweep = () => {
    pending.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 80) show(el, false);
    });
  };
  on(window, 'scroll', sweep, { passive: true });
  const sweepId = setInterval(() => { if (pending.size) sweep(); else clearInterval(sweepId); }, 800);
  cleanups.push(() => clearInterval(sweepId));
  cleanups.push(() => io.disconnect());

  // 数字递增
  const cio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target; cio.unobserve(el);
      const target = parseFloat(el.getAttribute('data-count'));
      const dec = parseInt(el.getAttribute('data-count-decimals') || '0', 10);
      const t0 = performance.now(), dur = 1500;
      const step = now => {
        const p = Math.min(1, (now - t0) / dur), ease = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * ease).toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));
  cleanups.push(() => cio.disconnect());

  // 磁吸按钮
  document.querySelectorAll('[data-magnetic]').forEach(el => {
    on(el, 'mousemove', ev => {
      const r = el.getBoundingClientRect();
      const x = ev.clientX - r.left - r.width / 2, y = ev.clientY - r.top - r.height / 2;
      el.style.transition = 'transform .1s ease-out';
      el.style.transform = `translate(${x * .3}px, ${y * .3}px)`;
    });
    on(el, 'mouseleave', () => {
      el.style.transition = `transform .55s cubic-bezier(.34,1.8,.4,1)`;
      el.style.transform = 'translate(0,0)';
    });
  });

  // 卡片微倾（3D tilt）
  document.querySelectorAll('[data-tilt]').forEach(el => {
    on(el, 'mousemove', ev => {
      const r = el.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width - .5, py = (ev.clientY - r.top) / r.height - .5;
      el.style.transition = 'transform .12s ease-out, box-shadow .3s ease';
      el.style.transform = `perspective(700px) rotateX(${-py * 5}deg) rotateY(${px * 7}deg) translateY(-5px)`;
      el.style.boxShadow = '0 22px 44px -18px rgba(30,35,51,.22)';
    });
    on(el, 'mouseleave', () => {
      el.style.transition = `transform .6s ${EASE}, box-shadow .6s ease`;
      el.style.transform = 'none';
      el.style.boxShadow = '';
    });
  });

  // 词语轮播
  document.querySelectorAll('[data-rotate-words]').forEach(el => {
    const words = el.getAttribute('data-rotate-words').split('|');
    let i = 0;
    el.textContent = words[0];
    el.style.display = 'inline-block';
    const id = setInterval(() => {
      i = (i + 1) % words.length;
      el.style.transition = 'transform .3s ease, opacity .3s ease';
      el.style.transform = 'translateY(-80%)'; el.style.opacity = '0';
      setTimeout(() => {
        el.textContent = words[i];
        el.style.transition = 'none';
        el.style.transform = 'translateY(70%)';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          el.style.transition = `transform .4s ${EASE}, opacity .4s ease`;
          el.style.transform = 'translateY(0)'; el.style.opacity = '1';
        }));
      }, 300);
    }, 2400);
    cleanups.push(() => clearInterval(id));
  });

  // 自定义光标（滞后跟随圆环）
  const ring = document.getElementById('cursor-ring');
  if (ring && matchMedia('(pointer:fine)').matches) {
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, raf;
    on(document, 'mousemove', e => { mx = e.clientX; my = e.clientY; });
    const loop = () => {
      rx += (mx - rx) * .16; ry += (my - ry) * .16;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    cleanups.push(() => cancelAnimationFrame(raf));
    on(document, 'mouseover', e => {
      const hot = e.target.closest && e.target.closest('a,[data-magnetic],[data-tilt]');
      ring.style.width = hot ? '56px' : '32px';
      ring.style.height = hot ? '56px' : '32px';
      ring.style.background = hot ? 'rgba(61,123,255,.12)' : 'transparent';
    });
  }

  // 点击迸发
  on(document, 'click', e => {
    const colors = ['#3D7BFF', '#7C5CF6', '#17B8CE', '#FF7A59', '#FFC24B'];
    for (let i = 0; i < 9; i++) {
      const s = document.createElement('div');
      const a = (Math.PI * 2 / 9) * i + Math.random() * .5, d = 30 + Math.random() * 26;
      s.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:7px;height:7px;border-radius:50%;pointer-events:none;z-index:9999;background:${colors[i % colors.length]}`;
      document.body.appendChild(s);
      s.animate(
        [{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
         { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px) scale(.15)`, opacity: 0 }],
        { duration: 600, easing: 'cubic-bezier(.22,1,.36,1)' }
      ).onfinish = () => s.remove();
    }
  });

  // 鼠标视差（远中近层）
  const pls = [...document.querySelectorAll('[data-parallax-depth]')];
  if (pls.length) {
    on(document, 'mousemove', e => {
      const nx = e.clientX / innerWidth - .5, ny = e.clientY / innerHeight - .5;
      pls.forEach(el => {
        const depth = parseFloat(el.getAttribute('data-parallax-depth'));
        el.style.transform = `translate(${nx * depth}px, ${ny * depth}px)`;
      });
    });
  }

  return () => cleanups.forEach(f => f());
}
