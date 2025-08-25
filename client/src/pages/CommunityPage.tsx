import { useState } from 'react'
import { MessageCircle, Heart, Eye, Clock, TrendingUp, Plus, Search } from 'lucide-react'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'hot' | 'new' | 'following'>('hot')
  const [searchTerm, setSearchTerm] = useState('')

  const posts = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: [
      '进击的巨人最终话的深度解析',
      '推荐几部被低估的优秀漫画',
      '关于鬼灭之刃的一些思考',
      '漫画vs动画，你更喜欢哪个？',
      '新人求推荐热血漫画',
      '讨论一下最喜欢的漫画角色',
      '漫画中最令人印象深刻的场景',
      '如何培养漫画阅读习惯？',
      '日漫vs国漫，谈谈你的看法',
      '分享我的漫画收藏',
      '漫画改编真人电影的利弊',
      '二次元文化在现实中的影响'
    ][index],
    author: `用户${index + 1}`,
    avatar: `https://via.placeholder.com/40x40?text=U${index + 1}`,
    content: '这是一段精彩的讨论内容，分享了作者对于漫画的独特见解和深入思考...',
    category: ['讨论', '推荐', '分析', '求助', '分享'][Math.floor(Math.random() * 5)],
    publishTime: `${Math.floor(Math.random() * 24) + 1}小时前`,
    views: Math.floor(Math.random() * 1000) + 100,
    comments: Math.floor(Math.random() * 50) + 5,
    likes: Math.floor(Math.random() * 100) + 10,
    isHot: Math.random() > 0.7,
    tags: ['进击的巨人', '热血', '推荐', '讨论', '分析'].slice(0, Math.floor(Math.random() * 3) + 1)
  }))

  const hotTopics = [
    '进击的巨人',
    '鬼灭之刃',
    '一拳超人',
    '火影忍者',
    '海贼王',
    '咒术回战',
    '东京喰种',
    '死神'
  ]

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">社区讨论</h1>
        <button className="btn btn-primary flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>发布话题</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Search and Tabs */}
          <div className="card">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="搜索话题..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-1 border-b border-gray-200">
              {[
                { id: 'hot', name: '热门', icon: TrendingUp },
                { id: 'new', name: '最新', icon: Clock },
                { id: 'following', name: '关注', icon: Heart }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
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
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="card hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start space-x-3">
                  <img 
                    src={post.avatar} 
                    alt={post.author}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900">{post.author}</span>
                      <span className="text-sm text-gray-500">{post.publishTime}</span>
                      {post.isHot && (
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full flex items-center">
                          🔥 热门
                        </span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        post.category === '讨论' ? 'bg-blue-100 text-blue-600' :
                        post.category === '推荐' ? 'bg-green-100 text-green-600' :
                        post.category === '分析' ? 'bg-purple-100 text-purple-600' :
                        post.category === '求助' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {post.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900 mb-2 hover:text-primary-600">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-700 mb-3 line-clamp-2">{post.content}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                      </div>
                      <button className="text-primary-600 hover:text-primary-700 font-medium">
                        查看详情
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center">
            <button className="btn btn-secondary">
              加载更多
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 space-y-6">
          {/* Hot Topics */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">热门话题</h3>
            <div className="space-y-2">
              {hotTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-700">#{topic}</span>
                  <span className="text-sm text-gray-500">{Math.floor(Math.random() * 1000) + 100}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">社区统计</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">总用户数</span>
                <span className="font-medium">50,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">今日活跃</span>
                <span className="font-medium">5,123</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">总话题数</span>
                <span className="font-medium">12,456</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">今日新增</span>
                <span className="font-medium">89</span>
              </div>
            </div>
          </div>

          {/* Rules */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">社区规则</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div>1. 尊重他人，文明讨论</div>
              <div>2. 禁止发布违法违规内容</div>
              <div>3. 不要恶意刷屏或灌水</div>
              <div>4. 保护个人隐私信息</div>
              <div>5. 遵守版权相关法律</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}