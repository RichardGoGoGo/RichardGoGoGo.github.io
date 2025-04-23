class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-rain');
        this.ctx = this.canvas.getContext('2d');
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        this.fontSize = 20;
        this.columns = 0;
        this.drops = [];
        this.speeds = [];
        this.brightness = [];
        
        this.init();
        this.animate();
        window.addEventListener('resize', () => this.init());
    }

    init() {
        // 设置canvas为全屏
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '1';
        this.canvas.style.pointerEvents = 'none';
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / (this.fontSize * 1.5));
        
        // 初始化每列的速度和亮度
        this.drops = Array(this.columns).fill(1);
        this.speeds = Array(this.columns).fill(0).map(() => Math.random() * 0.3 + 0.2);
        this.brightness = Array(this.columns).fill(0).map(() => Math.random() * 0.5 + 0.5);
    }

    draw() {
        // 创建渐变背景
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 设置文字样式
        this.ctx.font = `bold ${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            // 随机选择字符
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            
            // 计算亮度和颜色
            const brightness = this.brightness[i];
            // 使用更亮的金色
            const color = `rgba(255, ${Math.floor(215 * brightness)}, 0, ${brightness * 0.8})`;
            this.ctx.fillStyle = color;
            
            // 绘制字符
            const x = i * (this.fontSize * 1.5);
            const y = this.drops[i] * this.fontSize;
            
            // 添加发光效果
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = color;
            this.ctx.fillText(text, x, y);
            
            // 重置阴影
            this.ctx.shadowBlur = 0;
            
            // 更新位置
            this.drops[i] += this.speeds[i];
            
            // 重置位置
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
                this.speeds[i] = Math.random() * 0.3 + 0.2;
                this.brightness[i] = Math.random() * 0.5 + 0.5;
            }
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// 等待DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new MatrixRain();
}); 