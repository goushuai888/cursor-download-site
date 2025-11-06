# 部署到 Vercel 指南

## 📋 前提条件

- ✅ Git 仓库已初始化
- ✅ 代码已提交到本地仓库
- 📝 需要 GitHub 账号
- 📝 需要 Vercel 账号（可使用 GitHub 登录）

## 🚀 部署步骤

### 第一步：创建 GitHub 仓库

1. 访问 [GitHub](https://github.com/new) 创建新仓库
2. 填写仓库信息：
   - **Repository name**: `cursor-download-site`（或你喜欢的名字）
   - **Description**: `Cursor 下载站 - 支持多版本下载`
   - **访问权限**: Public 或 Private（都可以）
   - ⚠️ **不要**勾选 "Initialize this repository with a README"

### 第二步：推送代码到 GitHub

复制 GitHub 给你的仓库地址（类似 `https://github.com/你的用户名/cursor-download-site.git`），然后运行：

```bash
# 添加远程仓库
git remote add origin https://github.com/你的用户名/cursor-download-site.git

# 推送代码
git push -u origin main
```

### 第三步：在 Vercel 上部署

#### 方法 1：通过 Vercel 网站（推荐）

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 选择你刚创建的 GitHub 仓库
5. Vercel 会自动检测到这是 Next.js 项目
6. 点击 "Deploy"
7. 等待部署完成（通常 1-2 分钟）

#### 方法 2：使用 Vercel CLI

```bash
# 安装 Vercel CLI
pnpm add -g vercel

# 部署
vercel
```

## ⚙️ Vercel 配置

Vercel 会自动检测 Next.js 项目，通常不需要额外配置。但如果需要，可以创建 `vercel.json`：

```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs"
}
```

## 🔄 自动更新功能说明

部署后，网站会自动运行以下功能：

- ✅ **自动同步版本数据**：每隔 1 小时自动从源 API 获取最新版本
- ✅ **本地缓存**：版本数据会缓存到 `data/versions.json`
- ✅ **容错机制**：如果外部 API 失败，会使用本地缓存数据
- ✅ **手动同步**：访问 `https://你的域名.vercel.app/api/versions/sync` 可手动触发同步

## 📝 后续更新

每次修改代码后：

```bash
# 1. 添加修改的文件
git add .

# 2. 提交修改
git commit -m "描述你的修改内容"

# 3. 推送到 GitHub
git push

# Vercel 会自动检测到更新并重新部署
```

## 🎛️ 自定义配置

### 修改自动同步间隔

编辑 `lib/config.ts`：

```typescript
export const config = {
  autoSync: {
    enabled: true,
    interval: 30 * 60 * 1000, // 改为 30 分钟
    // ...
  },
  // ...
};
```

### 禁用自动同步

如果你想完全控制数据更新，可以禁用自动同步：

```typescript
export const config = {
  autoSync: {
    enabled: false, // 禁用自动同步
    // ...
  },
  // ...
};
```

然后通过访问 `/api/versions/sync` 手动触发更新。

## 🔗 有用的链接

- [Vercel 文档](https://vercel.com/docs)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [GitHub Actions（可选的 CI/CD）](https://github.com/features/actions)

## ⚠️ 注意事项

1. **首次部署后**，建议访问 `https://你的域名.vercel.app/api/versions/sync` 手动触发一次同步，确保数据是最新的

2. **环境变量**（如果以后需要）：
   - 可以在 Vercel 项目设置中添加环境变量
   - 在 Settings → Environment Variables

3. **自定义域名**：
   - Vercel 提供免费的 `.vercel.app` 域名
   - 也可以在项目设置中绑定自己的域名

## 🎉 完成！

部署成功后，你的网站就可以：
- 🌐 在线访问
- 🔄 自动更新版本数据
- 📊 查看访问统计（在 Vercel 控制台）
- 🚀 享受全球 CDN 加速

