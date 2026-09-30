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
  // 全部资讯里当天的 SKILL 评测收在 .skill-fold 折叠行：日计数只数资讯和征集，SKILL 数写在折叠行上；
  // 时间线带 .unfold（筛「SKILL」）时折叠行展开并隐藏行头，计数包含 SKILL
  function isHiddenCall(it) { return it.getAttribute('data-kind') === 'calls' && it.classList.contains('is-expired'); }
  function isShown(it) { return it.style.display !== 'none' && !isHiddenCall(it); }
  function refreshDays(root) {
    var total = 0, unfold = !!root && root.classList.contains('unfold');
    $$('.day', root).forEach(function (day) {
      var n = $$('.item', day).filter(isShown).length, folded = 0;
      $$('.skill-fold', day).forEach(function (f) {
        var k = $$('.item', f).filter(isShown).length;
        f.hidden = k === 0; folded += k;
        var fc = $('.fold-count', f);
        if (fc) fc.textContent = k;
      });
      day.hidden = n === 0;
      var c = $('.day-count', day), shown = unfold ? n : n - folded;
      if (c) c.textContent = shown ? shown + ' 条' : '';
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
      var b = e.target.closest('.tag-chip, .seg-btn');
      if (!b) return;
      $$('.tag-chip, .seg-btn', bar).forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
      var f = b.getAttribute('data-f');
      $$(itemSel).forEach(function (el) { el.style.display = test(el, f) ? '' : 'none'; });
      if (after) after();
    });
  }
  bindFilter('#feed-filter', '#timeline .item', function (it, f) {
    if (f === 'all') return true;
    if (f === 'first') return it.hasAttribute('data-first');
    if (f === 'c:赛展') return it.getAttribute('data-kind') === 'calls' || it.getAttribute('data-icat') === '赛展';
    if (f.indexOf('k:') === 0) return it.getAttribute('data-kind') === f.slice(2);
    if (f.indexOf('c:') === 0) return it.getAttribute('data-icat') === f.slice(2);
    return true;
  }, function () {
    var act = $('#feed-filter .seg-btn.active'), unfold = !!act && act.getAttribute('data-f') === 'k:skills';
    tl.classList.toggle('unfold', unfold);
    $$('.skill-fold', tl).forEach(function (f) { f.open = unfold; });
    var n = refreshDays(tl);
    var empty = $('#feed-empty');
    if (empty) empty.hidden = n > 0;
  });
  bindFilter('#calls-filter', '.cal-row', function (el, f) {
    return f === 'all' || el.getAttribute('data-ctype') === f;
  });
  // SKILL 库：主题 × 风险 筛选 + 排序（三者叠加）
  var sgrid = $('#skills-grid');
  if (sgrid) {
    var st = { t: 'all', r: 'all', s: 'date' };
    var applySkills = function () {
      var cells = $$('.skill-cell', sgrid), shown = 0;
      cells.forEach(function (el) {
        var ok = (st.t === 'all' || (' ' + el.getAttribute('data-theme') + ' ').indexOf(' ' + st.t + ' ') !== -1) &&
                 (st.r === 'all' || el.getAttribute('data-risk') === st.r);
        el.style.display = ok ? '' : 'none'; if (ok) shown++;
      });
      var key = { date: 'data-date', stars: 'data-stars', growth: 'data-growth' }[st.s];
      cells.sort(function (x, y) { return (+y.getAttribute(key) || 0) - (+x.getAttribute(key) || 0); })
        .forEach(function (el) { sgrid.appendChild(el); });
      $$('.theme-intro').forEach(function (p) { p.hidden = p.getAttribute('data-for') !== st.t; });
      var empty = $('#skills-empty'); if (empty) empty.hidden = shown > 0;
    };
    var bindSeg = function (sel, btnSel, attr, key) {
      var bar = $(sel); if (!bar) return;
      bar.addEventListener('click', function (e) {
        var b = e.target.closest(btnSel); if (!b) return;
        $$(btnSel, bar).forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active'); st[key] = b.getAttribute(attr); applySkills();
      });
    };
    bindSeg('#skills-theme', '.seg-btn', 'data-t', 't');
    bindSeg('#skills-risk', '.tag-chip', 'data-r', 'r');
    bindSeg('#skills-sort', '.tag-chip', 'data-s', 's');
  }

  bindFilter('#reports-filter', '.report-card', function (el, f) {
    return f === 'all' || el.getAttribute('data-kind') === f;
  });

  // --- 报刊（周报/月报）：版内跳转 / 期号卡点阵日历（日报切期逻辑保留，页面上没有日报时不生效） ---
  var pIndexEl = $('#paper-index'), pIndex = {};
  try { pIndex = pIndexEl ? JSON.parse(pIndexEl.textContent) : {}; } catch (e) {}
  var MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  function el(tag, cls, txt) { var n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function drawCal(box) {
    if (!box || box.getAttribute('data-done')) return;
    box.setAttribute('data-done', '1');
    var kind = box.getAttribute('data-kind'), cur = box.getAttribute('data-cur') || '';
    var head = el('div', 'cal-h'), grid = el('div', 'cal-g');
    if (kind === 'daily') {
      var days = pIndex.daily || [], y = +cur.slice(0, 4), m = +cur.slice(5, 7);
      var have = {}, cnt = 0;
      days.forEach(function (d) { have[d] = 1; if (d.slice(0, 7) === cur.slice(0, 7)) cnt++; });
      head.appendChild(el('b', null, MONTHS[m - 1])); head.appendChild(el('span', null, '本月 ' + cnt + ' 期'));
      grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
      '一二三四五六日'.split('').forEach(function (w) { grid.appendChild(el('span', 'cal-w', w)); });
      var first = new Date(y, m - 1, 1).getDay(), lead = (first + 6) % 7, total = new Date(y, m, 0).getDate();
      for (var i = 0; i < lead; i++) grid.appendChild(el('span'));
      for (var d = 1; d <= total; d++) {
        var key = y + '-' + pad(m) + '-' + pad(d), dot = el(have[key] ? 'button' : 'span', 'cal-d');
        if (have[key]) { dot.classList.add('has'); dot.title = m + '月' + d + '日'; dot.setAttribute('data-go', '#' + key); }
        if (key === cur) dot.classList.add('cur');
        grid.appendChild(dot);
      }
    } else {
      var list = pIndex[kind] || [], year = box.getAttribute('data-year'), map = {}, n2 = 0;
      list.forEach(function (x) { if (x.k.slice(0, 4) === year) { map[x.k] = x.u; n2++; } });
      head.appendChild(el('b', null, year)); head.appendChild(el('span', null, '全年 ' + n2 + ' 期'));
      var cols = kind === 'weekly' ? 13 : 6, count = kind === 'weekly' ? 52 : 12;
      grid.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
      for (var k = 1; k <= count; k++) {
        var key2 = kind === 'weekly' ? year + '-W' + pad(k) : year + '-' + pad(k), dot2 = el(map[key2] ? 'button' : 'span', 'cal-d');
        if (map[key2]) { dot2.classList.add('has'); dot2.title = kind === 'weekly' ? '第 ' + k + ' 周' : k + ' 月'; dot2.setAttribute('data-go', map[key2]); }
        if (key2 === cur) dot2.classList.add('cur');
        grid.appendChild(dot2);
      }
    }
    box.appendChild(head); box.appendChild(grid);
  }
  document.addEventListener('click', function (e) {
    var go = e.target.closest('.cal-d[data-go]');
    if (go) { var t = go.getAttribute('data-go'); if (t.charAt(0) === '#') location.hash = t; else location.href = t; return; }
    var j = e.target.closest('.js-jump');
    if (!j) return;
    var paper = j.closest('.paper'), id = (j.getAttribute('href') || '').slice(1), tgt = id && document.getElementById(id);
    if (!tgt) return;
    e.preventDefault();
    tgt.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (tgt.classList.contains('pi')) { tgt.classList.remove('flash-hi'); void tgt.offsetWidth; tgt.classList.add('flash-hi'); }
  });
  var dailyPapers = $$('.paper[data-issue]');
  function showIssue(key) {
    if (!dailyPapers.length) return;
    var hit = dailyPapers.filter(function (p) { return p.getAttribute('data-issue') === key; })[0] || dailyPapers[0];
    dailyPapers.forEach(function (p) { p.hidden = p !== hit; });
    var k = hit.getAttribute('data-issue');
    $$('.arch-recent .chip[data-issue]').forEach(function (c) { c.classList.toggle('on', c.getAttribute('data-issue') === k); });
    $$('.arch-item[data-issue]').forEach(function (a) {
      var on = a.getAttribute('data-issue') === k;
      a.classList.toggle('on', on);
      if (on) { var g = a.closest('details'); if (g) g.open = true; a.scrollIntoView({ block: 'nearest' }); }
    });
    drawCal($('.js-cal', hit));
    document.title = document.title.replace(/^[^·]*·/, (+k.slice(5, 7)) + '月' + (+k.slice(8, 10)) + '日 日报 ·');
  }
  if (dailyPapers.length) {
    var fromHash = function () { var h = decodeURIComponent(location.hash.slice(1)); if (/^\d{4}-\d{2}-\d{2}$/.test(h)) { showIssue(h); window.scrollTo(0, 0); } };
    window.addEventListener('hashchange', fromHash);
    if (/^#\d{4}-\d{2}-\d{2}$/.test(location.hash)) fromHash(); else showIssue(dailyPapers[0].getAttribute('data-issue'));
  } else {
    $$('.js-cal').forEach(drawCal);
  }

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
    var fold = el.closest('.skill-fold'); if (fold) { fold.hidden = false; fold.open = true; }
    el.style.display = '';
    el.classList.add('open');
    var h = $('.item-title, .post-title, .feat-title', el);
    if (h) h.setAttribute('aria-expanded', 'true');
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  window.addEventListener('hashchange', openFromHash);
  setTimeout(openFromHash, 60);
});
