import mongoose, { Document, Schema } from 'mongoose'

export interface IPost extends Document {
  title: string
  content: string
  author: mongoose.Types.ObjectId
  category: 'discussion' | 'recommendation' | 'question' | 'news' | 'fan-art'
  tags: string[]
  images: string[]
  manga?: mongoose.Types.ObjectId
  likes: mongoose.Types.ObjectId[]
  comments: mongoose.Types.ObjectId[]
  views: number
  isPinned: boolean
  isClosed: boolean
  moderationStatus: 'pending' | 'approved' | 'rejected'
  reportCount: number
  createdAt: Date
  updatedAt: Date
}

const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: [true, '帖子标题是必需的'],
    trim: true,
    minlength: [5, '标题至少需要5个字符'],
    maxlength: [200, '标题不能超过200个字符']
  },
  content: {
    type: String,
    required: [true, '帖子内容是必需的'],
    trim: true,
    minlength: [10, '内容至少需要10个字符'],
    maxlength: [10000, '内容不能超过10000个字符']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, '作者ID是必需的']
  },
  category: {
    type: String,
    required: [true, '帖子分类是必需的'],
    enum: ['discussion', 'recommendation', 'question', 'news', 'fan-art']
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, '标签不能超过30个字符']
  }],
  images: [{
    type: String,
    validate: {
      validator: function(v: string) {
        return /^https?:\/\/.+/.test(v)
      },
      message: '图片URL格式不正确'
    }
  }],
  manga: {
    type: Schema.Types.ObjectId,
    ref: 'Manga'
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  isClosed: {
    type: Boolean,
    default: false
  },
  moderationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved'
  },
  reportCount: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
})

// 创建索引
postSchema.index({ title: 'text', content: 'text', tags: 'text' })
postSchema.index({ author: 1, createdAt: -1 })
postSchema.index({ category: 1, createdAt: -1 })
postSchema.index({ manga: 1, createdAt: -1 })
postSchema.index({ isPinned: -1, createdAt: -1 })
postSchema.index({ moderationStatus: 1 })
postSchema.index({ views: -1 })

// 虚拟字段：分类中文名
postSchema.virtual('categoryText').get(function(this: IPost) {
  const categoryMap = {
    discussion: '讨论',
    recommendation: '推荐',
    question: '提问',
    news: '资讯',
    'fan-art': '同人作品'
  }
  return categoryMap[this.category]
})

// 虚拟字段：喜欢数量
postSchema.virtual('likesCount').get(function(this: IPost) {
  return this.likes.length
})

// 虚拟字段：评论数量
postSchema.virtual('commentsCount').get(function(this: IPost) {
  return this.comments.length
})

// 虚拟字段：热度分数（基于喜欢数、评论数、查看数和时间）
postSchema.virtual('hotScore').get(function(this: IPost) {
  const now = new Date()
  const hoursSinceCreated = (now.getTime() - this.createdAt.getTime()) / (1000 * 60 * 60)
  
  // 时间衰减因子（24小时后开始衰减）
  const timeDecay = Math.max(0.1, 1 - (hoursSinceCreated - 24) / (24 * 7))
  
  const likesScore = this.likes.length * 10
  const commentsScore = this.comments.length * 5
  const viewsScore = this.views * 0.1
  
  return (likesScore + commentsScore + viewsScore) * timeDecay
})

// 序列化时包含虚拟字段
postSchema.set('toJSON', { virtuals: true })
postSchema.set('toObject', { virtuals: true })

export default mongoose.model<IPost>('Post', postSchema)