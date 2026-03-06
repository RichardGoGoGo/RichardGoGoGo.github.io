document.addEventListener('DOMContentLoaded', function () {
  // --- Navigation scroll behavior ---
  var nav = document.getElementById('site-nav');
  var lastScrollY = window.scrollY;

  window.addEventListener('scroll', function () {
    if (window.scrollY > lastScrollY && window.scrollY > 80) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
  });

  // --- Mobile menu toggle ---
  var navToggle = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
  }

  // --- TOC generation ---
  var tocList = document.getElementById('toc-list');
  var mobileTocList = document.getElementById('mobile-toc-list');

  if (tocList || mobileTocList) {
    var mainContent = document.querySelector('.main-content');
    if (mainContent) {
      var headings = mainContent.querySelectorAll('h2, h3');
      var tocItems = [];

      headings.forEach(function (heading, index) {
        if (!heading.id) {
          heading.id = 'heading-' + index;
        }

        var li = document.createElement('li');
        if (heading.tagName === 'H3') {
          li.classList.add('toc-h3');
        }

        var a = document.createElement('a');
        a.href = '#' + heading.id;
        a.textContent = heading.textContent;

        li.appendChild(a);
        tocItems.push({ heading: heading });

        if (tocList) tocList.appendChild(li.cloneNode(true));
        if (mobileTocList) mobileTocList.appendChild(li.cloneNode(true));
      });

      // Click handlers for smooth scroll
      [tocList, mobileTocList].forEach(function(list) {
        if (!list) return;
        list.addEventListener('click', function(e) {
          if (e.target.tagName === 'A') {
            e.preventDefault();
            var targetId = e.target.getAttribute('href').substring(1);
            var target = document.getElementById(targetId);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        });
      });

      // Active state on scroll
      if (tocList && tocItems.length > 0) {
        var tocLinks = tocList.querySelectorAll('a');

        function updateActiveToc() {
          var scrollPos = window.scrollY + 100;
          var activeIndex = 0;

          for (var i = 0; i < tocItems.length; i++) {
            if (tocItems[i].heading.offsetTop <= scrollPos) {
              activeIndex = i;
            }
          }

          tocLinks.forEach(function (link) { link.classList.remove('active'); });
          if (tocLinks[activeIndex]) {
            tocLinks[activeIndex].classList.add('active');
          }
        }

        window.addEventListener('scroll', updateActiveToc);
        updateActiveToc();
      }
    }
  }

  // --- Fade-in on scroll ---
  var fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  }
});
