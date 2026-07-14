/* 创域认知官网 · 线团叙事系统 v7
 * - 走线纪律：连接段一律走内容列外侧的"通道"，绝不横穿文字与卡片
 * - 蛇形按"行"推进：同一行内沿基线连续画过（含间隙），换行走外侧通道，方向自动交替
 * - 每幕抽走 3 根线，终幕球近乎抽空；中心显现线绘灯泡（灯丝是一个解开的小结）
 * - 进度环整体减淡，让位给引导线
 */
(() => {
  const canvas = document.getElementById('threads');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const opticShell = document.getElementById('opticShell');
  const opticRim = document.getElementById('opticRim');
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
    {x:0.80, y:0.50, r:0.92, a:0.36},
    {x:0.13, y:0.56, r:0.68, a:0.32},
    {x:0.87, y:0.32, r:0.62, a:0.30},
    {x:0.90, y:0.34, r:0.50, a:0.28},   // 05 球抬高并收小：给共同工作纸留出呼吸
    {x:0.79, y:0.50, r:0.90, a:0.40},
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
    {sel:'.entries span, .entry-detail.show', anchor(el){
      const r = el.getBoundingClientRect();
      if (el.classList.contains('entry-detail')){
        const inset = W < 900 ? 5 : 7, radius = 13;
        return {
          kind:'frame', x0:r.left+inset+radius, x1:r.right-inset-radius, y:r.top+inset,
          left:r.left+inset, right:r.right-inset, top:r.top+inset, bottom:r.bottom-inset, radius
        };
      }
      return {kind:'seg', x0:r.left, x1:r.right, y:r.bottom+4};
    }},
    {sel:'.tag', anchor(el){
      const r = el.getBoundingClientRect();
      if (el.classList.contains('featured')){
        const inset = W < 900 ? 7 : 10, radius = 14;
        return {
          kind:'frame', x0:r.left+inset+radius, x1:r.right-inset-radius,
          y:r.top+inset, sortY:r.top-28,
          left:r.left+inset, right:r.right-inset, top:r.top+inset, bottom:r.bottom-inset, radius
        };
      }
      return {kind:'pt', x:r.left+r.width/2, y:r.top-28};
    }},
    {sel:'.member', anchor(el){
      const a = el.querySelector('h3') || el;
      const r = a.getBoundingClientRect(); return {kind:'seg', x0:r.left, x1:r.right, y:r.bottom+3}; }},
    {sel:'.contact-row a', anchor(el){ const r = el.getBoundingClientRect(); return {kind:'seg', x0:r.left, x1:r.right, y:r.bottom+6}; }},
  ];
  function sceneEls(){
    const cfg = SCENE_ITEMS[active];
    if (!cfg) return [];
    return [...sections[active].querySelectorAll(cfg.sel)]
      .filter(el => {
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        const productPage = el.closest('#product .prod');
        const productDetail = productPage?.querySelector('.entry-detail.show');
        return r.width > 2 && r.height > 2 && s.display !== 'none' && s.visibility !== 'hidden'
          && (!productPage || productPage.classList.contains('on'))
          && (!productDetail || !el.matches('.entries span'));
      });
  }
  // 按行分组 + 行内按 x 排序（蛇形的骨架）
  function sceneRows(){
    const cfg = SCENE_ITEMS[active];
    if (!cfg) return [];
    // sceneEls 已过滤隐藏元素（产品子翻页/六步展开时，只对可见项走线）
    const list = sceneEls().map(el => {
      const a = cfg.anchor(el);
      return {el,a,sortY:a.sortY ?? a.y};
    });
    list.sort((p,q) => p.sortY - q.sortY);
    const rows = [];
    for (const it of list){
      const row = rows.find(r => Math.abs(r.y - it.sortY) < 24);
      if (row) row.items.push(it);
      else rows.push({y: it.sortY, items:[it]});
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
    const opticTransform = `translate3d(${C.x-100}px,${C.y-100}px,0) scale(${C.R/100})`;
    const opticAlpha = Math.min(1, C.a * 2.2);
    if (opticShell){ opticShell.style.transform = opticTransform; opticShell.style.opacity = opticAlpha; }
    if (opticRim){ opticRim.style.transform = opticTransform; opticRim.style.opacity = opticAlpha * 0.76; }
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
  function quadSamples(p0, c, p1, n=6){
    const out = [];
    for (let i=1;i<=n;i++){
      const s = i/n, is = 1-s;
      out.push({
        x:is*is*p0.x + 2*is*s*c.x + s*s*p1.x,
        y:is*is*p0.y + 2*is*s*c.y + s*s*p1.y,
      });
    }
    return out;
  }
  function roundedChannelSamples(p0, p1, chX, radius=14){
    const dx0 = chX-p0.x, dx1 = p1.x-chX, dy = p1.y-p0.y;
    const h0 = Math.sign(dx0)||1, h1 = Math.sign(dx1)||-h0, v = Math.sign(dy)||1;
    const r = Math.max(2,Math.min(radius,Math.abs(dx0)*.58,Math.abs(dx1)*.58,Math.abs(dy)*.28));
    if (!isFinite(r) || Math.abs(dy)<5) return lineSamples(p0,p1,10);
    const a = {x:chX-h0*r,y:p0.y};
    const b = {x:chX,y:p0.y+v*r};
    const c = {x:chX,y:p1.y-v*r};
    const d = {x:chX+h1*r,y:p1.y};
    return [
      ...lineSamples(p0,a,4),
      ...quadSamples(a,{x:chX,y:p0.y},b,6),
      ...lineSamples(b,c,Math.max(4,Math.ceil(Math.abs(c.y-b.y)/18))),
      ...quadSamples(c,{x:chX,y:p1.y},d,6),
      ...lineSamples(d,p1,4),
    ];
  }

  function frameSamples(a, fromRight){
    const l = a.left, r = a.right, t = a.top, b = a.bottom;
    const radius = Math.max(5,Math.min(a.radius || 14,(r-l)/4,(b-t)/4));
    const tl = {x:l+radius,y:t}, tr = {x:r-radius,y:t};
    const rt = {x:r,y:t+radius}, rb = {x:r,y:b-radius};
    const br = {x:r-radius,y:b}, bl = {x:l+radius,y:b};
    const lb = {x:l,y:b-radius}, lt = {x:l,y:t+radius};
    if (!fromRight){
      return [
        ...lineSamples(tl,tr,12), ...quadSamples(tr,{x:r,y:t},rt,5),
        ...lineSamples(rt,rb,12), ...quadSamples(rb,{x:r,y:b},br,5),
        ...lineSamples(br,bl,12), ...quadSamples(bl,{x:l,y:b},lb,5),
        ...lineSamples(lb,lt,12), ...quadSamples(lt,{x:l,y:t},tl,5),
      ];
    }
    return [
      ...lineSamples(tr,tl,12), ...quadSamples(tl,{x:l,y:t},lt,5),
      ...lineSamples(lt,lb,12), ...quadSamples(lb,{x:l,y:b},bl,5),
      ...lineSamples(bl,br,12), ...quadSamples(br,{x:r,y:b},rb,5),
      ...lineSamples(rb,rt,12), ...quadSamples(rt,{x:r,y:t},tr,5),
    ];
  }

  // 蛇形路径：起点 → 纸内侧圆角直角通道 → 各行依次划过。
  function buildSnake(start){
    const rows = sceneRows();
    if (!rows.length) return null;
    const col = contentRect();
    const hasPaperBoundary = active === 1 || active === 2 || active === 4 || active === 5;
    const paperInset = W < 900 ? 10 : 20;
    const leftInset = active === 1 ? (W < 900 ? 18 : 48) : paperInset;
    const chL = hasPaperBoundary ? col.left + leftInset : Math.max(col.left - 34, 8);
    const chR = hasPaperBoundary ? col.right - paperInset : Math.min(col.right + 18, W - 8);
    // 把落线自由端本身作为第一个采样点；否则曲线会从第一个插值点起笔，
    // 标题横线与向下延伸的蛇形路径之间会露出一个小缺口。
    const pts = [{x:start.x, y:start.y}];
    const marks = [0];
    const ranges = [];
    let prev = start;
    for (const row of rows){
      const cx = row.items.reduce((s,it)=>s+((it.a.kind==='pt'?it.a.x:(it.a.x0+it.a.x1)/2)),0)/row.items.length;
      const fromRight = prev.x > cx;
      const seq = fromRight ? row.items.slice().reverse() : row.items;
      const fa = seq[0].a;
      const entry = fa.kind === 'pt'
        ? {x: fa.x, y: fa.y}
        : {x: fromRight ? fa.x1 : fa.x0, y: fa.y};
      // 换行：有承载纸时走纸张内侧通道，以小圆角直角完成转向。
      if (Math.abs(prev.y - entry.y) > 34 || fa.kind === 'frame'){
        const chX = fromRight ? chR : chL;
        pts.push(...roundedChannelSamples(prev,entry,chX,14));
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
          const from = Math.max(0, pts.length - 1);
          pts.push(...lineSamples({x: sx, y: a.y}, {x: ex, y: a.y}, 14));
          ranges.push({el:it.el, a, from, to:pts.length});
          prev = {x: ex, y: a.y};
        } else if (a.kind === 'frame'){
          const startPoint = {x:fromRight ? a.x1 : a.x0,y:a.y};
          if (Math.abs(prev.x-startPoint.x)>2 || Math.abs(prev.y-startPoint.y)>2)
            pts.push(...lineSamples(prev,startPoint,8));
          const from = Math.max(0,pts.length-1);
          pts.push(...frameSamples(a,fromRight));
          ranges.push({el:it.el,a,from,to:pts.length});
          prev = startPoint;
        } else {
          const from = Math.max(0, pts.length - 1);
          if (Math.abs(prev.x - a.x) > 2 || Math.abs(prev.y - a.y) > 2)
            pts.push(...sampleBezier(prev,                          // 挂点之间：弧线垂落
              {x: prev.x, y: prev.y + (a.y - prev.y)*0.4},
              {x: a.x, y: a.y - 30},
              {x: a.x, y: a.y}, 20));
          ranges.push({el:it.el, a, from, to:pts.length});
          prev = {x: a.x, y: a.y};
        }
        marks.push(pts.length);
      }
    }
    return {pts, marks, ranges};
  }

  function pathGeometry(pts){
    const cum = [0];
    for (let i=1;i<pts.length;i++){
      cum.push(cum[i-1] + Math.hypot(pts[i].x-pts[i-1].x, pts[i].y-pts[i-1].y));
    }
    return {cum, total:cum[cum.length-1] || 0};
  }

  function stitchOccluders(){
    if (active !== 3) return [];
    return sceneEls().filter(el => !el.classList.contains('featured')).map(el => {
      const r = el.getBoundingClientRect();
      return {left:r.left-1, top:r.top-1, right:r.right+1, bottom:r.bottom+1};
    });
  }

  function clipOccluders(rects, inside){
    if (!rects.length) return;
    if (inside){
      const mask = new Path2D();
      rects.forEach(r => mask.rect(r.left, r.top, r.right-r.left, r.bottom-r.top));
      ctx.clip(mask);
      return;
    }
    // 逐张纸片从可绘区域里扣除；逐次裁切可正确处理纸片互相重叠的情况。
    rects.forEach(r => {
      const mask = new Path2D();
      mask.rect(-4,-4,W+8,H+8);
      mask.rect(r.left,r.top,r.right-r.left,r.bottom-r.top);
      ctx.clip(mask,'evenodd');
    });
  }

  // 纸面针脚从生成的第一帧就是前后穿线；高亮只作用于既有针孔，不再叠画线层。
  function drawStitchedPath(pts, {
    alpha=.72, width=1.55, shine=false, holes=true, occluders=[]
  }={}){
    if (!pts || pts.length < 2) return 0;
    const on = 18, gap = 8, period = on + gap;
    const geom = pathGeometry(pts);
    const paint = (paintAlpha, {inside=false, shadow=true, paintShine=shine, paintHoles=holes}={}) => {
      if (paintAlpha <= 0) return;
      ctx.save();
      clipOccluders(occluders, inside);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.setLineDash([on,gap]);

      // 留在纸面上方的线带一像素软影，形成真实线材的厚度。
      if (shadow){
        ctx.save();
        ctx.translate(0,1.15);
        ctx.strokeStyle = 'rgba(35,40,56,.22)';
        ctx.globalAlpha = paintAlpha * .55;
        ctx.lineWidth = width + 1.35;
        if (smoothPath(pts)) ctx.stroke();
        ctx.restore();
      }

      ctx.strokeStyle = accent;
      ctx.globalAlpha = paintAlpha;
      ctx.lineWidth = width;
      if (smoothPath(pts)) ctx.stroke();

      if (paintShine){
        ctx.save();
        ctx.translate(0,-.32);
        ctx.strokeStyle = 'rgba(255,224,213,.9)';
        ctx.globalAlpha = paintAlpha * .72;
        ctx.lineWidth = .58;
        if (smoothPath(pts)) ctx.stroke();
        ctx.restore();
      }
      ctx.setLineDash([]);

      // 每一针的出入点沿路径逐个出现；它们随线头生长，不会在抵达后整段跳变。
      if (paintHoles && geom.total > on){
        let seg = 1;
        const pointAt = d => {
          while (seg < geom.cum.length-1 && geom.cum[seg] < d) seg++;
          const d0 = geom.cum[seg-1], d1 = geom.cum[seg];
          const q = d1 > d0 ? (d-d0)/(d1-d0) : 0;
          return {x:lerp(pts[seg-1].x,pts[seg].x,q), y:lerp(pts[seg-1].y,pts[seg].y,q)};
        };
        for (let d=on;d<geom.total;d+=period){
          for (const hd of [d,d+gap]){
            if (hd >= geom.total) continue;
            const p = pointAt(hd);
            ctx.fillStyle = 'rgba(67,50,35,.32)';
            ctx.globalAlpha = paintAlpha;
            ctx.beginPath(); ctx.arc(p.x,p.y,1.35,0,Math.PI*2); ctx.fill();
            ctx.fillStyle = 'rgba(214,69,44,.82)';
            ctx.beginPath(); ctx.arc(p.x,p.y-.22,.48,0,Math.PI*2); ctx.fill();
          }
        }
      }
      ctx.restore();
    };

    if (occluders.length){
      paint(alpha,{inside:false});
      // 纸片之下只透出极淡的线影，不保留厚度、针孔或高光。
      paint(Math.min(.09,alpha*.12),{inside:true,shadow:false,paintShine:false,paintHoles:false});
    } else {
      paint(alpha);
    }
    return geom.total;
  }

  // 当前重点不换线型，只把同一段针脚拉紧、变亮，并显出纤维高光。
  function drawFocusStitch(snake, drawnF, prefixLength=0, occluders=[]){
    if (!snake || snakeTarget <= 0 || !snake.ranges?.length) return;
    const idx = Math.max(0, Math.min(snake.ranges.length-1, snakeTarget-1));
    const range = snake.ranges[idx];
    if (!range) return;
    if (range.a.kind === 'pt'){
      if (drawnF < range.to-.2) return;
      const glow = .78 + .22*Math.sin(t*.07);
      ctx.save();
      const halo = ctx.createRadialGradient(range.a.x,range.a.y,0,range.a.x,range.a.y,8);
      halo.addColorStop(0,`rgba(214,69,44,${.32*glow})`);
      halo.addColorStop(1,'rgba(214,69,44,0)');
      ctx.fillStyle = halo;
      ctx.beginPath(); ctx.arc(range.a.x,range.a.y,8,0,Math.PI*2); ctx.fill();
      ctx.restore();
      return;
    }
    const endF = Math.min(drawnF, range.to);
    if (endF <= range.from+1) return;
    const di = Math.min(Math.floor(endF), snake.pts.length);
    const hi = snake.pts.slice(range.from,di);
    if (di < snake.pts.length && di > range.from){
      const fr = endF-di;
      if (fr > 0){
        const a = snake.pts[di-1], b = snake.pts[di];
        hi.push({x:lerp(a.x,b.x,fr),y:lerp(a.y,b.y,fr)});
      }
    }
    const tension = clamp01((endF-range.from)/Math.max(1,range.to-range.from));
    const rangeLead = pathGeometry(snake.pts.slice(0,range.from+1)).total;
    const geom = pathGeometry(hi);
    const period = 26, globalStart = prefixLength + rangeLead;
    let seg = 1;
    const pointAt = d => {
      while (seg < geom.cum.length-1 && geom.cum[seg] < d) seg++;
      const d0 = geom.cum[seg-1], d1 = geom.cum[seg];
      const q = d1 > d0 ? (d-d0)/(d1-d0) : 0;
      return {x:lerp(hi[seg-1].x,hi[seg].x,q),y:lerp(hi[seg-1].y,hi[seg].y,q)};
    };
    const pulse = .82 + .18*Math.sin(t*.08);
    ctx.save();
    clipOccluders(occluders,false);
    // 不再叠画第二层线，只让原有针脚的出入孔轻微发亮，缝线间隙始终保留。
    for (const phase of [0,18]){
      seg = 1;
      let d = ((phase - (globalStart%period)) + period) % period;
      if (d < .5) d += period;
      for (;d<geom.total;d+=period){
        const p = pointAt(d);
        const halo = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,4.4);
        halo.addColorStop(0,`rgba(255,210,192,${(.34+.28*tension)*pulse})`);
        halo.addColorStop(1,'rgba(214,69,44,0)');
        ctx.fillStyle = halo;
        ctx.beginPath(); ctx.arc(p.x,p.y,4.4,0,Math.PI*2); ctx.fill();
        ctx.fillStyle = accent;
        ctx.globalAlpha = (.38+.34*tension)*pulse;
        ctx.beginPath(); ctx.arc(p.x,p.y,.72,0,Math.PI*2); ctx.fill();
      }
    }
    ctx.restore();
  }

  function drawNeedleTip(path, alpha){
    if (!path || path.length < 2) return;
    const tip = path[path.length-1], prev = path[path.length-2];
    const ang = Math.atan2(tip.y-prev.y,tip.x-prev.x);
    ctx.save();
    ctx.translate(tip.x,tip.y); ctx.rotate(ang);
    ctx.fillStyle = accent; ctx.globalAlpha = alpha;
    ctx.beginPath(); ctx.ellipse(0,0,3.7,1.05,0,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = 'rgba(255,236,228,.9)'; ctx.globalAlpha = alpha*.8; ctx.lineWidth = .55;
    ctx.beginPath(); ctx.moveTo(-1.8,-.18); ctx.lineTo(1.7,-.18); ctx.stroke();
    ctx.restore();
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

  /* 当前引导线的球内几何：
   * - 出口固定在靠近内容的一侧，不随线团自转漂移；
   * - hover 延伸时从球内远端连续截短，出口一端保持不动。
   */
  function buildGuideCoil(th, u, yaw, ballLeft, snakeFrac){
    const base = [];
    for (let k=0;k<K;k++){
      const a = th.rand[k], b = th.ord[k];
      const p = project([lerp(a[0],b[0],u), lerp(a[1],b[1],u), lerp(a[2],b[2],u)], yaw);
      base.push({x:p.x, y:p.y, d:p.d});
    }
    const portal = {
      x: C.x + (ballLeft ? 1 : -1) * C.R * 0.94,
      y: C.y + C.R * 0.04
    };
    const rawExit = base[base.length-1];
    const dx = portal.x - rawExit.x, dy = portal.y - rawExit.y;
    const bend = 22;
    for (let k=Math.max(0,K-bend);k<K;k++){
      const q = (k-(K-bend))/Math.max(1,bend-1);
      const w = q*q*(3-2*q);
      base[k].x += dx*w;
      base[k].y += dy*w;
    }
    const cut = 26 + snakeFrac * (K-38);
    const start = Math.min(K-2, Math.floor(cut));
    const sub = cut - start;
    const coil = base.slice(start);
    if (coil.length > 1 && sub > 0){
      coil[0] = {
        x: lerp(base[start].x, base[start+1].x, sub),
        y: lerp(base[start].y, base[start+1].y, sub),
        d: lerp(base[start].d, base[start+1].d, sub)
      };
    }
    coil[coil.length-1] = {...portal, d:0};
    return {coil, portal, remaining:K-cut};
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    if (C.a < 0.01) { frames++; return; }
    const yaw = t * 0.0028;
    pulledIdx = active >= 1 ? (active - 1) * G : -1;
    const gone = extractedSet();

    const iconA = clamp01((untangle - 0.72) / 0.28) * clamp01(C.a * 3);
    if (iconA > 0.01) drawIcon(iconA);

    // ---- 球内线：严格裁在玻璃球边界内 ----
    ctx.save();
    ctx.beginPath();
    ctx.arc(C.x, C.y, C.R * 0.955, 0, Math.PI*2);
    ctx.clip();
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
    ctx.restore();

    // ---- 当前这根线：缠绕 → 外侧通道荡出 → 落线 → 蛇形 ----
    const rect = landingRect();
    if (rect && pulledIdx >= 0 && pull > 0.02 && !(extract && pulledIdx >= extract.base && pulledIdx < extract.base + G)){
      const th = ball[pulledIdx];
      const u = clamp01(untangle);
      const itemCount = sceneEls().length;
      const snakeFrac = itemCount ? clamp01(snakeP / itemCount) : 0;
      const ly = rect.top + rect.height/2;
      const ballLeft = C.x < rect.left + rect.width/2;
      const guide = buildGuideCoil(th, u, yaw, ballLeft, snakeFrac);
      const coil = guide.coil;
      const exitP = guide.portal;
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

      ctx.strokeStyle = accent;
      ctx.globalAlpha = Math.min(0.92, C.a*3);
      ctx.lineWidth = 2.1;
      ctx.lineCap = 'round';

      // 球内剩余线段单独裁切；外部通道从固定出口继续，视觉上仍是一根连续线。
      ctx.save();
      ctx.beginPath();
      ctx.arc(C.x, C.y, C.R * 0.955, 0, Math.PI*2);
      ctx.clip();
      if (smoothPath(coil)) ctx.stroke();
      ctx.restore();
      // 悬空段保持连续线；从接触纸面的 nearX 开始，立即变成逐针生长的缝线。
      const air = [exitP, ...swing];
      if (smoothPath(air)) ctx.stroke();
      const paperPath = [{x:nearX,y:ly}, ...flat];
      const snakePrefixLength = pathGeometry(paperPath).total;
      let focusSnake = null, focusDrawnF = 0;
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
            paperPath.push(...arr.slice(1));
            focusSnake = snake;
            focusDrawnF = drawnF;
          }
        }
      }
      const occluders = stitchOccluders();
      drawStitchedPath(paperPath,{
        alpha:Math.min(.82,C.a*2.4),width:1.55,holes:true,occluders
      });
      if (focusSnake) drawFocusStitch(focusSnake,focusDrawnF,snakePrefixLength,occluders);
      drawNeedleTip(paperPath,Math.min(.94,C.a*2.8));
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

  let priorityPinned = null, priorityLock = false;
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
    priorityLock = false;
    document.body.classList.toggle('ball-live', active >= 1);
    const fin = document.querySelector('.final');
    if (fin) fin.classList.toggle('done', active === N-1);
    if (active === 3){
      requestAnimationFrame(() => {
        const featured = sections[active]?.querySelector('.tag.featured');
        if (!featured) return;
        priorityPinned = featured;
        const idx = snakeOrder().indexOf(featured);
        if (idx >= 0) snakeTarget = idx + 1;
      });
    }
  });

  // 子翻页（产品切换）：重置抽线
  window.addEventListener('subpage', () => { snakeP = 0; snakeTarget = 0; });

  function restingSnakeTarget(){
    if (active === 3){
      if (priorityLock) return snakeTarget;
      const card = priorityPinned || sections[active]?.querySelector('.tag.featured');
      if (card){
        const idx = snakeOrder().indexOf(card);
        return idx >= 0 ? idx + 1 : 0;
      }
    }
    const panel = sections[active]?.querySelector('.entry-detail.show');
    if (!panel) return 0;
    const idx = snakeOrder().indexOf(panel);
    return idx >= 0 ? idx + 1 : 0;
  }

  window.addEventListener('scene-priority', e => {
    const card = e.detail?.card;
    const phase = e.detail?.phase;
    if (!card || active !== 3) return;
    if (phase === 'seek'){
      priorityLock = true;
      priorityPinned = null;
      const idx = snakeOrder().indexOf(card);
      if (idx >= 0) snakeTarget = idx + 1;
    } else if (phase === 'layout'){
      priorityLock = true;
      snakeTarget = 0;
    } else if (phase === 'stitch'){
      priorityPinned = card;
      priorityLock = false;
      requestAnimationFrame(() => {
        snakeP = 0;
        const idx = snakeOrder().indexOf(card);
        snakeTarget = idx >= 0 ? idx + 1 : 0;
      });
    }
  });

  // 产品胶囊展开后，把新出现的说明作为最后一段纸面锚点，并保持缝线落在其下缘。
  window.addEventListener('product-detail', e => {
    requestAnimationFrame(() => {
      if (e.detail?.open) snakeP = 0;
      snakeTarget = restingSnakeTarget();
    });
  });

  const ALL_HOVER = SCENE_ITEMS.filter(Boolean).map(c => c.sel).join(', ');
  document.querySelectorAll(ALL_HOVER).forEach(el => {
    el.addEventListener('mouseenter', () => {
      const cfg = SCENE_ITEMS[active];
      if (!cfg || !el.matches(cfg.sel) || !sections[active].contains(el)) return;
      if (active === 3 && sections[active].querySelector('.tagline-rope.prioritized')
        && el.matches('.tag:not(.featured)')){
        snakeTarget = restingSnakeTarget();
        return;
      }
      const idx = snakeOrder().indexOf(el);
      if (idx >= 0) snakeTarget = idx + 1;
    });
    el.addEventListener('mouseleave', () => { snakeTarget = restingSnakeTarget(); });
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
        guide: (() => {
          const r = landingRect();
          if (!r || pulledIdx < 0) return null;
          const count = sceneEls().length || 1;
          const frac = clamp01(snakeP/count);
          const left = C.x < r.left + r.width/2;
          const g = buildGuideCoil(ball[pulledIdx], clamp01(untangle), t*0.0028, left, frac);
          return {exit:{x:Math.round(g.portal.x),y:Math.round(g.portal.y)}, remaining:Math.round(g.remaining)};
        })(),
        landing: (() => { const r = landingRect(); return r ? {x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width)} : null; })(),
        threads: ball.length
      };
    }
  };

  window.addEventListener('resize', resize);
  resize();
  loop();
})();
