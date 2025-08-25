import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { connectDB } from './config/database'
import { errorHandler, notFound } from './middleware/errorMiddleware'
import authRoutes from './routes/authRoutes'
import mangaRoutes from './routes/mangaRoutes'
import userRoutes from './routes/userRoutes'
import reviewRoutes from './routes/reviewRoutes'
import postRoutes from './routes/postRoutes'

// 加载环境变量
dotenv.config()

// 创建 Express 应用
const app = express()
const PORT = process.env.PORT || 3001

// 连接数据库
connectDB()

// 限流中间件
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100, // 限制每个IP在窗口期内最多100个请求
  message: {
    error: '请求过于频繁，请稍后再试'
  }
})

// Swagger 配置
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MangaHub API',
      version: '1.0.0',
      description: '漫画社区平台 API 文档',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: '开发服务器',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // API 文档路径
}

const specs = swaggerJsdoc(swaggerOptions)

// 中间件
app.use(helmet()) // 安全头
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(morgan('combined')) // 日志
app.use(express.json({ limit: '10mb' })) // JSON 解析
app.use(express.urlencoded({ extended: true })) // URL 编码解析
app.use(limiter) // 应用限流

// API 文档
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

// 健康检查
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'MangaHub API 服务运行正常',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  })
})

// API 路由
app.use('/api/auth', authRoutes)
app.use('/api/manga', mangaRoutes)
app.use('/api/users', userRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/posts', postRoutes)

// 404 处理
app.use(notFound)

// 错误处理
app.use(errorHandler)

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 MangaHub API 服务器运行在端口 ${PORT}`)
  console.log(`📖 API 文档: http://localhost:${PORT}/api-docs`)
  console.log(`🔍 健康检查: http://localhost:${PORT}/health`)
  console.log(`🌍 环境: ${process.env.NODE_ENV || 'development'}`)
})

export default app