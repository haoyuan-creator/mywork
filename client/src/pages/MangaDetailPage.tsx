import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Star, Heart, Bookmark, Share2, Eye, Calendar, User, Tag } from 'lucide-react'

export default function MangaDetailPage() {
  const { id } = useParams()
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [activeTab, setActiveTab] = useState<'chapters' | 'comments' | 'reviews'>('chapters')

  // Mock data - in real app, this would come from API
  const manga = {
    id: id,
    title: '进击的巨人',
    author: '諫山創',
    rating: 4.8,
    totalRatings: 15420,
    status: '已完结',
    category: ['动作', '剧情', '奇幻'],
    image: 'https://via.placeholder.com/400x600?text=进击的巨人',
    description: '在被巨人支配的世界中，人类为了生存而奋斗的故事。艾伦·耶格尔立志加入调查兵团，为了夺回被巨人占领的土地而战斗。这是一个关于自由、友情和牺牲的史诗级故事。',
    publishDate: '2009-09-09',
    lastUpdate: '2021-04-09',
    views: 1250000,
    chapters: 139,
    tags: ['热血', '战争', '成长', '悬疑']
  }

  const chapters = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    title: `第 ${139 - index} 话：${['最终话', '回忆', '决战', '觉悟', '真相', '反击', '希望', '绝望', '战友', '开始'][index]}`,
    publishDate: `2021-${4 - Math.floor(index / 3)}-${Math.floor(Math.random() * 28) + 1}`,
    views: Math.floor(Math.random() * 100000) + 50000
  }))

  const comments = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    user: `用户${index + 1}`,
    avatar: `https://via.placeholder.com/40x40?text=U${index + 1}`,
    content: `这部漫画真的太精彩了！第${139 - index}话的剧情发展让人震撼，作者的构思太厉害了。`,
    time: `${index + 1}小时前`,
    likes: Math.floor(Math.random() * 50) + 10
  }))

  const reviews = Array.from({ length: 3 }, (_, index) => ({
    id: index + 1,
    user: `评论者${index + 1}`,
    avatar: `https://via.placeholder.com/40x40?text=R${index + 1}`,
    rating: 4.5 + Math.random() * 0.5,
    title: `第${index + 1}次重读的感受`,
    content: `这是我第${index + 1}次重读这部漫画，每次都有新的发现和感动。作者的世界观构建非常完整，人物塑造也很立体。强烈推荐给所有漫画爱好者！`,
    time: `${index + 1}天前`,
    likes: Math.floor(Math.random() * 100) + 20
  }))

  return (
    <div className="space-y-8">
      {/* Manga Info */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cover Image */}
          <div className="flex-shrink-0">
            <img 
              src={manga.image} 
              alt={manga.title}
              className="w-full lg:w-80 h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Details */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{manga.title}</h1>
              <p className="text-lg text-gray-600">作者: {manga.author}</p>
            </div>

            {/* Rating and Stats */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                <span className="font-medium">{manga.rating}</span>
                <span className="text-gray-500 ml-1">({manga.totalRatings}人评价)</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Eye className="h-4 w-4 mr-1" />
                {manga.views.toLocaleString()} 次阅读
              </div>
            </div>

            {/* Status and Info */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">状态:</span>
                <div className={`mt-1 inline-block px-2 py-1 rounded-full text-xs ${
                  manga.status === '连载中' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {manga.status}
                </div>
              </div>
              <div>
                <span className="text-gray-600">章节:</span>
                <div className="font-medium">{manga.chapters} 话</div>
              </div>
              <div>
                <span className="text-gray-600">发布:</span>
                <div className="font-medium">{manga.publishDate}</div>
              </div>
              <div>
                <span className="text-gray-600">更新:</span>
                <div className="font-medium">{manga.lastUpdate}</div>
              </div>
            </div>

            {/* Categories and Tags */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {manga.category.map((cat, index) => (
                  <span key={index} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                    {cat}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {manga.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">简介</h3>
              <p className="text-gray-700 leading-relaxed">{manga.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="btn btn-primary">
                开始阅读
              </button>
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`btn flex items-center space-x-2 ${
                  isLiked ? 'bg-red-100 text-red-600' : 'btn-secondary'
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{isLiked ? '已喜欢' : '喜欢'}</span>
              </button>
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`btn flex items-center space-x-2 ${
                  isBookmarked ? 'bg-blue-100 text-blue-600' : 'btn-secondary'
                }`}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                <span>{isBookmarked ? '已收藏' : '收藏'}</span>
              </button>
              <button className="btn btn-secondary flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>分享</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'chapters', name: '章节列表', count: manga.chapters },
            { id: 'comments', name: '评论', count: 324 },
            { id: 'reviews', name: '评价', count: 89 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'chapters' && (
          <div className="card">
            <div className="space-y-1">
              {chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{chapter.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {chapter.publishDate}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {chapter.views.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    阅读
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="space-y-4">
            <div className="card">
              <textarea
                placeholder="写下你的评论..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
              />
              <div className="flex justify-end mt-3">
                <button className="btn btn-primary">发表评论</button>
              </div>
            </div>
            
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="card">
                  <div className="flex items-start space-x-3">
                    <img 
                      src={comment.avatar} 
                      alt={comment.user}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">{comment.user}</span>
                        <span className="text-sm text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-gray-700 mb-2">{comment.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-gray-700">
                          <Heart className="h-3 w-3" />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="hover:text-gray-700">回复</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="card">
                <div className="flex items-start space-x-3">
                  <img 
                    src={review.avatar} 
                    alt={review.user}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900">{review.user}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{review.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">{review.time}</span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                    <p className="text-gray-700 mb-3">{review.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <button className="flex items-center space-x-1 hover:text-gray-700">
                        <Heart className="h-3 w-3" />
                        <span>{review.likes}</span>
                      </button>
                      <button className="hover:text-gray-700">回复</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}