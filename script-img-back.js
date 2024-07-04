const canvas = document.getElementById('inkCanvas');
const ctx = canvas.getContext('2d');
let inkDrops = [];
let images = [];

const inkDropPositions = [
    { x: 0.2, y: 0.3 },
    { x: 0.4, y: 0.6 },
    { x: 0.6, y: 0.4 },
    { x: 0.8, y: 0.7 }
];

const imageUrls = [
    'images/1.jpg',
    'images/2.jpg',
    'images/3.jpg',
    'images/4.jpg'
];

const keyLastTriggerTime = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0
};

const TRIGGER_INTERVAL = 10000; // 10 seconds in milliseconds

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function init() {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('keydown', handleKeyPress);
    loadImages();
    animate();
}

function loadImages() {
    imageUrls.forEach((url, index) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            images[index] = createImageWithSoftEdges(img);
            console.log(`Image ${index + 1} loaded`);
        };
    });
}

function createImageWithSoftEdges(img) {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = img.width;
    tempCanvas.height = img.height;

    tempCtx.drawImage(img, 0, 0);

    const gradient = tempCtx.createRadialGradient(
        tempCanvas.width / 2, tempCanvas.height / 2, Math.min(tempCanvas.width, tempCanvas.height) * 0.3,
        tempCanvas.width / 2, tempCanvas.height / 2, Math.min(tempCanvas.width, tempCanvas.height) * 0.5
    );
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    tempCtx.globalCompositeOperation = 'destination-in';
    tempCtx.fillStyle = gradient;
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    return tempCanvas;
}

class InkLayer {
    constructor(maxSize, isFirstLayer) {
        this.maxSize = maxSize;
        this.size = isFirstLayer ? 0 : maxSize * 0.6; // Start larger for non-first layers
        this.alpha = 0;
        this.points = this.generatePoints();
        this.state = 'growing';
        this.lifespan = 0;
        this.growthRate = isFirstLayer ? 0.005 : 0.002; // Faster growth for first layer
    }

    generatePoints() {
        const points = [];
        const numPoints = 180;
        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            const radius = 1 + Math.random() * 0.2;
            points.push({
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                distortion: Math.random() * 0.05 + 0.02
            });
        }
        return points;
    }

    update(deltaTime) {
        this.lifespan += deltaTime;

        switch (this.state) {
            case 'growing':
                this.size += this.maxSize * this.growthRate;
                this.alpha = Math.min(this.alpha + 0.02, 0.3);
                if (this.size >= this.maxSize) {
                    this.size = this.maxSize;
                    this.state = 'stable';
                }
                break;
            case 'stable':
                if (this.lifespan > 3000) {
                    this.state = 'fading';
                }
                break;
            case 'fading':
                this.alpha = Math.max(this.alpha - 0.005, 0);
                break;
        }

        return this.alpha > 0;
    }
}

class InkDrop {
    constructor(x, y, imageIndex) {
        this.x = x;
        this.y = y;
        this.imageIndex = imageIndex;
        this.reset();
    }

    reset() {
        this.layers = [];
        this.imageAlpha = 0;
        this.state = 'active';
        this.fadeStartTime = null;
        this.imageAppearDelay = 1000;
        this.lastLayerAddTime = 0;
        this.hasFadedIn = false;
        this.isFadingOut = false;
    }

    addLayer(isFirstLayer = false) {
        const maxSize = Math.min(canvas.width, canvas.height) * 0.3;
        this.layers.push(new InkLayer(maxSize * (0.6 + Math.random() * 0.4), isFirstLayer));
    }

