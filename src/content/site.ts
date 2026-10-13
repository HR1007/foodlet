/** Shared site copy: navigation, footer, CTA. Page copy lives in the per-page content files. */

export const NAV = [
  { to: '/', label: '首頁' },
  { to: '/features', label: '功能介紹' },
  { to: '/innovation', label: '創新模式' },
  { to: '/business', label: '商業模式' },
]

export const WALLET_LINK = { to: '/wallet', label: '我的食錢包' }

export const HEADER_CTA = { to: '/join', label: '立即體驗 Foodlet' }

export const CTA_BANNER = {
  title: '立即搶先體驗 食錢包 Foodlet',
  button: '立即體驗',
}

export const FOOTER = {
  copyright: ['版權所有 © 2025 食錢包 Foodlet', '保留所有權利'],
  columns: [
    { title: '公司', links: ['關於我們', '部落格', '聯絡我們', '方案價格', '用戶好評'] },
    { title: '支援', links: ['幫助中心', '服務條款', '法律聲明', '隱私權政策', '系統狀態'] },
  ],
  social: '社群連結',
  newsletter: { title: '訂閱最新消息', placeholder: '輸入你的 Email', submit: '訂閱', thanks: '已訂閱（Demo：不會真的寄信）', invalid: '請輸入有效的 Email' },
  demoNote: '作品集互動 Demo：註冊與 NFT 皆為模擬，資料只存在你的瀏覽器。圖片與插圖為 AI 生成。',
}

export const DEMO_TOAST = 'Demo 未開放此頁面'
