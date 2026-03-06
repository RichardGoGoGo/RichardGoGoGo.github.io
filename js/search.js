document.addEventListener('DOMContentLoaded', function () {
  var searchBtn = document.getElementById('search-btn');
  var searchOverlay = document.getElementById('search-overlay');
  var searchInput = document.getElementById('search-input');
  var searchClose = document.getElementById('search-close');
  var searchResults = document.getElementById('search-results');
  var searchData = null;

  if (!searchBtn || !searchOverlay) return;

  function openSearch() {
    searchOverlay.classList.add('active');
    searchInput.value = '';
    searchInput.focus();
    searchResults.innerHTML = '';
    document.body.style.overflow = 'hidden';
  }

  function closeSearch() {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  searchBtn.addEventListener('click', openSearch);
  searchClose.addEventListener('click', closeSearch);

  searchOverlay.addEventListener('click', function (e) {
    if (e.target === searchOverlay) closeSearch();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSearch();
    // Ctrl/Cmd + K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  // Load search data
  fetch('/search.json')
    .then(function (res) { return res.json(); })
    .then(function (data) { searchData = data; })
    .catch(function () { searchData = []; });

  searchInput.addEventListener('input', function () {
    if (!searchData) return;

    var query = searchInput.value.trim().toLowerCase();
    if (!query) {
      searchResults.innerHTML = '';
      return;
    }

    var results = searchData.filter(function (item) {
      return item.title.toLowerCase().indexOf(query) !== -1 ||
             item.category.toLowerCase().indexOf(query) !== -1 ||
             item.section.toLowerCase().indexOf(query) !== -1;
    });

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="no-results">未找到匹配结果</div>';
      return;
    }

    searchResults.innerHTML = results.map(function (item) {
      return '<a class="search-result-item" href="' + item.url + '">' +
        '<div class="result-title">' + item.title + '</div>' +
        '<div class="result-category">' + item.section + ' / ' + item.category + '</div>' +
        '</a>';
    }).join('');
  });
});
