---
title: "danilo-znamerovszkij/draw-your-font：手写体照片→真实字体 skill"
date: 2026-09-21
source: "danilo-znamerovszkij"
src: "https://github.com/danilo-znamerovszkij/draw-your-font"
tags: [设计视觉, 字体设计, Skill]
summary: "拍一张手写样本，CLI 自动分割字母 + SVG 矢量化 + 输出可安装的 TTF/WOFF/WOFF2 字体文件；含可选易混字母检测（rn→m、I/l/1、O/0）；全流程本地运行、零上传。"
---

**简介**：手写体照片转真实字体 skill——拍一张手写样本，CLI 自动完成字母分割、SVG 矢量化，输出可安装的 TTF / WOFF / WOFF2 字体文件；含可选的易混字母检测（rn→m、I/l/1、O/0）。Node CLI + Claude Code skill 双形态。

**要点**：全流程本地运行（SKILL.md 确认「no uploads」），手写图片不上传；依赖 potrace / sharp / svg2ttf / ttf2woff / wawoff2 等标准字体处理库；仓库内 wrangler.jsonc 仅用于可选演示站点、非数据上传路径。适合为工作坊课件、实验室品牌制作定制手写字体，或为课题海报/讲义建立专属字体资产。

**活跃度**：590★ / 更新至 2026-08-18（Node.js，MIT）；作者个人维护，590★ 社区验证有限。

**安全审查（七项客观事实，审查于 2026-09）**：① 无隐藏指令，SKILL.md 是字体创建工作流文档；② 数据外泄——CLI 全本地、手写图片不上传，wrangler.jsonc 是可选 Cloudflare Workers 演示站配置、非上传路径；③ 越权——npm 标准安装（Node ≥ 18），仅读用户提供的手写图片、不读 .ssh/.env 等敏感路径；④ 无 `curl|bash`、package.json 无 postinstall/install 钩子、无 base64 混淆；⑤ 描述与行为一致（「全本地、无上传」）；⑥ 供应链 MIT、依赖均为知名字体处理库，社区验证有限、建议引入前 `npm pack` 核查；⑦ 无凭证窃取。

**风险评级**：🟢 低。

> 安全审查基于审查时（2026-09）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/danilo-znamerovszkij/draw-your-font)。
