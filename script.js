const canvas = document.getElementById('inkCanvas');
const ctx = canvas.getContext('2d');
let inkDrops = [];
let videos = [];

const inkDropPositions = [
    { x: 0.2, y: 0.3 },
    { x: 0.4, y: 0.6 },
    { x: 0.6, y: 0.4 },
    { x: 0.8, y: 0.7 }
];

const videoUrls = [
    'videos/1.mp4',
    'videos/2.mp4',
    'videos/3.mp4',
    'videos/4.mp4'
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
    loadVideos();
    animate();
}

function loadVideos() {
    videoUrls.forEach((url, index) => {
        const video = document.createElement('video');
        video.src = url;
        video.loop = true;
        video.preload = 'auto';
        video.addEventListener('loadedmetadata', () => {
            console.log(`Video ${index + 1} loaded`);
        });
        videos[index] = video;
    });
}

class InkLayer {
    constructor(maxSize, isFirstLayer) {
        this.maxSize = maxSize;
        this.size = isFirstLayer ? 0 : maxSize * 0.6;
        this.alpha = 0;
        this.points = this.generatePoints();
        this.state = 'growing';
        this.lifespan = 0;
        this.growthRate = isFirstLayer ? 0.005 : 0.002;
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
    constructor(x, y, videoIndex) {
        this.x = x;
        this.y = y;
        this.videoIndex = videoIndex;
        this.reset();
    }

    reset() {
        this.layers = [];
        this.videoAlpha = 0;
        this.audioVolume = 0;
        this.state = 'active';
        this.fadeStartTime = null;
        this.videoAppearDelay = 100;
        this.lastLayerAddTime = 0;
        this.hasFadedIn = false;
        this.isFadingOut = false;
        if (videos[this.videoIndex]) {
            videos[this.videoIndex].currentTime = 0;
            videos[this.videoIndex].volume = 0;
            videos[this.videoIndex].play().then(() => {
                videos[this.videoIndex].muted = false;
            }).catch(error => {
                console.log("Video playback failed:", error);
            });
        }
    }

    addLayer(isFirstLayer = false) {
        const maxSize = Math.min(canvas.width, canvas.height) * 0.3;
        this.layers.push(new InkLayer(maxSize * (0.6 + Math.random() * 0.4), isFirstLayer));
    }

    update(currentTime, deltaTime) {
        if (this.state === 'active' && !this.isFadingOut) {
            if (this.layers.length === 0) {
                this.addLayer(true);
            } else if (currentTime - this.lastLayerAddTime > 500) {
                this.addLayer();
                this.lastLayerAddTime = currentTime;
            }

            if (this.videoAppearDelay > 0) {
                this.videoAppearDelay -= deltaTime;
            } else if (!this.hasFadedIn) {
                this.videoAlpha = Math.min(this.videoAlpha + deltaTime / 2000, 1);
                this.audioVolume = Math.min(this.audioVolume + deltaTime / 2000, 1);
                if (this.videoAlpha === 1) {
                    this.hasFadedIn = true;
                }
            }
        } else if (this.isFadingOut || this.state === 'fading') {
            if (this.fadeStartTime === null) {
                this.fadeStartTime = currentTime;
            }
            const fadeDuration = 2000;
            const fadeProgress = (currentTime - this.fadeStartTime) / fadeDuration;
            this.videoAlpha = Math.max(1 - fadeProgress, 0);
            this.audioVolume = Math.max(1 - fadeProgress, 0);
            
            if (this.videoAlpha === 0) {
                this.state = 'fading';
                if (videos[this.videoIndex]) {
                    videos[this.videoIndex].pause();
                }
            }
        }

        if (videos[this.videoIndex]) {
            videos[this.videoIndex].volume = this.audioVolume;
        }

        this.layers = this.layers.filter(layer => layer.update(deltaTime));

        return this.layers.length > 0 || this.videoAlpha > 0;
    }

    draw(time) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // Draw ink layers
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

        // Draw video with mask
        if (videos[this.videoIndex] && this.videoAlpha > 0 && (this.state === 'active' || this.hasFadedIn)) {
            const video = videos[this.videoIndex];
            
            const maxSize = 800;
            const scale = Math.min(maxSize / video.videoWidth, maxSize / video.videoHeight);
            const width = video.videoWidth * scale;
            const height = video.videoHeight * scale;

            // Create clipping path
            ctx.beginPath();
            this.layers[this.layers.length - 1].points.forEach((point, index) => {
                const x = point.x * this.layers[this.layers.length - 1].size;
                const y = point.y * this.layers[this.layers.length - 1].size;
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.closePath();
            ctx.clip();

            ctx.globalAlpha = this.videoAlpha;
            ctx.drawImage(video, -width/2, -height/2, width, height);
        }

        ctx.restore();
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
            
            let existingDrop = inkDrops.find(drop => drop.videoIndex === newIndex && drop.state === 'active');
            
            if (existingDrop) {
                existingDrop.reset();
            } else {
                inkDrops.push(createInkDrop(newIndex));
            }

            inkDrops.forEach(drop => {
                if (drop.videoIndex !== newIndex || drop.state !== 'active') {
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