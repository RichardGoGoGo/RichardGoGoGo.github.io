// 面试挑战 · 可玩原型：一局 = 一家公司 × 一个人设 × 一个岗位，三家公司、三个人设、两个岗位都能选。
// 界面和流程。计分全部交给 engine.js，规则见 docs/面试挑战/策划案.md。
import {
  loadCatalog, loadLibrary, loadContent, comboId, companyLabel, layout, itemLines, resumeResult, resumeBonus, resumeReview, Interview, Negotiation, GroupDiscussion,
  questionSeconds, baseTier, finalTier, crossZone, tierCap, testSlots, testResult, inspireEligible, passLine, optionEv, TIERS,
} from "./engine.js";

const app = document.getElementById("app");
const overlay = document.getElementById("overlay");
// catalog、lib：内容目录和题目素材库；companies、personas：选公司、选人设时直接读的原始文件；cache：拼好的组合
const S = { catalog: null, lib: null, companies: {}, personas: {}, cache: {}, unready: {}, c: null, settings: null, run: null, art: new Set(), canvas: [180, 320], source: [180, 320], hires: false };

// ---------------------------------------------------------------- 本地存储（读写失败时静默降级）

const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* 隐私模式等情况下不存 */ } },
  del(k) { try { localStorage.removeItem(k); } catch { /* 同上 */ } },
};
const KEY = { settings: "ic_settings", save: "ic_save", dex: "ic_dex", first: "ic_first", unlock: "ic_unlock", progress: "ic_progress", offers: "ic_offers", tutorial: "ic_tutorial" };

// ---------------------------------------------------------------- 投递进度：以游戏里的真实进度为准
// 每个人设在每家公司的状态记在这里：进行中（停在哪一关）、拿到 offer（最好的档位）、没过（挂在哪一关）。同一家公司重来不算“别家”。
// 开局时按别家的记录带上记号：first_company（这个人设还没投过别家，“只投了你们”是实话）、has_other_process（别家有进行中的流程）、
// has_real_offer（别家拿到过 offer）。HR、创始人问“手上还有别的流程吗”和谈薪时，选项的真假按这些记号算；
// 选项文字里的 {offer}、{process.*} 填成那一家的名字和进度。人设卡上的“求职进度”也按这里生成。
function progressOf(personaId) {
  const all = store.get(KEY.progress, null);
  if (!all) migrateOffers();
  return (store.get(KEY.progress, {}) || {})[personaId] || {};
}
// 旧版只记了真 offer（ic_offers），第一次读进度时转过来
function migrateOffers() {
  const all = {};
  for (const o of store.get(KEY.offers, [])) (all[o.persona] ||= {})[o.company] = { status: "offer", rank: o.rank, tier: o.tier, name: o.name, at: 0 };
  store.set(KEY.progress, all);
}
function setProgress(c, rec) {
  const all = store.get(KEY.progress, {}) || {};
  const mine = all[c.persona.id] || {};
  const old = mine[c.company.id];
  // 这家拿到过 offer：再玩一次不覆盖，除非这次档位更高
  if (old && old.status === "offer" && (rec.status !== "offer" || old.rank >= rec.rank)) return;
  mine[c.company.id] = { ...rec, name: c.company.name, role: c.role, at: Date.now() };
  all[c.persona.id] = mine;
  store.set(KEY.progress, all);
}
function startState(c) {
  const others = Object.entries(progressOf(c.persona.id)).filter(([co]) => co !== c.company.id).map(([, r]) => r);
  const flags = [];
  const vars = {};
  if (!others.length) flags.push("first_company");
  const proc = others.filter((r) => r.status === "in_progress").sort((a, b) => b.at - a.at)[0];
  if (proc) {
    flags.push("has_other_process");
    vars.process = { company: proc.name, stage: proc.stageName, where: proc.stage === "resume" ? "简历还在筛" : `到了${proc.stageName}` };
  }
  const offer = others.filter((r) => r.status === "offer").sort((a, b) => b.rank - a.rank)[0];
  if (offer) {
    flags.push("has_real_offer");
    vars.offer = `${offer.name}的 offer`;
  }
  return { flags, vars };
}
function progressLine(personaId, companyId) {
  const recs = Object.entries(progressOf(personaId)).filter(([co]) => co !== companyId).map(([, r]) => r);
  if (!recs.length) return "求职进度：目前只投了这一家。";
  const one = (r) => (r.status === "offer" ? `${r.name}已拿到 offer（${r.tier}）` : r.status === "out" ? `${r.name}挂在${r.stageName}` : `${r.name}${r.stage === "resume" ? "简历还在筛" : `到了${r.stageName}`}`);
  return `求职进度：${recs.map(one).join("；")}。被问到别家流程时，照这个说就是实话。`;
}
function startFlags() { return new Set(S.run.start.flags); }

// ---------------------------------------------------------------- 画风
// 两种画风：像素版（默认，玩家只看到这一版）和颜文字版（方块脸 + 颜文字，配简约界面）。
// 颜文字版不对玩家开放，作为内部版本保留：地址后加 ?style=kaomoji 打开，记录见 docs/面试挑战/画风记录-颜文字版.md。
// 像素版的图放进 prototype/art/，文件名按美术开工单第 12 节的英文简称表来起，
// 再运行 tools/art_manifest.py 更新 art/manifest.json。没有清单里的文件就不去请求，免得刷一堆 404。
// 像素版时 body 带 pixel 类，界面皮肤全在 style.css 的“像素版”一节；UI_* 素材按清单设成 CSS 变量 --UI_*，
// 缺哪张图，对应控件就退回简约样式。场景图、角色立绘和几张插图在这里按清单决定用不用。
// 清晰度：版面按 360 宽排；fitPixels() 用 zoom 把整块版面缩放到“一个美术像素正好占整数个屏幕物理像素”，
// 屏幕缩放 125%、150% 时也不糊。底图宽度（180 或升级后的 360）从 manifest 的 canvas 读。
// v6 交的是没缩小的原图（场景约 940×1672，立绘 1254×1254，比 360 宽版面大得多），manifest 里 hires 为 true：
// 场景和立绘按版面尺寸平滑缩小显示（body 带 hires 类），整数倍缩放只为像素字体和旧的小尺寸界面素材保留。

// cut：面试官立绘自带一截桌子（第 cut 行往下）。问答界面里从这一行裁掉，手正好搭在场景的桌沿上，
// 不再出现两张桌子叠在一起。量图得来（96×96 立绘的行号）；新版立绘按开工单 v6 不再画桌子，cut 就不用了。
const ART = {
  A1: { file: "A1_hr", name: "HR", cut: 85 },
  A2: { file: "A2_fe_interviewer1", name: "前端面试官", cut: 88 },
  A3: { file: "A3_fe_lead", name: "前端组长", cut: 85 },
  A4: { file: "A4_pm_interviewer1", name: "产品面试官", cut: 82 },
  A5: { file: "A5_pm_lead", name: "产品组长", cut: 86 },
  A6: { file: "A6_director", name: "产品总监", cut: 90 },
  A7: { file: "A7_cross", name: "交叉面面试官", cut: 89 },
  A8: { file: "A8_founder", name: "创始人", cut: 90 },
  A9s: { file: "A9s_observer", name: "观察员" },
  A10: { file: "A10_soe_examiner", name: "考官", cut: 86 },
  P1f: { file: "P1f_zhouan", name: "周安" }, P1m: { file: "P1m_zhouan", name: "周安" },
  P2f: { file: "P2f_linke", name: "林可" }, P2m: { file: "P2m_linke", name: "林可" },
  P3f: { file: "P3f_xunuo", name: "许诺" }, P3m: { file: "P3m_xunuo", name: "许诺" },
  P4f: { file: "P4f_chengyuan", name: "程远" }, P4m: { file: "P4m_chengyuan", name: "程远" },
  N1: { file: "N1_grabber", name: "高扬" }, N2: { file: "N2_timer", name: "钟敏" }, N3: { file: "N3_quiet", name: "苏言" }, N4: { file: "N4_summarizer", name: "陆遥" },
  // 群面角色代号；miniFile 优先选正面 _bust_ 半身像，旧全身小人仅作兼容。
  P1fs: { file: "P1fs_zhouan", name: "周安" }, P1ms: { file: "P1ms_zhouan", name: "周安" },
  P2fs: { file: "P2fs_linke", name: "林可" }, P2ms: { file: "P2ms_linke", name: "林可" },
  P3fs: { file: "P3fs_xunuo", name: "许诺" }, P3ms: { file: "P3ms_xunuo", name: "许诺" },
  P4fs: { file: "P4fs_chengyuan", name: "程远" }, P4ms: { file: "P4ms_chengyuan", name: "程远" },
};
// 群面画面（2026-10-25 改）：正面视角，五位候选人坐成一排在长桌后，桌子挡住腰以下，名字写在桌沿的名牌上，
// 阶段写在背后的白板上；观察员不坐桌边，在右上角的小窗里。原来的俯视会议室（S3）里椅子是侧着朝向桌子的，
// 正面坐姿的小人怎么摆都像飘在椅子前面，弃用。新的正面会议室和群面半身像还没交（见美术开工单"群面重做"），
// 过渡期场景用调色板色块画，人用群面小人的上半身。从左到右的座位，"你"在正中：
const PANEL_SEATS = ["N2", "N1", "me", "N4", "N3"];
const FACE = { calm: "・_・", nod: "＾_＾", frown: "￣へ￣", probe: "・o・？", pleased: "＾▽＾", disappointed: "－_－", waiting: "…_…",
  nervous: "；_；", confident: "￣▽￣", awkward: "^_^;", happy: "＾▽＾", talk: "・o・", listen: "・_・", note: "φ(._.)" };
const FACE_LABEL = { calm: "平静", nod: "点头", frown: "皱眉", probe: "追问", pleased: "满意", disappointed: "失望", waiting: "等待",
  nervous: "紧张", confident: "自信", awkward: "尴尬", happy: "开心", talk: "发言", listen: "倾听", note: "记录" };
// file：像素版的场景底图（180×320，2 倍显示），清单里没有就退回 bg 渐变色。
// top：像素版从底图第几行开始露出。问答界面里半身像的下沿固定在露出部分的第 112 行，
// 所以面试间取“桌沿行 − 110”，立绘按 cut 裁掉自带的桌子后，手搭在场景的桌沿上（量图：S4 第 154 行、S5 156、S6 166、S7a 168、S7b 168、S8a 165）。
// desk：面试场景（立绘坐在桌后）。floor：从露出部分的第几行起铺纯色地板，盖住桌面下方的木纹噪点，
// 让对话框和选项后面干净（量图：桌面亮带结束的那一行；S8a 下半屏本来就是纯色，不用铺）。
// floorColor：地板色和上沿暗线，默认是中厂、大厂那种深木色；S5 是浅色长桌的近景，换成桌面本身的颜色。
// v6：v6 原图用的参数（单位是 640 高版面的行）。desk 是桌子后沿那一行，立绘第 172 行（裁切线）正好落在这里：
// 高了人会像从桌面里长出来，低了会露出一截悬空的半身。逐张量图，并用离线合成把每个场景 × 面试官 × 7 种表情都看过。
// 任务书要求桌沿统一在 332 行，实际交来的 S4、S5、S6、S8b 有偏差，所以按场景记。floor 是下半屏的纯色（图片以下续上这个色）。
// 不是面试间的场景用 top（180 宽底图的行号，和旧参数同一个单位）。
const SCENES = {
  S0: { label: "S0 · 公司选择地图", file: "S0_city_map", top: 0, v6: { top: 50, floor: "#485264" } },
  S1: { label: "S1 · 简历关工作台", file: "S1_resume_desk", top: 20, v6: { top: 0, floor: "#303746" } },
  S2: { label: "S2 · 在线笔试", file: "S2_written_test", bg: "linear-gradient(#dfe5ec 0 80%, #a7b3c2 80% 100%)", v6: { top: 114, floor: "#303746" } },
  S3: { label: "S3 · 群面会议室", file: "S3_group_room", top: 100, bg: "linear-gradient(#d7dee8 0 70%, #9fb0c4 70% 100%)", v6: { top: 55, floor: "#303746" } },
  S4: { label: "S4 · 中厂面试间", file: "S4_midcorp_room", desk: true, top: 44, floor: 128, bg: "linear-gradient(#c8d5e0 0 72%, #8fa4b8 72% 100%)", v6: { desk: 336, floor: "#303746" } },
  S5: { label: "S5 · 独角兽开放办公区", file: "S5_unicorn_area", desk: true, top: 46, floor: 134, floorColor: ["#8b7059", "#b58c58"], bg: "linear-gradient(#d3e0e4 0 72%, #c9a46a 72% 100%)", v6: { desk: 353, floor: "#8b7059" } },
  S6: { label: "S6 · 大厂面试间", file: "S6_bigcorp_room", desk: true, top: 56, floor: 134, bg: "linear-gradient(#cdd6ee 0 72%, #7f8fbf 72% 100%)", v6: { desk: 347, floor: "#303746" } },
  S7a: { label: "S7a · 总监办公室", file: "S7a_director_office", desk: true, top: 58, floor: 144, bg: "linear-gradient(#d4d0e6 0 72%, #8d86b5 72% 100%)", v6: { desk: 332, floor: "#303746" } },
  S7b: { label: "S7b · 创始人办公室", file: "S7b_founder_office", desk: true, top: 58, floor: 134, bg: "linear-gradient(#ece3cf 0 72%, #8b7059 72% 100%)", v6: { desk: 332, floor: "#8b7059" } },
  S8a: { label: "S8a · HR 谈薪室 · 中厂版", file: "S8a_midcorp_hr_room", desk: true, top: 55, bg: "linear-gradient(#d9d2c3 0 72%, #a99c86 72% 100%)", v6: { desk: 332, floor: "#485264" } },
  S8b: { label: "S8b · HR 谈薪室 · 大厂版", file: "S8b_bigcorp_hr_room", desk: true, top: 44, bg: "linear-gradient(#d6d4e8 0 72%, #8a87b0 72% 100%)", v6: { desk: 326, floor: "#303746" } },
  // 国企源图已接入，按桌沿332行做整数画布平移，文件本身没有缩小。
  S9: { label: "S9 · 国企面试会议室", file: "S9_soe_panel_room", desk: true, bg: "linear-gradient(#e6e1dc 0 72%, #7d5a52 72% 100%)", v6: { desk: 332, floor: "#485264" } },
  S8c: { label: "S8c · 国企签约沟通室", file: "S8c_soe_sign_room", desk: true, bg: "linear-gradient(#e4e0da 0 72%, #8c7a6e 72% 100%)", v6: { desk: 332, floor: "#485264" } },
};
// UI_page_meter_frame（8×144）里 11 个格子的上沿，量图得来（底图像素）。
const METER_CELLS = [6, 18, 31, 43, 55, 68, 80, 93, 105, 117, 130];
const BADGE = ["cabbage", "normal", "sp", "ssp"];
const STAGE_NAME = { resume: "简历关", test: "笔试", group: "群面", cross: "交叉面", neg: "谈薪" };

// 开工单 v6（360×640 版面）起，立绘第 172 行往下不露（v6 立绘不画桌子，但有几张的手和道具会画到 172 行以下，一律裁掉，
// 由场景里的桌子挡住）；cut 用 96 高立绘的行号，所以是 86。下半屏本身画得安静，不再铺地板。
const V6_CUT = 86;
const isV6 = () => S.canvas[0] >= 360;
// v6 的 A1–A5 衣服用三种专用色画，按公司换成各自的配色（美术交付的 color_slots.json）。
// 换好色的图由 tools/art_recolor.py 预先生成，文件名后缀 __公司 ID；中厂就是原色，不另存。
const TINTED = new Set(["A1", "A2", "A3", "A4", "A5"]);

