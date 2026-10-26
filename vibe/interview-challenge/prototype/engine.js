// 面试挑战 · 计分引擎
// 规则与 tools/balance_sim.py 一一对应，改一边必须同步改另一边；tools/engine_parity.mjs 会核对两边结果。
// 只做计算，不碰界面。

export const TIERS = ["白菜", "普通", "SP", "SSP"];
const REL_RANK = { strong: 0, match: 1, half: 2, general: 3, none: 4 };

// ---------------------------------------------------------------- 加载与拼装
// 一局 = 一家公司 × 一个人设 × 一个岗位，组合号写成 公司-岗位-人设（midcorp-fe-linke）。
// 加载时把公司底座、岗位线、人设档案和题目素材库拼成一份数据，后面的计分代码只认这份数据。

export function comboId(company, role, persona) {
  return `${company}-${role}-${persona}`;
}

export function parseCombo(id) {
  const [company, role, persona] = id.split("-");
  return { company, role, persona };
}

export async function loadCatalog(readJson) {
  return readJson("content/catalog.json");
}

// 公司的类型 · 规模（初创写阶段），比如“互联网 · 中厂”“互联网 · 初创”“国企 · 中厂”；说法在 catalog.json 里
export function companyLabel(catalog, co) {
  const sector = (catalog.sectors || {})[co.sector];
  const size = (catalog.stages || {})[co.stage] || (catalog.scales || {})[co.scale];
  return [sector && sector.name, size && size.name].filter(Boolean).join(" · ") || co.type_label || "";
}

export async function loadLibrary(readJson) {
  const p = (x) => readJson(`content/${x}`);
  const [scoring, types, highlights, skills, probes, background, pools, index] = await Promise.all([
    p("scoring.json"), p("library/experience_types.json"), p("library/highlights.json"),
    p("library/skills.json"), p("library/probes.json"), p("library/background.json"), p("library/pools.json"), p("library/index.json"),
  ]);
  const lib = { scoring, types, highlights, skills, probes, background, pools };
  const packs = await Promise.all((index.packs || []).map((x) => p(`library/${x}`)));
  for (const pack of packs) mergePack(lib, pack);
  return lib;
}

// 暂存区里给这个人设补的东西合进档案：p、skills、经历的 p / frames / relevance 覆盖同名的，经历的 highlights、variants 追加，card_lines 插在人设卡“短板”那行之前（行可以带 roles、companies，只在那些岗位、公司显示）
export function applyStaging(P0, staged) {
  const mine = staged.map((s) => s[P0.id]).filter(Boolean);
  if (!mine.length) return P0;
  const P = JSON.parse(JSON.stringify(P0));
  for (const s of mine) {
    Object.assign(P.p ||= {}, s.p || {});
    Object.assign(P.skills ||= {}, s.skills || {});
    if (s.skill_bar) Object.assign(P.skill_bar ||= {}, s.skill_bar);
    if (s.test_inspire) Object.assign(P.test_inspire ||= {}, s.test_inspire);
    if (s.default) Object.assign(P.resume.default ||= {}, s.default);
    // 英文版参数（问答用英文的公司用）
    if (s.p_en) Object.assign(P.p_en ||= {}, s.p_en);
    if (s.background_en) Object.assign(P.background_en ||= {}, s.background_en);
    for (const [eid, add] of Object.entries(s.experiences || {})) {
      const e = P.resume.experiences.find((x) => x.id === eid);
      if (!e) continue;
      Object.assign(e.p ||= {}, add.p || {});
      Object.assign(e.frames ||= {}, add.frames || {});
      Object.assign(e.relevance ||= {}, add.relevance || {});
      for (const k of ["p_en", "frames_en", "probes_en"]) if (add[k]) Object.assign(e[k] ||= {}, add[k]);
      for (const k of ["title_en", "period_en"]) if (add[k]) e[k] = add[k];
      // 让没有标题的经历也能被深挖：true 是所有岗位，列表是这几个岗位（和已有的合在一起）
      if (add.deep_dive === true || e.deep_dive === true) { if (add.deep_dive) e.deep_dive = true; }
      else if (Array.isArray(add.deep_dive)) e.deep_dive = [...new Set([...(e.deep_dive || []), ...add.deep_dive])];
      // 已有亮点的英文参数：按亮点类型对上
      for (const [t, pe] of Object.entries(add.highlights_p_en || {})) {
        const h = (e.highlights || []).find((x) => x.type === t);
        if (h) Object.assign(h.p_en ||= {}, pe);
      }
      e.highlights = [...(e.highlights || []), ...(add.highlights || [])];
      // 新写法（比如给新岗位的证据型写法）：ID 不能和已有的重复，重复的跳过
      const ids = new Set(e.variants.map((v) => v.id));
      e.variants = [...e.variants, ...(add.variants || []).filter((v) => !ids.has(v.id))];
    }
    if (s.card_lines && s.card_lines.length) {
      const lines = P.card.lines;
      const at = lines.findIndex((l) => (typeof l === "string" ? l : l.text).startsWith("短板"));
      lines.splice(at < 0 ? lines.length : at, 0, ...s.card_lines);
    }
    Object.assign(P.card.company_notes ||= {}, s.company_notes || {});
  }
  return P;
}

// 扩展包：按岗位（或按主题）单独一个文件，补经历类型的对口程度和深挖问法、亮点、技能、追问、背景题。
// 几个人可以各写各的包，互不冲突；加载时按 library/index.json 的顺序合进素材库。合并规则见 docs/面试挑战/素材补充交接.md。
export function mergePack(lib, pack) {
  const types = lib.types.types;
  for (const [t, def] of Object.entries(pack.types || {})) {
    if (!types[t]) types[t] = { frames: [], ...def };
  }
  for (const [t, rel] of Object.entries(pack.relevance || {})) {
    if (types[t]) types[t].relevance = { ...types[t].relevance, ...rel };
  }
  for (const [t, frames] of Object.entries(pack.frames || {})) {
    if (types[t]) types[t].frames = [...(types[t].frames || []), ...frames];
  }
  for (const [role, list] of Object.entries(pack.fallbacks || {})) lib.types.fallbacks[role] = list;
  Object.assign(lib.highlights.types, pack.highlights || {});
  for (const [sid, sk] of Object.entries(pack.skills || {})) {
    const old = lib.skills.skills[sid];
    lib.skills.skills[sid] = old
      ? { ...old, labels: { ...sk.labels, ...old.labels }, roles: { ...old.roles, ...sk.roles }, master_probes: [...new Set([...(old.master_probes || []), ...(sk.master_probes || [])])] }
      : sk;
    const merged = lib.skills.skills[sid];
    if (merged.master_probes && !merged.master_probes.length) delete merged.master_probes;
  }
  Object.assign(lib.probes.skill_probes, pack.skill_probes || {});
  lib.background.questions = [...lib.background.questions, ...(pack.background || [])];
  lib.pools.questions = [...lib.pools.questions, ...(pack.pools || [])];
  // 英文版（问答用英文的公司用，见 docs/面试挑战/任务书-外企.md）
  for (const [t, en] of Object.entries(pack.highlights_en || {})) {
    if (lib.highlights.types[t]) lib.highlights.types[t].en = { ...(lib.highlights.types[t].en || {}), ...en };
  }
  if (pack.generic_frame_en) lib.types.generic_frame_en = pack.generic_frame_en;
  for (const [r, list] of Object.entries(pack.fallbacks_en || {})) (lib.types.fallbacks_en ||= {})[r] = list;
}

