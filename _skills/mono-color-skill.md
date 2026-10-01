---
title: "yanliudesign/mono-color-skill：单色 / 双色编辑印刷风格出图 skill"
date: 2026-09-30
source: "yanliudesign（Yan Liu）"
src: "https://github.com/yanliudesign/mono-color-skill"
risk: low
theme: [design-teaching]
repo: "yanliudesign/mono-color-skill"
stars: 3314
pushed: 2026-09-02
stats_at: 2026-10-01
tags: [设计视觉, 图像生成, 编辑设计, Skill]
summary: "把主题、短句、物件或照片转成单色 / 受控双色的编辑印刷风格图像（网点、孔版颗粒、可见纸面、大面积留白），交付位图、完整生成 Prompt 与配方说明；本体为 Markdown + JSON 设计规范，无运行时依赖。"
---

**简介**：单色 / 双色编辑印刷风格的图像生成 skill。输入主题、短句、物件、文章想法或照片，输出带网点、孔版颗粒、可见纸面和大面积留白的编辑视觉，README 列出的用途包括海报、Zine、社媒封面、明信片、包装与书刊封面。默认受控双色：主墨约占 70%–85% 印刷面积，辅墨占 15%–30%、只承担日期、注释等单一信息；用户明确要求单色时只用一块印版。背景在中性白、冷灰、淡米色之间按主题自适应，默认当代 Editorial 风格，复古做旧效果需用户明确要求。

**要点**：每次运行交付一张位图、实际使用的完整生成 Prompt 和一份配方说明（印刷模式、油墨配方、版式、字体搭配、印刷工艺）；当前环境不能生成图像时只交付 Prompt。`design-system/` 目录把颜色 token、字体角色、构图几何、视觉节奏和印刷偏差写成可校验的 JSON，`scripts/` 为本地校验脚本，GitHub Actions 在每次提交时运行同一套检查。README 列有「不做这些」清单：不给彩色照片套单色滤镜、不超过两块印版、不复刻参考海报、不虚构品牌 / 网址 / 二维码。中英双语 README，`git clone` 到 skills 目录即可使用。

**作者可信度**：中（yanliudesign / Yan Liu 个人维护，仓库创建于 2026-08）。

**来源说明（客观事实）**：代码、Skill 指令与脚本为 MIT 许可；`examples/` 中作者本人的原创示例图不在 MIT 范围内；视觉系统研究所用的 12 张第三方参考图版权归原作者，README 附署名清单与纠错入口。SKILL.md 默认把生成文件存到本机 `~/Desktop/Claude skills/mono-color/`。核查于 2026-09-30。

**安全审查（七项客观事实，审查于 2026-09）**：① 无隐藏指令，SKILL.md 是设计系统规范文档，内容与出图目的一致；② 无外部 URL、API 端点或网络调用，出图依赖调用环境自带的图像生成能力，未指定外部服务；③ 越权——`git clone` 安装，`scripts/` 为本地 Python 校验工具，无系统命令执行，不读敏感路径；④ 无 `curl|bash`、无 base64 混淆，`scripts/` 用于开发校验，不是安装脚本；⑤ 描述与行为一致；⑥ 供应链——MIT，代码文件只有 .md / .json 与校验用 .py，无 npm / pip 运行时依赖；⑦ 无凭证窃取。

**风险评级**：🟢 低。

> 安全审查基于审查时（2026-09）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/yanliudesign/mono-color-skill)。
