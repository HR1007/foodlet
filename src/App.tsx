import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import Layout from './layout/Layout'
import JoinPage from './pages/JoinPage'
import HomePage from './pages/HomePage'
import { BusinessPage, FeaturesPage, InnovationPage } from './pages/ContentPages'
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
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/innovation" element={<InnovationPage />} />
              <Route path="/business" element={<BusinessPage />} />
              <Route path="/join" element={<JoinPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </ToastProvider>
    </MotionConfig>
  )
}