// 这一局用中文还是英文：英文公司（company.json 写 lang: "en"）只用标了英文的素材，中文公司只用没标的
function languageView(lib, en) {
  const pick = (f) => ((f.lang || "zh") === "en") === en;
  const types = {};
  for (const [k, t] of Object.entries(lib.types.types)) types[k] = { ...t, frames: (t.frames || []).filter(pick) };
  if (!en) return { types, generic: lib.types.generic_frame, fallbacks: lib.types.fallbacks, highlights: lib.highlights.types };
  const highlights = {};
  for (const [k, h] of Object.entries(lib.highlights.types)) {
    if (h.en) highlights[k] = { ...h, pitch: h.en.pitch, lead: h.en.lead, explain: h.en.explain ?? h.explain, roles: h.en.roles || h.roles };
  }
  return { types, generic: lib.types.generic_frame_en, fallbacks: lib.types.fallbacks_en || {}, highlights };
}

export async function loadContent(readJson, id, shared = {}) {
  const { company, role, persona } = parseCombo(id);
  const catalog = shared.catalog || await loadCatalog(readJson);
  const lib = shared.lib || await loadLibrary(readJson);
  const track = catalog.tracks.find((t) => t.company === company && t.role === role);
  if (!track) throw new Error(`没有岗位线 ${company} × ${role}`);
  const p = (x) => readJson(`content/${x}`);
  const [trackData, companyData, personaRaw] = await Promise.all([
    p(`tracks/${track.id}/track.json`), p(`companies/${company}/company.json`), p(`personas/${persona}.json`),
  ]);
  // 暂存区：几个人同时给已有人设补参数时，先写进 content/_staging/，加载时合并（见 docs/面试挑战/素材补充交接.md 第 8 节）
  let staged = [];
  try { staged = await Promise.all(((await p("_staging/index.json")).files || []).map((f) => p(`_staging/${f}`))); } catch { /* 没有暂存区 */ }
  const personaData = applyStaging(personaRaw, staged);
  const rounds = await Promise.all(trackData.rounds.map(p));
  // 谈薪按公司配一份；销售、游戏策划这类谈法不一样的岗位，岗位线可以自带一份（track.json 的 negotiation）
  const neg = await p(trackData.negotiation || companyData.negotiation);
  const test = trackData.test ? await p(trackData.test) : null;
  const group = trackData.group ? await p(trackData.group) : null;
  return assemble({ catalog, lib, track, trackData, companyData, personaData, rounds, neg, test, group });
}

// ---- 文字里的占位：{域.键} 或 {域.键|没有时用的默认文字}；{offer} 这种不带域的取自 vars。
// 拼装时先填静态的域（p 人设参数、bg 背景、role 岗位、co 公司，深挖题里还有 exp、hl），
// 和简历有关的域（cite、p1、p2、first、other）以及投递进度（offer、process）到面试时再填。
// 填进去的文字和两边的汉字之间，按排版规范自动补空格（“讲{cite.short}训练”填 ACM 得到“讲 ACM 训练”），模板里不用手写空格。
const PH = /\{([a-z_][a-z0-9_]*)(?:\.([a-z0-9_]+))?(?:\|([^}]*))?\}/g;
const CJK = /[一-鿿]/;
const ALNUM = /[A-Za-z0-9]/;

function spaced(v, left, right) {
  if (!v) return v;
  const a = v[0];
  const z = v[v.length - 1];
  let out = v;
  if (left && ((CJK.test(left) && ALNUM.test(a)) || (ALNUM.test(left) && CJK.test(a)))) out = ` ${out}`;
  if (right && ((CJK.test(right) && ALNUM.test(z)) || (ALNUM.test(right) && CJK.test(z)))) out = `${out} `;
  return out;
}

export function fillText(s, scopes, finalPass = false) {
  if (typeof s !== "string" || s.indexOf("{") < 0) return s;
  return s.replace(PH, (m, scope, key, dflt, at, whole) => {
    const put = (v) => spaced(v, whole[at - 1], whole[at + m.length]);
    if (!(scope in scopes)) return finalPass ? put(dflt ?? "") : m;
    const src = scopes[scope];
    const v = key === undefined ? src : src && src[key];
    if (v !== undefined && v !== null && v !== "" && typeof v !== "object") return put(String(v));
    return dflt !== undefined ? put(dflt) : (finalPass ? "" : m);
  });
}

// 一段数据里，某个域里用到、又没写默认文字的键（拼装时据此判断参数够不够）
export function scanNeeds(obj, scope, out = new Set()) {
  if (typeof obj === "string") {
    for (const m of obj.matchAll(PH)) if (m[1] === scope && m[2] && m[3] === undefined) out.add(m[2]);
  } else if (Array.isArray(obj)) {
    for (const x of obj) scanNeeds(x, scope, out);
  } else if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) if (k !== "fallback" && k !== "_note") scanNeeds(v, scope, out);
  }
  return out;
}

const TEXT_KEYS = new Set(["text", "line", "explain", "label", "title", "hello"]);

function fillDeep(x, scopes) {
  if (Array.isArray(x)) return x.map((v) => fillDeep(v, scopes));
  if (x && typeof x === "object") {
    const out = {};
    for (const [k, v] of Object.entries(x)) out[k] = typeof v === "string" && TEXT_KEYS.has(k) ? fillText(v, scopes) : fillDeep(v, scopes);
    return out;
  }
  return x;
}

const BIND_KEYS = ["highlight", "highlight_ev", "exp_type", "evidence_header", "nth_header"];

const binds = (o) => !!(o && o.requires && BIND_KEYS.some((k) => k in o.requires));

// 只看这个选项自己（不含 fallback，也不含自己另有绑定条件的下级选项）用到的 cite 参数
function ownCiteNeeds(x, out = new Set(), root = true) {
  if (typeof x === "string") return scanNeeds(x, "cite", out);
  if (Array.isArray(x)) { for (const v of x) ownCiteNeeds(v, out, false); return out; }
  if (x && typeof x === "object") {
    if (!root && binds(x)) return out;
    for (const [k, v] of Object.entries(x)) if (k !== "fallback" && k !== "_note" && k !== "requires") ownCiteNeeds(v, out, false);
  }
  return out;
}

// 选项的条件要绑定简历第一页上的某段经历或亮点时，记下文字里要用到它的哪些参数（参数不全的不算满足条件）
function markNeeds(x) {
  if (Array.isArray(x)) { x.forEach(markNeeds); return x; }
  if (x && typeof x === "object") {
    if (binds(x)) x.requires._needs = [...ownCiteNeeds(x)].sort();
    for (const [k, v] of Object.entries(x)) if (k !== "requires") markNeeds(v);
  }
  return x;
}

