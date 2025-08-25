import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import MangaListPage from './pages/MangaListPage'
import MangaDetailPage from './pages/MangaDetailPage'
import CommunityPage from './pages/CommunityPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manga" element={<MangaListPage />} />
        <Route path="/manga/:id" element={<MangaDetailPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Layout>
  )
}

export default App