const pixel = () => S.settings.style === "pixel";
// 像素版并且清单里有这张图。name 不带 .png。
const hasArt = (name) => pixel() && S.art.has(`${name}.png`);
let preloaded = false;
// 一个美术像素占几个屏幕物理像素，只取整数：先按可用宽度算能放多大，再往下取整。
// 版面按 360 宽排（底图 180 宽时一个美术像素是 2 个 CSS 像素），用 zoom 缩放到对应大小。
function fitPixels() {
  const root = document.documentElement.style;
  if (!pixel()) { root.removeProperty("--pz"); return; }
  // 原图不需要整数倍，按 180 算：和旧版一样大，像素字体和旧界面素材照样清楚
  const base = S.hires ? 180 : S.canvas[0];
  const dpr = window.devicePixelRatio || 1;
  const avail = Math.min(window.innerWidth || 360, 480);
  const k = Math.max(1, Math.floor((avail * dpr) / base));
  root.setProperty("--pz", (k / (dpr * (360 / base))).toFixed(4));
  // --d：界面素材的密度（旧的 180 宽一套为 1）；--ds：场景图每 180 宽单位有几个原图像素，S2 九宫格用
  root.setProperty("--d", String(base / 180));
  root.setProperty("--ds", String(S.source[0] / 180));
}
window.addEventListener("resize", fitPixels);

function applyStyle() {
  document.body.classList.toggle("pixel", pixel());
  document.body.classList.toggle("hires", pixel() && S.hires);
  fitPixels();
  // 切到像素版时先把场景图和界面素材拉进缓存，免得每个界面第一次打开时先闪一下纯色。
  if (pixel() && !preloaded) {
    preloaded = true;
    for (const f of S.art) if (/^(S\d|UI_)/.test(f)) new Image().src = `art/${f}`;
  }
}

// 立绘文件名：A1–A5 有当前公司的配色版就用配色版
function spriteFile(code, face, c = S.c) {
  const a = ART[code] || { file: code };
  const tinted = TINTED.has(code) && c && `${a.file}_${face}__${c.company.id}.png`;
  return tinted && S.art.has(tinted) ? tinted : `${a.file}_${face}.png`;
}
// 选定公司后，把这家公司面试官的 7 种表情先拉进缓存，免得每轮开场人像晚一拍才出来
const INTERVIEWER_FACES = ["calm", "nod", "frown", "probe", "pleased", "disappointed", "waiting"];
function preloadCompany(c) {
  if (!pixel()) return;
  const arts = new Set([...Object.values(c.rounds), c.neg].filter((r) => r && r.interviewer).map((r) => r.interviewer.art));
  for (const code of arts) for (const face of INTERVIEWER_FACES) {
    const f = spriteFile(code, face, c);
    if (S.art.has(f)) new Image().src = `art/${f}`;
  }
  // 有群面的公司，把群面小人也拉进来
  if (c.group) for (const f of S.art) if (/^(N\d|A9s|P\d[fm]s)_/.test(f)) new Image().src = `art/${f}`;
}

function sprite(code, face = "calm", cls = "") {
  const a = ART[code] || { file: code, name: code };
  const file = spriteFile(code, face);
  const img = pixel() && S.art.has(file);
  const cut = a.cut && (isV6() ? V6_CUT : a.cut);
  const accessory = img && S.c?.company.id === "soe" && hasArt(`${code}_overlay_soe`)
    ? `<img class="accessory" src="art/${code}_overlay_soe.png" alt="" aria-hidden="true">` : "";
  return `<div class="sprite ${cls}${img ? " art" : ""}" data-code="${code}"${img && cut ? ` style="--cut:${cut}"` : ""}>
    ${img ? `<img src="art/${file}" alt="" onerror="this.parentNode.classList.remove('art');this.remove()">${accessory}` : ""}
    <div class="ph"><span class="face">${FACE[face] || ""}</span><span class="name">${esc(a.name)}</span><span class="code">${code} · ${FACE_LABEL[face] || face}</span></div>
  </div>`;
}

// 像素版的场景底图：有图返回写进 style 的 CSS 变量，没图返回空串（调用方退回渐变色）。
function sceneVars(code) {
  const sc = SCENES[code];
  if (!(sc && sc.file && hasArt(sc.file))) return "";
  const v = isV6() && sc.v6;
  if (v) {
    // 面试间：top = 桌沿行 / 2 − 110，让立绘的裁切线落在桌子后沿（见 SCENES 前的说明）
    const top = v.desk ? v.desk / 2 - 110 : v.top || 0;
    return `--scene:url(art/${sc.file}.png);--top:${top};--floor-c:${v.floor}`;
  }
  const { top, floor } = sc;
  const colors = sc.floorColor ? `;--floor-line:${sc.floorColor[0]};--floor-c:${sc.floorColor[1]}` : "";
  return `--scene:url(art/${sc.file}.png);--top:${top || 0}${floor ? `;--floor:${floor}` : ""}${colors}`;
}
function lockIcon() { return hasArt("UI_lock") ? '<img class="lock-ico" src="art/UI_lock.png" alt="🔒">' : "🔒"; }
function pageMeter(ratio, over) {
  const n = over ? METER_CELLS.length : Math.round(Math.min(1, ratio) * METER_CELLS.length);
  return `<div class="pmeter">${METER_CELLS.slice(0, n).map((y) => `<i style="top:${y * 2}px"></i>`).join("")}</div>`;
}

// ---------------------------------------------------------------- 小工具

const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function render(html) { app.innerHTML = html; window.scrollTo(0, 0); }
function on(sel, ev, fn, root = app) { root.querySelectorAll(sel).forEach((el) => el.addEventListener(ev, fn)); }
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function fmtDelta(d) { return d > 0 ? `+${d}` : `${d}`; }
// 拼接出来的“通过HR 面”这类中英相接处补一个空格。
function spaced(s) { return s.replace(/([一-鿿])([A-Za-z])/g, "$1 $2"); }
// cls 只给像素版换框用：writing 是写法弹层，persona 是人设卡。
function openOverlay(html, onMount, cls = "") {
  overlay.innerHTML = `<div class="sheet-modal${cls ? ` ${cls}` : ""}">${html}</div>`;
  overlay.hidden = false;
  overlay.onclick = (e) => { if (e.target === overlay) closeOverlay(); };
  if (onMount) onMount(overlay);
}
function closeOverlay() { overlay.hidden = true; overlay.innerHTML = ""; }
function relaxed() { return !!S.settings.relaxed; }
function personaArt() { return `${S.c.persona.art}${S.run && S.run.appearance === "m" ? "m" : "f"}`; }
// 谈薪这一关可以有自己的名字（国企叫“签约前沟通”），写在谈薪数据的 name 里
const negName = (c = S.c) => (c.neg && c.neg.name) || STAGE_NAME.neg;
function stageName(st, c = S.c) { return st === "neg" ? negName(c) : STAGE_NAME[st] || (c.rounds[st] && c.rounds[st].name) || st; }
function firstRound(c) { return c.stages.find((s) => c.rounds[s] && s !== "cross"); }
function lastRound(c) { return [...c.stages].reverse().find((s) => c.rounds[s] && s !== "cross"); }

class Countdown {
  constructor(seconds, { onTick, onTimeout }) {
    this.total = seconds * 1000;
    this.extra = 0;
    this.start = Date.now();
    this.onTick = onTick;
    this.onTimeout = onTimeout;
    this.done = false;
    this.iv = setInterval(() => this.tick(), 100);
    this.tick();
  }
  budget() { return this.total + this.extra; }
  remaining() { return this.budget() - (Date.now() - this.start); }
  elapsedRatio() { return (Date.now() - this.start) / this.budget(); }
  extend(sec) { this.extra += sec * 1000; }
  consume(sec) { this.extra -= sec * 1000; }
  tick() {
    if (this.done) return;
    const rem = this.remaining();
    this.onTick(Math.max(0, rem / this.budget()), Math.max(0, rem), this.elapsedRatio());
    if (rem <= 0) { this.stop(); this.onTimeout(); }
  }
  stop() { this.done = true; clearInterval(this.iv); }
}

function timerBar() {
  return relaxed() ? '<span class="relaxed-badge">从容模式：不计时</span>' : '<div class="timer"><div class="fill"></div><span class="label"></span></div>';
}
function startBar(secs, onTimeout, onWaiting) {
  if (relaxed()) return null;
  let waiting = false;
  return new Countdown(secs, {
    onTick: (ratio, rem, elapsed) => {
      const bar = app.querySelector(".timer");
      if (!bar) return;
      bar.querySelector(".fill").style.width = `${ratio * 100}%`;
      bar.querySelector(".label").textContent = `${Math.ceil(rem / 1000)} 秒`;
      if (!waiting && elapsed >= S.c.scoring.interview.relaxed_window_ratio) {
        waiting = true;
        bar.classList.add("waiting");
        if (onWaiting) onWaiting();
      }
      if (ratio < 0.15) bar.classList.add("out");
    },
    onTimeout,
  });
}

// 人设卡的一行可以只对某些岗位、某些公司显示：{"text": …, "roles": ["data"], "companies": ["soe"]}；
// 没选岗位时（选人设那一步）只显示不限岗位的行
const cardText = (l) => (typeof l === "string" ? l : l.text);
function cardLines(p, role, companyId) {
  return p.card.lines.filter((l) => typeof l === "string"
    || ((!l.roles || (role && l.roles.includes(role))) && (!l.companies || l.companies.includes(companyId)))).map(cardText);
}

// p：人设（拼好的 c.persona 或人设档案原文件都行）；companyId：在面哪家（备注和求职进度按它取）；role：投的岗位
function personaCardHtml(code, p = S.c.persona, companyId = S.c.company.id, role = S.c && S.c.role) {
  const note = (p.card.company_notes || {})[companyId];
  return `${pixel() ? `<div class="pc-face">${sprite(code, "calm")}</div>` : ""}<h2>人设卡 · ${esc(p.name)}（${esc(p.label)}）</h2>
    ${relaxed() ? "" : '<p class="fine">倒计时不会因为看人设卡而停下。</p>'}
    <ul>${cardLines(p, role, companyId).map((l) => `<li>${esc(l)}</li>`).join("")}${note ? `<li>${esc(note)}</li>` : ""}
      <li><b>${esc(progressLine(p.id, companyId))}</b></li></ul>
    <button class="primary block" data-act="close">关上</button>`;
}
function showPersonaCard(code = personaArt(), p, companyId, role) {
  openOverlay(personaCardHtml(code, p, companyId, role), (root) => on("[data-act=close]", "click", closeOverlay, root), "persona");
}

// ---------------------------------------------------------------- 问答界面（面试和谈薪共用）

// code：现场写代码那一轮，题目下面附的一段代码。
function stageHtml({ scene, roundLabel, art, face, nameplate, pre = [], text, code = "", body = "" }) {
  const sc = SCENES[scene] || { label: scene, bg: "" };
  const vars = sceneVars(scene);
  return `<div class="screen tight${vars ? ` on-art" style="${vars}` : ""}">
    <div class="scene" style="background:${vars ? "none" : sc.bg}">
      ${vars ? "" : `<span class="scene-label">${esc(sc.label)}（占位）</span>`}
      ${roundLabel ? `<span class="round-label">${esc(roundLabel)}</span>` : ""}
      ${vars ? "" : '<div class="desk"></div>'}
      <div id="who">${sprite(art, face)}</div>
    </div>
    <div class="panel">
      <div class="nameplate">${esc(nameplate)}</div>
      <div class="bubble">${pre.map((l) => `<span class="pre">${esc(l)}</span>`).join("")}${esc(text)}</div>
      ${code ? `<pre class="code">${esc(code)}</pre>` : ""}
      ${body}
    </div>
  </div>`;
}

// 返回 { option, penalty, usedThink }。超时 option 为 null。
function ask(ctx, { text, code = "", options, pre = [], thinkAvailable = false, waitPenalty = true, timeoutPenalty = -5, pressure = false }) {
  return new Promise((resolve) => {
    // 附了代码的题，代码也算进阅读量
    const secs = questionSeconds(S.c, code ? `${text}${code}` : text, options, pressure);
    const body = `${timerBar()}
      <div class="options">${options.map((o, i) => `<button data-i="${i}">${esc(o.text)}</button>`).join("")}</div>
      <div class="tools">
        ${thinkAvailable && !relaxed() ? '<button data-act="think">我想一下（+10 秒）</button>' : ""}
        <button data-act="card">人设卡</button>
      </div>`;
    render(stageHtml({ ...ctx, face: "calm", pre, text, code, body }));
    let usedThink = false;
    let waiting = false;
    const finish = (option) => {
      if (timer) timer.stop();
      closeOverlay();
      let penalty = 0;
      if (!relaxed()) {
        if (!option) penalty = timeoutPenalty;
        else if (waitPenalty && waiting) penalty = S.c.scoring.interview.time_penalty.waiting;
      }
      resolve({ option, penalty, usedThink });
    };
    const timer = startBar(secs, () => finish(null), () => {
      waiting = true;
      app.querySelector("#who").innerHTML = sprite(ctx.art, "waiting");
    });
    on(".options button", "click", (e) => finish(options[Number(e.currentTarget.dataset.i)]));
    on("[data-act=card]", "click", () => showPersonaCard());
    on("[data-act=think]", "click", (e) => {
      if (!timer) return;
      timer.extend(S.c.scoring.interview.think_extra_seconds);
      usedThink = true;
      e.currentTarget.disabled = true;
      e.currentTarget.textContent = "我想一下（已用）";
    });
  });
}

function react(ctx, { face, line, pre = [], button = "继续" }) {
  return new Promise((resolve) => {
    render(stageHtml({ ...ctx, face, pre, text: line, body: `<div class="spacer"></div><button class="primary block" data-act="next">${esc(button)}</button>` }));
    on("[data-act=next]", "click", () => resolve());
  });
}

// ---------------------------------------------------------------- 帧动画（等通知的手机、泡池子）
// 帧序和每帧时长照美术交付的 animations.json。手机震动的左右晃动已经画在帧里，程序不用再挪；泡池子头顶的“你”由程序写。
const ANIM = {
  phone: { idle: "UI_phone_idle", frames: ["UI_phone_vibrate_00", "UI_phone_vibrate_01", "UI_phone_vibrate_02", "UI_phone_vibrate_03"], ms: [100, 80, 100, 80],
    result: { invite: "UI_phone_invite", reject: "UI_phone_rejection" } },
  pool: { frames: ["UI_pool_wait_00", "UI_pool_wait_01", "UI_pool_wait_02", "UI_pool_wait_03", "UI_pool_wait_04", "UI_pool_wait_05"], ms: 220 },
};
// 所有帧叠在一起，只显示带 on 的那一帧：换帧时不用重新加载图片，不会闪。on 指定开始时显示哪一帧。
function animHtml(cls, frames, { on = frames[0], extra = "", style = "" } = {}) {
  return `<div class="anim ${cls}"${style ? ` style="${style}"` : ""}>${frames.map((f) => `<img src="art/${f}.png" alt="" data-f="${f}"${f === on ? ' class="on"' : ""}>`).join("")}${extra}</div>`;
}
function showFrame(root, f) { root.querySelectorAll("img").forEach((im) => im.classList.toggle("on", im.dataset.f === f)); }
// 点一下画面就跳过动画；离开这个界面也会停。动画放完要调 stop() 摘掉监听。
// 晚一拍再挂监听：进这一屏的那次点击这时还在冒泡，马上挂上会被它当成“跳过”。
function skipper() {
  const s = { done: false, stopped: false };
  const onTap = () => { s.done = true; };
  setTimeout(() => { if (!s.stopped) app.addEventListener("click", onTap, { once: true }); }, 0);
  s.stop = () => { s.stopped = true; app.removeEventListener("click", onTap); };
  return s;
}
// 按截止时间等，分小段睡是为了点一下能及时跳过；不能按段数累加，否则每帧都会比规定的长
async function wait(ms, skip) {
  const end = performance.now() + ms;
  for (let left = ms; left > 0 && !skip.done; left = end - performance.now()) await sleep(Math.min(50, left));
}
async function playFrames(root, { frames, ms }, loops, skip) {
  for (let n = 0; n < loops; n++) {
    for (let i = 0; i < frames.length; i++) {
      if (skip.done || !root.isConnected) return;
      showFrame(root, frames[i]);
      await wait(Array.isArray(ms) ? ms[i] : ms, skip);
    }
  }
}