function roleKeyed(obj, role) {
  const out = {};
  for (const [k, v] of Object.entries(obj || {})) {
    if (k.startsWith("_")) continue;
    out[k] = v && typeof v === "object" ? v[role] : v;
  }
  return out;
}

function hasAll(scope, needs) {
  for (const k of needs) if (scope[k] === undefined || scope[k] === "") return false;
  return true;
}

// 把题目模板里的 key 换成这段经历下唯一的选项 ID
function keyed(opts, prefix) {
  return opts.map((o) => {
    const { key, ...rest } = o;
    const out = { ...rest, id: `${prefix}_${key}` };
    if (o.followup) out.followup = { ...o.followup, options: keyed(o.followup.options, prefix) };
    return out;
  });
}

function labelFor(skill, level) {
  for (let l = Math.max(1, level); l >= 1; l--) if (skill.labels[String(l)]) return skill.labels[String(l)];
  return skill.labels[Object.keys(skill.labels).sort()[0]];
}

export function assemble(raw) {
  const { catalog, lib, track, trackData, companyData, personaData: P, rounds, neg, test, group } = raw;
  const role = trackData.role;
  const issues = [];
  const bgCfg = lib.background;
  const bg = P.background;
  const mg = bgCfg.major_groups[bg.major_group] || { kind: "non_tech", match: [] };
  const degreeCn = bgCfg.degrees[bg.degree] || "";
  const en = (companyData.lang || "zh") === "en";
  const L = languageView(lib, en);
  // 英文公司：人设参数、背景、岗位说法、公司名都只取英文的，没有就空着（模板里的默认文字或通用问法兜底），不退回中文
  const bgEn = P.background_en || {};
  const degreeEn = (bgCfg.degrees_en || {})[bg.degree] || "";
  const majorEn = bgEn.major_short || bgEn.major;
  const statics = en ? {
    p: roleKeyed(P.p_en, role),
    bg: { ...bgEn, school_tier_cn: (bgCfg.school_tiers_en || {})[bg.school_tier] || "", degree_cn: degreeEn,
      major_degree: bgEn.major_degree || (degreeEn && majorEn ? `${degreeEn} in ${majorEn}` : "") },
    role: (catalog.roles[role] || {}).en || {},
    co: { name: companyData.name_en || "", short: companyData.short_en || companyData.name_en || "", product: companyData.product_en },
  } : {
    p: roleKeyed(P.p, role),
    bg: { ...bg, school_tier_cn: bgCfg.school_tiers[bg.school_tier] || "", degree_cn: degreeCn, major_degree: `${bg.major_short || bg.major}${degreeCn}` },
    role: catalog.roles[role],
    co: { name: companyData.name, short: companyData.short || companyData.name, type: companyLabel(catalog, companyData), product: companyData.product },
  };
  const S = (x) => markNeeds(fillDeep(JSON.parse(JSON.stringify(x)), statics));

  const c = { scoring: lib.scoring, role, issues };
  c.combo = { id: comboId(companyData.id, role, P.id), company: companyData.id, role, persona: P.id, track: track.id, base: track.base_persona === P.id };
  const pick = (o, keys) => Object.fromEntries(keys.filter((k) => k in o).map((k) => [k, o[k]]));
  c.company = {
    ...companyData,
    ...pick(trackData, ["est_minutes", "stages", "resume_screen", "interview", "cross", "review_phrases", "salary_table", "letters"]),
    tiers: { ...companyData.tiers, ...trackData.tiers },
    type_label: companyLabel(catalog, companyData),
    lang: en ? "en" : "zh",
    role,
  };
  c.stages = c.company.stages;

  // 人设：简历分用的学历键、专业是否对口
  c.persona = {
    id: P.id, name: P.name, label: P.label, art: P.art, card: P.card, test_inspire: P.test_inspire,
    skills: P.skills || {}, traits: P.traits || [], background: bg,
    education: {
      level: `${bg.school_tier}_${bg.degree}`, school: bg.school, major: bg.major, year: bg.year,
      major_match: Object.fromEntries(Object.keys(catalog.roles).map((r) => [r, mg.match.includes(r)])),
    },
  };

  // 经历：类型给默认对口程度和参数，实例覆盖；亮点的参数叠在所在经历的参数上
  const types = L.types;
  c.capacity = P.resume.capacity_lines;
  c.experiences = {};
  c.variants = {};
  c.followups = { deep_dives: {}, probes: {}, fallbacks: [] };
  for (const e of P.resume.experiences) {
    const t = types[e.type];
    if (!t) { issues.push(`${P.id}/${e.id}: 没有经历类型 ${e.type}`); continue; }
    const scope = en
      ? { ...(t.p_en || {}), ...(e.title_en ? { label: e.title_en } : {}), ...(e.p_en || {}), title: e.title_en || "", period: e.period_en || "", _id: e.id }
      : { ...(t.p || {}), label: e.title, ...(e.p || {}), title: e.title, period: e.period, _id: e.id };
    const highlights = (e.highlights || []).map((h) => ({ type: h.type, scope: { ...scope, ...((en ? h.p_en : h.p) || {}) } }));
    // divable：能被项目深挖。带标题的经历都能；没标题的（论文、竞赛这种一行的）要人设档案写 deep_dive: true 或岗位列表才能
    const divable = !!(e.header || e.deep_dive === true || (Array.isArray(e.deep_dive) && e.deep_dive.includes(role)));
    const exp = { id: e.id, type: e.type, header: e.header, divable, title: e.title, period: e.period, relevance: { ...t.relevance, ...(e.relevance || {}) }, scope, highlights, variants: e.variants };
    c.experiences[e.id] = exp;
    for (const v0 of e.variants) {
      const v = { ...v0 };
      const spec = en ? (e.probes_en || {})[v0.id] : v0.probe;
      if (!spec) delete v.probe;
      else {
        v.probe = `probe_${v0.id}`;
        c.followups.probes[v.probe] = buildProbe(lib, { ...v0, probe: spec }, statics, scope);
      }
      c.variants[v.id] = { exp, v };
    }
    const dd = divable && buildDeepDive(L, exp, role, statics, en ? e.frames_en : e.frames, issues);
    if (dd) c.followups.deep_dives[e.id] = dd;
    else exp.divable = false;
  }
  c.followups.fallbacks = (L.fallbacks[role] || L.fallbacks.any || []).map((f) => ({ when_first: f.when_first, node: S(f.node) }));

  // 技能栏标签
  c.skills = {};
  const skillLib = lib.skills.skills;
  const chipIds = (P.skill_bar && P.skill_bar[role]) || autoChips(skillLib, P.skills || {}, role);
  for (const id of chipIds) {
    const master = id.endsWith("_master");
    const sid = master ? id.slice(0, -7) : id;
    const sk = skillLib[sid];
    const rc = sk && sk.roles[role];
    if (!rc) { issues.push(`${P.id}: 技能 ${sid} 不在${role}岗位的技能表里`); continue; }
    const level = (P.skills || {})[sid] || 0;
    const chip = { id, skill: sid, label: master ? sk.labels["3"] : labelFor(sk, level), keywords: rc.keywords, relevant: rc.relevant, group: sid, master, level };
    // 写了“精通”就会被追问（诱饵标签，或者真实水平就是精通时的标签），不看真实水平：这一题本来就是练真本事
    if ((master || level >= 3) && sk.master_probes) {
      const pid0 = (trackData.skill_probes || {})[sid] || sk.master_probes[0];
      const pid = en ? `${pid0}_en` : pid0;
      if (en && !lib.probes.skill_probes[pid]) { /* 没写英文版：英文公司里不追问这项 */ } else if (lib.probes.skill_probes[pid]) {
        chip.probe = pid;
        c.followups.probes[pid] = { ...S(lib.probes.skill_probes[pid]), id: pid, source: id };
      } else issues.push(`技能 ${sid} 的“精通”追问 ${pid} 还没写`);
    }
    c.skills[id] = chip;
  }
  c.skillProbeOrder = trackData.skill_probe_order || [];
  c.defaultResume = (P.resume.default && P.resume.default[role]) || autoDefault(c, lib.scoring);

  // 背景题、题池：按背景、特殊设定和公司的类型、规模，静态地筛出这一局能问的，按优先级排好
  const ctx = { role, mg, bg, traits: c.persona.traits, co: companyData, expTypes: new Set(P.resume.experiences.map((e) => e.type)), lang: en ? "en" : "zh" };
  const byPool = (questions) => {
    const out = {};
    for (const q of [...questions].sort((a, b) => b.priority - a.priority)) {
      if (!whenOk(q.when, ctx, q.lang)) continue;
      for (const pool of q.pools) (out[pool] ||= []).push({ id: q.id, node: { ...S(q.node), id: q.id } });
    }
    return out;
  };
  c.background = byPool(bgCfg.questions);
  c.pools = byPool(lib.pools.questions);

  // 题池题位（还有“精通”追问题位没追问时的 fallback_pool）：这家公司能抽到的题放进这一轮的题目表（检查、审阅稿照常能看到），
  // 题位记下候选的顺序。prefer 里的题排最前（岗位线指定的题，按写的顺序），其余按优先级。
  c.rounds = {};
  for (const r of rounds) {
    const R = S(r);
    for (const slot of R.flow) {
      const pool = slot.dynamic === "pool" ? slot.pool : slot.fallback_pool;
      if (!pool) continue;
      const all = c.pools[pool] || [];
      if (!all.length) issues.push(`题池 ${pool} 里没有${companyData.name}能问的题`);
      const prefer = slot.prefer || [];
      for (const id of prefer) if (!all.some((q) => q.id === id)) issues.push(`${R.id}/${slot.slot}：prefer 里的 ${id} 不在题池 ${pool}，或者条件不让${companyData.name}问`);
      const cands = [...prefer.map((id) => all.find((q) => q.id === id)).filter(Boolean), ...all.filter((q) => !prefer.includes(q.id))];
      slot.cands = cands.map((q) => q.id);
      for (const q of cands) R.nodes[q.id] = q.node;
    }
    c.rounds[R.id] = R;
  }
  c.interviewStages = c.stages.filter((s) => c.rounds[s]);
  c.neg = S(neg);
  c.test = test ? S(test) : null;
  c.group = group ? S(group) : null;
  return c;
}

