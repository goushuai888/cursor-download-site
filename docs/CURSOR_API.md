# 🔌 Cursor 官方 API 接口说明

## 📋 目录
1. [官方下载端点](#官方下载端点)
2. [版本列表 API](#版本列表-api)
3. [当前解决方案](#当前解决方案)
4. [可能的替代方案](#可能的替代方案)

---

## 1️⃣ 官方下载端点

### ✅ 官方构建下载
```
基础 URL: https://downloader.cursor.sh/builds/{buildId}/{platform}

平台路径格式：
- Windows x64:    windows/nsis/x64
- Windows ARM64:  windows/nsis/arm64
- macOS Universal: mac/installer/universal
- macOS ARM64:    mac/installer/arm64
- macOS x64:      mac/installer/x64
- Linux x64:      linux/appImage/x64
- Linux ARM64:    linux/appImage/arm64

示例：
https://downloader.cursor.sh/builds/250113dmwmzukkbk/windows/nsis/x64
```

### ✅ AWS CDN 下载
```
生产版本: https://downloads.cursor.com/production/{buildId}/{platform}/{arch}/...
每夜版本: https://downloads.cursor.com/nightly/{buildId}/{platform}/{arch}/...

示例：
https://downloads.cursor.com/production/250113dmwmzukkbk/darwin/arm64/Cursor-darwin-arm64.dmg
https://downloads.cursor.com/production/250113dmwmzukkbk/win32/x64/user-setup/CursorUserSetup-x64-0.45.5.exe
```

### ✅ ToDesktop 镜像
```
基础 URL: https://download.todesktop.com/230313mzl4w4u92/{fileName}

文件名格式：
- Windows:   Cursor Setup {version} - Build {buildId}-x64.exe
- macOS:     Cursor {version} - Build {buildId}-arm64.dmg
- Linux:     cursor-{version}-build-{buildId}-x86_64.AppImage

示例：
https://download.todesktop.com/230313mzl4w4u92/Cursor%20Setup%200.45.5%20-%20Build%20250113dmwmzukkbk-x64.exe
```

---

## 2️⃣ 版本列表 API

### ❌ 官方没有公开的版本列表 API

经过测试，以下端点**均不存在或无法访问**：
- ❌ `https://downloader.cursor.sh/api/versions`
- ❌ `https://downloads.cursor.com/api/versions`
- ❌ `https://api.cursor.sh/versions`
- ❌ `https://www.cursor.com/releases`
- ❌ `https://www.cursor.com/api/versions`

### 🤔 为什么没有官方版本列表 API？

可能的原因：
1. **安全性考虑**：避免暴露内部构建信息
2. **灵活性**：官方保留更改下载机制的自由
3. **商业策略**：控制下载渠道和分发
4. **简化维护**：减少需要维护的公共 API

### 📊 官方提供的 API（非下载相关）

根据官方文档，Cursor 提供以下 API：
- [Background Agents API](https://docs.cursor.com/zh/background-agent/api/overview) - 后台代理管理
- [Admin API](https://docs.cursor.com/zh/account/teams/admin-api) - 团队管理

---

## 3️⃣ 当前解决方案

### 🎯 我们使用的第三方 API

```typescript
// 配置文件: lib/config.ts
externalApis: {
  latest: 'https://versions.ccursor.org/api/version/list.php',
  old: 'https://versions.ccursor.org/api/version/old_versions.json',
}
```

### ✅ 优点
- ✅ 稳定可靠
- ✅ 包含历史版本
- ✅ 更新及时
- ✅ HTTPS 安全连接

### ⚠️ 潜在风险
- ⚠️ 依赖第三方服务
- ⚠️ 可能的服务中断
- ⚠️ API 格式可能变更

### 🛡️ 我们的缓解策略

1. **本地缓存备份**
   ```typescript
   // 自动保存到 data/versions.json
   await writeFile(filePath, JSON.stringify(allVersions, null, 2), 'utf-8');
   ```

2. **多级容错**
   ```typescript
   // 1. 优先从外部 API 同步
   // 2. 失败则使用内存缓存
   // 3. 再失败则读取本地文件
   ```

3. **自动同步**
   ```typescript
   // 每小时自动同步
   interval: 60 * 60 * 1000
   ```

---

## 4️⃣ 可能的替代方案

### 方案 A：自己爬取 Cursor 官网
```typescript
// 优点：不依赖第三方
// 缺点：复杂、不稳定、可能违反 ToS

async function scrapeFromCursorWebsite() {
  // ❌ 不推荐：网站结构可能随时变化
  const response = await fetch('https://www.cursor.com/changelog');
  // 解析 HTML...
}
```

### 方案 B：监控 GitHub Releases（如果有）
```typescript
// 优点：官方数据源、稳定
// 缺点：Cursor 没有公开 GitHub Release

// ❌ 不可用：Cursor 不开源
```

### 方案 C：自建爬虫定期更新
```typescript
// 优点：完全自主控制
// 缺点：需要额外服务器、维护成本高

async function cronJobScraper() {
  // 定期运行爬虫
  // 存储到自己的数据库
  // 通过自己的 API 提供
}
```

### 方案 D：继续使用当前第三方 API（✅ 推荐）
```typescript
// ✅ 最佳选择：
// - 已经很稳定
// - 有本地缓存作为备份
// - 自动同步机制完善
// - HTTPS 安全连接
```

---

## 🎯 推荐做法

### ✅ 当前方案就是最佳实践

你的网站已经实现了：
1. ✅ 使用第三方稳定 API
2. ✅ 本地文件缓存备份
3. ✅ 自动定期同步
4. ✅ 多级容错机制
5. ✅ HTTPS 安全连接

### 🔧 可选增强

如果想进一步提高可靠性：

```typescript
// 1. 添加多个备用 API 源
const backupApis = [
  'https://versions.ccursor.org/api/version/list.php',
  'https://backup-api-1.example.com/versions',
  'https://backup-api-2.example.com/versions',
];

// 2. 添加健康检查
async function checkApiHealth() {
  try {
    const response = await fetch(config.autoSync.externalApis.latest);
    return response.ok;
  } catch {
    return false;
  }
}

// 3. 添加降级策略
async function fetchWithFallback() {
  for (const api of backupApis) {
    try {
      return await fetch(api);
    } catch {
      continue;
    }
  }
  // 最后使用本地缓存
  return loadVersionsFromFile();
}
```

---

## 📚 参考资料

- [Cursor 官网](https://www.cursor.com)
- [Cursor 更新日志](https://www.cursor.com/changelog)
- [Cursor 官方文档](https://docs.cursor.com)
- [当前使用的 API 源](https://versions.ccursor.org)

---

## 🔄 最后更新

- 日期：2025-11-07
- 状态：✅ 稳定运行
- API 可用性：✅ 正常
- 本地缓存：✅ 有效

---

## ⚡ 快速参考

### 如何获取最新版本信息？
```bash
# 通过你的 API
curl https://cursor.langne.com/api/versions | jq '.[0]'

# 直接访问第三方 API
curl https://versions.ccursor.org/api/version/list.php | jq '.[0]'
```

### 如何触发手动同步？
```bash
curl https://cursor.langne.com/api/versions/sync
```

### 如何检查本地缓存？
```bash
cat data/versions.json | jq '.[0]'
```

