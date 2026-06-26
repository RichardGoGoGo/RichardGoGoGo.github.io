---
title: "XiaohongshuSkills：基于 Chrome CDP 的小红书自动化 skill"
date: 2026-06-24
source: "white0dew"
src: "https://github.com/white0dew/XiaohongshuSkills"
tags: [内容发布, Skill, 小红书]
summary: "基于 Chrome CDP 的小红书自动化 skill：发图文/视频、搜索、评论、多账号管理、数据导出 CSV。"
---

**简介**：基于 Chrome CDP 的小红书自动化 skill，支持发图文 / 视频、搜索、评论、多账号管理、数据导出 CSV。

**要点**：Chrome 无头模式 + 远程 CDP；Cookie 隔离多账号；README 明确警示平台封号风险。

**活跃度**：3.1k★ / 30 commits（MIT）。作者可信度：中。

**安全审查（七项客观事实，审查于 2026-06）**：① 无隐藏指令；② `cdp_publish.py` 网络请求仅指向 xiaohongshu.com，`tmp/login_status_cache.json` 仅存布尔登录态、无凭证明文；③ 需本机 Chrome 控制（CDP 8222+ 端口）+ 文件系统读写，发布场景下属功能需要，攻击面较大；④ base64 仅用于截图显示二维码（合理用途）；⑤ 功能如 README 所述，已写明平台封号风险；⑥ Python 标准依赖（playwright / requests），无私有 pip 源；⑦ Cookie 存本机 Chrome Profile，无外传。

**风险评级**：🟡 中（Chrome 自动化权限重 + 平台封号风险；非恶意但攻击面大）。

> 安全审查基于审查时（2026-06）的源码与文档，使用前请再核一次。来源：[GitHub](https://github.com/white0dew/XiaohongshuSkills)。
