#!/bin/bash

# Cursor 下载站 - GitHub 部署脚本

echo "🚀 Cursor 下载站 - GitHub 部署向导"
echo "=================================="
echo ""

# 检查是否已经设置了远程仓库
if git remote get-url origin &> /dev/null; then
    echo "✅ 远程仓库已配置"
    git remote -v
    echo ""
    read -p "是否要推送到远程仓库? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git push -u origin main
    fi
else
    echo "⚠️  尚未配置远程仓库"
    echo ""
    echo "请先在 GitHub 上创建一个新仓库，然后输入仓库地址："
    echo "（例如：https://github.com/你的用户名/cursor-download-site.git）"
    echo ""
    read -p "GitHub 仓库地址: " repo_url
    
    if [ -z "$repo_url" ]; then
        echo "❌ 未输入仓库地址，退出"
        exit 1
    fi
    
    echo ""
    echo "正在添加远程仓库..."
    git remote add origin "$repo_url"
    
    echo "正在推送代码..."
    git push -u origin main
    
    echo ""
    echo "✅ 推送完成！"
fi

echo ""
echo "=================================="
echo "📋 下一步："
echo "1. 访问 https://vercel.com"
echo "2. 使用 GitHub 登录"
echo "3. 导入你的仓库"
echo "4. 点击 Deploy"
echo ""
echo "🎉 部署完成后，访问 /api/versions/sync 进行首次数据同步"

