# 快速开始指南 / Quick Start Guide

## 中文

### 安装步骤

1. **安装依赖**
```bash
npm install
```

2. **启动开发服务器**
```bash
npm run dev
```

3. **打开浏览器**
访问 http://localhost:3000

### 主要功能

- ✅ 版本选择和搜索
- ✅ 多平台下载支持（Windows、macOS、Linux）
- ✅ 多架构支持（x64、ARM64、Universal）
- ✅ 多下载渠道（官方、Todesk、AWS）
- ✅ 7种语言支持
- ✅ 响应式设计

### 自定义配置

#### 添加新版本

编辑 `lib/versions.ts` 文件：

```typescript
export const versions: Version[] = [
  {
    version: '0.44.0',
    code: '0.44.0',
    date: '2025-02-01',
    downloadChannel: ['official', 'todesktop', 'aws'],
  },
  // ... 更多版本
];
```

#### 修改样式

- 编辑 `tailwind.config.ts` 修改主题颜色
- 编辑 `app/globals.css` 修改全局样式

### 生产构建

```bash
npm run build
npm start
```

---

## English

### Installation Steps

1. **Install dependencies**
```bash
npm install
```

2. **Start development server**
```bash
npm run dev
```

3. **Open browser**
Visit http://localhost:3000

### Main Features

- ✅ Version selection and search
- ✅ Multi-platform download support (Windows, macOS, Linux)
- ✅ Multi-architecture support (x64, ARM64, Universal)
- ✅ Multiple download channels (Official, Todesk, AWS)
- ✅ 7 language support
- ✅ Responsive design

### Customization

#### Add New Version

Edit `lib/versions.ts`:

```typescript
export const versions: Version[] = [
  {
    version: '0.44.0',
    code: '0.44.0',
    date: '2025-02-01',
    downloadChannel: ['official', 'todesktop', 'aws'],
  },
  // ... more versions
];
```

#### Modify Styles

- Edit `tailwind.config.ts` to change theme colors
- Edit `app/globals.css` to change global styles

### Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
cursor/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── VersionSelector.tsx
│   ├── DownloadSection.tsx
│   └── LanguageSelector.tsx
├── lib/                   # Utility functions
│   ├── i18n.ts           # Internationalization
│   └── versions.ts       # Version data
├── types/                 # TypeScript types
└── ...
```

## Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Support

For issues and questions, please check the README.md file.

