/** Shared site copy: navigation, footer, CTA. Page copy lives in the per-page content files. */

export const NAV = [
  { to: '/', label: '首頁' },
  { to: '/features', label: '功能介紹' },
  { to: '/innovation', label: '創新模式' },
  { to: '/business', label: '商業模式' },
]

export const HEADER_CTA = { to: '/join', label: '立即體驗 Foodlet' }

export const CTA_BANNER = {
  title: '立即搶先體驗 食錢包 Foodlet',
  button: '立即體驗',
}

export const FOOTER = {
  copyright: ['Copyright © 2025 Foodlet.', 'All rights reserved'],
  columns: [
    { title: 'Company', links: ['About us', 'Blog', 'Contact us', 'Pricing', 'Testimonials'] },
    { title: 'Support', links: ['Help center', 'Terms of service', 'Legal', 'Privacy policy', 'Status'] },
  ],
  newsletter: { title: 'Stay up to date', placeholder: 'Your email address', thanks: '已訂閱（Demo：不會真的寄信）' },
  demoNote: '作品集互動 Demo：註冊與 NFT 皆為模擬，資料只存在你的瀏覽器。圖片與插圖為 AI 生成。',
}

export const DEMO_TOAST = 'Demo 未開放此頁面'
