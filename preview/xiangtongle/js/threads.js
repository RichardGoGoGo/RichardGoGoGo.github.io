/* 创域认知官网 · 线团叙事系统 v6
 * - 走线纪律：连接段一律走内容列外侧的"通道"，绝不横穿文字与卡片
 * - 蛇形按"行"推进：同一行内沿基线连续画过（含间隙），换行走外侧通道，方向自动交替
 * - 每幕抽走 3 根线，终幕球近乎抽空；中心显现线绘灯泡（灯丝是一个解开的小结）
 * - 进度环整体减淡，让位给引导线
 */
(() => {
  const canvas = document.getElementById('threads');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2);

  const ink = '#232838';
  const accent = '#D6452C';
  const rule = '#d8d0bf';
  const clamp01 = v => Math.min(1, Math.max(0, v));
  const lerp = (a,b,u) => a + (b-a)*u;

  const sections = [...document.querySelectorAll('main section')];
  const N = sections.length;
  const G = 3;
  let active = 0;
  let ballIn = 0, untangle = 0, pull = 0, pulledIdx = -1;
  let extract = null;
  let snakeP = 0, snakeTarget = 0;
  let t = 0, frames = 0;

  const M = 20, K = 110;
  let ball = [];
  let C = {x:0, y:0, R:120, R0:120, a:0.07};

  function randUnit(){
    let v, l;
    do { v = [Math.random()*2-1, Math.random()*2-1, Math.random()*2-1]; l = Math.hypot(...v); } while(l<0.01||l>1);
    return [v[0]/l, v[1]/l, v[2]/l];
  }
  function norm(v){ const l = Math.hypot(...v)||1; return [v[0]/l, v[1]/l, v[2]/l]; }

  function buildBall(){
    ball = [];
    for (let j=0;j<M;j++){
      const rand = [];
      let u = randUnit();
      let r = 0.55 + Math.random()*0.45;
      for (let k=0;k<K;k++){
        rand.push([u[0]*r, u[1]*r, u[2]*r]);
        const d = randUnit();
        u = norm([u[0]+d[0]*0.32, u[1]+d[1]*0.32, u[2]+d[2]*0.32]);
        r = Math.min(1, Math.max(0.45, r + (Math.random()-0.5)*0.14));
      }
      const phi = lerp(-1.05, 1.05, j/(M-1));
      const ord = [];
      const off = (j%2) * Math.PI;
      for (let k=0;k<K;k++){
        const th = off + (k/K) * Math.PI * 2;
        ord.push([Math.cos(phi)*Math.cos(th), Math.sin(phi), Math.cos(phi)*Math.sin(th)]);
      }
      ball.push({rand, ord, seed: Math.random()});
    }
  }

  const SCENE_BALL = [
    {x:0.80, y:0.42, r:1.30, a:0.07},
    {x:0.72, y:0.52, r:1.00, a:0.36},
    {x:0.20, y:0.55, r:0.80, a:0.32},
    {x:0.84, y:0.34, r:0.68, a:0.30},
    {x:0.84, y:0.36, r:0.66, a:0.28},   // 05 球抬高：缠绕高于标题落线起点
    {x:0.70, y:0.50, r:1.05, a:0.40},
  ];
  function sceneBallTarget(){
    const narrow = W < 900;
    const s = SCENE_BALL[Math.min(active, SCENE_BALL.length-1)];
    if (narrow) return {x: W*0.5, y: active === 0 ? H*0.30 : H*0.26, R: C.R0*(active===0?1.1:0.75), a: s.a};
    return {x: W*s.x, y: H*s.y, R: C.R0*s.r, a: s.a};
  }

  const SCENE_ITEMS = [
    null,
    {sel:'.chain li', anchor(el){ const r = el.getBoundingClientRect(); return {kind:'seg', x0:r.left, x1:r.right, y:r.bottom-1}; }},
    {sel:'.entries span', anchor(el){ const r = el.getBoundingClientRect(); return {kind:'seg', x0:r.left, x1:r.right, y:r.bottom+4}; }},
    {sel:'.tag', anchor(el){ const r = el.getBoundingClientRect(); return {kind:'pt', x:r.left+r.width/2, y:r.top-28}; }},
    {sel:'.member', anchor(el){
      const a = el.querySelector('h3') || el;
      const r = a.getBoundingClientRect(); return {kind:'seg', x0:r.left, x1:r.right, y:r.bottom+3}; }},
    {sel:'.contact-row a', anchor(el){ const r = el.getBoundingClientRect(); return {kind:'seg', x0:r.left, x1:r.right, y:r.bottom+6}; }},
  ];
  function sceneEls(){
    const cfg = SCENE_ITEMS[active];
    if (!cfg) return [];
    return [...sections[active].querySelectorAll(cfg.sel)]
      .filter(el => { const r = el.getBoundingClientRect(); return r.width > 2 && r.height > 2; });
  }
  // 按行分组 + 行内按 x 排序（蛇形的骨架）
  function sceneRows(){
    const cfg = SCENE_ITEMS[active];
    if (!cfg) return [];
    // sceneEls 已过滤隐藏元素（产品子翻页/六步展开时，只对可见项走线）
    const list = sceneEls().map(el => ({el, a: cfg.anchor(el)}));
    list.sort((p,q) => p.a.y - q.a.y);
    const rows = [];
    for (const it of list){
      const row = rows.find(r => Math.abs(r.y - it.a.y) < 24);
      if (row) row.items.push(it);
      else rows.push({y: it.a.y, items:[it]});
    }
    const ax = it => it.a.kind === 'pt' ? it.a.x : (it.a.x0 + it.a.x1)/2;
    rows.forEach(r => r.items.sort((p,q) => ax(p) - ax(q)));
    return rows;
  }
  // 蛇形起点＝落线自由端（与 buildSnake 一致，hover 定位才不会错位）
  function snakeStartPoint(){
    const rect = landingRect();
    if (!rect) return null;
    const ballLeft = C.x < rect.left + rect.width/2;
    return {x: ballLeft ? rect.right : rect.left, y: rect.top + rect.height/2};
  }
  // 蛇形顺序（供 hover 定位与 marks 对应）
  function snakeOrder(){
    const rows = sceneRows();
    const start = snakeStartPoint();
    const order = [];
    let px = start ? start.x : -1e9;
    for (const row of rows){
      const cx = row.items.reduce((s,it)=>s+((it.a.kind==='pt'?it.a.x:(it.a.x0+it.a.x1)/2)),0)/row.items.length;
      const fromRight = px > cx;
      const seq = fromRight ? row.items.slice().reverse() : row.items;
      order.push(...seq.map(it => it.el));
      const last = seq[seq.length-1].a;
      px = last.kind === 'pt' ? last.x : (fromRight ? last.x0 : last.x1);
    }
    return order;
  }

  function resize(){
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W*DPR; canvas.height = H*DPR;
    canvas.style.width = W+'px'; canvas.style.height = H+'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
    const narrow = W < 900;
    C.R0 = narrow ? Math.min(W*0.30, 150) : Math.min(W*0.15, H*0.30, 235);
    if (!ball.length){ C.x = W*0.8; C.y = H*0.42; C.R = C.R0*1.3; buildBall(); }
  }

  function project(v, yaw){
    const x = v[0]*Math.cos(yaw) + v[2]*Math.sin(yaw);
    const z = -v[0]*Math.sin(yaw) + v[2]*Math.cos(yaw);
    const y = v[1];
    const tilt = 0.35;
    return {
      x: C.x + C.R * x,
      y: C.y + C.R * (y*Math.cos(tilt) + z*Math.sin(tilt)*0.4),
      d: z,
    };
  }

  function step(){
    t += 1;
    ballIn += ((active >= 1 ? 1 : 0) - ballIn) * 0.05;
    untangle += ((N > 2 ? clamp01((active-1)/(N-2)) : 0) - untangle) * 0.04;
    pull += ((active >= 1 ? 1 : 0) - pull) * 0.045;
    snakeP += (snakeTarget - snakeP) * 0.085;
    if (extract){
      extract.p += 0.02;
      if (extract.p >= 1 + G*0.12) extract = null;
    }
    const tg = sceneBallTarget();
    C.x += (tg.x - C.x) * 0.055;
    C.y += (tg.y - C.y) * 0.055;
    C.R += (tg.R - C.R) * 0.055;
    C.a += (tg.a - C.a) * 0.05;
  }

  function landingRect(){
    if (active < 1) return null;
    const el = sections[active].querySelector('.thread-landing');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    if (r.width < 4) return null;
    return r;
  }
  function contentRect(){
    const el = sections[active].querySelector('.content-col');
    return el ? el.getBoundingClientRect() : {left: W*0.06, right: W*0.6};
  }
  function extractedSet(){
    const s = new Set();
    for (let sc=1; sc<active; sc++) for (let q=0;q<G;q++) s.add((sc-1)*G + q);
    return s;
  }

  function smoothPath(pts, from=0, to=Infinity){
    const n = Math.min(pts.length, to);
    if (n - from < 2) return false;
    ctx.beginPath();
    ctx.moveTo(pts[from].x, pts[from].y);
    for (let i=from+1; i<n-1; i++){
      const xc = (pts[i].x + pts[i+1].x)/2;
      const yc = (pts[i].y + pts[i+1].y)/2;
      ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
    }
    ctx.lineTo(pts[n-1].x, pts[n-1].y);
    return true;
  }
  function sampleBezier(p0, c1, c2, p1, n){
    const out = [];
    for (let i=1;i<=n;i++){
      const s = i/n, is = 1-s;
      out.push({
        x: is*is*is*p0.x + 3*is*is*s*c1.x + 3*is*s*s*c2.x + s*s*s*p1.x,
        y: is*is*is*p0.y + 3*is*is*s*c1.y + 3*is*s*s*c2.y + s*s*s*p1.y,
      });
    }
    return out;
  }
  function lineSamples(p0, p1, n){
    const out = [];
    for (let i=1;i<=n;i++) out.push({x: lerp(p0.x,p1.x,i/n), y: lerp(p0.y,p1.y,i/n)});
    return out;
  }

  // 蛇形路径：起点 → （外侧通道）→ 各行依次划过；marks 对应蛇形顺序里的每个元素
  function buildSnake(start){
    const rows = sceneRows();
    if (!rows.length) return null;
    const col = contentRect();
    const chL = Math.max(col.left - 34, 8);
    const chR = Math.min(col.right + 18, W - 8);
    const pts = [];
    const marks = [0];
    let prev = start;
    for (const row of rows){
      const cx = row.items.reduce((s,it)=>s+((it.a.kind==='pt'?it.a.x:(it.a.x0+it.a.x1)/2)),0)/row.items.length;
      const fromRight = prev.x > cx;
      const seq = fromRight ? row.items.slice().reverse() : row.items;
      const fa = seq[0].a;
      const entry = fa.kind === 'pt'
        ? {x: fa.x, y: fa.y}
        : {x: fromRight ? fa.x1 : fa.x0, y: fa.y};
      // 换行：走外侧通道垂降，绝不横穿内容（采样加密，配合小数线头更顺滑）
      if (Math.abs(prev.y - entry.y) > 34){
        const chX = fromRight ? chR : chL;
        pts.push(...sampleBezier(prev, {x: chX, y: prev.y}, {x: chX, y: entry.y}, entry, 24));
      } else {
        pts.push(...lineSamples(prev, entry, 10));
      }
      prev = entry;
      for (const it of seq){
        const a = it.a;
        if (a.kind === 'seg'){
          const sx = fromRight ? a.x1 : a.x0;
          const ex = fromRight ? a.x0 : a.x1;
          if (Math.abs(prev.x - sx) > 2 || Math.abs(prev.y - a.y) > 2)
            pts.push(...lineSamples(prev, {x: sx, y: a.y}, 6));   // 行内间隙：沿同一基线滑过
          pts.push(...lineSamples({x: sx, y: a.y}, {x: ex, y: a.y}, 14));
          prev = {x: ex, y: a.y};
        } else {
          if (Math.abs(prev.x - a.x) > 2 || Math.abs(prev.y - a.y) > 2)
            pts.push(...sampleBezier(prev,                          // 挂点之间：弧线垂落
              {x: prev.x, y: prev.y + (a.y - prev.y)*0.4},
              {x: a.x, y: a.y - 30},
              {x: a.x, y: a.y}, 20));
          prev = {x: a.x, y: a.y};
        }
        marks.push(pts.length);
      }
    }
    return {pts, marks};
  }

  // ---- 终幕图标：线绘灯泡，灯丝是一个解开的小结 ----
  function drawIcon(alpha){
    const cx = C.x, cy = C.y, s = C.R;
    ctx.save();
    ctx.strokeStyle = accent;
    ctx.lineCap = 'round';
    // 虚线轨道环（缓慢旋转）
    ctx.globalAlpha = alpha * 0.45;
    ctx.setLineDash([4, 8]);
    ctx.lineDashOffset = -t * 0.25;
    ctx.beginPath();
    ctx.arc(cx, cy, s*0.46, 0, Math.PI*2);
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.setLineDash([]);
    // 灯泡轮廓
    const bR = s*0.185;
    const by = cy - s*0.05;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(cx, by, bR, Math.PI*0.86, Math.PI*0.14, false);
    ctx.lineWidth = 1.9;
    ctx.stroke();
    // 灯颈两侧 + 底座两道
    const nY = by + bR*0.92, nW = bR*0.42;
    ctx.beginPath(); ctx.moveTo(cx-nW, nY-6); ctx.lineTo(cx-nW, nY+7); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx+nW, nY-6); ctx.lineTo(cx+nW, nY+7); ctx.stroke();
    ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(cx-nW*0.9, nY+11); ctx.lineTo(cx+nW*0.9, nY+11); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx-nW*0.6, nY+16); ctx.lineTo(cx+nW*0.6, nY+16); ctx.stroke();
    // 灯丝：一段解开的小结（微微呼吸）
    const g = 0.75 + 0.25*Math.sin(t*0.05);
    ctx.globalAlpha = alpha * g;
    ctx.lineWidth = 1.7;
    const fy = by + bR*0.25;
    ctx.beginPath();
    ctx.moveTo(cx - nW, nY - 6);
    ctx.bezierCurveTo(cx - bR*0.55, fy + bR*0.35, cx - bR*0.15, fy - bR*0.75, cx + bR*0.12, fy - bR*0.15);
    ctx.bezierCurveTo(cx + bR*0.38, fy + bR*0.45, cx - bR*0.28, fy + bR*0.42, cx + bR*0.02, fy - bR*0.62);
    ctx.bezierCurveTo(cx + bR*0.3, fy - bR*1.05, cx + bR*0.6, fy - bR*0.2, cx + nW, nY - 6);
    ctx.stroke();
    // 顶部五道弧形短射线（呼吸伸缩）
    ctx.globalAlpha = alpha;
    for (let i=0;i<5;i++){
      const a0 = -Math.PI*0.82 + i*(Math.PI*0.64/4);
      const pulse = Math.sin(t*0.05 + i*1.1) * 0.03;
      const r1 = bR*1.5 + s*pulse, r2 = bR*2.05 + s*pulse*2;
      const mx = cx + Math.cos(a0+0.09)*(r1+r2)/2;
      const my = by + Math.sin(a0+0.09)*(r1+r2)/2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a0)*r1, by + Math.sin(a0)*r1);
      ctx.quadraticCurveTo(mx, my, cx + Math.cos(a0)*r2, by + Math.sin(a0)*r2);
      ctx.lineWidth = 1.7;
      ctx.stroke();
    }
    ctx.restore();
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    if (C.a < 0.01) { frames++; return; }
    const yaw = t * 0.0028;
    pulledIdx = active >= 1 ? (active - 1) * G : -1;
    const gone = extractedSet();

    const iconA = clamp01((untangle - 0.72) / 0.28) * clamp01(C.a * 3);
    if (iconA > 0.01) drawIcon(iconA);

    // ---- 球内线 ----
    const SEG = 6;
    for (let j=0;j<M;j++){
      const isPulled = j === pulledIdx;
      const inExtract = extract && j >= extract.base && j < extract.base + G;
      if (isPulled && !inExtract) continue;
      if (gone.has(j) && !inExtract) continue;
      const th = ball[j];
      const u = clamp01(untangle);
      const ep = inExtract ? clamp01(extract.p - (j - extract.base)*0.12) : 0;
      if (inExtract && ep >= 1) continue;
      const grow = 1 + ep * 1.1;
      const fade = 1 - ep;
      const pts = [];
      for (let k=0;k<K;k++){
        const a = th.rand[k], b = th.ord[k];
        const p = project([lerp(a[0],b[0],u), lerp(a[1],b[1],u), lerp(a[2],b[2],u)], yaw);
        pts.push({x: C.x + (p.x-C.x)*grow, y: C.y + (p.y-C.y)*grow, d: p.d});
      }
      for (let k=0;k<K-1;k+=SEG){
        const end = Math.min(k+SEG+1, K);
        let dm = 0;
        for (let q=k;q<end;q++) dm += pts[q].d;
        dm /= (end-k);
        const depth = (dm + 1) / 2;
        smoothPath(pts, k, end);
        if (inExtract){
          ctx.strokeStyle = accent;
          ctx.globalAlpha = Math.min(0.95, C.a*3) * (0.5 + 0.5*depth) * fade;
          ctx.lineWidth = 1.6 + 1.0*depth;
        } else {
          ctx.strokeStyle = ink;
          ctx.globalAlpha = C.a * (0.35 + 0.65*depth) * (0.6 + 0.4*th.seed);
          ctx.lineWidth = 0.9 + 1.1*depth;
        }
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    // ---- 当前这根线：缠绕 → 外侧通道荡出 → 落线 → 蛇形 ----
    const rect = landingRect();
    if (rect && pulledIdx >= 0 && pull > 0.02 && !(extract && pulledIdx >= extract.base && pulledIdx < extract.base + G)){
      const th = ball[pulledIdx];
      const u = clamp01(untangle);
      const itemCount = sceneEls().length;
      const snakeFrac = itemCount ? clamp01(snakeP / itemCount) : 0;
      const coilEnd = Math.max(8, K - Math.round(26 + snakeFrac*(K-38)));
      const coil = [];
      for (let k=0;k<coilEnd;k++){
        const a = th.rand[k], b = th.ord[k];
        const p = project([lerp(a[0],b[0],u), lerp(a[1],b[1],u), lerp(a[2],b[2],u)], yaw);
        coil.push({x:p.x, y:p.y});
      }
      const exitP = coil[coil.length-1];
      const ly = rect.top + rect.height/2;
      const ballLeft = C.x < rect.left + rect.width/2;
      const nearX = ballLeft ? rect.left : rect.right;
      const dirX = ballLeft ? 1 : -1;
      const reach = clamp01(pull*1.15);
      const farX = nearX + dirX * rect.width * reach;
      // 荡出段走球侧通道垂直逼近落线高度，再水平接入——不横穿文字
      const chX = ballLeft ? Math.max(nearX - 44, 8) : Math.min(nearX + 44, W - 8);
      const swing = sampleBezier(exitP,
        {x: chX, y: exitP.y},
        {x: chX, y: ly},
        {x: nearX, y: ly}, 26);
      const flat = [];
      for (let i=1;i<=8;i++) flat.push({x: lerp(nearX, farX, i/8), y: ly});
      const full = coil.concat(swing, flat);
      smoothPath(full);
      ctx.strokeStyle = accent;
      ctx.globalAlpha = Math.min(0.92, C.a*3);
      ctx.lineWidth = 2.1;
      ctx.lineCap = 'round';
      ctx.stroke();

      let tip = {x: farX, y: ly};
      if (snakeP > 0.02 && reach > 0.9){
        const snake = buildSnake({x: farX, y: ly});
        if (snake){
          const count = snake.marks.length - 1;
          const i0 = Math.min(Math.floor(snakeP), count);
          const fracIn = clamp01(snakeP - i0);
          // 小数级绘制长度 + 末端插值点：线头连续滑动，无逐点跳跃的卡顿
          const drawnF = i0 >= count
            ? snake.marks[count]
            : lerp(snake.marks[i0], snake.marks[i0+1], fracIn);
          const di = Math.min(Math.floor(drawnF), snake.pts.length);
          if (di >= 2){
            const arr = snake.pts.slice(0, di);
            if (di < snake.pts.length){
              const fr = drawnF - di;
              const a = snake.pts[di-1], b = snake.pts[di];
              arr.push({x: lerp(a.x, b.x, fr), y: lerp(a.y, b.y, fr)});
            }
            if (smoothPath(arr)){
              ctx.globalAlpha = 0.85;
              ctx.lineWidth = 1.7;
              ctx.stroke();
              tip = arr[arr.length - 1];
            }
          }
        }
      }
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 3.2, 0, Math.PI*2);
      ctx.fillStyle = accent;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // ---- 进度环（减淡，让位给引导线） ----
    const rr = C.R + 30;
    ctx.beginPath();
    ctx.arc(C.x, C.y, rr, 0, Math.PI*2);
    ctx.strokeStyle = rule;
    ctx.globalAlpha = 0.38 * ballIn;
    ctx.lineWidth = 1;
    ctx.stroke();
    const prog = N > 2 ? clamp01((active-1)/(N-2)) : 0;
    ctx.beginPath();
    ctx.arc(C.x, C.y, rr, -Math.PI/2, -Math.PI/2 + prog*Math.PI*2);
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.42 * ballIn;
    ctx.lineWidth = 1.4;
    ctx.stroke();
    for (let s=1;s<N;s++){
      const ang = -Math.PI/2 + ((s-1)/(N-2)) * Math.PI*2;
      ctx.beginPath();
      ctx.arc(C.x + Math.cos(ang)*rr, C.y + Math.sin(ang)*rr, s === active ? 4.4 : 2.6, 0, Math.PI*2);
      ctx.fillStyle = s <= active ? accent : rule;
      ctx.globalAlpha = 0.7 * ballIn;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    frames++;
  }

  function loop(){ step(); draw(); frames && 0; requestAnimationFrame(loop); }

  let prevActive = 0;
  window.addEventListener('scene', e => {
    const next = e.detail.index;
    if (e.detail.dir > 0 && prevActive >= 1){
      extract = {base: (prevActive-1)*G, p: 0};
    }
    prevActive = next;
    active = next;
    pull = Math.min(pull, 0.25);
    snakeP = 0; snakeTarget = 0;
    document.body.classList.toggle('ball-live', active >= 1);
    const fin = document.querySelector('.final');
    if (fin) fin.classList.toggle('done', active === N-1);
  });

  // 子翻页（产品切换）：重置抽线
  window.addEventListener('subpage', () => { snakeP = 0; snakeTarget = 0; });

  const ALL_HOVER = SCENE_ITEMS.filter(Boolean).map(c => c.sel).join(', ');
  document.querySelectorAll(ALL_HOVER).forEach(el => {
    el.addEventListener('mouseenter', () => {
      const cfg = SCENE_ITEMS[active];
      if (!cfg || !el.matches(cfg.sel) || !sections[active].contains(el)) return;
      const idx = snakeOrder().indexOf(el);
      if (idx >= 0) snakeTarget = idx + 1;
    });
    el.addEventListener('mouseleave', () => { snakeTarget = 0; });
  });

  window.__threads = {
    step(n=60){ for(let i=0;i<n;i++){ step(); } draw(); return this.state(); },
    setSnake(v){ snakeTarget = v; },
    snakeIdx(sel){
      const el = document.querySelector(sel);
      return el ? snakeOrder().indexOf(el) : -1;
    },
    state(){
      return {
        frames, active, N,
        ball: {x: Math.round(C.x), y: Math.round(C.y), R: Math.round(C.R), a: Math.round(C.a*100)/100},
        ballIn: Math.round(ballIn*100)/100,
        untangle: Math.round(untangle*100)/100,
        pull: Math.round(pull*100)/100,
        snakeP: Math.round(snakeP*100)/100,
        snakeTarget,
        items: sceneEls().length,
        extract: extract ? {base: extract.base, p: Math.round(extract.p*100)/100} : null,
        gone: [...extractedSet()],
        pulledIdx,
        landing: (() => { const r = landingRect(); return r ? {x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width)} : null; })(),
        threads: ball.length
      };
    }
  };

  window.addEventListener('resize', resize);
  resize();
  loop();
})();
