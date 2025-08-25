import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import User, { IUser } from '../models/User'
import { generateToken } from '../middleware/authMiddleware'
import { asyncHandler } from '../middleware/errorMiddleware'

// 注册用户
export const register = asyncHandler(async (req: Request, res: Response) => {
  // 检查验证错误
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: '验证失败',
        details: errors.array()
      }
    })
  }

  const { username, email, password } = req.body

  // 检查用户是否已存在
  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  })

  if (existingUser) {
    return res.status(400).json({
      success: false,
      error: { message: '用户名或邮箱已存在' }
    })
  }

  // 创建新用户
  const user = await User.create({
    username,
    email,
    password
  })

  // 生成 JWT 令牌
  const token = generateToken(user._id.toString())

  // 返回用户信息（不包含密码）
  const userResponse = {
    _id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    bio: user.bio,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
    stats: user.stats,
    createdAt: user.createdAt
  }

  res.status(201).json({
    success: true,
    data: {
      user: userResponse,
      token
    },
    message: '注册成功'
  })
})

// 用户登录
export const login = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: '验证失败',
        details: errors.array()
      }
    })
  }

  const { email, password } = req.body

  // 查找用户（包含密码字段）
  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      success: false,
      error: { message: '邮箱或密码错误' }
    })
  }

  // 更新最后登录时间
  user.lastActive = new Date()
  await user.save()

  // 生成 JWT 令牌
  const token = generateToken(user._id.toString())

  // 返回用户信息（不包含密码）
  const userResponse = {
    _id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    bio: user.bio,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
    stats: user.stats,
    lastActive: user.lastActive,
    createdAt: user.createdAt
  }

  res.status(200).json({
    success: true,
    data: {
      user: userResponse,
      token
    },
    message: '登录成功'
  })
})

// 用户登出
export const logout = asyncHandler(async (req: Request, res: Response) => {
  // JWT 是无状态的，登出主要在客户端删除 token
  // 服务端可以维护一个黑名单，但在这个简单实现中我们省略
  
  res.status(200).json({
    success: true,
    message: '登出成功'
  })
})

// 获取当前用户信息
export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user as IUser

  res.status(200).json({
    success: true,
    data: {
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        favoriteGenres: user.favoriteGenres,
        stats: user.stats,
        preferences: user.preferences,
        followersCount: user.followers.length,
        followingCount: user.following.length,
        lastActive: user.lastActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    }
  })
})

// 更新用户资料
export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: '验证失败',
        details: errors.array()
      }
    })
  }

  const user = req.user as IUser
  const { username, bio, avatar, favoriteGenres, preferences } = req.body

  // 如果更新用户名，检查是否已存在
  if (username && username !== user.username) {
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: { message: '用户名已存在' }
      })
    }
    user.username = username
  }

  // 更新其他字段
  if (bio !== undefined) user.bio = bio
  if (avatar !== undefined) user.avatar = avatar
  if (favoriteGenres) user.favoriteGenres = favoriteGenres
  if (preferences) {
    user.preferences = { ...user.preferences, ...preferences }
  }

  await user.save()

  res.status(200).json({
    success: true,
    data: {
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        favoriteGenres: user.favoriteGenres,
        preferences: user.preferences,
        updatedAt: user.updatedAt
      }
    },
    message: '资料更新成功'
  })
})

// 修改密码
export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: '验证失败',
        details: errors.array()
      }
    })
  }

  const user = await User.findById(req.user!._id).select('+password')
  const { currentPassword, newPassword } = req.body

  // 验证当前密码
  if (!(await user!.comparePassword(currentPassword))) {
    return res.status(401).json({
      success: false,
      error: { message: '当前密码错误' }
    })
  }

  // 更新密码
  user!.password = newPassword
  await user!.save()

  res.status(200).json({
    success: true,
    message: '密码修改成功'
  })
})

// 忘记密码（发送重置邮件）
export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(404).json({
      success: false,
      error: { message: '用户不存在' }
    })
  }

  // TODO: 实现发送重置密码邮件
  // 这里应该生成重置令牌并发送邮件
  
  res.status(200).json({
    success: true,
    message: '重置密码邮件已发送'
  })
})

// 重置密码
export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  // TODO: 实现重置密码逻辑
  // 验证重置令牌并更新密码
  
  res.status(200).json({
    success: true,
    message: '密码重置成功'
  })
})

// 验证邮箱
export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  // TODO: 实现邮箱验证逻辑
  
  res.status(200).json({
    success: true,
    message: '邮箱验证成功'
  })
})

// 重新发送验证邮件
export const resendVerification = asyncHandler(async (req: Request, res: Response) => {
  // TODO: 实现重新发送验证邮件
  
  res.status(200).json({
    success: true,
    message: '验证邮件已重新发送'
  })
})