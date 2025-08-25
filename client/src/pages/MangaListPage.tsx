import { useState } from 'react'
import { Search, Filter, Grid, List, Star } from 'lucide-react'

export default function MangaListPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'action', name: '动作' },
    { id: 'romance', name: '恋爱' },
    { id: 'comedy', name: '喜剧' },
    { id: 'drama', name: '剧情' },
    { id: 'fantasy', name: '奇幻' },
    { id: 'horror', name: '恐怖' },
  ]

  const mangaList = Array.from({ length: 24 }, (_, index) => ({
    id: index + 1,
    title: `漫画作品 ${index + 1}`,
    author: `作者 ${index + 1}`,
    rating: (4.0 + Math.random()).toFixed(1),
    chapters: Math.floor(Math.random() * 200) + 1,
    status: Math.random() > 0.5 ? '连载中' : '已完结',
    category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1].name,
    image: `https://via.placeholder.com/300x400?text=漫画${index + 1}`,
    description: '这是一个精彩的漫画故事，充满了冒险、友情和成长的元素...',
    lastUpdate: `${Math.floor(Math.random() * 30) + 1}天前`,
  }))

  const filteredManga = mangaList.filter(manga => {
    const matchesSearch = manga.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manga.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || manga.category === categories.find(c => c.id === selectedCategory)?.name
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">漫画列表</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="搜索漫画或作者..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-gray-600">
        找到 {filteredManga.length} 部漫画
      </div>

      {/* Manga Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredManga.map((manga) => (
            <div key={manga.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-[3/4] bg-gray-200 rounded-t-lg overflow-hidden">
                <img 
                  src={manga.image} 
                  alt={manga.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                  {manga.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{manga.author}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                    {manga.rating}
                  </div>
                  <div>{manga.chapters}话</div>
                </div>
                <div className="mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    manga.status === '连载中' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {manga.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="space-y-4">
            {filteredManga.map((manga) => (
              <div key={manga.id} className="flex items-center space-x-4 py-4 border-b border-gray-100 last:border-b-0">
                <div className="w-16 h-20 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                  <img 
                    src={manga.image} 
                    alt={manga.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 mb-1">{manga.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">作者: {manga.author}</p>
                  <p className="text-sm text-gray-700 line-clamp-2 mb-2">{manga.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                      {manga.rating}
                    </div>
                    <div>{manga.chapters}话</div>
                    <div>{manga.lastUpdate}更新</div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    manga.status === '连载中' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {manga.status}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {manga.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            上一页
          </button>
          {Array.from({ length: 5 }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-2 rounded-md text-sm ${
                i === 0 
                  ? 'bg-primary-600 text-white' 
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            下一页
          </button>
        </div>
      </div>
    </div>
  )
}