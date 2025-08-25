import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { ApiResponse, User, Manga, Review, Post, PaginatedResponse } from '../types'

// 创建 axios 实例
const api: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器 - 添加认证令牌
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器 - 处理通用错误
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 未授权，清除本地存储并重定向到登录页
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// 认证相关 API
export const authAPI = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/login', {
      email,
      password,
    })
    return response.data.data!
  },

  register: async (username: string, email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/register', {
      username,
      email,
      password,
    })
    return response.data.data!
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
  },

  getMe: async (): Promise<User> => {
    const response = await api.get<ApiResponse<{ user: User }>>('/auth/me')
    return response.data.data!.user
  },

  updateProfile: async (profileData: Partial<User>): Promise<User> => {
    const response = await api.put<ApiResponse<{ user: User }>>('/auth/profile', profileData)
    return response.data.data!.user
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await api.put('/auth/change-password', {
      currentPassword,
      newPassword,
    })
  },
}

// 漫画相关 API
export const mangaAPI = {
  getList: async (params?: {
    page?: number
    limit?: number
    search?: string
    genre?: string
    status?: string
    sortBy?: string
  }): Promise<PaginatedResponse<Manga>> => {
    const response = await api.get<PaginatedResponse<Manga>>('/manga', { params })
    return response.data
  },

  getById: async (id: string): Promise<Manga> => {
    const response = await api.get<ApiResponse<{ manga: Manga }>>(`/manga/${id}`)
    return response.data.data!.manga
  },

  getPopular: async (): Promise<Manga[]> => {
    const response = await api.get<ApiResponse<{ manga: Manga[] }>>('/manga/trending/popular')
    return response.data.data!.manga
  },

  getLatest: async (): Promise<Manga[]> => {
    const response = await api.get<ApiResponse<{ manga: Manga[] }>>('/manga/trending/latest')
    return response.data.data!.manga
  },

  addToFavorites: async (mangaId: string): Promise<void> => {
    await api.post(`/manga/${mangaId}/favorite`)
  },

  removeFromFavorites: async (mangaId: string): Promise<void> => {
    await api.delete(`/manga/${mangaId}/favorite`)
  },
}

// 评价相关 API
export const reviewAPI = {
  getByManga: async (mangaId: string, params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Review>> => {
    const response = await api.get<PaginatedResponse<Review>>(`/reviews/manga/${mangaId}`, { params })
    return response.data
  },

  create: async (reviewData: {
    manga: string
    rating: number
    title: string
    content: string
    spoilerWarning?: boolean
  }): Promise<Review> => {
    const response = await api.post<ApiResponse<{ review: Review }>>('/reviews', reviewData)
    return response.data.data!.review
  },

  update: async (id: string, reviewData: Partial<Review>): Promise<Review> => {
    const response = await api.put<ApiResponse<{ review: Review }>>(`/reviews/${id}`, reviewData)
    return response.data.data!.review
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/reviews/${id}`)
  },

  like: async (id: string): Promise<void> => {
    await api.post(`/reviews/${id}/like`)
  },

  unlike: async (id: string): Promise<void> => {
    await api.delete(`/reviews/${id}/like`)
  },
}

// 帖子相关 API
export const postAPI = {
  getList: async (params?: {
    page?: number
    limit?: number
    category?: string
    search?: string
    sortBy?: string
  }): Promise<PaginatedResponse<Post>> => {
    const response = await api.get<PaginatedResponse<Post>>('/posts', { params })
    return response.data
  },

  getById: async (id: string): Promise<Post> => {
    const response = await api.get<ApiResponse<{ post: Post }>>(`/posts/${id}`)
    return response.data.data!.post
  },

  create: async (postData: {
    title: string
    content: string
    category: string
    tags?: string[]
    manga?: string
  }): Promise<Post> => {
    const response = await api.post<ApiResponse<{ post: Post }>>('/posts', postData)
    return response.data.data!.post
  },

  update: async (id: string, postData: Partial<Post>): Promise<Post> => {
    const response = await api.put<ApiResponse<{ post: Post }>>(`/posts/${id}`, postData)
    return response.data.data!.post
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/posts/${id}`)
  },

  like: async (id: string): Promise<void> => {
    await api.post(`/posts/${id}/like`)
  },

  unlike: async (id: string): Promise<void> => {
    await api.delete(`/posts/${id}/like`)
  },
}

// 用户相关 API
export const userAPI = {
  getById: async (id: string): Promise<User> => {
    const response = await api.get<ApiResponse<{ user: User }>>(`/users/${id}`)
    return response.data.data!.user
  },

  follow: async (id: string): Promise<void> => {
    await api.post(`/users/${id}/follow`)
  },

  unfollow: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}/follow`)
  },

  getFollowers: async (id: string): Promise<User[]> => {
    const response = await api.get<ApiResponse<{ users: User[] }>>(`/users/${id}/followers`)
    return response.data.data!.users
  },

  getFollowing: async (id: string): Promise<User[]> => {
    const response = await api.get<ApiResponse<{ users: User[] }>>(`/users/${id}/following`)
    return response.data.data!.users
  },

  getFavorites: async (id: string): Promise<Manga[]> => {
    const response = await api.get<ApiResponse<{ manga: Manga[] }>>(`/users/${id}/favorites`)
    return response.data.data!.manga
  },
}

export default api