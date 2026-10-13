/** Copy blocks that appear on more than one page (taken from the Figma landing pages). */

export const ONE_STOP = {
  title: '一站式整合：從點餐、支付到忠誠計畫',
  sub: '你的身體數據也能上鏈！Foodlet 每週自動幫你分析營養攝取狀況，提供貼心建議，並與你的健康帳戶連結，打造更聰明的美食生活',
  cards: [
    { icon: 'user', title: '智慧支付與會員身份', points: ['使用 Foodlet 進行消費，即時獲得數位收據與身份累積', '支援穩定幣、積點、NFT 折抵，交易透明又安心'] },
    { icon: 'image', title: 'NFT 收藏與用餐紀錄', points: ['每次消費即發一張 NFT，記錄你的美食足跡', '與朋友交換徽章，打造你的個人化餐飲履歷'] },
    { icon: 'chart', title: '個人飲食概況', points: ['自動根據你在合作店家的點餐內容記錄營養資訊', '本週攝取分析圖表'] },
  ],
} as const

export const BLOCKCHAIN_NFT = {
  title: '區塊鏈 × NFT：讓餐飲體驗也能被收藏、驗證與共享',
  accent:
    '在 Foodlet 裡，我們善用區塊鏈技術的「透明」、「不可竄改」和「可追溯性」特性，為日常的用餐行為賦予全新的價值。每一次點餐、每一個飲食紀錄，甚至是你完成的健康挑戰，都可以被記錄在區塊鏈上，並發行專屬於你的 NFT',
  note: '我們不只是記得你吃過什麼，而是幫你把「吃得好」這件事，變成值得被記錄、獎勵，甚至傳承的資產',
}

export const ONE_CARD = {
  title: '你用的一張卡，代表的不只是付款，而是品牌信任與專屬權益',
  body: 'Foodlet 整合手機點餐、智慧錢包與個人化會員身份，重新定義你與品牌的連結方式',
}

export const WHY_LOVE = {
  title: '為什麼你會愛上用 Foodlet？',
  body: 'Foodlet 想做的，不只是付款這麼簡單！我們把每一次吃飯的選擇、習慣、甚至小小的喜好，都變成你專屬的數位足跡。不管是點餐、集點、拿優惠，還是收藏你最喜歡的那道菜，都可以用一張卡、一次滑動搞定，更酷的是，這些都能變成你和品牌之間，最真實又獨特的連結',
}

export const TECH = {
  title: '區塊鏈技術',
  points: [
    'Foodlet 提供低手續費、高速度的穩定交易體驗，並支援 DID 身份識別，讓每位顧客都擁有自己的區塊鏈身份',
    '所有交易規則、會員資格、NFT 發送機制，都透過智能合約自動執行，透明可驗證',
    '我們支援硬體錢包登入與雙重認證機制，保障你的資產與資料安全',
  ],
  person: 'Ray Smith',
  role: '技術執行長',
}

export const ROADMAP = {
  title: 'Foodlet 的進化藍圖',
  body: '我們將用餐習慣與健康追蹤數據串聯，讓你不只知道吃了什麼，還能了解吃進了什麼，逐步建立屬於自己的健康飲食意識，未來每間合作餐廳都能發行自己的 NFT 或專屬代幣，打造獨特的會員體驗與品牌收藏價值，讓顧客不只吃飯，更參與品牌經營',
}

export const CORE = {
  title: 'Foodlet 的核心機制',
  paragraphs: [
    '在 Web3 世界裡，「RWA 代幣化」是一種把現實世界中有價值的資產（像是房地產、藝術品、商品、甚至是一頓飯）轉換為可在區塊鏈上交易的數位代幣的技術，這些代幣可以代表資產的所有權、使用權、收益權，甚至只是紀錄一段體驗',
    'Foodlet 把這樣的概念應用到餐飲消費中，讓你每一次點餐、支付、累點、兌換優惠或收藏紀念，都能變成屬於你的「數位資產」。舉例來說，你在合作餐廳點了一份限量餐點，不只是吃完就沒了，而是會獲得一張專屬 NFT 收藏證明，甚至能用來換禮物、參與抽獎或做為回訪優惠的條件',
  ],
  person: 'Tim Smith',
  role: 'Foodlet 創辦人',
}

export const WEB3_ARTICLES = {
  title: '顧客體驗新時代，從 Web2 到 Web3 的轉型思維',
  sub: '從點餐到互動，顧客不只是消費者，而是參與者',
  items: [
    { img: 'img/photo-cafe.webp', alt: '在咖啡廳邊吃早午餐邊滑手機的年輕人', quote: '「為什麼年輕人不再只想打卡，而是收藏一頓飯的回憶」' },
    { img: 'img/photo-laptop-pay.webp', alt: '拿著卡片在筆電上付款的雙手', quote: '「Web3 支付會不會太難？一份超直白的使用教學」' },
    { img: 'img/photo-desk.webp', alt: '窗邊放著筆電、咖啡與可頌的書桌', quote: '「點餐積點發 NFT，有人真的會用嗎？」' },
  ],
  more: '了解更多',
}

export const STATS = {
  title: ['幫助本地餐飲品牌', '進化進 Web3 時代 引領新潮'],
  sub: '每一筆交易、每一次回訪，都能成為品牌升級的資料來源',
  items: [
    { icon: 'users', value: 2245341, label: '筆交易累積' },
    { icon: 'gift', value: 46328, label: '個 NFT 收藏已發送' },
    { icon: 'activity', value: 828867, label: '次用戶互動' },
    { icon: 'wallet', value: 1926436, label: '點用餐紀錄上鏈' },
  ],
} as const

export const PARTNERS = {
  title: '合作夥伴',
  sub: '已有多家餐飲品牌、會員平台與創新商家選擇與 Foodlet 合作打造區塊鏈消費新體驗',
  // invented names only — no real brands (the Figma file used real-looking marks)
  names: ['呼嚕嚕早午餐', '噗噗丼研究室', '啵啵茶實驗所', '嘟嘟麵工坊', '咻咻甜點站', '嗶嗶燒肉堂', '唧唧咖啡社'],
  note: '以上皆為 Demo 虛構品牌',
}

export const TEAM_NOTE = {
  name: 'Foodlet 團隊',
  bio: '我們來自資訊、設計與行銷背景，致力於打造真正以用戶與店家雙贏的餐飲科技服務',
}
