import mongoose, { Document, Schema } from 'mongoose'

export interface IManga extends Document {
  title: string
  alternativeTitles: string[]
  author: string
  artist?: string
  description: string
  coverImage: string
  genres: string[]
  tags: string[]
  status: 'ongoing' | 'completed' | 'hiatus' | 'cancelled'
  type: 'manga' | 'manhwa' | 'manhua' | 'webtoon'
  demographic: 'shounen' | 'shoujo' | 'seinen' | 'josei' | 'kids'
  publishedYear: number
  rating: {
    average: number
    count: number
  }
  popularity: number
  views: number
  favorites: number
  chapters: mongoose.Types.ObjectId[]
  totalChapters: number
  lastChapterUpdate: Date
  language: string
  isAdultContent: boolean
  source: {
    name: string
    url?: string
  }
  addedBy: mongoose.Types.ObjectId
  moderationStatus: 'pending' | 'approved' | 'rejected'
  createdAt: Date
  updatedAt: Date
}

const mangaSchema = new Schema<IManga>({
  title: {
    type: String,
    required: [true, '漫画标题是必需的'],
    trim: true,
    maxlength: [200, '标题不能超过200个字符']
  },
  alternativeTitles: [{
    type: String,
    trim: true,
    maxlength: [200, '标题不能超过200个字符']
  }],
  author: {
    type: String,
    required: [true, '作者是必需的'],
    trim: true,
    maxlength: [100, '作者名不能超过100个字符']
  },
  artist: {
    type: String,
    trim: true,
    maxlength: [100, '画师名不能超过100个字符']
  },
  description: {
    type: String,
    required: [true, '漫画描述是必需的'],
    maxlength: [2000, '描述不能超过2000个字符']
  },
  coverImage: {
    type: String,
    required: [true, '封面图片是必需的']
  },
  genres: [{
    type: String,
    required: true,
    enum: [
      '动作', '冒险', '喜剧', '剧情', '奇幻', '恐怖', 
      '神秘', '浪漫', '科幻', '运动', '超自然', '惊悚',
      '日常', '校园', '历史', '军事', '音乐', '美食'
    ]
  }],
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, '标签不能超过50个字符']
  }],
  status: {
    type: String,
    required: true,
    enum: ['ongoing', 'completed', 'hiatus', 'cancelled'],
    default: 'ongoing'
  },
  type: {
    type: String,
    required: true,
    enum: ['manga', 'manhwa', 'manhua', 'webtoon'],
    default: 'manga'
  },
  demographic: {
    type: String,
    enum: ['shounen', 'shoujo', 'seinen', 'josei', 'kids'],
    default: 'shounen'
  },
  publishedYear: {
    type: Number,
    min: [1900, '发布年份不能早于1900年'],
    max: [new Date().getFullYear() + 1, '发布年份不能超过明年']
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  popularity: {
    type: Number,
    default: 0,
    min: 0
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  favorites: {
    type: Number,
    default: 0,
    min: 0
  },
  chapters: [{
    type: Schema.Types.ObjectId,
    ref: 'Chapter'
  }],
  totalChapters: {
    type: Number,
    default: 0,
    min: 0
  },
  lastChapterUpdate: {
    type: Date,
    default: Date.now
  },
  language: {
    type: String,
    enum: ['zh-CN', 'en', 'ja', 'ko'],
    default: 'zh-CN'
  },
  isAdultContent: {
    type: Boolean,
    default: false
  },
  source: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    url: String
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  moderationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
})

// 创建索引
mangaSchema.index({ title: 'text', alternativeTitles: 'text', author: 'text' })
mangaSchema.index({ genres: 1 })
mangaSchema.index({ status: 1 })
mangaSchema.index({ 'rating.average': -1 })
mangaSchema.index({ popularity: -1 })
mangaSchema.index({ views: -1 })
mangaSchema.index({ createdAt: -1 })
mangaSchema.index({ lastChapterUpdate: -1 })
mangaSchema.index({ moderationStatus: 1 })

// 虚拟字段：状态中文名
mangaSchema.virtual('statusText').get(function(this: IManga) {
  const statusMap = {
    ongoing: '连载中',
    completed: '已完结',
    hiatus: '休刊',
    cancelled: '已取消'
  }
  return statusMap[this.status]
})

// 虚拟字段：类型中文名
mangaSchema.virtual('typeText').get(function(this: IManga) {
  const typeMap = {
    manga: '日漫',
    manhwa: '韩漫',
    manhua: '国漫',
    webtoon: '网络漫画'
  }
  return typeMap[this.type]
})

// 更新流行度的方法
mangaSchema.methods.updatePopularity = function(this: IManga) {
  // 流行度计算：基于评分、收藏数、观看数等
  const ratingWeight = this.rating.average * this.rating.count * 10
  const viewWeight = this.views * 0.1
  const favoriteWeight = this.favorites * 5
  
  this.popularity = ratingWeight + viewWeight + favoriteWeight
  return this.save()
}

// 序列化时包含虚拟字段
mangaSchema.set('toJSON', { virtuals: true })
mangaSchema.set('toObject', { virtuals: true })

export default mongoose.model<IManga>('Manga', mangaSchema)