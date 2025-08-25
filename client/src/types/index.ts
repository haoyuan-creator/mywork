// 导出共享类型
export * from '../../shared/types'

// 前端特有的类型定义
export interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  current?: boolean
}

export interface Theme {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

export interface NotificationState {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  id: string
  duration?: number
}

export interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

export interface MangaFilters {
  search: string
  genre: string
  status: string
  type: string
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

export interface ReadingProgress {
  mangaId: string
  currentChapter: number
  totalChapters: number
  lastReadAt: string
}