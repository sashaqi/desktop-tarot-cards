# 桌面塔罗 · Desktop Tarot Cards

一个漫画风格的桌面塔罗牌占卜应用。选一个主题，凭直觉从 78 张牌里抽出 3 张，系统会把它们摆进对应的牌阵位置，并给出简短解读。

## 功能

- 3 个占卜主题：爱情（我/对方/关系）、事业（现状/挑战/建议）、整体运势（过去/现在/未来）
- 完整 78 张塔罗牌（22 张大阿尔卡纳 + 56 张小阿尔卡纳），使用 Rider-Waite-Smith 经典牌面扫描图
- 本地牌意数据库，支持正位/逆位，完全离线，无需联网或 API Key
- 漫画风 UI：粗描边、网点纹理、翻牌动画、对话框式解读面板

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

## 技术栈

Electron + React + TypeScript，通过 [electron-vite](https://electron-vite.org/) 构建。

## 数据来源

卡牌扫描图与卡牌名称/花色元数据来自 [equokka/tarot-json](https://github.com/equokka/tarot-json)（MIT License），原始 Rider-Waite-Smith 牌面图在美国属于公有领域。牌意解读文本为本项目原创编写。
