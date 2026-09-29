#!/usr/bin/env python3
"""把浅译自有 skill 的正本（D:/transwonder/00-shared/skills/qianyi-*/SKILL.md）同步成社区站「SKILL 精炼」的对外副本（_refined/<slug>.md）。

做的事：去掉 skill 自带的 frontmatter 与一级标题 → 清理内部路径 → 套上站点 frontmatter（标题、摘要、场景、来源、附录、许可）。
用法：python _tools/sync_refined.py            （在社区站仓库根目录运行）
同步后检查输出里的「残留内部引用」必须为空，再本地构建预览。
"""
import glob, os, re, sys

SK = r"D:\transwonder\00-shared\skills"
OUT = "_refined"
UPDATED = "2026-09-29"

# 每个 skill 的站点元数据。sources：(显示名, 仓库/作者, 站内来源评测 slug 或 None, 外链 或 None)
META = {
    "qianyi-writing": dict(
        title="浅译·通用写作", order=1,
        summary="中英文写作与去 AI 味：写、改、检三种模式，四层自检，P0、P1 问题清零才交付。",
        scenes=["公众号", "说明文档", "邮件", "课程材料", "项目介绍"],
        sources=[("khazix-writer", "KKKKhazix/khazix-skills", "khazix-writer", None),
                 ("wewrite", "imraywang/wewrite", "wewrite", None),
                 ("claude-blog", "AgriciDaniel/claude-blog", None, "https://github.com/AgriciDaniel/claude-blog"),
                 ("OpenAI · GPT-6 Astra 写作风格指南", "官方文档", None, "https://developers.openai.com/api/docs/guides/latest-model#gpt-6-astra-personality-and-writing-style"),
                 ("浅译内部写作规范", "浅译万道实验室", None, None)]),
    "qianyi-figure": dict(
        title="浅译·科研配图", order=2,
        summary="论文插图、申报书框架图与技术路线图：按要表达的关系选图型，按印刷规范出图，核数值加看图两步自检。",
        scenes=["论文插图", "课题申报", "技术路线图", "系统架构图"],
        sources=[("archify", "tt-a1i/archify", "archify", None),
                 ("drawio-skill", "Agents365-ai/drawio-skill", "drawio-skill", None),
                 ("oh-my-mermaid", "oh-my-mermaid/oh-my-mermaid", "oh-my-mermaid", None),
                 ("academic-figure-builder", "浅译万道实验室", None, None)]),
    "qianyi-narrative-ppt": dict(
        title="浅译·叙事PPT", order=3,
        summary="先搭叙事再做页面：观众状态、故事线、每页只讲一件事，最后出 HTML 演示稿或 PPTX。",
        scenes=["工作坊", "课程课件", "学术报告", "项目汇报"],
        sources=[("humanize-ppt", "LearnPrompt/humanize-ppt", "humanize-ppt", None),
                 ("frontend-slides", "zarazhangrui/frontend-slides", "frontend-slides", None),
                 ("visual-style-ppt-skill", "irenerachel/visual-style-ppt-skill", "visual-style-ppt", None),
                 ("Anthropic pptx skill", "anthropics/skills", "anthropics-skills", None),
                 ("baoyu-design", "JimLiu/baoyu-design", "baoyu-design", None)]),
    "qianyi-motion-video": dict(
        title="浅译·创意视频", order=4,
        summary="用前端方式做动效视频：先定节拍表和风格系统，再用 HTML/CSS/JS 写可逐帧定位的动效镜头，渲染成 MP4，并按清单去掉 AI 预设感。",
        scenes=["片头", "作品集 showreel", "产品介绍", "课程宣传", "社媒短视频"],
        sources=[("HyperFrames", "heygen-com/hyperframes", None, "https://github.com/heygen-com/hyperframes"),
                 ("remotion-best-practices", "remotion-dev/skills", None, "https://github.com/remotion-dev/skills"),
                 ("video-shotcraft", "Vincentwei1021/video-shotcraft", None, "https://github.com/Vincentwei1021/video-shotcraft"),
                 ("vox-director", "Alisa0808/vox-director", None, "https://github.com/Alisa0808/vox-director"),
                 ("pixel2motion", "nolangz/pixel2motion", "pixel2motion", None),
                 ("three.js", "mrdoob/three.js", None, "https://github.com/mrdoob/three.js"),
                 ("常用 WEB 交互动效图鉴", "浅译万道实验室", None, "https://www.transwonder.top/vibe/motion-techniques/"),
                 ("shneural 案例", "Telegram · shneural", None, "https://t.me/shneural/1365")]),
}