// 等通知：手机静一会儿，震两下，屏幕亮起显示结果（邀约是日历打勾，感谢信是信封），再进信件
async function phoneScreen(kind) {
  const ph = ANIM.phone;
  const result = kind === "reject" ? ph.result.reject : ph.result.invite;
  if (![ph.idle, ...ph.frames, result].every(hasArt)) {
    render(`<div class="screen"><h2>等通知……</h2><div class="phone">📱 嗡嗡</div><p class="muted center">（等通知动画，占位）</p></div>`);
    await sleep(900);
    return;
  }
  render(`<div class="screen"><h2>等通知……</h2>${animHtml("phone-anim", [ph.idle, ...ph.frames, result])}<p class="fine center">点一下跳过</p></div>`);
  const root = app.querySelector(".phone-anim");
  const skip = skipper();
  await wait(400, skip);
  await playFrames(root, ph, 2, skip);
  if (!skip.done) {
    root.classList.add("lit");
    showFrame(root, result);
    await wait(700, skip);
  }
  skip.stop();
}

function letterScreen(kind, vars = {}) {
  const c = S.c;
  return new Promise(async (resolve) => {
    await phoneScreen(kind);
    const tpl = c.company.letters[kind] || "";
    const text = spaced(tpl.replace("{round}", vars.round || "").replace("{next}", vars.next || ""));
    render(`<div class="screen">
      <h2>${kind === "reject" ? "感谢信" : "邮件"}</h2>
      ${kind === "reject" && hasArt("UI_rejection_letter") ? '<img class="letter-art" src="art/UI_rejection_letter.png" alt="">' : ""}
      <div class="letter ${kind === "reject" ? "reject" : ""}">${esc(text)}${kind === "reject" ? `<span class="aside">${esc(c.company.letters.reject_aside)}</span>` : ""}</div>
      ${vars.extra ? `<p class="center"><b>${esc(vars.extra)}</b></p>` : ""}
      <button class="primary block" data-act="next">继续</button>
    </div>`);
    on("[data-act=next]", "click", () => resolve());
  });
}

// ---------------------------------------------------------------- 标题页

function titleScreen() {
  const save = store.get(KEY.save, null);
  const dex = store.get(KEY.dex, {});
  // 正式封面还没交（见美术开工单“封面与成就图标”），过渡期用城市地图当底，标题由程序画
  const cover = hasArt("COVER_title") ? "--scene:url(art/COVER_title.png);--top:0" : sceneVars("S0");
  render(`<div class="screen">
    <div class="title-art${cover ? " on-cover" : ""}"${cover ? ` style="${cover}"` : ""}><span class="big">面试挑战</span><span class="${cover ? "sub" : "muted"}">${cover ? "校招面试 · 闯关模拟" : "像素占位封面"}</span></div>
    <p>同样的背景，不同的写法和答法，offer 可以差很多。</p>
    <button class="primary block" data-act="start">开始挑战</button>
    ${save ? `<button class="block" data-act="continue">继续上次的挑战（${esc(save.label)}）</button>` : ""}
    <button class="block" data-act="dex">淘汰图鉴（已收集 ${Object.keys(dex).length} 种挂法）</button>
    <label class="row card"><input type="checkbox" data-act="relaxed" ${relaxed() ? "checked" : ""}>
      <span>从容模式：答题不计时，照常计分，分享卡上会注明</span></label>
    <div class="spacer"></div>
    <p class="fine">原型 · ${openCompanies().length} 家公司、${S.catalog.personas.length} 个人设都能选（${openCompanies().map((co) => `${co.name}招${tracksOf(co.id).map((t) => S.catalog.roles[t.role].name).join("、")}`).join("，")}）。人设投不对口的岗位也能玩，只是更难。像素版的图还在陆续到位，缺的角色先用方块脸；数字都是游戏设定，不代表市场行情。</p>
  </div>`);
  on("[data-act=start]", "click", companyScreen);
  on("[data-act=continue]", "click", continueFromSave);
  on("[data-act=dex]", "click", dexScreen);
  on("[data-act=relaxed]", "change", (e) => { S.settings.relaxed = e.currentTarget.checked; store.set(KEY.settings, { relaxed: S.settings.relaxed }); });
}

function dexScreen() {
  const items = Object.values(store.get(KEY.dex, {}));
  render(`<div class="screen">
    <h2>淘汰图鉴</h2>
    <p class="muted">每种挂法收集一张卡。已收集 ${items.length} 种。</p>
    <div class="dex">${items.length ? items.map((d) => `<div class="card"><h3>${esc(d.title)}</h3><p class="fine">${esc(d.explain)}</p></div>`).join("") : '<p class="muted">还没有。去挂一次试试？</p>'}</div>
    <button class="block" data-act="back">返回</button>
  </div>`);
  on("[data-act=back]", "click", titleScreen);
}

// ---------------------------------------------------------------- 开局：公司、人设、岗位

