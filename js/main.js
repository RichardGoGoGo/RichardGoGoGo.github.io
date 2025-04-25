// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    let lastScroll = 0;
    const nav = document.querySelector('.top-nav');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let isScrolling = false;
    let scrollTimer;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // 导航栏显示/隐藏逻辑
        if (currentScroll <= 0) {
            nav.classList.remove('hidden');
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('hidden')) {
            // 向下滚动
            nav.classList.add('hidden');
        } else if (currentScroll < lastScroll && nav.classList.contains('hidden')) {
            // 向上滚动
            nav.classList.remove('hidden');
        }

        // 滚动指示器显示/隐藏逻辑
        if (currentScroll > 50) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }

        // 防抖处理
        clearTimeout(scrollTimer);
        isScrolling = true;
        scrollTimer = setTimeout(() => {
            isScrolling = false;
        }, 100);

        lastScroll = currentScroll;
    });

    // 折叠面板功能
    const collapsibles = document.querySelectorAll('.collapsible');
    collapsibles.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            // 使用classList来切换active类
            content.classList.toggle('active');
            
            // 更新按钮文本
            const span = this.querySelector('span');
            if (content.classList.contains('active')) {
                span.textContent = '点击收起';
            } else {
                span.textContent = '点击查看实践案例';
            }
        });
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 初始化 LazyLoad
    const lazyLoadInstance = lozad('.lazy', {
        rootMargin: '50px 0px',
        threshold: 0.1,
        loaded: function(el) {
            el.classList.add('loaded');
        }
    });
    lazyLoadInstance.observe();

    // 初始化 Quicklink
    quicklink.listen({
        timeout: 2000,
        priority: true,
        origins: [location.hostname]
    });

    // 优化图片加载
    document.querySelectorAll('img').forEach(img => {
        if (!img.classList.contains('lazy')) {
            img.classList.add('lazy');
            img.setAttribute('data-src', img.src);
            img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        }
    });

    // 轮播功能
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        const wrapper = carousel.querySelector('.carousel-wrapper');
        const content = carousel.querySelector('.carousel-content');
        const prevBtn = carousel.querySelector('.carousel-arrow.prev');
        const nextBtn = carousel.querySelector('.carousel-arrow.next');
        const items = carousel.querySelector('.team-grid, .feedback-grid');
        const isFeedback = carousel.closest('#feedback');
        
        let currentPosition = 0;
        let autoPlayTimer = null;
        let isUserInteracting = false;
        let isAnimating = false;
        
        // 计算单次移动距离和最大距离
        const moveDistance = wrapper.offsetWidth;
        const maxPosition = isFeedback ? -moveDistance : -(items.scrollWidth - wrapper.offsetWidth);
        
        // 使用 requestAnimationFrame 优化动画性能
        function updateCarousel() {
            if (isAnimating) return;
            isAnimating = true;
            
            requestAnimationFrame(() => {
                content.style.transform = `translateX(${currentPosition}px)`;
                isAnimating = false;
            });
        }
        
        // 更新箭头显示状态
        function updateArrows() {
            prevBtn.style.display = currentPosition < 0 ? 'flex' : 'none';
            nextBtn.style.display = currentPosition > maxPosition ? 'flex' : 'none';
        }
        
        // 自动轮播
        function startAutoPlay() {
            if (autoPlayTimer || !isFeedback) return;
            
            autoPlayTimer = setInterval(() => {
                if (!isUserInteracting && !isAnimating) {
                    if (currentPosition <= maxPosition) {
                        currentPosition = 0;
                    } else {
                        currentPosition -= moveDistance;
                    }
                    updateCarousel();
                    updateArrows();
                }
            }, 5000);
        }
        
        // 停止自动轮播
        function stopAutoPlay() {
            if (autoPlayTimer) {
                clearInterval(autoPlayTimer);
                autoPlayTimer = null;
            }
        }
        
        // 用户交互处理
        function handleUserInteraction() {
            if (isFeedback) {
                isUserInteracting = true;
                stopAutoPlay();
                
                setTimeout(() => {
                    isUserInteracting = false;
                    startAutoPlay();
                }, 3000);
            }
        }
        
        // 使用防抖优化点击事件
        const debounce = (fn, delay) => {
            let timer = null;
            return function() {
                if (timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    fn.apply(this, arguments);
                }, delay);
            };
        };
        
        // 上一张
        prevBtn.addEventListener('click', debounce(() => {
            if (isAnimating) return;
            handleUserInteraction();
            currentPosition = Math.min(currentPosition + moveDistance, 0);
            updateCarousel();
            updateArrows();
        }, 300));
        
        // 下一张
        nextBtn.addEventListener('click', debounce(() => {
            if (isAnimating) return;
            handleUserInteraction();
            currentPosition = Math.max(currentPosition - moveDistance, maxPosition);
            updateCarousel();
            updateArrows();
        }, 300));
        
        // 使用 ResizeObserver 优化窗口大小变化监听
        const resizeObserver = new ResizeObserver(debounce(() => {
            const newMoveDistance = wrapper.offsetWidth;
            const newMaxPosition = isFeedback ? -newMoveDistance : -(items.scrollWidth - wrapper.offsetWidth);
            
            currentPosition = Math.max(Math.min(currentPosition, 0), newMaxPosition);
            updateCarousel();
            updateArrows();
        }, 300));
        
        resizeObserver.observe(wrapper);
        
        // 初始化检查
        updateArrows();
        
        // 只有用户反馈部分启用自动轮播
        if (isFeedback) {
            startAutoPlay();
        }
    });

    // 引用格式展开/收起功能
    document.querySelectorAll('.citation-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.classList.toggle('active');
            this.textContent = content.classList.contains('active') ? '收起引用格式' : '查看引用格式';
        });
    });
}); 