// 背景题、题池的条件：每个键的值可以是一个或一组，写了的键都要满足
const inWhen = (v, x) => (Array.isArray(v) ? v.includes(x) : v === x);
function whenOk(w, { role, mg, bg, traits, co, expTypes, lang }, qlang) {
  if ((qlang || "zh") !== (lang || "zh")) return false;
  if (!w) return true;
  if (w.role && !inWhen(w.role, role)) return false;
  if (w.major_kind && !inWhen(w.major_kind, mg.kind)) return false;
  if (w.degree && !inWhen(w.degree, bg.degree)) return false;
  if (w.trait && ![].concat(w.trait).some((t) => traits.includes(t))) return false;
  if (w.sector && !inWhen(w.sector, co.sector)) return false;
  if (w.scale && !inWhen(w.scale, co.scale)) return false;
  if (w.stage && !inWhen(w.stage, co.stage)) return false;
  if (w.has_exp_type && ![].concat(w.has_exp_type).some((t) => expTypes.has(t))) return false;
  if (w.lacks_exp_type && [].concat(w.lacks_exp_type).some((t) => expTypes.has(t))) return false;
  return true;
}

function autoChips(skillLib, levels, role) {
  const out = [];
  for (const [sid, sk] of Object.entries(skillLib)) {
    if (!sk.roles[role] || !(levels[sid] >= 1)) continue;
    out.push(sid);
    if (sk.master_probes && levels[sid] < 3) out.push(`${sid}_master`);
  }
  return out;
}

// 没写默认简历的岗位：按对口程度排，每段取职责型（没有就取第一种）写法，放满一页为止；技能取对口的真实标签
function autoDefault(c, scoring) {
  const exps = Object.values(c.experiences).sort((a, b) => REL_RANK[a.relevance[c.role]] - REL_RANK[b.relevance[c.role]]);
  const order = [];
  let used = 0;
  for (const e of exps) {
    const v = e.variants.find((x) => x.type === "duty") || e.variants.find((x) => x.type === "fact") || e.variants[0];
    const lines = (e.header ? 1 : 0) + v.lines;
    if (used + lines > c.capacity || order.length >= 6) continue;
    order.push(v.id);
    used += lines;
  }
  const chips = Object.values(c.skills).filter((s) => !s.master).sort((a, b) => (b.relevant - a.relevant) || (b.level - a.level));
  return { order, skills: chips.slice(0, scoring.resume.max_skills).map((s) => s.id) };
}

function buildProbe(lib, v, statics, scope) {
  const spec = v.probe;
  const pat = lib.probes.patterns[spec.pattern];
  const options = pat.options.map((po) => {
    const o = spec[po.key] || {};
    const out = { id: `${v.id}_${po.key}`, type: po.type, text: o.text, face: o.face || po.face, line: o.line };
    const delta = o.delta ?? po.delta;
    if (delta !== undefined) out.delta = delta;
    return out;
  });
  const node = { id: `probe_${v.id}`, tag: pat.tag, source: v.id, text: spec.ask, options, explain: spec.explain || pat.explain };
  return fillDeep(node, { ...statics, exp: scope });
}

