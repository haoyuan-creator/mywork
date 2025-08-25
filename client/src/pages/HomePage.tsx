import { Star, TrendingUp, Clock, Users } from 'lucide-react'

export default function HomePage() {
  const featuredManga = [
    {
      id: 1,
      title: '进击的巨人',
      author: '諫山創',
      rating: 4.8,
      image: 'https://via.placeholder.com/300x400?text=进击的巨人',
      description: '在被巨人支配的世界中，人类为了生存而奋斗的故事...',
    },
    {
      id: 2,
      title: '鬼灭之刃',
      author: '吾峠呼世晴',
      rating: 4.9,
      image: 'https://via.placeholder.com/300x400?text=鬼灭之刃',
      description: '少年炭治郎为了拯救变成鬼的妹妹而踏上的冒险之路...',
    },
    {
      id: 3,
      title: '一拳超人',
      author: 'ONE',
      rating: 4.7,
      image: 'https://via.placeholder.com/300x400?text=一拳超人',
      description: '能够一拳击败任何敌人的英雄埼玉的日常生活...',
    },
  ]

  const stats = [
    { icon: Star, label: '漫画作品', value: '10,000+' },
    { icon: Users, label: '社区成员', value: '50,000+' },
    { icon: TrendingUp, label: '日活跃用户', value: '5,000+' },
    { icon: Clock, label: '更新频率', value: '每日' },
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          欢迎来到 MangaHub
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          发现、分享、讨论你喜爱的漫画作品
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg">
            开始探索
          </button>
          <button className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 text-lg">
            加入社区
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="card text-center">
                <Icon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Featured Manga */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">热门推荐</h2>
          <button className="text-primary-600 hover:text-primary-700 font-medium">
            查看更多 →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredManga.map((manga) => (
            <div key={manga.id} className="card hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <img 
                  src={manga.image} 
                  alt={manga.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {manga.title}
              </h3>
              <p className="text-gray-600 mb-2">作者: {manga.author}</p>
              <div className="flex items-center mb-3">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-600">{manga.rating}</span>
              </div>
              <p className="text-gray-700 text-sm line-clamp-3">
                {manga.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Updates */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">最新更新</h2>
        <div className="card">
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                <div className="w-16 h-20 bg-gray-200 rounded flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">漫画标题 {index + 1}</h4>
                  <p className="text-sm text-gray-600">第 {120 + index} 话</p>
                  <p className="text-xs text-gray-500">2 小时前更新</p>
                </div>
                <div className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer">
                  阅读
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}