    update(currentTime, deltaTime) {
        if (this.state === 'active' && !this.isFadingOut) {
            if (this.layers.length === 0) {
                this.addLayer(true); // Add first layer
            } else if (currentTime - this.lastLayerAddTime > 500) {
                this.addLayer();
                this.lastLayerAddTime = currentTime;
            }

            if (this.imageAppearDelay > 0) {
                this.imageAppearDelay -= deltaTime;
            } else if (!this.hasFadedIn) {
                this.imageAlpha = Math.min(this.imageAlpha + deltaTime / 2000, 1);
                if (this.imageAlpha === 1) {
                    this.hasFadedIn = true;
                }
            }
        } else if (this.isFadingOut || this.state === 'fading') {
            if (this.fadeStartTime === null) {
                this.fadeStartTime = currentTime;
            }
            const fadeDuration = 2000; // 2 seconds to fade out
            const fadeProgress = (currentTime - this.fadeStartTime) / fadeDuration;
            this.imageAlpha = Math.max(1 - fadeProgress, 0);
            
            if (this.imageAlpha === 0) {
                this.state = 'fading';
                this.layers.forEach(layer => layer.state = 'fading');
            }
        }

        this.layers = this.layers.filter(layer => layer.update(deltaTime));

        return this.layers.length > 0 || this.imageAlpha > 0;
    }

    draw(time) {
        // Draw ink layers
        ctx.save();
        ctx.translate(this.x, this.y);

        this.layers.forEach(layer => {
            ctx.beginPath();
            layer.points.forEach((point, index) => {
                const distortion = Math.sin(time * 0.001 + index) * point.distortion;
                const x = point.x * (layer.size + distortion);
                const y = point.y * (layer.size + distortion);
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.closePath();

            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, layer.size);
            gradient.addColorStop(0, `rgba(0, 0, 0, 0)`);
            gradient.addColorStop(0.7, `rgba(0, 0, 0, ${layer.alpha * 0.5})`);
            gradient.addColorStop(1, `rgba(0, 0, 0, ${layer.alpha})`);
            
            ctx.fillStyle = gradient;
            ctx.fill();
        });

        ctx.restore();

        // Draw image on top of ink layers
        if (images[this.imageIndex] && this.imageAlpha > 0 && (this.state === 'active' || this.hasFadedIn)) {
            const img = images[this.imageIndex];
            
            // 使用固定的最大尺寸
            const maxSize = 300; // 设置最大尺寸，例如 300 像素
            const scale = Math.min(maxSize / img.width, maxSize / img.height);

            // 如果您想使用画布尺寸的百分比，请使用下面的代码替换上面的两行
            // const maxWidthPercentage = 0.3; // 例如，画布宽度的 30%
            // const maxHeightPercentage = 0.4; // 例如，画布高度的 40%
            // const scale = Math.min(
            //     (canvas.width * maxWidthPercentage) / img.width,
            //     (canvas.height * maxHeightPercentage) / img.height
            // );

            const width = img.width * scale;
            const height = img.height * scale;

            ctx.globalAlpha = this.imageAlpha;
            ctx.drawImage(img, this.x - width/2, this.y - height/2, width, height);
            ctx.globalAlpha = 1;
        }
    }

    fadeOut() {
        if (!this.isFadingOut) {
            this.isFadingOut = true;
            this.fadeStartTime = null;
        }
    }
}

function createInkDrop(index) {
    const pos = inkDropPositions[index];
    return new InkDrop(pos.x * canvas.width, pos.y * canvas.height, index);
}

function handleKeyPress(event) {
    const key = event.key;
    const currentTime = Date.now();
    if (['1', '2', '3', '4'].includes(key)) {
        if (currentTime - keyLastTriggerTime[key] > TRIGGER_INTERVAL) {
            keyLastTriggerTime[key] = currentTime;
            const newIndex = parseInt(key) - 1;
            
            let existingDrop = inkDrops.find(drop => drop.imageIndex === newIndex && drop.state === 'active');
            
            if (existingDrop) {
                // 如果存在相同索引的活跃墨滴，重置它
                existingDrop.reset();
            } else {
                // 创建新的墨滴
                inkDrops.push(createInkDrop(newIndex));
            }

            // 淡出所有其他墨滴
            inkDrops.forEach(drop => {
                if (drop.imageIndex !== newIndex || drop.state !== 'active') {
                    drop.fadeOut();
                }
            });
        }
    }
}

let lastTime = 0;
function animate(currentTime) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    inkDrops = inkDrops.filter(drop => drop.update(currentTime, deltaTime));

    inkDrops.forEach(drop => {
        drop.draw(currentTime);
    });

    requestAnimationFrame(animate);
}

init();