---
title: "nolangz/pixel2motion：AI logo 动效生成"
date: 2026-07-09
source: "nolangz"
src: "https://github.com/nolangz/pixel2motion"
tags: [设计视觉, 品牌动效, SVG, Skill]
summary: "把光栅 logo 转为精准 SVG 矢量，再按迪士尼 12 动画原则编排缓动动画，输出无依赖 HTML 展示页 + motion_spec.md。"
---

**简介**：三阶段流程（PIXEL→VECTOR→MOTION）——将光栅 logo 转换为精准 SVG 矢量，再按迪士尼 12 动画原则编排缓动动画；含硬平滑门控（10 次迭代保证曲线无锯齿）、IoU 几何精度审计与帧捕获证据条；输出无依赖 HTML 展示页与 motion_spec.md。

**要点**：全本地处理；输出为自包含 HTML。

**活跃度**：1.3k★ / 2026-06-29 更新（MIT）。作者：个人维护。

**安全审查（七项客观事实，审查于 2026-07）**：① 无隐藏指令，SKILL.md 与目的一致；② 全本地处理，`agents/openai.yaml` 仅为界面定义、不调用 OpenAI API，Playwright 本地 Chromium 渲染；③ 依赖 Pillow / numpy / Playwright 均为标准库，`playwright install chromium` 为标准做法；④ 无 curl|bash、无 base64 混淆、无动态远程执行；⑤ 描述与行为一致；⑥ 依赖均为知名 Python 库、无私有来源（未见 requirements.txt，依赖内联于文档，使用前建议 pin 版本）；⑦ 无凭证窃取。

**风险评级**：🟢 低。

> 安全审查基于审查时（2026-07）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/nolangz/pixel2motion)。
