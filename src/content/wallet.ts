import type { NftId } from '../lib/demo'

/** 我的食錢包 — collection page copy and the NFT catalogue (all fictional). */

export const WALLET = {
  title: '我的食錢包',
  greeting: (name: string) => (name ? `${name} 的收藏` : '我的收藏'),
  sub: '每一次點餐、每一個挑戰，都會變成存在這裡的數位收藏。點開卡片可以看到它的權益與上鏈紀錄。',
  stats: { collected: '已收藏', points: '回饋點數', address: '錢包地址' },
  filters: { all: '全部', owned: '已擁有', locked: '未解鎖' },
  locked: '未解鎖',
  progress: (n: number, total: number) => `收藏進度 ${n} / ${total}`,
  simulate: '模擬完成任務',
  unlocked: (name: string) => `已解鎖「${name}」並存入你的食錢包`,
  empty: {
    title: '你的食錢包還是空的',
    body: '先註冊並領取第一個 Foodlet NFT，就能開始收藏。',
    cta: '前往註冊領取',
  },
  detail: {
    perks: '持有權益',
    chain: '上鏈紀錄',
    token: 'Token ID',
    date: '取得日期',
    rarity: '稀有度',
    close: '關閉',
  },
  reset: '清除 Demo 資料',
  resetDone: '已清除 Demo 資料',
  note: 'Demo：NFT、點數與錢包地址皆為模擬資料，只存在你的瀏覽器。',
}

export type NftMeta = {
  id: NftId
  name: string
  img: string
  rarity: '普通' | '稀有' | '史詩'
  quest: string
  perks: string[]
  points: number
  token: string
}

export const NFTS: NftMeta[] = [
  {
    id: 'cookie',
    name: '巧克力餅乾',
    img: 'img/nft-cookie.webp',
    rarity: '普通',
    quest: '註冊並領取第一個 NFT',
    perks: ['新會員首購 9 折', '合作店家生日甜點兌換券'],
    points: 100,
    token: '#000001',
  },
  {
    id: 'taco',
    name: '墨西哥塔可',
    img: 'img/nft-taco.webp',
    rarity: '稀有',
    quest: '在合作店家完成第一筆 Foodlet 支付',
    perks: ['每月一次免運外送', '限量餐點優先預購'],
    points: 250,
    token: '#000418',
  },
  {
    id: 'donut',
    name: '彩糖甜甜圈',
    img: 'img/nft-donut.webp',
    rarity: '稀有',
    quest: '完成「少糖週」飲食挑戰',
    perks: ['健康餐盒 85 折', '營養師線上諮詢一次'],
    points: 300,
    token: '#001207',
  },
  {
    id: 'burger',
    name: '經典起司堡',
    img: 'img/nft-burger.webp',
    rarity: '史詩',
    quest: '連續 7 天記錄用餐',
    perks: ['合作餐廳 VIP 會員資格', '新品試吃活動邀請', '可轉讓給朋友'],
    points: 500,
    token: '#002024',
  },
]