// 项目深挖：先用指定的问法，再按类型里的问法顺序找参数够用的；都不行看主亮点有没有自带整题，最后用通用深挖
function buildDeepDive(L, exp, role, statics, frames, issues) {
  const t = L.types[exp.type];
  const hls = L.highlights;
  const list = (t.frames || []).filter((f) => f.roles.includes(role));
  const want = frames && frames[role];
  if (want) list.sort((a, b) => (b.id === want) - (a.id === want));
  const roleHl = exp.highlights.filter((h) => hls[h.type] && (hls[h.type].roles || []).includes(role));
  const pitchHl = roleHl.find((h) => hls[h.type].pitch && hasAll(h.scope, scanNeeds([hls[h.type].pitch, hls[h.type].explain || ""], "hl")));
  for (const f of list) {
    const node = f.node;
    const usesSlot = node.options.some((o) => o.slot === "highlight");
    if (!hasAll(exp.scope, scanNeeds(node, "exp"))) continue;
    if (usesSlot && !pitchHl) continue;
    const options = [];
    for (const o of node.options) {
      if (o.slot === "highlight") {
        const pitch = hls[pitchHl.type].pitch;
        const opt = { ...pitch, key: "b" };
        options.push(...keyed([fillDeep(opt, { ...statics, exp: exp.scope, hl: pitchHl.scope })], exp.id));
      } else {
        options.push(...keyed([o], exp.id));
      }
    }
    const explain = (node.explain || "") + (usesSlot ? (hls[pitchHl.type].explain || "") : "");
    const out = { id: `dd_${exp.id}`, tag: node.tag, text: node.text, options, explain };
    return markNeeds(fillDeep(out, { ...statics, exp: exp.scope, hl: pitchHl ? pitchHl.scope : {} }));
  }
  const leadHl = roleHl.find((h) => hls[h.type].lead && hasAll(h.scope, scanNeeds(hls[h.type].lead, "hl")));
  if (leadHl) {
    const lead = hls[leadHl.type].lead;
    const out = { id: `dd_${exp.id}`, tag: lead.tag, text: lead.text, options: keyed(lead.options, exp.id), explain: lead.explain };
    return markNeeds(fillDeep(out, { ...statics, exp: exp.scope, hl: leadHl.scope }));
  }
  if (!L.generic) { issues.push(`${exp.id}: 没有这个语言的通用深挖`); return null; }
  const g = L.generic.node;
  if (!hasAll(exp.scope, scanNeeds(g, "exp"))) issues.push(`${exp.id}: 通用深挖缺参数`);
  const out = { id: `dd_${exp.id}`, tag: g.tag, text: g.text, options: keyed(g.options, exp.id), explain: g.explain, generic: true };
  return markNeeds(fillDeep(out, { ...statics, exp: exp.scope }));
}

// Python 的 round() 是银行家舍入，这里照抄，保证两边一致。
export function pyRound(x) {
  const f = Math.floor(x);
  if (Math.abs(x - f - 0.5) < 1e-9) return f % 2 === 0 ? f : f + 1;
  return Math.round(x);
}

export function passLine(c, roundId) {
  const r = c.rounds[roundId];
  return r && r.pass_line !== undefined ? r.pass_line : c.company.interview.pass_line;
}

// ---------------------------------------------------------------- 简历

export function itemLines(c, vid) {
  const { exp, v } = c.variants[vid];
  return (exp.header ? 1 : 0) + v.lines;
}

export function layout(c, order) {
  const page1 = [];
  const page2 = [];
  let used = 0;
  for (const vid of order) {
    const lines = itemLines(c, vid);
    if (!page2.length && used + lines <= c.capacity) {
      page1.push(vid);
      used += lines;
    } else {
      page2.push(vid);
    }
  }
  return { page1, page2, used };
}

function itemValue(c, vid, quality) {
  const { exp, v } = c.variants[vid];
  const rel = c.scoring.resume.relevance[exp.relevance[c.role]];
  const q = v.type === "evidence" && !["both", c.role].includes(v.angle) ? quality.evidence_off_angle : quality[v.type];
  return rel * q;
}

export function resumeScore(c, order, skills) {
  const rs = c.scoring.resume;
  const screen = c.company.resume_screen;
  const quality = { ...rs.quality, ...((rs.quality_override || {})[c.company.id] || {}) };
  const edu = c.persona.education;
  let bg = rs.education_score[edu.level];
  if (edu.major_match[c.role]) bg += rs.major_match_bonus;
  let score = bg * screen.edu_weight;
  const { page1, page2 } = layout(c, order);
  page1.forEach((vid, i) => {
    const w = i < rs.position_weights.length ? rs.position_weights[i] : rs.position_weight_after;
    score += itemValue(c, vid, quality) * w;
  });
  for (const vid of page2) score += itemValue(c, vid, quality) * screen.page2_discount;
  const empties = order.filter((vid) => c.variants[vid].v.type === "empty").length;
  score -= empties * rs.empty_penalty;
  if (page1.length < rs.thin_page_min_entries) score -= rs.thin_page_penalty;
  if (page2.length) score -= screen.overflow_penalty;
  const relevant = skills.filter((s) => c.skills[s].relevant).length;
  score += Math.min(relevant * rs.skill_value, rs.skill_value_cap);
  return score;
}

// 大厂的机器筛：技能栏和第一页经历里命中的岗位关键词（去重）。
export function machineHits(c, order, skills) {
  const screen = c.company.resume_screen;
  if (!screen.machine_screen) return null;
  const want = new Set(screen.machine_keywords);
  const got = new Set();
  for (const vid of layout(c, order).page1) for (const k of c.variants[vid].v.keywords) if (want.has(k)) got.add(k);
  for (const s of skills) for (const k of c.skills[s].keywords) if (want.has(k)) got.add(k);
  return screen.machine_keywords.filter((k) => got.has(k));
}

export function resumeResult(c, order, skills) {
  const screen = c.company.resume_screen;
  const score = resumeScore(c, order, skills);
  const hits = machineHits(c, order, skills);
  const machineOk = hits === null || hits.length >= screen.machine_min;
  const passed = order.length > 0 && machineOk && score >= screen.pass_line;
  return { score, hits, machineOk, passed, margin: score - screen.pass_line };
}

export function resumeBonus(c, margin) {
  const cfg = c.scoring.resume.bonus_to_first_round;
  return Math.max(0, Math.min(cfg.max, pyRound(margin * cfg.per_margin)));
}

