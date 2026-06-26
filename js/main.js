document.addEventListener('DOMContentLoaded', function () {
  // --- Theme toggle (夜间模式) ---
  var themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', cur);
      try { localStorage.setItem('theme', cur); } catch (e) {}
    });
  }

  // --- Expand detail in place (点标题原地展开，不跳页) ---
  document.addEventListener('click', function (e) {
    var h = e.target.closest('.post-title, .feat-title');
    if (!h) return;
    if (e.target.closest('a')) return; // 链接（深度分析等）正常跳转，不触发展开
    var item = h.closest('.post-item, .feat');
    if (!item || !item.querySelector('.post-detail')) return;
    var open = item.classList.toggle('open');
    h.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // --- Mobile menu ---
  var toggle = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
  }

  // --- TOC build ---
  var tocList = document.getElementById('toc-list');
  var mobileToc = document.getElementById('mobile-toc-list');
  var main = document.querySelector('.main-content');
  var tocItems = [], tocLinks = null;
  if (main && (tocList || mobileToc)) {
    var headings = main.querySelectorAll('h2, h3');
    headings.forEach(function (h, i) {
      if (!h.id) h.id = 'h-' + i;
      var li = document.createElement('li');
      if (h.tagName === 'H3') li.classList.add('toc-h3');
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      li.appendChild(a);
      tocItems.push(h);
      if (tocList) tocList.appendChild(li.cloneNode(true));
      if (mobileToc) mobileToc.appendChild(li.cloneNode(true));
    });
    [tocList, mobileToc].forEach(function (list) {
      if (!list) return;
      list.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
          e.preventDefault();
          var t = document.getElementById(e.target.getAttribute('href').substring(1));
          if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
    if (tocList && tocItems.length) tocLinks = tocList.querySelectorAll('a');
  }

  // --- Consolidated scroll handler (导航隐藏 + TOC 高亮，rAF 节流) ---
  var nav = document.getElementById('site-nav');
  var lastY = window.scrollY;
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    if (nav) {
      if (y > lastY && y > 80) nav.classList.add('hidden');
      else nav.classList.remove('hidden');
    }
    if (tocLinks && tocItems.length) {
      var pos = y + 100, idx = 0;
      for (var i = 0; i < tocItems.length; i++) {
        if (tocItems[i].offsetTop <= pos) idx = i;
      }
      tocLinks.forEach(function (l) { l.classList.remove('active'); });
      if (tocLinks[idx]) tocLinks[idx].classList.add('active');
    }
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  // --- Search ---
  var searchBtn = document.getElementById('search-btn');
  var overlay = document.getElementById('search-overlay');
  var input = document.getElementById('search-input');
  var close = document.getElementById('search-close');
  var results = document.getElementById('search-results');
  var data = null, active = -1;

  function esc(s) { return (s || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function highlight(text, q) {
    var safe = esc(text);
    if (!q) return safe;
    var i = (text || '').toLowerCase().indexOf(q);
    if (i === -1) return safe;
    return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length));
  }

  if (searchBtn && overlay) {
    function openSearch() {
      overlay.classList.add('active');
      input.value = '';
      input.focus();
      results.innerHTML = '';
      active = -1;
      document.body.style.overflow = 'hidden';
    }
    function closeSearch() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    function setActive(n) {
      var links = results.querySelectorAll('a');
      if (!links.length) return;
      active = (n + links.length) % links.length;
      links.forEach(function (l) { l.classList.remove('kb-active'); });
      links[active].classList.add('kb-active');
      links[active].scrollIntoView({ block: 'nearest' });
    }

    searchBtn.addEventListener('click', openSearch);
    close.addEventListener('click', closeSearch);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeSearch(); });
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); return; }
      if (!overlay.classList.contains('active')) return;
      if (e.key === 'Escape') closeSearch();
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
      if (e.key === 'Enter') {
        var links = results.querySelectorAll('a');
        if (links[active]) window.location.href = links[active].getAttribute('href');
      }
    });

    fetch('/search.json').then(function (r) { return r.json(); }).then(function (d) { data = d; }).catch(function () { data = []; });

    input.addEventListener('input', function () {
      if (!data) return;
      active = -1;
      var q = input.value.trim().toLowerCase();
      if (!q) { results.innerHTML = ''; return; }
      var matches = data.filter(function (item) {
        return (item.title || '').toLowerCase().indexOf(q) !== -1 ||
               (item.summary || '').toLowerCase().indexOf(q) !== -1 ||
               (item.tags || '').toLowerCase().indexOf(q) !== -1 ||
               (item.icat || '').toLowerCase().indexOf(q) !== -1 ||
               (item.category || '').toLowerCase().indexOf(q) !== -1;
      }).slice(0, 30);
      if (!matches.length) { results.innerHTML = '<div class="no-results">未找到</div>'; return; }
      results.innerHTML = matches.map(function (m) {
        var meta = [m.icat || m.category, m.date].filter(Boolean).join(' · ');
        return '<a href="' + m.url + '">' +
          '<div class="result-title">' + highlight(m.title, q) + '</div>' +
          '<div class="result-cat">' + esc(meta) + '</div>' +
          (m.summary ? '<div class="result-summary">' + highlight(m.summary, q) + '</div>' : '') +
          '</a>';
      }).join('');
    });
  }

  // --- Fade in with IntersectionObserver ---
  var fades = document.querySelectorAll('.fade-in');
  if (fades.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0, rootMargin: '0px 0px 80px 0px' });
    fades.forEach(function (el) { obs.observe(el); });
  }
});
