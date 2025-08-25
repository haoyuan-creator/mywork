import express from 'express'
import { protect, authorize } from '../middleware/authMiddleware'

const router = express.Router()

// 获取用户列表（管理员）
router.get('/', protect, authorize('admin'), getUserList)

// 获取用户详情
router.get('/:id', getUserById)

// 关注用户
router.post('/:id/follow', protect, followUser)

// 取消关注
router.delete('/:id/follow', protect, unfollowUser)

// 获取用户的关注列表
router.get('/:id/following', getFollowing)

// 获取用户的粉丝列表
router.get('/:id/followers', getFollowers)

// 获取用户的收藏列表
router.get('/:id/favorites', getFavorites)

// 获取用户的阅读历史
router.get('/:id/reading-history', protect, getReadingHistory)

// 临时控制器函数（占位符）
const getUserList = (req: any, res: any) => {
  res.json({ success: true, message: 'Get user list - TODO' })
}

const getUserById = (req: any, res: any) => {
  res.json({ success: true, message: 'Get user by ID - TODO' })
}

const followUser = (req: any, res: any) => {
  res.json({ success: true, message: 'Follow user - TODO' })
}

const unfollowUser = (req: any, res: any) => {
  res.json({ success: true, message: 'Unfollow user - TODO' })
}

const getFollowing = (req: any, res: any) => {
  res.json({ success: true, message: 'Get following - TODO' })
}

const getFollowers = (req: any, res: any) => {
  res.json({ success: true, message: 'Get followers - TODO' })
}

const getFavorites = (req: any, res: any) => {
  res.json({ success: true, message: 'Get favorites - TODO' })
}

const getReadingHistory = (req: any, res: any) => {
  res.json({ success: true, message: 'Get reading history - TODO' })
}

export default router