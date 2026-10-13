/** Copy for the sign-up → loading → first NFT flow (Figma: Landing Page_Login / loading / First NFT ×3). */

export const SIGNUP = {
  title: '註冊帳號',
  fields: {
    name: { label: '姓名', placeholder: '王小明', error: '請輸入姓名' },
    email: { label: 'Email', placeholder: 'you@example.com', error: '請輸入有效的 Email' },
    phone: { label: '電話', placeholder: '0912345678', error: '請輸入 09 開頭的 10 碼手機號碼' },
    password: { label: '密碼', placeholder: '至少 8 個字元', error: '密碼至少需要 8 個字元' },
  },
  required: '必填',
  agree: ['我已經同意', '註冊條款'],
  agreeError: '請先同意註冊條款',
  submit: '註冊帳號',
  terms: '註冊條款（Demo）：本網站為作品集展示，不會建立真實帳號、不會寄送任何信件，輸入的資料只會存在你的瀏覽器。',
}

export const LOADING = { label: '正在建立你的 Foodlet 錢包…' }

export const FIRST_NFT = {
  title: '歡迎，恭喜獲得您的第一個 Foodlet NFT !',
  titleNamed: (name: string) => `歡迎 ${name}，恭喜獲得您的第一個 Foodlet NFT !`,
  claim: '點擊領取',
  claiming: '領取中',
  claimed: '已領取',
  toast: '已將「巧克力餅乾 NFT」存入你的食錢包',
  wallet: '查看我的食錢包',
  home: '返回首頁',
  reset: '重新體驗',
  nftAlt: '金色像素框裡的巧克力餅乾 NFT',
}
