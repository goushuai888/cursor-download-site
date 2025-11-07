# Umami 部署指南

## ⚠️ 重要提示

**EdgeOne Pages 只能部署你的网站（cursor-download-site），不能部署 Umami！**

Umami 需要部署到 Vercel/Railway 等支持服务端应用的平台。

---

## 🎯 部署架构

```
EdgeOne Pages (免费)
└─ cursor-download-site (你的下载站)
   └─ 调用统计服务 ↓

Vercel (免费)
└─ Umami 统计服务
   └─ 连接数据库 ↓

Supabase (免费)
└─ PostgreSQL 数据库
```

---

## 🚀 快速部署（10分钟）

### 步骤 1：创建 Supabase 数据库（3分钟）

1. **访问 Supabase**
   ```
   https://supabase.com/dashboard
   ```

2. **注册/登录**（使用 GitHub 账号）

3. **创建新项目**
   ```
   New Project
   名称：umami-db
   密码：设置一个强密码（记住它！）
   地区：Singapore (ap-southeast-1)
   ```

4. **等待创建完成**（约2分钟）

5. **获取数据库连接字符串**
   ```
   Project Settings → Database → Connection String
   选择：URI
   
   复制类似这样的字符串：
   postgresql://postgres.xxx:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
   
   ⚠️ 将 [YOUR-PASSWORD] 替换为你设置的密码
   ```

---

### 步骤 2：部署 Umami 到 Vercel（5分钟）

#### 方法一：一键部署（推荐）⭐

1. **访问 Umami 文档**
   ```
   https://umami.is/docs/install
   ```

2. **点击 "Deploy to Vercel" 按钮**
   
   或直接访问：
   ```
   https://vercel.com/new/clone?repository-url=https://github.com/umami-software/umami&project-name=umami&repository-name=umami
   ```

3. **连接 GitHub**（如果需要）

4. **配置环境变量**
   ```env
   DATABASE_URL=postgresql://postgres.xxx:password@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
   DATABASE_TYPE=postgresql
   APP_SECRET=生成一个随机字符串（见下方）
   ```

   **生成 APP_SECRET：**
   - 访问：https://www.uuidgenerator.net/
   - 或命令行：`openssl rand -base64 32`
   - 或使用：`8dc38a600d03d54a0db67f6e5ecaca8a8dc38a600d03d54a0db67f6e5ecaca8a`

5. **点击 Deploy**

6. **等待部署完成**（约3分钟）

7. **访问你的 Umami**
   ```
   https://your-project.vercel.app
   
   默认登录：
   用户名：admin
   密码：umami
   
   ⚠️ 登录后立即修改密码！
   ```

---

### 步骤 3：在 Umami 中添加网站（1分钟）

1. **登录 Umami**
   ```
   https://your-project.vercel.app
   ```

2. **点击 Settings → Websites → Add Website**

3. **填写信息**
   ```
   Name: Cursor Download
   Domain: cursor.langne.com
   ```

4. **保存后获取 Website ID**
   ```
   会显示类似：abc123def-456-789-ghi
   复制这个 ID
   ```

5. **获取脚本地址**
   ```
   点击网站 → Edit → Tracking code
   
   会显示：
   <script async defer 
     data-website-id="abc123def-456-789-ghi" 
     src="https://your-project.vercel.app/script.js">
   </script>
   
   记录：
   Website ID: abc123def-456-789-ghi
   Script URL: https://your-project.vercel.app/script.js
   ```

---

### 步骤 4：在 EdgeOne Pages 配置环境变量（1分钟）

1. **进入 EdgeOne Pages 控制台**
   ```
   https://console.cloud.tencent.com/edgeone/pages
   ```

2. **选择你的 cursor-download-site 项目**

3. **进入设置 → 环境变量**

4. **添加环境变量**
   ```
   名称：NEXT_PUBLIC_UMAMI_WEBSITE_ID
   值：abc123def-456-789-ghi（你的 Website ID）
   
   名称：NEXT_PUBLIC_UMAMI_SRC
   值：https://your-project.vercel.app/script.js
   ```

5. **保存并重新部署**

---

## ✅ 验证部署

### 1. 检查网站是否正常
```
访问：https://cursor.langne.com
应该正常显示
```

### 2. 检查统计代码是否加载
```
F12 → Network → 搜索 "script.js"
应该能看到请求：
https://your-project.vercel.app/script.js (状态码: 200)
```

### 3. 查看 Umami 统计数据
```
登录：https://your-project.vercel.app
等待 5-10 分钟
应该能看到访客数据
```

---

## 🔧 故障排查

### 问题 1：EdgeOne Pages 构建失败

**错误：** `DATABASE_URL is not defined`

**原因：** 部署了错误的仓库（umami 而不是 cursor-download-site）

**解决：**
```
1. 删除当前项目
2. 重新创建项目
3. 选择仓库：goushuai888/cursor-download-site
4. 确认不是 umami 仓库
```

---

### 问题 2：Umami 部署失败

**错误：** `Can't reach database server`

**原因：** 数据库连接字符串错误

**解决：**
```
1. 检查 Supabase 数据库是否创建成功
2. 确认密码是否正确替换了 [YOUR-PASSWORD]
3. 确认连接字符串格式正确
```

---

### 问题 3：看不到统计数据

**原因：** 环境变量未配置或配置错误

**解决：**
```
1. 检查 EdgeOne Pages 环境变量是否正确配置
2. 确认变量名以 NEXT_PUBLIC_ 开头
3. 重新部署 EdgeOne Pages
4. 清除浏览器缓存
5. 等待 5-10 分钟
```

---

## 📊 免费额度说明

### Supabase 免费版
```
✅ 500MB 数据库
✅ 无限 API 请求
✅ 50,000 月活用户
✅ 完全够用
```

### Vercel 免费版
```
✅ 100GB 带宽/月
✅ 无限部署
✅ 自动 HTTPS
✅ 全球 CDN
```

### EdgeOne Pages 免费版
```
✅ 静态网站托管
✅ 全球加速
✅ 自动部署
```

---

## 🎯 总结

**正确的部署方式：**

1. ✅ EdgeOne Pages 部署：`cursor-download-site`（你的网站）
2. ✅ Vercel 部署：`umami`（统计服务）
3. ✅ Supabase：PostgreSQL（数据库）

**错误的部署方式：**

1. ❌ EdgeOne Pages 部署：`umami`（不支持！）
2. ❌ 没有数据库就部署 Umami
3. ❌ 使用错误的仓库

---

## 💡 需要帮助？

如果遇到问题，检查：

1. EdgeOne Pages 是否部署了正确的仓库（cursor-download-site）
2. Vercel 是否成功部署了 Umami
3. Supabase 数据库是否正常运行
4. 环境变量是否正确配置

所有服务都应该在免费额度内正常运行！

