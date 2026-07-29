<div align="center">

# 🔮 桌面塔罗 · Desktop Tarot

**占卜不求人** —— 一个漫画风格的桌面塔罗应用，78 张牌全部离线可用，即时出解读，可接入 AI。

*[English](README.en.md) · 简体中文*

![Electron](https://img.shields.io/badge/Electron-33-47848F?logo=electron&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

<img src="docs/images/02-deck.jpg" width="820" alt="78 张塔罗牌铺在木纹桌面上，等待抽取">

</div>

---

## 这是什么

选一个主题（或者写下你自己的问题），从铺满桌面的 78 张牌里凭直觉点选 3 张，翻开后得到一份完整的解读。

**全程离线、零成本、不用注册。** 牌意库内置在应用里，没有网络也能用。

<table>
<tr>
<td width="50%"><img src="docs/images/01-categories.png" alt="五个占卜主题"></td>
<td width="50%"><img src="docs/images/05-reading.png" alt="解读面板"></td>
</tr>
<tr>
<td align="center"><sub>五个主题，含自定义问题</sub></td>
<td align="center"><sub>逐位解读 + 综合解读</sub></td>
</tr>
</table>

<div align="center">
<img src="docs/images/04-reveal.jpg" width="760" alt="翻牌后的牌阵与牌名标签">
</div>

## 特性

- 🎴 **完整 78 张牌** —— 22 张大阿尔卡纳 + 56 张小阿尔卡纳，经典 Rider-Waite-Smith 牌面，支持正逆位
- 🗂️ **五种牌阵** —— 爱情、事业、财运、整体运势，外加**自定义问题**（可以问任何事）
- 🌏 **中英双语** —— 一键切换，78 张牌的解读文案两种语言都有
- 🔒 **完全离线** —— 牌意库内置，不联网、不上传、不需要账号
- 🤖 **可选 AI 解读** —— 填入自己的 Anthropic API Key 后，可以让 Claude 针对你的具体问题写一份解读（不填也能完整使用）
- 🎨 **漫画风界面** —— 粗描边、网点纹理、木纹桌布、翻牌动画

## 快速开始

需要 Node.js 18+。

```bash
git clone https://github.com/sashaqi/desktop-tarot-cards.git
cd desktop-tarot-cards
npm install
npm run dev
```

其他脚本：

```bash
npm run build      # 构建生产包
npm run typecheck  # TypeScript 类型检查
```

## 关于 AI 解读（可选）

**不配置也能完整使用** —— 所有主题都有完整的本地解读。自定义问题会通过关键词路由匹配到最贴切的牌阵语气。

想要针对具体问题的解读：

1. 到 [Anthropic Console](https://console.anthropic.com/) 申请 API Key
2. 应用右上角 ⚙ → 填入并保存
3. 占卜结束后点「AI 深度解读」

Key 用系统钥匙串（Electron `safeStorage`）加密后存在本地，只在主进程使用，渲染进程拿不到，也不会上传到 Anthropic API 以外的任何地方。设置面板里会显示具体的保存路径。

模型用的是 Claude Haiku 4.5，单次占卜约 500 输入 + 300 输出 token，成本可以忽略。

## 这个项目是怎么做出来的

**整个项目由 [Claude](https://claude.ai/code) 结对完成，包括这份 README。** 迭代了三个版本，git history 里能看到完整过程：

| 版本 | 主要变化 |
|---|---|
| **v1** | 跑通核心流程：22 张大阿尔卡纳 + 三主题牌阵 + 翻牌动画 |
| **v2** | 扩展到完整 78 张牌、中英双语、新增财运牌阵、界面全面收紧 |
| **v3** | 自定义问题 + 关键词路由、可选 AI 解读、牌面完整展示 |

几个我觉得值得一提的片段：

- **78 张牌的解读文案全部由 AI 撰写**，中英双语共 312 段（78 张 × 正逆位 × 两种语言），我一句都没改
- **选牌背景从绿色台呢改成木纹桌面**，是因为我说「绿色不太突出牌背」，它诊断出问题在于深蓝卡背和绿呢的明度与饱和度太接近，然后给了三个对比方案让我选
- **AI 解读功能差点没做成现在这样** —— 我本来想直接接大模型，它建议先做本地兜底再把 AI 做成可选增强，理由是离线可用性对这类工具更重要

## 技术栈

Electron + React + TypeScript，用 [electron-vite](https://electron-vite.org/) 构建。渲染层无外部状态管理库，一个 `useReducer` + Context 就够了。

## 数据来源与许可

卡牌图与名称/花色元数据来自 [equokka/tarot-json](https://github.com/equokka/tarot-json)（MIT License）；原始 Rider-Waite-Smith 牌面在美国属于公有领域。

**牌意解读文案为本项目原创编写**，未照搬任何书籍或网站。

本项目以 [MIT License](LICENSE) 开源。

---

<div align="center">
<sub>塔罗是一面镜子，不是预言。抽到什么牌，重要的是它让你想到了什么。</sub>
</div>
