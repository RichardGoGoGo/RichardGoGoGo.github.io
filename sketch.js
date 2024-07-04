let inkDrops = [];
let backgroundImage;

function setup() {
  createCanvas(1600, 900);
  // 设置背景色为淡米色，模仿宣纸
  background(245, 245, 220);
  
  // 创建一个占位的背景图像
  backgroundImage = createGraphics(width, height);
  backgroundImage.background(200);
  backgroundImage.textSize(32);
  backgroundImage.textAlign(CENTER, CENTER);
  backgroundImage.fill(100);
  backgroundImage.text("Your Image Will Appear Here", width/2, height/2);
}

function draw() {
  // 轻微调整背景色，模仿宣纸的纹理
  background(245 + random(-5, 5), 245 + random(-5, 5), 220 + random(-5, 5), 10);
  
  // 绘制背景图像
  tint(255, 150); // 设置透明度
  image(backgroundImage, 0, 0);
  noTint();

  // 更新和绘制所有墨滴
  for (let drop of inkDrops) {
    drop.update();
    drop.display();
  }
}

function mousePressed() {
  // 在鼠标点击位置添加新的墨滴
  inkDrops.push(new InkDrop(mouseX, mouseY));
}

class InkDrop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 0;
    this.maxSize = random(100, 300);
    this.growthRate = random(0.5, 2);
    this.alpha = 255;
    this.inkColor = color(0, 0, 0, this.alpha);
  }

  update() {
    if (this.size < this.maxSize) {
      this.size += this.growthRate;
    } else {
      this.alpha -= 0.5;
      this.inkColor = color(0, 0, 0, this.alpha);
    }
  }

  display() {
    noStroke();
    fill(this.inkColor);
    
    push();
    translate(this.x, this.y);
    
    // 创建不规则的墨滴形状
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.1) {
      let xoff = map(cos(a), -1, 1, 0, 3);
      let yoff = map(sin(a), -1, 1, 0, 3);
      let r = this.size + map(noise(xoff, yoff, frameCount * 0.01), 0, 1, -20, 20);
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(x, y);
    }
    endShape(CLOSE);

    // 添加一些细节
    for (let i = 0; i < 5; i++) {
      let angle = random(TWO_PI);
      let dist = random(this.size * 0.5);
      let x = dist * cos(angle);
      let y = dist * sin(angle);
      let detailSize = random(5, 15);
      ellipse(x, y, detailSize, detailSize);
    }

    pop();
  }
}

// 这个函数将被用来加载实际的图片
function preload() {
  // 在这里加载实际的图片
  // 例如：backgroundImage = loadImage('path/to/your/image.jpg');
}

// 这个函数可以用来切换显示的图片
function keyPressed() {
  if (key === 'i' || key === 'I') {
    // 切换图片可见性
    let currentAlpha = alpha(backgroundImage.get(width/2, height/2));
    if (currentAlpha < 128) {
      backgroundImage.background(200);
      backgroundImage.textSize(32);
      backgroundImage.textAlign(CENTER, CENTER);
      backgroundImage.fill(100);
      backgroundImage.text("Your Image Is Visible", width/2, height/2);
    } else {
      backgroundImage.background(200, 1); // 几乎完全透明
      backgroundImage.textSize(32);
      backgroundImage.textAlign(CENTER, CENTER);
      backgroundImage.fill(100, 1);
      backgroundImage.text("Your Image Is Hidden", width/2, height/2);
    }
  }
}