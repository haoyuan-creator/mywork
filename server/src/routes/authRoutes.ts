import express from 'express'
import { body } from 'express-validator'
import {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerification
} from '../controllers/authController'
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: 用户名
 *         email:
 *           type: string
 *           description: 邮箱地址
 *         password:
 *           type: string
 *           description: 密码
 *         avatar:
 *           type: string
 *           description: 头像URL
 *         bio:
 *           type: string
 *           description: 个人简介
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: 用户注册
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: 注册成功
 *       400:
 *         description: 验证错误
 */
router.post('/register', [
  body('username')
    .isLength({ min: 2, max: 30 })
    .withMessage('用户名长度必须在2-30个字符之间')
    .matches(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/)
    .withMessage('用户名只能包含字母、数字、下划线和中文'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('请输入有效的邮箱地址'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('密码至少需要6个字符')
], register)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: 用户登录
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 登录成功
 *       401:
 *         description: 认证失败
 */
router.post('/login', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('请输入有效的邮箱地址'),
  body('password')
    .notEmpty()
    .withMessage('密码不能为空')
], login)

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: 用户登出
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 登出成功
 */
router.post('/logout', protect, logout)

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: 获取当前用户信息
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 成功获取用户信息
 *       401:
 *         description: 未授权
 */
router.get('/me', protect, getMe)

/**
 * @swagger
 * /api/auth/profile:
 *   put:
 *     summary: 更新用户资料
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               bio:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: 更新成功
 *       401:
 *         description: 未授权
 */
router.put('/profile', protect, [
  body('username')
    .optional()
    .isLength({ min: 2, max: 30 })
    .withMessage('用户名长度必须在2-30个字符之间'),
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('个人简介不能超过500个字符')
], updateProfile)

/**
 * @swagger
 * /api/auth/change-password:
 *   put:
 *     summary: 修改密码
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: 密码修改成功
 *       401:
 *         description: 当前密码错误
 */
router.put('/change-password', protect, [
  body('currentPassword')
    .notEmpty()
    .withMessage('当前密码不能为空'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('新密码至少需要6个字符')
], changePassword)

// 忘记密码
router.post('/forgot-password', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('请输入有效的邮箱地址')
], forgotPassword)

// 重置密码
router.put('/reset-password/:resetToken', [
  body('password')
    .isLength({ min: 6 })
    .withMessage('密码至少需要6个字符')
], resetPassword)

// 验证邮箱
router.get('/verify-email/:verificationToken', verifyEmail)

// 重新发送验证邮件
router.post('/resend-verification', protect, resendVerification)

export default router