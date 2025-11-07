# 🔒 网站安全诊断清单

## 当前状态
- 网站：https://cursor.langne.com/
- 部署平台：Vercel
- 最后更新：已添加安全配置

## ✅ 已确认安全的配置

### 1. 源代码检查
- ✅ 无 HTTP 链接
- ✅ 所有外部资源使用 HTTPS
- ✅ 所有下载链接使用 HTTPS

### 2. Vercel 安全头
```json
{
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "Content-Security-Policy": "upgrade-insecure-requests",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin"
}
```

## 🔍 浏览器诊断步骤

### 步骤 1：清除浏览器缓存
```bash
Chrome：Cmd + Shift + Delete（Mac）/ Ctrl + Shift + Delete（Windows）
- 选择时间范围：全部时间
- 勾选：Cookie 和网站数据、缓存的图片和文件
- 点击清除数据
```

### 步骤 2：检查控制台错误
1. 按 F12 打开开发者工具
2. 切换到 **Console（控制台）** 标签
3. 刷新页面
4. 查找以下关键词的错误：
   - `Mixed Content`
   - `blocked:mixed-content`
   - `insecure`
   - `http://`

### 步骤 3：检查网络请求
1. 在开发者工具中切换到 **Network（网络）** 标签
2. 刷新页面
3. 查看所有请求是否都是 HTTPS
4. 特别检查：
   - 是否有 HTTP 请求？
   - API 请求 `/api/versions` 是否成功？
   - 外部资源是否全部 HTTPS？

### 步骤 4：检查安全信息
1. 点击地址栏左侧的锁形图标
2. 查看：
   - 证书有效性
   - 连接安全性
   - 混合内容状态

## 🛠️ 可能的原因和解决方案

### 原因 1：浏览器缓存了旧版本
**解决方案：** 完全清除缓存，使用无痕模式测试

### 原因 2：HSTS 设置尚未生效
**解决方案：** 等待 DNS 传播（通常 24-48 小时）

### 原因 3：混合内容警告
**解决方案：** 已添加 `upgrade-insecure-requests` CSP 策略

### 原因 4：外部 API 证书问题
**测试命令：**
```bash
# 测试外部 API
curl -I https://versions.ccursor.org/api/version/list.php
curl -I https://versions.ccursor.org/api/version/old_versions.json
```

## 📸 需要的诊断信息

请提供以下信息以便进一步诊断：

1. **浏览器控制台截图**
   - Console 标签的错误信息
   - Network 标签的请求列表

2. **地址栏安全信息截图**
   - 点击锁形图标后的详细信息

3. **具体错误信息**
   - 浏览器显示的完整错误文本

4. **浏览器信息**
   - 浏览器名称和版本
   - 操作系统

## 🧪 快速测试

### 测试 1：无痕模式
```
Cmd + Shift + N（Mac）/ Ctrl + Shift + N（Windows）
访问：https://cursor.langne.com/
```

### 测试 2：在线 SSL 检测
访问：https://www.ssllabs.com/ssltest/analyze.html?d=cursor.langne.com

### 测试 3：检查响应头
```bash
curl -I https://cursor.langne.com/
```

## 📝 测试结果记录

### 控制台错误：
```
[在此粘贴控制台错误]
```

### Network 请求：
```
[在此记录是否有 HTTP 请求]
```

### 证书信息：
```
[在此记录证书状态]
```

### 无痕模式测试结果：
```
[在此记录无痕模式下是否正常]
```

## 🎯 下一步行动

根据诊断结果，可能需要：

1. ✅ 等待 Vercel 重新部署
2. ✅ 清除浏览器 HSTS 缓存
3. ✅ 检查域名 DNS 设置
4. ✅ 验证 SSL 证书有效性
5. ✅ 测试不同浏览器