# 内部路径 → 对外说法（按顺序替换）
SANITIZE = [
    ("`00-shared/knowledge/`", "团队资料库"),
    ("`00-shared/brand/BRAND.md`", "团队品牌规范（如有）"),
    ("00-shared/brand/BRAND.md", "团队品牌规范（如有）"),
    ("路径：00-shared/prompts/social-writing.md", "路径：浅译内部写作规范"),
    ("链接：仓库内文件", "链接：内部文件"),
    ("（记忆文件 writing-anti-slop-defaults.md，2026-09-09，源自 [4]）", "（2026-09-09，源自 [4]）"),
    ("用户默认写作限制", "浅译默认写作限制"),
    ("路径：~/.claude/skills/academic-figure-builder/", "路径：academic-figure-builder/"),
    ("路径：.claude/skills/<名称>/SKILL.md（当前版）", "路径：浅译动效图标 skill <名称>/SKILL.md（当前版）"),
    ("路径：external/RichardGoGoGo.github.io/vibe/motion-techniques.html（社区站当前版）", "链接：https://www.transwonder.top/vibe/motion-techniques/（社区站当前版）"),
]
# 只抓我们自己的内部路径；来源仓库里自带的 .claude/… 路径（如 HyperFrames 的 motion-doctrine）属于正常引用
LEAK = re.compile(r"00-shared|07-skillradar|~/\.claude|路径：\.claude|C:\\|D:\\|march|记忆文件|external/RichardGoGoGo")


def q(x):
    return '"' + str(x).replace('"', "「") + '"'


def build(slug, m):
    src = os.path.join(SK, slug, "SKILL.md")
    s = open(src, encoding="utf-8").read()
    body = s[s.index("\n---", 4) + 4:].lstrip("\n")
    body = re.sub(r"^# .*\n+", "", body, count=1)
    for a, b in SANITIZE:
        body = body.replace(a, b)
    # 本机路径形式的「链接：…」一律改为「链接：内部 skill」
    body = re.sub(r"链接：本(?:地|机)[^\n]*", "链接：内部 skill", body)
    appx = sorted(os.path.basename(p) for p in glob.glob(os.path.join(SK, slug, "references", "*")))
    fm = ["---", f"title: {q(m['title'])}", f"order: {m['order']}", f"summary: {q(m['summary'])}",
          "scenes: [" + ", ".join(q(x) for x in m["scenes"]) + "]", "license: MIT", 'version: "0.1"',
          f"updated: {UPDATED}", "appendix: [" + ", ".join(q(x) for x in appx) + "]", "sources:"]
    for name, repo, sk, url in m["sources"]:
        fm += [f"  - name: {q(name)}", f"    repo: {q(repo)}"]
        if sk:
            fm.append(f"    skill: {sk}")
        if url:
            fm.append(f"    url: {q(url)}")
    fm.append("---")
    open(os.path.join(OUT, slug + ".md"), "w", encoding="utf-8", newline="\n").write("\n".join(fm) + "\n\n" + body)
    leaks = [l.strip()[:80] for l in body.split("\n") if LEAK.search(l)]
    print(f"{slug}: {len(body)} 字符，附录 {len(appx)} 篇，残留内部引用 {len(leaks)}", *(["  ! " + x for x in leaks]), sep="\n")
    return not leaks


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    ok = all(build(k, v) for k, v in META.items() if os.path.exists(os.path.join(SK, k, "SKILL.md")))
    sys.exit(0 if ok else 1)
