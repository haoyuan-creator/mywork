import mongoose, { Document, Schema } from 'mongoose'

export interface IReview extends Document {
  user: mongoose.Types.ObjectId
  manga: mongoose.Types.ObjectId
  rating: number
  title: string
  content: string
  spoilerWarning: boolean
  likes: mongoose.Types.ObjectId[]
  dislikes: mongoose.Types.ObjectId[]
  isHelpful: boolean
  moderationStatus: 'pending' | 'approved' | 'rejected'
  reportCount: number
  createdAt: Date
  updatedAt: Date
}

const reviewSchema = new Schema<IReview>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, '用户ID是必需的']
  },
  manga: {
    type: Schema.Types.ObjectId,
    ref: 'Manga',
    required: [true, '漫画ID是必需的']
  },
  rating: {
    type: Number,
    required: [true, '评分是必需的'],
    min: [1, '评分不能低于1分'],
    max: [5, '评分不能高于5分']
  },
  title: {
    type: String,
    required: [true, '评价标题是必需的'],
    trim: true,
    maxlength: [100, '标题不能超过100个字符']
  },
  content: {
    type: String,
    required: [true, '评价内容是必需的'],
    trim: true,
    minlength: [10, '评价内容至少需要10个字符'],
    maxlength: [2000, '评价内容不能超过2000个字符']
  },
  spoilerWarning: {
    type: Boolean,
    default: false
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  isHelpful: {
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
reviewSchema.index({ manga: 1, user: 1 }, { unique: true }) // 每个用户对每部漫画只能有一个评价
reviewSchema.index({ manga: 1, createdAt: -1 })
reviewSchema.index({ user: 1, createdAt: -1 })
reviewSchema.index({ rating: -1 })
reviewSchema.index({ moderationStatus: 1 })

// 虚拟字段：喜欢数量
reviewSchema.virtual('likesCount').get(function(this: IReview) {
  return this.likes.length
})

// 虚拟字段：不喜欢数量
reviewSchema.virtual('dislikesCount').get(function(this: IReview) {
  return this.dislikes.length
})

// 虚拟字段：有用性得分
reviewSchema.virtual('helpfulnessScore').get(function(this: IReview) {
  const likes = this.likes.length
  const dislikes = this.dislikes.length
  const total = likes + dislikes
  
  if (total === 0) return 0
  return (likes / total) * 100
})

// 序列化时包含虚拟字段
reviewSchema.set('toJSON', { virtuals: true })
reviewSchema.set('toObject', { virtuals: true })

export default mongoose.model<IReview>('Review', reviewSchema)