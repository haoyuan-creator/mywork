#!/bin/bash

# MangaHub 开发环境启动脚本

echo "🚀 启动 MangaHub 开发环境..."

# 检查 Node.js 版本
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 16+ 版本"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt "16" ]; then
    echo "❌ Node.js 版本过低，请升级到 16+ 版本"
    exit 1
fi

# 检查 MongoDB 是否运行
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️ MongoDB 未运行，正在尝试启动..."
    if command -v mongod &> /dev/null; then
        mongod --dbpath ./data/db --fork --logpath ./logs/mongodb.log
        echo "✅ MongoDB 已启动"
    else
        echo "❌ MongoDB 未安装，请先安装 MongoDB"
        echo "📖 安装指南: https://docs.mongodb.com/manual/installation/"
        exit 1
    fi
fi

# 创建必要的目录
mkdir -p data/db logs uploads

# 检查环境变量文件
if [ ! -f "server/.env" ]; then
    echo "📝 创建环境变量文件..."
    cp server/.env.example server/.env
    echo "⚠️ 请在 server/.env 文件中配置您的环境变量"
fi

# 安装依赖
echo "📦 安装根目录依赖..."
npm install

echo "📦 安装服务端依赖..."
cd server && npm install && cd ..

echo "📦 安装客户端依赖..."
cd client && npm install && cd ..

# 启动开发服务器
echo "🔥 启动开发服务器..."
npm run dev