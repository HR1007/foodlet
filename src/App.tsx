import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import Layout from './layout/Layout'
import Placeholder from './pages/Placeholder'
import HomePage from './pages/HomePage'
import { ToastProvider } from './components/Toast'

// HashRouter keeps deep links working on GitHub Pages, which has no SPA fallback.
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <HashRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<Placeholder title="功能介紹" />} />
              <Route path="/innovation" element={<Placeholder title="創新模式" />} />
              <Route path="/business" element={<Placeholder title="商業模式" />} />
              <Route path="/join" element={<Placeholder title="註冊帳號" />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </ToastProvider>
    </MotionConfig>
  )
}