// 启动进度条（index.html 里的 .boot）：美术清单 0–10%，基础题库、公司、人设 10–30%（按已完成的请求数推进，只增不减），
// 12 条岗位线 30–85%（每拼好一条前进一格），封面图 85–100%。进标题页后 .boot 被替换掉，这里就不再有效果。
const boot = { shown: 0, jsonDone: 0, jsonTotal: 0, inContent: false };
function bootSet(pct, msg) {
  const bar = document.querySelector(".boot-bar");
  if (!bar) return;
  boot.shown = Math.max(boot.shown, Math.min(100, Math.round(pct)));
  bar.firstElementChild.style.width = `${boot.shown}%`;
  bar.setAttribute("aria-valuenow", String(boot.shown));
  if (msg) document.querySelector(".boot-msg").textContent = msg;
}
const readJson = async (p) => {
  boot.jsonTotal++;
  try {
    const r = await fetch(p.replace(/^content\//, "../content/"));
    if (!r.ok) throw new Error(`读不到 ${p}`);
    return await r.json();
  } finally {
    boot.jsonDone++;
    if (boot.inContent) bootSet(10 + 20 * (boot.jsonDone / boot.jsonTotal));
  }
};

// 拼好一个组合（同一个组合只拼一次）
async function comboContent(id) {
  if (!S.cache[id]) S.cache[id] = await loadContent(readJson, id, { catalog: S.catalog, lib: S.lib });
  return S.cache[id];
}

// 内容还没写完的岗位线（缺轮次文件之类，见 main）先不开放，不影响别的岗位线
const tracksOf = (companyId) => S.catalog.tracks.filter((t) => t.company === companyId && !S.unready[t.id]);
const openCompanies = () => S.catalog.companies.map((id) => S.companies[id]).filter((co) => tracksOf(co.id).length);

function companyScreen() {
  const locked = [
    ...S.catalog.companies.map((id) => S.companies[id]).filter((co) => !tracksOf(co.id).length)
      .map((co) => ({ name: co.name, type: co.type_label, stars: co.stars, note: "内容准备中" })),
    // 还没有公司的类型（比如硬科技、外企）先占个位
    ...Object.entries(S.catalog.sectors || {}).filter(([k]) => !S.catalog.companies.some((id) => S.companies[id].sector === k))
      .map(([, v]) => ({ name: v.name, type: "", stars: 0, note: "后续解锁" })),
  ];
  const map = sceneVars("S0");
  const companies = S.catalog.companies.map((id) => S.companies[id]);
  render(`<div class="screen">
    ${map ? `<div class="scene-banner" style="${map}"></div>` : ""}
    <h2>选公司</h2>
    <p class="muted">${map ? "" : "S0 公司选择地图（占位）。"}公司按类型和规模分，星星越多越难，面法也各不一样。</p>
    ${companies.filter((co) => tracksOf(co.id).length).map((co) => `<button class="card block" data-company="${co.id}">
      <span class="row">${co.id === "soe" && hasArt("LOGO_hengchuan") ? '<img src="art/LOGO_hengchuan.png" width="32" height="32" alt="">' : ""}<b>${esc(co.name)}</b><span class="tag">${esc(co.type_label)}</span><span class="spacer"></span>${"★".repeat(co.stars)}</span>
      <span class="fine">招：${tracksOf(co.id).map((t) => S.catalog.roles[t.role].full).join("、")}</span>
    </button>`).join("")}
    ${locked.map((l) => `<div class="card locked"><span class="row"><b>${l.name}</b>${l.type ? `<span class="tag">${l.type}</span>` : ""}<span class="spacer"></span>${"★".repeat(l.stars)}</span><span class="lock">${lockIcon()} ${l.note}</span></div>`).join("")}
    <p class="fine">${esc(companies[0].disclaimer)}</p>
    <button class="ghost block" data-act="back">返回</button>
  </div>`);
  on("[data-company]", "click", (e) => personaScreen(e.currentTarget.dataset.company));
  on("[data-act=back]", "click", titleScreen);
}

function personaScreen(companyId, appearance = "f") {
  const draw = () => {
    const list = S.catalog.personas.map((id) => S.personas[id]);
    render(`<div class="screen">
      <h2>选人设</h2>
      <p class="muted">所有玩家拿到的人设和经历都一样，比的是怎么写、怎么答。</p>
      <div class="row">
        <span class="muted">外观</span>
        <button class="chip ${appearance === "f" ? "on" : ""}" data-app="f">女</button>
        <button class="chip ${appearance === "m" ? "on" : ""}" data-app="m">男</button>
        <span class="fine">外观只影响形象，不影响判定</span>
      </div>
      ${list.map((p) => `<div class="card persona-card">
        <div class="row">${sprite(`${p.art}${appearance}`, "calm")}<div><h3>${esc(p.name)} · ${esc(p.label)}</h3><p class="fine">${esc(cardText(p.card.lines[0]))}</p></div></div>
        <div class="row" style="margin-top:8px"><button class="small" data-card="${p.id}">看人设卡</button><span class="spacer"></span><button class="primary" data-pick="${p.id}">选${esc(p.name)}</button></div>
      </div>`).join("")}
      <button class="ghost block" data-act="back">返回</button>
    </div>`);
    on("[data-app]", "click", (e) => { appearance = e.currentTarget.dataset.app; draw(); });
    on("[data-card]", "click", (e) => { const p = S.personas[e.currentTarget.dataset.card]; showPersonaCard(`${p.art}${appearance}`, p, companyId, null); });
    on("[data-pick]", "click", (e) => roleScreen(companyId, e.currentTarget.dataset.pick, appearance));
    on("[data-act=back]", "click", companyScreen);
  };
  draw();
}

// 对口程度：这个人设的经历里，对这个岗位“强对口”“对口”的有几段。只是提示，不影响计分。
function fitOf(p, role) {
  const types = S.lib.types.types;
  const n = p.resume.experiences.filter((e) => ["strong", "match"].includes({ ...types[e.type].relevance, ...(e.relevance || {}) }[role])).length;
  const verdict = n >= 3 ? "对口" : n === 2 ? "能投，有一两段要补" : "这条路偏难";
  return { n, text: `对口经历 ${n} 段 · ${verdict}` };
}

function roleScreen(companyId, personaId, appearance) {
  const p = S.personas[personaId];
  const co = S.companies[companyId];
  render(`<div class="screen">
    <h2>选岗位</h2>
    <p class="muted">${esc(co.name)} · ${esc(p.name)}</p>
    ${tracksOf(companyId).map((t) => {
      const r = S.catalog.roles[t.role];
      const fit = fitOf(p, t.role);
      return `<button class="card block" data-role="${t.role}"><b>${r.full}</b><br><span class="fine">${r.note}</span><br><span class="tag${fit.n >= 3 ? " good" : fit.n <= 1 ? " bad" : ""}">${esc(fit.text)}</span></button>`;
    }).join("")}
    <p class="fine">有的人设投有的岗位本来就不合适，这也是求职的一部分。对口不对口只影响难度，每个组合都能从头玩到尾。</p>
    <button class="ghost block" data-act="back">返回</button>
  </div>`);
  on("[data-role]", "click", async (e) => {
    const c = await comboContent(comboId(companyId, e.currentTarget.dataset.role, personaId));
    S.c = c;
    preloadCompany(c);
    newRun(appearance);
    resumeEntry();
  });
  on("[data-act=back]", "click", () => personaScreen(companyId, appearance));
}

// start：开局时的投递进度记号（续玩时用存档里的，不重新算）
function newRun(appearance, start = null) {
  S.run = { comboId: S.c.combo.id, appearance, attempt: 1, firstFail: null, retry: {}, pre: {}, log: [], holds: 0, margins: {}, carry: 0,
    sspQualified: false, zone: null, extra: {}, start: start || startState(S.c) };
  if (!start) setProgress(S.c, { status: "in_progress", stage: "resume", stageName: "简历关" });
}

// ---------------------------------------------------------------- 简历关

// 第一次玩：简历关之前先问一句，直接用默认简历（先体验面试），还是自己动手改（一步步提示怎么操作，这一次不计时）。只问一次。
function resumeEntry() {
  const t = store.get(KEY.tutorial, {}) || {};
  if (t.resume) return resumeScreen();
  const c = S.c;
  const def = { order: [...c.defaultResume.order], skills: [...c.defaultResume.skills] };
  const ok = resumeResult(c, def.order, def.skills).passed;
  render(`<div class="screen">
    <h2>简历关</h2>
    <p>${esc(c.company.name)}的网申开了。第一步是交一份一页纸的简历：筛简历的人只会扫几秒，决定你能不能进面试。</p>
    <div class="card"><b>直接用默认简历</b>
      <p class="fine">${ok ? "先体验面试。默认简历能过筛，但写得平平，面试里会被追问到它的弱点。" : "这份默认简历对这个岗位不太够用，多半过不了筛选。这个组合建议自己动手改。"}</p>
      <button class="block" data-act="default">直接用默认简历</button></div>
    <div class="card"><b>自己动手改${ok ? "" : "（推荐）"}</b>
      <p class="fine">挑经历、选写法、排顺序。第一次会一步步提示怎么操作，这一次不计时。简历关本身也是一关，写法会影响后面面试问什么。</p>
      <button class="primary block" data-act="guided">手工修改简历</button></div>
  </div>`);
  const done = () => store.set(KEY.tutorial, { ...t, resume: true });
  on("[data-act=default]", "click", () => { done(); resumeReveal(def, true, false); });
  on("[data-act=guided]", "click", () => { done(); resumeScreen({ guided: true }); });
}

// 手工改简历时的操作提示：做完当前这一步自动跳到下一条，也可以点“下一条”
const RESUME_TIPS = [
  { text: "下面是你的经历卡。点一张卡，从几种写法里挑一种放进简历。", done: (d) => d.order.length >= 1 },
  { text: "同一段经历有好几种写法：写清自己做了什么、带数字的，比空话和流水账有用；夸大的写法，面试会被追问。", done: (d) => d.order.length >= 2 },
  { text: "简历只有一页，超出的部分基本没人看，留意旁边的刻度。最对口的经历用 ▲ 挪到最前面，第一行最值钱。", done: (d) => d.order.length >= 3 },
  { text: "技能栏最多选 6 个，照岗位要求的说法写。写了“精通”的，面试会往深里问。", done: (d) => d.skills.length >= 1 },
  { text: "差不多了就点“投递简历”。这一次不计时，以后网申有截止时间，到点没投会按当前的样子自动投出。", done: () => false },
];

function resumeScreen({ guided = false } = {}) {
  const c = S.c;
  const draft = { order: [], skills: [] };
  let timer = null;
  let tip = guided ? 0 : -1;

  const submit = (skipped, timedOut = false) => {
    if (timer) timer.stop();
    closeOverlay();
    const resume = skipped ? { order: [...c.defaultResume.order], skills: [...c.defaultResume.skills] } : { order: [...draft.order], skills: [...draft.skills] };
    resumeReveal(resume, skipped, timedOut);
  };
  const variantOf = (expId) => draft.order.find((vid) => c.variants[vid].exp.id === expId);

  const draw = () => {
    while (tip >= 0 && tip < RESUME_TIPS.length - 1 && RESUME_TIPS[tip].done(draft)) tip += 1;
    const coach = tip >= 0 ? `<div class="coach"><b>操作提示 ${tip + 1}/${RESUME_TIPS.length}</b>　${esc(RESUME_TIPS[tip].text)}
        <div class="row">${tip < RESUME_TIPS.length - 1 ? '<button class="small" data-act="tip-next">下一条</button>' : ""}<span class="spacer"></span><button class="small ghost" data-act="tip-off">${tip < RESUME_TIPS.length - 1 ? "不用提示了" : "知道了"}</button></div></div>` : "";
    const { page1, page2, used } = layout(c, draft.order);
    const total = draft.order.reduce((s, vid) => s + itemLines(c, vid), 0);
    const items = draft.order.map((vid, i) => {
      const { exp, v } = c.variants[vid];
      const p2 = !page1.includes(vid);
      const brk = p2 && page2[0] === vid ? '<div class="page-break">—— 第二页 ——</div>' : "";
      return `${brk}<div class="item ${p2 ? "p2" : ""}"><div class="txt">${exp.header ? `<span class="ttl">${esc(exp.title)}</span>　<span class="fine">${esc(exp.period)}</span><br>` : ""}${esc(v.text)}</div>
        <div class="ops"><button data-up="${i}" ${i === 0 ? "disabled" : ""}>▲</button><button data-down="${i}" ${i === draft.order.length - 1 ? "disabled" : ""}>▼</button><button data-del="${i}">✕</button></div></div>`;
    }).join("");
    const skills = Object.values(c.skills).map((s) => `<button class="chip ${draft.skills.includes(s.id) ? "on" : ""}" data-skill="${s.id}">${esc(s.label)}</button>`).join("");
    const tray = Object.values(c.experiences).map((e) => `<button data-exp="${e.id}" class="${variantOf(e.id) ? "in" : ""}"><span class="ttl">${esc(e.title)}</span><span class="fine">${esc(e.period || "　")}${variantOf(e.id) ? " · 已放入" : ""}</span></button>`).join("");
    const edu = c.persona.education;
    const desk = sceneVars("S1");
    const over = page2.length > 0;
    const sheet = `<div class="sheet${pixel() && over ? " over" : ""}">
        <div class="who">${esc(c.persona.name)}　${esc(edu.school)} · ${esc(edu.major)} · ${esc(edu.year)}</div>
        ${items || '<p class="muted">从下面挑经历放进来。点一张卡，选一种写法。</p>'}
        ${draft.skills.length ? `<div class="item"><div class="txt"><span class="ttl">技能</span><br>${draft.skills.map((s) => esc(c.skills[s].label)).join("；")}</div></div>` : ""}
      </div>`;
    const lines = `<span>一页 ${Math.min(used, c.capacity)}/${c.capacity} 行</span>`;
    // 像素版的页面占用刻度是竖条，放在简历旁边；没有刻度图就还用横条。
    const meter = hasArt("UI_page_meter_frame")
      ? `<div class="sheet-row">${sheet}${pageMeter(total / c.capacity, over)}</div>
        <div class="meter ${over ? "over" : ""}">${lines}${over ? `${hasArt("UI_page_meter_overflow") ? '<img class="over-ico" src="art/UI_page_meter_overflow.png" alt="">' : ""}<span>超出一页</span>` : ""}</div>`
      : `${sheet}
      <div class="meter ${page2.length ? "over" : ""}">${lines}<div class="bar"><div class="fill" style="width:${Math.min(100, (total / c.capacity) * 100)}%"></div></div>${page2.length ? "<span>超出一页</span>" : ""}</div>`;
    render(`<div class="screen tight${desk ? ` on-art resume" style="${desk}` : ""}">
      <div class="resume-head"><b>简历关</b><span class="fine">${esc(c.company.name)}${desk ? "" : " · S1 工作台（占位）"}</span><span class="spacer"></span>
        ${relaxed() ? '<span class="relaxed-badge">从容模式</span>' : guided ? '<span class="relaxed-badge">第一次，不计时</span>' : `<span class="deadline">网申截止 --:--</span>`}</div>
      ${coach}
      ${meter}
      <div class="section-title">技能栏（最多 ${c.scoring.resume.max_skills} 个，已选 ${draft.skills.length}）</div>
      <div class="skills">${skills}</div>
      <div class="section-title">经历卡</div>
      <div class="tray">${tray}</div>
      <div class="row" style="padding:0 14px 16px"><button class="ghost" data-act="skip">跳过，用默认简历</button><span class="spacer"></span><button class="primary" data-act="submit" ${draft.order.length ? "" : "disabled"}>投递简历</button></div>
    </div>`);
    on("[data-up]", "click", (e) => { const i = Number(e.currentTarget.dataset.up); [draft.order[i - 1], draft.order[i]] = [draft.order[i], draft.order[i - 1]]; draw(); });
    on("[data-down]", "click", (e) => { const i = Number(e.currentTarget.dataset.down); [draft.order[i + 1], draft.order[i]] = [draft.order[i], draft.order[i + 1]]; draw(); });
    on("[data-del]", "click", (e) => { draft.order.splice(Number(e.currentTarget.dataset.del), 1); draw(); });
    on("[data-skill]", "click", (e) => toggleSkill(e.currentTarget.dataset.skill));
    on("[data-exp]", "click", (e) => pickVariant(e.currentTarget.dataset.exp));
    on("[data-act=skip]", "click", () => submit(true));
    on("[data-act=submit]", "click", () => submit(false));
    on("[data-act=tip-next]", "click", () => { tip += 1; draw(); });
    on("[data-act=tip-off]", "click", () => { tip = -1; draw(); });
    if (timer) timer.tick();
  };

  const toggleSkill = (sid) => {
    const i = draft.skills.indexOf(sid);
    if (i >= 0) draft.skills.splice(i, 1);
    else {
      const g = c.skills[sid].group;
      if (g) draft.skills = draft.skills.filter((s) => c.skills[s].group !== g);
      if (draft.skills.length >= c.scoring.resume.max_skills) return;
      draft.skills.push(sid);
    }
    draw();
  };

  const pickVariant = (expId) => {
    const exp = c.experiences[expId];
    const current = variantOf(expId);
    openOverlay(`<h2>${esc(exp.title)}</h2><p class="fine">${esc(exp.period || "")} · 选一种写法放进简历</p>
      ${exp.variants.map((v) => `<button class="variant ${current === v.id ? "on" : ""}" data-v="${v.id}">${esc(v.text)}<br><span class="fine">占 ${v.lines + (exp.header ? 1 : 0)} 行</span></button>`).join("")}
      ${current ? '<button class="ghost block" data-act="remove">不放进简历</button>' : ""}
      <button class="ghost block" data-act="cancel">取消</button>`, (root) => {
      on("[data-v]", "click", (e) => {
        const vid = e.currentTarget.dataset.v;
        if (current) draft.order[draft.order.indexOf(current)] = vid;
        else draft.order.push(vid);
        closeOverlay();
        draw();
      }, root);
      on("[data-act=remove]", "click", () => { draft.order.splice(draft.order.indexOf(current), 1); closeOverlay(); draw(); }, root);
      on("[data-act=cancel]", "click", closeOverlay, root);
    }, "writing");
  };

  draw();
  if (!relaxed() && !guided) {
    timer = new Countdown(c.company.resume_screen.deadline_seconds, {
      onTick: (ratio, rem) => {
        const el = app.querySelector(".deadline");
        if (!el) return;
        const s = Math.ceil(rem / 1000);
        el.textContent = `网申截止 ${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
        el.classList.toggle("hurry", s <= 30);
      },
      onTimeout: () => submit(false, true),
    });
  }
}

const GAZE_LABEL = { high: "第一眼", mid: "扫过", low: "瞄了一眼", linger: "停了很久", skip: "没看" };

function resumeReveal(resume, skipped, timedOut) {
  const c = S.c;
  const run = S.run;
  const screen = c.company.resume_screen;
  const rr = resumeResult(c, resume.order, resume.skills);
  const review = resumeReview(c, resume.order, resume.skills, rr);
  const max = Math.max(screen.pass_line * 1.8, rr.score + 0.3);
  const machine = rr.hits === null ? "" : `<h3>机器扫描</h3>
    <p class="fine">命中 ${rr.hits.length} 个岗位关键词，最低要求 ${screen.machine_min} 个。</p>
    <div class="skills scan" style="padding:0">${screen.machine_keywords.map((k) => `<span class="chip ${rr.hits.includes(k) ? "on" : ""}">${esc(k)}</span>`).join("")}</div>`;
  render(`<div class="screen">
    <h2>简历关 · 揭晓</h2>
    ${timedOut ? '<p class="tag bad">网申截止，自动提交了当前版本</p>' : ""}
    ${skipped ? '<p class="tag">用的是默认简历</p>' : ""}
    ${machine}
    <h3>HR 视线回放</h3>
    <div class="gaze">${review.gaze.map((g) => { const { exp, v } = c.variants[g.vid]; return `<div class="g ${g.level}"><b>${GAZE_LABEL[g.level]}</b>${esc(exp.header ? exp.title : v.text)}</div>`; }).join("") || '<p class="muted">简历是空的。</p>'}</div>
    <h3>结果</h3>
    <div class="scorebar"><div class="fill" style="width:0"></div><div class="passline" style="left:${(screen.pass_line / max) * 100}%"><span>通过线 ${screen.pass_line}</span></div></div>
    <p>简历分 <b>${rr.score.toFixed(2)}</b> · ${rr.passed ? '<span class="tag good">通过筛选</span>' : '<span class="tag bad">没过筛选</span>'}</p>
    <ul>${review.notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>
    <button class="primary block" data-act="next">${rr.passed ? "等通知" : "看看为什么"}</button>
  </div>`);
  requestAnimationFrame(() => { const f = app.querySelector(".scorebar .fill"); if (f) f.style.width = `${Math.min(100, (rr.score / max) * 100)}%`; });
  on("[data-act=next]", "click", async () => {
    if (!rr.passed) {
      eliminate({ stage: "resume", stageIdx: 0, stageName: "简历关", title: `${c.company.name} · 简历关没过筛选`, explain: review.notes.join(" "), tags: ["resume"], dexKey: `${c.combo.id}:resume:${review.notes[0]}` });
      return;
    }
    Object.assign(run, { resume, skipped, resumeScore: rr.score, bonus: resumeBonus(c, rr.margin), margins: {}, log: [], holds: 0, sspQualified: false, zone: null, extra: {} });
    run.interview = new Interview(c, resume, startFlags(), run.start.vars);
    run.carry = run.bonus;
    await letterScreen("next_round", { round: "简历筛选", next: stageName(c.stages[1]) });
    runStages(1);
  });
}

// ---------------------------------------------------------------- 关卡调度

async function runStages(idx) {
  const c = S.c;
  const run = S.run;
  for (let i = idx; i < c.stages.length; i++) {
    const st = c.stages[i];
    run.pre[i] = { snap: run.interview.snapshot(), carry: run.carry, margins: { ...run.margins }, bonus: run.bonus, logLen: run.log.length,
      holds: run.holds, sspQualified: run.sspQualified, zone: run.zone, extra: { ...run.extra } };
    let res;
    if (st === "neg") return playNegotiation(i);
    if (st === "test") res = await playTest(i);
    else if (st === "group") res = await playGroup(i);
    else if (st === "cross") res = await playCross(i);
    else res = await playRoundStage(i, st);
    if (res.eliminated) return eliminate({ ...res.eliminated, stageIdx: i });
    if (res.skipped) continue;
    const nxt = nextStage(i);
    saveProgress(i + 1, stageName(nxt));
    setProgress(c, { status: "in_progress", stage: nxt, stageName: stageName(nxt) });
    if (st === lastRound(c) && c.company.letters.pool) await poolScreen();
    else if (nxt === "cross") await letterScreen("cross_invite", { extra: c.rounds.cross.invite_text });
    else await letterScreen("next_round", { round: stageName(st), next: stageName(nxt) });
  }
}

// 下一关是什么：交叉面只在触发时出现。
function nextStage(i) {
  const c = S.c;
  for (let j = i + 1; j < c.stages.length; j++) {
    if (c.stages[j] === "cross" && !crossZone(c, S.run.margins)) continue;
    return c.stages[j];
  }
  return "neg";
}

// 泡池子（大厂 HR 面之后）：几个候选人套着泳圈漂着，中间那位头顶的箭头上写“你”，循环两遍后收到通知
function poolScreen() {
  return new Promise(async (resolve) => {
    const art = ANIM.pool.frames.every(hasArt);
    render(`<div class="screen">
      <h2>泡池子</h2>
      ${art ? animHtml("pool-anim", ANIM.pool.frames, { extra: '<span class="you">你</span>' })
        : `<div class="pool">${"🛟".repeat(5)}<br><span class="fine">（泡池子等待动画，占位：几个候选人套着泳圈漂着，其中一个头顶写着“你”。）</span></div>`}
      <p class="center">${esc(S.c.company.letters.pool)}</p>
      ${art ? '<p class="fine center">点一下跳过</p>' : ""}
    </div>`);
    if (art) {
      const skip = skipper();
      await playFrames(app.querySelector(".pool-anim"), ANIM.pool, 2, skip);
      skip.stop();
    } else await sleep(1600);
    await letterScreen("next_round", { round: "全部面试", next: negName() });
    resolve();
  });
}

// ---------------------------------------------------------------- 笔试

function playTest(stageIdx) {
  const c = S.c;
  const run = S.run;
  const t = c.test;
  const slots = testSlots(c, run.retry.test || 0);
  const answers = {};
  const removed = {};
  let inspireLeft = t.inspire_uses;
  let trapClicks = 0;
  let timer = null;
  return new Promise((resolve) => {
    const finish = (cheated = false) => {
      if (timer) timer.stop();
      closeOverlay();
      if (cheated) {
        resolve({ eliminated: { stage: "test", stageName: "笔试", title: `${c.company.name} · 笔试判定作弊`, explain: t.trap.explain, quote: t.trap.label, tags: ["专业"], dexKey: `${c.combo.id}:test:cheat` } });
        return;
      }
      const tr = testResult(c, slots, answers);
      testReveal(slots, answers, tr).then(() => {
        // 做错和没做的题各记一条复盘（没过线时淘汰页也要用）
        for (const sl of slots) {
          const i = answers[sl.slot];
          if (i !== undefined && sl.q.options[i].correct) continue;
          run.log.push({ round: "笔试", q: sl.q.text, choice: i === undefined ? "（没做）" : sl.q.options[i].text, explain: sl.q.explain, regret: sl.q.points / 10 });
        }
        if (!tr.passed) {
          resolve({ eliminated: { stage: "test", stageName: "笔试", title: `${c.company.name} · 笔试没过线`, explain: `得了 ${tr.score} 分，通过线 ${t.pass_line}。${t.pass_line > 50 ? "易题和中题全对也只有 50 分，至少要拿下一道难题。" : "易题和中题全对就有 50 分，分丢在了本该稳拿的题上：先做有把握的，再碰难题。"}`, tags: ["专业"], dexKey: `${c.combo.id}:test:low` } });
          return;
        }
        run.extra.testScore = tr.score;
        run.bonus += tr.bonus;
        run.carry += tr.bonus;
        tr.flags.forEach((f) => run.interview.flags.add(f));
        run.log.push({ round: "笔试", q: `笔试得分 ${tr.score}`, choice: `通过，一面起始印象 +${tr.bonus}`, explain: "" });
        resolve({ ok: true });
      });
    };
    // 像素版把 S2 当九宫格用：显示器边框和桌沿固定，中间的屏幕随内容拉长。
    const monitor = sceneVars("S2");
    const screenOpen = `<div class="screen${monitor ? ` monitor" style="${monitor}` : ""}">`;
    const drawList = () => {
      render(`${screenOpen}
        <div class="row"><h2>笔试</h2><span class="spacer"></span>${relaxed() ? '<span class="relaxed-badge">从容模式</span>' : '<span class="deadline">--:--</span>'}</div>
        <p class="fine">${monitor ? "" : "S2 在线笔试（占位）。"}6 道题，通过线 ${t.pass_line} 分。时间不够做完，先挑着做；可以跳过、回头再做。灵感还剩 ${inspireLeft} 次（只能用在${esc(((c.persona.test_inspire || {})[c.role] || []).join("、") || "——")}类题上）。</p>
        <div class="dex">${slots.map((s) => `<button class="card block" data-q="${s.slot}">
          <span class="row"><span class="tag">${s.q.level} · ${s.q.points} 分</span><span class="tag">${esc(s.q.category)}</span><span class="spacer"></span>${answers[s.slot] !== undefined ? '<span class="tag good">已答</span>' : '<span class="tag">未做</span>'}</span>
          <span class="fine">${esc(s.q.text)}</span></button>`).join("")}</div>
        <button class="primary block" data-act="submit">交卷</button>
      </div>`);
      on("[data-q]", "click", (e) => drawQuestion(slots.find((s) => s.slot === e.currentTarget.dataset.q)));
      on("[data-act=submit]", "click", () => finish());
      if (timer) timer.tick();
    };
    const drawQuestion = (s) => {
      const gone = removed[s.slot] || new Set();
      const canInspire = inspireLeft > 0 && inspireEligible(c, s.q) && !removed[s.slot];
      const trap = t.trap.levels.includes(s.q.level);
      render(`${screenOpen}
        <div class="row"><span class="tag">${s.q.level} · ${s.q.points} 分</span><span class="spacer"></span>${relaxed() ? "" : '<span class="deadline">--:--</span>'}</div>
        <div class="bubble">${esc(s.q.text)}</div>
        <div class="options">${s.q.options.map((o, i) => `<button data-i="${i}" ${gone.has(i) ? 'disabled style="text-decoration:line-through"' : ""} class="${answers[s.slot] === i ? "picked" : ""}">${esc(o.text)}</button>`).join("")}</div>
        <div class="tools">
          ${canInspire ? '<button data-act="inspire">💡 用一次灵感</button>' : ""}
          ${trap ? `<button data-act="trap">🌐 ${esc(t.trap.label)}</button>` : ""}
        </div>
        <button class="ghost block" data-act="back">返回题目列表</button>
      </div>`);
      on(".options button", "click", (e) => { answers[s.slot] = Number(e.currentTarget.dataset.i); drawList(); });
      on("[data-act=back]", "click", drawList);
      on("[data-act=inspire]", "click", () => {
        const wrong = s.q.options.map((o, i) => i).filter((i) => !s.q.options[i].correct);
        removed[s.slot] = new Set([wrong[Math.floor(Math.random() * wrong.length)]]);
        inspireLeft -= 1;
        drawQuestion(s);
      });
      on("[data-act=trap]", "click", async () => {
        trapClicks += 1;
        if (trapClicks >= 2) {
          openOverlay(`<h2>⚠️</h2><p>${esc(t.trap.fail_text)}</p>`);
          await sleep(1400);
          finish(true);
          return;
        }
        if (timer) timer.consume(t.trap.lose_seconds);
        openOverlay(`<h2>页面加载中……</h2><p class="fine">（搜索页一直在转圈）</p>`);
        await sleep(1200);
        openOverlay(`<h2>⚠️ 切屏警告</h2><p>${esc(t.trap.warn_text)}</p><button class="primary block" data-act="ok">知道了</button>`, (root) => on("[data-act=ok]", "click", closeOverlay, root));
      });
      if (timer) timer.tick();
    };
    drawList();
    if (!relaxed()) {
      timer = new Countdown(t.seconds, {
        onTick: (ratio, rem) => {
          const el = app.querySelector(".deadline");
          if (!el) return;
          const sec = Math.ceil(rem / 1000);
          el.textContent = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
          el.classList.toggle("hurry", sec <= 20);
        },
        onTimeout: () => finish(),
      });
    }
  });
}

function testReveal(slots, answers, tr) {
  const c = S.c;
  return new Promise((resolve) => {
    render(`<div class="screen">
      <h2>笔试 · 揭晓</h2>
      <p>得分 <b>${tr.score}</b> / 100 · 通过线 ${c.test.pass_line} · ${tr.passed ? `<span class="tag good">通过</span>（一面起始印象 +${tr.bonus}）` : '<span class="tag bad">没过</span>'}</p>
      <div class="reveal-list">${slots.map((s) => {
        const i = answers[s.slot];
        const ok = i !== undefined && s.q.options[i].correct;
        return `<div class="r"><span class="q">${esc(s.q.text)}<br><span class="fine">${esc(s.q.explain)}</span></span><span class="delta ${ok ? "up" : "down"}">${i === undefined ? "没做" : ok ? `+${s.q.points}` : "错"}</span></div>`;
      }).join("")}</div>
      <button class="primary block" data-act="next">${tr.passed ? "等通知" : "看看为什么"}</button>
    </div>`);
    on("[data-act=next]", "click", () => resolve());
  });
}

// ---------------------------------------------------------------- 群面

// 群面小人的文件：没有这个状态就退回倾听、平静（观察员只有平静、点头、记录三种）
function miniFile(code, state) {
  const a = ART[code];
  if (!a) return "";
  const bust = a.file.replace(/^(P\d[fm])s_/, "$1_");
  const f = [state, "listen", "calm"].flatMap((s) => [`${bust}_bust_${s}.png`, `${a.file}_${s}.png`]).find((x) => S.art.has(x));
  return f || "";
}

// 正面的群面画面：说话的人换成说话的动作，桌上的名牌变青色；观察员说话时小窗亮起，平时一直在记录
function groupPanelHtml(speaker, face, phase) {
  const gc = S.c.group;
  const name = (who) => (who === "me" ? "你" : (gc.npcs.find((n) => n.id === who) || {}).name || who);
  const talking = (who) => (who === "me" ? speaker === "me" : speaker === who);
  const seat = (who, i) => {
    const f = miniFile(who === "me" ? `${personaArt()}s` : who, talking(who) ? face : "listen");
    return `<div class="seat-p${f.includes("_bust_") ? " bust" : ""}${talking(who) ? " active" : ""}" style="--i:${i}">${f ? `<img src="art/${f}" alt="">` : ""}</div>`;
  };
  const obs = miniFile("A9s", speaker === "observer" ? "nod" : "note");
  return `<div class="scene panel-room">
    <div class="board">群面${phase ? ` · ${esc(phase)}` : ""}</div>
    ${PANEL_SEATS.map((_, i) => `<i class="chair" style="--i:${i}"></i>`).join("")}
    ${PANEL_SEATS.map(seat).join("")}
    <div class="table">${PANEL_SEATS.map((who, i) => `<span class="plate${talking(who) ? " active" : ""}" style="--i:${i}">${esc(name(who))}</span>`).join("")}</div>
    <div class="observer${speaker === "observer" ? " active" : ""}"><span class="face">${obs ? `<img src="art/${obs}" alt="">` : ""}</span><span class="plate">观察员</span></div>
  </div>`;
}

function groupStageHtml(g, speaker, text, body, face = "talk", phase = "") {
  const gc = S.c.group;
  const seat = (code, name, active) => `<div class="seat ${active ? "active" : ""}">${sprite(code, active ? face : "listen", "small")}<span>${esc(name)}</span></div>`;
  const speakerName = speaker === "system" ? "题目" : speaker === "observer" ? "观察员" : (gc.npcs.find((n) => n.id === speaker) || {}).name || "你";
  // 有群面小人就用正面画面（不用 S3 的俯视底图）；颜文字版和缺图时还是旧的一排方块脸
  const front = pixel() && miniFile("N1", "listen");
  const vars = front ? "" : sceneVars("S3");
  return `<div class="screen tight${front ? " on-art panel-screen" : vars ? ` on-art" style="${vars}` : ""}">
    ${front ? groupPanelHtml(speaker, face, phase) : `
    <div class="scene" style="background:${vars ? "none" : SCENES.S3.bg};height:auto;padding:28px 6px 10px;flex-direction:column;align-items:center">
      ${vars ? "" : '<span class="scene-label">S3 · 群面会议室（占位）</span>'}<span class="round-label">群面${phase ? ` · ${esc(phase)}` : ""}</span>
      <div class="seats">${seat(personaArt(), "你", speaker === "me")}${gc.npcs.map((n) => seat(n.id, n.name, speaker === n.id)).join("")}</div>
      <div class="seats">${seat("A9s", "观察员", speaker === "observer")}</div>
    </div>`}
    <div class="panel">
      <div class="nameplate">${esc(speakerName)}</div>
      <div class="bubble">${esc(text)}</div>
      ${body}
    </div>
  </div>`;
}

function playGroup(stageIdx) {
  const c = S.c;
  const run = S.run;
  const gc = c.group;
  const g = new GroupDiscussion(c);
  return new Promise(async (resolve) => {
    await new Promise((ok) => {
      render(`<div class="screen">
        <h2>群面 · ${esc(gc.case.title)}</h2>
        <p>${esc(gc.case.text)}</p>
        <div class="card"><b>需求</b><ul>${gc.case.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
        <div class="card"><b>材料</b><ul>${gc.case.materials.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
        <p class="fine">5 人一组，观察员按观点贡献、推动进程、倾听与协作、时间意识打分，前 ${gc.advance_top} 名晋级。每次插话只有约 ${gc.window_seconds} 秒。</p>
        <button class="primary block" data-act="go">开始讨论</button>
      </div>`);
      on("[data-act=go]", "click", ok);
    });
    let worst = { regret: -1, step: null };
    for (const step of gc.steps) {
      g.enter(step);
      const opts = shuffle(g.resolve(step.options));
      const bestEv = Math.max(...opts.map((o) => g.ev(o)));
      const choice = await new Promise((done) => {
        const body = `${timerBar()}<div class="options">${opts.map((o, i) => `<button data-i="${i}">${esc(o.text)}</button>`).join("")}</div>`;
        render(groupStageHtml(g, step.speaker, step.text, body, "talk", step.phase));
        const timer = startBar(step.window || gc.window_seconds, () => done(null));
        on(".options button", "click", (e) => { if (timer) timer.stop(); done(opts[Number(e.currentTarget.dataset.i)]); });
      });
      const regret = choice ? bestEv - g.ev(choice) : bestEv + 1;
      if (regret > worst.regret) worst = { regret, step };
      if (!choice) {
        g.miss(step);
        run.log.push({ round: "群面", q: step.text, choice: "（错过了插话窗口）", explain: step.explain, regret: regret * 2 });
        await groupReact(g, "observer", "（话头被别人接走了。）");
        continue;
      }
      const res = g.choose(step, choice);
      run.log.push({ round: "群面", q: step.text, choice: choice.text, explain: step.explain, regret: regret * 2 });
      if (res.redline) {
        await groupReact(g, "observer", "（观察员在你的名字旁边画了个叉。）");
        resolve({ eliminated: { stage: "group", stageName: "群面", title: `${c.company.name} · 群面踩了红线`, explain: step.explain, quote: choice.text, tags: ["视野与取舍"], dexKey: `${c.combo.id}:group:${choice.id}` } });
        return;
      }
      if (res.bad && choice.reply_bad) await groupReact(g, choice.reply_bad.speaker, choice.reply_bad.line);
      else if (choice.reply) await groupReact(g, choice.reply.speaker, choice.reply.line);
    }
    const gr = g.finish();
    await groupReveal(g, gr);
    if (!gr.passed) {
      resolve({ eliminated: { stage: "group", stageName: "群面", title: `${c.company.name} · 群面排在第 ${gr.rank} 名`, explain: `${gr.conclusionOk ? "" : `${gc.conclusion.fail_text}\n\n`}前 ${gc.advance_top} 名晋级，你排第 ${gr.rank}。最亏的一步在「${worst.step.phase}」：${worst.step.explain}`, tags: ["视野与取舍"], dexKey: `${c.combo.id}:group:rank` } });
      return;
    }
    gr.flags.forEach((f) => run.interview.flags.add(f));
    run.extra.groupRank = gr.rank;
    resolve({ ok: true });
  });
}

function groupReact(g, speaker, line) {
  return new Promise((resolve) => {
    render(groupStageHtml(g, speaker, line, '<div class="spacer"></div><button class="primary block" data-act="next">继续</button>', "talk"));
    on("[data-act=next]", "click", () => resolve());
  });
}

function groupReveal(g, gr) {
  const gc = S.c.group;
  const dimKeys = Object.keys(gc.dims);
  const rows = [{ name: "你", dims: gr.dims, total: gr.player, me: true }, ...gc.npcs.map((n) => ({ name: `${n.name}（${n.type}）`, dims: gr.npcDims[n.id], total: gr.npcTotals[n.id] }))]
    .sort((a, b) => b.total - a.total || (a.me ? 1 : -1));
  return new Promise((resolve) => {
    render(`<div class="screen">
      <h2>群面 · 观察员评分表</h2>
      ${gr.conclusionOk ? '<p class="tag good">小组按时交出了结论</p>' : `<p class="tag bad">${esc(gc.conclusion.fail_text)}</p>`}
      <div style="overflow-x:auto"><table class="score-table"><tr><th>名次</th><th>候选人</th>${dimKeys.map((k) => `<th title="${esc(gc.dims[k])}">${esc(gc.dims[k].slice(0, 2))}</th>`).join("")}<th>合计</th></tr>
        ${rows.map((r, i) => `<tr class="${r.me ? "me" : ""} ${i + 1 === gc.advance_top ? "cut" : ""}"><td>${i + 1}</td><td>${esc(r.name)}</td>${dimKeys.map((k) => `<td>${r.dims[k]}</td>`).join("")}<td><b>${r.total}</b></td></tr>`).join("")}
      </table></div>
      <p class="fine">红线以上的前 ${gc.advance_top} 名晋级。${gr.passed ? "你晋级了。" : "你没能晋级。"}</p>
      <button class="primary block" data-act="next">${gr.passed ? "等通知" : "看看为什么"}</button>
    </div>`);
    on("[data-act=next]", "click", () => resolve());
  });
}

// ---------------------------------------------------------------- 面试轮

function roundCtx(rnd) {
  return { scene: rnd.scene, roundLabel: rnd.name, art: rnd.interviewer.art, nameplate: rnd.interviewer.title };
}

async function playRound(stageIdx, rid) {
  const c = S.c;
  const run = S.run;
  const rnd = c.rounds[rid];
  const iv = c.company.interview;
  const it = run.interview;
  const useAlt = (run.retry[rid] || 0) % 2 === 1;
  const ctx = roundCtx(rnd);
  const line = passLine(c, rid);
  const start = iv.start + run.carry;
  let score = start;
  let thinkUsed = false;
  const rows = [];

  // 轮次数据里写了 hello 就用它（比如二面要先把编程题说清楚）
  const hello = rnd.hello || (rid === "cross" ? "你好，我是另一个业务线的，今天给你加一轮。放轻松，随便聊聊。"
    : rnd.pressure ? "我后面还有个会，我们抓紧时间。" : spaced(`你好，我是今天${rnd.name}的面试官。我们开始吧。`));
  await react(ctx, { face: rnd.pressure ? "frown" : "calm", line: hello, pre: rnd.pressure && !relaxed() ? ["（这一轮答题时间更短）"] : [], button: "开始" });

  for (const slot of rnd.flow) {
    const node = it.nodeFor(slot, rnd, useAlt);
    const best = Math.max(...it.resolve(node.options, 0).map(optionEv));
    // 题面和解析里可能有按简历填的占位（比如第一页第一行是什么），选项文字由 resolve 填好
    const entry = { round: rnd.name, q: it.fill(node.text), tag: node.tag, kind: node.kind, explain: it.fill(node.explain), delta: 0, time: 0, chain: [], best };
    let text = entry.q;
    let options = node.options;
    let level = 0;
    let bound = null;
    for (;;) {
      const ans = await ask(ctx, { text, code: node.code, options: shuffle(it.resolve(options, level, bound)), thinkAvailable: !thinkUsed, pressure: !!rnd.pressure });
      thinkUsed = thinkUsed || ans.usedThink;
      score += ans.penalty;
      entry.time += ans.penalty;
      entry.delta += ans.penalty;
      if (!ans.option) {
        entry.chain.push({ q: text, a: "（卡壳了，时间到）" });
        await react(ctx, { face: "frown", line: level ? "嗯……那我们先往下走。" : "没关系，你先说说想到的……好，我们看下一题。" });
        break;
      }
      const o = ans.option;
      entry.chain.push({ q: text, a: o.text });
      for (const f of o.flags || []) it.flags.add(f);
      if (o.type === "redline") {
        rows.push(entry);
        run.log.push(entry);
        await react(ctx, { face: o.face, line: o.line, button: "……" });
        return { eliminated: { stage: rid, stageName: rnd.name, title: `${c.company.name} · ${rnd.name}踩了红线`, explain: entry.explain, quote: o.text, tags: [node.tag], dexKey: `${c.combo.id}:${rid}:${o.id}` } };
      }
      await react(ctx, { face: o.face, line: o.line });
      if (o.type === "bold") {
        text = o.followup.text;
        options = o.followup.options;
        bound = o._bind;
        level += 1;
        continue;
      }
      if (o.type === "hold") run.holds += 1;
      score += o.delta;
      entry.delta += o.delta;
      break;
    }
    rows.push(entry);
    run.log.push(entry);
  }

  const passed = score >= line;
  await roundReveal(rnd, rows, start, score, line, passed);
  return { score, passed, rows };
}

async function playRoundStage(stageIdx, rid) {
  const c = S.c;
  const run = S.run;
  const r = await playRound(stageIdx, rid);
  if (r.eliminated) return r;
  if (!r.passed) return { eliminated: lowScoreElimination(c.rounds[rid], r) };
  const line = passLine(c, rid);
  const m = r.score - line - (rid === firstRound(c) ? run.bonus : 0);
  run.margins[rid] = m;
  run.carry = m * c.company.interview.carry;
  return { ok: true };
}

async function playCross(stageIdx) {
  const c = S.c;
  const run = S.run;
  const zone = crossZone(c, run.margins);
  run.zone = zone;
  if (!zone) return { skipped: true };
  const r = await playRound(stageIdx, "cross");
  if (r.eliminated) return r;
  if (zone === "uncertain" && !r.passed) return { eliminated: { ...lowScoreElimination(c.rounds.cross, r), title: `${c.company.name} · 交叉面没过（加面是因为业务面表现拿不准）` } };
  run.sspQualified = zone === "ssp" && r.passed;
  run.extra.crossPassed = r.passed;
  return { ok: true };
}

const NO_HIGHLIGHT = "这一轮没有哪题答砸，但稳妥的回答只能小幅加分；要过线，得有几题接住追问。";

function lowScoreElimination(rnd, { rows, score }) {
  const c = S.c;
  const worst2 = [...rows].sort((a, b) => a.delta - b.delta).slice(0, 2).filter((r) => r.explain);
  const tag = worstTag(rows);
  const lead = `离通过线差 ${(passLine(c, rnd.id) - score).toFixed(1)} 分。` + (tagSums(rows)[tag] < 0 ? phrase(tag, "minus") : NO_HIGHLIGHT);
  const explain = [lead, ...worst2.map((r) => `「${r.q}」${r.explain}`)].join("\n\n");
  return { stage: rnd.id, stageName: rnd.name, title: `${c.company.name} · ${rnd.name}印象分没过线`, explain, tags: [tag], dexKey: `${c.combo.id}:${rnd.id}:low:${tag}` };
}

function tagSums(rows) {
  const sums = {};
  for (const r of rows) sums[r.tag] = (sums[r.tag] || 0) + (r.delta - (r.time || 0));
  return sums;
}
function worstTag(rows) {
  const sums = tagSums(rows);
  return Object.keys(sums).reduce((a, b) => (sums[b] < sums[a] ? b : a), Object.keys(sums)[0]);
}
function phrase(tag, kind) {
  const p = S.c.company.review_phrases[tag];
  return p ? p[kind] : "";
}

function roundReveal(rnd, rows, start, score, line, passed) {
  return new Promise((resolve) => {
    const sums = tagSums(rows);
    const tags = Object.keys(sums);
    const best = tags.reduce((a, b) => (sums[b] > sums[a] ? b : a), tags[0]);
    const worst = tags.reduce((a, b) => (sums[b] < sums[a] ? b : a), tags[0]);
    const lines = [];
    if (sums[best] > 0 && phrase(best, "plus")) lines.push(phrase(best, "plus"));
    if (sums[worst] < 0 && phrase(worst, "minus")) lines.push(phrase(worst, "minus"));
    if (!passed && !(sums[worst] < 0)) lines.push(NO_HIGHLIGHT);
    if (!lines.length) lines.push("整体表现中规中矩。");
    const max = Math.max(line * 1.6, score + 5);
    // 冲 SSP 的交叉面没答好不淘汰，只是拿不到 SSP 资格。
    const soft = !passed && rnd.id === "cross" && S.run.zone === "ssp";
    render(`<div class="screen">
      <h2>${esc(rnd.name)} · 揭晓</h2>
      <div class="reveal-list">
        <div class="r"><span class="q">起始分（${rnd.id === firstRound(S.c) ? `含简历${S.c.test ? "、笔试" : ""}的加成` : "含上一轮的面评"}）</span><span class="delta">${start.toFixed(1)}</span></div>
        ${rows.map((r) => `<div class="r"><span class="q">${esc(r.q)}${r.time ? `<span class="fine">（含时间 ${fmtDelta(r.time)}）</span>` : ""}</span><span class="delta ${r.delta > 0 ? "up" : r.delta < 0 ? "down" : ""}">${fmtDelta(r.delta)}</span></div>`).join("")}
      </div>
      <div class="scorebar"><div class="fill"></div><div class="passline" style="left:${(line / max) * 100}%"><span>通过线 ${line}</span></div></div>
      <p>印象分 <b>${score.toFixed(1)}</b> · ${passed ? '<span class="tag good">过了</span>' : '<span class="tag bad">没过</span>'}</p>
      <div class="letter"><b>面评卡</b><br>${lines.map(esc).join("<br>")}</div>
      ${soft ? '<p class="fine">这一轮没答好。offer 不受影响，只是冲不了 SSP 了。</p>' : ""}
      <button class="primary block" data-act="next">${passed || soft ? "等通知" : "看看为什么"}</button>
    </div>`);
    requestAnimationFrame(() => { const f = app.querySelector(".scorebar .fill"); if (f) f.style.width = `${Math.min(100, (score / max) * 100)}%`; });
    on("[data-act=next]", "click", () => resolve());
  });
}

// ---------------------------------------------------------------- 淘汰与重来

const SERVICES = {
  resume: ["简历上传与优化：想知道你自己的简历过不过得了这一关？上传试试。", "岗位格 · 过筛选"],
  专业: ["题库", "技术底座 / 专业能力"],
  项目表达: ["面试官视角 · 业务面试官", "AI 模拟面试（专业版）"],
  动机与稳定: ["面试官视角 · HR"],
  视野与取舍: ["面试官视角 · 用人负责人"],
  诚信: ["简历优化", "“提升 20% 怎样被验证”"],
  neg: ["岗位格 · 谈薪"],
};

async function eliminate(e) {
  const c = S.c;
  const run = S.run;
  if (!run.firstFail) run.firstFail = e.stageName;
  setProgress(c, { status: "out", stage: e.stage, stageName: e.stageName });
  const firstKey = `${KEY.first}:${c.combo.id}`;
  if (run.attempt === 1 && !store.get(firstKey, null)) store.set(firstKey, { result: "eliminated", stage: e.stageName });
  const dex = store.get(KEY.dex, {});
  const fresh = !dex[e.dexKey];
  dex[e.dexKey] = { title: e.title, explain: e.explain };
  store.set(KEY.dex, dex);
  store.del(KEY.save);
  if (e.stage !== "resume") await letterScreen("reject");
  eliminationScreen(e, fresh);
}

// 淘汰页。复盘的“最重要的 3 点”和结算页一样要解锁；挂掉的那一题已经在上面单独讲了，不再算进 3 点里。
function eliminationScreen(e, fresh) {
  const c = S.c;
  const run = S.run;
  const services = [...new Set(e.tags.flatMap((t) => SERVICES[t] || []))];
  const last = run.log[run.log.length - 1];
  const fatal = e.quote && last && (last.choice === e.quote || (last.chain && last.chain.some((x) => x.a === e.quote)));
  // 简历关没过时还没有逐题的复盘（run.log 里可能是上一次的记录），不显示这一块
  const bombs = e.stage === "resume" ? [] : unprobedBombs();
  const { html: review, rest } = e.stage === "resume" ? { html: "", rest: 0 } : reviewBlock(fatal ? run.log.slice(0, -1) : run.log, bombs);
  const highlight = run.holds ? `接住了 ${run.holds} 次追问` : "下一次再冲";
  const achs = runAchievements("out", { stage: e.stage, redline: !!e.quote });
  const card = shareCardHtml({ c, headline: spaced(`${c.company.name} · 止步${e.stageName}`), record: spaced(`第 ${run.attempt} 次挑战`), highlight, big: true, achs });
  // 有了 3 点复盘，上面的复盘只留第一段（原因），逐题的解析看下面
  const explain = review ? e.explain.split("\n\n")[0] : e.explain;
  render(`<div class="screen">
    <h2>${esc(e.title)}</h2>
    ${e.quote ? `<div class="card"><span class="fine">你说的是</span><br>“${esc(e.quote)}”</div>` : ""}
    <div class="card"><b>挂在哪</b><p class="fine">${esc(explain)}</p></div>
    ${fresh ? '<p class="tag">淘汰图鉴 +1：收集到一种新挂法</p>' : ""}
    ${review}
    <div class="card"><b>去补一补</b><div class="services">${services.map((s) => `<button class="small" data-act="svc">${esc(s)}</button>`).join("")}</div><p class="fine">原型里这些入口不跳转。</p></div>
    ${e.stage === "resume"
      ? '<button class="primary block" data-act="resume">重新拼一次</button>'
      : '<button class="primary block" data-act="retry">重打这一轮</button><button class="block" data-act="resume">回到简历关重新拼</button>'}
    <button class="ghost block" data-act="home">回首页</button>
  </div>`);
  bindReview(card, rest, bombs.length, () => eliminationScreen(e, false));
  on("[data-act=svc]", "click", () => alert("原型里服务入口不跳转。"));
  on("[data-act=home]", "click", titleScreen);
  on("[data-act=resume]", "click", () => { run.attempt += 1; setProgress(c, { status: "in_progress", stage: "resume", stageName: "简历关" }); resumeScreen(); });
  on("[data-act=retry]", "click", () => {
    run.attempt += 1;
    const i = e.stageIdx;
    const pre = run.pre[i];
    run.interview.restore(pre.snap);
    Object.assign(run, { carry: pre.carry, margins: { ...pre.margins }, bonus: pre.bonus, holds: pre.holds, sspQualified: pre.sspQualified, zone: pre.zone, extra: { ...pre.extra } });
    run.log = run.log.slice(0, pre.logLen);
    run.retry[c.stages[i]] = (run.retry[c.stages[i]] || 0) + 1;
    setProgress(c, { status: "in_progress", stage: c.stages[i], stageName: stageName(c.stages[i]) });
    runStages(i);
  });
}

// ---------------------------------------------------------------- 存档

function saveProgress(nextIdx, nextName) {
  const run = S.run;
  store.set(KEY.save, {
    label: `${S.c.company.name} · ${S.c.persona.name} · 下一关：${nextName}`, comboId: run.comboId, start: run.start,
    nextIdx, resume: run.resume, skipped: run.skipped, resumeScore: run.resumeScore, bonus: run.bonus,
    snap: run.interview.snapshot(), margins: run.margins, carry: run.carry, attempt: run.attempt, firstFail: run.firstFail,
    retry: run.retry, log: run.log, holds: run.holds, appearance: run.appearance, sspQualified: run.sspQualified, zone: run.zone, extra: run.extra,
  });
}

// 旧版存档记的是切片号
const OLD_SLICE = { slice1: "midcorp-fe-linke", slice2: "bigcorp-pm-xunuo", slice3: "unicorn-fe-zhouan" };

async function continueFromSave() {
  const s = store.get(KEY.save, null);
  const id = s && (s.comboId || OLD_SLICE[s.sliceId]);
  if (!id) return titleScreen();
  try { S.c = await comboContent(id); } catch { store.del(KEY.save); return titleScreen(); }
  newRun(s.appearance, s.start || startState(S.c));
  Object.assign(S.run, { resume: s.resume, skipped: s.skipped, resumeScore: s.resumeScore, bonus: s.bonus, margins: s.margins, carry: s.carry,
    attempt: s.attempt, firstFail: s.firstFail, retry: s.retry, log: s.log, holds: s.holds, sspQualified: s.sspQualified, zone: s.zone, extra: s.extra || {} });
  S.run.interview = new Interview(S.c, s.resume, startFlags(), S.run.start.vars);
  S.run.interview.restore(s.snap);
  runStages(s.nextIdx);
}

// ---------------------------------------------------------------- 谈薪

async function playNegotiation(stageIdx) {
  const c = S.c;
  const run = S.run;
  const it = run.interview;
  run.pre[stageIdx] = { snap: it.snapshot(), carry: run.carry, margins: { ...run.margins }, bonus: run.bonus, logLen: run.log.length,
    holds: run.holds, sspQualified: run.sspQualified, zone: run.zone, extra: { ...run.extra } };
  const total = Object.values(run.margins).reduce((a, b) => a + b, 0);
  const base = baseTier(c, total);
  const neg = new Negotiation(c, it.flags, S.run.start.vars);
  const ctx = { scene: c.neg.scene, roundLabel: negName(c), art: c.neg.interviewer.art, nameplate: c.neg.interviewer.title };
  let finalShown = false;
  let step;
  while ((step = neg.next())) {
    if (step.node.kind === "inspect") {
      await inspectOffer(neg, step, base, ctx);
      continue;
    }
    const ans = await ask(ctx, { text: step.node.text, options: shuffle(step.options), pre: step.pre.map((p) => p.line), waitPenalty: false, timeoutPenalty: 0 });
    if (!ans.option) {
      neg.timeout();
      run.log.push({ round: negName(c), q: step.node.text, choice: "（冷场了，时间到）", explain: step.node.explain, regret: (Math.max(...step.options.map(negValue)) + 1) * 3 });
      await react(ctx, { face: "calm", line: "那我们就按标准方案来。" });
      continue;
    }
    const o = ans.option;
    const res = neg.choose(o);
    run.log.push({ round: negName(c), q: step.node.text, choice: o.text, explain: step.node.explain, regret: (Math.max(...step.options.map(negValue)) - negValue(o)) * 3 });
    if (neg.redline) {
      await react(ctx, { face: o.face, line: o.line, button: "……" });
      return eliminate({ stage: "neg", stageIdx, stageName: negName(c), title: `${c.company.name} · ${negName(c)}时 offer 被撤回`, explain: step.node.explain, quote: o.text, tags: ["neg"], dexKey: `${c.combo.id}:neg:${o.id}` });
    }
    await react(ctx, { face: o.face, line: o.line, pre: res.pre.map((p) => p.line) });
    if (neg.finalOffer && !finalShown) {
      finalShown = true;
      await react(ctx, { face: "frown", line: "这样吧，这已经是我们能给的最终方案了。" });
    }
  }
  resultScreen(base, neg.finish(), neg);
}

function termValue(t, tierName) {
  const row = S.c.company.salary_table[tierName];
  return t.value.replace("{salary}", row.salary).replace("{months}", row.months).replace("{signing}", row.signing || "无").replace("{options}", row.options || 0);
}
// 条款细节里的 {bonus_months}：超出 12 个月的那几个月（年终奖），按档位算
function termDetail(t, tierName) {
  const row = S.c.company.salary_table[tierName];
  return t.detail.replace("{bonus_months}", Math.max(0, row.months - 12));
}

// 这一档的待遇。谈薪数据里有 packages（独角兽的高现金 / 平衡 / 高期权）时，按选的方案换算月薪和期权，没选就是平衡方案。
function payRow(tierName, pkgId) {
  const row = S.c.company.salary_table[tierName];
  const pkgs = S.c.neg.packages;
  if (!pkgs) return row;
  const id = pkgId || "balanced";
  const pkg = pkgs[id];
  return { ...row, salary: row.salary + pkg.salary, options: Math.round(row.options * pkg.options), pkg: pkg.label };
}
function payText(r) {
  const signing = r.signing && r.signing !== "无" ? `，签字费 ${r.signing}` : "";
  const options = r.options ? `，期权 ${r.options} 股` : "";
  return `${r.pkg ? `${r.pkg}方案：` : ""}月薪 ${r.salary}k × ${r.months} 薪${signing}${options}`;
}

function inspectOffer(neg, step, base, ctx) {
  return new Promise((resolve) => {
    const c = S.c;
    const tierName = TIERS[base];
    let timer = null;
    const done = () => { if (timer) timer.stop(); resolve(); };
    const draw = () => {
      const terms = c.neg.offer_terms.map((t) => `<button class="term" data-t="${t.id}">${esc(t.label)}<span class="val">${esc(termValue(t, tierName))}</span>
        ${neg.opened.has(t.id) ? `<span class="detail">${esc(termDetail(t, tierName))}</span>` : '<span class="fine">点开看细节</span>'}</button>`).join("");
      const body = `${timerBar()}<div class="terms">${terms}</div>
        <p class="fine">每点开一条要花 ${c.neg.open_seconds} 秒，时间够全部看一遍。</p>
        <button class="primary block" data-act="done">看完了</button>`;
      render(stageHtml({ ...ctx, face: "calm", text: step.node.text, body }));
      on("[data-t]", "click", (e) => {
        const id = e.currentTarget.dataset.t;
        if (neg.opened.has(id)) return;
        neg.open(id);
        if (timer) timer.consume(c.neg.open_seconds);
        draw();
      });
      on("[data-act=done]", "click", done);
      if (timer) timer.tick();
    };
    draw();
    // 时间够把每条都点开看一遍，再留 8 秒读；原来固定 20 秒，条款一多根本看不完，结算时却怪玩家没看全
    timer = startBar(c.neg.open_seconds * c.neg.offer_terms.length + 8, done);
  });
}

// ---------------------------------------------------------------- 结算

// 谈薪选项的价值（谈判分加半个好感），和 tools/engine_parity.mjs 的判断一致；只用来挑复盘重点。
function negValue(o) {
  if (o.redline) return -99;
  if (o.next === "neg_bluff") return -1.5;
  return (o.T || 0) + 0.5 * (o.R || 0);
}

// ---------------------------------------------------------------- 结算复盘的解锁（原型只模拟交互，不接真实支付、分享和跳转）
// 没解锁时，完整复盘只显示失分最多的 3 条，其余要付费或分享解锁；解锁后送一次 AI 模拟面试（正式产品入口）。
// 失分：面试题是这一题最好的选项能拿的分减去实际得分（含时间扣分）；群面、谈薪、笔试各自折算到差不多的量级。
const unlockState = () => store.get(KEY.unlock, null);
function unlockReview(method) { store.set(KEY.unlock, { method, at: new Date().toISOString(), voucher: 1, used: false }); }
function lostPoints(l) { return l.best !== undefined ? l.best - l.delta : (l.regret || 0); }

function topReview(log, n = 3) {
  const ranked = log.map((l, i) => ({ l, i, lost: lostPoints(l) })).filter((x) => x.l.explain);
  const top = ranked.filter((x) => x.lost > 0).sort((a, b) => b.lost - a.lost || a.i - b.i).slice(0, n);
  // 几乎没失分时，用得分最多的几题补足
  if (top.length < n) top.push(...ranked.filter((x) => !top.includes(x)).sort((a, b) => (b.l.delta || 0) - (a.l.delta || 0)).slice(0, n - top.length));
  return top;
}

function reviewItemHtml(l, label = "") {
  const answer = l.chain ? l.chain.map((x, i) => `${i ? `追问：${esc(x.q)}<br>` : ""}你答：${esc(x.a)}`).join("<br>") : `你选：${esc(l.choice || "")}`;
  return `<div class="item">${label ? `<b>${esc(label)}</b> ` : ""}<span class="tag">${esc(l.round)}</span> ${esc(l.q)}<br>${answer}<br><span class="fine">${esc(l.explain || "")}</span></div>`;
}

// 一个看起来像二维码的示意图案（扫不出来，正式版由程序生成真二维码）
function fakeQr(seed) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const N = 21;
  const finder = (x, y) => [[0, 0], [N - 7, 0], [0, N - 7]].some(([fx, fy]) => {
    const dx = x - fx, dy = y - fy;
    if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return false;
    return dx === 0 || dy === 0 || dx === 6 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4);
  });
  const inFinder = (x, y) => [[0, 0], [N - 8, 0], [0, N - 8]].some(([fx, fy]) => x >= fx && x < fx + 8 && y >= fy && y < fy + 8);
  let cells = "";
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      h = Math.imul(h ^ (x * 31 + y), 16777619);
      const on = inFinder(x, y) ? finder(x, y) : (h >>> 7) % 2 === 0;
      cells += on ? "<i></i>" : "<b></b>";
    }
  }
  return `<div class="fqr" aria-label="示意二维码">${cells}</div>`;
}

// ---------------------------------------------------------------- 本局小成就（分享卡上显示最难得的三个）
// p 越大越难得，挑前三个。gold / silver / bronze 只决定徽章底色。图标由美术交（UI_ach_<id>，见开工单“封面与成就图标”），
// 没到之前用程序画的小徽章，中间写一个字。
const ACHIEVEMENTS = [
  { id: "ssp", name: "冲上 SSP", desc: "拿到了这家公司的最高档", p: 90, tier: "gold", icon: "冠" },
  { id: "test_full", name: "笔试满分", desc: "笔试 6 题全对", p: 85, tier: "gold", icon: "满" },
  { id: "hold5", name: "追问收割机", desc: "一局接住 5 次以上追问", p: 80, tier: "gold", icon: "接" },
  { id: "group_top", name: "群面第一", desc: "群面排名第一", p: 80, tier: "gold", icon: "首" },
  { id: "clean", name: "零失误", desc: "每一道面试题都没有扣分", p: 75, tier: "gold", icon: "稳" },
  { id: "first_try", name: "一次拿下", desc: "第一次挑战就拿到 offer", p: 70, tier: "silver", icon: "一" },
  { id: "cross", name: "加面翻盘", desc: "业务面表现拿不准被加了一轮，靠交叉面翻了盘", p: 65, tier: "silver", icon: "翻" },
  { id: "neg_up", name: "谈判有方", desc: "谈薪升了一档", p: 60, tier: "silver", icon: "谈" },
  { id: "test_high", name: "笔试高分", desc: "笔试 80 分以上", p: 55, tier: "silver", icon: "笔" },
  { id: "hold3", name: "接得住", desc: "接住 3 次以上追问", p: 50, tier: "silver", icon: "接" },
  { id: "last_round", name: "只差一步", desc: "撑到了最后一轮面试", p: 50, tier: "silver", icon: "步" },
  { id: "reverse", name: "问到点子上", desc: "每一轮的反问都问得好", p: 45, tier: "bronze", icon: "问" },
  { id: "eagle", name: "条款火眼", desc: "offer 里不利的条款一条没漏看", p: 40, tier: "bronze", icon: "眼" },
  { id: "comeback", name: "越挫越勇", desc: "淘汰之后重来，又拿下了", p: 40, tier: "bronze", icon: "勇" },
  { id: "group_pass", name: "群面晋级", desc: "群面进了前三", p: 35, tier: "bronze", icon: "群" },
  { id: "resume", name: "简历直通", desc: "自己拼的简历稳稳过了筛选", p: 30, tier: "bronze", icon: "简" },
  { id: "hold1", name: "接住追问", desc: "接住了 1 次追问", p: 25, tier: "bronze", icon: "挡" },
  { id: "no_redline", name: "没踩红线", desc: "整局没说出踩红线的话", p: 15, tier: "bronze", icon: "安" },
  { id: "resume_pass", name: "简历过关", desc: "简历通过了筛选", p: 12, tier: "bronze", icon: "过" },
  { id: "handmade", name: "亲手拼简历", desc: "没用默认简历，自己拼了一份", p: 8, tier: "bronze", icon: "拼" },
  { id: "debut", name: "初次登场", desc: "完成了一局挑战", p: 1, tier: "bronze", icon: "初" },
];
// 门槛低的几个（接住追问、没踩红线、简历过关、亲手拼简历、初次登场）是给淘汰的局兜底的，保证大多数局都能凑满三个

// kind：offer（拿到了）或 out（被淘汰）。ctx：结算时才有的信息（档位、谈薪结果、谈薪对象），淘汰时传淘汰的关卡
function runAchievements(kind, ctx = {}) {
  const c = S.c;
  const run = S.run;
  const asked = run.log.filter((l) => l.chain && l.best !== undefined);
  const earned = new Set(["debut"]);
  // 简历关没过时 run 里还是上一次的记录，不能用。默认简历一定能过，所以挂在简历关的一定是自己拼的
  if (ctx.stage === "resume") return ACHIEVEMENTS.filter((a) => ["handmade", "debut"].includes(a.id));
  earned.add("resume_pass");
  if (!run.skipped) earned.add("handmade");
  if (!ctx.redline) earned.add("no_redline");
  if (kind === "offer") {
    if (ctx.tier === 3) earned.add("ssp");
    if (run.attempt === 1) earned.add("first_try");
    else earned.add("comeback");
    if (ctx.fin && ctx.fin.shift > 0) earned.add("neg_up");
    if (ctx.neg && !ctx.neg.unopenedBadTerms().length) earned.add("eagle");
    if (asked.length && asked.every((l) => l.delta >= 0)) earned.add("clean");
    if (run.zone === "uncertain" && run.extra.crossPassed) earned.add("cross");
  } else if (ctx.stage && ctx.stage === lastRound(c)) earned.add("last_round");
  if (run.holds >= 5) earned.add("hold5");
  else if (run.holds >= 3) earned.add("hold3");
  else if (run.holds >= 1) earned.add("hold1");
  if (run.extra.testScore === 100) earned.add("test_full");
  else if (run.extra.testScore >= 80) earned.add("test_high");
  if (run.extra.groupRank === 1) earned.add("group_top");
  else if (run.extra.groupRank) earned.add("group_pass");
  const reverses = asked.filter((l) => l.kind === "reverse");
  if (reverses.length >= 2 && reverses.every((l) => l.delta >= l.best)) earned.add("reverse");
  if (!run.skipped && run.resumeScore !== undefined && run.resumeScore >= c.company.resume_screen.pass_line + 0.5) earned.add("resume");
  return ACHIEVEMENTS.filter((a) => earned.has(a.id)).sort((a, b) => b.p - a.p).slice(0, 3);
}

function achievementsHtml(list, big = false) {
  if (!list.length) return "";
  return `<div class="achs${big ? " big" : ""}">${list.map((a) => {
    const ico = hasArt(`UI_ach_${a.id}`) ? `<img src="art/UI_ach_${a.id}.png" alt="">` : `<i>${esc(a.icon)}</i>`;
    return `<span class="ach ${a.tier}" title="${esc(a.desc)}"><span class="ach-ico">${ico}</span><b>${esc(a.name)}</b>${big ? `<span class="fine">${esc(a.desc)}</span>` : ""}</span>`;
  }).join("")}</div>`;
}

function shareCardHtml({ c, headline, record, highlight, big = false, achs = [] }) {
  return `<div class="share${big ? " big" : ""}">
    <div class="row">${sprite(personaArt(), "happy", "small")}<div><b>面试挑战</b><br><span class="fine" style="color:#cfd6e4">${esc(c.persona.name)} · ${esc(c.persona.label)}</span></div></div>
    <div class="tier-line">${esc(headline)}</div>
    <div>${esc(record)}</div>
    <div>${esc(highlight)}</div>
    ${achievementsHtml(achs, big)}
    <div class="row">${relaxed() ? '<span class="tag">从容模式</span>' : ""}<span class="spacer"></span>${fakeQr(`${c.combo.id}:${headline}:${record}`)}</div>
    ${big ? '<p class="fine" style="color:#cfd6e4">扫码挑战同一家公司</p>' : ""}
  </div>`;
}

// 复盘区块：最重要的 3 点 + 其余部分（没解锁时锁住）。结算页和淘汰页共用。
// bombs：简历里写了夸大、这局又没被追问到的写法 ID。
function reviewBlock(log, bombs) {
  const c = S.c;
  const unlocked = unlockState();
  const top = topReview(log);
  const rest = log.filter((l, i) => l.explain && !top.some((x) => x.i === i));
  if (!top.length) return { html: "", rest: 0 };
  const bombHtml = bombs.map((vid) => `<div class="item"><b>没被追问到的雷：</b>你写的“${esc(c.variants[vid].v.text)}”这次没被问到。真面试里，这种话迟早会被问。</div>`).join("");
  const more = rest.length + bombs.length;
  const html = `<h3>复盘：最重要的 ${top.length} 点</h3>
    <div class="review-top">${top.map((x, k) => reviewItemHtml(x.l, x.lost > 0 ? `第 ${k + 1} 点` : `第 ${k + 1} 点 · 做得好`)).join("")}</div>
    ${!more ? "" : unlocked
      ? `<details class="review" open><summary>其余复盘（${rest.length} 条${bombs.length ? `，另有 ${bombs.length} 个没被追问到的雷` : ""}）</summary>${bombHtml}${rest.map((l) => reviewItemHtml(l)).join("")}</details>`
      : `<div class="card locked-review">
          <b>还有 ${rest.length} 条复盘${bombs.length ? `、${bombs.length} 个没被追问到的简历雷` : ""}</b>
          <div class="locked-rows" aria-hidden="true"><i></i><i></i><i></i></div>
          <p class="fine">付费或者分享给好友，就能解锁全部，再送你一次 AI 模拟面试。</p>
          <div class="row"><button class="block" data-act="unlock-share">分享解锁</button><button class="primary block" data-act="unlock-pay">付费解锁</button></div>
        </div>`}`;
  return { html, rest: rest.length };
}

// 复盘区块和分享入口的按钮。back：解锁或分享完回到哪个界面（重新画一遍当前页）。
function bindReview(card, restCount, bombCount, back) {
  const afterUnlock = () => giftOverlay(() => aiEntry(back), back);
  on("[data-act=unlock-share]", "click", () => sharePage(card, afterUnlock, back));
  on("[data-act=share-page]", "click", () => sharePage(card, unlockState() ? back : afterUnlock, back));
  on("[data-act=unlock-pay]", "click", () => payOverlay(restCount, bombCount, afterUnlock));
  on("[data-act=ai]", "click", () => aiEntry(back));
}

function unprobedBombs() {
  const c = S.c;
  const run = S.run;
  return (run.resume ? run.resume.order : []).filter((vid) => c.variants[vid].v.type === "exag" && !run.interview.probesUsed.has(c.variants[vid].v.probe));
}

function notice(title, text, button = "知道了") {
  return new Promise((resolve) => {
    openOverlay(`<h2>${esc(title)}</h2><p>${esc(text)}</p><button class="primary block" data-act="ok">${esc(button)}</button>`, (root) => {
      on("[data-act=ok]", "click", () => { closeOverlay(); resolve(); }, root);
    });
  });
}

// 社交分享页：大号分享卡 + 二维码。原型里“分享”直接算成功；正式版要调起微信分享，确认分享成功后再解锁。
function sharePage(card, onShared, onBack) {
  render(`<div class="screen">
    <h2>分享战绩</h2>
    <p class="fine">分享给好友，就能解锁完整复盘，再送你一次 AI 模拟面试。</p>
    ${card}
    <p class="fine center">好友扫码，直接挑战同一家公司。（示意二维码，正式版由程序生成）</p>
    <button class="primary block" data-act="share">分享给好友（模拟）</button>
    <button class="block" data-act="save">保存图片（模拟）</button>
    <button class="ghost block" data-act="back">先不分享，返回</button>
  </div>`);
  on("[data-act=save]", "click", () => notice("保存图片", "正式版会把这张卡生成图片，保存到相册。原型里不生成。"));
  on("[data-act=back]", "click", onBack);
  on("[data-act=share]", "click", async () => {
    // 已经解锁过的再分享，只是分享，不再送一次
    const first = !unlockState();
    await notice("已分享（模拟）", first ? "正式版这里会调起微信分享，确认分享成功后才解锁。原型里直接当作分享成功。" : "正式版这里会调起微信分享。", "好");
    if (first) unlockReview("share");
    onShared();
  });
}

function payOverlay(rest, bombs, onPaid) {
  openOverlay(`<h2>解锁完整复盘</h2>
    <ul>
      <li>剩下的 ${rest} 条复盘和解析</li>
      ${bombs ? `<li>${bombs} 个这次没被追问到的简历雷</li>` : ""}
      <li>送一次 AI 模拟面试：同一个岗位、同样的面试官，换成自由作答</li>
    </ul>
    <p>价格：待定</p>
    <p class="fine">这笔钱相当于那次 AI 模拟面试的成本。原型不接支付，点下面的按钮直接算付款成功。</p>
    <button class="primary block" data-act="paid">模拟付款成功</button>
    <button class="ghost block" data-act="cancel">先不了</button>`, (root) => {
    on("[data-act=cancel]", "click", closeOverlay, root);
    on("[data-act=paid]", "click", () => { closeOverlay(); unlockReview("pay"); onPaid(); }, root);
  });
}

function giftOverlay(onUse, onLater) {
  openOverlay(`<h2>完整复盘已解锁</h2>
    <div class="card"><b>AI 模拟面试 · 免费一次</b><p class="fine">同一个岗位、同样的面试官，这次没有选项，你得自己说出来。</p></div>
    <button class="primary block" data-act="use">现在就去</button>
    <button class="block" data-act="later">先看复盘</button>`, (root) => {
    on("[data-act=use]", "click", () => { closeOverlay(); onUse(); }, root);
    on("[data-act=later]", "click", () => { closeOverlay(); onLater(); }, root);
  });
}

// AI 模拟面试入口（正式产品）。原型不跳转，只模拟用掉免费的那一次。
function aiEntry(back) {
  const u = unlockState();
  const free = u && !u.used;
  render(`<div class="screen">
    <h2>AI 模拟面试</h2>
    <p>同一个岗位、同样的面试官，这次没有选项，你得自己说出来。</p>
    <div class="card"><b>${free ? "免费一次 · 可用" : u ? "免费的那一次已经用过" : "还没有免费次数"}</b>
      <p class="fine">${free ? `来自${u.method === "pay" ? "付费" : "分享"}解锁完整复盘时的赠送。` : u ? "可以单独购买（价格待定）。" : "解锁完整复盘时会送一次。"}</p></div>
    <p class="fine">这里是正式产品的入口，原型不跳转。</p>
    <button class="primary block" data-act="start">${free ? "用免费的那一次开始" : "去 AI 模拟面试"}</button>
    <button class="ghost block" data-act="back">返回</button>
  </div>`);
  on("[data-act=back]", "click", back);
  on("[data-act=start]", "click", async () => {
    if (free) store.set(KEY.unlock, { ...u, used: true });
    await notice("进入 AI 模拟面试", free ? "正式版这里进入 AI 模拟面试，这次免费。" : "正式版这里进入 AI 模拟面试的购买页。", "好");
    back();
  });
}

function resultScreen(base, fin, neg) {
  const c = S.c;
  const run = S.run;
  const again = () => resultScreen(base, fin, neg);
  const cap = tierCap(c, run.sspQualified);
  const tier = finalTier(base, fin.shift, cap);
  const tierName = TIERS[tier];
  const row = payRow(tierName, neg.package);
  const firstKey = `${KEY.first}:${c.combo.id}`;
  if (run.attempt === 1 && !store.get(firstKey, null)) store.set(firstKey, { result: "offer", tier: tierName });
  setProgress(c, { status: "offer", rank: tier, tier: tierName });
  store.del(KEY.save);
  const bd = c.neg.breakdown || { wins: [] };
  const won = (w) => w.ids.some((id) => neg.chosen.has(id));
  const got = [payText(row), ...bd.wins.map((w) => (won(w) ? w.text : w.else)).filter(Boolean)];
  const bestTier = TIERS[Math.min(cap, base + 1)];
  const best = [`${payText(payRow(bestTier, neg.package))}（${bestTier}）`, ...bd.wins.map((w) => w.text)];
  const missed = [...neg.unopenedBadTerms().map((t) => `没点开「${t.label}」：${termDetail(t, TIERS[base])}`), ...bd.wins.filter((w) => !won(w)).map((w) => w.missed)];
  const shiftText = `${negName(c)}${fin.shift > 0 ? "升了一档" : fin.shift < 0 ? "降了一档" : "没变档"}`;
  const capText = c.company.tiers.ssp_requires_cross
    ? (run.zone === "ssp" ? (run.sspQualified ? "交叉面：你进了冲 SSP 的加面，并且接住了，拿到了 SSP 资格。" : "交叉面：你进了冲 SSP 的加面，但没答好，最高只能到 SP。")
      : run.zone === "uncertain" ? "交叉面：你的业务面表现处在“拿不准”的区间，靠加面翻了盘，最高到 SP。"
        : "交叉面：业务面表现在中间，没有触发交叉面。大厂的 SSP 只能通过交叉面拿到。")
    : "";
  const record = spaced(run.firstFail ? `首次止步${run.firstFail}，第 ${run.attempt} 次拿下 ${tierName}` : `首次挑战就拿下 ${tierName}`);
  const highlight = run.holds ? `接住了 ${run.holds} 次追问` : "全程稳扎稳打";
  const bombs = unprobedBombs();
  const achs = runAchievements("offer", { tier, fin, neg });
  const card = (big) => shareCardHtml({ c, headline: `${c.company.name} · ${tierName}`, record, highlight, big, achs });
  const { html: review, rest } = reviewBlock(run.log, bombs);
  const unlocked = unlockState();
  const aiFree = unlocked && !unlocked.used;
  render(`<div class="screen">
    <h2>开奖</h2>
    <div class="row">${hasArt(`UI_badge_${BADGE[tier]}`) ? `<img class="badge-art" src="art/UI_badge_${BADGE[tier]}.png" alt="${tierName}">` : `<div class="badge t${tier}">${tierName}</div>`}<div><h3>${esc(c.company.name)} · ${tierName}</h3><p class="fine">面试定的基础档位：${TIERS[base]}；${shiftText}（谈判分 ${fin.T}${fin.penalty ? `，含漏看条款 −${fin.penalty}` : ""}）</p></div></div>
    ${capText ? `<p class="fine">${esc(capText)}</p>` : ""}
    ${hasArt("UI_offer_letter") ? '<img class="letter-art" src="art/UI_offer_letter.png" alt="">' : ""}
    <div class="letter">${esc(c.company.letters.offer)}<br><b>${esc(payText(row))}</b>${row.note ? `（${esc(row.note)}）` : ""}<span class="aside">${esc(c.company.salary_table._note)}</span></div>
    <h3>offer 拆解</h3>
    <div class="compare">
      <div class="col"><h3>你拿到的</h3><ul>${got.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
      <div class="col"><h3>这一档最好</h3><ul>${best.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
      <div class="col"><h3>你漏掉的</h3><ul>${missed.length ? missed.map((x) => `<li>${esc(x)}</li>`).join("") : "<li>没有</li>"}</ul></div>
    </div>
    ${review}
    <h3>分享卡</h3>
    ${card(false)}
    <button class="block" data-act="share-page">去分享页</button>
    <p class="fine">正式版会把分享卡生成图片，长按保存；不显示薪资数字。</p>
    <div class="card"><b>选项里你能挑对，真面试却得自己说出来。</b><p class="fine">同一个岗位、同样的面试官，换成自由作答。</p>
      <button class="primary block" data-act="ai">${aiFree ? "用免费的那一次做 AI 模拟面试" : "去做一场 AI 模拟面试"}</button></div>
    <button class="block" data-act="again">再玩一次</button>
    <button class="ghost block" data-act="home">回首页</button>
  </div>`);
  bindReview(card(true), rest, bombs.length, again);
  on("[data-act=again]", "click", () => { newRun(run.appearance); resumeScreen(); });
  on("[data-act=home]", "click", titleScreen);
}

// ---------------------------------------------------------------- 拼合检查页（地址后加 ?check=art）
// 换图后验收用：每个面试场景 × 面试官（按公司配色）按真实样式摆出来，切换 7 种表情逐张看，
// 重点看立绘和桌子的接缝：人不能从桌面里长出来，也不能露出一截悬空的半身。群面会议室看六个人是否都坐在椅子上。

function artCheckScreen(face = "calm") {
  const seen = new Set();
  const tiles = [];
  // 每条岗位线的基准组合各摆一遍（场景和面试官跟着公司和岗位走，和人设无关）
  for (const t of S.catalog.tracks.filter((x) => !S.unready[x.id])) {
    const c = S.cache[comboId(t.company, t.role, t.base_persona)];
    for (const r of [...Object.values(c.rounds), c.neg].filter((x) => x && x.interviewer)) {
      const key = `${c.company.id}:${r.scene}:${r.interviewer.art}`;
      if (seen.has(key)) continue;
      seen.add(key);
      S.c = c;
      tiles.push(`<p class="fine">${esc(c.company.name)} · ${esc(r.name)} · ${r.scene} × ${r.interviewer.art}</p>
        <div class="check-crop">${stageHtml({ scene: r.scene, roundLabel: r.name, art: r.interviewer.art, face, nameplate: r.interviewer.title, text: "（拼合检查）" })}</div>`);
    }
    S.c = c;
    const sample = ACHIEVEMENTS.filter((a) => ["first_try", "neg_up", "hold3"].includes(a.id));
    tiles.push(`<p class="fine">${esc(c.company.name)} · 分享卡小头像</p>${shareCardHtml({ c, headline: `${c.company.name} · SP`, record: "首次挑战就拿下 SP", highlight: "接住了 3 次追问", achs: sample })}`);
    if (c.group) {
      for (const sp of ["", "me", "N1", "N3", "observer"]) {
        tiles.push(`<p class="fine">${esc(c.company.name)} · 群面 · ${sp ? `${{ me: "你", observer: "观察员" }[sp] || sp}在说话` : "都在听"}</p>
          <div class="check-crop">${groupStageHtml(null, sp, "（拼合检查）", "", "talk")}</div>`);
      }
    }
  }
  for (const f of ["UI_offer_letter", "UI_rejection_letter"]) {
    if (hasArt(f)) tiles.push(`<p class="fine">${f}</p><img class="letter-art" src="art/${f}.png" alt=""><div class="letter">（信的正文）</div>`);
  }
  // 帧动画逐帧摊开：手机看震动帧和结果图对不对得上，泡池子看每一帧的“你”是不是都在箭头上方
  const ph = ANIM.phone;
  const phoneFrames = [ph.idle, ...ph.frames, ph.result.invite, ph.result.reject];
  if (phoneFrames.every(hasArt)) {
    tiles.push(`<p class="fine">等通知 · 手机（待机、震动 4 帧、邀约、感谢信）</p>
      <div class="row" style="flex-wrap:wrap;gap:6px">${phoneFrames.map((f) => animHtml("phone-anim", [f], { style: "width:96px;height:144px;margin:0" })).join("")}</div>`);
  }
  if (ANIM.pool.frames.every(hasArt)) {
    tiles.push(`<p class="fine">泡池子 · 6 帧</p>${ANIM.pool.frames.map((f) => animHtml("pool-anim", [f], { extra: '<span class="you">你</span>' })).join("")}`);
  }
  // 成就徽章：全部摊开，到图的显示美术图，没到的是程序画的占位
  tiles.push(`<p class="fine">小成就 · ${ACHIEVEMENTS.length} 个（${ACHIEVEMENTS.filter((a) => hasArt(`UI_ach_${a.id}`)).length} 个已到图）</p>
    <div class="share big">${achievementsHtml(ACHIEVEMENTS, true)}</div>`);
  S.c = null;
  render(`<div class="screen">
    <h2>拼合检查</h2>
    <p class="fine">每个面试场景 × 面试官按原型的真实样式摆放。看立绘和桌子的接缝：不能从桌面里长出来，也不能悬空。</p>
    <div class="row" style="flex-wrap:wrap;gap:4px">${INTERVIEWER_FACES.map((f) => `<button class="chip${f === face ? " on" : ""}" data-face="${f}">${FACE_LABEL[f]}</button>`).join("")}</div>
    <div class="row" style="flex-wrap:wrap;gap:4px"><button data-play="invite">播放：等通知（邀约）</button><button data-play="reject">播放：等通知（感谢信）</button><button data-play="pool">播放：泡池子</button></div>
    ${tiles.join("")}
  </div>`);
  on("[data-face]", "click", (e) => artCheckScreen(e.currentTarget.dataset.face));
  // 按真实界面播一遍动画，放完回到这一页（泡池子后面接的信件要点“继续”）
  on("[data-play]", "click", async (e) => {
    const kind = e.currentTarget.dataset.play;
    S.c = Object.values(S.cache).find((x) => x.company.letters.pool);
    if (kind === "pool") await poolScreen();
    else await phoneScreen(kind === "reject" ? "reject" : "next_round");
    artCheckScreen(face);
  });
}

// ---------------------------------------------------------------- 启动

async function main() {
  S.settings = { relaxed: !!store.get(KEY.settings, {}).relaxed };
  // 测试用：地址后加 ?unlock=reset，清掉“已解锁完整复盘”和赠送的那次 AI 模拟面试
  if (new URLSearchParams(location.search).get("unlock") === "reset") store.del(KEY.unlock);
  // 进度条已在 index.html 里显示，这里不再先渲染「加载内容……」
  bootSet(3);
  try {
    const r = await fetch("art/manifest.json", { cache: "no-store" });
    if (r.ok) {
      const m = await r.json();
      S.art = new Set(m.files || []);
      if (m.canvas) S.canvas = m.canvas;
      S.source = m.source || S.canvas;
      S.hires = !!m.hires;
    }
  } catch { /* 没有美术清单就全用占位 */ }
  // 像素版界面素材交给 CSS：清单里有的才设变量，style.css 里用不到的变量不会触发请求。
  // 框类控件已改由代码画，旧的 UI_*_9s6 九宫格图还在清单里，但 style.css 不再引用。
  for (const f of S.art) if (f.startsWith("UI_")) document.documentElement.style.setProperty(`--${f.slice(0, -4)}`, `url("art/${f}")`);
  // 默认像素版。颜文字版只作内部版本保留：地址后加 ?style=kaomoji 打开；没有像素美术时也退回它。
  S.settings.style = S.art.size && new URLSearchParams(location.search).get("style") !== "kaomoji" ? "pixel" : "kaomoji";
  applyStyle();
  bootSet(10, "正在加载题目……");
  boot.inContent = true;
  try {
    [S.catalog, S.lib] = await Promise.all([loadCatalog(readJson), loadLibrary(readJson)]);
    await Promise.all([
      ...S.catalog.companies.map(async (id) => {
        const co = await readJson(`content/companies/${id}/company.json`);
        S.companies[id] = { ...co, type_label: companyLabel(S.catalog, co) };
      }),
      ...S.catalog.personas.map(async (id) => { S.personas[id] = await readJson(`content/personas/${id}.json`); }),
    ]);
    // 各岗位线的基准组合先拼好（拼合检查页要用）；其他组合选到时再拼
    boot.inContent = false;
    bootSet(30, "正在准备岗位线……");
    let tracksDone = 0;
    const loaded = await Promise.allSettled(S.catalog.tracks.map((t) => comboContent(comboId(t.company, t.role, t.base_persona))
      .finally(() => bootSet(30 + 55 * (++tracksDone / S.catalog.tracks.length)))));
    loaded.forEach((r, i) => {
      if (r.status === "fulfilled") return;
      S.unready[S.catalog.tracks[i].id] = r.reason.message;
      console.warn(`岗位线 ${S.catalog.tracks[i].id} 先不开放：${r.reason.message}`);
    });
  } catch (err) {
    render(`<div class="screen"><h2>内容没加载出来</h2><p class="fine">${esc(err.message)}</p><p class="fine">需要用本地服务打开，比如在项目根目录运行：python -m http.server 8765 --directory interview-challenge，然后访问 /prototype/。</p></div>`);
    return;
  }
  boot.inContent = false;
  // 封面图约 1.4 MB，等它到了再进标题页，免得标题页先空一块
  if (hasArt("COVER_title")) {
    bootSet(85, "正在加载画面……");
    await new Promise((res) => { const im = new Image(); im.onload = im.onerror = res; im.src = "art/COVER_title.png"; });
  }
  bootSet(100);
  if (new URLSearchParams(location.search).get("check") === "art") return artCheckScreen();
  titleScreen();
}

main();
