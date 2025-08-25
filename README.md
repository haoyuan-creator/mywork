# MangaHub 漫画社区

一个现代化的漫画社区平台，让漫画爱好者可以分享、讨论和发现精彩的漫画作品。

![MangaHub Logo](https://via.placeholder.com/800x200?text=MangaHub+-+%E6%BC%AB%E7%94%BB%E7%A4%BE%E5%8C%BA)

## ✨ 功能特性

### 🏠 核心功能
- 📚 **漫画浏览**: 高级搜索、筛选和排序功能
- 💬 **社区讨论**: 多分类话题讨论和互动
- ⭐ **评分系统**: 用户评价和推荐系统
- 👥 **社交功能**: 用户关注、粉丝和好友系统
- 📱 **响应式设计**: 完美适配桌面端和移动端
- 🔐 **安全认证**: JWT 认证和权限管理

### 🎨 用户体验
- 现代化的 UI 设计，基于 Tailwind CSS
- 流畅的页面切换和加载动画
- 智能推荐算法
- 个性化用户界面
- 无障碍访问支持

### 🛠️ 技术亮点
- TypeScript 全栈开发
- React 18 + Hook 架构
- RESTful API 设计
- MongoDB 数据持久化
- Swagger 自动化 API 文档

## 🚀 技术栈

### 前端技术
| 技术 | 版本 | 描述 |
|------|------|------|
| React | 18.2+ | 现代化的用户界面库 |
| TypeScript | 5.2+ | 类型安全的 JavaScript |
| Tailwind CSS | 3.3+ | 原子化 CSS 框架 |
| Vite | 4.5+ | 快速的构建工具 |
| React Router | 6.20+ | 客户端路由管理 |
| TanStack Query | 5.8+ | 数据获取和缓存 |
| Axios | 1.6+ | HTTP 请求库 |
| Lucide React | 0.294+ | 现代化图标库 |

### 后端技术
| 技术 | 版本 | 描述 |
|------|------|------|
| Node.js | 18+ | JavaScript 运行时 |
| Express | 4.18+ | Web 应用框架 |
| TypeScript | 5.3+ | 类型安全的开发 |
| MongoDB | 6.0+ | NoSQL 数据库 |
| Mongoose | 8.0+ | MongoDB ODM |
| JWT | 9.0+ | 身份认证 |
| Bcryptjs | 2.4+ | 密码加密 |
| Swagger | 最新 | API 文档生成 |

## 🎯 快速开始

### 📋 环境要求

- **Node.js**: 16.0+ (推荐 18.0+)
- **MongoDB**: 5.0+ (或使用 MongoDB Atlas)
- **npm**: 8.0+ (或 yarn 1.22+)

### 🔧 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/your-username/mangahub.git
cd mangahub
```

2. **快速启动（推荐）**
```bash
# 使用提供的启动脚本
./scripts/dev.sh
```

3. **手动安装**
```bash
# 安装根目录依赖
npm install

# 安装后端依赖
cd server && npm install && cd ..

# 安装前端依赖
cd client && npm install && cd ..

# 配置环境变量
cp server/.env.example server/.env
# 编辑 server/.env 文件，设置必要的环境变量

# 启动开发环境
npm run dev
```

### 🌐 访问应用

启动成功后，您可以访问：

- **前端应用**: http://localhost:5173
- **后端 API**: http://localhost:3001
- **API 文档**: http://localhost:3001/api-docs
- **健康检查**: http://localhost:3001/health

## 📁 项目结构

```
mangahub/
├── 📁 client/                 # React 前端应用
│   ├── 📁 public/            # 静态资源
│   ├── 📁 src/               # 源代码
│   │   ├── 📁 components/    # React 组件
│   │   ├── 📁 pages/         # 页面组件
│   │   ├── 📁 hooks/         # 自定义 Hook
│   │   ├── 📁 services/      # API 服务
│   │   ├── 📁 types/         # TypeScript 类型
│   │   └── 📁 utils/         # 工具函数
│   ├── 📄 package.json       # 前端依赖配置
│   └── 📄 vite.config.ts     # Vite 配置
├── 📁 server/                # Node.js 后端 API
│   ├── 📁 src/               # 源代码
│   │   ├── 📁 controllers/   # 控制器
│   │   ├── 📁 models/        # 数据模型
│   │   ├── 📁 routes/        # 路由定义
│   │   ├── 📁 middleware/    # 中间件
│   │   ├── 📁 config/        # 配置文件
│   │   └── 📁 utils/         # 工具函数
│   ├── 📄 package.json       # 后端依赖配置
│   └── 📄 tsconfig.json      # TypeScript 配置
├── 📁 shared/                # 共享代码
│   └── 📄 types.ts           # 共享类型定义
├── 📁 docs/                  # 项目文档
│   ├── 📄 API.md             # API 文档
│   └── 📄 FEATURES.md        # 功能特性说明
├── 📁 scripts/               # 脚本文件
│   └── 📄 dev.sh             # 开发环境启动脚本
├── 📄 package.json           # 根目录配置
├── 📄 README.md              # 项目说明
└── 📄 .gitignore             # Git 忽略规则
```

## ⚙️ 开发指南

### 🔑 环境变量配置

在 `server/.env` 文件中配置以下环境变量：

```env
# 服务器配置
NODE_ENV=development
PORT=3001

# 数据库配置
MONGODB_URI=mongodb://localhost:27017/mangahub

# JWT 配置
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# 客户端 URL（CORS 配置）
CLIENT_URL=http://localhost:5173
```

### 📚 开发命令

```bash
# 启动完整开发环境
npm run dev

# 仅启动后端服务
npm run server:dev

# 仅启动前端服务
npm run client:dev

# 构建前端应用
npm run build

# 启动生产环境
npm run start

# 安装所有依赖
npm run install:all
```

### 🧪 测试

```bash
# 运行测试（待实现）
npm test

# 代码检查
npm run lint
```

## 📖 文档

- [功能特性详细说明](./docs/FEATURES.md)
- [API 接口文档](./docs/API.md)
- [在线 API 文档](http://localhost:3001/api-docs) (启动服务后访问)

## 🤝 贡献指南

我们热烈欢迎社区贡献！请按照以下步骤参与项目：

1. **Fork** 本仓库
2. 创建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 **Pull Request**

### 代码规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 和 Prettier 规则
- 编写清晰的注释和文档
- 确保所有测试通过

## 🐛 问题反馈

如果您发现 bug 或有功能建议，请：

1. 检查 [Issues](https://github.com/your-username/mangahub/issues) 是否已有相关问题
2. 如果没有，请创建新的 Issue
3. 提供详细的问题描述和复现步骤

## 📋 待办事项

- [ ] 完善用户认证系统
- [ ] 实现文件上传功能
- [ ] 添加单元测试
- [ ] 优化移动端体验
- [ ] 添加深色模式
- [ ] 实现国际化支持
- [ ] 性能优化
- [ ] SEO 优化

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👨‍💻 作者

**MangaHub Team**

- 如有问题，请联系：[your-email@example.com](mailto:your-email@example.com)
- 项目链接：[https://github.com/your-username/mangahub](https://github.com/your-username/mangahub)

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和社区成员！

---

⭐ 如果这个项目对您有帮助，请给我们一个 Star！