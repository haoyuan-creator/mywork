import { useState } from 'react'
import { User, Settings, Book, Heart, MessageCircle, Calendar, Star, Award } from 'lucide-react'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'favorites' | 'reviews' | 'posts' | 'settings'>('overview')

  // Mock user data
  const user = {
    id: 1,
    username: '漫画爱好者',
    email: 'manga@example.com',
    avatar: 'https://via.placeholder.com/120x120?text=Avatar',
    bio: '热爱漫画的二次元少女，最喜欢的作品是进击的巨人和鬼灭之刃。希望能在这里遇到更多志同道合的朋友！',
    joinDate: '2023-01-15',
    stats: {
      readCount: 156,
      favorites: 89,
      reviews: 45,
      posts: 23,
      followers: 234,
      following: 189
    },
    badges: [
      { name: '活跃用户', icon: '🌟', description: '连续登录30天' },
      { name: '评论达人', icon: '💬', description: '发表100条评论' },
      { name: '推荐专家', icon: '👍', description: '推荐获得500个赞' }
    ]
  }

  const favorites = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    title: `收藏的漫画 ${index + 1}`,
    image: `https://via.placeholder.com/150x200?text=漫画${index + 1}`,
    rating: 4.5 + Math.random() * 0.5,
    progress: Math.floor(Math.random() * 100) + 1,
    total: Math.floor(Math.random() * 200) + 100
  }))

  const reviews = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    mangaTitle: `漫画作品 ${index + 1}`,
    rating: 4 + Math.random(),
    title: `我的第${index + 1}篇评价`,
    content: '这部漫画真的很棒，剧情紧凑，人物塑造也很出色。强烈推荐给所有漫画爱好者！',
    date: `2024-01-${15 + index}`,
    likes: Math.floor(Math.random() * 50) + 10
  }))

  const posts = Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    title: `我发布的话题 ${index + 1}`,
    content: '分享一些关于漫画的有趣观点和深度思考...',
    category: ['讨论', '推荐', '分析', '分享'][index],
    date: `2024-01-${20 + index}`,
    views: Math.floor(Math.random() * 500) + 100,
    comments: Math.floor(Math.random() * 20) + 5,
    likes: Math.floor(Math.random() * 30) + 10
  }))

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 text-center">
            <img 
              src={user.avatar} 
              alt={user.username}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4"
            />
            <button className="btn btn-secondary text-sm">
              <Settings className="h-4 w-4 mr-2" />
              编辑资料
            </button>
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.username}</h1>
            <p className="text-gray-600 mb-4">{user.bio}</p>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-4">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{user.stats.readCount}</div>
                <div className="text-sm text-gray-600">已读</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{user.stats.favorites}</div>
                <div className="text-sm text-gray-600">收藏</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{user.stats.reviews}</div>
                <div className="text-sm text-gray-600">评价</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{user.stats.posts}</div>
                <div className="text-sm text-gray-600">话题</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{user.stats.followers}</div>
                <div className="text-sm text-gray-600">粉丝</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{user.stats.following}</div>
                <div className="text-sm text-gray-600">关注</div>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              {user.joinDate} 加入
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">成就徽章</h3>
          <div className="flex flex-wrap gap-3">
            {user.badges.map((badge, index) => (
              <div key={index} className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-lg">{badge.icon}</span>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{badge.name}</div>
                  <div className="text-xs text-gray-600">{badge.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: '概览', icon: User },
            { id: 'favorites', name: '收藏', icon: Heart },
            { id: 'reviews', name: '评价', icon: Star },
            { id: 'posts', name: '话题', icon: MessageCircle },
            { id: 'settings', name: '设置', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">最近阅读</h3>
              <div className="space-y-3">
                {favorites.slice(0, 4).map((manga) => (
                  <div key={manga.id} className="flex items-center space-x-3">
                    <img 
                      src={manga.image} 
                      alt={manga.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{manga.title}</h4>
                      <div className="text-sm text-gray-600">
                        进度: {manga.progress}/{manga.total}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                        <div 
                          className="bg-primary-600 h-1 rounded-full" 
                          style={{ width: `${(manga.progress / manga.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">最新评价</h3>
              <div className="space-y-3">
                {reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{review.mangaTitle}</h4>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{review.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">{review.content}</p>
                    <div className="text-xs text-gray-500 mt-1">{review.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {favorites.map((manga) => (
              <div key={manga.id} className="space-y-2">
                <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src={manga.image} 
                    alt={manga.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-gray-900 text-sm line-clamp-2">{manga.title}</h3>
                <div className="text-xs text-gray-600">
                  {manga.progress}/{manga.total} 话
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className="bg-primary-600 h-1 rounded-full" 
                    style={{ width: `${(manga.progress / manga.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="card">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.title}</h3>
                    <p className="text-sm text-gray-600">关于: {review.mangaTitle}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{review.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">{review.content}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{review.date}</span>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-3 w-3" />
                    <span>{review.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="card">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{post.title}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {post.category}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{post.content}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.date}</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Book className="h-3 w-3" />
                      <span>{post.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{post.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">账户设置</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
                  <input
                    type="text"
                    value={user.username}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                  <input
                    type="email"
                    value={user.email}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">个人简介</label>
                  <textarea
                    rows={4}
                    value={user.bio}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">邮件通知</h4>
                    <p className="text-sm text-gray-600">接收新评论和消息的邮件通知</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                <div className="pt-4">
                  <button className="btn btn-primary">保存设置</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}