// 共享类型定义，供前端和后端使用

// 用户相关类型
export interface User {
  _id: string
  username: string
  email: string
  avatar?: string
  bio?: string
  role: 'user' | 'admin' | 'moderator'
  isEmailVerified: boolean
  favoriteGenres: string[]
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
  followersCount: number
  followingCount: number
  lastActive: string
  createdAt: string
  updatedAt: string
}

// 漫画相关类型
export interface Manga {
  _id: string
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
  totalChapters: number
  lastChapterUpdate: string
  language: string
  isAdultContent: boolean
  source: {
    name: string
    url?: string
  }
  statusText: string
  typeText: string
  createdAt: string
  updatedAt: string
}

// 评价相关类型
export interface Review {
  _id: string
  user: User
  manga: string | Manga
  rating: number
  title: string
  content: string
  spoilerWarning: boolean
  likesCount: number
  dislikesCount: number
  helpfulnessScore: number
  isHelpful: boolean
  createdAt: string
  updatedAt: string
}

// 帖子相关类型
export interface Post {
  _id: string
  title: string
  content: string
  author: User
  category: 'discussion' | 'recommendation' | 'question' | 'news' | 'fan-art'
  categoryText: string
  tags: string[]
  images: string[]
  manga?: string | Manga
  likesCount: number
  commentsCount: number
  views: number
  isPinned: boolean
  isClosed: boolean
  hotScore: number
  createdAt: string
  updatedAt: string
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    message: string
    details?: any
  }
  message?: string
}

// 分页类型
export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginatedResponse<T = any> {
  success: boolean
  data: {
    items: T[]
    pagination: {
      currentPage: number
      totalPages: number
      totalItems: number
      hasNext: boolean
      hasPrev: boolean
    }
  }
}

// 搜索和筛选类型
export interface SearchParams {
  search?: string
  genre?: string
  status?: string
  type?: string
  sortBy?: 'newest' | 'oldest' | 'rating' | 'popularity' | 'title'
  sortOrder?: 'asc' | 'desc'
}

// 认证相关类型
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}