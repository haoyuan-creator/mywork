import express from 'express'
import { protect, optionalAuth, authorize } from '../middleware/authMiddleware'

const router = express.Router()

/**
 * @swagger
 * /api/manga:
 *   get:
 *     summary: 获取漫画列表
 *     tags: [Manga]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 页码
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: 每页数量
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: 搜索关键词
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: 分类筛选
 *     responses:
 *       200:
 *         description: 成功获取漫画列表
 */
router.get('/', optionalAuth, getMangaList)

/**
 * @swagger
 * /api/manga/{id}:
 *   get:
 *     summary: 获取漫画详情
 *     tags: [Manga]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 漫画ID
 *     responses:
 *       200:
 *         description: 成功获取漫画详情
 *       404:
 *         description: 漫画不存在
 */
router.get('/:id', optionalAuth, getMangaById)

// 添加漫画（需要管理员权限）
router.post('/', protect, authorize('admin', 'moderator'), createManga)

// 更新漫画
router.put('/:id', protect, authorize('admin', 'moderator'), updateManga)

// 删除漫画
router.delete('/:id', protect, authorize('admin'), deleteManga)

// 添加到收藏
router.post('/:id/favorite', protect, addToFavorites)

// 从收藏中移除
router.delete('/:id/favorite', protect, removeFromFavorites)

// 获取热门漫画
router.get('/trending/popular', getPopularManga)

// 获取最新更新
router.get('/trending/latest', getLatestManga)

// 临时控制器函数（占位符）
const getMangaList = (req: any, res: any) => {
  res.json({ success: true, message: 'Get manga list - TODO' })
}

const getMangaById = (req: any, res: any) => {
  res.json({ success: true, message: 'Get manga by ID - TODO' })
}

const createManga = (req: any, res: any) => {
  res.json({ success: true, message: 'Create manga - TODO' })
}

const updateManga = (req: any, res: any) => {
  res.json({ success: true, message: 'Update manga - TODO' })
}

const deleteManga = (req: any, res: any) => {
  res.json({ success: true, message: 'Delete manga - TODO' })
}

const addToFavorites = (req: any, res: any) => {
  res.json({ success: true, message: 'Add to favorites - TODO' })
}

const removeFromFavorites = (req: any, res: any) => {
  res.json({ success: true, message: 'Remove from favorites - TODO' })
}

const getPopularManga = (req: any, res: any) => {
  res.json({ success: true, message: 'Get popular manga - TODO' })
}

const getLatestManga = (req: any, res: any) => {
  res.json({ success: true, message: 'Get latest manga - TODO' })
}

export default router