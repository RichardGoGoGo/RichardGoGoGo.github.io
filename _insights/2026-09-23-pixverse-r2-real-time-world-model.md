---
title: "PixVerse 发布实时世界模型 R2：会话更长更连贯，前面的操作会延续到后面，可同时接收文字、参考图、音频与按键控制"
date: 2026-09-22
icat: 模型
source: "PixVerse 官方博客"
src: "https://pixverse.ai/en/blog/pixverse-introduces-r2-real-time-world-model"
tags: [PixVerse, 世界模型, 实时生成, 互动叙事, 游戏]
summary: "PixVerse 9 月 22 日发布实时世界模型 R2：生成的世界持续运行，会话中的提示词、动作与音频输入会改变之后的发展而不重置，可用 WASD 与方向键操控角色和镜头；PixVerse 游戏引擎已改用 R2，一批示例世界在 world.pixverse.video 开放体验。"
sources:
  - { name: "PixVerse 官方博客", url: "https://pixverse.ai/en/blog/pixverse-introduces-r2-real-time-world-model", tier: official }
reason: "世界模型从生成片段走向可以进入、会记住操作的持续世界，互动叙事和游戏原型可以直接在上面搭。"
topics: [视频生成, 3D 与世界模型]
weight: 3
---

PixVerse 于 9 月 22 日发布实时世界模型 R2，是 1 月推出的 R1 的升级。R2 生成的世界在用户进入后持续运行，会话更长、更连贯：提示词、动作或音频输入不只改变当前画面，还会更新世界状态、影响之后的发展，前面的操作在同一会话中一直有效；可以用 WASD 键操控角色、方向键移动镜头，文字、参考图、音频与动作控制都能输入同一个运行中的世界。官方示例包括创作者基于 R2 做的互动电影游戏，同一处剧情会按玩家的选择生成不同走向。官方介绍其做法是持续训练同一个因果自回归主干模型，再把它压缩到可实时运行，技术报告另行发布。PixVerse 7 月推出的游戏引擎已改用 R2，一批示例世界在 world.pixverse.video 开放体验。

> 世界模型开始支持持续交互与状态延续，互动叙事、游戏原型可以直接在生成的世界里搭建和试玩。
