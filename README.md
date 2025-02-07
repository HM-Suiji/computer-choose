# 电脑价格计算器 💻💰

## 简介

本项目是一个基于 React、Vite 和 HeroUI 的 Web 应用程序，旨在帮助用户轻松搞定电脑配件的价格和配置方案！🚀 你可以尽情添加、编辑、删除配件，还能创建多个配置方案进行对比，找出最划算的组合！🧮😁

## 技术栈

- **前端框架:** React ⚛️
- **构建工具:** Vite ⚡
- **UI 组件库:** HeroUI 🦸
- **状态管理:** Zustand 💾
- **路由:** React Router DOM 🧭
- **图表:** Recharts 📊
- **样式:** Tailwind CSS 🎨

## 功能

- **配件管理:**
  - 添加新配件 (类型、名称、价格)➕
  - 编辑现有配件 ✏️
  - 删除配件 🗑️
  - 从文件导入配件
  - 从文件导出配件（TODO）
- **方案管理:**
  - 创建新的配置方案 ✨
  - 在方案中添加/移除配件 ➕➖
  - 删除配置方案 🗑️
  - 编辑方案 ✏️
- **价格展示:**
  - 表格显示所有配件及其价格 📈
  - 饼图显示每个方案中不同类型配件的价格占比 🥧
- **数据持久化:** 使用 Zustand 的 `persist` 中间件将配件和方案数据存储在 `localStorage`，再也不怕数据丢失啦！💾

## 快速开始

1. **安装依赖:**

   ```bash
   npm install
   # 或
   pnpm install
   # 或
   yarn
   ```

2. **运行开发服务器:**

   ```bash
   npm run dev
   # 或
   pnpm dev
   #or
   yarn dev
   ```

3. **构建生产版本:**

   ```bash
   npm run build
   # 或
   pnpm build
   # 或
   yarn build
   ```

### Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/HM-Suiji/computer-choose&repository-name=computer-choose)

- 也可以部署在 [cli](https://vercel.com/docs/cli):
  `vercel deploy`
- 本地提供服务: `vercel dev`
- Vercel _功能_ [限制](https://vercel.com/docs/functions/limitations) (with _Edge_ runtime)

## 组件说明

- `PartForm`: 用于添加和编辑配件的表单。

- `PartTable`: 以表格形式展示所有配件，并提供删除和编辑操作。
- `PartEditModal`: 编辑零件时弹出的对话框。
- `PieChart`: 根据提供的`data`绘制饼图。
- `SchemeTab`: 允许用户在不同的电脑配置方案之间切换，并进行编辑和删除操作。
- `PartEditor`: 在`SchemeTab`内部使用，允许用户为特定类型的配件选择一个方案。
- `Navbar`: 应用程序的导航栏。

## 开发者

- [HM-Suiji](https://github.com/HM-Suiji) 😎

## 许可证

[MIT License](LICENSE)
