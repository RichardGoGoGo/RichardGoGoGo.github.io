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
        
        // 计算单次移动距离和最大距离
        const moveDistance = wrapper.offsetWidth;
        const maxPosition = isFeedback ? -moveDistance : -(items.scrollWidth - wrapper.offsetWidth);
        
        // 更新轮播位置
        function updateCarousel() {
            content.style.transform = `translateX(${currentPosition}px)`;
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
                if (!isUserInteracting) {
                    if (currentPosition <= maxPosition) {
                        currentPosition = 0;
                    } else {
                        currentPosition -= moveDistance;
                    }
                    updateCarousel();
                    updateArrows();
                }
            }, 5000); // 每5秒轮播一次
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
                
                // 3秒后恢复自动轮播
                setTimeout(() => {
                    isUserInteracting = false;
                    startAutoPlay();
                }, 3000);
            }
        }
        
        // 上一张
        prevBtn.addEventListener('click', () => {
            handleUserInteraction();
            currentPosition = Math.min(currentPosition + moveDistance, 0);
            updateCarousel();
            updateArrows();
        });
        
        // 下一张
        nextBtn.addEventListener('click', () => {
            handleUserInteraction();
            currentPosition = Math.max(currentPosition - moveDistance, maxPosition);
            updateCarousel();
            updateArrows();
        });
        
        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            // 重新计算移动距离和最大距离
            const newMoveDistance = wrapper.offsetWidth;
            const newMaxPosition = isFeedback ? -newMoveDistance : -(items.scrollWidth - wrapper.offsetWidth);
            
            // 调整当前位置
            currentPosition = Math.max(Math.min(currentPosition, 0), newMaxPosition);
            updateCarousel();
            updateArrows();
        });
        
        // 初始化检查
        updateArrows();
        
        // 只有用户反馈部分启用自动轮播
        if (isFeedback) {
            startAutoPlay();
        }
    });
}); 