// 简历关揭晓用：HR 视线回放和复盘要点。通过时不点破夸大写法。
export function resumeReview(c, order, skills, result) {
  const { page1, page2 } = layout(c, order);
  const gaze = [];
  page1.forEach((vid, i) => {
    const { v } = c.variants[vid];
    gaze.push({ vid, level: v.type === "exag" ? "linger" : i < 2 ? "high" : i < 4 ? "mid" : "low" });
  });
  for (const vid of page2) gaze.push({ vid, level: "skip" });
  const notes = [];
  if (result.hits && !result.machineOk) notes.push(`机器筛只命中了 ${result.hits.length} 个岗位关键词，没过最低要求（真实的筛选规则各家不同，这里做了简化）。技能栏和经历里，要原样用岗位描述里的说法。`);
  if (page2.length) notes.push("第二页的内容，HR 基本没看。校招简历一页纸是有原因的。");
  if (page1.length) {
    const first = c.variants[page1[0]].exp;
    if (!["strong", "match"].includes(first.relevance[c.role])) notes.push("第一行放了和岗位关系不大的内容，最显眼的位置浪费了。");
  }
  const empties = order.filter((vid) => c.variants[vid].v.type === "empty").length;
  if (empties) notes.push(`有 ${empties} 段用了空话型写法：看着专业，但没有任何证据。`);
  const offAngle = order.filter((vid) => {
    const { v } = c.variants[vid];
    return v.type === "evidence" && !["both", c.role].includes(v.angle);
  }).length;
  if (offAngle) notes.push("有一段经历的写法角度不对。同一段经历，投不同岗位要换角度写。");
  if (page1.length < c.scoring.resume.thin_page_min_entries) notes.push("第一页内容太少，看起来经历单薄。");
  const lingering = gaze.filter((g) => g.level === "linger").length;
  if (result.passed && lingering) notes.push(lingering > 1 ? "HR 在好几行上都停了很久。" : "HR 在有一行上停了很久。");
  // 写法本身挑不出毛病却没过：差在背景（专业不对口、学校档次）。投不对口的岗位，经历要写得更硬才补得回来。
  if (!result.passed && result.machineOk && !notes.length) {
    const edu = c.persona.education;
    notes.push(`写法挑不出大毛病，差在背景：${edu.major_match[c.role] ? "" : `${edu.major}和这个岗位不对口，`}筛简历的人先看学历和专业。同样的写法，背景对口的人能过；要补回来，第一页得放更硬的证据。`);
  }
  if (!notes.length) notes.push("选择、写法和排序都挺好。");
  return { gaze, notes: notes.slice(0, 3), page1, page2 };
}

// ---------------------------------------------------------------- 面试轮

export function optionEv(o) {
  if (o.type === "redline") return -99;
  if (o.type === "bold") return Math.max(...o.followup.options.map(optionEv));
  return o.delta;
}

// vars：投递进度带进面试的文字，{ offer: "巨塔集团的 offer", process: { company, stage, where } }
export class Interview {
  constructor(c, resume, flags, vars = {}) {
    this.c = c;
    this.order = resume.order;
    this.skills = resume.skills;
    this.page1 = layout(c, this.order).page1;
    this.page1Items = this.page1.map((vid) => c.variants[vid]);
    this.headers = this.page1Items.filter((x) => x.exp.header);
    this.divable = this.page1Items.filter((x) => x.exp.divable);
    this.flags = flags || new Set();
    this.vars = vars;
    this.probesUsed = new Set();
    this.ddUsed = new Set();
    this.bgUsed = new Set();
  }

  snapshot() {
    return { flags: [...this.flags], probes: [...this.probesUsed], dd: [...this.ddUsed], bg: [...this.bgUsed] };
  }

  restore(s) {
    this.flags = new Set(s.flags);
    this.probesUsed = new Set(s.probes);
    this.ddUsed = new Set(s.dd);
    this.bgUsed = new Set(s.bg || []);
  }

  probeOk(pid) {
    return !this.probesUsed.has(pid) && this.probesUsed.size < this.c.scoring.interview.probe_cap_per_run;
  }

  useProbe(pid) {
    this.probesUsed.add(pid);
    return { ...this.c.followups.probes[pid], id: pid, kind: "probe" };
  }

  deepDive(expId) {
    this.ddUsed.add(expId);
    return { ...this.c.followups.deep_dives[expId], kind: "deep_dive" };
  }

  // 第一页第一行是奖项、证书这类条目时的深挖：按那一行的经历类型挑问法
  fallbackDive() {
    const first = this.page1Items[0];
    const t = first ? first.exp.type : null;
    const f = this.c.followups.fallbacks.find((x) => !x.when_first || x.when_first.includes(t));
    return { ...f.node, kind: "deep_dive" };
  }

  fixedNode(rnd, slot, useAlt) {
    const id = useAlt && slot.swap && slot.alternates && slot.alternates.length ? slot.alternates[0] : slot.node;
    return { ...rnd.nodes[id], id };
  }

  // 题池：取第一道这一局还没问过的；重打这一轮、题位可换时取第二道
  poolPick(rnd, slot, useAlt) {
    const left = slot.cands.filter((id) => !this.bgUsed.has(id));
    const id = (useAlt && slot.swap && left[1]) || left[0];
    if (!id) throw new Error(`题池题位没有题可问：${slot.pool || slot.fallback_pool}`);
    this.bgUsed.add(id);
    return { ...rnd.nodes[id], id };
  }

  // useAlt：重打这一轮时，可换的题换成备选题。
  nodeFor(slot, rnd, useAlt = false) {
    const dyn = slot.dynamic;
    if (!dyn) {
      if (slot.when && !this.bind(slot.when)) return { ...rnd.nodes[slot.else], id: slot.else };
      return this.fixedNode(rnd, slot, useAlt);
    }
    if (dyn === "flag_or") {
      if (this.flags.has(slot.flag)) return { ...rnd.nodes[slot.node_if], id: slot.node_if };
      return this.fixedNode(rnd, slot, useAlt);
    }
    if (dyn === "deep_dive_first") {
      const first = this.page1Items[0];
      if (!first) return this.fallbackDive();
      const { exp, v } = first;
      if (v.probe && this.probeOk(v.probe)) {
        this.ddUsed.add(exp.id);
        return this.useProbe(v.probe);
      }
      if (!exp.divable) return this.fallbackDive();
      return this.deepDive(exp.id);
    }
    if (dyn === "skill_probe") {
      for (const sid of this.c.skillProbeOrder) {
        const chip = [this.c.skills[`${sid}_master`], this.c.skills[sid]].find((x) => x && x.probe && this.skills.includes(x.id));
        if (chip && this.probeOk(chip.probe)) return this.useProbe(chip.probe);
      }
      return slot.fallback_pool ? this.poolPick(rnd, slot, useAlt) : this.fixedNode(rnd, slot, useAlt);
    }
    if (dyn === "probe_or_deep_dive_next") {
      for (const { v } of this.page1Items) if (v.type === "exag" && v.probe && this.probeOk(v.probe)) return this.useProbe(v.probe);
      for (const { v } of this.page1Items) if (v.type === "empty" && v.probe && this.probeOk(v.probe)) return this.useProbe(v.probe);
      for (const { exp } of this.divable) if (!this.ddUsed.has(exp.id)) return this.deepDive(exp.id);
      return this.fallbackDive();
    }
    if (dyn === "pool") return this.poolPick(rnd, slot, useAlt);
    if (dyn === "background") {
      const q = (this.c.background[slot.pool] || []).find((x) => !this.bgUsed.has(x.id));
      if (q) {
        this.bgUsed.add(q.id);
        return { ...q.node, id: q.id, kind: "background" };
      }
      if (slot.node) return this.fixedNode(rnd, slot, useAlt);
      throw new Error(`背景题位没有题可问：${slot.pool}`);
    }
    throw new Error(`未知的动态题位：${dyn}`);
  }

