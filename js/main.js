document.addEventListener('DOMContentLoaded', function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // --- 夜间模式（侧栏与手机顶栏各一个按钮） ---
  $$('.js-theme').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', cur);
      try { localStorage.setItem('theme', cur); } catch (e) {}
    });
  });

  // --- 点标题原地展开 ---
  document.addEventListener('click', function (e) {
    var h = e.target.closest('.item-title, .post-title, .feat-title');
    if (!h || e.target.closest('a')) return;
    var item = h.closest('.item, .post-item, .feat');
    if (!item || !item.querySelector('.post-detail')) return;
    var open = item.classList.toggle('open');
    h.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // --- 截止倒计时（按访问当天计算，构建之后过期的也能识别） ---
  var today = new Date(); today.setHours(0, 0, 0, 0);
  function daysLeft(iso) {
    var p = (iso || '').split('-');
    if (p.length !== 3) return null;
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return Math.round((d - today) / 86400000);
  }
  $$('.js-dl').forEach(function (el) {
    var n = daysLeft(el.getAttribute('data-deadline'));
    if (n === null) return;
    var item = el.closest('.item');
    if (n < 0) {
      el.textContent = '已截止';
      el.classList.add('mute');
      if (item) item.classList.add('is-expired');
      return;
    }
    var tip = document.createElement('span');
    tip.className = 'dl-left' + (n <= 7 ? ' soon' : '');
    tip.textContent = n === 0 ? ' · 今天截止' : ' · 剩 ' + n + ' 天';
    el.appendChild(tip);
  });

  // --- 时间线筛选 + 按天计数 ---
  function isHiddenCall(it) { return it.getAttribute('data-kind') === 'calls' && it.classList.contains('is-expired'); }
  function refreshDays(root) {
    var total = 0;
    $$('.day', root).forEach(function (day) {
      var n = $$('.item', day).filter(function (it) { return it.style.display !== 'none' && !isHiddenCall(it); }).length;
      day.hidden = n === 0;
      var c = $('.day-count', day);
      if (c) c.textContent = n ? n + ' 条' : '';
      total += n;
    });
    return total;
  }
  var tl = $('#timeline');
  if (tl) refreshDays(tl);
  $$('.timeline').forEach(function (t) { if (t !== tl) refreshDays(t); });

  function bindFilter(barSel, itemSel, test, after) {
    var bar = $(barSel);
    if (!bar) return;
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('.tag-chip');
      if (!b) return;
      $$('.tag-chip', bar).forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
      var f = b.getAttribute('data-f');
      $$(itemSel).forEach(function (el) { el.style.display = test(el, f) ? '' : 'none'; });
      if (after) after();
    });
  }
  bindFilter('#feed-filter', '#timeline .item', function (it, f) {
    if (f === 'all') return true;
    if (f === 'editor') return it.hasAttribute('data-editor');
    if (f.indexOf('k:') === 0) return it.getAttribute('data-kind') === f.slice(2);
    if (f.indexOf('c:') === 0) return it.getAttribute('data-icat') === f.slice(2);
    return true;
  }, function () {
    var n = refreshDays(tl);
    var empty = $('#feed-empty');
    if (empty) empty.hidden = n > 0;
  });
  bindFilter('#calls-filter', '.cal-row', function (el, f) {
    return f === 'all' || el.getAttribute('data-ctype') === f;
  });
  bindFilter('#skills-filter', '.skill-cell', function (el, f) {
    if (f === 'all') return true;
    if (f.indexOf('r:') === 0) return el.getAttribute('data-risk') === f.slice(2);
    if (f.indexOf('g:') === 0) return el.getAttribute('data-group') === f.slice(2);
    return true;
  }, function () {
    var empty = $('#skills-empty');
    if (empty) empty.hidden = $$('.skill-cell').some(function (el) { return el.style.display !== 'none'; });
  });

  // --- 文章目录 ---
  var tocList = $('#toc-list'), mobileToc = $('#mobile-toc-list'), main = $('.main-content');
  var tocItems = [], tocLinks = null;
  if (main && (tocList || mobileToc)) {
    $$('h2, h3', main).forEach(function (h, i) {
      if (!h.id) h.id = 'h-' + i;
      var li = document.createElement('li');
      if (h.tagName === 'H3') li.classList.add('toc-h3');
      var a = document.createElement('a');
      a.href = '#' + h.id; a.textContent = h.textContent;
      li.appendChild(a); tocItems.push(h);
      if (tocList) tocList.appendChild(li.cloneNode(true));
      if (mobileToc) mobileToc.appendChild(li.cloneNode(true));
    });
    if (tocList && tocItems.length) tocLinks = $$('a', tocList);
  }
  if (tocLinks) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var pos = window.scrollY + 100, idx = 0;
        for (var i = 0; i < tocItems.length; i++) { if (tocItems[i].offsetTop <= pos) idx = i; }
        tocLinks.forEach(function (l) { l.classList.remove('active'); });
        if (tocLinks[idx]) tocLinks[idx].classList.add('active');
        ticking = false;
      });
    }, { passive: true });
  }

  // --- 搜索 ---
  var overlay = $('#search-overlay'), input = $('#search-input'), results = $('#search-results');
  var data = null, active = -1;
  function esc(s) { return (s || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function highlight(text, q) {
    var i = (text || '').toLowerCase().indexOf(q);
    if (!q || i === -1) return esc(text);
    return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length));
  }
  if (overlay && input) {
    var openSearch = function () {
      overlay.classList.add('active'); input.value = ''; results.innerHTML = ''; active = -1;
      document.body.style.overflow = 'hidden'; input.focus();
      if (!data) fetch('/search.json').then(function (r) { return r.json(); }).then(function (d) { data = d; }).catch(function () { data = []; });
    };
    var closeSearch = function () { overlay.classList.remove('active'); document.body.style.overflow = ''; };
    var setActive = function (n) {
      var links = $$('a', results);
      if (!links.length) return;
      active = (n + links.length) % links.length;
      links.forEach(function (l) { l.classList.remove('kb-active'); });
      links[active].classList.add('kb-active');
      links[active].scrollIntoView({ block: 'nearest' });
    };
    $$('.js-search-open').forEach(function (b) { b.addEventListener('click', openSearch); });
    $('#search-close').addEventListener('click', closeSearch);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeSearch(); });
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); return; }
      if (!overlay.classList.contains('active')) return;
      if (e.key === 'Escape') closeSearch();
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
      if (e.key === 'Enter') { var l = $$('a', results)[active]; if (l) window.location.href = l.getAttribute('href'); }
    });
    input.addEventListener('input', function () {
      if (!data) return;
      active = -1;
      var q = input.value.trim().toLowerCase();
      if (!q) { results.innerHTML = ''; return; }
      var hits = data.filter(function (it) {
        return ['title', 'summary', 'tags', 'icat', 'category'].some(function (k) { return (it[k] || '').toLowerCase().indexOf(q) !== -1; });
      }).slice(0, 30);
      if (!hits.length) { results.innerHTML = '<div class="no-results">未找到</div>'; return; }
      results.innerHTML = hits.map(function (m) {
        var meta = [m.icat || m.category, m.date].filter(Boolean).join(' · ');
        return '<a href="' + m.url + '"><div class="result-title">' + highlight(m.title, q) + '</div>' +
          '<div class="result-cat">' + esc(meta) + '</div>' +
          (m.summary ? '<div class="result-summary">' + highlight(m.summary, q) + '</div>' : '') + '</a>';
      }).join('');
    });
  }

  // --- 渐显 ---
  var fades = $$('.fade-in');
  if (fades.length && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { rootMargin: '0px 0px 80px 0px' });
    fades.forEach(function (el) { obs.observe(el); });
  } else { fades.forEach(function (el) { el.classList.add('visible'); }); }

  // --- 按 URL 锚点展开对应卡片（搜索 / 外链跳转） ---
  function openFromHash() {
    var id = decodeURIComponent((location.hash || '').replace(/^#/, ''));
    if (!id) return;
    var el = document.getElementById(id);
    if (!el || !el.matches('.item, .post-item, .feat')) return;
    if (overlay && overlay.classList.contains('active')) { overlay.classList.remove('active'); document.body.style.overflow = ''; }
    var anc = el.closest('.fade-in'); if (anc) anc.classList.add('visible');
    var day = el.closest('.day'); if (day) day.hidden = false;
    el.style.display = '';
    el.classList.add('open');
    var h = $('.item-title, .post-title, .feat-title', el);
    if (h) h.setAttribute('aria-expanded', 'true');
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  window.addEventListener('hashchange', openFromHash);
  setTimeout(openFromHash, 60);
});
