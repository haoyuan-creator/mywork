import { Request, Response, NextFunction } from 'express'

export interface CustomError extends Error {
  statusCode?: number
  code?: number
  path?: string
  value?: any
  errors?: any
}

// 404 错误处理
export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`未找到 - ${req.originalUrl}`) as CustomError
  error.statusCode = 404
  next(error)
}

// 全局错误处理
export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = error.statusCode || 500
  let message = error.message || '服务器内部错误'

  // Mongoose 验证错误
  if (error.name === 'ValidationError') {
    statusCode = 400
    const errors = Object.values(error.errors || {}).map((err: any) => err.message)
    message = `验证错误: ${errors.join(', ')}`
  }

  // Mongoose 重复键错误
  if (error.code === 11000) {
    statusCode = 400
    const field = Object.keys(error.path || {})[0]
    message = `${field} 已存在`
  }

  // Mongoose CastError
  if (error.name === 'CastError') {
    statusCode = 400
    message = `无效的 ${error.path}: ${error.value}`
  }

  // JWT 错误
  if (error.name === 'JsonWebTokenError') {
    statusCode = 401
    message = '无效的令牌'
  }

  if (error.name === 'TokenExpiredError') {
    statusCode = 401
    message = '令牌已过期'
  }

  // 开发环境显示详细错误信息
  const isDevelopment = process.env.NODE_ENV === 'development'

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(isDevelopment && { stack: error.stack }),
      ...(isDevelopment && { details: error })
    }
  })
}

// 异步错误处理包装器
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}