  // 条件是否满足；满足时返回绑定（{ cite: 第一页上那段经历或亮点的参数 }），不满足返回 null。
  bind(req) {
    if (!req) return {};
    if (req.flag && !this.flags.has(req.flag)) return null;
    if (req.not_flag && this.flags.has(req.not_flag)) return null;
    if (req.skill_min) for (const [s, lv] of Object.entries(req.skill_min)) if ((this.c.persona.skills[s] || 0) < lv) return null;
    if (req.lacks_exp_type && Object.values(this.c.experiences).some((e) => e.type === req.lacks_exp_type)) return null;
    let cands = null;
    if (req.highlight || req.highlight_ev) {
      // 写一串亮点时按列表顺序：先找列表里的第一种，第一页上有就用它；没有再找下一种
      const want = [].concat(req.highlight || req.highlight_ev);
      cands = [];
      for (const type of want) {
        for (const { exp, v } of this.page1Items) {
          if (req.highlight_ev && v.type !== "evidence") continue;
          for (const h of exp.highlights) if (h.type === type) cands.push(h.scope);
        }
      }
    } else if (req.exp_type) {
      cands = this.page1Items.filter((x) => x.exp.type === req.exp_type).map((x) => x.exp.scope);
    } else if (req.evidence_header) {
      cands = this.headers.filter((x) => x.v.type === "evidence").map((x) => x.exp.scope);
    } else if (req.nth_header) {
      cands = this.headers.map((x) => x.exp.scope);
    }
    if (cands === null) return {};
    const ok = cands.filter((s) => hasAll(s, req._needs || []));
    const pickIdx = req.nth_header ? req.nth_header - 1 : 0;
    return ok[pickIdx] ? { cite: ok[pickIdx] } : null;
  }

  meets(req) {
    return this.bind(req) !== null;
  }

  // 面试时才知道的文字：简历第一页（cite、p1、p2、first、other）和投递进度（offer、process）
  scopes(bound) {
    const cite = bound && bound.cite;
    const h = this.headers.map((x) => x.exp.scope);
    const other = h.find((s) => !cite || s._id !== cite._id);
    return { cite, p1: h[0], p2: h[1], first: this.page1Items[0] && this.page1Items[0].exp.scope, other, ...this.vars };
  }

  fill(s, bound) {
    return fillText(s, this.scopes(bound), true);
  }

  // level：已经进入了几层追问。超过公司的追问层数时，不再出现进取型选项。
  // bound：上一层选项的绑定，追问里的文字接着用。返回的选项文字已经填好，_bind 留给下一层。
  resolve(options, level = 0, bound = null) {
    const maxDepth = this.c.company.interview.followup_depth;
    const out = [];
    const put = (o, b) => {
      const x = { ...o, text: this.fill(o.text, b), line: this.fill(o.line, b), _bind: b };
      if (o.followup) x.followup = { ...o.followup, text: this.fill(o.followup.text, b) };
      out.push(x);
    };
    for (const o of options) {
      const b = this.bind(o.requires);
      if (!b) {
        if (o.fallback) put(o.fallback, bound);
        continue;
      }
      if (o.type === "bold" && level >= maxDepth) {
        // 到了这家公司的追问层数上限：不再往下追，这个回答本身就算答到了（最多按一次“接住”算）
        put(cappedBold(o, this.c.company.lang), b.cite ? b : bound);
        continue;
      }
      put(o, b.cite ? b : bound);
    }
    return out;
  }
}

// 面试官接一句：英文公司用英文
const CAPPED_LINES = { zh: { hold: "嗯，说到点子上了。", partial: "嗯。" }, en: { hold: "Right, that's the key point.", partial: "I see." } };

export function cappedBold(o, lang = "zh") {
  const ev = Math.min(optionEv(o), 9);
  const hold = ev >= 9;
  const { followup, ...rest } = o;
  const lines = CAPPED_LINES[lang] || CAPPED_LINES.zh;
  return { ...rest, type: hold ? "hold" : "partial", delta: ev, face: hold ? "pleased" : "nod", line: hold ? lines.hold : lines.partial };
}

// 答题限时：按字数估算阅读时间，再加思考时间。
export function displayWidth(s) {
  let w = 0;
  for (const ch of s) w += ch.charCodeAt(0) < 128 ? 0.5 : 1;
  return w;
}

export function questionSeconds(c, text, options, pressure = false) {
  const iv = c.scoring.interview;
  const chars = displayWidth(text) + options.reduce((s, o) => s + displayWidth(o.text), 0);
  let secs = chars / iv.reading_chars_per_second + iv.thinking_seconds;
  secs *= c.company.interview.time_multiplier;
  if (pressure) secs *= c.company.interview.pressure_multiplier || 0.75;
  return Math.round(secs);
}

export function baseTier(c, totalMargin) {
  const th = c.company.tiers.thresholds;
  if (totalMargin >= th.SSP) return 3;
  if (totalMargin >= th.SP) return 2;
  if (totalMargin >= th["普通"]) return 1;
  return 0;
}

// 交叉面：业务面余量之和落在两头才触发。返回 "uncertain" / "ssp" / null。
export function crossZone(c, margins) {
  const cfg = c.company.cross;
  if (!cfg) return null;
  const business = cfg.business_rounds.reduce((s, r) => s + (margins[r] || 0), 0);
  if (business < cfg.uncertain_below) return "uncertain";
  if (business > cfg.ssp_above) return "ssp";
  return null;
}

// 档位上限：要求交叉面资格的公司，没拿到资格最高只到 SP。
export function tierCap(c, sspQualified) {
  return c.company.tiers.ssp_requires_cross && !sspQualified ? 2 : 3;
}

export function finalTier(base, shift, cap = 3) {
  return Math.max(0, Math.min(cap, base + shift));
}

// ---------------------------------------------------------------- 笔试

export function testSlots(c, retry = 0) {
  const t = c.test;
  return t.slots.map((s) => {
    let qid = s.q;
    const alt = s.alternates && s.alternates[0];
    if (alt && ((s.swap === "odd" && retry % 2 === 1) || (s.swap === "even" && retry > 0 && retry % 2 === 0))) qid = alt;
    return { slot: s.slot, qid, q: t.questions[qid] };
  });
}

export function inspireEligible(c, q) {
  return ((c.persona.test_inspire || {})[c.role] || []).includes(q.category);
}

// answers：{ slot: 选项下标 }，没答的不写。返回得分、是否通过、加成和要带进面试的记号。
export function testResult(c, slots, answers) {
  const t = c.test;
  let score = 0;
  const flags = [];
  for (const s of slots) {
    const i = answers[s.slot];
    const ok = i !== undefined && i !== null && s.q.options[i].correct === true;
    if (ok) score += s.q.points;
    else if (s.q.review_flag) flags.push(s.q.review_flag);
  }
  const passed = score >= t.pass_line;
  const bonus = passed ? Math.min(t.bonus.max, Math.floor((score - t.pass_line) / t.bonus.per_points)) : 0;
  return { score, passed, bonus, flags };
}

// ---------------------------------------------------------------- 群面

export class GroupDiscussion {
  constructor(c) {
    this.c = c;
    this.g = c.group;
    this.dims = Object.fromEntries(Object.keys(this.g.dims).map((k) => [k, 0]));
    this.npc = Object.fromEntries(this.g.npcs.map((n) => [n.id, { ...n.base }]));
    this.flags = new Set();
    this.progress = 0;
    this.listen = 0;
    this.missStreak = 0;
    this.penalty = 0;
    this.tookSummary = false;
    this.redline = false;
    this.log = [];
  }

