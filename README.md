# 桌面塔罗 · Desktop Tarot

*[English](README.en.md) · 简体中文*

一个漫画风格的桌面塔罗牌占卜应用。选一个主题（或写下自己的问题），凭直觉从 78 张牌里抽出 3 张，系统会把它们摆进对应的牌阵位置，并给出解读。

## 功能

- **中英双语**，右上角一键切换，选择会记住
- **5 种占卜主题**：
  - 爱情（我 / 对方 / 关系）
  - 事业（现状 / 挑战 / 建议）
  - 财运（现状 / 机遇 / 建议）
  - 整体运势（过去 / 现在 / 未来）
  - **自定义问题**（现状 / 影响 / 指引）—— 写下任意问题
- **完整 78 张塔罗牌**（22 张大阿尔卡纳 + 56 张小阿尔卡纳），使用 Rider-Waite-Smith 经典牌面
- **两种解读方式**：
  - **本地牌意库**（默认）：完全离线、零成本、即时响应。自定义问题会按关键词自动匹配最贴切的牌阵语气
  - **AI 深度解读**（可选）：填入 Anthropic API Key 后可用，把你的问题和抽到的牌交给 Claude 生成针对性解读
- 漫画风 UI：粗描边、网点纹理、木纹桌面、翻牌动画、对话框式解读面板

## 运行

需要 Node.js（建议 18+）。

```bash
npm install
npm run dev
```

`npm run dev` 会启动 Electron 应用窗口（渲染层带热更新）。

其他脚本：

```bash
npm run build      # 构建生产包
npm run typecheck  # TypeScript 类型检查
```

## AI 解读（可选）

不配置也能正常使用——所有主题都有完整的本地牌意解读。

想启用 AI 解读：

1. 在 [Anthropic Console](https://console.anthropic.com/) 申请一个 API Key
2. 打开应用右上角的 ⚙ 设置，填入 Key 并保存
3. 占卜完成后，解读页会出现「AI 深度解读」按钮

关于 Key 的安全性：Key 用系统钥匙串（Electron `safeStorage`）加密后保存在本地，只在主进程中使用，不会暴露给渲染层，也不会上传到除 Anthropic API 以外的任何地方。

使用 Claude Haiku 4.5 模型，单次占卜成本极低（约 500 输入 + 300 输出 token）。

## 技术栈

Electron + React + TypeScript，通过 [electron-vite](https://electron-vite.org/) 构建。

## 数据来源

卡牌图与卡牌名称/花色元数据来自 [equokka/tarot-json](https://github.com/equokka/tarot-json)（MIT License），原始 Rider-Waite-Smith 牌面图在美国属于公有领域。牌意解读文本为本项目原创编写。
