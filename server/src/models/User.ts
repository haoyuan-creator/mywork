import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  username: string
  email: string
  password: string
  avatar?: string
  bio?: string
  role: 'user' | 'admin' | 'moderator'
  isEmailVerified: boolean
  favoriteGenres: string[]
  readingList: mongoose.Types.ObjectId[]
  followers: mongoose.Types.ObjectId[]
  following: mongoose.Types.ObjectId[]
  stats: {
    mangaRead: number
    reviewsWritten: number
    postsCreated: number
    likesReceived: number
  }
  preferences: {
    emailNotifications: boolean
    privateProfile: boolean
    language: string
  }
  lastActive: Date
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, '用户名是必需的'],
    unique: true,
    trim: true,
    minlength: [2, '用户名至少需要2个字符'],
    maxlength: [30, '用户名不能超过30个字符'],
    match: [/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, '用户名只能包含字母、数字、下划线和中文']
  },
  email: {
    type: String,
    required: [true, '邮箱是必需的'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, '请输入有效的邮箱地址']
  },
  password: {
    type: String,
    required: [true, '密码是必需的'],
    minlength: [6, '密码至少需要6个字符'],
    select: false // 默认查询时不返回密码
  },
  avatar: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: [500, '个人简介不能超过500个字符'],
    default: ''
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  favoriteGenres: [{
    type: String,
    enum: [
      '动作', '冒险', '喜剧', '剧情', '奇幻', '恐怖', 
      '神秘', '浪漫', '科幻', '运动', '超自然', '惊悚'
    ]
  }],
  readingList: [{
    type: Schema.Types.ObjectId,
    ref: 'Manga'
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  stats: {
    mangaRead: {
      type: Number,
      default: 0
    },
    reviewsWritten: {
      type: Number,
      default: 0
    },
    postsCreated: {
      type: Number,
      default: 0
    },
    likesReceived: {
      type: Number,
      default: 0
    }
  },
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    privateProfile: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      enum: ['zh-CN', 'en', 'ja'],
      default: 'zh-CN'
    }
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// 创建索引
userSchema.index({ email: 1 })
userSchema.index({ username: 1 })
userSchema.index({ lastActive: -1 })

// 密码哈希中间件
userSchema.pre('save', async function(this: IUser, next) {
  if (!this.isModified('password')) return next()
  
  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error as Error)
  }
})

// 密码比较方法
userSchema.methods.comparePassword = async function(this: IUser, candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// 更新最后活跃时间
userSchema.methods.updateLastActive = function(this: IUser) {
  this.lastActive = new Date()
  return this.save()
}

// 虚拟字段：关注者数量
userSchema.virtual('followersCount').get(function(this: IUser) {
  return this.followers.length
})

// 虚拟字段：关注数量
userSchema.virtual('followingCount').get(function(this: IUser) {
  return this.following.length
})

// 序列化时包含虚拟字段
userSchema.set('toJSON', { virtuals: true })
userSchema.set('toObject', { virtuals: true })

export default mongoose.model<IUser>('User', userSchema)