  enter(step) {
    this.progress += step.npc_progress || 0;
  }

  resolve(options) {
    const out = [];
    for (const o of options) {
      const req = o.requires || {};
      if (req.flag && !this.flags.has(req.flag)) {
        if (o.fallback) out.push(o.fallback);
        continue;
      }
      out.push(o);
    }
    return out;
  }

  // 按当前局面算出这个选项的实际效果（when 里第一个满足条件的覆盖默认值）。
  effect(o) {
    for (const w of o.when || []) {
      const ok = (w.flag === undefined || this.flags.has(w.flag))
        && (w.not_flag === undefined || !this.flags.has(w.not_flag))
        && (w.listen_gte === undefined || this.listen >= w.listen_gte);
      if (ok) return { dims: w.dims ?? o.dims ?? {}, progress: w.progress ?? o.progress ?? 0, matched: true };
    }
    return { dims: o.dims || {}, progress: o.progress || 0, matched: false };
  }

  ev(o) {
    if (o.redline) return -99;
    const e = this.effect(o);
    return Object.values(e.dims).reduce((a, b) => a + b, 0) + 0.5 * e.progress + 0.5 * (o.listen || 0);
  }

  choose(step, o) {
    this.missStreak = 0;
    if (o.redline) {
      this.redline = true;
      this.log.push({ step: step.id, id: o.id, redline: true });
      return { redline: true };
    }
    const e = this.effect(o);
    for (const [k, v] of Object.entries(e.dims)) this.dims[k] += v;
    for (const [nid, d] of Object.entries(o.npc || {})) for (const [k, v] of Object.entries(d)) this.npc[nid][k] += v;
    this.progress += e.progress;
    this.listen += o.listen || 0;
    for (const f of o.flags || []) this.flags.add(f);
    if (o.take_summary) this.tookSummary = true;
    if (step.summary) this.summaryDone(o.take_summary);
    this.log.push({ step: step.id, id: o.id });
    return { redline: false, bad: o.take_summary && !e.matched };
  }

  miss(step) {
    this.missStreak += 1;
    if (this.missStreak % this.g.miss.streak === 0) this.penalty -= this.g.miss.penalty;
    if (step.summary) this.summaryDone(false);
    this.log.push({ step: step.id, id: null });
  }

  summaryDone(playerTook) {
    if (playerTook) return;
    const sb = this.g.summary_bonus;
    for (const [k, v] of Object.entries(sb.dims)) this.npc[sb.npc][k] += v;
    this.progress += sb.progress;
  }

  finish() {
    const conclusionOk = this.progress >= this.g.conclusion.need;
    const sum = (d) => Object.values(d).reduce((a, b) => a + b, 0);
    const fail = conclusionOk ? 0 : this.g.conclusion.fail_penalty;
    const player = sum(this.dims) + this.penalty - fail;
    const npcTotals = Object.fromEntries(Object.entries(this.npc).map(([id, d]) => [id, sum(d) - fail]));
    const rank = 1 + Object.values(npcTotals).filter((t) => t >= player).length;
    const passed = rank <= this.g.advance_top;
    const pf = this.g.push_flag;
    const flags = [];
    if (this.dims.push >= pf.min_push && Object.values(this.dims).every((v) => this.dims.push >= v)) flags.push(pf.flag);
    return { player, npcTotals, rank, passed, conclusionOk, flags, dims: { ...this.dims }, npcDims: JSON.parse(JSON.stringify(this.npc)) };
  }
}

// ---------------------------------------------------------------- 谈薪

export class Negotiation {
  constructor(c, flags, vars = {}) {
    this.c = c;
    this.flags = flags;
    this.vars = vars;
    const ns = c.scoring.negotiation;
    this.T = ns.start_T;
    this.R = ns.start_R;
    this.opened = new Set();
    this.chosen = new Set();
    this.queue = [...c.neg.flow];
    this.finalOffer = false;
    this.redline = false;
    this.package = null; // 独角兽选的期权方案，只影响结算页显示的数字，不影响计分
    this.log = [];
  }

  // 返回下一个节点；没有了返回 null。进入节点时，满足条件的开场白会先扣好感。
  next() {
    while (this.queue.length) {
      const id = this.queue.shift();
      const node = this.c.neg.nodes[id];
      if (id === "neg_second" && (this.finalOffer || this.R < (node.requires_R ?? 1))) continue;
      const pre = (node.pre_lines || []).filter((p) => this.flags.has(p.if_flag));
      for (const p of pre) this.R += p.R || 0;
      const options = node.kind === "inspect" ? null : this.resolve(node.options);
      return { id, node, pre, options };
    }
    return null;
  }

  // 返回的选项文字已经填好投递进度（{offer}、{process.*}）
  resolve(options) {
    const out = [];
    const put = (o) => out.push({ ...o, text: fillText(o.text, this.vars, true), line: fillText(o.line, this.vars, true) });
    for (const o of options) {
      const req = o.requires || {};
      let ok = true;
      if (req.opened && !this.opened.has(req.opened)) ok = false;
      if (req.flag && !this.flags.has(req.flag)) ok = false;
      if (req.not_flag && this.flags.has(req.not_flag)) ok = false;
      if (req.not_chosen && this.chosen.has(req.not_chosen)) ok = false;
      if (ok) put(o);
      else if (o.fallback) put(o.fallback);
    }
    return out;
  }

  open(termId) {
    this.opened.add(termId);
  }

  choose(o) {
    const pre = (o.pre_lines || []).filter((p) => this.flags.has(p.if_flag));
    for (const p of pre) this.R += p.R || 0;
    this.chosen.add(o.id);
    if (o.package) this.package = o.package;
    if (o.redline) {
      this.redline = true;
      this.log.push({ id: o.id, redline: true });
      return { pre };
    }
    if (o.if_R_gte !== undefined) {
      if (this.R >= o.if_R_gte) this.T += o.T || 0;
      else this.R += o.else.R || 0;
    } else {
      this.T += o.T || 0;
      this.R += o.R || 0;
    }
    for (const f of o.flags || []) this.flags.add(f);
    if (this.R <= 0) this.finalOffer = true;
    if (o.next) this.queue.unshift(o.next);
    this.log.push({ id: o.id, T: this.T, R: this.R });
    return { pre };
  }

  timeout() {
    this.T -= 1;
    this.log.push({ id: "timeout", T: this.T, R: this.R });
  }

  unopenedBadTerms() {
    return this.c.neg.offer_terms.filter((t) => t.bad && !this.opened.has(t.id));
  }

  finish() {
    const ns = this.c.scoring.negotiation;
    const penalty = Math.min(this.unopenedBadTerms().length * ns.unopened_bad_term_penalty, ns.unopened_bad_term_cap);
    this.T -= penalty;
    let shift = 0;
    if (this.T >= ns.tier_up_at) shift = 1;
    else if (this.T < ns.tier_down_below) shift = -1;
    return { shift, T: this.T, R: this.R, penalty };
  }
}
