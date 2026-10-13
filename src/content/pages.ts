/** Copy for the three nav content pages (Figma: Landing Page B / C / D). */

export const FEATURES = {
  hero: {
    accent: '用數據吃出好健康，用 NFT 收藏你的每一份努力',
    title: '每一週的飲食紀錄，都是一種值得被嘉獎的生活態度',
    body: [
      'Foodlet 不只記得你點了什麼，還幫你把這一週的營養攝取變成一張專屬圖表，讓你更清楚自己的飲食狀況，不論是達到均衡攝取目標，還是完成「高蛋白日」或「少糖週」挑戰，我們都會發送專屬 NFT 成就徽章給你，成為你健康生活的一部分證明！',
      '這些 NFT 不只是收藏品，還能解鎖特殊優惠、參與限量活動，甚至是個人化推薦的通行證。',
    ],
  },
}

export const INNOVATION = {
  hero: {
    accent: '把每一筆消費，變成可以收藏的價值',
    title: '餐飲預付券 × NFT 會員卡的代幣化錢包',
    body: [
      '食錢包是一款將日常消費轉化為可儲存、可交換的數位資產錢包，整合穩定幣支付、會員身份、點數回饋與個人化推薦，讓你每一筆消費都有價值！',
      '結合「餐飲預付券」與「NFT 會員卡」的代幣化機制，將整合數位錢包應用效益最大化',
    ],
  },
  techRole: { person: 'Tim Smith', role: '技術執行長' },
}

export const BUSINESS = {
  cards: [
    { icon: 'split', title: '資產分割', body: '將高價值資產拆分成多個代幣，降低投資門檻' },
    { icon: 'proof', title: '產權證明', body: '每筆食物交易資料代幣化，作為完整的交易紀錄與憑證' },
    { icon: 'share', title: '收益分享', body: '代幣持有者可分享食物交易帶來的收益' },
    { icon: 'vote', title: '社群參與', body: '代幣賦予持有者治理權，參與食物分類標準等等' },
  ],
  statement: '採用「消費即挖礦 × NFT 收藏 × 會員身份代幣化」的商業模式，讓顧客在日常點餐中累積數位資產、參與品牌互動，同時協助餐飲商家打造去中心化的忠誠經營系統',
} as const
