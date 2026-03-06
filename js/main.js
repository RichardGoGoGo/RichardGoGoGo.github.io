document.addEventListener('DOMContentLoaded', function() {
  // --- Nav scroll hide ---
  var nav = document.getElementById('site-nav');
  var lastY = window.scrollY;
  window.addEventListener('scroll', function() {
    if (window.scrollY > lastY && window.scrollY > 80) nav.classList.add('hidden');
    else nav.classList.remove('hidden');
    lastY = window.scrollY;
  });

  // --- Mobile menu ---
  var toggle = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function() {
      toggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
  }

  // --- TOC ---
  var tocList = document.getElementById('toc-list');
  var mobileToc = document.getElementById('mobile-toc-list');
  var main = document.querySelector('.main-content');
  if (main && (tocList || mobileToc)) {
    var headings = main.querySelectorAll('h2, h3');
    var items = [];
    headings.forEach(function(h, i) {
      if (!h.id) h.id = 'h-' + i;
      var li = document.createElement('li');
      if (h.tagName === 'H3') li.classList.add('toc-h3');
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      li.appendChild(a);
      items.push(h);
      if (tocList) tocList.appendChild(li.cloneNode(true));
      if (mobileToc) mobileToc.appendChild(li.cloneNode(true));
    });

    [tocList, mobileToc].forEach(function(list) {
      if (!list) return;
      list.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
          e.preventDefault();
          var t = document.getElementById(e.target.getAttribute('href').substring(1));
          if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    if (tocList && items.length) {
      var links = tocList.querySelectorAll('a');
      function updateToc() {
        var pos = window.scrollY + 100, idx = 0;
        for (var i = 0; i < items.length; i++) {
          if (items[i].offsetTop <= pos) idx = i;
        }
        links.forEach(function(l) { l.classList.remove('active'); });
        if (links[idx]) links[idx].classList.add('active');
      }
      window.addEventListener('scroll', updateToc);
      updateToc();
    }
  }

  // --- Search ---
  var searchBtn = document.getElementById('search-btn');
  var overlay = document.getElementById('search-overlay');
  var input = document.getElementById('search-input');
  var close = document.getElementById('search-close');
  var results = document.getElementById('search-results');
  var data = null;

  if (searchBtn && overlay) {
    function openSearch() {
      overlay.classList.add('active');
      input.value = '';
      input.focus();
      results.innerHTML = '';
      document.body.style.overflow = 'hidden';
    }
    function closeSearch() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    searchBtn.addEventListener('click', openSearch);
    close.addEventListener('click', closeSearch);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) closeSearch(); });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeSearch();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    });

    fetch('/search.json').then(function(r) { return r.json(); }).then(function(d) { data = d; }).catch(function() { data = []; });

    input.addEventListener('input', function() {
      if (!data) return;
      var q = input.value.trim().toLowerCase();
      if (!q) { results.innerHTML = ''; return; }
      var matches = data.filter(function(item) {
        return item.title.toLowerCase().indexOf(q) !== -1 ||
               (item.category && item.category.toLowerCase().indexOf(q) !== -1);
      });
      if (!matches.length) { results.innerHTML = '<div class="no-results">未找到</div>'; return; }
      results.innerHTML = matches.map(function(m) {
        return '<a href="' + m.url + '"><div class="result-title">' + m.title + '</div>' +
               '<div class="result-cat">' + (m.category || '') + '</div></a>';
      }).join('');
    });
  }

  // --- Fade in ---
  var fades = document.querySelectorAll('.fade-in');
  if (fades.length) {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    fades.forEach(function(el) { obs.observe(el); });
  }
});
