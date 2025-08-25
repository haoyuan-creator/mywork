import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/User'
import { asyncHandler } from './errorMiddleware'

// 扩展 Request 类型以包含用户信息
declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}

export interface JWTPayload {
  id: string
  iat: number
  exp: number
}

// 验证 JWT 令牌
export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined

  // 从 Authorization header 获取 token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: { message: '无访问权限，请提供有效令牌' }
    })
  }

  try {
    // 验证 token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
    
    // 获取用户信息
    const user = await User.findById(decoded.id).select('-password')
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: { message: '令牌无效，用户不存在' }
      })
    }

    // 更新用户最后活跃时间
    user.lastActive = new Date()
    await user.save()

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: { message: '令牌无效' }
    })
  }
})

// 可选的身份验证（不强制要求登录）
export const optionalAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
      const user = await User.findById(decoded.id).select('-password')
      
      if (user) {
        user.lastActive = new Date()
        await user.save()
        req.user = user
      }
    } catch (error) {
      // 静默处理错误，不阻止请求继续
    }
  }

  next()
})

// 权限验证
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: { message: '请先登录' }
      })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: { message: `用户角色 ${req.user.role} 无权限访问此资源` }
      })
    }

    next()
  }
}

// 验证用户是否为资源所有者或管理员
export const ownerOrAdmin = (userField: string = 'user') => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: { message: '请先登录' }
      })
    }

    // 管理员或版主拥有所有权限
    if (['admin', 'moderator'].includes(req.user.role)) {
      return next()
    }

    // 检查是否为资源所有者
    const resourceUserId = req.body[userField] || req.params.userId
    if (req.user._id.toString() === resourceUserId) {
      return next()
    }

    return res.status(403).json({
      success: false,
      error: { message: '无权限访问此资源' }
    })
  }
}

// 生成 JWT 令牌
export const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  })
}