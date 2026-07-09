---
title: "AI 设计教学"
date: 2026-07-09
category: knowledge
permalink: /knowledge/design-teaching/
tags: [知识库, 设计教学]
summary: "把 AI 融进设计课与工作坊的系统方法库：教学框架与原则、分环节工具地图、课程/活动设计、作业评估、使用规范。面向高校设计/艺术/建筑教师与教学组织者。"
---

把 AI 融进设计课与工作坊的系统方法库，面向高校设计 / 艺术 / 建筑方向的教师与教学组织者。核心判断：工具会迭代，但"怎么和 AI 一起想问题"的能力更持久——所以教学目标不止于教工具操作，而是发展学生与 AI 批判性、创造性协作的高阶能力。

## 方法论沉淀（长青篇）

- [总览：AI 进设计课的整体框架与原则](/knowledge/design-teaching/overview/) —— 五条核心原则 + 一个可操作的备课自查框架
- [工具地图：设计各环节用哪些 AI](/knowledge/design-teaching/tool-map/) —— 调研 / 出图 / 出视频 / 排版 / 评图分环节选型

## 本期综述（时间线，倒序）

{% assign reviews = site.pages | where: "line", "design-teaching" | where: "review", true | sort: "date" | reverse -%}
{% if reviews.size > 0 -%}
{% for r in reviews -%}
- [{{ r.title }}]({{ r.url }}) · {{ r.date | date: "%Y-%m-%d" }}
{% endfor -%}
{% else -%}
_首期综述即将发布——每轮扫描当期真有料的新工具 / 新研究 / 新方法 / 新案例，附来源，累积成时间线。_
{%- endif %}

## 覆盖面

综述每期扫描这些子领域（有料才写、无料跳过并注明）：教学框架与原则 · 分环节工具地图 · 课程/工作坊设计模板 · 课堂活动与作业设计 · 学生 AI 作业评估量规 · 课堂 AI 使用规范与伦理 · 常见坑与应对。

> 底气：内容结合清华《创意设计》课的 AI 模块与十余所高校工作营的实际教学持续验证与调整；所有论断附真实来源，随新资料迭代。
